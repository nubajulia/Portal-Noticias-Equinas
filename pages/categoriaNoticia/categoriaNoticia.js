document.addEventListener("DOMContentLoaded", function () {
    const categoryLinks = document.querySelectorAll(".category-item");
    const newsTitle = document.querySelector(".news-title");
    const noticiasContainer = document.querySelector(".news-grid");

    function obtenerCategoriaDeURL() {
        const params = new URLSearchParams(window.location.search);
        return params.get("categoria") || "proximasCompeticiones"; 
    }

    function cargarNoticias(categoria) {
        fetch(`http://localhost:3000/${categoria}`)
            .then(response => {
                if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
                return response.json();
            })
            .then(noticias => {
                if (!noticiasContainer) {
                    console.error("El contenedor de noticias no fue encontrado.");
                    return;
                }

                noticiasContainer.innerHTML = noticias.map(noticia => `
                    <div class="news-card">
                        <img src="${noticia.imagen}" alt="${noticia.titulo}" class="news-card-img">
                        <div class="news-card-body">
                            <h3>${noticia.titulo}</h3>
                            <p><strong>Autor:</strong> ${noticia.autor}</p>
                            <p><strong>Fecha:</strong> ${noticia.fechaPublicacion}</p>
                            <p>${noticia.descripcionCorta}</p>
                        </div>
                    </div>
                `).join("");
            })
            .catch(error => {
                console.error("Error cargando las noticias:", error);
                noticiasContainer.innerHTML = `<p>Error al cargar las noticias. Inténtalo más tarde. Comprueba que la base de datos esta activa.</p>`;
            });
    }

    function actualizarURLYRecargar(categoria) {
        history.pushState({}, "", `?categoria=${categoria}`);
        newsTitle.textContent = categoria.replace(/([A-Z])/g, " $1").trim().toUpperCase();
        cargarNoticias(categoria);
    }

    categoryLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); 

            const nuevaCategoria = new URL(this.href).searchParams.get("categoria");

            if (nuevaCategoria) {
                actualizarURLYRecargar(nuevaCategoria);
            }
        });
    });

    const categoriaActual = obtenerCategoriaDeURL();
    actualizarURLYRecargar(categoriaActual);
});
