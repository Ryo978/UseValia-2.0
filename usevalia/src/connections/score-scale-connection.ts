import { ScoreSchema } from "../components/Entities/ScoreSchema";
import { ScoreValue } from "../components/Entities/ScoreValue";
import { getAuth } from "../utils/auth";
import { schemaScoreURL, valueScoreURL } from "../utils/constants";

//Schema Part
export const schemaList = async (): Promise<ScoreSchema[]> => {
    const token: string = getAuth() ?? '';
    const response = await fetch(schemaScoreURL+'/list', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'xAuthToken': token,
        },
    });

    if (!response.ok) {
        throw new Error('Error al recuperar las listas de esquema.');
    }
    return response.json();
};

export const schemaDelete = async (id: number): Promise<void> => {
    const token: string = getAuth() ?? '';
    const response = await fetch(schemaScoreURL+'/delete/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'xAuthToken': token,
        },
        body: JSON.stringify(id),
    });

    if (!response.ok) {
        throw new Error('Error al eliminar el esquema con id: '+ id +'.');
    }
}

export const schemaAdd = async (schema: ScoreSchema): Promise<number> => {
    const token: string = getAuth() ?? '';
    const response = await fetch(schemaScoreURL+'/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'xAuthToken': token,
        },
        body: JSON.stringify(schema),
    });

    if (!response.ok) {
        throw new Error('Error al añadir el esquema.');
    }

    return response.json();
}

export const getNombreSchema = async (id: number): Promise<string> => {
    const token: string = getAuth() ?? '';
    const response = await fetch(schemaScoreURL+'/getNombre', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'xAuthToken': token,
        },
        body: JSON.stringify(id),
    });

    if (!response.ok) {
        throw new Error('Error al recuperar el nombre del esquema con id: '+ id +'.');
    }

    return response.json();
}


//Value part
export const valueScoreList = async (id: number): Promise<ScoreValue[]> => {
    const token: string = getAuth() ?? '';
    const response = await fetch(valueScoreURL+'/listbyescala', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'xAuthToken': token,
        },
        body: JSON.stringify(id),
    });

    if (!response.ok) {
        throw new Error('Error al recuperar los valores para el esquema con id: '+ id +'.');
    }

    return response.json();
}

export const deleteScoreValues = async (id: number): Promise<void> => {
    const token: string = getAuth() ?? '';
    const response = await fetch(valueScoreURL+'/deletebyescala/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'xAuthToken': token,
        },
        body: JSON.stringify(id),
    });

    if (!response.ok) {
        throw new Error('Error al eliminar los valores para el esquema con id: '+ id +'.');
    }
}

export const addScoreValue = async (values: ScoreValue[]): Promise<void> => {
    const token: string = getAuth() ?? '';
    const response = await fetch(valueScoreURL+'/multipleAdd', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'xAuthToken': token,
        },
        body: JSON.stringify(values),
    });

    if (!response.ok) {
        throw new Error('Error al añadir el valor.');
    }
}


