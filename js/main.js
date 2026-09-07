// ==========================================
// 1. BANCO DE DATOS BASE Y GENERADOR DE 1200 PRODUCTOS
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

// Generamos 1200 ítems procedurales
let productos = [];
for (let i = 1; i <= 1200; i++) {
  const base = TECH_POOL[(i - 1) % TECH_POOL.length];
  const delta = (i * 37) % 50000;
  productos.push({
    id: i,
    nombre: `${base.n} (SKU #${10000 + i})`,
    categoria: base.c,
    precio: base.p + delta,
    imagen: base.img,
    descripcion: `Ítem verificado bajo protocolo de control. Garantía de funcionamiento y soporte de integración incluido.`,
    vendedor: base.v,
    contacto: "contacto@mastertechg.com"
  });
}

// Control de paginación
let paginaActual = 1;
const ITEMS_POR_PAGINA = 24;

let carrito = [];
let favoritos = new Set();
let prodSeleccionado = null;

// DOM
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
const formNuevoProducto = document.getElementById("formNuevoProducto");

const modalDetalle = new bootstrap.Modal(document.getElementById("modalDetalle"));

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

  contadorProductos.textContent = `Mostrando ${lote.length} de ${filtrados.length} productos (Pág. ${paginaActual}/${totalPaginas})`;

  if (lote.length === 0) {
    grillaProductos.innerHTML = `<div class="col-12 py-5 text-center text-muted">No hay hardware disponible con esos parámetros.</div>`;
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
            <button class="btn btn-sm p-0 border-0 ${favoritos.has(p.id) ? 'text-danger' : 'text-muted'}" onclick="toggleFavorito(${p.id})">
              <i class="bi ${favoritos.has(p.id) ? 'bi-heart-fill' : 'bi-heart'}"></i>
            </button>
          </div>
          <h6 class="card-title fw-bold text-truncate text-light mb-1" style="cursor: pointer;" onclick="verDetalle(${p.id})">${p.nombre}</h6>
          <p class="small text-muted mb-2 text-truncate">${p.vendedor}</p>
          <div class="mt-auto pt-2 border-top border-secondary d-flex justify-content-between align-items-center">
            <span class="fw-bold text-info">${formatearPrecio(p.precio)}</span>
            <div class="btn-group">
              <button class="btn btn-sm btn-outline-secondary" onclick="verDetalle(${p.id})" title="Detalle"><i class="bi bi-eye"></i></button>
              <button class="btn btn-sm btn-cyan" onclick="agregarAlCarrito(${p.id})" title="Añadir"><i class="bi bi-cart-plus"></i></button>
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

function agregarAlCarrito(id) {
  const p = productos.find(x => x.id === id);
  if (!p) return;
  const item = carrito.find(x => x.id === id);
  if (item) item.cantidad++;
  else carrito.push({ ...p, cantidad: 1 });
  actualizarCarrito();
  mostrarAlerta(`"${p.nombre}" añadido a tu orden.`, "info");
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter(x => x.id !== id);
  actualizarCarrito();
}

function actualizarCarrito() {
  const totalItems = carrito.reduce((a, b) => a + b.cantidad, 0);
  const monto = carrito.reduce((a, b) => a + (b.precio * b.cantidad), 0);
  badgeCarrito.textContent = totalItems;
  totalCarrito.textContent = formatearPrecio(monto);

  if (carrito.length === 0) {
    listaCarrito.innerHTML = `<p class="text-center text-muted my-4">No hay ítems en la orden.</p>`;
    return;
  }

  listaCarrito.innerHTML = carrito.map(item => `
    <div class="d-flex justify-content-between align-items-center p-2 mb-2 bg-dark rounded border border-secondary">
      <div>
        <div class="small fw-bold text-light text-truncate" style="max-width: 170px;">${item.nombre}</div>
        <span class="small text-info">${item.cantidad} x ${formatearPrecio(item.precio)}</span>
      </div>
      <button class="btn btn-sm text-danger border-0" onclick="eliminarDelCarrito(${item.id})">
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
    eliminarDelCarrito(id);
    favoritos.delete(id);
    badgeFavoritos.textContent = favoritos.size;
    renderizarCatalogo();
    mostrarAlerta("Publicación dada de baja.", "warning");
  }
}

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

  modalDetalle.show();
}

document.getElementById("btnModalAddCart").addEventListener("click", () => {
  if (prodSeleccionado) {
    agregarAlCarrito(prodSeleccionado.id);
    modalDetalle.hide();
  }
});

formNuevoProducto.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!formNuevoProducto.checkValidity()) {
    e.stopPropagation();
    formNuevoProducto.classList.add("was-validated");
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
  formNuevoProducto.reset();
  formNuevoProducto.classList.remove("was-validated");

  bootstrap.Modal.getInstance(document.getElementById("modalNuevoProducto")).hide();
  paginaActual = 1;
  renderizarCatalogo();
  mostrarAlerta(`"${nuevo.nombre}" publicado en el catálogo activo.`, "success");
});

function mostrarAlerta(msg, tipo = "info") {
  contenedorAlertas.innerHTML = `
    <div class="alert alert-${tipo} alert-dismissible fade show bg-dark border border-${tipo} text-${tipo}" role="alert">
      ${msg}
      <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert"></button>
    </div>`;
}

document.getElementById("btnFinalizarCompra").addEventListener("click", () => {
  if (carrito.length === 0) return alert("Orden vacía.");
  alert("Orden procesada con éxito en el entorno de simulación.");
  carrito = [];
  actualizarCarrito();
  const off = bootstrap.Offcanvas.getInstance(document.getElementById("offcanvasCarrito"));
  if (off) off.hide();
});

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
  rangePrecio.value = 2000000;
  labelPrecioMax.textContent = formatearPrecio(2000000);
  paginaActual = 1;
  renderizarCatalogo();
});

document.addEventListener("DOMContentLoaded", () => {
  renderizarCatalogo();
  actualizarCarrito();
});