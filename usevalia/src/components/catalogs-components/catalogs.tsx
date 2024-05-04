import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal } from 'antd';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { User } from '../Entities/User';
import { connect } from 'react-redux';
import { Catalog } from '../Entities/Catalog';
import { getCatalogs } from '../../connections/catalogs-connection';
import { getNombreUser } from '../../connections/user-connection';
import { getNombreSchema } from '../../connections/score-scale-connection';
import CatalogInfo from './catalog-info-modal';

export interface Catalog_for_list {
    id: number;
    name: string;
    scoreScale: string;
    creator: string;
    auditorsGroup: string;
    read: string | undefined;
    write: string | undefined;
}

const CatalogsPage: React.FC<{ user: User }> = ({ user}) => {
    const [catalogList, setCatalogs] = useState<Catalog_for_list[]>([]);

    useEffect( () => {
        if (catalogList.length === 0) {
            let catalogs: Catalog[];
            let catalogArray: Catalog_for_list[] = [];
            getCatalogs().then((data: Catalog[]) => {
                catalogs = data;
                let autor : string;
                let grupo :string;
                let score : string;
                catalogs.forEach(async (element: Catalog) => {
                    autor = await getNombreUser(element.autorid);
                    score = await getNombreSchema(element.esquemaid);
                    grupo = await getNombreUser(element.grupoid);
                    catalogArray.push({
                        id: element.id as number,
                        name: element.nombre,
                        scoreScale: score,
                        creator: autor,
                        auditorsGroup: grupo,
                        read: element.lectura,
                        write: element.escritura,
                    });
                });
            });
                setCatalogs(catalogArray);
        }
    }, [catalogList]);

    const handleDelete = (id: number) => {
        Modal.confirm({
            title: 'Eliminar Catálogo',
            content: '¿Estás seguro de que quieres eliminar este catálogo? ' +
                'Eliminarlo puede afectar a otras funcionalidades de la aplicación.',
            onOk() {
                setCatalogs(prevCatalogs => prevCatalogs.filter((catalog) => catalog.id !== id));
            }
        });
    };

    const handleView = (catalog: Catalog_for_list) => {
        return <CatalogInfo catalog={catalog} />;
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
            render: (_:any, record:Catalog_for_list,) => (
                <Space>
                    {user.id === record.id ? (
                    <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
                    ) : null}
                    <Button type="link" icon={<EyeOutlined />} onClick={() => handleView(record)}></Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <h1>Catalogs</h1>
            <Table dataSource={catalogList} columns={columns} />
        </div>
    );
};
const mapStateToProps = (state: any) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps,)(CatalogsPage);