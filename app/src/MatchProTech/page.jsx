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
                        {project.map((project) => (
                            project && (
                                <motion.div
                                    key={project.id_project}
                                    className="project-card"
                                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: project.id_project * 0.1 }}
                                    onMouseEnter={() => setHoveredProject(project.id_project)}
                                    onMouseLeave={() => setHoveredProject(null)}
                                >

                                    <div className="project-image-container">
                                        <img
                                            src={
                                                project.image_base64
                                                    ? `data:${project.image_mime};base64,${project.image_base64}`
                                                    : "/placeholder.svg"
                                            }
                                            alt={project.title}
                                            className="project-image"
                                            style={{
                                                transform: hoveredProject === project.id_project ? "scale(1.05)" : "scale(1)",
                                            }}
                                        />
                                        <div className="project-image-overlay"></div>
                                        <div className="project-title-container">
                                            <h3 className="project-title">{project.title_project}</h3>
                                        </div>
                                    </div>


                                    <div className="project-content-overlay">
                                        <p>{project.type_project}</p>

                                        {/* <div className="project-technologies">
                    {project.technologies.map((tech, index) => (
                      <div key={index} className="technology-tag">
                        <img src={tech.icon || "/placeholder.svg"} alt={tech.name} className="technology-icon" />
                        <span className="technology-name">{tech.name}</span>
                      </div>
                    ))}
                  </div> */}
                                    </div>

                                    <div className="project-links">

                                        <button onClick={() => {
                                            setData({ id_project: project.id_project });
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
