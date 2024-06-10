import React, { Children, useEffect, useState } from 'react';
import { Menu, Button, Layout } from 'antd';
import { HomeOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { clearUser, setUser } from '../redux/actions';
import { connect } from 'react-redux';
import { User } from './Entities/User';
import Login from './Login';
import { Outlet } from 'react-router-dom';
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const Home: React.FC<{user: User, clearUser: Function}> = ({user,  clearUser}) => {
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        if (user.id) {
            setIsLogged(true);
        }else{
            setIsLogged(false);
        }
    }, [user]);

    const items =[
        {
            key: '3',
            label: (<Link to= '/apps' >
            Applications
            </Link>),
        },
        {
            key: '4',
            label: (<Link to= '/auditors' >
            Auditors Group
            </Link>),
        },
        {
            key: '5',
            label: (<Link to= '/score-scale' >
            Score Scales
            </Link>),
        },
        {
            key: 'sub1',
            label: 'Catalogs',
            children:[
                {
                    key: '6',
                    label: (<Link to= '/catalogs' >
                    Catalogs
                    </Link>),
                },
                {
                    key: '7',
                    label: (<Link to= '/create-catalog' >
                    Upload Catalogs
                    </Link>),
                },
            ]
        },
        {
            key: 'sub2',
            label: 'Audits',
            children:[
                {
                    key: '8',
                    label: (<Link to= '/audits' >
                    Audits
                    </Link>),
                },
                {
                    key: '9',
                    label: (<Link to= '/create-audit' >
                    Create Audit
                    </Link>),
                },
            ]
        },
        {
            key: '1',
            icon: <UserOutlined />,
            label: (<Link to= '/profile' >
            Profile
            </Link>),
        },
        {
            key: '10',
            text: 'Logout',
            label: (<Button type="link" onClick={() => clearUser()} style={{color: 'lightgrey'}}>
            Logout
            </Button>),
        },
    ]

    if (user.rol === 'admin') {
        items.splice(1, 0, {
            key: '2',
            icon: <SettingOutlined />,
            label: (<Link to= '/admin-page' >
            Administrate Users
            </Link>),
        });
    }

    const mainComponent = () => {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={(broken) => {
                    console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                    }}
                >
                    <div className="demo-logo-vertical">
                    <img src={logo} alt="UseValia Logo" />
                    </div>
                    <Menu theme="dark" mode="inline" items={items} />
                </Sider>
                <Layout style={{ display: 'flex', flexDirection: 'column' }}>
                    <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                    <Content style={{ margin: '24px 16px 0' }}>
                        <Outlet /> 
                    </Content>
                    <Footer style={{ flexShrink: 0, textAlign: 'center' }}>
                        UseValia ©{new Date().getFullYear()} Created by University of Murcia
                    </Footer>
                </Layout>
            </Layout>)
    }
  
    return (
        isLogged ? mainComponent() : <Login />
        
    );
};

const mapStateToProps = (state: any) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps, { clearUser })(Home);