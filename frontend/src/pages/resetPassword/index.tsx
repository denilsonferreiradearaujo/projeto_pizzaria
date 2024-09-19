// import { Inter } from "next/font/google";
// const inter = Inter({ subsets: ["latin"] });
import { useState, FormEvent, useContext } from "react";
import { useRouter } from "next/router"; // Importar useRouter para capturar o token da URL

import Head from "next/head";
import Image from "next/image";
import styles from '../../../styles/Home.module.scss'

import logoImg from '../../../public/logo.svg';

import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

export default function ResetPassword() {
    const {resetPass} = useContext(AuthContext);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const { token } = router.query;  // Extrair o token da URL
    
    async function handleResetPassword(event: FormEvent){
        event.preventDefault();

        if(password === ''){
            toast.error("Preencha sua nova senha.")
            return;
        }

        if (!token) {
          toast.error("Token de redefinição não encontrado.");
          return;
      }

        setLoading(true);

        try {
          let data = {
              password,
              token // Incluindo o token no objeto data
          };

          await resetPass(data);

          setLoading(false);
      } catch (err) {
          toast.error("Erro ao redefinir senha.");
          console.error(err);
          setLoading(false);
      }

    }

  return (
    <>
      <Head>
        <title>Redefinir senha!</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Pizzaria "/>

        <div className={styles.login}>
            <h1>Informe a nova senha.</h1>

          <form onSubmit={handleResetPassword}>
            <Input
              placeholder="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
