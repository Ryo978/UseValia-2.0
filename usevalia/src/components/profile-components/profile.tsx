import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { User } from '../Entities/User';
import AlertComponent from '../Alert-Component';
import { getLastTimeChanged, updateUser } from '../../connections/user-connection';
import { connect } from 'react-redux';
import { setUser } from '../../redux/actions';

interface ProfileProps {
    userProfile: User;
    changed: Date;
}


const Profile:React.FC<{ user: any, setUser: any }> = ({ user, setUser}) => {
    const [form] = Form.useForm();
    const [userProfile, setUserProfile] = useState<ProfileProps>();
    const [goingToEdit, setGoingToEdit] = useState<boolean>(false);
 
    useEffect(() => {
        if (userProfile === undefined) {
            try {
                getLastTimeChanged(user.id).then((data: Date) => {
                    setUserProfile({ userProfile: user, changed: data });
                });
            } catch (error:any) {
                message.error(error.message);
            }
        }
    }, [userProfile, user]);

    const handleEditUser = () => {
        form.validateFields().then((values) => {
            try {
            updateUser(user.id, values.name, values.password).then((data: User) => {
                setUser(data);
                setUserProfile({ userProfile: data, changed: new Date() });
            });
            } catch (error:any) {
                message.error(error.message);
            }
        });

    }


    return (
        <Form form={form} onFinish={handleEditUser}>
            <Form.Item
                label="Name"
                name="nombre"
                rules={[{ required: true, message: 'Please input your name!' }]}
                initialValue={user.nombre}
            >
                <Input disabled={!goingToEdit} />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                initialValue={user.email}
            >
                <Input disabled={true} />
            </Form.Item>
            <Form.Item
                label="Role"
                name="role"  
                initialValue={user.rol} 
            >
                <Input disabled={true} />
            </Form.Item>
            <Form.Item
                name="password"
                label="Password"
                hidden={!goingToEdit}
                rules={[
                    {
                        required: true,
                        message: 'Por favor ingresa tu contraseña actual o la que quieras asignar',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirmPassword"
                label="Repeat Password"
                dependencies={['password']}
                hidden={!goingToEdit}
                rules={[
                    {
                        required: true,
                        message: 'Por favor repite tu contraseña',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Las contraseñas no coinciden'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>
            
            {!goingToEdit &&
                <Button type="primary" onClick={() => setGoingToEdit(true)} hidden={goingToEdit}>Edit information</Button>}
            {goingToEdit && <Button
                type="primary"
                onClick={() => handleEditUser()} 
                htmlType='submit'>
                    Submit
            </Button>}
            {goingToEdit &&
                <Button type="primary" onClick={() => setGoingToEdit(false)} >Cancel</Button> }
        </Form>
        )
};

const mapStateToProps = (state: any) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps, { setUser }) (Profile);