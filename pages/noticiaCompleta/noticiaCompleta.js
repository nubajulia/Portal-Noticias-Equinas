document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const noticiaId = params.get("id");

    if (!noticiaId) {
        document.getElementById("noticiasRecientes").innerHTML = "<p>Error: No se encontró la noticia.</p>";
        return;
    }

    fetch(`http://localhost:3000/noticiasRecientes/${noticiaId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(noticia => {
            const noticiaContainer = document.getElementById("noticiasRecientes");

            if (!noticiaContainer) {
                console.error("El contenedor de la noticia no fue encontrado.");
                return;
            }

            const url = encodeURIComponent(window.location.href);
            const titulo = encodeURIComponent(noticia.titulo);

            noticiaContainer.innerHTML = `
                <div class="news-card">
                    <img src="${noticia.imagen}" alt="${noticia.titulo}" class="news-card-img">
                    <div class="news-card-body">
                        <h1>${noticia.titulo}</h1>
                        <p><strong>Autor:</strong> ${noticia.autor}</p>
                        <p><strong>Fecha:</strong> ${noticia.fechaPublicacion}</p>
                        <p>${noticia.descripcionLarga}</p>

                        <!-- Botones para compartir -->
                        <div class="share-buttons">
                            <a href="https://api.whatsapp.com/send?text=${titulo} - ${url}" target="_blank" class="btn-share whatsapp">
                                <i class="fab fa-whatsapp"></i> WhatsApp
                            </a>
                            <a href="https://www.instagram.com/" target="_blank" class="btn-share instagram">
                                <i class="fab fa-instagram"></i> Instagram
                            </a>
                            <a href="https://www.facebook.com/sharer/sharer.php?u=${url}" target="_blank" class="btn-share facebook">
                                <i class="fab fa-facebook"></i> Facebook
                            </a>
                            <button class="btn-share copy-link" onclick="copiarEnlace('${decodeURIComponent(url)}')">
                                <i class="fas fa-link"></i> Copiar enlace
                            </button>
                        </div>
                    </div>
                </div>
            `;
        })
        .catch(error => {
            console.error("Error cargando la noticia:", error);
            document.getElementById("noticiaCompleta").innerHTML = `<p>Error al cargar la noticia. Inténtalo más tarde. Comprueba que la base de datos esta activa.</p>`;
        });
});

function copiarEnlace(url) {
    navigator.clipboard.writeText(url).then(() => {
        alert("¡Enlace copiado al portapapeles!");
    }).catch(err => {
        console.error("Error al copiar el enlace:", err);
    });
}
