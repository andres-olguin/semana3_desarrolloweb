// Base de datos reactiva en LocalStorage
const MASCOTAS_DEFECTO = [
    { id: 1, nombre: "Firulais", especie: "Perro", edad: 5, estado: "Activo", contacto: "+56 9 1234 5678" },
    { id: 2, nombre: "Michi", especie: "Gato", edad: 3, estado: "Activo", contacto: "+56 9 8765 4321" },
    { id: 3, nombre: "Rocky", especie: "Perro", edad: 8, estado: "En tratamiento", contacto: "+56 9 1122 3344" },
    { id: 4, nombre: "Luna", especie: "Otro", edad: 2, estado: "Activo", contacto: "+56 9 5566 7788" }
];

function obtenerMascotas() {
    const raw = localStorage.getItem("vet_mascotas_db");
    if (!raw) {
        localStorage.setItem("vet_mascotas_db", JSON.stringify(MASCOTAS_DEFECTO));
        return MASCOTAS_DEFECTO;
    }
    return JSON.parse(raw);
}

function guardarMascota(mascota) {
    const lista = obtenerMascotas();
    mascota.id = Date.now();
    lista.unshift(mascota);
    localStorage.setItem("vet_mascotas_db", JSON.stringify(lista));
}

function eliminarMascota(id) {
    const lista = obtenerMascotas().filter(m => m.id !== id);
    localStorage.setItem("vet_mascotas_db", JSON.stringify(lista));
    renderizarTablaMascotas();
    actualizarContador();
}

function actualizarContador() {
    const badgeContador = document.getElementById("contadorMascotas");
    if (badgeContador) {
        badgeContador.textContent = obtenerMascotas().length;
    }
}

// Renderizado de tabla con filtros y búsqueda
function renderizarTablaMascotas() {
    const tbody = document.getElementById("tablaMascotasBody");
    if (!tbody) return;

    const query = document.getElementById("inputBuscar") ? document.getElementById("inputBuscar").value.toLowerCase() : "";
    const filtroEspecie = document.getElementById("filtroEspecie") ? document.getElementById("filtroEspecie").value : "Todos";

    let datos = obtenerMascotas();

    if (filtroEspecie !== "Todos") {
        datos = datos.filter(m => m.especie === filtroEspecie);
    }

    if (query.trim() !== "") {
        datos = datos.filter(m => 
            m.nombre.toLowerCase().includes(query) || 
            m.especie.toLowerCase().includes(query)
        );
    }

    tbody.innerHTML = "";

    if (datos.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center py-4 text-muted">
                    No se encontraron registros de mascotas.
                </td>
            </tr>
        `;
        return;
    }

    datos.forEach(m => {
        const badgeColor = m.estado === "Activo" ? "bg-success" : "bg-warning text-dark";
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="fw-bold text-dark">${m.nombre}</td>
            <td>${m.especie}</td>
            <td>${m.edad} año(s)</td>
            <td><span class="badge ${badgeColor}">${m.estado}</span></td>
            <td class="text-end">
                <button class="btn btn-sm btn-outline-danger" onclick="eliminarMascota(${m.id})">
                    Eliminar
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Inicialización de eventos al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    actualizarContador();
    renderizarTablaMascotas();

    // Eventos de búsqueda y filtro
    const inputBuscar = document.getElementById("inputBuscar");
    if (inputBuscar) {
        inputBuscar.addEventListener("input", renderizarTablaMascotas);
    }

    const filtroEspecie = document.getElementById("filtroEspecie");
    if (filtroEspecie) {
        filtroEspecie.addEventListener("change", renderizarTablaMascotas);
    }

    // Modal de registro de mascota
    const formNuevaMascota = document.getElementById("formNuevaMascota");
    if (formNuevaMascota) {
        formNuevaMascota.addEventListener("submit", (e) => {
            e.preventDefault();
            if (!formNuevaMascota.checkValidity()) {
                e.stopPropagation();
                formNuevaMascota.classList.add("was-validated");
                return;
            }

            const nombre = document.getElementById("nombreMascota").value.trim();
            const especie = document.getElementById("especieMascota").value;
            const edad = parseInt(document.getElementById("edadMascota").value.trim(), 10);
            const estado = document.getElementById("estadoMascota").value;

            guardarMascota({ nombre, especie, edad, estado });
            formNuevaMascota.reset();
            formNuevaMascota.classList.remove("was-validated");

            // Cerrar modal
            const modalEl = document.getElementById("modalMascota");
            const modalObj = bootstrap.Modal.getInstance(modalEl);
            if (modalObj) modalObj.hide();

            // Alerta de confirmación
            const alerta = document.getElementById("alertaExito");
            if (alerta) {
                alerta.classList.remove("d-none");
                setTimeout(() => alerta.classList.add("d-none"), 4000);
            }

            actualizarContador();
            renderizarTablaMascotas();
        });
    }

    // Validación general de formularios Bootstrap
    const formularios = document.querySelectorAll(".needs-validation");
    Array.from(formularios).forEach(form => {
        form.addEventListener("submit", event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add("was-validated");
        }, false);
    });
});