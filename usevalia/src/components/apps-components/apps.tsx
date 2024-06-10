import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Input, message } from 'antd';
import { DeleteOutlined, EditOutlined, FilterOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { clearUser, setUser } from '../../redux/actions';
import { Application } from '../Entities/Application';
import AppConnection from '../../connections/apps-connection';
import EditApp from './edit-app';
import AlertComponent from '../Alert-Component';
import { User } from '../Entities/User';
import CancelButton from '../components-utils/cancelButton';


const AppPage: React.FC<{ user: User, setUser: any }> = ({ user, setUser}) => {
    const [applications, setApplications] = useState<Application[]>([]);
    const [searched, setSearched] = useState<boolean>(false);
    const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
    const [searchText, setSearchText] = useState<string>(''); // Estado para almacenar el texto de búsqueda
    const [filtered, setFiltered] = useState<boolean>(false); // Estado para indicar si se está aplicando un filtro

    useEffect(() => {
        if ((applications.length === 0 && !searched) || (applications.length !== filteredApplications.length)) {
            try{
                AppConnection.list().then((data:Application[]) => {
                    setApplications(data);
                    setFilteredApplications(data);
                    setSearched(true);
                });
            } catch (error:any) {
                message.error('Loading applications failed');
            }

        }
    }, [applications, searched]);

   

    // Función para filtrar aplicaciones por nombre
    const handleSearch = () => {
        const filteredValue = applications.filter(app => app.nombre.toLowerCase().includes(searchText.toLowerCase()));
        setFilteredApplications(filteredValue);
        setFiltered(!!searchText); // Establece el estado de filtrado basado en si hay texto de búsqueda o no
    };

    // Función para manejar cambios en el campo de búsqueda
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const handleDelete = async (id: number) => {
        let editable = false;
        await AppConnection.isEditable(id as number).then((data) => {
            editable = data;
        });
        if (editable){
            Modal.confirm({
                title: 'Eliminar Aplicación',
                content: 'Are you sure you want to delete this application?',
                async onOk() {
                    try{
                        await AppConnection.deleteApp(id).then(() => {
                        setApplications(applications.filter(app => app.id !== id));
                    });
                } catch (error:any) {
                    message.error('Failed to delete application');
                }
            }});
        }else{
            Modal.warning ({
                title: 'Aplicación en uso',
                content: 'No se puede eliminar una aplicación en uso.',
            });
        }
        
    }

    const handleAdd = () => {
        return Modal.info({
            title: 'Add Application',
            content: <EditApp />,
            footer: null,
            closable: true,
            icon: null
        });
    }

    const handleEdit = async(app: Application) => {    
        let editable = false;
        await AppConnection.isEditable(app.id as number).then((data) => {
            editable = data;
        });
        if (!editable){
            Modal.warning ({
                title: 'Aplicación en uso',
                content: 'No se puede editar una aplicación en uso.',
            });
        } else{
            return Modal.info({
                title: 'Edit Application',
                content: <EditApp app={app} />,
                footer: null,
                closable: true,
                icon: null
            });
        }
    }

    const userRole = user.rol;

    const columns = [
        {
            title: 'Name',
            dataIndex: 'nombre',
            key: 'name',
            // Renderiza un componente de búsqueda para filtrar por nombre
            filterDropdown: () => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder="Search name"
                        value={searchText}
                        onChange={handleSearchChange}
                        onPressEnter={handleSearch}
                    />
                    <Button type="primary" onClick={handleSearch}>Search</Button>
                </div>
            ),
            filterIcon: <FilterOutlined />,
            // Filtro personalizado para buscar en minúsculas
            onFilter: (value: any, record: Application) =>
                record.nombre.toLowerCase().includes(value.toLowerCase()),
            // Ordena alfabéticamente
            sorter: (a: Application, b: Application) => a.nombre.localeCompare(b.nombre),
        },
        {
            title: 'Category',
            dataIndex: 'categoria',
            key: 'category',
        },
        {
            title: 'URL',
            dataIndex: 'url',
            key: 'URL',
        },
        {
            title: 'Description',
            dataIndex: 'descripcion',
            key: 'description',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Application) => (
                <Space>
                    {userRole === 'admin' ? (
                        <Button
                            type="text"
                            icon={<DeleteOutlined />}
                            onClick={() => handleDelete(record.id as number)}
                        />
                    ) : null}
                    {userRole === 'admin' ? (
                        <Button
                            type="text"
                            icon={<EditOutlined />}
                            onClick={() => handleEdit(record)}
                        />
                    ) : null}
                </Space>
            ),
        },
    ];

    return (
        <div>
            <h1>Apps</h1>
            <Button type="primary" onClick={() => handleAdd()}>Add App</Button>
            <Table columns={columns} dataSource={filteredApplications} pagination={false} />
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps, { setUser })(AppPage);