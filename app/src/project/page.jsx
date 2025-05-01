"use client";
import { useState } from "react";
import FindProject from "../../../components/project/FindProjects";
import InsertProject from "../../../components/project/InsertProject";

export default function Project() {

    const [isModalInsert, setIsModalInsert] = useState(false)
    const openModalInsert = () => setIsModalInsert(true);
    const closeModalInsert = () => setIsModalInsert(false);

    return (
        <div>
            <div>
                <button onClick={openModalInsert} className="btn_style">Agregar proyecto</button>
            </div>
            <div>
                <FindProject />
            </div>
            <div>
                {isModalInsert
                    && (
                        <div className="modal-overlay modal_insert">
                            <div className="modal-content">
                                <button onClick={closeModalInsert} className="btn_style">Cerrar</button>
                                <InsertProject />
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
}
