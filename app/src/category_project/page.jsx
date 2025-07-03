"use client"
import { useEffect, useState } from "react";
import FindPCategories from "../../../components/projectCategories/FindPCategories"
import InsertPCategories from "../../../components/projectCategories/InsertPCategory";
import { motion } from "framer-motion"
import "../../../styles/general.css"
import "../../../styles/button.css"

export default function category_project() {
    const [isModalCategories, setIsModalCategories] = useState(false);

    const OpenModalInsert = () => { setIsModalCategories(true) };
    const CloseModalInsert = () => { setIsModalCategories(false) }


    return (
        <div>
            <div>
                <div className="general">
                    <button onClick={OpenModalInsert} className="button_style"><h3 className="tittle_button">Agregar Categoria</h3></button>
                    <FindPCategories />
                </div>
            </div>
            <div>
                {isModalCategories
                    && (
                        <div className="modal-overlay modal_insert">
                            <div className="modal-content">
                                <button onClick={CloseModalInsert} className="button_style tittle_button"><h3>Cerrar</h3></button>
                                <InsertPCategories />
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
}