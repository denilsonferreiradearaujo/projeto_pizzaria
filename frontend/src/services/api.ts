import axios, {AxiosError} from 'axios';
import { parseCookies } from 'nookies';
import { AuthTokenError } from './erros/AuthTokenError';

import { signOut } from '../contexts/AuthContext';

export function setupAPICliente(ctx = undefined){
    let cookies = parseCookies(ctx)

    const api = axios.create({
        baseURL: 'http://localhost:3333',
        headers: {
            Authorization: `Bearer ${cookies['@nextauth.token']}`
        }
    })
    
    api.interceptors.response.use( 
        response => {
            return response;
    }, (error: AxiosError) => {
        if(error.response && error.response.status === 401){
            // Qualquer erro 401 (não autorizado) deverá deslogar o usuario

            if( typeof window !== undefined){
                // Chamar a função para deslogar o usuario
                signOut();
            }else{
                return Promise.reject(new AuthTokenError)
            }
        }

        return Promise.reject(error);
    })

    return api;
}