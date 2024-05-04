export interface GrupoDirectrices {
    id: number | undefined;
    nombre: string;
    catalogoid: number;
}

export interface Directriz {
    id: number | undefined;
    eid: string;
    nombre: string;
    descripcion: string;
    peso: number | string;
    grupoid: number;
    esquemaid: number;
}