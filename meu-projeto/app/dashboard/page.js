'use client'
import { useEffect } from "react"

export default function Dashboard(){

    useEffect(() => {const token = localStorage.getItem("token")
    if (!token) {
    router.push("/")

}

}, [])

    return(
        <div>
            <p>EM CONSTRUÇÃO 🌳</p>
        </div>
    )
}