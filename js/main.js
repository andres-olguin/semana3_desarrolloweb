// Base de datos y estado reactivo
const DB_INICIAL = {
    mascotas: [
        { id: 1, nombre: "Firulais", especie: "Perro", edad: 5, estado: "Activo", tutor: "Juan Pérez", telefono: "+56 9 1234 5678" },
        { id: 2, nombre: "Michi", especie: "Gato", edad: 3, estado: "Activo", tutor: "María Silva", telefono: "+56 9 8765 4321" },
        { id: 3, nombre: "Rocky", especie: "Perro", edad: 8, estado: "En tratamiento", tutor: "Carlos Soto", telefono: "+56 9 1122 3344" },
        { id: 4, nombre: "Luna", especie: "Otro", edad: 2, estado: "Activo", tutor: "Ana Muñoz", telefono: "+56 9 5566 7788" }
    ],
    consultas: [
        { id: 1, mascota: "Firulais", fecha: "2026-08-20", motivo: "Control general y desparasitación", veterinario: "Dra. González", estado: "Confirmada" },
        { id: 2, mascota: "Rocky", fecha: "2026-08-22", motivo: "Revisión postoperatoria", veterinario: "Dr. Martínez", estado: "Pendiente" }
    ],
    vacunas: [
        { id: 1, mascota: "Firulais", vacuna: "Antirrábica", fechaAplicacion: "2026-01-15", proximaDosis: "2027-01-15", estado: "Al día" },
        { id: 2, mascota: "Michi", vacuna: "Triple Felina", fechaAplicacion: "2026-03-10", proximaDosis: "2027-03-10", estado: "Al día" },
        { id: 3, mascota: "Rocky", vacuna: "Séxtuple", fechaAplicacion: "2025-06-01", proximaDosis: "2026-06-01", estado: "Vencida" }
    ]
};

// Acceso a datos
function getStorage(key, fallback) {
    const data = localStorage.getItem(key);
    if (!data) {
        localStorage.setItem(key, JSON.stringify(fallback));
        return fallback;
    }
    return JSON.parse(data);
}

function getMascotas() { return getStorage("vet_mascotas", DB_INICIAL.mascotas); }
function setMascotas(data) { localStorage.setItem("vet_mascotas", JSON.stringify(data)); }

function getConsultas() { return getStorage("vet_consultas", DB_INICIAL.consultas); }
function setConsultas(data) { localStorage.setItem("vet_consultas", JSON.stringify(data)); }

function getVacunas() { return getStorage("vet_vacunas", DB_INICIAL.vacunas); }
function setVacunas(data) { localStorage.setItem("vet_vacunas", JSON.stringify(data)); }

