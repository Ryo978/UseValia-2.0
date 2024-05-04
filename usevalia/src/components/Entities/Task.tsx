import { Categoria } from "./Categoria";

export interface Task {
    id: number | undefined,
    nombre: string,
    categoria: Categoria,
}