import React, { useEffect } from 'react';
import { Table, Button, Space, Modal } from 'antd';
import { DeleteOutlined, CloseOutlined, ReloadOutlined, FileAddOutlined, CheckOutlined, EyeOutlined, BarChartOutlined } from '@ant-design/icons';
import { User } from '../Entities/User';
import { connect } from 'react-redux';
import { setAudit } from '../../redux/actions';
import { Audit } from '../Entities/Audit';
import { closeAudit, deleteAudit, getAuditReport, getEvaluationStatus, listAuditByUser, listAudits, openAudit } from '../../connections/audits-connections';
import AppConnection from '../../connections/apps-connection';
import { getCatalog } from '../../connections/catalogs-connection';
import AuditInfoModal from './audit-information-modal';

interface AuditInformation {
    id: number;
    auditName: string;
    app: string;
    evaluatedCatalog: string;
    auditors: User[];
    evaluationStatus: string;
    fechaFinReal: Date | null;
}


const AuditsPage: React.FC<{ user: User, audit: number, setAudit: any }> = ({ user, audit, setAudit }) => {

    const [audits, setAudits] = React.useState<AuditInformation[]>([]);


    useEffect(() => {
        const getEvaluationStatusString = async (id: number): Promise<string> => {
            const data = await getEvaluationStatus(id as number);
            if (data) {
                return 'Completed';
            }
            return 'Pending';
        }

        if (audits.length === 0) {
            let audit: Audit[] = [];
            if (user.rol === 'admin') {
                listAudits().then((data: Audit[]) => {
                    audit.push(...data);
                });
            } else {
                listAuditByUser(user.id as number).then((data: Audit[]) => {
                    audit.push(...data);
                });
            }
            let auditInformation: AuditInformation[] = [];
            audit.forEach(async (element: Audit) => {
                let app = await AppConnection.get(element.aplicacionId);
                //let administrador = await getUsuario(element.administradorId);
                let catalogo = await getCatalog(element.catalogoId);

                auditInformation.push({
                    id: element.id as number,
                    auditName: element.nombre,
                    app: app.nombre,
                    evaluatedCatalog: catalogo.nombre,
                    auditors: element.usuarios,
                    evaluationStatus: await getEvaluationStatusString(element.id as number),
                    fechaFinReal: element.fechaFinReal,
                });
            })
            setAudits(auditInformation);


        }
    }, [audits, user]);

    const columns = [
        {
            title: 'Audit Name',
            dataIndex: 'auditName',
            key: 'auditName',
        },
        {
            title: 'App',
            dataIndex: 'app',
            key: 'app',
        },
        {
            title: 'Evaluated Catalog',
            dataIndex: 'evaluatedCatalog',
            key: 'evaluatedCatalog',
        },
        {
            title: 'Auditors',
            dataIndex: 'auditors',
            key: 'auditors',
            render: (auditors: User[]) => auditors.map(user => user.nombre).join(', '),
        },
        {
            title: 'Evaluation Status',
            dataIndex: 'evaluationStatus',
            key: 'evaluationStatus',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text: string, record: AuditInformation) => (
                <Space size="middle">
                    {user.rol === 'admin' && (
                        <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
                            Delete
                        </Button>
                    )}
                    { (user.rol !== 'admin' || record.auditors.map(usr => usr.id).includes(user.id)) && (
                        <>
                            <Button icon={<CloseOutlined />} disabled={!!record.fechaFinReal} onClick={() => handleCloseAudit(record)}>
                                Close Audit
                            </Button>
                            <Button icon={<ReloadOutlined />} disabled={!record.fechaFinReal} onClick={() => handleReopenAudit(record)}>
                                Reopen
                            </Button>
                            <Button type="link" icon={<BarChartOutlined />} onClick={() => handleGoToCharts(record.id)}>
                                Open Charts
                            </Button>
                            <Button type="link" icon={<FileAddOutlined />} onClick={() => handleCreateReport(record)}>
                                Create Report
                            </Button>
                            <Button type="link" icon={<CheckOutlined />} disabled={!!record.fechaFinReal} onClick={() => handleEvaluate(record.id)}>
                                Evaluate
                            </Button>

                        </>
                    )}
                    <Button icon={<EyeOutlined />} onClick={() => handleViewDetails(record.id)}>
                        View Details
                    </Button>
                </Space>
            ),
        },
    ];

    const handleDelete = (id: number) => {
        Modal.confirm({
            title: 'Delete Audit',
            content: 'Are you sure you want to delete this audit? This action cannot be undone.',
            onOk() {
                deleteAudit(id);
                setAudits(prevAudits => prevAudits.filter(audit => audit.id !== id));
            }
        });
    };

    const handleCloseAudit = (audit: AuditInformation) => {
        Modal.confirm({
            title: 'Close Audit',
            content: 'Are you sure you want to close this audit?',
            onOk() {
               closeAudit(audit.id);
               audit.fechaFinReal = new Date();
            }
        });
    };

    const handleReopenAudit = (audit: AuditInformation) => {
        Modal.confirm({
            title: 'Reopen Audit',
            content: 'Are you sure you want to reopen this audit?',
            onOk() {
                openAudit(audit.id);
                audit.fechaFinReal = null;
            }
        });
    };

    const handleCreateReport =  (audit: AuditInformation) => {
        Modal.confirm({
            title: 'Create Report',
            content: 'You are going to create and download a report for this audit. Are you sure?',
            onOk() {
                getAuditReport(audit.id).then((report: any) => {
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(report);
                    link.download = audit.auditName + '_report.pdf';
                    link.click();
                });
            }
        });
    };

    const handleEvaluate = (id: number) => {
        // Evaluate logic here
    };

    const handleViewDetails = (id: number) => {
        return <AuditInfoModal auditId={id} />;
    };

    const handleGoToCharts = (id: number) => {
        // Go to charts logic here
    };

    return (
        <div>
            <h1>Audits</h1>
            <Table dataSource={audits} columns={columns} />
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        user: state.user,
        audit: state.audit,
    };
};

export default connect(mapStateToProps, {setAudit})( AuditsPage);