import React, { useState } from 'react';
import { Menu, Button } from 'antd';
import { HomeOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { clearUser, setUser } from '../redux/actions';
import { connect } from 'react-redux';
import Routes from '../routes';

const Home: React.FC = (props) => {
   
    const handleMenuClick = (e: any) => {
        // Aquí puedes manejar la lógica de navegación según la opción seleccionada
        console.log('Menu item clicked:', e.key);
    };

    return (
        <div>
            <h1>UseValia</h1>{/*Cambiar por png */}
            <Menu
                mode="inline"
                onClick={handleMenuClick}
                // cuando se implemente esto, simplemente cogemos la key, la ponemos en un link a la página necesaria, y marchando.
                // style={{ position: 'absolute', top: 50, right: 50 }}
            >
                <Menu.Item key="home" icon={<HomeOutlined />}>
                    Inicio
                </Menu.Item>
                <Menu.Item key="profile" icon={<UserOutlined />}>
                    Perfil
                </Menu.Item>
                <Menu.Item key="settings" icon={<SettingOutlined />}>
                    Configuración
                </Menu.Item>
            </Menu>
            <Routes />
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps, { setUser, clearUser })(Home);