"use client";
import { useState } from "react";
import FindProject from "../../../components/project/FindProjects";
import InsertProject from "../../../components/project/InsertProject";
import "../../../styles/general.css"
import "../../../styles/button.css"

export default function Project() {

    const [isModalInsert, setIsModalInsert] = useState(false)
    const openModalInsert = () => setIsModalInsert(true);
    const closeModalInsert = () => setIsModalInsert(false);

    return (
        <div>
            <div className="general">
                <button onClick={openModalInsert} className="button_style"><h3 className="tittle_button">Agregar proyecto</h3></button>
                <FindProject />
            </div>
            <div>
                {isModalInsert
                    && (
                        <div className="modal-overlay modal_insert">
                            <div className="modal-content">
                                <button onClick={closeModalInsert} className="button_style tittle_button">Cerrar</button>
                                <InsertProject />
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
}
