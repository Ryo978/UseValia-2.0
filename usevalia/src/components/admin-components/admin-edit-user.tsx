import { Button, Form, Input, Select, message } from "antd";
import AlertComponent from "../Alert-Component";
import { User } from "../Entities/User";
import { updateRol, updateUser } from "../../connections/user-connection";
import { useEffect } from "react";

enum Role {
    ADMIN = 'Admin',
    USER =  'User',
}

const EditUserFromAdmin: React.FC<{ user?: User }> = ({ user }) => {

    const [form] = Form.useForm();

    useEffect(() => {
        if (user) {
            form.setFieldsValue(user);
        }
    }, [user, form]);
    
    const onFinish = async (values: any) => {
        try {
            await updateUser(user?.id as number, user?.nombre as string, values.password);
            await updateRol(user?.id as number, values.rol.toLowerCase() as string);
            window.location.reload();
        } catch (error:any) {
            message.error('Updating user failed');
        }
    };

    return (
        <Form onFinish={onFinish} form={form}>
            <Form.Item
                label="Nombre"
                name="nombre"
            >
                <Input disabled={true} />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Por favor actualice la contraseña'}]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                label="Role"
                name="rol"
                rules={[{ required: true, message: 'Por favor actualice la contraseña'}]}
                >
                <Select>
                    <Select.Option value={Role.ADMIN}>{Role.ADMIN}</Select.Option>
                    <Select.Option value={Role.USER}>{Role.USER}</Select.Option>
                </Select>
            </Form.Item>
            
            <Form.Item>
                <Button type="primary" htmlType="submit" onClick={onFinish}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default EditUserFromAdmin;