document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const pilotoId = params.get('id');

    // Cargar los datos de los pilotos y escuderías desde los archivos JSON
    Promise.all([
        fetch('../data/pilotos.json').then(response => response.json()),
        fetch('../data/escuderias.json').then(response => response.json())
    ])
    .then(([pilotos, escuderias]) => {
        // Encontrar el piloto con el id correspondiente
        const piloto = pilotos.find(p => p.id == pilotoId);
        
        if (piloto) {
            // Encontrar la escudería del piloto
            const escuderia = escuderias.find(e => e.id == piloto.escuderia);

            // Mostrar los detalles del piloto en la página
            document.getElementById('nombre-piloto').textContent = piloto.nombre;
            document.getElementById('foto-piloto').src = piloto.foto;
            document.getElementById('posicion-piloto').textContent = piloto.posicion;
            document.getElementById('puntos-piloto').textContent = piloto.puntos;

            // Crear el botón de la escudería
            if (escuderia) {
                const escuderiaBtn = document.getElementById('escuderia-piloto');
                escuderiaBtn.innerHTML = `
                    <a href="escuderia.html?id=${escuderia.id}" style="display: flex; align-items: center; text-decoration: none; background: #ddd; padding: 8px; border-radius: 5px;">
                        <img src="${escuderia.fotoLogotipo}" alt="${escuderia.nombre}" style="width: 40px; height: 40px; margin-right: 10px;">
                        <span style="font-weight: bold; color: black;">${escuderia.nombre}</span>
                    </a>
                `;
            }
        } else {
            console.error('Piloto no encontrado');
        }
    })
    .catch(error => console.error('Error cargando los datos:', error));
});
