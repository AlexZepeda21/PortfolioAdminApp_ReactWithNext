"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import { apiRoute } from "../../lib/api";
import "bootstrap/dist/css/bootstrap.min.css";
import { Github, ExternalLink, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import "../../styles/ListPage.css";
import "../../styles/button.css";
import UpdateProject from "./UpdateProject";


export default function FindProject() {
  const [projects, setProjects] = useState([]);
  const [hoveredProject, setHoveredProject] = useState(null);

  const [error, setError] = useState(null);
  const [login, setLogin] = useState(true);

  const [ModalUpdate, setModalUpdate] = useState(false);

  const openModalUpdate = () => setModalUpdate(true);
  const closeModalUpdate = () => setModalUpdate(false);

  const GetProject = () => {
    axios.get(apiRoute.projects)
      .then(response => {
        setProjects(response.data);
        setLogin(false);
      })
      .catch(() => {
        setError("Ha ocurrido un error al intentar extraer los proyectos");
        setLogin(false);
      })
  }

  const getImageSrc = (base64, mime) => {
    if (!base64 || !mime) return null
    return `data:${mime};base64,${base64}`
  }

  useEffect(() => {
    GetProject();
  }, []);



  if (login) return <h1>Cargando</h1>
  if (error) return <h1>{error}: Ha ocurrido un problema</h1>;
  if (projects.length === 0) return <h1>No hay proyectos, agreguelos.</h1>;

  return (
    <div className="projects-container">
      <div className="projects-wrapper">
        <div className="projects-header">
          <h1 className="projects-title">Projects</h1>
          <p className="projects-subtitle">
            A collection of my recent work showcasing my skills in web development, design, and problem-solving.
          </p>
          <br />
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
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
                <button onClick={openModalUpdate} >
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
                </button>

                <div className="project-content-overlay">
                  <p>{project.type_project}</p>
                  <p className="project-description">{project.description}</p>

                  <div className="project-technologies">
                    {project.technologies?.map((tech, index) => {
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
                  <a href={project.url_github} target="_blank" rel="noopener noreferrer" className="project-link">
                    <Github size={20} />
                  </a>
                  <button className="project-link">
                    Ver detalles <Code2 size={20} />
                  </button>
                </div>
              </motion.div>
            )))}
        </div>
      </div>
      <div>
        {ModalUpdate
          && (
            <div className="modal-overlay modal_insert">
              <div className="modal-content">
                <button onClick={closeModalUpdate} className="button_style tittle_button">Cerrar</button>
                <div>
                  <UpdateProject>

                  </UpdateProject>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>

  );


}
