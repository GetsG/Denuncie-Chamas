'use client'
import { useEffect } from "react"
import { useState } from "react"
import styles from "./page.module.css"
import { FileText } from "@deemlol/next-icons";
import { PlusCircle } from "@deemlol/next-icons";
import { BarChart2 } from "@deemlol/next-icons";
import { AlertTriangle } from "@deemlol/next-icons"
import Brightness1Icon from '@mui/icons-material/Brightness1';



export default function Dashboard(){

    //VERIFICAR SE O TOKEN ESTÁ ARMAZENADO NO STORAGE
    useEffect(() => {const token = localStorage.getItem("token")
    if (!token) {
    router.push("/login")
    }}, [])

    const [total, setTotal] = useState(0)
    const [pendentes, setPendentes] = useState(0)
    const [emAndamento, setEmAndamento] = useState(0)
    const [gravidadeAlta, setGravidadeAlta] = useState(0)

    return(
        <div className={styles.container}>

            {/* Titulo e subtitulo */}
            <div className={styles.dashboardTitleSection}>
                <h2>Dashboard</h2>
                <p>Visão geral das suas denúncias</p>
            </div>
            {/* ------------------------------------ */}

            {/* Dashboard Status */}
            <div className={styles.dashboardStats}>
                <section>
                    <h4>Total de Denúncias</h4>
                    <p>{total}</p>
                    <BarChart2 size={25} color="#3f7cd8" />
                </section>

                <section>
                    <h4>Pendentes</h4>
                    <p>{pendentes}</p>
                    <Brightness1Icon className={styles.iconPendente} sx={{ fontSize: 25 , color: '#F0B100'}}/>
                </section>

                <section>
                    <h4>Em Andamento</h4>
                    <p>{emAndamento}</p>
                    <Brightness1Icon className={styles.iconEmAndamento} sx={{ fontSize: 25, color: '#2B7FFF'}} />

                </section>

                <section>
                    <h4>Gravidade Alta</h4>
                    <p>{gravidadeAlta}</p>
                    <AlertTriangle size={25} color="#f30000"/>
                </section>
            </div>
            {/* ------------------------------------ */}

            {/* Dashboard Ações */}
            <div className={styles.dashboardActions}>
                <button className={styles.buttonNovaDenuncia}>
                    <PlusCircle size={45} color="#fd7608" />
                    <h4>Nova Denúncia</h4>
                    <p>Registrar um novo incêndio</p>
                </button>

                <button className={styles.buttonMinhasDenuncias}>
                    <FileText size={45} color="#3f7cd8" />
                    <h4>Minhas Denúncias</h4>
                    <p>Ver todas as denúncias</p>
                </button>
            </div>
            {/* ------------------------------------ */}

            {/* Denuncias Recentes */}
            <div className={styles.recentDenuncias}>
                <div className={styles.containerTitleRecentDenuncias}>
                    <h4>Denúncias Recentes</h4>
                    <p>Suas últimas 5 denúncias registradas</p>
                </div>
                

            </div>
            {/* ------------------------------------ */}


            
        </div>
    )
}