import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Input, message } from 'antd';
import { DeleteOutlined, FilterOutlined } from '@ant-design/icons';
import { User } from '../Entities/User';
import { Tag } from '../Entities/Tag';
import { GroupAuditor } from '../Entities/Group-auditors';
import GroupConnection from '../../connections/auditors-group-connection';
import { connect } from 'react-redux';
import AddAuditor from './new-auditors';
import AlertComponent from '../Alert-Component';



const AuditorsPage: React.FC<{ user: any }> = ({ user }) => {
    const [auditors, setAuditors] = useState<GroupAuditor[]>([]);
    const [filteredAuditors, setFilteredAuditors] = useState<GroupAuditor[]>([]);
    const [searchTextName, setSearchTextName] = useState<string>('');
    const [searchTextUser, setSearchTextUser] = useState<string>('');
    const [searched, setSearched] = useState<boolean>(false);

    useEffect(() => {
        if (auditors.length === 0 && !searched )  {
            try {
                GroupConnection.groupList(user.id).then((data: GroupAuditor[]) => {
                    setAuditors(data);
                    setFilteredAuditors(data);
                    setSearched(true);
                });
            } catch (error:any) {
                message.error('Loading auditors failed');
            }
        }

    }, [auditors, user, searched]);

    const handleAdd = () => {
        return Modal.info({
            title: 'Add Auditor',
            content: <AddAuditor user={user} />,
            footer: null,
            closable: true,
            icon: null
        });
    }

    const handleDelete = (id: number) => {
        Modal.confirm({
            title: 'Delete Auditors Group',
            content: 'Are you sure you want to delete this group?',
            async onOk() {
                try{
                    await GroupConnection.groupDelete(id).then(() => {
                        setAuditors(prevAuditors => prevAuditors.filter(auditor => auditor.id !== id));
                        setSearched(false);
                    });
                } catch (error:any) {
                    message.error('Deleting auditor failed');
                }
            },
        });
        
    };
    
    const handleSearchByGroupName = () => {
        let auditorsToFilter;
        if (searchTextUser !== ''){
            auditorsToFilter = filteredAuditors;
        }else{
            auditorsToFilter = auditors;
        }
        const filteredValue = auditorsToFilter.filter(auditor => 
            auditor.nombre.toLowerCase().includes(searchTextName.toLowerCase()));
        setFilteredAuditors(filteredValue);
    }

    const handleSearchNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTextName(e.target.value);
    };

    const handleSearchByUser = () => {
        let auditorsToFilter;
        if (searchTextName !== ''){
            auditorsToFilter = filteredAuditors;
        }else{
            auditorsToFilter = auditors;
        }
        const filteredValue = auditorsToFilter.filter(auditor => 
            auditor.usuarios.some(user => 
                user.nombre.toLowerCase().includes(searchTextUser.toLowerCase())));
        setFilteredAuditors(filteredValue);
    }
    const handleSearchUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTextUser(e.target.value);
    };

    const columns = [
        {
            title: 'Group Name',
            dataIndex: 'nombre',
            key: 'groupName',
            filterDropdown: () => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder="Search name"
                        value={searchTextName}
                        onChange={handleSearchNameChange}
                        onPressEnter={handleSearchByGroupName}
                    />
                    <Button type="primary" onClick={handleSearchByGroupName}>Search</Button>
                </div>
            ),
            filterIcon: <FilterOutlined />,
            // Filtro personalizado para buscar en minúsculas
            onFilter: (value: any, record: GroupAuditor) =>
                record.nombre.toLowerCase().includes(value.toLowerCase()),
            // Ordena alfabéticamente
            sorter: (a: GroupAuditor, b: GroupAuditor) => a.nombre.localeCompare(b.nombre),
        },
        {
            title: 'Group Members',
            dataIndex: 'usuarios',
            key: 'groupMembers',
            render: (groupMembers: User[]) => (
                <ul>
                    {groupMembers.map(member => (
                        <li key={member.id}>{member.nombre}</li>
                    ))}
                </ul>
            ),
            filterDropdown: () => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder="Search user"
                        value={searchTextUser}
                        onChange={handleSearchUserChange}
                        onPressEnter={handleSearchByUser}
                    />
                    <Button type="primary" onClick={handleSearchByUser}>Search</Button>
                </div>
            ),
            filterIcon: <FilterOutlined />,
            // Filtro personalizado para buscar en minúsculas
            onFilter: (value: any, record: GroupAuditor) =>
                record.nombre.toLowerCase().includes(value.toLowerCase()),
            // Ordena alfabéticamente
            sorter: (a: GroupAuditor, b: GroupAuditor) => a.nombre.localeCompare(b.nombre),
        },
        {
            title: 'Description',
            dataIndex: 'descripcion',
            key: 'description',
        },
        {
            title: 'Tags',
            dataIndex: 'etiquetas',
            key: 'tags',
            render: (tags: Tag[]) => (
                <ul>
                    {tags.map(tag => (
                        <li key={tag.id}>{tag.valor}</li>
                    ))}
                </ul>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: GroupAuditor) => (
                <Space>
                    <Button type="primary" danger onClick={() => handleDelete(record.id as number)} icon={<DeleteOutlined />} />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <h1>Auditors Group</h1>
            <Button type="primary" onClick={() => handleAdd()}>Add Auditors group</Button>
            <Table dataSource={filteredAuditors} columns={columns} pagination={false}/>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)( AuditorsPage);