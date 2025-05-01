"use client"
import { useEffect, useState } from "react";
import "../../styles/Projects/InsertPage.css"
import { apiRoute } from "../../lib/api";
import axios from "axios";
import Cookies from "js-cookie";

export default function InsertProject() {
    const userId = Cookies.get("user_id");

    const [categories, setCategories] = useState([]);

    const [dataProject, setDataProject] = useState({
        type_project: "",
        title_project: "",
        development_start_date: "",
        development_end_date: "",
        image_base64: "",
        image_mime: "",
        url_github: "",
        url_site: "",
        url_download: "",
        description: "",
        project_category_id: "",
        user_id: userId
    });

    useEffect(() => {
        axios.get(apiRoute.categoriesProject)
            .then(response => {
                setCategories(response.data)
            })
    }, []);

    const ChangeData = (e) => {
        const { name, value } = e.target;
        setDataProject(prevData => ({
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
            setDataProject(prev => ({
                ...prev,
                image_base64: base64,
                image_mime: file.type
            }));
        };
        reader.readAsDataURL(file);
    };

    const InsertProject = async (e) => {
        e.preventDefault();
        try {
            const response = axios.post(apiRoute.projects, dataProject)
            console.log('Enviado con éxito:', response.data);
            alert("Proyecto enviado con exito");
            setDataProject({
                type_project: "",
                title_project: "",
                development_start_date: "",
                development_end_date: "",
                image_base64: "",
                image_mime: "",
                url_github: "",
                url_site: "",
                url_download: "",
                description: "",
                project_category_id: "",
                user_id: ""
            })
        }
        catch (error) {
            console.error('Error al enviar:', error);
            alert('Ocurrió un error al enviar el formulario');
        }

    }

    return (
        <div>
            <form onSubmit={InsertProject}>
                <h1>Bienvenido</h1>
                <div className="row">
                    <div className="col">
                        <label className="label-form">Tipo de proyecto</label>
                        <input type="text" name="type_project" className="form-control" value={dataProject.type_project} onChange={ChangeData} />
                    </div>
                    <div className="col">
                        <label className="label-form">Titulo de proyecto</label>
                        <input type="text" name="title_project" className="form-control" value={dataProject.title_project} onChange={ChangeData} />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label className="label-form">Fecha de inicio</label>
                        <input type="date" name="development_start_date" className="form-control" value={dataProject.development_start_date} onChange={ChangeData} />
                    </div>
                    <div className="col">
                        <label className="label-form">Fecha de final</label>
                        <input type="date" name="development_end_date" className="form-control" value={dataProject.development_end_date} onChange={ChangeData} />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label className="label-form">Ingrese una imagen</label>
                        <input type="file" name="image_base64" onChange={ConvertToBase64} className="form-control" />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label className="label-form">Enlace de github</label>
                        <input type="text" name="url_github" className="form-control" value={dataProject.url_github} onChange={ChangeData} />

                    </div>
                    <div className="col">
                        <label className="label-form">Enlace url</label>ChangeData
                        <input type="text" name="url_site" className="form-control" value={dataProject.url_site} onChange={ChangeData} />

                    </div>
                    <div>
                        <label className="label-form">Enlace de descarga</label>
                        <input type="text" name="url_download" className="form-control" value={dataProject.url_download} onChange={ChangeData} />
                    </div>
                </div>


                <label className="label-form">Descripción</label>
                <textarea name="description" className="form-control" value={dataProject.description} onChange={ChangeData} />

                <label className="label-form">Categoria</label>
                <select name="project_category_id" onChange={ChangeData} className="form-control">
                    {categories.map((category) => (category && (
                        <option value={category.id_project_category}>{category.id_project_category} // {category.title}</option>
                    )))}
                </select>

                <label className="label-form">User id</label>
                <input type="text" name="user_id" className="form-control" value={dataProject.user_id} onChange={ChangeData} />
                <br />
                <input type="submit" className="form-control" />
            </form>
        </div>
    );
}