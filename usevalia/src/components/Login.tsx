import React, { useState } from 'react';
import { Form, Input, Button, Card, Space, message } from 'antd';
import { connect } from 'react-redux';
import { clearUser, setUser } from '../redux/actions';
import { login, resetPassword } from '../connections/user-connection';
import Modal from 'antd/es/modal/Modal';
import RegistrationForm from './Register';
import { User } from './Entities/User';
import logo from '../assets/logo.png'

const LoginForm: React.FC<{ user: any, setUser: any, clearUser: any }> = ({ user, setUser, clearUser }) => {
    const [form] = Form.useForm();
    const [formReset] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReset, setIsReset] = useState(false);

    const handleLogin = async() => {
        try {
            await form.validateFields();
            setLoading(true);
            
            try {
                const values = await form.validateFields();
                const data: User = await login(values.email, values.password);
                setUser(data);
            } catch (error: any) {
                message.error('Login failed, the password or email are incorrect');
            } finally {
                setLoading(false);
            }
        } catch (error: any) {
            setLoading(false);
            message.error('Form validation failed');
        }
    };

    const handleRegister = () => {
            setLoading(true);
            setIsModalOpen(true);
            setLoading(false);
    };

    const handleResetModal = () => {
        formReset.validateFields().then((values) => {
            setLoading(true);
            resetPassword(values.email)
            setLoading(false);
            setIsReset(false);
        });

    };


    const handleResetPassword = () => {
        setIsReset(true);
    
    }

    const resetForm = () => {
        return (
            <Form form={formReset} layout="vertical">
                <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email' }]}>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Space>
                    <Button type="primary" loading={loading} onClick={handleResetModal}>
                        Reset
                    </Button>
                    <Button type="primary" onClick={() => setIsReset(false)}>
                        Back
                    </Button>
                    </Space>      
                </Form.Item>
            </Form>
);
    };

    
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'DarkSlateBlue', }}>
            <Card style={{ width: 400, background: 'SteelBlue' }}>
                <img src={logo} alt="UseValia Logo" />
                {isReset ? resetForm() : 
                    <Form form={form} layout="vertical" >
                        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please, put your email' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please, put your password' }]} >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item>
                            <Space>
                            <Button type="default" loading={loading} onClick={handleLogin}>
                                Login
                            </Button>
                            <Button type="default" onClick={handleRegister}>
                                Register
                            </Button>
                            <Button type="link" onClick={handleResetPassword} style={{color: 'white'}}>
                                Reset Password
                            </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                }
            </Card>
            <Modal title="Registrar" open={isModalOpen} footer={null} destroyOnClose={true}>
                <RegistrationForm keepAlive={setIsModalOpen} setUser={setUser} />
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


