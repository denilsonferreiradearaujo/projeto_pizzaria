import React, {useState, createContext, ReactNode, useEffect} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "../services/api";

type AuthContextdata = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    loadingAuth: boolean;
    loading: boolean;
    signOut: () => Promise<void>;
    errorMessage: string;        // Adicionado para a mensagem de erro
    clearError: () => void;      // Adicionado para limpar a mensagem de erro
}

type UserProps = {
    id: string;
    name: string;
    email: string;
    token: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

type SignInProps = {
    email: string,
    password: string,
}

export const AuthContext = createContext({} as AuthContextdata);

export function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<UserProps>({
        id: '',
        name: '',
        email: '',
        token: '',
    });

    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");  // Estado para a mensagem de erro

    const isAuthenticated = !!user.name;

    useEffect(() =>{
        async function getUser(){
            // Pegar os dados salvo do User
            const userInfo = await AsyncStorage.getItem('@sujeitopizzaria');
            let hasUser: UserProps = JSON.parse(userInfo || '{}')

            // Verificar se recebemos as informações
            if(Object.keys(hasUser).length > 0){
                api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`

                setUser ({
                    id: hasUser.id,
                    name: hasUser.name,
                    email: hasUser.email,
                    token: hasUser.token
                })
            }

            setLoading(false);
        }
        
        getUser();

    }, [])
    
    async function signIn({email, password}: SignInProps ) {
        setLoadingAuth(true);
        setErrorMessage("");  // Limpa a mensagem de erro ao tentar novamente

        try{
            const response = await api.post('/session', {
                email,
                password
            })
            console.log(response.data);

            const {id, name, token} = response.data;

            const data = {
                ...response.data
            }

            await AsyncStorage.setItem('@sujeitopizzaria', JSON.stringify(data));

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            setUser({
                id,
                name,
                email, 
                token
            })

            setLoadingAuth(false);

        }catch(err){
            console.log('Erro ao acessar', err)
            setErrorMessage("Falha no login. Verifique suas credenciais.");  // Define a mensagem de erro
            setLoadingAuth(false);
        }
        // console.log(email)
        // console.log(password)
    }

    async function signOut() {
        await AsyncStorage.clear()
        .then(() => {
            setUser({
                id: '',
                name: '',
                email: '',
                token: '',
            })
        })
    }

    function clearError() {
        setErrorMessage("");  // Limpa a mensagem de erro
    }

    return(
        <AuthContext.Provider 
            value={{ 
                user, 
                isAuthenticated, 
                signIn, 
                loadingAuth, 
                loading, 
                signOut,
                errorMessage,    // Passa a mensagem de erro
                clearError       // Passa a função para limpar a mensagem de erro
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}


