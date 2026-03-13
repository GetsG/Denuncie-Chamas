'use client'
import { useEffect } from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form";
import styles from "./page.module.css"
import { getReports } from "../services/getReports";

import { FileText } from "@deemlol/next-icons";
import PlaceIcon from '@mui/icons-material/Place';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

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

    const [filtroTipo, setFiltroTipo] = useState("Todos");
    const [filtroStatus, setFiltroStatus] = useState("Todos");
    const [filtroGravidade, setFiltroGravidade] = useState("Todos");

    const reportsFiltrados = reports.filter((report) => {
  const matchTipo =
    filtroTipo === "Todos" || report.tipoIncendio === filtroTipo;

  const matchStatus =
    filtroStatus === "Todos" || report.status === filtroStatus;

  const matchGravidade =
    filtroGravidade === "Todos" || report.gravidade === filtroGravidade;

  return matchTipo && matchStatus && matchGravidade;
});

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
                            <select {...register("tipo")}
                            value={filtroTipo}
                            onChange={(e) => setFiltroTipo(e.target.value)}>
                                  <option value="Todos">Todos</option>
                                  <option value="RESIDENCIAL">Residencial</option>
                                  <option value="COMERCIAL">Comercial</option>
                                  <option value="FLORESTAL">Florestal</option>
                                  <option value="URBANO">Urbano</option>
                                  <option value="RURAL">Rural</option>
                            </select>
                    </div>

                    <div className={styles.filterItem}>
                        <h4>Status</h4>
                            <select {...register("status")}
                            value={filtroStatus}
                            onChange={(e) => setFiltroStatus(e.target.value)}>
                                <option value="Todos">Todos</option>
                                <option value="PENDENTE">Pendente</option>
                                <option value="EM_ANDAMENTO">Em andamento</option>
                                <option value="RESOLVIDA">Resolvida</option>
                            </select>
                    </div>

                    <div className={styles.filterItem}>
                        <h4>Gravidade</h4>
                            <select {...register("gravidade")}
                            value={filtroGravidade}
                            onChange={(e) => setFiltroGravidade(e.target.value)}>
                                <option value="Todos">Todos</option>
                                <option value="MEDIA">Média</option>
                                <option value="ALTA">Alta</option>
                            </select>
                    </div>
                </div>
            </div>

            {/* DENUNCIAS */}
            <div className={styles.reportsTitle}>
                <h2>{reportsFiltrados.length} Denúncias</h2>
                {reportsFiltrados.length === 0 ? <p>Nenhuma denúncia encontrada com os filtros selecionados.</p> : ""}
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
                {reportsFiltrados.map((report) => (
                    <div className={styles.cardReports} key={report.id_denuncia}>
                        <img src={`data:image/jpeg;base64,${report.imagem}`} alt="Incêndio"/>
                        <div className={styles.gravidade_stats}>
                            <p className={`${styles.gravidadeReport} ${report.gravidade === "ALTA" ?
                                styles.gravidadeReportAlto : styles.gravidadeReportMedio}`}>
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
                        <h3 className={styles.tipoReport}>
                            {report.tipoIncendio === "RESIDENCIAL"
                            ? "🏠 Residencial"
                            : report.tipoIncendio === "COMERCIAL"
                            ? "🏬 Comercial"
                            : report.tipoIncendio === "FLORESTAL"
                            ? "🌲 Florestal"
                            : report.tipoIncendio === "URBANO"
                            ? "🏙️ Urbano":
                            "🌾 Rural"}</h3>
                        <p className={styles.descricaoReport}>{report.descricao}</p>
                        <p className={styles.location}><PlaceIcon sx={{ fontSize: 20 , color: '#000000'}}/> {report.latitude} {report.longitude}</p>
                        <p className={styles.date}><AccessTimeIcon sx={{ fontSize: 20 , color: '#000000'}}/>{report.dataRegistro}</p>
                    </div>
    ))}
  </div>
)}
                




        </div>
    )
}