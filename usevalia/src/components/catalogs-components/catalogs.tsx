import React, { useState } from 'react';
import { Table, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface Catalog {
    name: string;
    scoreScale: string;
    creator: string;
    auditorsGroup: string;
}

const CatalogsPage: React.FC = () => {
    const [catalogs, setCatalogs] = useState<Catalog[]>([]);

    const handleDelete = (index: number) => {
        setCatalogs(prevCatalogs => prevCatalogs.filter((_, i) => i !== index));
    };

    const columns = [
        {
            title: 'Catalog Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Score Scale',
            dataIndex: 'scoreScale',
            key: 'scoreScale',
        },
        {
            title: 'Creator',
            dataIndex: 'creator',
            key: 'creator',
        },
        {
            title: 'Auditors Group',
            dataIndex: 'auditorsGroup',
            key: 'auditorsGroup',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record, index) => (
                <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(index)} />
            ),
        },
    ];

    return (
        <div>
            <h1>Catalogs</h1>
            <Table dataSource={catalogs} columns={columns} />
        </div>
    );
};

export default CatalogsPage;