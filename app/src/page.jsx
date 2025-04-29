"use client";
import Cookies from "js-cookie";
import { apiRoute } from "../../lib/api";
import axios from "axios"; // ¡No olvides importar axios!

export default function Index() {

    const closeSession = async () => {
        try {
            console.log("Intentando logout");
            const token = Cookies.get("token");
            console.log("Enviando solicitud de logout...");
            await axios.post(apiRoute.logout, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Logout exitoso");

            Cookies.remove("token");

            alert("Sesión cerrada correctamente");
            window.location.href = "/";

        } catch (error) {
            console.error("Error al cerrar sesión", error);
            alert("Ocurrió un error al cerrar sesión");
        }
    };

    return (
        <div>
            <h1>Bienvenido mi estimao</h1>
            <button onClick={closeSession}>Salir</button>
        </div>
    );
}
