import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { connect } from 'react-redux';
import { clearUser, setUser } from '../redux/actions';
import { login, register } from '../connections/user-connection';
import Modal from 'antd/es/modal/Modal';
import RegistrationForm from './Register';
import AlertComponent from './Alert-Component';
import { User } from './Entities/User';

const LoginForm: React.FC<{ user: any, setUser: any, clearUser: any }> = ({ user, setUser, clearUser }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogin = () => {
        form.validateFields().then((values) => {
            setLoading(true); 
            try {
                login(values.email, values.password.then((data: User) => {
                        setUser(data);
                }));
                setLoading(false);
            } catch (error:any) {
                setLoading(false);
                return AlertComponent(error.message);
            }
        });
    };

    const handleRegister = () => {
        form.validateFields().then((values) => {
            setLoading(true);
            setIsModalOpen(true);
            setLoading(false);
        });
    };

    return (
        <div>
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
            <Modal title="Registrar" open={isModalOpen} footer={null}>
                <RegistrationForm keepAlive={setIsModalOpen} setUser={setUser}/>
            </Modal>
        </div>
    );
};

const mapDispatchToProps = {
    setUser,
    clearUser,
};
const mapStateToProps = (state: any) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);


