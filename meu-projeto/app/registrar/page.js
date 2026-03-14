"use client";
import Image from 'next/image'
import { useForm } from "react-hook-form";
import styles from './page.module.css'
import Logo from '../../public/logo.png';
import { Lock } from "@deemlol/next-icons";
import { Mail } from "@deemlol/next-icons"
import { User } from "@deemlol/next-icons"
import { Phone } from "@deemlol/next-icons";
import Link from "next/link";
import { cadastro } from '../services/registerService';
import { useState } from "react"
import LoadingOverlay from "../components/LoadingOverlay"
import { useRouter } from "next/navigation";

export default function Home() {

  const {register, handleSubmit, watch, formState: {errors}} = useForm()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  {/* Retorno do formulário */}
  const onSubmit = async (data) => {
    if (loading) return;
  
    try {
      setLoading(true);
      setErrorMessage("");
      setSuccessMessage("");
  
      const payload = {
        nome: data.nome,
        telefone: String(data.telefone),
        login: data.email,
        password: data.password,
  }
  
      const result = await cadastro(payload)
      setSuccessMessage("Email cadastrado com sucesso!");
  
      setTimeout(() => {
      router.push("/");
    }, 1500);
  
    } 
    catch (error) {
      
      if (error.status === 409){
        setErrorMessage("Email já cadastrado")
      } else {
        setErrorMessage(error.message || "Erro ao cadastrar");
  }
      
  
    } finally{
      setLoading(false)
    }
  }

  // pega o valor atual do campo password (senha)
  const passwordValue = watch("password");


  return (
    <div className={styles.container}>

      <div className={styles.card}>

        {/* Logo, Titulo e Subtitulo */}
        <div className={styles.cardTitle}>
          <Image className={styles.logo} src={Logo} alt='Logo'/>
          <h1 className={styles.title}>Criar Conta</h1>
          <p className={styles.subTitle}>Cadastre-se para começar a registrar denúncias</p>
        </div>
        {/* ------------------------------------ */}


      {/* Erro de cadastro*/}
        {errorMessage && 
        (<p className={styles.errorCadastro}>
        {errorMessage}
        </p>
)}

      {successMessage && (
      <div className={styles.successBanner}>
        <span>{successMessage}</span>
        <button className={styles.closeButton} onClick={() => setSuccessMessage("")}>
          ✕
        </button>
      </div>
)}



        {/* Formulário Cadastro*/}
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>


            {/*Nome Completo*/}
            <div>
                <label>Nome Completo</label>

                <div className={styles.inputWrapper}>
                  <span className={styles.icon}><User size={20}/></span>
                  <input className={styles.input} type="text" placeholder="Seu nome completo"
                  {...register('nome', { required: "Nome obrigatório"})}/> 
                </div>
                
                {errors.nome && <p className={styles.errors}>{errors.nome.message}</p>}
            </div>
            {/* ------------------------------------ */}

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

            {/*Telefone*/}
            <div>
                <label>Telefone</label>

                <div className={styles.inputWrapper}>
                  <span className={styles.icon}><Phone size={20}/></span>
                  <input className={styles.input} type="tel" placeholder="(00) 0000-0000"
                  {...register('telefone', { required: "Telefone obrigatório"})}/> 
                </div>
                
                {errors.telefone && <p className={styles.errors}>{errors.telefone.message}</p>}
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

        {/* Confirmar Senha */}
            <div>
                <label>Confirmar Senha</label>

              <div className={styles.inputWrapper}>
                <span className={styles.icon}><Lock size={20} /></span>
                <input className={styles.input} type="password" placeholder="********"
                {...register('confirmPassword', { required: "Confirmação de senha é obrigatória", minLength:{value: 8, message: "Mínimo 8 caracteres"},
                validate: (value) => value === passwordValue || "As senhas não coincidem",
                })}/>
              </div>
                      
                {errors.confirmPassword && <p className={styles.errors}>{errors.confirmPassword?.message}</p>}
            </div>
        {/* ------------------------------------ */}

        {/* Termos */}

            <div className={styles.termos} style={{ display: "flex", margin: "5px 0 ", alignItems: "center", gap: "8px", flexDirection: "row" }}>
              <input className={styles.checkboxTermos}
                      style={{ width: "15px", height: "15px" }}
                      type="checkbox"
                      {...register("confirmTermos", { required: "Aceite os termos de uso" })}/>
  
              <span className={styles.termosTexto} style={{ margin: 0 }}>
                Aceite os{" "}
              <Link href="https://denuncie-chamas-backend.onrender.com/termos" className={styles.linkTermos}>
                Termos de uso
              </Link>
              </span>
            </div>

              {errors.confirmTermos && <p className={styles.errors}>{errors.confirmTermos?.message}</p>}

        {/* Botão Cadastrar */}
            <button type="submit">
                Cadastrar
            </button>
        {/* ------------------------------------ */}
        </form>

        {/* LOGAR */}
        <p className={styles.logar}>Já tem uma conta? <Link className={styles.logarLink} href="/login"> Faça login </Link></p>
        {/* ------------------------------------ */}

        {/* Registrar */}
        <>
          <LoadingOverlay show={loading} text="Entrando..." />
        </>

      </div>

    </div>
  );
}
