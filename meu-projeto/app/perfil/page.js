'use client'
import { useEffect } from "react"

export default function Perfil(){

    //VERIFICAR SE O TOKEN ESTÁ ARMAZENADO NO STORAGE
    useEffect(() => {const token = localStorage.getItem("token")
    if (!token) {
    router.push("/login")
    }}, [])


    return(
        <div>
            
        </div>
    )
}