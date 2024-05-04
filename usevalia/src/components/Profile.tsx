import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
    const user = useSelector((state: any) => state.user);
    const [password, setPassword] = useState('');

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (values: any) => {
       // dispatch(changePassword(values.password));//TODO: esto es una llamada a la base de datos, no a otra funcion.
    };

    return (
        <div>
            <h1>Perfil de Usuario</h1>
            <h2>Información del Usuario</h2>
            <p>Nombre: {user.name}</p>
            <p>Email: {user.email}</p>

            <h2>Cambiar Contraseña</h2>
            <Form onFinish={handleSubmit}>
                <Form.Item
                    label="Nueva Contraseña"
                    name="password"
                    rules={[
                        { required: true, message: 'Por favor ingresa una nueva contraseña' },
                        { min: 6, message: 'La contraseña debe tener al menos 6 caracteres' },
                    ]}
                >
                    <Input.Password onChange={handlePasswordChange} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Cambiar Contraseña
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Profile;
