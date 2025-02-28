document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:5000/noticias")
        .then(response => response.json())
        .then(noticias => {
            const noticiasContainer = document.getElementById("noticiasRecientes");
            let html = "";
            
            noticias.forEach(noticia => {
                html += `
                    <div class="news-card">
                        <img src="${noticia.imagen}" alt="${noticia.titulo}">
                        <div class="news-card-body">
                            <h5>${noticia.titulo}</h5>
                            <p><strong>Autor:</strong> ${noticia.autor}</p>
                            <p><strong>Fecha:</strong> ${noticia.fechaPublicacion}</p>
                            <p>${noticia.descripcionCorta}</p>
                            <a href="#" class="btn-news">Ver noticia completa</a>
                        </div>
                    </div>
                `;
            });
            
            noticiasContainer.innerHTML = html;
        })
        .catch(error => console.error("Error cargando las noticias:", error));
});