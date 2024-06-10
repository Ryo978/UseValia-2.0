import axios from "axios";
import { Application } from "../components/Entities/Application";
import { getAuth } from "../utils/auth";
import { appURL } from "../utils/constants";


 const list = async (): Promise<Application[]> => {
    try{
    const token: string = getAuth() ?? '';
    let response = await axios.get(appURL+'/list',
    {headers: {
        'Content-Type': 'application/json',
        'xauthtoken': token,
    }});
    return response.data;
    }
    catch (error:any) {
        throw new Error('Loading applications failed');
    }
};

 const isEditable = async (id: number): Promise<boolean> => {
    try{
        const token: string = getAuth() ?? '';
        let response = await axios.get(appURL+'/isEditable?aplicacionId='+id,
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
        return response.data;
    } catch (error:any) {
        throw new Error('Failed to delete application');
    }
}

 const add = async (application: Application): Promise<void> => {
    try{
    const token: string = getAuth() ?? '';
    let response = await axios.post(appURL+'/add',
    application,
    {headers: {
    'Content-Type': 'application/json',
    'xauthtoken': token,
    }});
    return response.data;
    } catch (error:any) {
        throw new Error('Failed to add application');
    }
}

 const deleteApp = async (id: number): Promise<void> => {
    try{
        const token: string = getAuth() ?? '';
        let response = await axios.delete(appURL+'/delete?id='+id,
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
    } catch (error:any) {
        throw new Error('Failed to delete application');
    }
}

const get = async (id: number): Promise<Application> => {
    try{
    const token: string = getAuth() ?? '';
    let response = await axios.get(appURL+'/get?aplicacionId='+id,
    {headers: {
        'Content-Type': 'application/json',
        'xauthtoken': token,
    }});
    return response.data;
    } catch (error:any) {
        throw new Error('Failed to get application');
    }
}

export default{
    list, isEditable, add, deleteApp, get
} 