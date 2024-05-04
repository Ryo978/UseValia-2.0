import { Audit } from "../components/Entities/Audit";
import { Categoria } from "../components/Entities/Categoria";
import { Task } from "../components/Entities/Task";
import { getAuth } from "../utils/auth";
import { auditURL, scoreURL, taskURL } from "../utils/constants";


export const listAudits = async () : Promise<Audit[]> => {
    const token = getAuth() ?? '';
    const response = await fetch(auditURL+'/list', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'xAuthToken': token,
        },
    });

    if (!response.ok) {
        throw new Error('Error al recuperar las listas de Auditorias.');
    }

    return response.json();
}

export const listAuditByUser = async (id: number) : Promise<Audit[]> => {
    const token = getAuth() ?? '';
    const response = await fetch(auditURL+'/listByUser', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'xAuthToken': token,
        },
        body: JSON.stringify(id),
    });

    if (!response.ok) {
        throw new Error('Error al recuperar las listas de Auditorias.');
    }

    return response.json();
}

export const getAudit = async (id: number) : Promise<Audit> => {
    const token = getAuth() ?? '';
    const response = await fetch(auditURL+'/get', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'xAuthToken': token,
        },
        body: JSON.stringify(id),
    });

    if (!response.ok) {
        throw new Error('Error al recuperar la Auditoria.');
    }

    return response.json();
}

export const getEvaluationStatus = async (id: number) : Promise<Boolean> =>  {
    const token = getAuth() ?? '';
    const response = await fetch(auditURL+'/getEvaluationStatus', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'xAuthToken': token,
        },
        body: JSON.stringify(id),
    });

    if (!response.ok) {
        throw new Error('Error al recuperar el estado de evaluación.');
    }

    return response.json();
}

export const closeAudit = async (id: number) : Promise<void> => {
    const token = getAuth() ?? '';
    const response = await fetch(auditURL+'/closeAudit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'xAuthToken': token,
        },
        body: JSON.stringify(id),
    });

    if (!response.ok) {
        throw new Error('Error al cerrar la Auditoria.');
    }
}

export const openAudit = async (id: number) : Promise<void> => {
    const token = getAuth() ?? '';
    const response = await fetch(auditURL+'/openAudit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'xAuthToken': token,
        },
        body: JSON.stringify(id),
    });

    if (!response.ok) {
        throw new Error('Error al abrir la Auditoria.');
    }
}

export const deleteAudit = async (id: number) : Promise<void> => {
    const token = getAuth() ?? '';
    const response = await fetch(auditURL+'/delete', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'xAuthToken': token,
        },
        body: JSON.stringify(id),
    });

    if (!response.ok) {
        throw new Error('Error al eliminar la Auditoria.');
    }
}

export const getAuditReport = async (id: number) : Promise<Response> => {
    const token = getAuth() ?? '';
    const response = await fetch(auditURL+'/getAuditReport', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'xAuthToken': token,
        },
        body: JSON.stringify(id),
    });

    if (!response.ok) {
        throw new Error('Error al obtener el informe de la Auditoria.');
    }

    return response;
}

//TASKS CALLS

export const listByCategoria = async (categoria: Categoria): Promise<Task[]> => {
    const token = getAuth() ?? '';
    const response = await fetch(taskURL+'/listByCategoria', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'xAuthToken': token,
        },
        body: JSON.stringify(categoria),
    });

    if (!response.ok) {
        throw new Error('Error al recuperar las tareas por categoría.');
    }

    return response.json();
} 

//SCORE CALLS

export const getNamesByAudit = async (id: number) : Promise<string[]> => {
    const token = getAuth() ?? '';
    const response = await fetch(scoreURL+'/getNamesUserByAudit', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'xAuthToken': token,
        },
        body: JSON.stringify(id),
    });

    if (!response.ok) {
        throw new Error('Error al recuperar los nombres de los usuarios.');
    }

    return response.json();
}