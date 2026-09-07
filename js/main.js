// ==========================================
// 1. BANCO DE DATOS: 2.400 PRODUCTOS PROCEDURALES
// ==========================================
const TECH_POOL = [
  { n: "MacBook Pro M3 Max 36GB", c: "Workstations", p: 1890000, img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80", v: "NexusTech Hub" },
  { n: "ThinkPad P1 Gen 6 RTX 4080", c: "Workstations", p: 1650000, img: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&q=80", v: "Valpo Tech Supply" },
  { n: "Dell Precision 5680 i9 64GB", c: "Workstations", p: 1780000, img: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&q=80", v: "NexusTech Hub" },
  { n: "GPU Nvidia RTX 4090 24GB OC", c: "Hardware", p: 1450000, img: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500&q=80", v: "MasterTech SpA" },
  { n: "Procesador Ryzen 9 7950X 16C", c: "Hardware", p: 480000, img: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=500&q=80", v: "Silicon Reñaca" },
  { n: "SSD NVMe M.2 4TB Gen4 7400MB/s", c: "Hardware", p: 260000, img: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&q=80", v: "Hardware Outlet" },
  { n: "Monitor OLED 34' Ultrawide 175Hz", c: "Periféricos", p: 720000, img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80", v: "NexusTech Hub" },
  { n: "Teclado Mecánico Custom PCB Lubed", c: "Periféricos", p: 115000, img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80", v: "Gran Royal Peripherals" },
  { n: "Mouse Inalámbrico 4K Polling Rate", c: "Periféricos", p: 65000, img: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&q=80", v: "Accesorios Viña" },
  { n: "Audífonos Reference DAC Studio", c: "Periféricos", p: 145000, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", v: "AudioTech Labs" },
  { n: "Integración Pasarela Webpay / API", c: "Soluciones", p: 100000, img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80", v: "MasterTech SpA" },
  { n: "Landing Page Conversión y SEO Local", c: "Soluciones", p: 40000, img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80", v: "MasterTech SpA" },
  { n: "Servidor Rack 1U Xeon 64GB ECC", c: "Hardware", p: 980000, img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=80", v: "Enterprise Systems" },
  { n: "Switch Gestionable 24 Puertos PoE", c: "Hardware", p: 210000, img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500&q=80", v: "Enterprise Systems" },
  { n: "Kit Memoria RAM DDR5 64GB RGB", c: "Hardware", p: 175000, img: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=500&q=80", v: "Silicon Reñaca" }
];

let productos = [];
for (let i = 1; i <= 2400; i++) {
  const base = TECH_POOL[(i - 1) % TECH_POOL.length];
  const delta = (i * 47) % 65000;
  productos.push({
    id: i,
    nombre: `${base.n} (Lote #${10000 + i})`,
    categoria: base.c,
    precio: base.p + delta,
    imagen: base.img,
    descripcion: `Solución técnica certificada para despliegue productivo y alto rendimiento. Testeada en laboratorio local.`,
    vendedor: base.v,
    contacto: "contacto@mastertechg.com"
  });
}

// RESEÑAS REALISTAS
const RESEÑAS_POOL = [
  { usuario: "Camila Rojas", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80", rating: 5, texto: "Llegó al día siguiente a Viña del Mar. Excelente empaque térmico, rinde perfecto en renders." },
  { usuario: "Matías Soto", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80", rating: 4, texto: "Muy buen producto. Cumple con la frecuencia prometida, aunque los ventiladores son algo ruidosos al 100%." },
  { usuario: "Ignacio Vera", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80", rating: 5, texto: "Garantía validada directamente con MasterTech. Muy superior al soporte tradicional." },
  { usuario: "Sofía Morales", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80", rating: 3, texto: "El rendimiento es bueno pero el manual venía solo en inglés. Tuve que pedir asistencia técnica." }
];

// ESTADOS
let paginaActual = 1;
const ITEMS_POR_PAGINA = 24;
let carrito = [];
let favoritos = new Set();
let prodSeleccionado = null;

// ELEMENTOS DOM
const grillaProductos = document.getElementById("grillaProductos");
const contadorProductos = document.getElementById("contadorProductos");
const inputBuscar = document.getElementById("inputBuscar");
const selectCategoria = document.getElementById("selectCategoria");
const rangePrecio = document.getElementById("rangePrecio");
const labelPrecioMax = document.getElementById("labelPrecioMax");
const btnLimpiarFiltros = document.getElementById("btnLimpiarFiltros");
const listaCarrito = document.getElementById("listaCarrito");
const totalCarrito = document.getElementById("totalCarrito");
const badgeCarrito = document.getElementById("badgeCarrito");
const badgeFavoritos = document.getElementById("badgeFavoritos");
const paginadorBotones = document.getElementById("paginadorBotones");
const paginadorInferior = document.getElementById("paginadorInferior");
const contenedorAlertas = document.getElementById("contenedorAlertas");
const cartToast = document.getElementById("cartToast");
const toastMsg = document.getElementById("toastMsg");
const toastSub = document.getElementById("toastSub");

const contenedorAuthNav = document.getElementById("contenedorAuthNav");
const formRegistro = document.getElementById("formRegistro");
const formLogin = document.getElementById("formLogin");

const modalDetalle = new bootstrap.Modal(document.getElementById("modalDetalle"));
const modalCheckout = new bootstrap.Modal(document.getElementById("modalCheckout"));
const modalAuth = new bootstrap.Modal(document.getElementById("modalAuth"));
const modalPerfil = new bootstrap.Modal(document.getElementById("modalPerfil"));
const offcanvasCarrito = new bootstrap.Offcanvas(document.getElementById("offcanvasCarrito"));

function formatearPrecio(n) {
  return new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(n);
}

function filtrarProductos() {
  const q = inputBuscar.value.toLowerCase().trim();
  const c = selectCategoria.value;
  const maxP = parseInt(rangePrecio.value, 10);

  return productos.filter(p => {
    const matchNom = p.nombre.toLowerCase().includes(q) || p.descripcion.toLowerCase().includes(q);
    const matchCat = (c === "todas") || (p.categoria === c);
    const matchP = p.precio <= maxP;
    return matchNom && matchCat && matchP;
  });
}

function renderizarCatalogo() {
  const filtrados = filtrarProductos();
  const totalPaginas = Math.ceil(filtrados.length / ITEMS_POR_PAGINA) || 1;
  if (paginaActual > totalPaginas) paginaActual = 1;

  const inicio = (paginaActual - 1) * ITEMS_POR_PAGINA;
  const lote = filtrados.slice(inicio, inicio + ITEMS_POR_PAGINA);

  contadorProductos.textContent = `Mostrando ${lote.length} de ${filtrados.length} productos (Página ${paginaActual} de ${totalPaginas})`;

  if (lote.length === 0) {
    grillaProductos.innerHTML = `<div class="col-12 py-5 text-center text-light">No hay existencias con esos parámetros.</div>`;
    paginadorBotones.innerHTML = "";
    paginadorInferior.innerHTML = "";
    return;
  }

  grillaProductos.innerHTML = lote.map(p => `
    <div class="col">
      <div class="card card-shop h-100 shadow-sm">
        <div class="card-shop-img-wrapper">
          <img src="${p.imagen}" class="card-shop-img" alt="${p.nombre}" loading="lazy">
          <span class="position-absolute top-0 start-0 m-2 badge badge-stock">DISPONIBLE</span>
        </div>
        <div class="card-body d-flex flex-column p-3">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <span class="badge bg-dark border border-secondary text-info small">${p.categoria}</span>
            <button class="btn btn-sm p-0 border-0 ${favoritos.has(p.id) ? 'text-danger' : 'text-secondary'}" onclick="toggleFavorito(${p.id})">
              <i class="bi ${favoritos.has(p.id) ? 'bi-heart-fill' : 'bi-heart'}"></i>
            </button>
          </div>
          <h6 class="card-title fw-bold text-truncate text-white mb-1" style="cursor: pointer;" onclick="verDetalle(${p.id})">${p.nombre}</h6>
          <p class="small text-muted-custom mb-2 text-truncate">${p.vendedor}</p>
          <div class="mt-auto pt-2 border-top border-secondary d-flex justify-content-between align-items-center">
            <span class="fw-bold text-info">${formatearPrecio(p.precio)}</span>
            <div class="btn-group">
              <button class="btn btn-sm btn-outline-secondary" onclick="verDetalle(${p.id})" title="Detalle"><i class="bi bi-eye"></i></button>
              <button class="btn btn-sm btn-cyan" onclick="agregarAlCarritoRapido(${p.id})" title="Añadir"><i class="bi bi-cart-plus"></i></button>
              <button class="btn btn-sm btn-outline-danger" onclick="eliminarProducto(${p.id})" title="Eliminar"><i class="bi bi-trash"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join("");

  renderizarPaginadores(totalPaginas);
}

function renderizarPaginadores(total) {
  const html = `
    <button class="btn btn-outline-secondary btn-sm" ${paginaActual === 1 ? 'disabled' : ''} onclick="cambiarPagina(${paginaActual - 1})">Prev</button>
    <button class="btn btn-dark btn-sm text-info disabled border-secondary">${paginaActual} / ${total}</button>
    <button class="btn btn-outline-secondary btn-sm" ${paginaActual === total ? 'disabled' : ''} onclick="cambiarPagina(${paginaActual + 1})">Sig</button>
  `;
  paginadorBotones.innerHTML = html;
  paginadorInferior.innerHTML = html;
}

function cambiarPagina(nueva) {
  paginaActual = nueva;
  renderizarCatalogo();
  window.scrollTo({ top: 180, behavior: 'smooth' });
}

// TOAST FLOTANTE INFERIOR
function mostrarToastCarrito(nombreProd, cantidad) {
  toastMsg.textContent = `${cantidad}x "${nombreProd}" agregado(s)`;
  const totalItems = carrito.reduce((a, b) => a + b.cantidad, 0);
  toastSub.textContent = `Carro activo: ${totalItems} ítem(s)`;
  cartToast.style.display = "flex";
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    cartToast.style.display = "none";
  }, 4500);
}

function agregarAlCarritoRapido(id) {
  const p = productos.find(x => x.id === id);
  if (!p) return;
  const item = carrito.find(x => x.id === id);
  if (item) item.cantidad += 1;
  else carrito.push({ ...p, cantidad: 1, color: "Gris Espacial" });
  actualizarCarrito();
  mostrarToastCarrito(p.nombre, 1);
}

function agregarAlCarritoCompleto(id, cant, color) {
  const p = productos.find(x => x.id === id);
  if (!p) return;
  const item = carrito.find(x => x.id === id && x.color === color);
  if (item) item.cantidad += cant;
  else carrito.push({ ...p, cantidad: cant, color: color });
  actualizarCarrito();
  mostrarToastCarrito(p.nombre, cant);
}

function eliminarDelCarrito(id, color) {
  carrito = carrito.filter(x => !(x.id === id && x.color === color));
  actualizarCarrito();
}

function actualizarCarrito() {
  const totalItems = carrito.reduce((a, b) => a + b.cantidad, 0);
  const monto = carrito.reduce((a, b) => a + (b.precio * b.cantidad), 0);
  badgeCarrito.textContent = totalItems;
  totalCarrito.textContent = formatearPrecio(monto);
  document.getElementById("checkoutTotalMonto").textContent = formatearPrecio(monto);

  if (carrito.length === 0) {
    listaCarrito.innerHTML = `<p class="text-center text-muted-custom my-4">No hay ítems en la orden.</p>`;
    return;
  }

  listaCarrito.innerHTML = carrito.map(item => `
    <div class="d-flex justify-content-between align-items-center p-2 mb-2 bg-dark rounded border border-secondary">
      <div>
        <div class="small fw-bold text-white text-truncate" style="max-width: 170px;">${item.nombre}</div>
        <div class="small text-info">${item.cantidad} x ${formatearPrecio(item.precio)} <span class="badge bg-secondary ms-1">${item.color}</span></div>
      </div>
      <button class="btn btn-sm text-danger border-0" onclick="eliminarDelCarrito(${item.id}, '${item.color}')">
        <i class="bi bi-x-circle-fill"></i>
      </button>
    </div>
  `).join("");
}

function toggleFavorito(id) {
  if (favoritos.has(id)) favoritos.delete(id);
  else favoritos.add(id);
  badgeFavoritos.textContent = favoritos.size;
  renderizarCatalogo();
}

function eliminarProducto(id) {
  if (confirm("¿Confirmas la remoción técnica de esta publicación?")) {
    productos = productos.filter(p => p.id !== id);
    carrito = carrito.filter(x => x.id !== id);
    favoritos.delete(id);
    badgeFavoritos.textContent = favoritos.size;
    actualizarCarrito();
    renderizarCatalogo();
  }
}

// MODAL DETALLE CON RESEÑAS REALISTAS
function verDetalle(id) {
  const prod = productos.find(p => p.id === id);
  if (!prod) return;
  prodSeleccionado = prod;

  document.getElementById("modalDetalleTitulo").textContent = prod.nombre;
  document.getElementById("modalDetalleImg").src = prod.imagen;
  document.getElementById("modalDetalleDesc").textContent = prod.descripcion;
  document.getElementById("modalDetalleCat").textContent = prod.categoria;
  document.getElementById("modalDetallePrecio").textContent = formatearPrecio(prod.precio);
  document.getElementById("modalDetalleVendedor").textContent = prod.vendedor;
  document.getElementById("modalDetalleContacto").textContent = `Contacto: ${prod.contacto}`;

  const reseñasHtml = RESEÑAS_POOL.map(r => `
    <div class="p-2 rounded bg-dark border border-secondary">
      <div class="d-flex align-items-center justify-content-between mb-1">
        <div class="d-flex align-items-center gap-2">
          <img src="${r.avatar}" class="review-avatar" alt="${r.usuario}">
          <span class="small fw-bold text-white">${r.usuario}</span>
        </div>
        <div class="text-warning small">${'<i class="bi bi-star-fill"></i>'.repeat(r.rating)}</div>
      </div>
      <p class="small text-muted-custom mb-0">${r.texto}</p>
    </div>
  `).join("");
  document.getElementById("contenedorReseñas").innerHTML = reseñasHtml;

  modalDetalle.show();
}

document.getElementById("btnModalAddCart").addEventListener("click", () => {
  if (!prodSeleccionado) return;
  const cant = parseInt(document.getElementById("modalSelectCantidad").value, 10);
  const color = document.getElementById("modalSelectColor").value;
  agregarAlCarritoCompleto(prodSeleccionado.id, cant, color);
  modalDetalle.hide();
});

document.getElementById("btnModalBuyNow").addEventListener("click", () => {
  if (!prodSeleccionado) return;
  const cant = parseInt(document.getElementById("modalSelectCantidad").value, 10);
  const color = document.getElementById("modalSelectColor").value;
  agregarAlCarritoCompleto(prodSeleccionado.id, cant, color);
  modalDetalle.hide();
  modalCheckout.show();
});

// CHECKOUT FORMULARIO
document.getElementById("formCheckout").addEventListener("submit", (e) => {
  e.preventDefault();
  if (carrito.length === 0) return alert("El carrito está vacío.");

  const trackCode = "TRK-" + Math.floor(100000 + Math.random() * 900000);
  modalCheckout.hide();
  
  alert(`¡PAGO PROCESADO EXITOSAMENTE!\n\nSe ha emitido tu comprobante digital y se envió el detalle a tu correo asociado.\nCódigo de Seguimiento: ${trackCode}\nProveedor: MasterTech SpA / Campus UNAB`);

  carrito = [];
  actualizarCarrito();
});

// MODAL PUBLICAR
document.getElementById("formNuevoProducto").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.target;
  if (!f.checkValidity()) {
    e.stopPropagation();
    f.classList.add("was-validated");
    return;
  }

  const nuevo = {
    id: Date.now(),
    nombre: document.getElementById("formNombre").value.trim(),
    categoria: document.getElementById("formCategoria").value,
    precio: parseInt(document.getElementById("formPrecio").value, 10),
    imagen: document.getElementById("formImg").value.trim() || "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80",
    descripcion: document.getElementById("formDesc").value.trim(),
    vendedor: document.getElementById("formVendedor").value.trim(),
    contacto: "contacto@mastertechg.com"
  };

  productos.unshift(nuevo);
  f.reset();
  f.classList.remove("was-validated");
  bootstrap.Modal.getInstance(document.getElementById("modalNuevoProducto")).hide();
  paginaActual = 1;
  renderizarCatalogo();
});

// AUTENTICACIÓN LOCALSTORAGE
function obtenerUsuarioActivo() {
  const u = localStorage.getItem("nexustech_user");
  return u ? JSON.parse(u) : null;
}

function actualizarEstadoAuth() {
  const user = obtenerUsuarioActivo();
  if (user) {
    const inicial = user.usuario.charAt(0).toUpperCase();
    contenedorAuthNav.innerHTML = `
      <div class="d-flex align-items-center gap-2" onclick="abrirPerfil()" style="cursor: pointer;">
        <div class="rounded-circle bg-info text-dark d-flex align-items-center justify-content-center fw-bold shadow-sm" style="width: 34px; height: 34px;">
          ${inicial}
        </div>
        <span class="small fw-bold text-white d-none d-md-inline">${user.usuario}</span>
      </div>
    `;
  } else {
    contenedorAuthNav.innerHTML = `
      <button class="btn btn-sm btn-outline-light d-flex align-items-center gap-1" data-bs-toggle="modal" data-bs-target="#modalAuth">
        <i class="bi bi-person-circle"></i> <span>Ingresar</span>
      </button>
    `;
  }
}

function abrirPerfil() {
  const user = obtenerUsuarioActivo();
  if (!user) return;
  document.getElementById("perfilAvatarCirculo").textContent = user.usuario.charAt(0).toUpperCase();
  document.getElementById("perfilNombreUsuario").textContent = user.usuario;
  document.getElementById("perfilEmail").textContent = user.email;
  modalPerfil.show();
}

formRegistro.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!formRegistro.checkValidity()) {
    e.stopPropagation();
    formRegistro.classList.add("was-validated");
    return;
  }
  const usuario = document.getElementById("regUsuario").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value;

  const nuevoUsuario = { usuario, email, password };
  localStorage.setItem("nexustech_user", JSON.stringify(nuevoUsuario));
  formRegistro.reset();
  formRegistro.classList.remove("was-validated");
  modalAuth.hide();
  actualizarEstadoAuth();
  mostrarToastCarrito(`¡Bienvenido, ${usuario}! Cuenta creada e iniciada.`, 1);
});

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  const usuario = document.getElementById("loginUsuario").value.trim();
  if (!usuario) return alert("Por favor ingresa tu usuario.");

  const usuarioGuardado = obtenerUsuarioActivo() || { usuario, email: `${usuario}@nexusmail.cl` };
  usuarioGuardado.usuario = usuario;
  localStorage.setItem("nexustech_user", JSON.stringify(usuarioGuardado));
  formLogin.reset();
  modalAuth.hide();
  actualizarEstadoAuth();
  mostrarToastCarrito(`Sesión iniciada como ${usuario}.`, 1);
});

document.getElementById("btnCerrarSesion").addEventListener("click", () => {
  localStorage.removeItem("nexustech_user");
  modalPerfil.hide();
  actualizarEstadoAuth();
  mostrarToastCarrito("Has cerrado sesión correctamente.", 0);
});

// FILTROS
inputBuscar.addEventListener("input", () => { paginaActual = 1; renderizarCatalogo(); });
selectCategoria.addEventListener("change", () => { paginaActual = 1; renderizarCatalogo(); });
rangePrecio.addEventListener("input", (e) => {
  labelPrecioMax.textContent = formatearPrecio(e.target.value);
  paginaActual = 1;
  renderizarCatalogo();
});
btnLimpiarFiltros.addEventListener("click", () => {
  inputBuscar.value = "";
  selectCategoria.value = "todas";
  rangePrecio.value = 2500000;
  labelPrecioMax.textContent = formatearPrecio(2500000);
  paginaActual = 1;
  renderizarCatalogo();
});

document.addEventListener("DOMContentLoaded", () => {
  renderizarCatalogo();
  actualizarCarrito();
  actualizarEstadoAuth();
});