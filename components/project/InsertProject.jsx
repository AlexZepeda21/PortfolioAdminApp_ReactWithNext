"use client"
import { useEffect, useState } from "react";
import "../../styles/Projects/projectInsert.css"
import { apiRoute } from "../../lib/api";
import axios from "axios";


export default function InsertProject() {

    /*    
    useEffect(()=>{
    
        },[])   
    */

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
        user_id: ""
    })

    const ChangeInsert = (e) => {
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
            setDataProject(prev => ({
                ...prev,
                image_base64: reader.result,
                image_mime: file.type
            }));
        };
        reader.readAsDataURL(file);
    };

    const insertProject = async (e) => {
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
            <form onSubmit={insertProject}>
                <h1>Bienvenido</h1>
                <div className="row">
                    <div className="col">
                        <label className="label-form">Tipo de proyecto</label>
                        <input type="text" name="type_project" className="form-control" value={dataProject.type_project} onChange={ChangeInsert} />
                    </div>
                    <div className="col">
                        <label className="label-form">Titulo de proyecto</label>
                        <input type="text" name="title_project" className="form-control" value={dataProject.title_project} onChange={ChangeInsert} />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label className="label-form">Fecha de inicio</label>
                        <input type="date" name="development_start_date" className="form-control" value={dataProject.development_start_date} onChange={ChangeInsert} />
                    </div>
                    <div className="col">
                        <label className="label-form">Fecha de final</label>
                        <input type="date" name="development_end_date" className="form-control" value={dataProject.development_end_date} onChange={ChangeInsert} />
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
                        <input type="text" name="url_github" className="form-control" value={dataProject.url_github} onChange={ChangeInsert} />

                    </div>
                    <div className="col">
                        <label className="label-form">Enlace url</label>
                        <input type="text" name="url_site" className="form-control" value={dataProject.url_site} onChange={ChangeInsert} />

                    </div>
                    <div>
                        <label className="label-form">Enlace de descarga</label>
                        <input type="text" name="url_download" className="form-control" value={dataProject.url_download} onChange={ChangeInsert} />
                    </div>
                </div>


                <label className="label-form">Descripción</label>
                <textarea name="description" className="form-control" value={dataProject.description} onChange={ChangeInsert} />

                <label className="label-form">Categoria</label>
                <input type="text" name="project_category_id" className="form-control" value={dataProject.project_category_id} onChange={ChangeInsert} />

                <label className="label-form">User id</label>
                <input type="text" name="user_id" className="form-control" value={dataProject.user_id} onChange={ChangeInsert} />
                <br />
                <input type="submit" className="form-control" />
            </form>
        </div>
    );
}