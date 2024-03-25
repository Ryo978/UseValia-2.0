import React from 'react';
import { Table, Button, Space } from 'antd';
import { DeleteOutlined, CloseOutlined, ReloadOutlined, FileAddOutlined, CheckOutlined, EyeOutlined } from '@ant-design/icons';

interface Audit {
    id: number;
    auditName: string;
    app: string;
    evaluatedCatalog: string;
    auditors: string[];
    evaluationStatus: string;
}

interface Props {
    role: 'admin' | 'auditor' | 'user';
}

const AuditsPage: React.FC<Props> = ({ role }) => {
    const audits: Audit[] = [
        {
            id: 1,
            auditName: 'Audit 1',
            app: 'App 1',
            evaluatedCatalog: 'Catalog 1',
            auditors: ['User 1', 'User 2'],
            evaluationStatus: 'Pending',
        },
        // ... add more audits here
    ];

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
            render: (auditors: string[]) => auditors.join(', '),
        },
        {
            title: 'Evaluation Status',
            dataIndex: 'evaluationStatus',
            key: 'evaluationStatus',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text: string, record: Audit) => (
                <Space size="middle">
                    {role === 'admin' && (
                        <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
                            Delete
                        </Button>
                    )}
                    {role === 'auditor' && (
                        <>
                            <Button icon={<CloseOutlined />} onClick={() => handleCloseAudit(record.id)}>
                                Close Audit
                            </Button>
                            <Button icon={<ReloadOutlined />} onClick={() => handleReopenAudit(record.id)}>
                                Reopen
                            </Button>
                            <Button type="link" icon={<FileAddOutlined />} onClick={() => handleCreateReport(record.id)}>
                                Create Report
                            </Button>
                            <Button type="link" icon={<CheckOutlined />} onClick={() => handleEvaluate(record.id)}>
                                Evaluate
                            </Button>
                        </>
                    )}
                    <Button type="link" icon={<EyeOutlined />} onClick={() => handleViewDetails(record.id)}>
                        View Details
                    </Button>
                </Space>
            ),
        },
    ];

    const handleDelete = (id: number) => {
        // Delete logic here
    };

    const handleCloseAudit = (id: number) => {
        // Close audit logic here
    };

    const handleReopenAudit = (id: number) => {
        // Reopen audit logic here
    };

    const handleCreateReport = (id: number) => {
        // Create report logic here
    };

    const handleEvaluate = (id: number) => {
        // Evaluate logic here
    };

    const handleViewDetails = (id: number) => {
        // View details logic here
    };

    return (
        <div>
            <h1>Audits</h1>
            <Table dataSource={audits} columns={columns} />
        </div>
    );
};

export default AuditsPage;