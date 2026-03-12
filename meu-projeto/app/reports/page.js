'use client'
import { useEffect } from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form";
import styles from "./page.module.css"
import { getReports } from "../services/getReports";

import { FileText } from "@deemlol/next-icons";

export default function Reports(){

    const router = useRouter()

    //VERIFICAR SE O TOKEN ESTÁ ARMAZENADO NO STORAGE
    useEffect(() => {const token = localStorage.getItem("token")
    if (!token) {
    router.push("/login")
    }}, [])

    useEffect(() => {
    const carregar = async () => {
      try {
        const data = await getReports();
        setReports(data);
      } catch (error) {
        console.error(error);
      }
    };

    carregar();
  }, []);

    const {register, handleSubmit, setValue, formState: { errors }} = useForm()

    const [reports, setReports] = useState([]);

    return(
        <div className={styles.container}>
            
            {/* CONTAINER FILTROS */}
            <div className={styles.filtersSection}>

                {/* TITULO E SUBTITULO */}
                <div className={styles.filtersHeader}>
                    <h4>Filtros</h4>
                    <p>Filtre suas denúncias por tipo, status ou gravidade</p>
                </div>

            {/* FILTROS */}
                <div className={styles.filtersGroup}>
                    <div className={styles.filterItem}>
                        <h4>Tipo</h4>
                            <select {...register("tipo")}>
                                <option value="">Todos</option>
                                <option value="residencial">Residencial</option>
                                <option value="comercial">Comercial</option>
                                <option value="florestal">Florestal</option>
                                <option value="urbano">Urbano</option>
                                <option value="rural">Rural</option>
                            </select>
                    </div>

                    <div className={styles.filterItem}>
                        <h4>Status</h4>
                            <select {...register("status")}>
                                <option value="">Todos</option>
                                <option value="pendente">Pendente</option>
                                <option value="emAndamento">Em andamento</option>
                                <option value="resolvida">Resolvida</option>
                            </select>
                    </div>

                    <div className={styles.filterItem}>
                        <h4>Gravidade</h4>
                            <select {...register("gravidade")}>
                                <option value="">Todos</option>
                                <option value="media">Média</option>
                                <option value="alta">Alta</option>
                            </select>
                    </div>
                </div>
            </div>

            {/* DENUNCIAS */}
            <div className={styles.reportsTitle}>
                <h2>{reports.length} Denúncias</h2>
                {reports.length === 0 ? <p>Nenhuma denúncia encontrada com os filtros selecionados.</p> : ""}
            </div>

                {reports.length === 0 ? (
                    <div className={styles.emptyState}>
                        <FileText size={60} color="#bbb8b8b2" />
                        <h2>Nenhuma denúncia encontrada</h2>
                        <p>Você ainda não registrou nenhuma denúncia.</p>
                        <button onClick={() => router.push("/report")}>Registrar Primeira Denúncia</button>
                    </div>
) : (
                <div className={styles.reports}>
                {reports.map((report) => (
                    <div className={styles.cardReports} key={report.id_denuncia}>
                        <img src={`data:image/jpeg;base64,${report.imagem}`} alt="Incêndio"/>
                        <p className={`${styles.gravidadeReport} ${report.gravidade === "ALTA" ? styles.gravidadeReportAlto : styles.gravidadeReportMedio}`}>{report.gravidade === "ALTA" ? "Alta" : "Média"}</p>
                        <h3 className={styles.tipoReport}>{report.tipoIncendio}</h3>
                        <p className={styles.descricaoReport}>{report.descricao}</p>
                    </div>
    ))}
  </div>
)}
                




        </div>
    )
}