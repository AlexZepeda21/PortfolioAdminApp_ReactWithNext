"use client"
import { useState } from "react";
import FindTechnologies from "../../../components/Technologies/FindTechnologies.jsx";
import InsertTechnology from "../../../components/Technologies/InsertTechnology.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../styles/general.css"
import "../../../styles/button.css"

export default function Technology() {
    const [isModalTechnology, setIsModalTechnology] = useState(false);
    const OpenModalTechnology = () => setIsModalTechnology(true);
    const CloseModalTechnology = () => setIsModalTechnology(false);
    return (
        <div>
            <div>
                <div>
                    <button onClick={OpenModalTechnology} className="button_style"><h3 className="tittle_button">Agregar Tecnología</h3></button>
                </div>
                <FindTechnologies />
            </div>
            <div>
                {isModalTechnology && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <button onClick={CloseModalTechnology} className="button_style tittle_button"><h3>Cerrar</h3></button>
                            <InsertTechnology />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
