// import { Inter } from "next/font/google";
// const inter = Inter({ subsets: ["latin"] });
import { useState, FormEvent, useContext } from "react";

import Head from "next/head";
import Image from "next/image";
import styles from '../../../styles/Home.module.scss'

import logoImg from '../../../public/logo.svg';

import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

export default function ForgotPass() {
    const {forgotPass} = useContext(AuthContext);
    
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    
    async function handleForgotPass(event: FormEvent){
        event.preventDefault();

        if(email === ''){
            toast.error("Preencha com seu email válido.")
            return;
        }

        setLoading(true);

        let data = {
            email,
        }

        await forgotPass(data)

        setLoading(false);
    }

  return (
    <>
      <Head>
        <title>Redefinir senha!</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Pizzaria "/>

        <div className={styles.login}>
            <h1>Redefinir senha</h1>

          <form onSubmit={handleForgotPass}>
            <Input
              placeholder="informe seu email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <Button
              type="submit"
              loading={loading}
            >
              Enviar
            </Button>            

          </form>
        </div>

      </div>

    </>
  )
}
