import { Evaluation } from "./Evaluation";
import { User } from "./User";

export interface Audit {
    id: number ,
    nombre: string,
    descripcion: string,
    fechaInicio: Date,
    fechaFinEstimada: Date,
    fechaFinReal: Date | undefined | null,
    aplicacionId: number,
    administradorId: number,
    catalogoId: number,
    evaluacion: Evaluation,
    usuarios: User[]
}