// Sistema de Notificaciones Toast de Bootstrap
function mostrarToast(titulo, mensaje, tipo = "primary") {
    const contenedor = document.getElementById("toastContainer");
    if (!contenedor) return;

    const toastId = "toast_" + Date.now();
    const bgClass = tipo === "danger" ? "bg-danger text-white" : tipo === "success" ? "bg-success text-white" : "bg-primary text-white";

    const toastHtml = `
        <div id="${toastId}" class="toast align-items-center ${bgClass} border-0 shadow" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    <strong>${titulo}:</strong> ${mensaje}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
    contenedor.insertAdjacentHTML("beforeend", toastHtml);
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement, { delay: 3500 });
    toast.show();
    toastElement.addEventListener("hidden.bs.toast", () => toastElement.remove());
}

// Modo Oscuro / Claro
function setupThemeToggle() {
    const btn = document.getElementById("btnThemeToggle");
    const currentTheme = localStorage.getItem("vet_theme") || "light";
    document.documentElement.setAttribute("data-bs-theme", currentTheme);
    if (btn) btn.textContent = currentTheme === "dark" ? "☀️ Modo Claro" : "🌙 Modo Oscuro";

    if (btn) {
        btn.addEventListener("click", () => {
            const nextTheme = document.documentElement.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
            document.documentElement.setAttribute("data-bs-theme", nextTheme);
            localStorage.setItem("vet_theme", nextTheme);
            btn.textContent = nextTheme === "dark" ? "☀️ Modo Claro" : "🌙 Modo Oscuro";
        });
    }
}

// Manejo de Sesión de Usuario
function setupAuthStatus() {
    const user = sessionStorage.getItem("vet_user");
    const container = document.getElementById("navAuthContainer");
    if (!container) return;

    if (user) {
        container.innerHTML = `
            <div class="dropdown">
                <button class="btn btn-sm btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    👤 ${user}
                </button>
                <ul class="dropdown-menu dropdown-menu-end shadow">
                    <li><h6 class="dropdown-header">Usuario Conectado</h6></li>
                    <li><a class="dropdown-item" href="#" onclick="logoutUser()">Cerrar Sesión</a></li>
                </ul>
            </div>
        `;
    } else {
        container.innerHTML = `<a class="btn btn-sm btn-unab-primary px-3 w-100" href="login.html">Iniciar Sesión</a>`;
    }
}

function logoutUser() {
    sessionStorage.removeItem("vet_user");
    mostrarToast("Sesión", "Has cerrado tu sesión correctamente.", "primary");
    setTimeout(() => window.location.reload(), 800);
}

// Estadísticas Dashboard en Inicio
function renderizarDashboard() {
    const statMascotas = document.getElementById("statTotalMascotas");
    const statConsultas = document.getElementById("statTotalConsultas");
    const statVacunas = document.getElementById("statTotalVacunas");
    const statActivos = document.getElementById("statTasaActivos");

    const mascotas = getMascotas();
    const consultas = getConsultas();
    const vacunas = getVacunas();

    if (statMascotas) statMascotas.textContent = mascotas.length;
    if (statConsultas) statConsultas.textContent = consultas.length;
    if (statVacunas) statVacunas.textContent = vacunas.length;
    if (statActivos) {
        const activas = mascotas.filter(m => m.estado === "Activo").length;
        const pct = mascotas.length > 0 ? Math.round((activas / mascotas.length) * 100) : 0;
        statActivos.textContent = `${pct}%`;
    }

    const contadorNav = document.getElementById("contadorMascotas");
    if (contadorNav) contadorNav.textContent = mascotas.length;
}

// Renderizado y Gestión de Mascotas
function renderizarTablaMascotas() {
    const tbody = document.getElementById("tablaMascotasBody");
    if (!tbody) return;

    const query = document.getElementById("inputBuscar") ? document.getElementById("inputBuscar").value.toLowerCase() : "";
    const filtroEspecie = document.getElementById("filtroEspecie") ? document.getElementById("filtroEspecie").value : "Todos";

    let datos = getMascotas();

    if (filtroEspecie !== "Todos") {
        datos = datos.filter(m => m.especie === filtroEspecie);
    }

    if (query.trim() !== "") {
        datos = datos.filter(m => 
            m.nombre.toLowerCase().includes(query) || 
            m.especie.toLowerCase().includes(query) || 
            (m.tutor && m.tutor.toLowerCase().includes(query))
        );
    }

    tbody.innerHTML = "";

    if (datos.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">No se encontraron mascotas en los registros.</td></tr>`;
        return;
    }

    datos.forEach(m => {
        const badgeColor = m.estado === "Activo" ? "bg-success" : "bg-warning text-dark";
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="fw-bold text-primary">${m.nombre}</td>
            <td>${m.especie}</td>
            <td>${m.edad} año(s)</td>
            <td>${m.tutor || 'No asignado'} <small class="d-block text-muted">${m.telefono || ''}</small></td>
            <td><span class="badge ${badgeColor}">${m.estado}</span></td>
            <td class="text-end">
                <button class="btn btn-sm btn-outline-danger" onclick="eliminarMascota(${m.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    renderizarDashboard();
}

function eliminarMascota(id) {
    const lista = getMascotas().filter(m => m.id !== id);
    setMascotas(lista);
    renderizarTablaMascotas();
    mostrarToast("Eliminado", "La mascota ha sido removida del registro.", "danger");
}

// Exportar Datos a JSON
function exportarMascotasJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(getMascotas(), null, 2));
    const a = document.createElement("a");
    a.setAttribute("href", dataStr);
    a.setAttribute("download", "mascotas_vetconnect.json");
    document.body.appendChild(a);
    a.click();
    a.remove();
    mostrarToast("Exportación", "Archivo JSON generado exitosamente.", "success");
}

