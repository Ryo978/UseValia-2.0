import { Button, Form, Input, Select } from "antd";
import AlertComponent from "../Alert-Component";
import { User } from "../Entities/User";
import { updateRol, updateUser } from "../../connections/user-connection";

enum Role {
    ADMIN = 'Admin',
    USER =  'User',
}

const EditUserFromAdmin: React.FC<{ user?: User }> = ({ user }) => {
    
    const onFinish = (values: any) => {
        try {
            updateUser(user?.id as number, user?.nombre as string, values.password);
            updateRol(user?.id as number, values.rol)
        } catch (error:any) {
            return AlertComponent(error.message);
        }
    };

    return (
        <Form onFinish={onFinish} initialValues={user}>
            <Form.Item
                label="Nombre"
                name="nombre"
            >
                <Input contentEditable={false} />
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
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default EditUserFromAdmin;