import Navbar from "../../components/navbar/Navbar"
export default function LayoutGeneral({children}){
    return(
        <html>
            <header>
                <Navbar/>
            </header>
            <body>
                {children}
            </body>
        </html>        
    )
}