import { Categoria } from "./Categoria";

export interface Application {
    id: number | undefined;
    nombre: string;
    categoria: Categoria;
    url: string;
    descripcion: string;
}