// Exportar Datos a CSV (Excel)
function exportarMascotasCSV() {
    const data = getMascotas();
    let csv = "ID,Nombre,Especie,Edad,Tutor,Telefono,Estado\n";
    data.forEach(m => {
        csv += `"${m.id}","${m.nombre}","${m.especie}","${m.edad}","${m.tutor || ''}","${m.telefono || ''}","${m.estado}"\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "mascotas_vetconnect.csv");
    document.body.appendChild(a);
    a.click();
    a.remove();
    mostrarToast("Exportación", "Archivo CSV descargado con éxito.", "success");
}

// Renderizar Consultas
function renderizarTablaConsultas() {
    const tbody = document.getElementById("tablaConsultasBody");
    if (!tbody) return;

    const datos = getConsultas();
    tbody.innerHTML = "";

    if (datos.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-muted">No hay consultas agendadas.</td></tr>`;
        return;
    }

    datos.forEach(c => {
        const badgeClass = c.estado === "Confirmada" ? "bg-success" : "bg-secondary";
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="fw-bold">${c.mascota}</td>
            <td>${c.fecha}</td>
            <td>${c.motivo}</td>
            <td>${c.veterinario}</td>
            <td><span class="badge ${badgeClass}">${c.estado}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

// Renderizar Vacunas
function renderizarTablaVacunas() {
    const tbody = document.getElementById("tablaVacunasBody");
    if (!tbody) return;

    const datos = getVacunas();
    tbody.innerHTML = "";

    if (datos.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-muted">No hay vacunas registradas.</td></tr>`;
        return;
    }

    datos.forEach(v => {
        const badgeClass = v.estado === "Al día" ? "bg-success" : "bg-danger";
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="fw-bold">${v.mascota}</td>
            <td>${v.vacuna}</td>
            <td>${v.fechaAplicacion}</td>
            <td>${v.proximaDosis}</td>
            <td><span class="badge ${badgeClass}">${v.estado}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

// Inicialización de Listeners y Formularios
document.addEventListener("DOMContentLoaded", () => {
    setupThemeToggle();
    setupAuthStatus();
    renderizarDashboard();
    renderizarTablaMascotas();
    renderizarTablaConsultas();
    renderizarTablaVacunas();

    // Actualizar Selects Dinámicos de Mascotas
    const selects = document.querySelectorAll(".select-mascota-dinamico");
    selects.forEach(sel => {
        sel.innerHTML = "";
        getMascotas().forEach(m => {
            const opt = document.createElement("option");
            opt.value = m.nombre;
            opt.textContent = `${m.nombre} (${m.especie})`;
            sel.appendChild(opt);
        });
    });

    // Formulario Registro de Mascota
    const formMascota = document.getElementById("formNuevaMascota");
    if (formMascota) {
        formMascota.addEventListener("submit", (e) => {
            e.preventDefault();
            if (!formMascota.checkValidity()) {
                e.stopPropagation();
                formMascota.classList.add("was-validated");
                return;
            }

            const nombre = document.getElementById("nombreMascota").value.trim();
            const especie = document.getElementById("especieMascota").value;
            const edad = parseInt(document.getElementById("edadMascota").value.trim(), 10);
            const tutor = document.getElementById("tutorMascota").value.trim();
            const telefono = document.getElementById("telefonoMascota") ? document.getElementById("telefonoMascota").value.trim() : "";
            const estado = document.getElementById("estadoMascota").value;

            const lista = getMascotas();
            lista.unshift({ id: Date.now(), nombre, especie, edad, tutor, telefono, estado });
            setMascotas(lista);

            formMascota.reset();
            formMascota.classList.remove("was-validated");

            const modalEl = document.getElementById("modalMascota");
            const modalObj = bootstrap.Modal.getInstance(modalEl);
            if (modalObj) modalObj.hide();

            mostrarToast("Registro Exitoso", `La mascota ${nombre} ha sido ingresada.`, "success");
            renderizarTablaMascotas();
            renderizarDashboard();
        });
    }

    // Formulario de Consulta
    const formConsulta = document.getElementById("formNuevaConsulta");
    if (formConsulta) {
        formConsulta.addEventListener("submit", (e) => {
            e.preventDefault();
            if (!formConsulta.checkValidity()) {
                e.stopPropagation();
                formConsulta.classList.add("was-validated");
                return;
            }

            const mascota = document.getElementById("consultaMascota").value;
            const fecha = document.getElementById("consultaFecha").value;
            const veterinario = document.getElementById("consultaVeterinario").value;
            const motivo = document.getElementById("consultaMotivo").value.trim();

            const lista = getConsultas();
            lista.unshift({ id: Date.now(), mascota, fecha, motivo, veterinario, estado: "Confirmada" });
            setConsultas(lista);

            formConsulta.reset();
            formConsulta.classList.remove("was-validated");

            const modalEl = document.getElementById("modalConsulta");
            const modalObj = bootstrap.Modal.getInstance(modalEl);
            if (modalObj) modalObj.hide();

            mostrarToast("Consulta Agendada", `Cita confirmada para ${mascota}.`, "success");
            renderizarTablaConsultas();
            renderizarDashboard();
        });
    }

    // Formulario de Vacunación
    const formVacuna = document.getElementById("formNuevaVacuna");
    if (formVacuna) {
        formVacuna.addEventListener("submit", (e) => {
            e.preventDefault();
            if (!formVacuna.checkValidity()) {
                e.stopPropagation();
                formVacuna.classList.add("was-validated");
                return;
            }

            const mascota = document.getElementById("vacunaMascota").value;
            const vacuna = document.getElementById("vacunaNombre").value.trim();
            const fechaAplicacion = document.getElementById("vacunaFecha").value;
            const proximaDosis = document.getElementById("vacunaProxima").value;

            const lista = getVacunas();
            lista.unshift({ id: Date.now(), mascota, vacuna, fechaAplicacion, proximaDosis, estado: "Al día" });
            setVacunas(lista);

            formVacuna.reset();
            formVacuna.classList.remove("was-validated");

            const modalEl = document.getElementById("modalVacuna");
            const modalObj = bootstrap.Modal.getInstance(modalEl);
            if (modalObj) modalObj.hide();

            mostrarToast("Dosis Registrada", `Vacuna ${vacuna} registrada para ${mascota}.`, "success");
            renderizarTablaVacunas();
            renderizarDashboard();
        });
    }

    // Formulario de Login
    const formLogin = document.getElementById("formLogin");
    if (formLogin) {
        formLogin.addEventListener("submit", (e) => {
            e.preventDefault();
            if (!formLogin.checkValidity()) {
                e.stopPropagation();
                formLogin.classList.add("was-validated");
                return;
            }

            const correo = document.getElementById("loginCorreo").value.trim();
            const user = correo.split("@")[0];
            sessionStorage.setItem("vet_user", user);
            window.location.href = "index.html";
        });
    }

    // Formulario de Contacto
    const formContacto = document.getElementById("formContacto");
    if (formContacto) {
        formContacto.addEventListener("submit", (e) => {
            e.preventDefault();
            if (!formContacto.checkValidity()) {
                e.stopPropagation();
                formContacto.classList.add("was-validated");
                return;
            }

            mostrarToast("Mensaje Enviado", "Hemos recibido tu consulta satisfactoriamente.", "success");
            formContacto.reset();
            formContacto.classList.remove("was-validated");
        });
    }

    // Búsqueda y Filtros reactivos
    const inputBuscar = document.getElementById("inputBuscar");
    if (inputBuscar) inputBuscar.addEventListener("input", renderizarTablaMascotas);

    const filtroEspecie = document.getElementById("filtroEspecie");
    if (filtroEspecie) filtroEspecie.addEventListener("change", renderizarTablaMascotas);
});