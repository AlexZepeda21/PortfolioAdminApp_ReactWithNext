'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import { Route } from "../../routes/routes";

export default function FindProject() {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const FindProjects = () => {
        setLoading(true);
        axios.get(Route.project)
            .then(response => {
                setProjects(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    };

    useEffect(() => {
        FindProjects();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error.message}</div>;
    }

    return (
        <div>
            {projects.map((p, index) => (
                <h1>Perro</h1>

            ))}
        </div>
    );
}

/* 
{% load static %}
<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- FontAwesome -->
    <script src="https://kit.fontawesome.com/9cb60abd78.js" crossorigin="anonymous"></script>
     <!-- Logo -->
    <link rel="icon" type="image/ico" href={% static "img/cuba.png" %}>
    <!-- Static CSS-->
    <link rel="stylesheet" href="{% static 'css/colecciones_musicales.css' %}">
    <title>Colecciones Musicales</title>
</head>
<body>
    <header>
        <h1>Colecciones Musicales</h1>
        <form class="container">
            <input name="q" type="text" placeholder="Buscar..." value="{{ request.GET.q }}">
            <button><i class="fas fa-search"></i></button>
        </form>
        <a class="back_arrow" href="{% url 'frontend' %}"><i class="fa fa-arrow-left"></i></a>
    </header>
    <section>
        <div class="container-public">
            <div class="thecard">
                <div class="front">
                    <img class="imagen" src="https://res.cloudinary.com/dmfs1od9n/image/upload/v1739756503/guitar-player-412055_1280_ggkp1o.jpg" alt="Guajiro Natural" loading="lazy" onclick="toogleFlip(this)">
                    <div class="details-public">
                        <h2>Guajiro Natural</h2>
                        <h3>Por: &nbsp; Polo Montañez</h3>
                        <h3>Editorial: Gente Nueva</h3>
                    </div>
                </div>
                <div class="back" hidden>
                    <img style="max-height: 250px" src="https://res.cloudinary.com/dmfs1od9n/image/upload/v1739756592/Ni%C3%B1a_Mia_barcode_zPCkQZ3_a7iz83.png" alt="barcode de Guajiro Natural" >
                </div>
            </div>
        </div>
        <div class="container-public">
            <div class="thecard">
                <div class="front">
                    <img class="imagen" src="https://res.cloudinary.com/dmfs1od9n/image/upload/v1739756502/violin-1617972_1280_kcile1.jpg" alt="Niña Mia" loading="lazy" onclick="toogleFlip(this)">
                    <div class="details-public">
                        <h2>Niña Mía</h2>
                        <h3>Por: &nbsp; Vicentico Valdés</h3>
                        <h3>Editorial: Bohemios del Ayer</h3>
                    </div>
                </div>
                <div class="back" hidden>
                    <img style="max-height: 250px" src="https://res.cloudinary.com/dmfs1od9n/image/upload/v1739756592/Como_Fu%C3%A9_barcode.d573e6720c12_1yrJ40T_mzxfp7.png" alt="barcode de Niña Mía" >
                </div>
            </div>
        </div>
        <div class="container-public">
            <div class="thecard">
                <div class="front">
                    <img class="imagen" src="https://res.cloudinary.com/dmfs1od9n/image/upload/v1739756499/saxophone-546303_1280_mjpikz.jpg" alt="Santa Isabel de las Lajas" loading="lazy" onclick="toogleFlip(this)">
                    <div class="details-public">
                        <h2>Santa Isabel</h2>
                        <h3>Por: &nbsp; Benny Moré</h3>
                        <h3>Editorial: Egrem Music</h3>
                    </div>
                </div>
                <div class="back" hidden>
                    <img style="max-height: 250px" src="https://res.cloudinary.com/dmfs1od9n/image/upload/v1739756592/Yolanda_barcode_2_cdoosu.png" alt="barcode de Santa Isabel" >
                </div>
            </div>
        </div>
        <div class="container-public">
            <div class="thecard">
                <div class="front">
                    <img class="imagen" src="https://res.cloudinary.com/dmfs1od9n/image/upload/v1739756496/default_ZmazXz1_ssokxo.jpg" alt="Hermosa Habana" loading="lazy" onclick="toogleFlip(this)">
                    <div class="details-public">
                        <h2>Hermosa Habana</h2>
                        <h3>Por: &nbsp; Los Zafiros</h3>
                        <h3>Editorial: Egrem Music</h3>
                    </div>
                </div>
                <div class="back" hidden>
                    <img style="max-height: 250px" src="https://res.cloudinary.com/dmfs1od9n/image/upload/v1739756592/Unicornio_Azul_barcode_gfsmjb.png" alt="barcode de Hermosa Habana" >
                </div>
            </div>
        </div>
        <div class="container-public">
            <div class="thecard">
                <div class="front">
                    <img class="imagen" src="https://res.cloudinary.com/dmfs1od9n/image/upload/v1739756494/Silvio_Rodriguez_dtm9z2.jpg" alt="Ojalá" loading="lazy" onclick="toogleFlip(this)">
                    <div class="details-public">
                        <h2>Ojalá</h2>
                        <h3>Por: &nbsp; Silvio Rodríguez</h3>
                        <h3>Editorial: Egrem Music</h3>
                    </div>
                </div>
                <div class="back" hidden>
                    <img style="max-height: 250px" src="https://res.cloudinary.com/dmfs1od9n/image/upload/v1739756592/Un_Mill%C3%B3n_De_Estrellas_barcode_tofmbo.png" alt="barcode de Ojalá" >
                </div>
            </div>
        </div>
        <div class="container-public">
            <div class="thecard">
                <div class="front">
                    <img class="imagen" src="https://res.cloudinary.com/dmfs1od9n/image/upload/v1739756469/clock-5051127_1280_bssdis.jpg" alt="Reloj" loading="lazy" onclick="toogleFlip(this)">
                    <div class="details-public">
                        <h2>Reloj</h2>
                        <h3>Por: &nbsp; Il Divo</h3>
                        <h3>Editor: Orlando Calvo</h3>
                    </div>
                </div>
                <div class="back" hidden>
                    <img style="max-height: 250px" src="https://res.cloudinary.com/dmfs1od9n/image/upload/v1739756591/Ojal%C3%A1_barcode_zut6bb.png" alt="barcode de Reloj" >
                </div>
            </div>
        </div>
        <div class="container-public">
            <div class="thecard">
                <div class="front">
                    <img class="imagen" src="https://res.cloudinary.com/dmfs1od9n/image/upload/v1739756466/artworks-HVyiJjg15905-0-t500x500_ktubx7.jpg" alt="Yolanda" loading="lazy" onclick="toogleFlip(this)">
                    <div class="details-public">
                        <h2>Yolanda</h2>
                        <h3>Por: &nbsp; Pablo Milanés</h3>
                        <h3>Editor: Adalberto Soto</h3>
                    </div>
                </div>
                <div class="back" hidden>
                    <img style="max-height: 250px" src="https://res.cloudinary.com/dmfs1od9n/image/upload/v1739756591/Reloj_barcode_midsae.png" alt="barcode de Yolanda" >
                </div>
            </div>
        </div>
        <div class="container-public">
            <div class="thecard">
                <div class="front">
                    <img class="imagen" src="https://res.cloudinary.com/dmfs1od9n/image/upload/v1739756466/0884385890766_600_klyls3.jpg" alt="Chan Chan" loading="lazy" onclick="toogleFlip(this)">
                    <div class="details-public">
                        <h2>Chan Chan</h2>
                        <h3>Por: &nbsp; Compay Segundo</h3>
                        <h3>Editorial: Gente Nueva</h3>
                    </div>
                </div>
                <div class="back" hidden>
                    <img style="max-height: 250px" src="https://res.cloudinary.com/dmfs1od9n/image/upload/v1739756592/Unicornio_Azul_barcode_gfsmjb.png" alt="barcode de Chan Chan" >
                </div>
            </div>
        </div>
        <div class="container-public">
            <div class="thecard">
                <div class="front">
                    <img class="imagen" src="https://res.cloudinary.com/dmfs1od9n/image/upload/v1739756491/images_lusisb.jpg" alt="Unicornio Azul" loading="lazy" onclick="toogleFlip(this)">
                    <div class="details-public">
                        <h2>Unicornio Azul</h2>
                        <h3>Por: &nbsp; Silvio Rodríguez</h3>
                        <h3>Editorial: Egrem Music</h3>
                    </div>
                </div>
                <div class="back" hidden>
                    <img style="max-height: 250px" src="https://res.cloudinary.com/dmfs1od9n/image/upload/v1739756592/Yolanda_barcode_2_cdoosu.png" alt="barcode de Unicornio Azul" >
                </div>
            </div>
        </div>
        <div class="container-public">
            <div class="thecard">
                <div class="front">
                    <img class="imagen" src="https://res.cloudinary.com/dmfs1od9n/image/upload/v1739756495/piano-5353974_1280_g0otkz.jpg" alt="Intimidad" loading="lazy" onclick="toogleFlip(this)">
                    <div class="details-public">
                        <h2>Intimidad</h2>
                        <h3>Por: &nbsp; Buena Fé</h3>
                        <h3>Editorial: Egrem Music</h3>
                    </div>
                </div>
                <div class="back" hidden>
                    <img style="max-height: 250px" src="https://res.cloudinary.com/dmfs1od9n/image/upload/v1739756591/Reloj_barcode_midsae.png" alt="barcode de Intimidad" >
                </div>
            </div>
        </div>
    </section>


    <!-- FOOTER -->
    <footer>
        <div class="socialIcons">
            <a href="https://www.facebook.com/camaradelibro/" target="_blank"><i class="fa fa-facebook"></i></a>
            <a href="https://twitter.com/camaracubalibro?lang=es" target="_blank"><i class="fa fa-fw fa-twitter"></i></a>
            <a href="https://www.filhcuba.cu/mision-y-vision" target="_blank"><i class="fa fa-book"></i></a>
        </div>

        <div class="footerBottom">
            Copyright &copy; {% now "Y" %} Todos los derechos reservados | Agencia Cubana del ISBN |
            Cámara Cubana del Libro | Hecho con
            <i class="fas fa-heart fa-beat" style="color:red"></i> por
            <a href="https://www.linkedin.com/in/antonio-cruz-gonzalez94" target="_blank"
               style="color: #0dcaf0; text-decoration: none;">T0N1</a>
        </div>

    </footer>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const searchInput = document.querySelector('input[name="q"]');
            const containers = document.querySelectorAll('.container-public');

            // Función para filtrar los elementos según el término de búsqueda
            function filterContainers() {
                const searchTerm = searchInput.value.toLowerCase();

                containers.forEach(function(container) {
                    const details = container.querySelector('.details-public');
                    const textContent = details.textContent.toLowerCase();

                    if (textContent.includes(searchTerm)) {
                        container.style.display = 'block';  // Mostrar el contenedor si el texto coincide
                    } else {
                        container.style.display = 'none';  // Ocultar el contenedor si no coincide
                    }
                });
            }

            // Llamar a la función cuando el usuario escriba en el input
            searchInput.addEventListener('input', filterContainers);

            // Llamar a la función al cargar la página para mostrar los resultados iniciales
            filterContainers();
        });
        
        function toogleFlip(element) {
            let isFlipped = element.classList.contains('flip');
            let barcode = element.parentNode.nextElementSibling;

            if (isFlipped) {
                element.classList.remove('flip');
                barcode.hidden = true;
            } else {
                let flippedImages = document.querySelectorAll('.imagen.flip');

                flippedImages.forEach(function(img) {
                    img.classList.remove('flip');
                    img.parentNode.nextElementSibling.hidden = true;
                });

                element.classList.add('flip');
                barcode.hidden = false;
            }
        }
    </script>

</body>
</html>
*/