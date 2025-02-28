document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const competicionId = params.get("id");

    if (!competicionId) {
        document.getElementById("proximasCompeticiones").innerHTML = "<p>Error: No se encontró la competición.</p>";
        return;
    }

    fetch(`http://localhost:3000/proximasCompeticiones/${competicionId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(competicion => {
            const competicionContainer = document.getElementById("proximasCompeticiones");

            if (!competicionContainer) {
                console.error("El contenedor de la competición no fue encontrado.");
                return;
            }

            const url = encodeURIComponent(window.location.href);
            const titulo = encodeURIComponent(competicion.titulo);

            competicionContainer.innerHTML = `
                <div class="news-card">
                    <img src="${competicion.imagen}" alt="${competicion.titulo}" class="news-card-img">
                    <div class="news-card-body">
                        <h1>${competicion.titulo}</h1>
                        <p><strong>Fecha:</strong> ${competicion.fecha}</p>
                        <p><strong>Ubicación:</strong> ${competicion.ubicacion}</p>

                        <p>${competicion.descripcion}</p>

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
            console.error("Error cargando la competicion:", error);
            document.getElementById("proximasCompeticiones").innerHTML = `<p>Error al cargar la competicion. Inténtalo más tarde.</p>`;
        });
});

function copiarEnlace(url) {
    navigator.clipboard.writeText(url).then(() => {
        alert("¡Enlace copiado al portapapeles!");
    }).catch(err => {
        console.error("Error al copiar el enlace:", err);
    });
}
