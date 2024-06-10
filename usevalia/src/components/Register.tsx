import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { User } from './Entities/User';
import { register } from '../connections/user-connection';

const RegistrationForm: React.FC<{ keepAlive: (value: boolean) => void, setUser: (value: User) => void }> = ({ keepAlive, setUser }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async(values: any) => {
        console.log('Received values of form:', values);
        setLoading(true)
        try {
            await register(values.email, values.password, values.name).then((data: User) => setUser(data));
            setLoading(false);
            keepAlive(false)
        } catch (error:any) {
            setLoading(false);
            message.error('Registration failed, the email is already in use');
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
                        message: 'Put a valid email please',
                    },
                    {
                        required: true,
                        message: 'Please input your email',
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
                        message: 'Please input your name',
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
                        message: 'Please input your password',
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
                        message: 'Please confirm your password',
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
                    Register
                </Button>
                <Button onClick={() => keepAlive(false)}>Cancel</Button>
            </Form.Item>
        </Form>
    );
};

export default RegistrationForm;