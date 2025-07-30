"use client"

import { useEffect, useState, useCallback, useMemo } from "react"
import axios from "axios"
import { apiRoute } from "../../lib/api"

export default function FindTechnologies() {
  const [technologies, setTechnologies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedTech, setSelectedTech] = useState(null)

  const fetchTechnologies = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(apiRoute.technologies)
      setTechnologies(response.data)
    } catch (err) {
      setError("Ha ocurrido un error al intentar extraer las tecnologías")
    } finally {
      setLoading(false)
    }
  }, [])

  const getImageSrc = (base64, mime) => {
    if (!base64 || !mime) return null
    return `data:${mime};base64,${base64}`
  }


  useEffect(() => {
    fetchTechnologies()
  }, [fetchTechnologies])

  // Colores por tecnología
  const getLogoColor = useMemo(() => {
    const techColors = {
      html: "#e44c2653",
      css: "#264DE4",
      javascript: "#F7DF1E",
      typescript: "#3178C6",
      react: "#61dafb8e",
      vue: "#4FC08D",
      angular: "#DD0031",
      tailwind: "#38B2AC",
      sass: "#CC6699",
      figma: "#F24E1E",
      php: "#777BB4",
      node: "#339933",
      laravel: "#ff2b2066",
      express: "#000000",
      mysql: "#4479A1",
      mongodb: "#47A248",
      next: "#000000",
      nginx: "#009639",
      apache: "#D22128",
      python: "#3776AB",
      astro: "#ff5e0186",
      docker: "#2496ED",
      git: "#F05032",
      github: "#181717",
      vscode: "#007ACC",
      npm: "#CB3837",
      wordpress: "#21759B",
      linux: "#FCC624",
      firebase: "#FFCA28",
      flutter: "#02569B",
    }

    return (techName) => {
      if (!techName) return "#6e6e6e"
      const normalized = techName.toLowerCase()
      return (
        techColors[normalized] || Object.entries(techColors).find(([key]) => normalized.includes(key))?.[1] || "#6e6e6e"
      )
    }
  }, [])


  if (loading) {
    return (
      <div className="tech-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <h1>Cargando tecnologías...</h1>
        </div>
      </div>
    )
  }


  if (error) {
    return (
      <div className="tech-container">
        <div className="error-state">
          <h1>{error}</h1>
          <button onClick={fetchTechnologies} className="retry-btn">
            Reintentar
          </button>
        </div>
      </div>
    )
  }


  return (
    <div className="tech-container">
      <div className="tech-wrapper">
        <h2 className="tech-title">Stack Tecnológico</h2>

        {/* Contenedor hexagonal de tecnologías */}
        <div className="tech-grid">
          {technologies.map((tech, index) => {
            const color = getLogoColor(tech.name_technology)
            const imgSrc = getImageSrc(tech.image_base64, tech.image_mime)
            const isSelected = selectedTech === tech.id_technology

            return (
              <div
                key={tech.id_technology || index}
                className={`tech-item ${isSelected ? "selected" : ""}`}
                onClick={() => setSelectedTech(isSelected ? null : tech.id_technology)}
                style={{
                  "--tech-color": color,
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="tech-circle">
                  <div className="tech-inner">
                    {imgSrc ? (
                      <img
                        src={imgSrc || "/placeholder.svg"}
                        alt={tech.name_technology || "Tecnología"}
                        className="tech-logo"
                        onError={(e) => {
                          console.warn(`Error cargando imagen de ${tech.name_technology}`)
                          e.target.style.display = "none"
                        }}
                      />
                    ) : (
                      <span className="tech-letter">{tech.name_technology?.charAt(0) || "?"}</span>
                    )}
                  </div>
                </div>
                <p className="tech-name">{tech.name_technology}</p>
              </div>
            )
          })}
        </div>

        <div className="tech-footer">
          <p>{technologies.length} tecnologías en el stack</p>
        </div>
      </div>

      <style jsx>{`
        .tech-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .tech-wrapper {
          width: 100%;
          max-width: 1200px;
          text-align: center;
        }

        .tech-title {
          font-size: 3rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 3rem;
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }

        .tech-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 2rem;
          justify-items: center;
          max-width: 800px;
          margin: 0 auto 3rem;
          padding: 2rem;
        }

        .tech-item {
          position: relative;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        .tech-item:hover {
          transform: translateY(-8px) scale(1.05);
        }

        .tech-item.selected {
          transform: translateY(-8px) scale(1.1);
        }

        .tech-circle {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: var(--tech-color);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.3),
            0 0 0 4px rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .tech-item:hover .tech-circle {
          box-shadow: 
            0 12px 40px rgba(0, 0, 0, 0.4),
            0 0 0 4px rgba(255, 255, 255, 0.2);
        }

        .tech-item.selected .tech-circle {
          box-shadow: 
            0 12px 40px rgba(0, 0, 0, 0.4),
            0 0 0 4px #ffffff;
        }

        .tech-inner {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          backdrop-filter: blur(10px);
        }

        .tech-logo {
          width: 60%;
          height: 60%;
          object-fit: contain;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
        }

        .tech-letter {
          font-size: 2rem;
          font-weight: 700;
          color: #ffffff;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .tech-name {
          margin-top: 0.75rem;
          color: #e2e8f0;
          font-size: 0.875rem;
          font-weight: 500;
          text-transform: capitalize;
        }

        .tech-footer {
          color: #94a3b8;
          font-size: 0.875rem;
        }

        .loading-state, .error-state {
          text-align: center;
          color: #ffffff;
        }

        .loading-state h1, .error-state h1 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .error-state h1 {
          color: #ef4444;
        }

        .spinner {
          width: 48px;
          height: 48px;
          border: 3px solid rgba(59, 130, 246, 0.3);
          border-top: 3px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }

        .retry-btn {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          cursor: pointer;
          font-weight: 500;
          transition: background-color 0.2s;
        }

        .retry-btn:hover {
          background: #2563eb;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .tech-title {
            font-size: 2rem;
            margin-bottom: 2rem;
          }

          .tech-grid {
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            gap: 1.5rem;
            padding: 1rem;
          }

          .tech-circle {
            width: 80px;
            height: 80px;
          }

          .tech-letter {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .tech-container {
            padding: 1rem;
          }

          .tech-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
          }

          .tech-circle {
            width: 70px;
            height: 70px;
          }
        }
      `}</style>
    </div>
  )
}
