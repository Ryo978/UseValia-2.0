import React, { useEffect } from 'react';
import { Table, Button, Space, Modal, Tooltip, message } from 'antd';
import { DeleteOutlined, CloseOutlined, ReloadOutlined, FileAddOutlined, CheckOutlined, EyeOutlined, BarChartOutlined } from '@ant-design/icons';
import { User } from '../Entities/User';
import { connect } from 'react-redux';
import { setAudit } from '../../redux/actions';
import { Audit } from '../Entities/Audit';
import { closeAudit, deleteAudit, getAuditReport, getEvaluationStatus, listAuditByUser, listAudits, openAudit } from '../../connections/audits-connections';
import AppConnection from '../../connections/apps-connection';
import { getCatalog } from '../../connections/catalogs-connection';
import AuditInfoModal from './audit-information-modal';
import { useNavigate } from 'react-router-dom';
import ChartAudits from './report-and-stats/audit-stats';

export interface AuditInformationTable {
    id: number;
    auditName: string;
    app: string;
    evaluatedCatalog: string;
    auditors: User[];
    evaluationStatus: string;
    administradorid: number;
    fechaFinReal: Date | null;
}


const AuditsPage: React.FC<{ user: User, audit: number, setAudit: any }> = ({ user, audit, setAudit }) => {

    const [audits, setAudits] = React.useState<AuditInformationTable[]>([]);
    const navigate = useNavigate();


    useEffect(() => {
        const getEvaluationStatusString = async (id: number): Promise<string> => {
            const data = await getEvaluationStatus(id as number);
            if (data) {
                return 'Completed';
            }
            return 'Pending';
        }

        const fetchData = async () => {
            try{
                if (audits.length === 0) {
                    let audit: Audit[] = [];
                    if (user.rol === 'admin') {
                        await listAudits().then((data: Audit[]) => {
                            audit.push(...data);
                        });
                    } else {
                        await listAuditByUser(user.id as number).then((data: Audit[]) => {
                            audit.push(...data);
                        });
                    }
                    let auditInformation: AuditInformationTable[] = [];
                    for (const element of audit) {
                        let app = await AppConnection.get(element.aplicacionId);
                        let catalogo = await getCatalog(element.catalogoId);

                        auditInformation.push({
                            id: element.id as number,
                            auditName: element.nombre,
                            app: app.nombre,
                            evaluatedCatalog: catalogo.nombre,
                            auditors: element.usuarios,
                            evaluationStatus: await getEvaluationStatusString(element.id as number),
                            administradorid: element.administradorId as number,
                            fechaFinReal: element.fechaFinReal as Date,
                        });
                    }
                    setAudits(auditInformation);
                }
            }
            catch (error:any) {
                message.error('Loading audits failed');
            }
        };

        fetchData();
    }, [user, audits.length]);

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
            render: (text: string, record: AuditInformationTable) => (
                <Space size="middle">
                    {user.rol === 'admin' && (
                        <Tooltip title="Delete">
                            <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
                        </Tooltip>
                    )}
                    { ((user.rol !== 'admin' || record.administradorid === user.id) 
                            && record.evaluationStatus === 'Completed') && (
                        <>
                            <Tooltip title="Close Audit">
                                <Button icon={<CloseOutlined />} disabled={!!record.fechaFinReal} onClick={() => handleCloseAudit(record)} />
                            </Tooltip>
                            <Tooltip title="Reopen Audit">
                                <Button icon={<ReloadOutlined />} disabled={!record.fechaFinReal} onClick={() => handleReopenAudit(record)} />
                            </Tooltip>
                            <Tooltip title="See charts">
                                <Button icon={<BarChartOutlined />} onClick={() => handleGoToCharts(record)} />
                            </Tooltip>
                            <Tooltip title="Create Report">
                                <Button icon={<FileAddOutlined />} onClick={() => handleCreateReport(record)} />
                            </Tooltip>

                        </>
                    )}
                    <Tooltip title="Evaluate">
                        <Button icon={<CheckOutlined />} disabled={!!record.fechaFinReal} onClick={() => handleEvaluate(record.id)} />
                    </Tooltip>
                    <Tooltip title="View Details">
                    <Button icon={<EyeOutlined />} onClick={() => handleViewDetails(record.id)} />
                    </Tooltip>
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

    const handleCloseAudit = (audit: AuditInformationTable) => {
        Modal.confirm({
            title: 'Close Audit',
            content: 'Are you sure you want to close this audit?',
            onOk() {
               closeAudit(audit.id);
               audit.fechaFinReal = new Date();
            }
        });
    };

    const handleReopenAudit = (audit: AuditInformationTable) => {
        Modal.confirm({
            title: 'Reopen Audit',
            content: 'Are you sure you want to reopen this audit?',
            onOk() {
                openAudit(audit.id);
                audit.fechaFinReal = null;
            }
        });
    };

    const handleCreateReport =  (audit: AuditInformationTable) => {
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
        setAudit(id);
        navigate('/evaluate-audit');
    };

    const handleViewDetails = (id: number) => {
        console.log('View details for audit with id: ', id);
        return Modal.info({
            title: 'Audit Information', 
            content: <AuditInfoModal auditId={id} />,
            footer: null,
            closable: true,
            icon: null,
        });
    };

    const handleGoToCharts = (audit: AuditInformationTable) => {
         
        return Modal.info({
            title: audit.auditName + ' Chart', 
            content: <ChartAudits audit={audit} />,
            footer: null,
            closable: true,
            icon: null,
        });
    };

    return (
        <div>
            <h1>Audits</h1>
            <Table dataSource={audits} columns={columns} pagination={false} />
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