import React, { useState } from 'react';
import { Table, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface Score {
    scoreName: string;
    description: string;
    values: number[];
}

const ScoreScalesPage: React.FC = () => {
    const [scores, setScores] = useState<Score[]>([]);

    const handleDeleteRow = (index: number) => {
        setScores(prevScores => prevScores.filter((_, i) => i !== index));
    };

    const columns = [
        {
            title: 'Score Name',
            dataIndex: 'scoreName',
            key: 'scoreName',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Values',
            dataIndex: 'values',
            key: 'values',
            render: (values: number[]) => values.join(', '),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record: Score, index: number) => (
                <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDeleteRow(index)} />
            ),
        },
    ];

    return (
        <div>
            <h1>Score Scales</h1>
            <Table dataSource={scores} columns={columns} />
        </div>
    );
};

export default ScoreScalesPage;