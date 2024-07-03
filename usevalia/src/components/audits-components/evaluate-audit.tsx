import { connect } from "react-redux";
import { Imagen } from "../Entities/Imagen";
import { User } from "../Entities/User";
import AppConnection from '../../connections/apps-connection';
import { useEffect, useState } from "react";
import { Task } from "../Entities/Task";
import { addImagen, addScore, getAudit, getImagenByScore, listByCategoria, listScoreByTask, listScoreByUser } from "../../connections/audits-connections";
import { Audit } from "../Entities/Audit";
import { getCatalog, getDirectricesByGrupoDirectrices, getGrupoDirectricesByCatalogo } from "../../connections/catalogs-connection";
import { Evaluation } from "../Entities/Evaluation";
import { Directriz, GrupoDirectrices } from "../Entities/Directrices";
import { Score, ScoreValue } from "../Entities/ScoreValue";
import { Table, Select, Input, Upload, Button, Space, message } from 'antd';
import { listByDirectriz } from "../../connections/score-scale-connection";
import { useNavigate } from "react-router-dom";

interface ScoreGuideline {
    idDirectriz: number;
    idTask: number | undefined;
    idScore: number | undefined;
    name: string;
    description: string;
    puntuacion: string;
    observacion: string;
    mejora: string;
    imagen: Imagen | null;
}

interface AuditInformationEvaluation{
    id: number;
    auditName: string;
    app: string;
    evaluatedCatalog: string;
    url: string;
    directrices: Directriz[];
}

const { Option } = Select;

