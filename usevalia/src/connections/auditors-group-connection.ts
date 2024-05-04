import { GroupAuditor } from "../components/Entities/Group-auditors";
import { getAuth } from "../utils/auth";
import { grupoURL } from "../utils/constants";

 const groupList = async (id: number): Promise<GroupAuditor[]> => {
    const token: string = getAuth() ?? '';
    const response = await fetch(grupoURL+'/getByUser', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'xAuthToken': token,
        },
        body: JSON.stringify(id),
    });

    if (!response.ok) {
        throw new Error('Error al recuperar las listas de Usuarios.');
    }

    return response.json();
};

 const groupAdd = async (grupo: GroupAuditor): Promise<void> => {
    const token: string = getAuth() ?? '';
    const response = await fetch(grupoURL+'/add/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'xAuthToken': token,
        },
        body: JSON.stringify(grupo),
    });

    if (!response.ok) {
        throw new Error('Error, no se ha podido añadir un grupo.');
    }
    return response.json();
}

const groupDelete = async (id: number): Promise<void> => {
    const token: string = getAuth() ?? '';
    const response = await fetch(grupoURL+'/delete/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'xAuthToken': token,
        },
        body: JSON.stringify(id),
    });

    if (!response.ok) {
        throw new Error('Error, no se ha podido eliminar el grupo.');
    }
    return response.json();
}

const getNombreGroup = async (id: number): Promise<string> => {
    const token: string = getAuth() ?? '';
    const response = await fetch(grupoURL+'/getNombre', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'xAuthToken': token,
        },
        body: JSON.stringify(id),
    });

    if (!response.ok) {
        throw new Error('Error al recuperar el nombre del grupo.');
    }

    return response.json();
}

export default { groupList, groupAdd, groupDelete, getNombreGroup };