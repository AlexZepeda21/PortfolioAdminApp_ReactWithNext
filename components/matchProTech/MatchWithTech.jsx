"use client"

import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import "../../styles/ListPage.css";
import { motion } from "framer-motion";
import { apiRoute } from "../../lib/api";

export default function MatchWithTech({ id_project }) {
    const [technology, setTechnology] = useState([]);
    const [hoveredTechnology, setHoveredTechnology] = useState(null);
    const [selectedTechnologies, setSelectedTechnologies] = useState([]);


    const FetchTechnologies = async () => {
        try {
            const response = await axios.get(apiRoute.technologies);
            setTechnology(response.data);
        } catch (error) {
            console.error("Error fetching technologies:", error);
        }
    };

    const handleCheckboxChange = (techId) => {
        setSelectedTechnologies((prev) =>
            prev.includes(techId)
                ? prev.filter((id) => id !== techId)
                : [...prev, techId]
        );
    };

    const MathProjectAndTechnology = async (e) => {
        e.preventDefault();

        try {
            for (const techId of selectedTechnologies) {
                await axios.post(apiRoute.pro_tech, {
                    project_id: id_project,
                    technology_id: techId,
                });
            }

            alert("Tecnologías agregadas al proyecto exitosamente.");
        } catch (error) {
            console.error("Error al guardar tecnologías:", error);
        }
    };


    useEffect(() => {
        FetchTechnologies();
    }, []);



    return (


        <div className="projects-wrapper">
            <div className="projects-header">
                <div className="projects-title">
                    <h2>Match with technologies</h2>
                </div>
                <form onSubmit={MathProjectAndTechnology}>
                    <div className="projects-grid">
                        {technology.map((t) => (t && (
                            <motion.div
                                key={t.id_technology}
                                className="project-card"
                                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: t.id_technology * 0.1 }}
                                onMouseEnter={() => setHoveredTechnology(t.id_technology)}
                                onMouseLeave={() => setHoveredTechnology(null)}
                            >
                                <div className="project-image-container">
                                    <img
                                        src={
                                            t.image_base64
                                                ? `data:${t.image_mime};base64,${t.image_base64}`
                                                : "/placeholder.svg"
                                        }
                                        alt={t.name_technology}
                                        className="project-image"
                                        style={{
                                            transform: hoveredTechnology === t.id_technology ? "scale(1.05)" : "scale(1)",
                                        }}
                                    />
                                    <div className="project-image-overlay"></div>
                                    <div className="project-title-container">
                                        <h3 className="project-title">{t.name_technology}</h3>
                                    </div>
                                </div>
                                <input
                                    type="checkbox"
                                    value={t.id_technology}
                                    checked={selectedTechnologies.includes(t.id_technology)}
                                    onChange={() => handleCheckboxChange(t.id_technology)}
                                />
                            </motion.div>
                        )))}

                    </div>
                    <input type="submit" name="" id="" />
                </form>

            </div>

        </div>
    )
}