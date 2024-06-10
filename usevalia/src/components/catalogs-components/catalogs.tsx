import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, message } from 'antd';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { User } from '../Entities/User';
import { connect } from 'react-redux';
import { Catalog } from '../Entities/Catalog';
import { deleteCatalog, getCatalogsByLectura } from '../../connections/catalogs-connection';
import { getNombreUser } from '../../connections/user-connection';
import { getNombreSchema } from '../../connections/score-scale-connection';
import GroupConnection from '../../connections/auditors-group-connection';
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
    const [catalogList, setCatalogsList] = useState<Catalog_for_list[]>([]);
    const [searched, setSearched] = useState<boolean>(false);
    const [catalogs, setCatalogs] = useState<Catalog[]>([]);

    useEffect( () => {
        const fetchData = async () => {
            try{
                const catalogs: Catalog[] = await getCatalogsByLectura(user.id as number);
                const catalogArray: Catalog_for_list[] = await Promise.all(catalogs.map(async (element: Catalog) => {
                    const autor = await getNombreUser(element.autorid);
                    const score = await getNombreSchema(element.esquemaid);
                    const grupo = await GroupConnection.getNombreGroup(element.grupoid);
                    return {
                        id: element.id as number,
                        name: element.nombre,
                        scoreScale: score,
                        creator: autor,
                        auditorsGroup: grupo,
                        read: element.lectura,
                        write: element.escritura,
                    };
                }));
                setCatalogsList(catalogArray);
                setCatalogs(catalogs);
                setSearched(true);
            } catch (error) {
                console.log(error);
            }
        };
        if (!searched) {
            fetchData();
        }
    }, [user, searched]);

    const handleDelete = (id: number) => {
        Modal.confirm({
            title: 'Delete Catalog',
            content: 'Are you sure you want to delete this catalog? ' +
                'Deleting it can affect other functionalities of the application.',
            onOk() {
                try{
                deleteCatalog(id);
                setSearched(false);
                setCatalogsList(prevCatalogs => prevCatalogs.filter((catalog) => catalog.id !== id));
                } catch (error:any) {
                    message.error('Deleting catalog failed, please contact with your administrator');
                }

            }
        });
    };

    const handleView = (catalog: Catalog_for_list) => {
        return Modal.info({
            title: 'Catalog Info', 
            content: <CatalogInfo catalog={catalog} />,
            footer: null,
            closable: true,
            icon: null,
        });
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
                    {user.id === catalogs.find(catalog => catalog.id === record.id)?.autorid ? (
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
            <Table dataSource={catalogList} columns={columns} rowKey='id' pagination={false}/>
        </div>
    );
};
const mapStateToProps = (state: any) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(CatalogsPage);