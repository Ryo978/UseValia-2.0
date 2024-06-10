import axios from "axios";
import { Catalog } from "../components/Entities/Catalog";
import { Directriz, GrupoDirectrices } from "../components/Entities/Directrices";
import { getAuth } from "../utils/auth";
import { catalogURL, directrizURL, grupoDirectricesURL } from "../utils/constants";

export const getCatalogs = async (): Promise<Catalog[]> => {
    try{
        const token: string = getAuth() ?? '';
        let response = await axios.get(catalogURL+'/list',
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
        return response.data;
    } catch (error:any) {
        throw new Error('Loading catalogs failed');
    }
}

export const getCatalogsByLectura = async (id: number): Promise<Catalog[]> => {
    try{
        const token: string = getAuth() ?? '';
        let response = await axios.get(catalogURL+'/listByLectura?userId='+id,
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
        return response.data;
    } catch (error:any) {
        throw new Error('Loading catalogs failed');
    }
}

export const getCatalogsByEscritura = async (id: number): Promise<Catalog[]> => {
    try{
        const token: string = getAuth() ?? '';
        let response = await axios.get(catalogURL+'/listByEscritura?userId='+id,
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
        return response.data;
    } catch (error:any) {
        throw new Error('Loading catalogs failed');
    }
}

export const addCatalog = async (catalog: Catalog): Promise<Catalog> => {
    try{
        const token: string = getAuth() ?? '';
        let response = await axios.post(catalogURL+'/add',
        catalog,
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
        return response.data;
    } catch (error:any) {
        throw new Error('Failed to add catalog');
    }
}

export const deleteCatalog = async (id: number): Promise<void> => {
    try{
        const token: string = getAuth() ?? '';
        let response = await axios.delete(catalogURL+'/delete?id='+id,
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
        return response.data;
    } catch (error:any) {
        throw new Error('Failed to delete catalog');
    }
}

export const getCatalog = async (id: number): Promise<Catalog> => {
    try{
        const token: string = getAuth() ?? '';
        let response = await axios.get(catalogURL+'/get?catalogoId='+id,
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
        return response.data;
    } catch (error:any) {
        throw new Error('Failed to get catalog');
    }
}


//Section GrupoDirectrices
export const getGrupoDirectricesByCatalogo = async (id:number): Promise<GrupoDirectrices[]> => {
    try{
        const token: string = getAuth() ?? '';
        let response = await axios.get(grupoDirectricesURL+'/listByCatalogo?catalogoId='+id,
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
        return response.data;
    } catch (error:any) {
        throw new Error('Loading groups failed');
    }
}

export const addGrupoDirectrices = async (grupoDirectrices: GrupoDirectrices): Promise<GrupoDirectrices> => {
    try{
        const token: string = getAuth() ?? '';
        let response = await axios.post(grupoDirectricesURL+'/add',
        grupoDirectrices,
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
        return response.data;
    }
    catch (error:any) {
        throw new Error('Failed to add group');
    }
}


//Section Directrices

export const getDirectricesByGrupoDirectrices = async (id:number): Promise<Directriz[]> => {
    try{
        const token: string = getAuth() ?? '';
        let response = await axios.get(directrizURL+'/listByGrupo?grupoid='+id,
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
        return response.data;
    } catch (error:any) {
        throw new Error('Loading directrices failed');
    }
}

export const multipleAddDirectrices = async (directrices: Directriz[]): Promise<Directriz[]> => {
    try{
        const token: string = getAuth() ?? '';
        let response = await axios.post(directrizURL+'/multipleAdd',
        directrices,
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
        return response.data;
    } catch (error:any) {
        throw new Error('Failed to add directrices');
    }
}