const EvaluateAudit: React.FC<{ user: User, auditId: number }> = ({ user, auditId }) => {
    const [auditInformation, setAuditInformation] = useState<AuditInformationEvaluation>();
    const [scoreGuidelines, setScoreGuidelines] = useState<ScoreGuideline[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTask] = useState<number>(0);
    const [previousTask, setPreviousTask] = useState<number>(-1);
    const [grupoDirectrices, setGrupoDirectrices] = useState<GrupoDirectrices[]>([]);
    const [scoreValues, setScoreValues] = useState<ScoreValue[]>([]);
    const navigate = useNavigate();

    useEffect(() => { //Effect para cargar la información de la auditoría
        const fetchData = async () => {
            try {
                let audit: Audit = await getAudit(auditId);
                console.log(auditId)
                let app = await AppConnection.get(audit.aplicacionId);
                let catalogo = await getCatalog(audit.catalogoId);
                console.log(audit.evaluacion);
                if (audit.evaluacion === Evaluation.TASKS) {
                    console.log('entra en tasks');
                    await listByCategoria(app.categoria).then((data: Task[]) => {
                        console.log(data);
                        setTasks(data);
                    });
                }
                let gruposDirectrices = await getGrupoDirectricesByCatalogo(catalogo.id as number);
                let directricesGrupo: Directriz[] = [];
                setGrupoDirectrices(gruposDirectrices);

                await Promise.all(gruposDirectrices.map(async (grupo) => {
                    let directrices = await getDirectricesByGrupoDirectrices(grupo.id as number);
                    directricesGrupo.push(...directrices);
                }));
                let scoreValues: ScoreValue[] = await listByDirectriz(directricesGrupo[0].id as number);
                setScoreValues(scoreValues);
                if (audit.evaluacion === Evaluation.BASIC){
                    directricesGrupo = directricesGrupo.filter((directriz) => directriz.peso as number < 3);
                }
                let auditInitialInformation: AuditInformationEvaluation = {
                    id: audit.id as number,
                    auditName: audit.nombre,
                    app: app.nombre,
                    evaluatedCatalog: catalogo.nombre,
                    url: app.url,
                    directrices: directricesGrupo,
                }
                setAuditInformation(auditInitialInformation);

            } catch (error: any) {
                message.error(error.message);
            }
        }
        fetchData();
    }, [auditId]);

    useEffect(() => {
        setPreviousTask(-1);
        setSelectedTask(0);
    }, [auditId]);

    useEffect(() => { //Effect para cargar las puntuaciones

        const fetchData = async () => {
            try {
                console.log('Audit id en cuanto hay que cargar datos:',auditId);
                let scores: Score[];
                if (tasks.length > 0) {
                    scores = await listScoreByTask(user.id as number, tasks[selectedTask].id as number, auditId as number);
                }
                else {
                    scores = await listScoreByUser(user.id as number, auditId as number);
                }
                let scoresGuidelines: ScoreGuideline[] = [];
                if (auditInformation?.directrices) {
                    await Promise.all(auditInformation?.directrices.map(async (directriz) => {

                        let score = scores.find((score) => score.directrizId === directriz.id);
                        let imagen: Imagen | null = null;
                        if (score?.imagenId){
                            imagen = await getImagenByScore(score?.id as number);
                        }
                        let scoreGuideline: ScoreGuideline = {
                            idDirectriz: directriz.id as number,
                            idTask: tasks[selectedTask]?.id || 0,
                            idScore: score?.id || 0,
                            name: directriz.nombre,
                            description: directriz.descripcion,
                            puntuacion: score?.puntuacion as string || '',
                            observacion: score?.observacion as string || '',
                            mejora: score?.mejora as string || '',
                            imagen: imagen,
                        }
                        scoresGuidelines.push(scoreGuideline);
                    }));
                }
                    

                setScoreGuidelines(scoresGuidelines);
                if (scoreGuidelines.length > 0 && selectedTask !== previousTask)
                    setPreviousTask(selectedTask);
            } catch (error: any) {
                message.error(error.message);
            }
        }
        if (selectedTask !== previousTask) {
            fetchData();
        }
    } , [selectedTask, previousTask, auditId, tasks, auditInformation, user.id]);

    const getFilteredScoreGuidelines = (grupoId: number) => {

        // Obtener las directrices para el grupo actual
        const directricesGrupo : Directriz[] | undefined  = auditInformation?.directrices.filter((directriz) => {
            return directriz.grupoId === grupoId});
    
        // Si no hay directrices para este grupo, retornar un array vacío
        if (!directricesGrupo) return [];
    
        // Obtener los IDs de las directrices de este grupo
        const directrizIds = directricesGrupo.map((directriz) => directriz.id);
        // Filtrar los scoreGuidelines que corresponden a las directrices de este grupo
        return scoreGuidelines.filter((scoreGuideline) => directrizIds.includes(scoreGuideline.idDirectriz));
    };

    const save = async (score : ScoreGuideline) => {
        let scoreSave: Score = {
            id: score.idScore || 0,
            puntuacion: score.puntuacion,
            usuarioId: user.id as number,
            auditoriaId: auditInformation?.id as number,
            directrizId: score.idDirectriz,
            observacion: score.observacion,
            mejora: score.mejora,
            tareaId: score.idTask as number,
            imagenId: score.imagen?.id || 0,
        }

        let scoreReturn = await addScore(scoreSave);

        if (score.imagen && score.imagen.id === 0 && scoreReturn.id !== 0){
            try{
                await addImagen(scoreReturn.id as number, score.imagen as Imagen);
            }
            catch (error: any){
                message.error(error.message);
            }
        }
        
    };

    const handleSave = async () => {
        scoreGuidelines.forEach(async (score) => {
            if (score.puntuacion !== '')
                await save(score);
        });
        navigate('/audits');
    };
    const handleContinue = async () => {
        scoreGuidelines.forEach(async (score) => {
            await save(score);
        });
        setSelectedTask(selectedTask + 1);

    };
    const handlePrevious = async () => {
        scoreGuidelines.forEach(async (score) => {
            await save(score);
        });
        setSelectedTask(selectedTask - 1);

    };

    const options = () => {
        return scoreValues.map((value) => (
            <Option key={value.nombre} value={value.nombre}>{value.nombre}</Option>
        ));
    }

    const turnImagenintoImage = (imagen: Imagen) => {
        const blob = new Blob([new Uint8Array(imagen.datosImagen)], { type: 'image/jpeg' });

        const url = URL.createObjectURL(blob);
        return url;
    }

    const handleButtonUploadClick = ( record: ScoreGuideline) => {
        const input = document.querySelector(`#fileInput-${record.idDirectriz}-${record.idTask}`) as HTMLInputElement | null;
        if (input) {
            (input as HTMLInputElement).click();
        }
    };

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>, record: ScoreGuideline) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
            if (e.target) {
                const arrayBuffer = e.target.result as ArrayBuffer;
                const bytesArray = new Uint8Array(arrayBuffer);
                setScoreGuidelines(scoreGuidelines.map((score) => {
                    if (score.idDirectriz === record.idDirectriz && score.idTask === record.idTask){
                        score.imagen = {
                            id: 0,
                            datosImagen: Array.from(bytesArray),
                        };
                    }
                    return score;
                }));
            }
            };
            reader.readAsArrayBuffer(file);
        }
        };


    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Score",
            dataIndex: "puntuacion",
            key: "puntuacion",
            render: (text: string, record: ScoreGuideline) => {
                return (
                <Select
                    value={text}
                    style={{ minWidth: 100 }}  // Establece un tamaño mínimo adecuado aquí
                    onChange={(value) => {
                        setScoreGuidelines(scoreGuidelines.map((score) => {
                            if (score.idDirectriz === record.idDirectriz && score.idTask === record.idTask){
                                score.puntuacion = value;
                            }
                            return score;
                        }));
                    }}
                >
                    {options()}
                </Select>
            )},
        },
        {
            title: "Notes",
            dataIndex: "observacion",
            key: "observacion",
            render: (text: string, record: ScoreGuideline) => (
                <Input.TextArea
                    value={text}
                    onChange={(e) => {
                        setScoreGuidelines(scoreGuidelines.map((score) => {
                            if (score.idDirectriz === record.idDirectriz && score.idTask === record.idTask){
                                score.observacion = e.target.value;
                            }
                            return score;
                        }));
                    }}
                />
            ),
        },
        {
            title: "Suggestion",
            dataIndex: "mejora",
            key: "mejora",
            render: (text: string, record: ScoreGuideline) => (
                <Input.TextArea
                    value={text}
                    onChange={(e) => {
                        setScoreGuidelines(scoreGuidelines.map((score) => {
                            if (score.idDirectriz === record.idDirectriz && score.idTask === record.idTask){
                                score.mejora = e.target.value;
                            }
                            return score;
                        }));
                    }}
                />
            ),
        },
        
        {
            title: "Image",
            dataIndex: "imagen",
            key: "imagen",
            render: (imagen: Imagen, record: ScoreGuideline) => {
                return (
                <div>
                    {record?.imagen && (
                        <img
                            src={turnImagenintoImage(record.imagen)}
                            alt=""
                            style={{ width: "100px", height: "100px" }}
                        />
                    )}
                </div>
            )},
        },
        {
            title: "Upload image",
            //dataIndex: "imagen",
            key: "imagenUpload",
            render: (text: string, record: ScoreGuideline,) => (
                <div>
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => handleUpload(e, record)} 
                    style={{ display: 'none' }} 
                    id={`fileInput-${record.idDirectriz}-${record.idTask}`}
                />

                <Button onClick={() => handleButtonUploadClick(record)}>
                    Upload Image
                </Button>
            </div>
            ),


        }
        

    ];
    

    return (
        <div>
            <h1>Evaluate Audit: {auditInformation?.auditName}</h1>
            <p>Application: {auditInformation?.app}</p>
            <p>URL: <a href={auditInformation?.url} target="_blank" rel="noreferrer">
                    {auditInformation?.url}
                </a>
            </p>
            <p>Catalog: {auditInformation?.evaluatedCatalog}</p>

            {tasks.length > 0 && (
                <div>
                    <h2>Task: {tasks[selectedTask].nombre}</h2>
                </div>
            )}
            
        {grupoDirectrices?.map((grupo) => (
            <div key={grupo.id}>
                <h2>{grupo.nombre}</h2>
                <Table
                    columns={columns}
                    pagination={false}
                    dataSource={getFilteredScoreGuidelines(grupo.id)}
                    rowKey="idDirectriz"
                />
            </div>
        ))}
        <Space>
            {(tasks.length !== 0 && selectedTask - 1 >= 0) &&
             <Button type="primary" onClick={handlePrevious}>Previous</Button>}
            {(tasks.length === 0 || selectedTask + 1 === tasks.length) &&
             <Button type="primary" onClick={handleSave}>Save</Button>}
            {(tasks.length !== 0 && selectedTask + 1 !== tasks.length) &&
             <Button type="primary" onClick={handleContinue}>Save & Continue</Button>}
        </Space>
        </div>
    )


}

const mapStateToProps = (state: any) => {
    return {
        user: state.user,
        auditId: state.audit,
    };
};

export default connect(mapStateToProps)( EvaluateAudit);