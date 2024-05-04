import { useEffect, useState } from "react";
import { Evaluation } from "../Entities/Evaluation";
import { Priority, turnPesoIntoPriority } from "../Entities/Priority";
import { Modal, Table } from "antd";
import { Audit } from "../Entities/Audit";
import AppConnection from '../../connections/apps-connection';
import { getAudit, getNamesByAudit, listByCategoria } from "../../connections/audits-connections";
import { getCatalog, getDirectricesByGrupoDirectrices, getGrupoDirectricesByCatalogo } from "../../connections/catalogs-connection";
import AlertComponent from "../Alert-Component";
import { Directriz } from "../Entities/Directrices";

interface AuditInformation {
    auditName: string;
    app: string;
    evaluatedCatalog: string;
    auditors: String[];
    evaluation: Evaluation;
    Objective: string;
    auditorStarted: String[];
    auditorNotStarted: String[];
    tasks: String[];
    directrices: Guidelines[];
}

interface Guidelines{
    name: string;
    priority: Priority;
}

const AuditInfoModal: React.FC<{ auditId: number}> = ({auditId}) => {

    const [auditInformation, setAuditInformation] = useState<AuditInformation>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                let audit: Audit = await getAudit(auditId);
                let app = await AppConnection.get(audit.aplicacionId);
                let catalogo = await getCatalog(audit.catalogoId);
                let auditorStarted = await getNamesByAudit(auditId);
                let auditorNotStarted = audit.usuarios.map((user) => user.nombre).filter((name) => 
                    !auditorStarted.includes(name));
                let tasks : String[] = [];
                if (audit.evaluacion === Evaluation.TASKS){
                    let taskss = await listByCategoria(app.categoria);
                    tasks = taskss.map((task) => task.nombre);
                }
                let gruposDirectrices = await getGrupoDirectricesByCatalogo(catalogo.id as number);
                let directricesGrupo: Directriz[] = [];

                gruposDirectrices.forEach(async (grupo) => {
                    let directrices = await getDirectricesByGrupoDirectrices(grupo.id as number);
                    directricesGrupo.push(...directrices);
                });

                if (audit.evaluacion === Evaluation.BASIC){
                    directricesGrupo = directricesGrupo.filter((directriz) => directriz.peso as number < 3);
                }
                let directrices: Guidelines[] = directricesGrupo.map((directriz) => {
                    return {
                        name: directriz.nombre,
                        priority: turnPesoIntoPriority(directriz.peso as number),
                    }
                });
                let auditInformation: AuditInformation = {
                    auditName: audit.nombre,
                    app: app.nombre,
                    evaluatedCatalog: catalogo.nombre,
                    auditors: audit.usuarios.map((user) => user.nombre),
                    evaluation: audit.evaluacion,
                    Objective: audit.descripcion,
                    auditorStarted: auditorStarted,
                    auditorNotStarted: auditorNotStarted,
                    tasks: tasks,
                    directrices: directrices,
                };
                setAuditInformation(auditInformation);
            } catch (error: any) {
                AlertComponent(error.message);
            }
        }
        fetchData();
    }, [auditId]);


    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: "83%",
        },
        {
            title: "Priority",
            dataIndex: "priority",
            key: "priority",
            width: "17%",
        },
    ];
    return (
        <div>
            <Modal title='Audit Information' footer={null} >
                <h2>{auditInformation?.auditName}</h2>
                <p>App: {auditInformation?.app}</p>
                <p>Evaluated Catalog: {auditInformation?.evaluatedCatalog}</p>
                <p>Auditors: {auditInformation?.auditors.join(", ")}</p>
                <p>Objective: {auditInformation?.Objective}</p>
                <p>Auditor Started: {auditInformation?.auditorStarted.join(", ")}</p>
                <p>Auditor Not Started: {auditInformation?.auditorNotStarted.join(", ")}</p>
                <p>Tasks: {auditInformation?.tasks.join(", ")}</p>
                <h3>Guidelines</h3>
                <Table columns={columns} dataSource={auditInformation?.directrices} />
            </Modal>
        </div>
    );
};

export default AuditInfoModal;
