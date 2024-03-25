import React, { useState } from 'react';
import { Table, Button, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface Auditor {
    groupName: string;
    groupMembers: string[];
    description: string;
    tags: string[];
}

const AuditorsPage: React.FC = () => {
    const [auditors, setAuditors] = useState<Auditor[]>([]);

    const handleDelete = (groupName: string) => {
        setAuditors(prevAuditors => prevAuditors.filter(auditor => auditor.groupName !== groupName));
    };

    const columns = [
        {
            title: 'Group Name',
            dataIndex: 'groupName',
            key: 'groupName',
        },
        {
            title: 'Group Members',
            dataIndex: 'groupMembers',
            key: 'groupMembers',
            render: (groupMembers: string[]) => (
                <ul>
                    {groupMembers.map(member => (
                        <li key={member}>{member}</li>
                    ))}
                </ul>
            ),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            key: 'tags',
            render: (tags: string[]) => (
                <ul>
                    {tags.map(tag => (
                        <li key={tag}>{tag}</li>
                    ))}
                </ul>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: Auditor) => (
                <Space>
                    <Button type="primary" danger onClick={() => handleDelete(record.groupName)} icon={<DeleteOutlined />} />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <h1>Auditors Group</h1>
            <Table dataSource={auditors} columns={columns} />
        </div>
    );
};

export default AuditorsPage;