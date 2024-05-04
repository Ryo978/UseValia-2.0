import { Catalog } from "../components/Entities/Catalog";
import { Directriz, GrupoDirectrices } from "../components/Entities/Directrices";
import { getAuth } from "../utils/auth";
import { catalogURL, directrizURL, grupoDirectricesURL } from "../utils/constants";

export const getCatalogs = async (): Promise<Catalog[]> => {
    const token: string = getAuth() ?? '';
    const response = await fetch(catalogURL+'/list', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'xAuthToken': token,
        },
    });

    if (!response.ok) {
        throw new Error('Error al recuperar los Catálogos');
    }

    return response.json();
}

export const addCatalog = async (catalog: Catalog): Promise<Catalog> => {
    const token: string = getAuth() ?? '';
    const response = await fetch(catalogURL+'/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'xAuthToken': token,
        },
        body: JSON.stringify(catalog),
    });

    if (!response.ok) {
        throw new Error('Error al agregar el Catálogo');
    }

    return response.json();
}

export const getCatalog = async (id: number): Promise<Catalog> => {
    const token: string = getAuth() ?? '';
    const response = await fetch(catalogURL+'/get', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'xAuthToken': token,
        },
        body: JSON.stringify(id),
    });

    if (!response.ok) {
        throw new Error('Error al recuperar el Catálogo');
    }

    return response.json();
}


//Section GrupoDirectrices
export const getGrupoDirectricesByCatalogo = async (id:number): Promise<GrupoDirectrices[]> => {
    const token: string = getAuth() ?? '';
    const response = await fetch(grupoDirectricesURL+'/listByCatalogo', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'xAuthToken': token,
        },
        body: JSON.stringify(id),
    });

    if (!response.ok) {
        throw new Error('Error al recuperar los Grupos de Directrices');
    }

    return response.json();
}

export const addGrupoDirectrices = async (grupoDirectrices: GrupoDirectrices): Promise<GrupoDirectrices> => {
    const token: string = getAuth() ?? '';
    const response = await fetch(grupoDirectricesURL+'/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'xAuthToken': token,
        },
        body: JSON.stringify(grupoDirectrices),
    });

    if (!response.ok) {
        throw new Error('Error al agregar el Grupo de Directrices');
    }

    return response.json();
}


//Section Directrices

export const getDirectricesByGrupoDirectrices = async (id:number): Promise<Directriz[]> => {
    const token: string = getAuth() ?? '';
    const response = await fetch(directrizURL+'/listByGrupo', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'xAuthToken': token,
        },
        body: JSON.stringify(id),
    });

    if (!response.ok) {
        throw new Error('Error al recuperar las Directrices');
    }

    return response.json();
}

export const multipleAddDirectrices = async (directrices: Directriz[]): Promise<Directriz[]> => {
    const token: string = getAuth() ?? '';
    const response = await fetch(directrizURL+'/multipleAdd', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'xAuthToken': token,
        },
        body: JSON.stringify(directrices),
    });

    if (!response.ok) {
        throw new Error('Error al agregar las Directrices');
    }

    return response.json();
}

