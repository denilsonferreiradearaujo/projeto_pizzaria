import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies, destroyCookie } from "nookies";
import { AuthTokenError } from "../services/erros/AuthTokenError";

// Função para paginas que somente usuarios logados podem acessar
export function canSSRAuth<P extends { [key: string]: any }>(fn: GetServerSideProps<P>){
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx);

        const token = cookies['@nextauth.token'];

        if(!token){
            return{
                redirect:{
                    destination: '/',
                    permanent: false,
                }
            }
        }

        try{
            return await fn(ctx);
        }catch(err){
            if(err instanceof AuthTokenError){
                destroyCookie(ctx, '@nextauth.token')
                
                return{
                    redirect:{
                        destination: '/',
                        permanent: false,
                    }
                }
            }

            // Adicionando um retorno padrão para tratar outros erros inesperados
            return {
                redirect: {
                    destination: '/error', // Pode ser qualquer página de erro ou uma página de fallback.
                    permanent: false,
                }
            }
        }   
    }
}


