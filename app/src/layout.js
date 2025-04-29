import Navbar from "../../components/navbar/Navbar";

export default function LayoutGeneral({ children }) {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                {children}
            </main>
        </>
    );
}
