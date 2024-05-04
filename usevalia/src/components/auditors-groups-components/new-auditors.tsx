import React, { useEffect } from 'react';
import { Form, Input, Button, Select, App, Alert } from 'antd';
import { Categoria } from '../Entities/Categoria';
import GroupConnection from '../../connections/auditors-group-connection';
import AlertComponent from '../Alert-Component';
import { GroupAuditor } from '../Entities/Group-auditors';
import { getUsuarios } from '../../connections/user-connection';
import { User } from '../Entities/User';
import { connect } from 'react-redux';

const AddAuditor: React.FC<{ user: any }> = ({ user }) => {
    
    const [users, setUsers] = React.useState<User[]>([]);

    const onFinish = (values: any) => {
        let etiquetas = values.etiquetas.split(',');
        let usuarios = values.usuarios;
        usuarios.push(user);
        let groupAuditor : GroupAuditor = {
            id: undefined,
            nombre: values.nombre,
            etiquetas: etiquetas,
            usuarios: usuarios,
            descripcion: values.descripcion,
        }
        try {
            GroupConnection.groupAdd(groupAuditor);
        } catch (error:any) {
            return AlertComponent(error.message);
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
            AlertComponent(error.message);
        }
        
    }, [user]);


    return (
        <Form onFinish={onFinish}>
            <Form.Item
                label="Group name"
                name="nombre"
                rules={[{ required: true, message: 'Por favor ingresa el nombre de la aplicación' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Description"
                name="descripcion"
                rules={[{ required: true, message: 'Por favor ingresa una descripción' }]}
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
                rules={[{ required: true, message: 'Por favor selecciona al menos un usuario' }]}
            >
                <Select mode="multiple" showSearch filterOption={(input, option) =>
                    (option?.children as any as User)?.nombre.toLowerCase()?.indexOf(input.toLowerCase()) >= 0
                /*TODO: revisar si esto es correcto. */}>
                    {users.map((us: User) => (
                        <Select.Option key={us.id} value={us}>
                            {us.nombre}
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

const mapStateToProps = (state: any) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps) (AddAuditor);