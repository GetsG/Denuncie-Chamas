'use client'
import { useEffect } from "react"
import { useState } from "react"
import styles from "./page.module.css"
import { FileText } from "@deemlol/next-icons";
import { PlusCircle } from "@deemlol/next-icons";
import { BarChart2 } from "@deemlol/next-icons";
import { AlertTriangle } from "@deemlol/next-icons"
import Brightness1Icon from '@mui/icons-material/Brightness1';
import { useRouter } from "next/navigation"
import { getReports } from "../services/getReports";
import converterData from "../services/converterDataBrParaDate"


export default function Dashboard(){

    const router = useRouter()

    const [reports, setReports] = useState([]);

    const totalDenuncias = reports.length;

    //VERIFICAR SE O TOKEN ESTÁ ARMAZENADO NO STORAGE
    useEffect(() => {const token = localStorage.getItem("token")
    if (!token) {
    router.push("/login")
    }}, [])

    function handleReport() {
    router.push("/report");
  }

        useEffect(() => {
            const carregarDenuncias = async () => {
            try {
                const data = await getReports();
                setReports(data);
            } catch (error) {
                console.error("Erro ao carregar denúncias:", error);
            }};
  
      carregarDenuncias();
    }, []);

    //CARDS INFORMATIVOS QUANTIDADE DE DENUNCIAS
    const totalPendentes = reports.filter(
    (report) => report.status === "PENDENTE"
    ).length;

    const totalEmAndamento = reports.filter(
    (report) => report.status === "EM_ANDAMENTO"
    ).length;

    const totalGravidadeAlta = reports.filter(
    (report) => report.gravidade === "ALTA" && report.status != "RESOLVIDA"
    ).length;

    //ULTIMAS 5 DENUNCIAS
    const ultimasDenuncias = [...reports]
    .sort(
    (a, b) =>
      converterData(b.dataRegistro) -
      converterData(a.dataRegistro)
  )
  .slice(0, 5);

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
                    <p>{totalDenuncias}</p>
                    <BarChart2 size={25} color="#3f7cd8" />
                </section>

                <section>
                    <h4>Pendentes</h4>
                    <p>{totalPendentes}</p>
                    <Brightness1Icon className={styles.iconPendente} sx={{ fontSize: 25 , color: '#F0B100'}}/>
                </section>

                <section>
                    <h4>Em Andamento</h4>
                    <p>{totalEmAndamento}</p>
                    <Brightness1Icon className={styles.iconEmAndamento} sx={{ fontSize: 25, color: '#2B7FFF'}} />

                </section>

                <section>
                    <h4>Alta Gravidade (Pendentes)</h4>
                    <p>{totalGravidadeAlta}</p>
                    <AlertTriangle size={25} color="#f30000"/>
                </section>
            </div>
            {/* ------------------------------------ */}

            {/* Dashboard Ações */}
            <div className={styles.dashboardActions}>
                <button className={styles.buttonNovaDenuncia} onClick={handleReport}>
                    <PlusCircle size={60} color="#fd7608" />
                    <h4>Nova Denúncia</h4>
                    <p>Registrar um novo incêndio</p>
                </button>

                <button className={styles.buttonMinhasDenuncias} onClick={() => router.push("/reports")}>
                    <FileText size={60} color="#3f7cd8" />
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
                
                {totalDenuncias === 0 ? 
                    <div className={styles.noReports}>
                        <FileText size={60} color="#bbb8b8b2" />
                        <p>Nenhuma denúncia registrada ainda</p>
                        <button onClick={() => router.push("/report")}>Criar primeira denúncia</button>

                    </div> : 
                    (<div className={styles.listaRecentes}>
                        {ultimasDenuncias.map((report) => (
                            <div key={report.id_denuncia} className={styles.cardRecente}>
                                <div className={styles.cardRecenteConteudo}>
                                    <div className={styles.tipo_Gravidade}>
                                        <h3>{report.tipoIncendio === "RESIDENCIAL"
                                        ? "Residencial"
                                        : report.tipoIncendio === "COMERCIAL"
                                        ? "Comercial"
                                        : report.tipoIncendio === "FLORESTAL"
                                        ? "Florestal"
                                        : report.tipoIncendio === "URBANO"
                                        ? "Urbano":
                                        "Rural"}</h3>
                                        <p className={`${styles.gravidadeReport} ${report.gravidade === "ALTA" 
                                            ? styles.gravidadeReportAlto : styles.gravidadeReportMedio}`}>
                                                {report.gravidade === "ALTA" ? "Alta" : "Média"}</p>

                                        <p className={`${styles.statusReport} 
                                                        ${report.status === "PENDENTE" 
                                                        ? styles.statusReportPendente
                                                        : report.status === "EM_ANDAMENTO" 
                                                        ? styles.statusReportEmAndamento 
                                                        : styles.statusReportResolvida}`}>
                                            {report.status === "PENDENTE"
                                            ? "Pendente"
                                            : report.status === "EM_ANDAMENTO"
                                            ?  "Em andamento" 
                                            : "Resolvida"}</p>
                                    </div>
                                    <p className={styles.location}>{report.latitude} {report.longitude}</p>
                                    <p className={styles.date}>{report.dataRegistro}</p>
                                    <p className={styles.descricaoReport}>{report.descricao}</p>
                                </div>
                            </div>
                        ))}
                        </div> )}

            </div>
            {/* ------------------------------------ */}


            
        </div>
    )
}