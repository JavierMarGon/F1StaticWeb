document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const escuderiaId = urlParams.get("id");

    if (!escuderiaId) {
        document.getElementById("escuderia-container").innerHTML = "<p>Escudería no encontrada.</p>";
        return;
    }

    Promise.all([
        fetch("../data/escuderias.json").then(response => response.json()),
        fetch("../data/pilotos.json").then(response => response.json())
    ])
    .then(([escuderias, pilotos]) => {
        const escuderia = escuderias.find(e => e.id == escuderiaId);
        if (!escuderia) {
            document.getElementById("escuderia-container").innerHTML = "<p>Escudería no encontrada.</p>";
            return;
        }

        const escuderiaContainer = document.getElementById("escuderia-container");
        escuderiaContainer.innerHTML = `
            <div class="escuderia-title">
                <img src="${escuderia.fotoLogotipo}" alt="${escuderia.nombre} Logo" class="escuderia-logo">
            </div>
            <p>Posición en el campeonato: ${escuderia.posicion}</p>
            <div class="escuderia-coche-container">
                <img src="${escuderia.fotoCoche}" alt="Coche de ${escuderia.nombre}" class="escuderia-coche">
            </div>
            <h2>Pilotos</h2>
            <div id="pilotos-container"></div>
        `;
        
        const pilotosContainer = document.getElementById("pilotos-container");
        escuderia.pilotos.forEach(pilotoId => {
            const piloto = pilotos.find(p => p.id === pilotoId);
            if (piloto) {
                const pilotoCard = document.createElement("div");
                pilotoCard.classList.add("piloto-card");
                pilotoCard.innerHTML = `
                    <a href="piloto.html?id=${piloto.id}">
                        <img src="${piloto.foto}" alt="${piloto.nombre}" width="100">
                        <h3>${piloto.nombre}</h3>
                    </a>
                `;
                pilotosContainer.appendChild(pilotoCard);
            }
        });
    })
    .catch(error => console.error("Error cargando los datos:", error));
});
