"use client"
import { useEffect, useState } from "react";
import "../../../styles/ProjectCategories/categories.css";
import FindPCategories from "../../../components/projectCategories/FindPCategories"
import InsertPCategories from "../../../components/projectCategories/InsertPCategories";

export default function category_project() {
    const [isModalCategories, setIsModalCategories] = useState(false);

    const OpenModalInsert = () => { setIsModalCategories(true) };
    const CloseModalInsert = () => { setIsModalCategories(false) }


    return (
        <div>
            <div>
                <h1 className="titulo_ProjectCategories">CATEGORIAS DE PROYECTO</h1>
                <button onClick={OpenModalInsert}>Agregar Categoria</button>
            </div>
            <FindPCategories />
            <div>
                {isModalCategories
                    && (
                        <div className="modal-overlay modal_insert">
                            <div className="modal-content">
                                <button onClick={CloseModalInsert} className="btn_style">Cerrar</button>
                                <InsertPCategories />
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
}