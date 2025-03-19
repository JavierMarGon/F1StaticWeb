document.addEventListener("DOMContentLoaded", function() {
    fetch("../data/calendario.json")
        .then(response => response.json())
        .then(calendario => {
            const contenedor = document.getElementById("calendario");
            calendario.forEach(carrera => {
                const card = document.createElement("div");
                card.classList.add("card");
                card.innerHTML = `
                    <h3>${carrera.nombre}</h3>
                    <img src="${carrera.imagenPista}" alt="${carrera.nombre}">
                    <p><strong>Fecha:</strong> ${carrera.fecha}</p>
                    <p><strong>Ubicación:</strong> ${carrera.localizacion}</p>
                `;
                contenedor.appendChild(card);
            });
        })
        .catch(error => console.error("Error al cargar el calendario:", error));
});
