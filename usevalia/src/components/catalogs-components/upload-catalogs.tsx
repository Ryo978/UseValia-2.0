import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Table, Button, TableColumnsType } from 'antd';
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

interface tableInfo {
    name: string;
    priority: Priority;
    rows: any[];

}

const { Option } = Select;


const UploadCatalogs: React.FC<{ user: User}> = ({ user }) => {
    const [form] = Form.useForm();
    const [tables, setTables] = useState<tableInfo[]>([{ name: 'grupo 1', priority: Priority.MEDIUM, rows: [] }]);
    const [auditorsGroup, setAuditorsGroup] = useState<GroupAuditor[]>();
    const [scoreScale, setScoreScale] = useState<ScoreSchema[]>();
    const [auditorGroupSelected, setAuditorGroupSelected] = useState<number>(0);

    useEffect(() => {
        if (!auditorsGroup) {
            GroupConnection.groupList(user.id as number).then((data: GroupAuditor[]) => {
                setAuditorsGroup(data);
            });
        }
        if (!scoreScale) {
            schemaList().then((data: ScoreSchema[]) => {
                setScoreScale(data);
            });
        }

    }, [auditorsGroup, scoreScale, user]);

    const handleAddTable = () => {
        const newTable = { name: `grupo ${tables.length + 1}`, priority: Priority.MEDIUM, rows: [] };
        setTables([...tables, newTable]);
    };

    const handleAddRow = (tableIndex: number) => {
        const newRow = { id: '', name: '', description: '', priority: 'Media' };
        const updatedTables = [...tables];
        updatedTables[tableIndex].rows.push(newRow);
        setTables(updatedTables);
    };
    const handleSave = () => {
        form.validateFields().then(async (values) => {

            // Access specific form fields by name
            const catalogTitle = form.getFieldValue('catalogTitle');
            console.log(catalogTitle);

            // const groupOfAuditors = form.getFieldValue('auditors');
            // console.log(groupOfAuditors);

            const scoreScale = form.getFieldValue('scoreScale');
            console.log(scoreScale);

            const readPermission = form.getFieldValue('readPermission');
            console.log(readPermission);

            const writePermission = form.getFieldValue('writePermission');
            console.log(writePermission);
            let catalog : Catalog = {
                id: undefined,
                nombre: catalogTitle,
                autorid: user.id as number,
                grupoid: auditorGroupSelected as number,
                esquemaid: scoreScale.id as number,
                lectura: readPermission,
                escritura: writePermission,
            };
            catalog = await addCatalog(catalog);
            // Access table fields
            tables.forEach(async (table, tableIndex) => {

                let name = table.name;
                let directrizGroup: GrupoDirectrices = {
                    id: undefined,
                    nombre: name,
                    catalogoid: catalog.id as number,
                };
                directrizGroup = await addGrupoDirectrices(directrizGroup);
                let directrices: Directriz[] = [];
                table.rows.forEach((row, rowIndex) => {
                    directrices.push({
                        id: undefined,
                        eid: row.id,
                        nombre: row.name,
                        descripcion: row.description,
                        peso: turnPriorityIntoPeso(row.priority),
                        grupoid: directrizGroup.id as number,
                        esquemaid: scoreScale.id as number,
                    });
                });

                multipleAddDirectrices(directrices);
            });
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
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRow: GroupAuditor[]) => {
          setAuditorGroupSelected(selectedRow[0].id as number);
        },
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
        },
        {
            title: 'TAGS',
            dataIndex: 'etiquetas',
            key: 'tags',
        },
      ];
    return (
        <div>
            <Form form={form}>
                <Form.Item name="catalogTitle" label="Catalog title" rules={[{ required: true }]}>
                    <Input placeholder="Catalog title" />
                </Form.Item>
                {/*TODO: verificar si grupo de auditors funciona bien */}
                <Form.Item name="auditors" label="Group of Auditors" rules={[{ required: true }]}>
                    <Table
                        rowSelection={
                            rowSelection
                        }
                        columns={auditors}
                        dataSource={auditorsGroup}
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

            {tables.map((table: tableInfo, tableIndex: number) => (
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
                        columns={[
                            { title: 'ID', dataIndex: 'eid' },
                            { title: 'Name', dataIndex: 'nombre' },
                            { title: 'Description', dataIndex: 'descripcion' },
                            { title: 'Priority', dataIndex: 'priority' },
                        ]}
                    />

                    <Button onClick={() => handleAddRow(tableIndex)}>Add Row</Button>
                </div>
            ))}

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