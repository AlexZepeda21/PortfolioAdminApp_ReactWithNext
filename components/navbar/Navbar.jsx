import Link from "next/link";
import "../../styles/Navbar/navbar.css";
import "../../styles/button.css";

export default function Navbar() {
    return (
        <nav className="navbar">
            <Link href="/" className="link">
                Salir
            </Link>

            <Link href="/src/project" className="link">
                Project
            </Link>

            <Link href="/src/category_project" className="link">
                Categorias de proyecto
            </Link>

            <Link href="/src/technology" className="link">
                Teconologías
            </Link>

            <Link href="/src/MatchProTech" className="link">
                Unir proyectos y tecnologías
            </Link>
        </nav>
    );
}