import axios from "axios";
import { GroupAuditor } from "../components/Entities/Group-auditors";
import { getAuth } from "../utils/auth";
import { grupoURL } from "../utils/constants";

 const groupList = async (id: number): Promise<GroupAuditor[]> => {
    try{
        const token: string = getAuth() ?? '';
        let response = await axios.get(grupoURL+'/getByUser?idUser='+id,
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
        return response.data;
    } catch (error:any) {
        throw new Error('Loading groups failed');
    }
};

 const groupAdd = async (grupo: GroupAuditor): Promise<void> => {
    try{
        const token: string = getAuth() ?? '';
        let response = await axios.post(grupoURL+'/add',
        grupo,
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
        return response.data;
    } catch (error:any) {
        throw new Error('Failed to add group');
    }
}

const groupDelete = async (id: number): Promise<void> => {
    try{
    const token: string = getAuth() ?? '';
    let response = await axios.delete(grupoURL+'/delete?id='+id ,
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
    } catch (error:any) {
        throw new Error('Failed to delete group');
    }
}

const getNombreGroup = async (id: number): Promise<string> => {
    try{
        const token: string = getAuth() ?? '';
        let response = await axios.get(grupoURL+'/getNombre?id='+id,
        {headers: {
            'Content-Type': 'application/json',
            'xauthtoken': token,
        }});
        return response.data;
    } catch (error:any) {
        throw new Error('Failed to get group name');
    }
}

export default { groupList, groupAdd, groupDelete, getNombreGroup };