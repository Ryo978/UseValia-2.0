export interface GrupoDirectrices {
    id: number ;
    nombre: string;
    catalogoid: number;
}

export interface Directriz {
    id: number ;
    eid: string;
    nombre: string;
    descripcion: string;
    peso: number | string;
    grupoId: number;
    esquemaId: number;
}