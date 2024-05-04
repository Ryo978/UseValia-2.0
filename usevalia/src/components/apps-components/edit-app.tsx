import React from 'react';
import { Form, Input, Button, Select, App, Alert } from 'antd';
import { Application } from '../Entities/Application';
import { Categoria } from '../Entities/Categoria';
import AppConnection from '../../connections/apps-connection';
import AlertComponent from '../Alert-Component';

const EditApp: React.FC<{ app?: Application }> = ({ app }) => {
    
    const onFinish = (values: any) => {
      
        let aplicacion : Application = {
            id: app?.id,
            nombre: values.nombre,
            categoria: values.categoria,
            url: values.url,
            descripcion: values.descripcion,
        }
        try {
            AppConnection.add(aplicacion);
        } catch (error:any) {
            return AlertComponent(error.message);
        }
    };

    return (
        <Form onFinish={onFinish} initialValues={app}>
            <Form.Item
                label="App name"
                name="nombre"
                rules={[{ required: true, message: 'Por favor ingresa el nombre de la aplicación' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Description"
                name="descripcion"
                rules={[{ required: true, message: 'Por favor ingresa una descripción' }]}
            >
                <Input.TextArea />
            </Form.Item>
            <Form.Item
                label="URL"
                name="url"
                rules={[{ required: true, message: 'Por favor ingresa la url de la aplicación' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Category"
                name="categoria"
                rules={[{ required: true, message: 'Por favor selecciona una categoría' }]}
            >
                <Select>
                    {Object.values(Categoria).map((category) => (
                        <Select.Option key={category} value={category}>
                            {category}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default EditApp;