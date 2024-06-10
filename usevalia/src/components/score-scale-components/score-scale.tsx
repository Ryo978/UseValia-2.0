import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Space, Input, message } from 'antd';
import { DeleteOutlined, FilterOutlined } from '@ant-design/icons';
import { ScoreSchema } from '../Entities/ScoreSchema';
import { ScoreValue } from '../Entities/ScoreValue';
import { deleteScoreValues, schemaDelete, schemaList, valueScoreList } from '../../connections/score-scale-connection';
import { connect } from 'react-redux';
import ScoreAddForm from './new-score-scale';

interface Score {
    id: number;
    scoreName: string;
    description: string;
    values: string[];
}

const ScoreScalesPage: React.FC<{ user: any }> = ({ user }) => {
    const [scores, setScores] = useState<Score[]>([]);
    const [filteredScores, setFilteredScores] = useState<Score[]>([]);
    const [searchTextName, setSearchTextName] = useState<string>('');
    const [searched, setSearched] = useState<boolean>(false);
    const [scorelength, setScoreLength] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            let schema: ScoreSchema[];
            let value: ScoreValue[];

            schema = await schemaList();
            const scoreArray = await Promise.all(schema.map(async (element) => {
                const value = await valueScoreList(element.id as number);

                return {
                    id: element.id as number,
                    scoreName: element.nombre,
                    description: element.descripcion,
                    values: value.map(v => v.nombre),
                };
            }));
            setSearched(true);
            setScoreLength(scoreArray.length);
            setScores(scoreArray);
            setFilteredScores(scoreArray);
        };
        if ((scores.length === 0 && !searched) || scores.length !== scorelength) {
            try{
                fetchData();
            } catch (error) {
                message.error('Loading scores failed');
            }
        }
    }, [scores, scorelength, searched]);

    const handleSearch = () => {
        if (searchTextName === '') {
            setFilteredScores(scores);
            return;
        }
        const filteredValue = filteredScores.filter(scs => 
            scs.scoreName.toLowerCase().includes(searchTextName.toLowerCase()));
        setFilteredScores(filteredValue);
    }

    const handleSearchNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTextName(e.target.value);
    };

    const handleDeleteRow = (index: number) => {
        Modal.confirm({
            title: 'Delete Score',
            content: 'Are you sure you want to delete the Score?',
            async onOk() {
                try{
                    await deleteScoreValues(filteredScores[index].id).then(() => {
                        schemaDelete(filteredScores[index].id).then(() => {
                            setScores(scores.filter((sc, i) => sc.id !== filteredScores[index].id));
                            setSearched(false);
                        });
                    });
                } catch (error) {
                    message.error('Failed to delete score');
                }
            },
        });
    };
    const handleAdd = () => {
        return Modal.info({
            title: 'Add Score',
            content: <ScoreAddForm />,
            footer: null,
            closable: true,
            icon: null,
        });
    }

    const columns = [
        {
            title: 'Score Name',
            dataIndex: 'scoreName',
            key: 'scoreName',
            filterDropdown: () => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder="Search name"
                        value={searchTextName}
                        onChange={handleSearchNameChange}
                        onPressEnter={handleSearch}
                    />
                    <Button type="primary" onClick={handleSearch}>Search</Button>
                </div>
            ),
            filterIcon: <FilterOutlined />,
            // Filtro personalizado para buscar en minúsculas
            onFilter: (value: any, record: Score) =>
                record.scoreName.toLowerCase().includes(value.toLowerCase()),
            // Ordena alfabéticamente
            sorter: (a: Score, b: Score) => a.scoreName.localeCompare(b.scoreName),
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
            render: (_: any, record: Score, index: number) => (
                <Space>
                {user.rol === 'admin' &&
                    <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDeleteRow(index)} />
                }
                </Space>
            ),
        },
    ];

    return (
        <div>
            <h1>Score Scales</h1>
            <Button type="primary" onClick={() => handleAdd()}>Add Score Scales</Button>
            <Table dataSource={filteredScores} columns={columns} pagination={false} />
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)( ScoreScalesPage);