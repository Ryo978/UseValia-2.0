import axios from "axios";
import { User } from "../components/Entities/User";
import { getAuth, saveAuth } from "../utils/auth";
import { loginURL, registerURL, userURL } from "../utils/constants";
import { message } from "antd";

const api = axios.create();


export const login = async (email: string, password: string): Promise<User> => {
    try{
        let response = await api.post(loginURL+'?email='+email+'&password='+password, {headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(email + ":" + password),
        }});
        let authKey = response.headers["xauthtoken"];
        if (authKey) {
            saveAuth(authKey);
        }

        return response.data;
    } catch (error:any) {
        throw new Error('Login failed');
    }
};

api.interceptors.response.use(function(response) {
    if (response.headers['xauthtoken']) { // if server version newer
        saveAuth(response.headers['xauthtoken']); //TODO: conseguir el token específico. save new token
    };
    return response; // continue with response
  });

export const register = async (email: string, password: string, nombre: string): Promise<User> => {
    try{
        let response = await api.post(registerURL+'?email='+email+'&password='+password+'&nombre='+nombre,{headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(email + ":" + password),
        }});
        let authKey = response.headers["xauthtoken"];
        if (authKey) {
            saveAuth(authKey);
        }

        return response.data;
    } catch (error:any) {
        throw new Error('Register failed');
    }
   
}

export const getUsuarios = async (): Promise<User[]> => {
    try{
        const token: string = getAuth() ?? '';
        let response = await axios.get(userURL+'/list',
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
        return response.data;
    } catch (error:any) {
        throw new Error('Loading users failed');
    }

};

export const getLastTimeChanged = async (id: number): Promise<Date> => {
    try{
        const token: string = getAuth() ?? '';
        let response = await axios.get(userURL+'/getCreated?id='+id,
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
        return response.data;
    } catch (error:any) {
        throw new Error('Loading users failed');
    }
}

export const updateUser = async (id:number, nombre: string, password:string): Promise<User> => {
    try{
        const token: string = getAuth() ?? '';
        let response = await axios.put(userURL+'/update?id='+id+'&password='+password+'&nombre='+nombre,{headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});

        return response.data;
    } catch (error:any) {
        throw new Error('Failed to update user');
    }
}

export const updateRol = async (id:number, rol:string): Promise<User> => {
    try{
        const token: string = getAuth() ?? '';
        let response = await axios.put(userURL+'/updateRol?id='+id+'&rol='+rol,{headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});

        return response.data;
    } catch (error:any) {
        throw new Error('Failed to update user');
    }

}

export const getNombreUser = async (id: number): Promise<string> => {
    try{
        const token: string = getAuth() ?? '';
        let response = await axios.get(userURL+'/getNombre?id='+id,
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
        return response.data;
    } catch (error:any) {
        throw new Error('Failed to get user name');
    }
}

export const getUsuario = async (id: number): Promise<User> => {
    try{
        const token: string = getAuth() ?? '';
        let response = await axios.get(userURL+'/get?id='+id,
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
        return response.data;
    } catch (error:any) {
        throw new Error('Failed to get user');
    }
}

export const resetPassword = async (email: string): Promise<void> => {
    try{
        let response = await axios.get(userURL+'/resetPassword?email='+email,
        {headers: {
            'Content-Type': 'application/json',
        }});
        return response.data;
    } catch (error:any) {
        throw new Error('Failed to reset password');
    }
}
