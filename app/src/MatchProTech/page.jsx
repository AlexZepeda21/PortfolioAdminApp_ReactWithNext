"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { apiRoute } from "../../../lib/api";
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from "framer-motion";
import "../../../styles/ListPage.css";
import "../../../styles/button.css";
import MatchWithTech from "../../../components/matchProTech/MatchWithTech";

export default function MatchProTech() {
    const [project, setProject] = useState([]);

    const [hoveredProject, setHoveredProject] = useState(null);
    const [modalMatch, setModalMatch] = useState(false);

    const [data, setData] = useState({
        id_project: "",
    })

    const OpenModalMatch = () => {
        setModalMatch(true);
    }
    const ClosedModalMatch = () => {
        setModalMatch(false);
    }

    const FetchProject = async () => {
        try {
            const response = await axios.get(apiRoute.projects);
            setProject(response.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    const getImageSrc = (base64, mime) => {
    if (!base64 || !mime) return null;
    return `data:${mime};base64,${base64}`;
};



    useEffect(() => {
        FetchProject();
    }, []);

    return (
        <main>
            <div className="projects-container">
                <div className="projects-wrapper">
                    <div className="projects-header">
                        <h1 className="projects-title">Selecciona el proyecto</h1>
                        <p className="projects-subtitle">
                            Proyectos listos para ser anexados a tecnologías, elige el proyecto, selecciona sus tecnologías y listo.
                        </p>
                        <br />
                    </div>

                    <div className="projects-grid">
                        {project.map((p) => (
                            p && (
                                <motion.div
                                    key={p.id_project}
                                    className="project-card"
                                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: p.id_project * 0.1 }}
                                    onMouseEnter={() => setHoveredProject(p.id_project)}
                                    onMouseLeave={() => setHoveredProject(null)}
                                >

                                    <div className="project-image-container">
                                        <img
                                            src={
                                                p.image_base64
                                                    ? `data:${p.image_mime};base64,${p.image_base64}`
                                                    : "/placeholder.svg"
                                            }
                                            alt={p.title}
                                            className="project-image"
                                            style={{
                                                transform: hoveredProject === p.id_project ? "scale(1.05)" : "scale(1)",
                                            }}
                                        />
                                        <div className="project-image-overlay"></div>
                                        <div className="project-title-container">
                                            <h3 className="project-title">{p.title_project}</h3>
                                        </div>
                                    </div>


                                    <div className="project-content-overlay">
                                        <p>{p.type_project}</p>

                                        <div className="project-technologies">
                                            {p.technologies?.map((tech, index) => {
                                                const imgSrc = getImageSrc(tech.image_base64, tech.image_mime);
                                                return (
                                                    <div key={index} className="technology-tag">
                                                        <img
                                                            src={imgSrc || "/placeholder.svg"}
                                                            alt={tech.name_technology || "Tecnología"}
                                                            className="technology-icon"
                                                            onError={(e) => {
                                                                console.warn(`Error cargando imagen de ${tech.name_technology}`);
                                                                e.target.style.display = "none";
                                                            }}
                                                        />
                                                        <span className="technology-name">{tech.name_technology}</span>
                                                    </div>
                                                );
                                            })}

                                        </div>
                                    </div>

                                    <div className="project-links">
                                        <button onClick={() => {
                                            setData({ id_project: p.id_project });
                                            OpenModalMatch();
                                        }}
                                        >
                                            Elegir
                                        </button>
                                    </div>

                                </motion.div>
                            )))}
                    </div>
                </div>

            </div>
            <div>
                {modalMatch && (

                    <div className="projects-container modal-overlay">
                        <div className="modal-content">
                            <button type="button" onClick={ClosedModalMatch}>
                                cerrar
                            </button>

                            <MatchWithTech id_project={data.id_project}>

                            </MatchWithTech>
                        </div>

                    </div>
                )}
            </div>
        </main>


    )
}
