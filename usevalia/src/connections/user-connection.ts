import { User } from "../components/Entities/User";
import { getAuth, saveAuth } from "../utils/auth";
import { loginURL, registerURL, userURL } from "../utils/constants";

export const login = async (email: string, password: string): Promise<User> => {
    const response = await fetch(loginURL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(email + ":" + password),
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error('Error al iniciar sesión');
    }
    if (response.ok) { 
        const authKey = response.headers.get("xAuthToken");
        if (authKey) {
            saveAuth(authKey);
        }
    }


    return response.json();
};

export const register = async (email: string, password: string, name: string): Promise<User> => {
    const response = await fetch(registerURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(email + ":" + password),
        },
        body: JSON.stringify({ email, password, name }),
    });

    if (!response.ok) {
        throw new Error('Error al registrar');
    }

    if (response.ok) { 
        const authKey = response.headers.get("xAuthToken");
        if (authKey) {
            saveAuth(authKey);
        }
    }

    return response.json();
}

export const getUsuarios = async (): Promise<User[]> => {
    const token: string = getAuth() ?? '';
    const response = await fetch(userURL+'/list', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'xAuthToken': token,
        },
    });

    if (!response.ok) {
        throw new Error('Error al recuperar la lista de Usuarios.');
    }

    return response.json();
};

export const getLastTimeChanged = async (id: number): Promise<Date> => {
    const token: string = getAuth() ?? '';
    const response = await fetch(userURL+'/getCreated', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'xAuthToken': token,
        },
        body: JSON.stringify(id),
    });

    if (!response.ok) {
        throw new Error('Error al recuperar la última fecha de cambio.');
    }

    return response.json();
}

export const updateUser = async (id:number, nombre: string, password:string): Promise<User> => {
    const token: string = getAuth() ?? '';
    const response = await fetch(userURL+'/update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'xAuthToken': token,
        },
        body: JSON.stringify({id,nombre,password}),
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

export const updateRol = async (id:number, rol:string): Promise<User> => {
    const token: string = getAuth() ?? '';
    const response = await fetch(userURL+'/updateRol', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'xAuthToken': token,
        },
        body: JSON.stringify({id,rol}),
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

export const getNombreUser = async (id: number): Promise<string> => {
    const token: string = getAuth() ?? '';
    const response = await fetch(userURL+'/getNombre', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'xAuthToken': token,
        },
        body: JSON.stringify(id),
    });

    if (!response.ok) {
        throw new Error('Error al recuperar el nombre del usuario.');
    }

    return response.json();
}

export const getUsuario = async (id: number): Promise<User> => {
    const token: string = getAuth() ?? '';
    const response = await fetch(userURL+'/get', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'xAuthToken': token,
        },
        body: JSON.stringify(id),
    });

    if (!response.ok) {
        throw new Error('Error al recuperar el usuario.');
    }

    return response.json();
}
