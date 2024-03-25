import React, { useState } from 'react';
import { Table, Button, Space, Modal } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

interface Application {
    name: string;
    category: string;
    URL: string;
    description: string;
}

const AppPage: React.FC = () => {
    const [applications, setApplications] = useState<Application[]>([]);

    // Función para eliminar una aplicación
    const handleDelete = (name: string) => {
        setApplications(prevApplications =>
            prevApplications.filter(app => app.name !== name)
        );
    };

    // Función para editar una aplicación
    const handleEdit = (name: string) => {
        // Implementa la lógica para editar una aplicación aquí
        // Puedes abrir un modal o redirigir a otra página de edición
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'URL',
            dataIndex: 'URL',
            key: 'URL',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Application) => (
                <Space>
                    <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.name)}
                    />
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record.name)}
                    />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <h1>Apps</h1>
            <Table dataSource={applications} columns={columns} />
        </div>
    );
};

export default AppPage;