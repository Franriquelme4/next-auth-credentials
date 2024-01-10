"use client"
import React from 'react'
import {signOut}  from "next-auth/react"

const DashboardPage = () => {
    const handleLogout = ()=>{
        signOut();

    }
    return (
        <section className="flex justify-center items-center">
            <div>
                <h1 className="text-5xl">Dashboard</h1>
                <button className="bg-white text-black" onClick={handleLogout}>Cerrar Sesion</button>
            </div>
        </section>
    )
}

export default DashboardPage