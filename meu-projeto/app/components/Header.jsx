"use client";
import styles from "./Header.module.css"
import Logo from '../../public/logo.png';
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "@deemlol/next-icons";
import { jwtDecode } from "jwt-decode";
import MenuIcon from '@mui/icons-material/Menu';
import { User } from "@deemlol/next-icons";
import { FileText } from "@deemlol/next-icons";
import { Grid } from "@deemlol/next-icons";

export default function Header() {

    const [nome, setNome] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            const decoded = jwtDecode(token)
            setNome(decoded.nome);
        }
    }, []);

    function handleLogout() {
        localStorage.removeItem("token");
        router.push("/login");
  }

  function handleDashboard() {
        router.push("/dashboard");
  }

  function handleTermos() {
        router.push("https://denuncie-chamas-backend.onrender.com/termos");
  }

  return (
    <header className={styles.Header}>
        <div className={styles.left} onClick={() => router.push("/dashboard")}>
            <Image className={styles.logo} src={Logo} alt="Logo Denuncie Chamas"/>
        <div className={styles.title}>
            <h1>Denuncie Chamas</h1>
            <p>Olá, {nome}</p>
        </div>
        </div>

        <nav className={styles.navbar}>
            <button onClick={() => setMenuOpen(!menuOpen)} className={styles.buttonMenu}>
                <MenuIcon sx={{ fontSize: 20, color: '#000000' }}/> <p>Menu</p>
            </button>

            {menuOpen && (
                <div className={styles.menu}>
                    <p className={styles.titleMenu}>Minha Conta</p>

                    <div className={styles.divMenuItem} onClick={handleDashboard}>
                        <Grid size={14} color="#000000" />
                        <p className={styles.menuItem}>Tela inicial</p>
                    </div>

                    <div className={styles.divMenuItem} onClick={handleTermos}>
                        <FileText size={14} color="#000000" />
                        <p className={styles.menuItem}>Termos de Uso</p>
                    </div>

                    <div className={styles.divMenuItem} onClick={handleLogout}>
                        <LogOut size={14} color="#000000" />
                        <p className={styles.menuItem} >Sair</p>
                    </div>
                    
                </div>
            )}
        </nav>

        
    </header>
  )
}