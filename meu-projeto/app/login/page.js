"use client";
import Image from 'next/image'
import { useForm } from "react-hook-form";
import styles from './page.module.css'
import Logo from '../../public/logo.png';
import { Lock } from "@deemlol/next-icons";
import { Mail } from "@deemlol/next-icons"
import Link from "next/link";
import { useRouter } from "next/navigation"
import { login } from '../services/loginService';
import { useState, useEffect } from "react"
import LoadingOverlay from "../components/LoadingOverlay"

export default function Home() {

  const {register, handleSubmit, formState: {errors}} = useForm()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState("")

  useEffect(() => {
  fetch("https://denuncie-chamas-backend.onrender.com/auth/login", {
    method: "OPTIONS"
  }).catch(() => {})
}, [])

  {/* Retorno do formulário, email e senha */}
  const onSubmit = async (data) => {
    if (loading) return;

  try {
    setLoading(true)
    setErro(false)

    const payload = {
      login: data.email,
      password: data.password,
}

    const result = await login(payload)
    localStorage.setItem("token", result.token)
    router.push("/dashboard")

  } 
  catch (error) {
    console.error(error.message)
    setErro(error.message || "Erro ao fazer login")

  } finally{
    setLoading(false)
  }
}

  return (
    <div className={styles.container}>

      <div className={styles.card}>

        {/* Logo, Titulo e Subtitulo */}
        <div className={styles.cardTitle}>
          <Image className={styles.logo} src={Logo} alt='Logo Denuncie Chamas'/>
          <h1 className={styles.title}>Denuncie Chamas</h1>
          <p className={styles.subTitle}>Entre com sua conta para registrar denúncias de incêndios</p>
        </div>
        {/* ------------------------------------ */}

        {/* Formulário Email e Senha*/}
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

          {/*Email*/}
            <div>
                <label>Email</label>

                <div className={styles.inputWrapper}>
                  <span className={styles.icon}><Mail size={20}/></span>
                  <input className={styles.input} type="email" placeholder="seu@email.com"
                  {...register('email', { required: "Email obrigatório"})}/> 
                </div>
                
                {errors.email && <p className={styles.errors}>{errors.email.message}</p>}
            </div>
          {/* ------------------------------------ */}
            
        {/* Senha */}
            <div>
                <label>Senha</label>

              <div className={styles.inputWrapper}>
                <span className={styles.icon}><Lock size={20} /></span>
                <input className={styles.input} type="password" placeholder="********"
                {...register('password', { required: "Senha obrigatória", minLength:{value: 8, message: "Mínimo 8 caracteres"} })}/>
              </div>
                      
                {errors.password && <p className={styles.errors}>{errors.password?.message}</p>}
            </div>
        {/* ------------------------------------ */}

        {/* Erro Email ou Senha */}
       <p className={styles.erroLogar}>{erro}</p>
        {/* ------------------------------------ */}

        {/* Botão Entrar */}
            <button type="submit">
                {loading ? "Entrando..." : "Entrar"}
            </button>
        {/* ------------------------------------ */}
        </form>

        {/* Registrar */}
        <p className={styles.register}>Não tem uma conta? <Link className={styles.registerLink} href="/registrar"> Cadastre-se </Link></p>
        {/* ------------------------------------ */}

      </div>

      {/* Registrar */}
      <>
        <LoadingOverlay show={loading} text="Entrando..." />
      </>

    </div>
  );
}
