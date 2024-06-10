import React, { useState } from 'react';
import { Form, Input, Button, Select, Table, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ScoreSchema } from '../Entities/ScoreSchema';
import { addScoreValue, schemaAdd } from '../../connections/score-scale-connection';
import AlertComponent from '../Alert-Component';
import { ScoreValue } from '../Entities/ScoreValue';

const { Option } = Select;

interface Score {
  value: string;
  type: 'pass' | 'fail';
}

interface FormData {
  scoreName: string;
  description: string;
  scores: Score[];
}

const ScoreAddForm: React.FC = () => {
  const [form] = Form.useForm();
  const [scores, setScores] = useState<Score[]>([]);
  
  const handleAddRow = () => {
    setScores([...scores, { value: '', type: 'pass' }]);
  };

  const handleRemoveRow = (index: number) => {
    const updatedScores = [...scores];
    updatedScores.splice(index, 1);
    setScores(updatedScores);
  };

  const columns = [
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: (text: string, record: Score, index: number) => (
        <Input
          value={text}
          onChange={(e) => {
            const updatedScores = [...scores];
            updatedScores[index].value = e.target.value;
            setScores(updatedScores);
          }}
        />
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (text: string, record: Score, index: number) => (
        <Select
          value={text}
          onChange={(value) => {
            const updatedScores = [...scores];
            updatedScores[index].type = value as 'pass' | 'fail';
            setScores(updatedScores);
          }}
        >
          <Option value="pass">Pass</Option>
          <Option value="fail">Fail</Option>
        </Select>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: Score, index: number) => (
        <Button type="link" onClick={() => handleRemoveRow(index)}>
          Remove
        </Button>
      ),
    },
  ];

  const onFinish = async(values: FormData) => {
    let schemaID: number;
    let schema: ScoreSchema = {
        id: 0,
        nombre: values.scoreName,
        descripcion: values.description,
        };
    try {
        schemaID = await schemaAdd(schema);
        let scoresValues: ScoreValue[] = scores.map((score: Score) => {
            return {
                id: 0,
                escalaId: schemaID,
                nombre: score.value,
                tipo: score.type === 'pass' ? true : false
            };
        });
        await addScoreValue(scoresValues);
        Modal.success({
            title: 'Score added',
            content: 'The score has been added successfully',
            onOk() {
                window.location.reload();
            }
        });

    } catch (error:any) {
        message.error('Adding score failed');
    }

  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item label="Score name" name="scoreName" rules={[{ required: true, message: 'Please input score name!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="Scores">
        <Table
          dataSource={scores}
          columns={columns}
          pagination={false}
        //   rowKey={(record, index) => index.toString()}
        />
        <Button type="dashed" onClick={handleAddRow} style={{ marginTop: '10px' }} icon={<PlusOutlined />}>
          Add Row
        </Button>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ScoreAddForm;