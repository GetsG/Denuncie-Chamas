"use client";
import Image from 'next/image'
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useEffect } from 'react';
import styles from './page.module.css'
import LoadingOverlay from "../components/LoadingOverlay"

import WhatshotIcon from '@mui/icons-material/Whatshot'; //FOGO
import PlaceIcon from '@mui/icons-material/Place'; //LOCALIZAÇÃO
import CameraAltIcon from '@mui/icons-material/CameraAlt'; //CAMERA
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'; //WARN

export default function Home() {

  const {register, handleSubmit, formState: {errors}} = useForm()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState(false)

      //VERIFICAR SE O TOKEN ESTÁ ARMAZENADO NO STORAGE
      useEffect(() => {const token = localStorage.getItem("token")
      if (!token) {
      router.push("/login")
      }}, [])

        {/* Retorno do formulário */}
        const onSubmit = async (data) => {
          console.log(data)
        
            setTimeout(() => {
            router.push("/dashboard");
          }, 1500);}

  return (
    <div className={styles.container}>

      {/* TITULO E DESCRIÇÃO*/}
      <div className={styles.header}>
        <h4 className={styles.headerTitle} >
          <WhatshotIcon className={styles.iconPendente} sx={{ fontSize: 20 , color: '#fd0000'}}/>
          Denunciar Incêndio
        </h4>
        <p className={styles.headerDescription}>Preencha as informações abaixo de forma rápida e objetiva</p>
      </div>
      {/*-------------------*/}


      {/* INICIO DO FORMULÁRIO*/}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

      {/*TIPO DE INCÊNCIO*/}
        <div className={styles.field}>
          <h4 className={styles.fieldTitle}>Tipo de Incêndio</h4>        

          <select className={styles.select}
            {...register("tipoIncendio", {
            required: "Selecione o tipo de incêndio"
          })}>
            <option value="">Selecione o tipo</option>
            <option value="florestal">Florestal</option>
            <option value="urbano">Urbano</option>
            <option value="industrial">Industrial</option>
            <option value="residencial">Residencial</option>
          </select>

          {errors.tipoIncendio && (
          <p className={styles.fieldError}>{errors.tipoIncendio.message}</p>
        )}
        </div>
        {/*-------------------*/}
        
        {/*LOCALIZAÇÃO*/}
        <div className={styles.locationSection}>
          <h4>
            <PlaceIcon className={styles.iconPendente} sx={{ fontSize: 17 , color: '#000000'}}/>
            Localização
          </h4>
          <button className={styles.locationButton} type='button'>
            <PlaceIcon className={styles.iconPendente} sx={{ fontSize: 17 , color: '#000000'}}/>
            Capturar minha localização
          </button>
        </div>
        {/*-------------------*/}
        
        {/*IMAGEM*/}
        <div className={styles.photoSection}>
          <h4>
            <CameraAltIcon className={styles.iconPendente} sx={{ fontSize: 17 , color: '#000000'}}/>
            Foto do Incêndio
          </h4>
            <label className={styles.photoInput}><CameraAltIcon className={styles.iconPendente} sx={{ fontSize: 50 , color: '#00000065'}}/> <p>Clique para tirar foto ou selecionar</p>
              <input style={{display: "none"}} type="file" accept="image/*"></input>
            </label>
        </div>
        {/*-------------------*/}

        {/*DESCRIÇÃO DA SITUAÇÃO*/}
        <div className={styles.descriptionSection}>
          <h4>Descrição da Situação</h4>
          <textarea
            className={styles.descriptionInput}
            placeholder="Ex: Incêndio de grandes proporções com risco de se espalhar para casas vizinhas..."
            {...register("descricao", {
            required: "Descreva a situação"
  })}/>
        </div>
        {/*-------------------*/}
        
        {/*INFORMAÇÃO IMPORTANTE*/}
        <div className={styles.warningBox}>
          <ErrorOutlineIcon className={styles.iconPendente} sx={{ fontSize: 17 , color: '#b1780e'}}/>
          <h4>Informação importante</h4>
          <p>Denúncias falsas podem resultar em responsabilização legal. Certifique-se de que as informações são verdadeiras.</p>
        </div>

        {/* BOTÃO CANCELAR E ENVIAR DENUNCIA*/}
        <div className={styles.actions}>
          <button className={styles.cancelButton} onClick={() => {router.push("/dashboard")}}>Cancelar</button>
          <button className={styles.submitButton} type='submit'>Enviar Denúncia</button>
        </div>
        {/*-------------------*/}
        

      </form>
      {/* FIM DO FORMULÁRIO*/}
    
      <>
        <LoadingOverlay show={loading} text="Entrando..." />
      </>

    </div>
  );
}
