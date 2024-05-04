import { Application } from "../components/Entities/Application";
import { getAuth } from "../utils/auth";
import { appURL } from "../utils/constants";


 const list = async (): Promise<Application[]> => {
    const token: string = getAuth() ?? '';
    const response = await fetch(appURL+'/list', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'xAuthToken': token,
        },
    });

    if (!response.ok) {
        throw new Error('Error al recuperar las listas.');
    }
    return response.json();
};

 const isEditable = async (id: number): Promise<boolean> => {
    const token: string = getAuth() ?? '';
    const response = await fetch(appURL+'/isEditable/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'xAuthToken': token,
        },
        body: JSON.stringify(id),
    });

    if (!response.ok) {
        throw new Error('Error, no se ha podido comprobar si es editable.');
    }
    return response.json();
}

 const add = async (application: Application): Promise<void> => {
    const token: string = getAuth() ?? '';
    const response = await fetch(appURL+'/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'xAuthToken': token,
        },
        body: JSON.stringify(application),
    });

    if (!response.ok) {
        throw new Error('Error al añadir la aplicación.');
    }
}

 const deleteApp = async (id: number): Promise<void> => {
    const token: string = getAuth() ?? '';
    const response = await fetch(appURL+'/delete/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'xAuthToken': token,
        },
        body: JSON.stringify(id),
    });

    if (!response.ok) {
        throw new Error('Error al eliminar la aplicación.');
    }
}

const get = async (id: number): Promise<Application> => {
    const token: string = getAuth() ?? '';
    const response = await fetch(appURL+'/get/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'xAuthToken': token,
        },
        body: JSON.stringify(id),
    });

    if (!response.ok) {
        throw new Error('Error al recuperar la aplicación.');
    }
    return response.json();
}

export default{
    list, isEditable, add, deleteApp, get
} 