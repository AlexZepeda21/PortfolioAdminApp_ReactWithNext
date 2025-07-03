"use client"

import { useState } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import { apiRoute } from "../../lib/api";

export default function InsertTechnology() {
    const [TechnologyData, setTechnologyData] = useState({
        name_technology: "",
        description: "",
        image_base64: "",
        image_mime: ""
    });

    const ChangeData = (e) => {
        const { name, value } = e.target;
        setTechnologyData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const ConvertToBase64 = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result;
            const base64 = result.split(',')[1];
            setTechnologyData(prev => ({
                ...prev,
                image_base64: base64,
                image_mime: file.type
            }));
        };
        reader.readAsDataURL(file);
    };

    const InsertTechnologyHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post(apiRoute.technologies, TechnologyData);
            alert("Inserción exitosa");
            setTechnologyData({
                name_technology: "",
                description: "",
                image_base64: "",
                image_mime: ""
            });
        } catch (error) {
            alert("Ha ocurrido un error: " + error.message);
        }
    };

    return (
        <div>
            <form onSubmit={InsertTechnologyHandler}>
                <label htmlFor="name_technology">Nombre de tecnología</label>
                <input
                    type="text"
                    name="name_technology"
                    value={TechnologyData.name_technology}
                    onChange={ChangeData}
                    className="form-control mb-3"
                />

                <label htmlFor="description">Descripción</label>
                <input
                    type="text"
                    name="description"
                    value={TechnologyData.description}
                    onChange={ChangeData}
                    className="form-control mb-3"
                />

                <label htmlFor="image">Imagen</label>
                <input
                    type="file"
                    onChange={ConvertToBase64}
                    className="form-control mb-3"
                />

                <input type="submit" value="Enviar" className="btn btn-primary" />
            </form>
        </div>
    );
}
