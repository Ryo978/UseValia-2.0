import axios from "axios";
import { ScoreSchema } from "../components/Entities/ScoreSchema";
import { ScoreValue } from "../components/Entities/ScoreValue";
import { getAuth } from "../utils/auth";
import { schemaScoreURL, valueScoreURL } from "../utils/constants";

//Schema Part
export const schemaList = async (): Promise<ScoreSchema[]> => {
    try{
        const token: string = getAuth() ?? '';
        let response = await axios.get(schemaScoreURL+'/list',
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
        return response.data;
    } catch (error:any) {
        throw new Error('Loading schemas failed');
    }
};

export const schemaDelete = async (id: number): Promise<void> => {
    try{
        const token: string = getAuth() ?? '';
        let response = await axios.delete(schemaScoreURL+'/delete?id='+id,
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
    } catch (error:any) {
        throw new Error('Failed to delete schema');
    }
    
}

export const schemaAdd = async (schema: ScoreSchema): Promise<number> => {
    try{
        const token: string = getAuth() ?? '';
        let response = await axios.post(schemaScoreURL+'/add',
        schema,
            {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
        return response.data;
    }
    catch (error:any) {
        throw new Error('Failed to add schema');
    }
}

export const getNombreSchema = async (id: number): Promise<string> => {
    try{
        const token: string = getAuth() ?? '';
        let response = await axios.get(schemaScoreURL+'/getNombre?esquemaid='+id,
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
        return response.data;
    } catch (error:any) {
        throw new Error('Failed to get schema name');
    }
}


//Value part
export const valueScoreList = async (id: number): Promise<ScoreValue[]> => {
    try{
        const token: string = getAuth() ?? '';
        let response = await axios.get(valueScoreURL+'/listbyescala?idEscala='+id,
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
        return response.data;
    } catch (error:any) {
        throw new Error('Loading values failed');
    }
}

export const deleteScoreValues = async (id: number): Promise<void> => {
    try{
        const token: string = getAuth() ?? '';
        let response = await axios.delete(valueScoreURL+'/deletebyescala?idEscala='+id,
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
    } catch (error:any) {
        throw new Error('Failed to delete values');
    }
}

export const addScoreValue = async (values: ScoreValue[]): Promise<void> => {
    try{
        const token: string = getAuth() ?? '';
        let response = await axios.post(valueScoreURL+'/multipleAdd',
        values,
            {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
        return response.data;
    } catch (error:any) {
        throw new Error('Failed to add values');
    }
}

export const listByDirectriz = async (id: number): Promise<ScoreValue[]> => {
    try{
        const token: string = getAuth() ?? '';
        let response = await axios.get(valueScoreURL+'/getByDirectriz?idDirectriz='+id,
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
        return response.data;
    } catch (error:any) {
        throw new Error('Failed to get values');
    }
}




