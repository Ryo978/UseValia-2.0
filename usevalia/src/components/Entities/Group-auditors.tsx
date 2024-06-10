import { Tag } from "./Tag";
import { User } from "./User";

export interface GroupAuditor {
    id: number;
    nombre: string;
    usuarios: User[];
    descripcion: string;
    etiquetas: Tag[];
}