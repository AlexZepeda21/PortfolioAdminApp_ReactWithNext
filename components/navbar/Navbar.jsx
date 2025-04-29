import Link from "next/link";
import "../../styles/Navbar/navbar.css"

export default function Navbar() {
    return (
        <nav className="navbar">
            <Link href="./" className="link">
                Salir
            </Link>

            <Link href="./src/project" className="link">
                Project
            </Link>
        </nav>
    );
}