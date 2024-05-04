import { Evaluation } from "./Evaluation";
import { User } from "./User";

export interface Audit {
    id: number  | undefined,
    nombre: string,
    descripcion: string,
    fechaInicio: Date,
    fechaFinEstimada: Date,
    fechaFinReal: Date,
    aplicacionId: number,
    administradorId: number,
    catalogoId: number,
    evaluacion: Evaluation,
    usuarios: User[]
}
