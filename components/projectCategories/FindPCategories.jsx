"use client"
import { useState, useEffect } from "react";
import { apiRoute } from "../../lib/api";
import { motion } from "framer-motion"
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Projects/ListPage.css"

export default function FindPCategories() {

    const [categories, setCategories] = useState([]);
    const [hoveredProject, setHoveredProject] = useState(null);

    const [login, setLogin] = useState(true);
    const [error, setError] = useState(null);



    useEffect(() => {
        axios.get(apiRoute.categoriesProject)
            .then(response => {
                setCategories(response.data)
                setLogin(false);
            })
            .catch(() => {
                setError("Se ha presentado un error al presentar los proyectos");
                setLogin(false);
            })
    }, [])

    if (login) return <h1>Cargando por favor espere.</h1>
    if (error) return <h1>Ha ocurrido un error inesperado</h1>
    if (categories.length === 0) return <h1>No hay categorias, agregue nuevas</h1>

    return (
        <div className="projects-container">
            <div className="projects-wrapper">
                <div className="projects-header">
                    <h1 className="projects-title">Categorías</h1>
                    <p className="projects-subtitle">
                        A collection of my recent work showcasing my skills in web development, design, and problem-solving.
                    </p>
                    <br />
                </div>
                <div className="projects-grid">
                    {categories.map((category) =>
                    (category && (
                        <motion.div
                            key={category.id_project_category}
                            className="project-card"
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: category.id_project_category * 0.1 }}
                            onMouseEnter={() => setHoveredProject(category.id_project_category)}
                            onMouseLeave={() => setHoveredProject(null)}
                        >
                            <div className="project-image-container">
                                <img
                                    src={
                                        category.image_base64
                                            ? `data:${category.image_mime};base64,${category.image_base64}`
                                            : "/placeholder.svg"
                                    }
                                    alt={category.title}
                                    className="project-image"
                                    style={{
                                        transform: hoveredProject === category.id_project ? "scale(1.05)" : "scale(1)",
                                    }}
                                />

                                <div className="project-image-overlay"></div>
                                <div className="project-title-container">
                                    <h3 className="project-title">{category.title}</h3>
                                    <div className="project-content">
                                        <p className="project-description">{category.description}</p>
                                        <p className="project-description">{category.summary}</p>
                                    </div>
                                </div>

                            </div>

                        </motion.div>
                    )))}
                </div>

            </div>
        </div>
    );
}