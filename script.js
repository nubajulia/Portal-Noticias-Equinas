async function buscarNoticias() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const resultadosNoticias = document.getElementById("resultadosNoticias");

    if (input.trim() === "") {
        resultadosNoticias.innerHTML = "";
        return;
    }
    
    try {
        const response = await fetch("db.json");
        const data = await response.json();

        const noticias = [
            ...data.noticiasRecientes, 
            ...data.cuidadoCaballo, 
            ...data.juegosOlimpicos, 
            ...data.saludBienestar, 
            ...data.razasCaballos, 
            ...data.historia
        ];

        const resultados = noticias.filter(noticia => noticia.titulo.toLowerCase().includes(input));

        resultadosNoticias.innerHTML = "";

        if (resultados.length > 0) {
            resultados.forEach(noticia => {
                const noticiaElemento = document.createElement("div");
                noticiaElemento.innerHTML = `
                    <h3>${noticia.titulo}</h3>
                    <p>${noticia.descripcionCorta}</p>
                    <img src="${noticia.imagen}" alt="${noticia.titulo}" width="200">
                    <hr>
                `;
                resultadosNoticias.appendChild(noticiaElemento);
            });
        } else {
            resultadosNoticias.innerHTML = "<p>No se encontraron noticias.</p>";
        }
    } catch (error) {
        console.error("Error al cargar las noticias:", error);
    }
}