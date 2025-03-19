document.addEventListener("DOMContentLoaded", () => {
    fetch("../data/escuderias.json")
        .then(response => response.json())
        .then(escuderias => {
            const container = document.getElementById("escuderias-container");
            escuderias.forEach(escuderia => {
                const escuderiaCard = document.createElement("div");
                escuderiaCard.classList.add("escuderia-card");
                
                escuderiaCard.innerHTML = `
                    <img src="${escuderia.fotoLogotipo}" alt="${escuderia.nombre} Logo" class="escuderia-logo">
                    <h2>${escuderia.nombre}</h2>
                    <p>Posición en el campeonato: ${escuderia.posicion}</p>
                    <a href="escuderia.html?id=${escuderia.id}" class="detalle-btn">Ver detalles</a>
                `;
                
                container.appendChild(escuderiaCard);
            });
        })
        .catch(error => console.error("Error cargando los datos de escuderías:", error));
});
