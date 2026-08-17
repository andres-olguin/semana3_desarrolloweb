// js/main.js
const servicios = [
    {
        id: 1,
        titulo: "Mascotas",
        descripcion: "Administra las fichas clínicas y pacientes registrados.",
        enlace: "mascotas.html",
        badge: "Principal"
    },
    {
        id: 2,
        titulo: "Consultas",
        descripcion: "Gestiona los controles médicos y atenciones veterinarias.",
        enlace: "#",
        badge: "Frecuente"
    },
    {
        id: 3,
        titulo: "Vacunas",
        descripcion: "Consulta y actualiza el historial de vacunación preventivo.",
        enlace: "#",
        badge: "Preventivo"
    }
];

function renderizarCards() {
    const contenedor = document.getElementById("contenedor-servicios");
    if (!contenedor) return;

    contenedor.innerHTML = servicios.map(item => `
        <div class="col-12 col-md-6 col-lg-4">
            <article class="card h-100 border-0 shadow-sm">
                <div class="card-body d-flex flex-column p-4">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <h2 class="card-title h5 fw-bold text-dark mb-0">${item.titulo}</h2>
                        <span class="badge bg-primary-subtle text-primary">${item.badge}</span>
                    </div>
                    <p class="card-text text-secondary flex-grow-1">${item.descripcion}</p>
                    <a href="${item.enlace}" class="btn btn-primary w-100">Ver ${item.titulo.toLowerCase()}</a>
                </div>
            </article>
        </div>
    `).join("");
}

document.addEventListener("DOMContentLoaded", renderizarCards);