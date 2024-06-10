import { Button, DatePicker, Form, Input, Modal, Select, Table, message } from "antd";
import { User } from "../Entities/User";
import { Evaluation } from "../Entities/Evaluation";
import { FilterOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { Catalog } from "../Entities/Catalog";
import AppConnection from '../../connections/apps-connection';
import { GroupAuditor } from "../Entities/Group-auditors";
import { Tag } from "../Entities/Tag";
import { Catalog_for_list } from "../catalogs-components/catalogs";
import { Application } from "../Entities/Application";
import { getCatalogsByEscritura } from "../../connections/catalogs-connection";
import { getNombreUser } from "../../connections/user-connection";
import { getNombreSchema } from "../../connections/score-scale-connection";
import GroupConnection from '../../connections/auditors-group-connection';
import { Audit } from "../Entities/Audit";
import { addAudit } from "../../connections/audits-connections";
import { TableRowSelection } from "antd/es/table/interface";

const { Option } = Select;

const CreateAudit: React.FC<{ user: User }> = ({ user }) => {

    const [form] = Form.useForm();
    const [apps, setApps] = useState<Application[]>([]);
    const [catalogs, setCatalogs] = useState<Catalog_for_list[]>([]);
    const [selectedCatalog, setSelectedCatalog] = useState<Catalog_for_list>();
    const [auditors, setAuditors] = useState<GroupAuditor[]>([]);
    const [selectedAuditorGroup, setSelectedAuditorGroup] = useState<GroupAuditor>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (apps.length === 0) {
                    AppConnection.list().then((data: Application[]) => {
                        setApps(data);
                    });
                }

                if (catalogs.length === 0) {
                    let catalogsList: Catalog[] = await getCatalogsByEscritura(user.id as number);
                    
                    let catalogArray: Catalog_for_list[] = await Promise.all(catalogsList.map(async (element: Catalog) => {
                        const autor = await getNombreUser(element.autorid);
                        const score = await getNombreSchema(element.esquemaid);
                        const grupo = await GroupConnection.getNombreGroup(element.grupoid);
                        return {
                            id: element.id as number,
                            name: element.nombre,
                            scoreScale: score,
                            creator: autor,
                            auditorsGroup: grupo,
                            read: element.lectura,
                            write: element.escritura,
                        };
                        
                    }));
                        setCatalogs(catalogArray);  
                }

                if (auditors.length === 0) {

                    GroupConnection.groupList(user.id as number).then((data: GroupAuditor[]) => {
                        setAuditors(data);
                    });
                }
            } catch (error:any) {
                message.error('Loading data failed');
            }
        };

        fetchData();
    }, [user, apps, auditors, catalogs.length]);


    

    const SelectApps = () => {
        return (
            <Select placeholder='- Select -'>
                {apps.map((app: Application) => {
                    return <Option key={app.id} value={app.id}>{app.nombre}</Option>
                })}
            </Select>
        );
    }

    const onFinish = (values: any) => {
        if (selectedCatalog) {
            form.setFieldValue('catalog', selectedCatalog);
        }
        if (selectedAuditorGroup) {
            form.setFieldValue('auditors', selectedAuditorGroup);
        }
        form.validateFields().then(async (values) => {
            let audit: Audit = {   
                id: 0,
                nombre: values.auditName,
                descripcion: values.objective,
                fechaFinEstimada: values.deadline,
                aplicacionId: values.app,
                fechaInicio: new Date(),
                fechaFinReal: null,
                administradorId: user.id as number,
                catalogoId: selectedCatalog?.id as number,
                usuarios: selectedAuditorGroup?.usuarios as User[],
                evaluacion: values.evaluationSystem,
            };
            try{
                audit = await addAudit(audit);
                if (audit.id) {
                    Modal.success({
                        title: 'Audit added',
                        content: 'The Audit has been added successfully',
                        onOk() {
                            window.location.reload();
                        }
                    });
                }
            } catch (error:any) {
                message.error('Adding audit failed');
            }

        });
    };

    const rowSelectionCatalog: TableRowSelection<Catalog_for_list> = {
        type: 'radio',
        hideSelectAll: true,
        onChange: (selectedRowKeys: any, selectedRows: Catalog_for_list[]) => {
            setSelectedCatalog(selectedRows[0]);
            form.setFieldValue('catalog', selectedCatalog);
        },
        getCheckboxProps: (record: Catalog_for_list) => ({
            name: record.name,
        }),
    };


    const catalogColumn = [
        {
            title: 'Catalog Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Score Scale',
            dataIndex: 'scoreScale',
            key: 'scoreScale',
        },
        {
            title: 'Creator',
            dataIndex: 'creator',
            key: 'creator',
        },
        {
            title: 'Auditors Group',
            dataIndex: 'auditorsGroup',
            key: 'auditorsGroup',
        },
        {
            title: 'Read Permission',
            dataIndex: 'read',
            key: 'readPermission',
        },
        {
            title: 'Write Permission',
            dataIndex: 'write',
            key: 'writePermission',
        },
        
    ];

    const rowSelectionAuditor: TableRowSelection<GroupAuditor> = {
        type: 'radio',
        hideSelectAll: true,
        onChange: (selectedRowKeys: any, selectedRows: GroupAuditor[]) => {
            setSelectedAuditorGroup(selectedRows[0]);
            form.setFieldValue('auditors', selectedAuditorGroup);
        },
        getCheckboxProps: (record: GroupAuditor) => ({
            name: record.nombre,
        }),
    };

    const auditorsColumn = [
        {
            title: 'Group Name',
            dataIndex: 'nombre',
            key: 'groupName',
        },
        {
            title: 'Group Members',
            dataIndex: 'usuarios',
            key: 'groupMembers',
            render: (groupMembers: User[]) => (
                <ul>
                    {groupMembers.map(member => (
                        <li key={member.id}>{member.nombre}</li>
                    ))}
                </ul>
            ),
        },
        {
            title: 'Description',
            dataIndex: 'descripcion',
            key: 'description',
        },
        {
            title: 'Tags',
            dataIndex: 'etiquetas',
            key: 'tags',
            render: (tags: Tag[]) => (
                <ul>
                    {tags.map(tag => (
                        <li key={tag.id}>{tag.valor}</li>
                    ))}
                </ul>
            ),
        },
        
    ];



    return (
        <div>
            <Form form={form} layout="vertical">
                <Form.Item name="auditName" label="Audit name" rules={[{ required: true }]}>
                        <Input placeholder="Audit name..." />
                </Form.Item>

                <Form.Item name="objective" label="Objective" rules={[{ required: true }]}>
                    <Input.TextArea />
                </Form.Item>

                <Form.Item name="deadline" label="Deadline" rules={[{ required: true }]}>
                    <DatePicker />
                </Form.Item>

                <Form.Item name="app" label="Choose an app">
                    {SelectApps()}
                </Form.Item>

                <Form.Item name="evaluationSystem" label="Choose the evaluation System" rules={[{ required: true }]}>
                    <Select placeholder='- Select -'>
                        <Option value={Evaluation.BASIC}>{Evaluation.BASIC}</Option>
                        <Option value={Evaluation.STANDARD}>{Evaluation.STANDARD}</Option>
                        <Option value={Evaluation.TASKS}>{Evaluation.TASKS}</Option>
                    </Select>
                </Form.Item>

                <Form.Item name="catalog" label="Catalog for Audit" rules={[{ required: true }]}>
                    <Table
                        rowSelection={
                            rowSelectionCatalog
                        }
                        columns={catalogColumn}
                        dataSource={catalogs}
                        pagination={false}
                    />
                </Form.Item>

                <Form.Item name="auditors" label="Group Auditors" rules={[{ required: true }]}>
                    <Table
                        rowSelection={
                            rowSelectionAuditor
                        }
                        columns={auditorsColumn}
                        dataSource={auditors?.map((auditor: GroupAuditor) => ({...auditor, key: auditor.id}))}
                        pagination={false}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" onClick={onFinish} htmlType="submit">
                        Add
                    </Button>
                </Form.Item>
            </Form>   
        </div>
    )
}


const mapStateToProps = (state: any) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps) (CreateAudit);