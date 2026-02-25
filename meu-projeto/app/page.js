"use client";
import Image from 'next/image'
import { useForm } from "react-hook-form";
import styles from './page.module.css'
import Logo from '../public/logo.png';
import { Lock } from "@deemlol/next-icons";
import { Mail } from "@deemlol/next-icons"
import Link from "next/link";

export default function Home() {

  const {register, handleSubmit, formState: {errors}} = useForm()

  {/* Retorno do formulário, email e senha */}
  const onSubmit = (data) => {
    console.log('data', data)
  }

  return (
    <div className={styles.container}>

      <div className={styles.card}>

        {/* Logo, Titulo e Subtitulo */}
        <div className={styles.cardTitle}>
          <Image className={styles.logo} src={Logo} alt='Logo'/>
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

        {/* Botão Entrar */}
            <button type="submit">
                Entrar
            </button>
        {/* ------------------------------------ */}
        </form>

        {/* Registrar */}
        <p className={styles.register}>Não tem uma conta? <Link className={styles.registerLink} href="/registrar"> Cadastre-se </Link></p>
        {/* ------------------------------------ */}

      </div>

    </div>
  );
}
