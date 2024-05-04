import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { User } from './Entities/User';
import AlertComponent from './Alert-Component';
import { register } from '../connections/user-connection';

const RegistrationForm: React.FC<{ keepAlive: (value: boolean) => void, setUser: (value: User) => void }> = ({ keepAlive, setUser }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = (values: any) => {
        values.preventDefault();
        console.log('Received values of form:', values);
        setLoading(true)
        try {
            register(values.email, values.password, values.name).then((data: User) => setUser(data));
            setLoading(false);
            keepAlive(false)
        } catch (error:any) {
            setLoading(false);
            return AlertComponent(error.message);
        }
    };


    return (
        <Form form={form} onFinish={onFinish}>
            <Form.Item
                name="email"
                label="Email"
                rules={[
                    {
                        type: 'email',
                        message: 'Por favor ingresa un email válido',
                    },
                    {
                        required: true,
                        message: 'Por favor ingresa tu email',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="name"
                label="Name"
                rules={[
                    {
                        required: true,
                        message: 'Por favor ingresa tu nombre',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Por favor ingresa tu contraseña',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirmPassword"
                label="Repeat Password"
                dependencies={['password']}
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

            <Form.Item>
                <Button type="primary" loading={loading} htmlType="submit">
                    Registrarse
                </Button>
                <Button onClick={() => keepAlive(false)}>Cancelar</Button>
            </Form.Item>
        </Form>
    );
};

export default RegistrationForm;