"use client";
import Link from "next/link";
import "../styles/login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { apiRoute } from "../lib/api";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Login() {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const router = useRouter();

    const ChangeDataLogin = (e) => {
        const { name, value } = e.target;
        setLoginData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const TryLogin = async (e) => {

        e.preventDefault();
        try {
            const response = await axios.post(apiRoute.login, loginData);
            Cookies.set("token", response.data.token, { expires: 1 }); // 1 día
            alert("Bienvenido");
            router.push("/src"); // redirige
        } catch (error) {
            console.error("Ha ocurrido un error", error);
            alert("No se ha podido iniciar sesión");
            alert(loginData.email);
            alert(loginData.password);
        }
    };

    return (
        <main className="container-main d-flex justify-content-center align-items-center min-vh-100">
            <form onSubmit={TryLogin} className="form-login sectionLogin">
                <label htmlFor="email" className="form-label">Ingrese su correo</label>
                <input type="email" name="email" value={loginData.email} onChange={ChangeDataLogin} id="email" className="form-control" placeholder="email@hotmail.com" />

                <label htmlFor="password" className="form-label mt-3">Ingrese su contraseña</label>
                <input type="password" name="password" value={loginData.password} onChange={ChangeDataLogin} id="password" className="form-control" placeholder="********" />

                <button type="submit" className="btn btn-primary mt-3">
                    Enviar
                </button>
            </form>
        </main>
    );
}
