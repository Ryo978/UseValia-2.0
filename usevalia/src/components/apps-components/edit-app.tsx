import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, App, Alert, Modal, message } from 'antd';
import { Application } from '../Entities/Application';
import { Categoria } from '../Entities/Categoria';
import AppConnection from '../../connections/apps-connection';
import AlertComponent from '../Alert-Component';

const EditApp: React.FC<{ app?: Application }> = ({ app }) => {
    const [form] = Form.useForm();

    const [application, setApplication] = useState<Application>();

    useEffect(() => {
        if (app?.id !== application?.id) {
            try{
                setApplication(app);
                form.setFieldsValue(app);
            } catch (error:any) {
                message.error('Loading application failed');
            }    
        }
    }, [app, application, form]);
    
    const onFinish = (values: any) => {
        let aplicacion : Application = {
            id: app?.id || 0,
            nombre: values.nombre,
            categoria: values.categoria,
            url: values.url,
            descripcion: values.descripcion,
        }
        try {
            AppConnection.add(aplicacion);
            Modal.success({
                title: 'App added',
                content: 'The app has been added successfully',
                onOk() {
                    window.location.reload();
                }
            });
        } catch (error:any) {
            return message.error('Adding app failed');
        }
    };

    return (
        <Form onFinish={onFinish} form={form} >
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