document.addEventListener("DOMContentLoaded", () => {
    fetch('../data/pilotos.json')
                .then(response => response.json())
                .then(data => {
                    const pilotosList = document.getElementById('pilotos-list');
                    data.forEach(piloto => {
                        const pilotoDiv = document.createElement('div');
                        pilotoDiv.classList.add('piloto');
                        pilotoDiv.innerHTML = `
                            <a href="piloto.html?id=${piloto.id}">
                                <img src="${piloto.foto}" alt="${piloto.nombre}" width="100">
                                <h3>${piloto.nombre}</h3>
                            </a>
                        `;
                        pilotosList.appendChild(pilotoDiv);
                    });
                })
                .catch(error => console.error('Error cargando los datos de los pilotos:', error));
            });