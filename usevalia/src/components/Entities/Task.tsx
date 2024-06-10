import { Categoria } from "./Categoria";

export interface Task {
    id: number,
    nombre: string,
    categoria: Categoria,
}