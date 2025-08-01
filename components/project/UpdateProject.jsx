"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/button.css";
import { apiRoute } from "../../lib/api";




export default function UpdateProject({ selectedProject }) {
    const [categories, setCategories] = useState([]);
    const [dataUpdate, setDataUpdate] = useState(
        {
            type_project: '',
            title_project: '',
            development_start_date: '',
            development_end_date: '',
            image_base64: '',
            image_mime: '',
            url_github: '',
            url_site: '',
            url_download: '',
            description: '',
            project_category_id: '',
            user_id: ''
        }
    );

    const ChangeData = (e) => {
        const { name, value } = e.target;
        setDataUpdate(prevData => ({
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
            setDataUpdate(prev => ({
                ...prev,
                image_base64: base64,
                image_mime: file.type
            }));
        };
        reader.readAsDataURL(file);
    };

    const getCategoryName = (id) => {
        const category = categories.find(cat => cat.id_project_category === id);
        return category ? category.title : "Sin categoría";
    };

    const UpdateProject = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${apiRoute.projects}/${selectedProject.id_project}`, dataUpdate);
            console.log("Se ha actualizado correctamente", response.data)
            alert("Proyecto actualizado correctamente");
            setDataUpdate({
                type_project: '',
                title_project: '',
                development_start_date: '',
                development_end_date: '',
                image_base64: '',
                image_mime: '',
                url_github: '',
                url_site: '',
                url_download: '',
                description: '',
                project_category_id: '',
                user_id: ''
            });
        }
        catch (error) {
            console.log("Ha ocurrido un error", error)
            alert("Ha ocurrido un error al actualizar el proyecto")
        }
    }

    const FetchCategory = () => {
        axios.get(apiRoute.categoriesProject)
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.log("Ha ocurrido un error", error);
            })
    }


    useEffect(() => {
        FetchCategory();
        if (selectedProject) {
            setDataUpdate({ ...selectedProject });
        }
    }, [selectedProject])


    return (
        <div>
            <form onSubmit={UpdateProject}>
                <h1>Bienvenido</h1>
                <div className="row">
                    <div className="col">
                        <label className="label-form">Tipo de proyecto</label>
                        <input type="text" name="type_project" className="form-control" value={dataUpdate.type_project} onChange={ChangeData} />
                    </div>
                    <div className="col">
                        <label className="label-form">Titulo de proyecto</label>
                        <input type="text" name="title_project" className="form-control" value={dataUpdate.title_project} onChange={ChangeData} />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label className="label-form">Fecha de inicio</label>
                        <input type="date" name="development_start_date" className="form-control" value={dataUpdate.development_start_date} onChange={ChangeData} />
                    </div>
                    <div className="col">
                        <label className="label-form">Fecha de final</label>
                        <input type="date" name="development_end_date" className="form-control" value={dataUpdate.development_end_date} onChange={ChangeData} />
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
                        <input type="text" name="url_github" className="form-control" value={dataUpdate.url_github} onChange={ChangeData} />

                    </div>
                    <div className="col">
                        <label className="label-form">Enlace url</label>
                        <input type="text" name="url_site" className="form-control" value={dataUpdate.url_site} onChange={ChangeData} />

                    </div>
                    <div>
                        <label className="label-form">Enlace de descarga</label>
                        <input type="text" name="url_download" className="form-control" value={dataUpdate.url_download} onChange={ChangeData} />
                    </div>
                </div>

                <label className="label-form">Descripción</label>
                <textarea name="description" className="form-control" value={dataUpdate.description} onChange={ChangeData} />
                <br />
                <p><strong>Categoría actual:</strong> {getCategoryName(dataUpdate.project_category_id)}</p>

                <select
                    name="project_category_id"
                    value={dataUpdate.project_category_id || ''}
                    onChange={ChangeData}
                    className="form-control"
                >
                    <option value="">Seleccione una categoría</option>
                    {categories.map((category) => (
                        <option key={category.id_project_category} value={category.id_project_category}>
                            {category.title}
                        </option>

                    ))}
                </select>
                <input type="hidden" name="user_id" value={dataUpdate.user_id} />
                <button type="submit" className="button_style"><h3 className="tittle_button">Actualizar</h3></button>
            </form>
        </div>
    );
}