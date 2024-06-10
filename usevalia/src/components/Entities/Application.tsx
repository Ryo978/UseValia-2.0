import { Categoria } from "./Categoria";

export interface Application {
    id: number;
    nombre: string;
    categoria: Categoria;
    url: string;
    descripcion: string;
}