import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Table, Button, TableColumnsType, Alert, Modal, message } from 'antd';
import { Permission } from '../Entities/Permission';
import { Priority, turnPriorityIntoPeso } from '../Entities/Priority';
import { GroupAuditor } from '../Entities/Group-auditors';
import { ScoreSchema } from '../Entities/ScoreSchema';
import GroupConnection from '../../connections/auditors-group-connection';
import { User } from '../Entities/User';
import { connect } from 'react-redux';
import { schemaList } from '../../connections/score-scale-connection';
import { Tag } from '../Entities/Tag';
import { Catalog } from '../Entities/Catalog';
import { addCatalog, addGrupoDirectrices, multipleAddDirectrices } from '../../connections/catalogs-connection';
import { Directriz, GrupoDirectrices } from '../Entities/Directrices';
import { TableRowSelection } from 'antd/es/table/interface';
import { render } from '@testing-library/react';

interface tableInfo {
    name: string;
    priority: Priority;
    rows: DirectrizRow[];

}

interface DirectrizRow {
    key: string; 
    id: string,
    name: string,
    description: string,
    priority:  Priority
}

const { Option } = Select;


const UploadCatalogs: React.FC<{ user: User}> = ({ user }) => {
    const [form] = Form.useForm();
    const [tables, setTables] = useState<tableInfo[]>([{ name: 'grupo 1', priority: Priority.MEDIUM,
     rows: [{ key: '0', id: '', name: '', description: '', priority:  Priority.MEDIUM  }]}]);
    const [auditorsGroup, setAuditorsGroup] = useState<GroupAuditor[]>();
    const [scoreScale, setScoreScale] = useState<ScoreSchema[]>();
    const [auditorGroupSelected, setAuditorGroupSelected] = useState<number>(0);

    useEffect(() => {
        if (!auditorsGroup) {
            try{
                GroupConnection.groupList(user.id as number).then((data: GroupAuditor[]) => {
                    setAuditorsGroup(data);
                });
            } catch (error:any) {
                message.error('Loading auditors failed');
            }
        }
        if (!scoreScale) {
            try{
                schemaList().then((data: ScoreSchema[]) => {
                    setScoreScale(data);
                });
            } catch (error:any) {
                message.error('Loading score scale failed');
            }
        }

    }, [auditorsGroup, scoreScale, user]);

    const handleAddTable = () => {
        const newTable = { name: `grupo ${tables.length + 1}`, priority: Priority.MEDIUM, rows: [] };
        setTables([...tables, newTable]);
    };

    const handleAddRow = (tableIndex: number) => {
        const newRow = {key: `${Date.now()}`, id: '', name: '', description: '', priority:  Priority.MEDIUM };
        const updatedTables = [...tables];
        updatedTables[tableIndex].rows = [...updatedTables[tableIndex].rows, newRow];
        setTables([...updatedTables]);
    };
    const handleSave = () => {
        if (auditorGroupSelected !== 0){
            form.setFieldValue('auditors', auditorGroupSelected);
        }
        form.validateFields().then(async (values) => {

            // Access specific form fields by name
            const catalogTitle = form.getFieldValue('catalogTitle');

            const scoreScale = form.getFieldValue('scoreScale');

            const readPermission = form.getFieldValue('readPermission');

            const writePermission = form.getFieldValue('writePermission');
            let catalog : Catalog = {
                id: 0,
                nombre: catalogTitle,
                autorid: user.id as number,
                grupoid: auditorGroupSelected as number,
                esquemaid: scoreScale as number,
                lectura: readPermission,
                escritura: writePermission,
            };
            try{
                catalog = await addCatalog(catalog);
                // Access table fields
                tables.forEach(async (table, tableIndex) => {

                    let name = table.name;
                    let directrizGroup: GrupoDirectrices = {
                        id: 0,
                        nombre: name,
                        catalogoid: catalog.id as number,
                    };
                    directrizGroup = await addGrupoDirectrices(directrizGroup);
                    let directrices: Directriz[] = [];
                    table.rows.forEach((row, rowIndex) => {
                        directrices.push({
                            id: 0,
                            eid: row.id,
                            nombre: row.name,
                            descripcion: row.description,
                            peso: turnPriorityIntoPeso(row.priority),
                            grupoId: directrizGroup.id as number,
                            esquemaId: scoreScale as number,
                        });
                    });
                    await multipleAddDirectrices(directrices);
                });

                Modal.success({
                    title: 'Catalog added',
                    content: 'The catalog has been added successfully',
                    onOk() {
                        window.location.reload();
                    }
                });
            } catch (error:any) {
                message.error('Adding catalog failed');
            }
        }).catch((error) => {
            console.log('Form validation failed:', error);
        });
    };

    const printEtiquetas = (etiquetas: Tag[]) => {
        let etiquetasString = '';
        etiquetas.forEach((etiqueta) => {
            etiquetasString += etiqueta.valor + ', ';
        });
        return etiquetasString.slice(0, -2);
    }

    const SelectPermissions = (placeholder: string) =>{
        return (
            <Select placeholder={placeholder}>
                <Option value={Permission.PUBLICO}>{Permission.PUBLICO}</Option>
                <Option value={Permission.PRIVADO}>{Permission.PRIVADO}</Option>
                <Option value={Permission.GRUPO}>{Permission.GRUPO}</Option>
            </Select>)
    }
    const rowSelection: TableRowSelection<GroupAuditor>  = {
        type: 'radio',
        hideSelectAll: true,
        onChange: (selectedRowKeys: React.Key[], selectedRow: GroupAuditor[]) => {
        if (selectedRow.length > 0)
            setAuditorGroupSelected(selectedRow[0].id as number );
        else    
            setAuditorGroupSelected(0);
        },
        getCheckboxProps: (record: GroupAuditor) => ({
           name: record.nombre,
         }),
      };

    const auditors: TableColumnsType<GroupAuditor> = [
        {
            title: 'AuditorGroup',
            dataIndex: 'nombre',
            key: 'auditorGroup',
        },
        {
            title: 'Users',
            dataIndex: 'usuarios',
            key: 'users',
            render: (users: User[]) => (
                <ul>
                    {users.map(user => (
                        <li key={user.id}>{user.nombre}</li>
                    ))}
                </ul>
            ),
        },
        {
            title: 'TAGS',
            dataIndex: 'etiquetas',
            key: 'tags',
            render: (tags: Tag[]) => (
                <div>{printEtiquetas(tags)}</div>
            ),
        },
      ];



      const createColumnsDirectriz = (tableIndex: number) => [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (text: string, record: DirectrizRow, index: number) => (
                <Input
                    value={text}
                    onChange={(e) => {
                        const updatedTables = [...tables];
                        updatedTables[tableIndex].rows[index].id = e.target.value;
                        setTables(updatedTables);
                    }}
                />
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text: string, record: DirectrizRow, index: number) => (
                <Input
                    value={text}
                    onChange={(e) => {
                        const updatedTables = [...tables];
                        updatedTables[tableIndex].rows[index].name = e.target.value;
                        setTables(updatedTables);
                    }}
                />
            ),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            render: (text: string, record: DirectrizRow, index: number) => (
                <Input.TextArea
                    value={text}
                    onChange={(e) => {
                        const updatedTables = [...tables];
                        updatedTables[tableIndex].rows[index].description = e.target.value;
                        setTables(updatedTables);
                    }}
                />
            ),
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
            render: (text: Priority, record: DirectrizRow, index: number) => (
                <Select
                    value={text}
                    onChange={(value) => {
                        const updatedTables = [...tables];
                        updatedTables[tableIndex].rows[index].priority = value as Priority;
                        setTables(updatedTables);
                    }}
                >
                    <Option value={Priority.HIGH}>{Priority.HIGH}</Option>
                    <Option value={Priority.MEDIUM}>{Priority.MEDIUM}</Option>
                    <Option value={Priority.LOW}>{Priority.LOW}</Option>
                </Select>
            ),
        },
    ];
    return (
        <div>
            <Form form={form}>
                <Form.Item name="catalogTitle" label="Catalog title" rules={[{ required: true }]}>
                    <Input placeholder="Catalog title" />
                </Form.Item>
                <Form.Item name="auditors" label="Group of Auditors" rules={[{ required: true }]}>
                    <Table
                        rowSelection={rowSelection}
                        columns={auditors}
                        dataSource={auditorsGroup?.map(auditor => ({ ...auditor, key: auditor.id }))}
                        pagination={false}
                    />
                </Form.Item>

                <Form.Item name="scoreScale" label="Score scale" rules={[{ required: true }]}>
                    <Select placeholder="Score scale">
                        {scoreScale?.map((schema: ScoreSchema) => (
                            <Option key={schema.id} value={schema.id}>{schema.nombre}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="readPermission" label="Read permission">
                    {SelectPermissions("Read permission")}
                </Form.Item>

                <Form.Item name="writePermission" label="Write permission">
                    {SelectPermissions("Write permission")}
                </Form.Item>
            </Form>

            <Button onClick={handleAddTable}>Add Table</Button>

            {tables.map((table: tableInfo, tableIndex: number) => {
                return(
                <div key={tableIndex}>
                    <h3>
                        <Input
                            value={table.name}
                            onChange={(e) => {
                                const updatedTables = [...tables];
                                updatedTables[tableIndex].name = e.target.value;
                                setTables(updatedTables);
                            }}
                        />
                    </h3>

                    <Table
                        dataSource={table.rows}
                        columns={createColumnsDirectriz(tableIndex)}
                        rowKey="key"
                        pagination={false}
                    />

                    <Button onClick={() => handleAddRow(tableIndex)}>Add Row</Button>
                </div>
            )})}
            <br />
            <Button type="primary" onClick={handleSave}>Save</Button>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)( UploadCatalogs);