import axios from "axios";
import { Audit } from "../components/Entities/Audit";
import { Categoria } from "../components/Entities/Categoria";
import { PieChart, ScoreChart } from "../components/Entities/Chart";
import { Imagen } from "../components/Entities/Imagen";
import { Score, ScoreValue } from "../components/Entities/ScoreValue";
import { Task } from "../components/Entities/Task";
import { getAuth } from "../utils/auth";
import { auditURL, scoreURL, taskURL } from "../utils/constants";


export const listAudits = async () : Promise<Audit[]> => {
    try{
        const token = getAuth() ?? '';
        let response = await axios.get(auditURL+'/list',
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
        return response.data;
    } catch (error:any) {
        throw new Error('Loading audits failed');
    }
}

export const listAuditByUser = async (id: number) : Promise<Audit[]> => {
    try{
        const token = getAuth() ?? '';
        let response = await axios.get(auditURL+'/listByUser?id='+id,
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
        return response.data;
    } catch (error:any) {
        throw new Error('Loading audits failed');
    }
}

export const addAudit = async (audit: Audit) : Promise<Audit> => {
    try{
        const token = getAuth() ?? '';
        let response = await axios.post(auditURL+'/add', 
        audit,
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
        return response.data;
    } catch (error:any) {
        throw new Error('Failed to add audit');
    }
}

export const getAudit = async (id: number) : Promise<Audit> => {
    try{
        const token = getAuth() ?? '';
        let response = await axios.get(auditURL+'/get?id='+id,
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
        return response.data;
    } catch (error:any) {
        throw new Error('Failed to get audit');
    }
}

export const getEvaluationStatus = async (id: number) : Promise<Boolean> =>  {
    try{
        const token = getAuth() ?? '';
        let response = await axios.get(auditURL+'/getEvaluationComplete?id='+id,
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
        return response.data;
    } catch (error:any) {
        throw new Error('Failed to get evaluation status');
    }
}

export const closeAudit = async (id: number) : Promise<void> => {
    try{
        const token = getAuth() ?? '';
        let response = await axios.post(auditURL+'/closeAudit?id='+id,
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
    } catch (error:any) {
        throw new Error('Failed to close audit');
    }
}

export const openAudit = async (id: number) : Promise<void> => {
    try{
        const token = getAuth() ?? '';
        let response = await axios.post(auditURL+'/openAudit?id='+id,
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
    } catch (error:any) {
        throw new Error('Failed to open audit');
    }
}

export const deleteAudit = async (id: number) : Promise<void> => {
    try{
        const token = getAuth() ?? '';
        let response = await axios.delete(auditURL+'/delete?id='+id,
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
    } catch (error:any) {
        throw new Error('Failed to delete audit');
    }
}

export const getAuditReport = async (id: number) : Promise<Response> => {
    try{
        const token = getAuth() ?? '';
        let response = await axios.get(auditURL+'/getAuditReport?id='+id,
        {headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/pdf',
            'xauthtoken': token,
        }, responseType: 'blob'});
        return response.data;
    } catch (error:any) {
        throw new Error('Failed to get audit report');
    }
}

export const getPieChart = async (id: number) : Promise<PieChart> => {
    try{
        const token = getAuth() ?? '';
        let response = await axios.get(auditURL+'/getPieChart?id='+id,
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
        return response.data;
    } catch (error:any) {
        throw new Error('Failed to get pie chart');
    }
}

export const getScoreChart = async (id: number) : Promise<ScoreChart> => {
    try{
        const token = getAuth() ?? '';
        let response = await axios.get(auditURL+'/getScoreChart?id='+id,
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
        return response.data;
    } catch (error:any) {
        throw new Error('Failed to get score chart');
    }
}

//TASKS CALLS

export const listByCategoria = async (categoria: Categoria): Promise<Task[]> => {
    try{
        const token = getAuth() ?? '';
        let response = await axios.get(taskURL+'/listByCategoria?categoria='+categoria,
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
        return response.data;
    } catch (error:any) {
        throw new Error('Loading tasks failed');
    }
} 

//SCORE CALLS

export const getNamesByAudit = async (id: number) : Promise<string[]> => {
    try{
        const token = getAuth() ?? '';
        let response = await axios.get(scoreURL+'/getNamesUserByAudit?auditId='+id,
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
        return response.data;
    } catch (error:any) {
        throw new Error('Failed to get names by audit');
    }
}

export const listScoreByUser = async (id: number, auditId: number) : Promise<Score[]> => {
    try{
        const token = getAuth() ?? '';
        let response = await axios.get(scoreURL+'/listByUser?userId='+id + '&auditId='+auditId,
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
        return response.data;
    } catch (error:any) {
        throw new Error('Loading scores failed');
    }
}

export const listScoreByTask = async (idUser: number, idTask: number, auditId: number) : Promise<Score[]> => {
    try{
        const token = getAuth() ?? '';
        let response = await axios.get(scoreURL+'/listByTask?taskId='+idTask+'&userId='+idUser + '&auditId=+'+auditId,
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
        return response.data;
    } catch (error:any) {
        throw new Error('Loading scores failed');
    }
}

export const addScore = async (score: Score) : Promise<Score> => {
    try{
        const token = getAuth() ?? '';
        let response = await axios.post(scoreURL+'/add',
        score,
            {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
        return response.data;
    } catch (error:any) {
        throw new Error('Failed to add score');
    }
}

export const getImagenByScore = async (idPuntuacion: number) : Promise<Imagen> => {
    try{
        const token = getAuth() ?? '';
        let response = await axios.get(scoreURL+'/getImagen?idPuntuacion='+idPuntuacion,
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
        const { id, datosImagen } = response.data;

        // Verifica el tipo de datosImagen y transforma si es necesario
        let byteArray: number[];
        if (typeof datosImagen === 'string') {
            // Si llega como string, asume que es base64 y decodifícalo
            const byteCharacters = atob(datosImagen);
            byteArray = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteArray[i] = byteCharacters.charCodeAt(i);
            }
        } else if (Array.isArray(datosImagen) && datosImagen.every(item => typeof item === 'number')) {
            // Si llega como un array de números, úsalo directamente
            byteArray = datosImagen;
        } else {
            throw new Error('Formato de datosImagen no soportado');
        }

        return { id, datosImagen: byteArray };
    } catch (error:any) {
        throw new Error('Failed to get image by score');
    }
}

export const addImagen = async (idAudit: number, imagen: Imagen) : Promise<Imagen> => {
    try{
        const token = getAuth() ?? '';
        let response = await axios.post(scoreURL+'/addImage?id='+idAudit,
        imagen,
            {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
        return response.data;
    } catch (error:any) {
        throw new Error('Failed to add image');
    }
}

