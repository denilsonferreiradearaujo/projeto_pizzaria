// import { Inter } from "next/font/google";
// const inter = Inter({ subsets: ["latin"] });

import { useContext, FormEvent, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import logoImg from '../../public/logo.svg';

import styles from '../../styles/Home.module.scss'

import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

import Link from "next/link";

import { canSSRGuest } from "../utils/canSSRGuest";

export default function Home() {
  const {signIn} = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent ){
    event.preventDefault();

    if(email === "" || senha === ""){
      toast.error("Preencha todos os campos")
      return;
    }

    setLoading(true);

    let data = {
      email,
      senha
    }

    await signIn(data)

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Pizzaria - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Pizzaria "/>

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              placeholder="Digite seu email"
              type="text"
              value={email}
              onChange={ (e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Digite sua senha"
              type="password"
              value={senha}
              onChange={ (e) => setSenha(e.target.value)}
            />

            <Button
              type="submit"
              loading={loading}
            >
              Acessar
            </Button>

            <Link legacyBehavior href="/signup">
              <a className={styles.text}>Não possui uma conta? Cadastre-se</a>
            </Link>

            <Link legacyBehavior  href="/forgotPassword">
                <a className={styles.text}>Esqueceu sua senha?</a>
            </Link>
            
          </form>
        </div>

      </div>

    </>
  )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})