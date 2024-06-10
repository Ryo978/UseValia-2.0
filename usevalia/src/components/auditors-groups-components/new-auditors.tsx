import React, { useEffect } from 'react';
import { Form, Input, Button, Select, App, Alert, Modal, message } from 'antd';
import { Categoria } from '../Entities/Categoria';
import GroupConnection from '../../connections/auditors-group-connection';
import AlertComponent from '../Alert-Component';
import { GroupAuditor } from '../Entities/Group-auditors';
import { getUsuarios } from '../../connections/user-connection';
import { User } from '../Entities/User';
import { connect } from 'react-redux';
import { Tag } from '../Entities/Tag';

const AddAuditor: React.FC<{ user: any }> = ({ user }) => {
    
    const [users, setUsers] = React.useState<User[]>([]);

    const onFinish = async(values: any) => {
        let etiquetas = buildTags(values.etiquetas);
        let usuarios = getUsuariosFromId(values.usuarios);
        usuarios.push(user);
        let groupAuditor : GroupAuditor = {
            id: 0,
            nombre: values.nombre,
            etiquetas: etiquetas,
            usuarios: usuarios,
            descripcion: values.descripcion,
        }
        try {
            await GroupConnection.groupAdd(groupAuditor);
            Modal.success({
                title: 'Group added',
                content: 'The group has been added successfully',
                onOk() {
                    window.location.reload();
                }
            });
        } catch (error:any) {
           message.error('Adding group failed');
        }
    };
    useEffect(() => {
        try {
            getUsuarios().then((data: User[]) => {
                let position = data.findIndex((us: User) => user.id === us.id);
                data.splice(position, 1);
                setUsers(data);
            });
        } catch (error:any) {
            message.error('Loading users failed');
        }
        
    }, [user]);

    const getUsuariosFromId = (idsUsuarios: number[]) => {
        let usuarios: User[] = [];
        idsUsuarios.forEach((id: number) => {
            let user = users.find((us: User) => us.id === id);
            if (user) {
                usuarios.push(user);
            }
        });
        return usuarios;
    }

    const buildTags = (tags: string) => {
        let tagsArray = tags.split(',');
        let tagsObj: Tag[] = [];
        tagsArray.forEach((tag: string) => {
            tagsObj.push({id: 0, valor: tag});
        });
        return tagsObj;
    }


    return (
        <Form onFinish={onFinish}>
            <Form.Item
                label="Group name"
                name="nombre"
                rules={[{ required: true, message: 'Please insert the name of the application' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Description"
                name="descripcion"
                rules={[{ required: true, message: 'Please add a description' }]}
            >
                <Input.TextArea />
            </Form.Item>
            <Form.Item
                label="TAGS"
                name="etiquetas"
            >
                <Input placeholder="TAG1,TAG2,TAG3..."/>
            </Form.Item>

            <Form.Item
                label="Users"
                name="usuarios"
                rules={[{ required: true, message: 'Please select at least one user.' }]}
            >
                <Select mode="multiple" showSearch filterOption={(input, option) =>
                    (option?.children as any as User)?.nombre.toLowerCase()?.indexOf(input.toLowerCase()) >= 0}>
                    {users.map((us: User) => (
                        <Select.Option key={us.id} value={us.id}>
                            {us.nombre + ' - ' + us.email}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Add
                </Button>
            </Form.Item>
        </Form>
        
    );
};

export default  (AddAuditor);