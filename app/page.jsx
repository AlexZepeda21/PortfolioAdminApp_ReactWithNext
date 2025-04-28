import Link from "next/link"
import "../styles/login.css"
import "bootstrap/dist/css/bootstrap.min.css"

export default function Login() {
    return (
        <html lang="es">
            <body>
                <main className="container-main d-flex justify-content-center align-items-center min-vh-100">

                    <form action="" className="form-login sectionLogin">

                        <label htmlFor="email" className="form-label">Ingrese su correo</label>
                        <input type="email" name="email" id="email" className="form-control" placeholder="email@hotmail.com" />

                        <label htmlFor="password" className="form-label mt-3">Ingrese su contraseña</label>
                        <input type="password" name="password" id="password" className="form-control" placeholder="********" />

                        <button type="submit" className="btn-login mt-4">Enviar</button>

                    </form>

                </main>
            </body>
        </html>
    );
}
