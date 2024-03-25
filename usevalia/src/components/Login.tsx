import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';

const LoginForm: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        form.validateFields().then((values) => {
            setLoading(true);
            // TODO: Lógica para iniciar sesión
            setLoading(false);
        });
    };

    const handleRegister = () => {
        form.validateFields().then((values) => {
            setLoading(true);
            // TODO: Lógica para registrar
            setLoading(false);
        });
    };

    return (
        <Form form={form} layout="vertical">
            <Form.Item label="Correo electrónico" name="email" rules={[{ required: true, message: 'Por favor ingresa tu correo electrónico' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Contraseña" name="password" rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}>
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Button type="primary" loading={loading} onClick={handleLogin}>
                    Iniciar sesión
                </Button>
                <Button type="link" onClick={handleRegister}>
                    Registrarse
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;