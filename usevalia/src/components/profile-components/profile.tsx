import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { User } from '../Entities/User';
import AlertComponent from '../Alert-Component';
import { getLastTimeChanged, updateUser } from '../../connections/user-connection';

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
                AlertComponent(error.message);
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
                AlertComponent(error.message);
            }
        });

    }


    return (
        <Form form={form} onFinish={handleEditUser}>
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
            >
                <Input value={userProfile?.userProfile.nombre} contentEditable={goingToEdit} />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
            >
                <Input value={userProfile?.userProfile.email} contentEditable={false} />
            </Form.Item>
            <Form.Item
                label="Role"
                name="role"   
            >
                <Input value={userProfile?.userProfile.rol} contentEditable={false} />
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
            
            <Button type="primary" onClick={() => setGoingToEdit(true)} hidden={goingToEdit}>Edit information</Button>
            <Button
                type="primary"
                onClick={() => handleEditUser()} 
                hidden={!goingToEdit}
                htmlType='submit'>
                    Submit
            </Button>
            <Button type="primary" onClick={() => setGoingToEdit(false)} hidden={!goingToEdit}>Cancel</Button>
        </Form>
        )
};

export default Profile;