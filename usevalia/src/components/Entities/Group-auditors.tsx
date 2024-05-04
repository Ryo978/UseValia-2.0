import { Tag } from "./Tag";
import { User } from "./User";

export interface GroupAuditor {
    id: number | undefined;
    nombre: string;
    usuarios: User[];
    descripcion: string;
    etiquetas: Tag[];
}