import React from 'react';
import { Form, Input, Button } from 'antd';

const RegistrationForm: React.FC = () => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Received values of form:', values);
        // Aquí puedes realizar la lógica de registro
    };

    const onCancel = () => {
        // Aquí puedes implementar la lógica para volver al login
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
                label="Nombre"
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
                label="Contraseña"
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
                label="Repetir Contraseña"
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
                <Button type="primary" htmlType="submit">
                    Registrarse
                </Button>
                <Button onClick={onCancel}>Cancelar</Button>
            </Form.Item>
        </Form>
    );
};

export default RegistrationForm;