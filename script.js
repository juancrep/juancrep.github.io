import { people } from './people.js';  // Asegúrate de que la ruta sea correcta

// Función para limpiar el texto y formatearlo como se requiere
function formatFileName(text) {
    return text
        .toLowerCase() // Convertir a minúsculas
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Eliminar tildes
        .replace(/\s+/g, '_'); // Reemplazar espacios por guiones bajos
}

// Función para crear una tarjeta HTML por cada persona en el array
function createCards() {
    const container = document.getElementById('card-container');
    people.forEach((person, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-index', index); // Para identificar cada tarjeta por índice

        card.innerHTML = `
            <div class="top-section">
                <div class="info">
                    <div class="name">${person.name}</div>
                    <div class="position">${person.position}</div>
                    <div class="phone">${person.phone}</div>
                </div>
                <img class="logo" src="./img/logo.png" alt="Logo" />
            </div>
            <div class="divider"></div>
            <div class="bottom-section">
                <div class="company">Class Complements S.A.C</div>
                <div class="website">www.crepier.com</div>
            </div>
        `;

        container.appendChild(card);
    });
}

// Función para descargar la imagen de cada tarjeta
function downloadCards() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const nameElement = card.querySelector('.name');
        const fileName = formatFileName(nameElement.innerText); // Obtener el nombre formateado
        const index = card.getAttribute('data-index'); // Identificar tarjeta

        html2canvas(card, {
            width: 800,
            height: 300,
            scale: 1
        }).then(canvas => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/jpeg');
            link.download = `${fileName}.jpg`; // Usar el nombre dinámico
            link.click();
        }).catch(function(error) {
            console.error(`Error al capturar la tarjeta ${index}:`, error);
        });
    });
}

// Crear las tarjetas al cargar la página
createCards();

// Descargar todas las imágenes al hacer clic en el botón
document.getElementById('download-btn').addEventListener('click', downloadCards);