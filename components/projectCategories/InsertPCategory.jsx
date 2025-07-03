"use client"
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";
import { apiRoute } from "../../lib/api";
import "../../styles/button.css";
import "../../styles/general.css";
import Cookies from "js-cookie";

export default function InsertPCategories() {

    const [categoryData, setCategoryData] = useState({
        title: "",
        image_base64: "",
        image_mime: "",
        description: "",
        summary: "",
        url: ""
    });

    const ChangeData = (e) => {
        const { name, value } = e.target;
        setCategoryData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const ConvertToBase64 = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result;
            const base64 = result.split(',')[1];
            setCategoryData(prev => ({
                ...prev,
                image_base64: base64,
                image_mime: file.type
            }));
        };
        reader.readAsDataURL(file);
    };

    const InsertCategory = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(apiRoute.categoriesProject, categoryData)
            console.log("Inserción éxitosa", response.data);
            setCategoryData({
                title: "",
                image_base64: "",
                image_mime: "",
                description: "",
                summary: "",
                url: ""
            });
            alert("Categoria creada.")
        }
        catch (error) {
            console.log("Ha ocurrido un error", error);
            alert("No se pudo crear la categoria.")
        }

    }
    return (
        <div className="general">
            <form onSubmit={InsertCategory}>
                <div className="row">
                    <div className="col">
                        <label> Titulo de la categoria </label>
                        <input className="form-control" type="text" name="title" id="title" value={categoryData.title} onChange={ChangeData} />

                        <label> Escoge imagen </label>
                        <input className="form-control" type="file" name="image_base64" id="image_base64" onChange={ConvertToBase64} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label>Descripción</label>
                        <textarea className="form-control" name="description" id="description" value={categoryData.description} onChange={ChangeData} />
                    </div>
                    <div className="col">
                        <label>Resumen</label>
                        <textarea className="form-control" name="summary" id="summary" value={categoryData.summary} onChange={ChangeData} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label>url (Opcional) </label>
                        <input type="text" className="form-control" name="url" id="url" value={categoryData.url} onChange={ChangeData} />
                    </div>
                    <div className="col">
                        <button type="submit" className="button_style"><h3 className="tittle_button">Crear categoría</h3></button>

                    </div>
                </div>
            </form>
        </div>
    );
}