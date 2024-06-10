export interface ScoreValue {
    id: number;
    nombre: string;
    tipo: boolean;
    escalaId: number | undefined;
}

export interface Score{
    id: number;
    puntuacion: string;
    usuarioId: number;
    auditoriaId: number;
    directrizId: number;
    observacion: string;
    mejora: string;
    tareaId: number;
    imagenId: number | null;
}
