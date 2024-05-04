import { connect } from "react-redux";
import { setUser } from "../../redux/actions";
import { DeleteOutlined, EditOutlined, FilterOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { User } from "../Entities/User";
import { Button, Input, Space, Table } from "antd";
import AlertComponent from "../Alert-Component";
import { getUsuarios } from "../../connections/user-connection";
import EditUserFromAdmin from "./admin-edit-user";

const AdminPage: React.FC<{ user: any, setUser: any }> = ({ user, setUser}) => {

    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [searchText, setSearchText] = useState<string>(''); // Estado para almacenar el texto de búsqueda
    
    useEffect(() => {
        if(users.length === 0) {
            try {
                getUsuarios().then((data: User[]) => {
                    setUsers(data);
                    setFilteredUsers(data);
                });
            } catch (error: any) {
                AlertComponent(error.message);
            }
        }
    }, [users]);

    const handleEdit = (record: User) => {
        return <EditUserFromAdmin user={record} />
    };

    // Función para filtrar aplicaciones por nombre
    const handleSearch = () => {
        const filteredValue = users.filter(userSingular => userSingular.nombre.toLowerCase().includes(searchText.toLowerCase()));
        setFilteredUsers(filteredValue);
    };

    // Función para manejar cambios en el campo de búsqueda
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

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
            onFilter: (value: any, record: User) =>
                record.nombre.toLowerCase().includes(value.toLowerCase()),
            // Ordena alfabéticamente
            sorter: (a: User, b: User) => a.nombre.localeCompare(b.nombre),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'role',
            dataIndex: 'rol',
            key: 'role',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: User) => (
                <Space>
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    />
                </Space>
            ),
        },
    ];


    return (
        <div>
            <h1>Admin Page</h1>
            <Table columns={columns} dataSource={filteredUsers} />
        </div>
    );

}

const mapStateToProps = (state: any) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps, { setUser })(AdminPage);