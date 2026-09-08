// =============================================================================
// NEXUSTECH STORE - CAMPUS HUB (PROBLEMÁTICA 4)
// MOTOR PROCEDURAL, CATÁLOGO, CARRITO, RESEÑAS Y PERSISTENCIA FRONTEND
// =============================================================================

// --- 1. MATRICES GENERADORAS PARA 2.400 PRODUCTOS ÚNICOS ---
const MARCAS_POOL = [
  "Lenovo ThinkPad", "Apple MacBook", "Dell Precision", "ASUS ROG", "MSI Creator",
  "HP ZBook", "Corsair Pro", "Logitech Master", "Kingston Fury", "Samsung EVO Pro",
  "Nvidia RTX Enterprise", "AMD Radeon Pro", "Western Digital Black", "Audio-Technica Labs", "Cisco Business"
];

const COMPONENTES_POOL = [
  { 
    cat: "Workstations", 
    tipo: "Laptop High-Performance", 
    specs: ["M3 Max 36GB Unificada 1TB SSD", "i9-14900HX 64GB DDR5 RTX 4080", "Ryzen 9 7945HX 32GB RAM 2TB NVMe", "Ultra 9 185H 32GB LPDDR5X OLED 4K", "Xeon W-2245 64GB ECC 1TB PCIe 4.0"],
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80", 
    baseP: 1450000 
  },
  { 
    cat: "Hardware", 
    tipo: "Placa Gráfica & GPU Pro", 
    specs: ["RTX 4090 24GB GDDR6X OC", "RX 7900 XTX 24GB Vapor-X", "RTX 4070 Ti Super 16GB Dual Fan", "Acelerador Tensor Core 16GB", "RTX 4080 Super 16GB Trinity"],
    img: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500&q=80", 
    baseP: 890000 
  },
  { 
    cat: "Hardware", 
    tipo: "Unidad de Almacenamiento NVMe", 
    specs: ["4TB Gen4 7400MB/s Heatsink", "2TB Gen5 10000MB/s Pro", "Kit 64GB DDR5 6000MHz CL30", "Ryzen 9 7950X 16 Cores 32 Threads", "Core i9 14900K Unlocked Box"],
    img: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&q=80", 
    baseP: 180000 
  },
  { 
    cat: "Periféricos", 
    tipo: "Dispositivo de Entrada y Audio", 
    specs: ["Audífonos Reference DAC Studio 80Ω", "Teclado Mecánico Gasket Mount RGB", "Monitor 34' OLED 175Hz 0.1ms", "Mouse Ergonómico 4K Polling Optical", "Microfono Cardioide USB-C 24bit"],
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", 
    baseP: 95000 
  },
  { 
    cat: "Hardware", 
    tipo: "Infraestructura & Servidor", 
    specs: ["Rack 1U Xeon Silver 64GB ECC", "Switch 24 Puertos Gigabit PoE+", "Router Gateway Dual WAN 10G", "Storage Array 8 Bahías RAID Hot-Swap", "Mini Cluster Proxmox 3 Nodos"],
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=80", 
    baseP: 650000 
  },
  { 
    cat: "Soluciones", 
    tipo: "Servicio e Implementación", 
    specs: ["Pasarela Webpay Plus API REST", "Pipeline CI/CD Docker Kubernetes", "Landing Page SEO Optimizada CoreWebVitals", "Microservicio Auth JWT en Node.js", "Auditoría de Vulnerabilidades Web OWASP"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80", 
    baseP: 80000 
  }
];

const VENDEDORES_POOL = ["NexusTech Hub", "Valpo Tech Supply", "MasterTech SpA", "Silicon Reñaca", "Gran Royal Labs", "Enterprise Systems"];

// --- 2. BANCO DE RESEÑAS PROCEDURALES POR CATEGORÍA ---
const COMENTARIOS_CONTEXTUALES = {
  "Workstations": [
    "Compila soluciones pesadas sin sobrecalentarse. La pantalla tiene una fidelidad de color espectacular.",
    "El rendimiento en máquinas virtuales y emuladores es instantáneo. Batería sólida.",
    "Excelente potencia térmica para proyectos universitarios de alto cómputo. Totalmente conforme.",
    "Llegó en caja sellada a campus Viña del Mar. Rinde sobre 120 FPS en pruebas de estrés."
  ],
  "Hardware": [
    "Temperaturas por debajo de 65°C en benchmark sostenido. Las frecuencias boost son estables.",
    "Tasa de lectura y escritura idéntica a la ficha de laboratorio. Cero cuellos de botella.",
    "Componente certificado y con serial verificado con MasterTech. Despacho rapidísimo.",
    "Gran eficiencia energética y disipación de calor silenciosa bajo carga pesada."
  ],
  "Periféricos": [
    "Respuesta táctil y acústica impecable. Se nota la diferencia de los 4.000 Hz de polling rate.",
    "El aislamiento pasivo y la definición en frecuencias medias y agudas es excelente.",
    "Ergonomía perfecta para jornadas largas de programación. Acabados de aluminio de gran nivel.",
    "Calibrado de fábrica muy preciso, plug and play inmediato en Linux y Windows."
  ],
  "Soluciones": [
    "Integración limpia y documentada. Cumplió con los estándares de entrega antes del plazo.",
    "Código legible con arquitectura modular. Las pruebas unitarias pasaron al 100%.",
    "Soporte directo y despliegue continuo sin caídas de servicio. Recomendado para la facultad.",
    "Excelente retorno de inversión y optimización en tiempos de respuesta API."
  ]
};

const USUARIOS_RESEÑAS = [
  { nombre: "Camila Rojas", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" },
  { nombre: "Matías Soto", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" },
  { nombre: "Ignacio Vera", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80" },
  { nombre: "Sofía Morales", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" },
  { nombre: "Diego Arancibia", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80" },
  { nombre: "Valentina Peña", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80" },
  { nombre: "Enrique Chamys", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&q=80" },
  { nombre: "Maximiliano Valdés", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&q=80" }
];

// --- 3. GENERACIÓN EN MEMORIA: 2.400 ÍTEMS DIVERSIFICADOS ---
let productos = [];
const TOTAL_PRODUCTOS = 2400;

for (let i = 1; i <= TOTAL_PRODUCTOS; i++) {
  const comp = COMPONENTES_POOL[(i - 1) % COMPONENTES_POOL.length];
  const marca = MARCAS_POOL[(i * 5) % MARCAS_POOL.length];
  const spec = comp.specs[(i * 3) % comp.specs.length];
  const vendedor = VENDEDORES_POOL[(i * 7) % VENDEDORES_POOL.length];
  
  // Delta matemático controlado para precios realistas
  const delta = ((i * 1337) % 450000);
  const precioFinal = comp.baseP + delta;
  const lote = 10000 + i;

  // Generación procedural de 2 reseñas específicas por cada producto
  const textosCat = COMENTARIOS_CONTEXTUALES[comp.cat] || COMENTARIOS_CONTEXTUALES["Hardware"];
  const u1 = USUARIOS_RESEÑAS[(i * 2) % USUARIOS_RESEÑAS.length];
  const u2 = USUARIOS_RESEÑAS[(i * 3 + 1) % USUARIOS_RESEÑAS.length];
  const t1 = textosCat[(i * 2) % textosCat.length];
  const t2 = textosCat[(i * 3 + 1) % textosCat.length];
  const rating1 = 4 + (i % 2);
  const rating2 = 5;

  productos.push({
    id: i,
    nombre: `${marca} ${comp.tipo} - ${spec} (Lote #${lote})`,
    categoria: comp.cat,
    precio: precioFinal,
    imagen: comp.img,
    descripcion: `Solución técnica de alta gama: ${spec}. Certificada por el laboratorio de hardware NexusTech para comunidad UNAB.`,
    vendedor: vendedor,
    contacto: "contacto@mastertechg.com",
    reseñas: [
      { usuario: u1.nombre, avatar: u1.avatar, rating: rating1, texto: t1 },
      { usuario: u2.nombre, avatar: u2.avatar, rating: rating2, texto: t2 }
    ]
  });
}

// --- 4. ESTADOS GLOBALES ---
let paginaActual = 1;
const ITEMS_POR_PAGINA = 24;
let carrito = [];
let favoritos = new Set();
let prodSeleccionado = null;

function formatearPrecio(n) {
  return new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(n);
}

// --- 5. FILTRADO REACTIVO MULTICRITERIO ---
function filtrarProductos() {
  const inputBuscar = document.getElementById("inputBuscar");
  const selectCategoria = document.getElementById("selectCategoria");
  const rangePrecio = document.getElementById("rangePrecio");

  const q = inputBuscar ? inputBuscar.value.toLowerCase().trim() : "";
  const c = selectCategoria ? selectCategoria.value : "todas";
  const maxP = rangePrecio ? parseInt(rangePrecio.value, 10) : 2500000;

  return productos.filter(p => {
    const matchNom = p.nombre.toLowerCase().includes(q) || p.descripcion.toLowerCase().includes(q) || p.vendedor.toLowerCase().includes(q);
    const matchCat = (c === "todas") || (p.categoria === c);
    const matchP = p.precio <= maxP;
    return matchNom && matchCat && matchP;
  });
}

// --- 6. RENDERIZADO DE CATÁLOGO (PAGINACIÓN REACTIVA) ---
function renderizarCatalogo() {
  const grilla = document.getElementById("grillaProductos");
  const contador = document.getElementById("contadorProductos");
  if (!grilla) return;

  const filtrados = filtrarProductos();
  const totalPaginas = Math.ceil(filtrados.length / ITEMS_POR_PAGINA) || 1;
  if (paginaActual > totalPaginas) paginaActual = 1;

  const inicio = (paginaActual - 1) * ITEMS_POR_PAGINA;
  const lote = filtrados.slice(inicio, inicio + ITEMS_POR_PAGINA);

  if (contador) {
    contador.textContent = `Mostrando ${lote.length} de ${filtrados.length} productos (Página ${paginaActual} de ${totalPaginas})`;
  }

  if (lote.length === 0) {
    grilla.innerHTML = `<div class="col-12 py-5 text-center text-white">No hay existencias con esos parámetros.</div>`;
    renderizarPaginadores(0);
    return;
  }

  grilla.innerHTML = lote.map(p => `
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
          <h6 class="card-title fw-bold text-truncate text-white mb-1" style="cursor: pointer;" onclick="verDetalle(${p.id})" title="${p.nombre}">${p.nombre}</h6>
          <p class="small text-muted-custom mb-2 text-truncate">${p.vendedor}</p>
          <div class="mt-auto pt-2 border-top border-secondary d-flex justify-content-between align-items-center">
            <span class="fw-bold text-info">${formatearPrecio(p.precio)}</span>
            <div class="btn-group">
              <button class="btn btn-sm btn-outline-secondary text-white" onclick="verDetalle(${p.id})" title="Detalle"><i class="bi bi-eye"></i></button>
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
  const pSup = document.getElementById("paginadorBotones");
  const pInf = document.getElementById("paginadorInferior");
  if (!pSup && !pInf) return;

  if (total <= 0) {
    if (pSup) pSup.innerHTML = "";
    if (pInf) pInf.innerHTML = "";
    return;
  }

  const html = `
    <button class="btn btn-outline-secondary btn-sm text-white" ${paginaActual === 1 ? 'disabled' : ''} onclick="cambiarPagina(${paginaActual - 1})">Prev</button>
    <button class="btn btn-dark btn-sm text-info disabled border-secondary">${paginaActual} / ${total}</button>
    <button class="btn btn-outline-secondary btn-sm text-white" ${paginaActual === total ? 'disabled' : ''} onclick="cambiarPagina(${paginaActual + 1})">Sig</button>
  `;
  if (pSup) pSup.innerHTML = html;
  if (pInf) pInf.innerHTML = html;
}

function cambiarPagina(nueva) {
  paginaActual = nueva;
  renderizarCatalogo();
  window.scrollTo({ top: 180, behavior: 'smooth' });
}

// --- 7. TOAST NOTIFICADOR REACTIVO ---
function mostrarToastCarrito(nombreProd, cantidad) {
  const toast = document.getElementById("cartToast");
  const msg = document.getElementById("toastMsg");
  const sub = document.getElementById("toastSub");
  if (!toast) return;

  if (msg) msg.textContent = `${cantidad}x "${nombreProd}" agregado(s)`;
  const totalItems = carrito.reduce((a, b) => a + b.cantidad, 0);
  if (sub) sub.textContent = `Carro activo: ${totalItems} ítem(s)`;

  toast.style.setProperty("display", "flex", "important");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.style.setProperty("display", "none", "important");
  }, 4500);
}

// --- 8. GESTIÓN DEL CARRITO DE COMPRAS (OFFCANVAS) ---
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
  const lista = document.getElementById("listaCarrito");
  const total = document.getElementById("totalCarrito");
  const badge = document.getElementById("badgeCarrito");
  const checkMonto = document.getElementById("checkoutTotalMonto");

  const totalItems = carrito.reduce((a, b) => a + b.cantidad, 0);
  const monto = carrito.reduce((a, b) => a + (b.precio * b.cantidad), 0);

  if (badge) badge.textContent = totalItems;
  if (total) total.textContent = formatearPrecio(monto);
  if (checkMonto) checkMonto.textContent = formatearPrecio(monto);

  if (!lista) return;

  if (carrito.length === 0) {
    lista.innerHTML = `<p class="text-center text-muted-custom my-4">No hay ítems en la orden.</p>`;
    return;
  }

  lista.innerHTML = carrito.map(item => `
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
  const badge = document.getElementById("badgeFavoritos");
  if (badge) badge.textContent = favoritos.size;
  renderizarCatalogo();
}

function eliminarProducto(id) {
  if (confirm("¿Confirmas la remoción técnica de esta publicación?")) {
    productos = productos.filter(p => p.id !== id);
    carrito = carrito.filter(x => x.id !== id);
    favoritos.delete(id);
    const badge = document.getElementById("badgeFavoritos");
    if (badge) badge.textContent = favoritos.size;
    actualizarCarrito();
    renderizarCatalogo();
  }
}

// --- 9. MODAL DE DETALLE Y CARGA DE RESEÑAS DINÁMICAS ---
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

  // Reseñas únicas pertenecientes a este producto exacto
  const contenedor = document.getElementById("contenedorReseñas");
  if (contenedor && prod.reseñas) {
    contenedor.innerHTML = prod.reseñas.map(r => `
      <div class="p-2 rounded bg-dark border border-secondary mb-2">
        <div class="d-flex align-items-center justify-content-between mb-1">
          <div class="d-flex align-items-center gap-2">
            <img src="${r.avatar}" class="review-avatar" alt="${r.usuario}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;">
            <span class="small fw-bold text-white">${r.usuario}</span>
          </div>
          <div class="text-warning small">${'<i class="bi bi-star-fill"></i>'.repeat(r.rating)}</div>
        </div>
        <p class="small text-muted-custom mb-0">${r.texto}</p>
      </div>
    `).join("");
  }

  const modalEl = document.getElementById("modalDetalle");
  if (modalEl) bootstrap.Modal.getOrCreateInstance(modalEl).show();
}

// --- 10. AUTENTICACIÓN Y PERSISTENCIA (LOCALSTORAGE) ---
function obtenerUsuarioActivo() {
  try {
    const u = localStorage.getItem("nexustech_user");
    return u ? JSON.parse(u) : null;
  } catch (e) {
    return null;
  }
}

function actualizarEstadoAuth() {
  const c = document.getElementById("contenedorAuthNav");
  if (!c) return;
  const user = obtenerUsuarioActivo();
  if (user) {
    const inicial = user.usuario.charAt(0).toUpperCase();
    c.innerHTML = `
      <div class="d-flex align-items-center gap-2" onclick="abrirPerfil()" style="cursor: pointer;">
        <div class="rounded-circle bg-info text-dark d-flex align-items-center justify-content-center fw-bold shadow-sm" style="width: 34px; height: 34px;">
          ${inicial}
        </div>
        <span class="small fw-bold text-white d-none d-md-inline">${user.usuario}</span>
      </div>
    `;
  } else {
    c.innerHTML = `
      <button class="btn btn-sm btn-outline-light d-flex align-items-center gap-1" data-bs-toggle="modal" data-bs-target="#modalAuth">
        <i class="bi bi-person-circle"></i> <span>Ingresar</span>
      </button>
    `;
  }
}

function abrirPerfil() {
  const user = obtenerUsuarioActivo();
  if (!user) return;
  const av = document.getElementById("perfilAvatarCirculo");
  const nom = document.getElementById("perfilNombreUsuario");
  const em = document.getElementById("perfilEmail");
  if (av) av.textContent = user.usuario.charAt(0).toUpperCase();
  if (nom) nom.textContent = user.usuario;
  if (em) em.textContent = user.email || `${user.usuario}@nexusmail.cl`;
  const m = document.getElementById("modalPerfil");
  if (m) bootstrap.Modal.getOrCreateInstance(m).show();
}

// --- 11. INICIALIZACIÓN DE EVENTOS Y FORMULARIOS ---
document.addEventListener("DOMContentLoaded", () => {
  // Asegurar sesión por defecto requerida para la defensa
  if (!localStorage.getItem("nexustech_user")) {
    localStorage.setItem("nexustech_user", JSON.stringify({
      usuario: "Andrés",
      email: "andres.olguin@uandresbello.edu"
    }));
  }

  renderizarCatalogo();
  actualizarCarrito();
  actualizarEstadoAuth();

  // Búsqueda y Filtros reactivos
  const inpB = document.getElementById("inputBuscar");
  const selC = document.getElementById("selectCategoria");
  const rngP = document.getElementById("rangePrecio");
  const btnL = document.getElementById("btnLimpiarFiltros");

  if (inpB) inpB.addEventListener("input", () => { paginaActual = 1; renderizarCatalogo(); });
  if (selC) selC.addEventListener("change", () => { paginaActual = 1; renderizarCatalogo(); });
  if (rngP) rngP.addEventListener("input", (e) => {
    const lbl = document.getElementById("labelPrecioMax");
    if (lbl) lbl.textContent = formatearPrecio(e.target.value);
    paginaActual = 1;
    renderizarCatalogo();
  });
  if (btnL) btnL.addEventListener("click", () => {
    if (inpB) inpB.value = "";
    if (selC) selC.value = "todas";
    if (rngP) rngP.value = 2500000;
    const lbl = document.getElementById("labelPrecioMax");
    if (lbl) lbl.textContent = formatearPrecio(2500000);
    paginaActual = 1;
    renderizarCatalogo();
  });

  // Modal Detalle Botones
  const btnAdd = document.getElementById("btnModalAddCart");
  const btnBuy = document.getElementById("btnModalBuyNow");
  if (btnAdd) {
    btnAdd.addEventListener("click", () => {
      if (!prodSeleccionado) return;
      const cant = parseInt(document.getElementById("modalSelectCantidad")?.value || "1", 10);
      const color = document.getElementById("modalSelectColor")?.value || "Gris Espacial";
      agregarAlCarritoCompleto(prodSeleccionado.id, cant, color);
      const m = document.getElementById("modalDetalle");
      if (m) bootstrap.Modal.getInstance(m)?.hide();
    });
  }
  if (btnBuy) {
    btnBuy.addEventListener("click", () => {
      if (!prodSeleccionado) return;
      const cant = parseInt(document.getElementById("modalSelectCantidad")?.value || "1", 10);
      const color = document.getElementById("modalSelectColor")?.value || "Gris Espacial";
      agregarAlCarritoCompleto(prodSeleccionado.id, cant, color);
      const m = document.getElementById("modalDetalle");
      if (m) bootstrap.Modal.getInstance(m)?.hide();
      const mCheck = document.getElementById("modalCheckout");
      if (mCheck) bootstrap.Modal.getOrCreateInstance(mCheck).show();
    });
  }

  // Checkout Transaccional
  const fCheck = document.getElementById("formCheckout");
  if (fCheck) {
    fCheck.addEventListener("submit", (e) => {
      e.preventDefault();
      if (carrito.length === 0) return alert("El carrito está vacío.");
      const trackCode = "TRK-" + Math.floor(100000 + Math.random() * 900000);
      const mCheck = document.getElementById("modalCheckout");
      if (mCheck) bootstrap.Modal.getInstance(mCheck)?.hide();
      alert(`¡PAGO PROCESADO EXITOSAMENTE!\n\nSe envió la confirmación a tu correo.\nCódigo de Envío: ${trackCode}\nProveedor: MasterTech SpA`);
      carrito = [];
      actualizarCarrito();
    });
  }

  // Publicar Nuevo Producto (was-validated)
  const fPub = document.getElementById("formNuevoProducto");
  if (fPub) {
    fPub.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!fPub.checkValidity()) {
        e.stopPropagation();
        fPub.classList.add("was-validated");
        return;
      }
      const nuevo = {
        id: Date.now(),
        nombre: document.getElementById("formNombre").value.trim(),
        categoria: document.getElementById("formCategoria").value,
        precio: parseInt(document.getElementById("formPrecio").value, 10),
        imagen: document.getElementById("formImg")?.value.trim() || "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80",
        descripcion: document.getElementById("formDesc").value.trim(),
        vendedor: document.getElementById("formVendedor").value.trim(),
        contacto: "contacto@mastertechg.com",
        reseñas: [
          { usuario: "Comunidad UNAB", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80", rating: 5, texto: "Publicación reciente verificada en el marketplace." }
        ]
      };
      productos.unshift(nuevo);
      fPub.reset();
      fPub.classList.remove("was-validated");
      const mPub = document.getElementById("modalNuevoProducto");
      if (mPub) bootstrap.Modal.getInstance(mPub)?.hide();
      paginaActual = 1;
      renderizarCatalogo();
    });
  }

  // Registro y Login
  const fReg = document.getElementById("formRegistro");
  if (fReg) {
    fReg.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!fReg.checkValidity()) {
        e.stopPropagation();
        fReg.classList.add("was-validated");
        return;
      }
      const usuario = document.getElementById("regUsuario").value.trim();
      const email = document.getElementById("regEmail").value.trim();
      const password = document.getElementById("regPassword").value;
      localStorage.setItem("nexustech_user", JSON.stringify({ usuario, email, password }));
      fReg.reset();
      fReg.classList.remove("was-validated");
      const mAuth = document.getElementById("modalAuth");
      if (mAuth) bootstrap.Modal.getInstance(mAuth)?.hide();
      actualizarEstadoAuth();
      mostrarToastCarrito(`¡Bienvenido, ${usuario}!`, 1);
    });
  }

  const fLog = document.getElementById("formLogin");
  if (fLog) {
    fLog.addEventListener("submit", (e) => {
      e.preventDefault();
      const u = document.getElementById("loginUsuario")?.value.trim();
      if (!u) return alert("Ingresa tu usuario.");
      localStorage.setItem("nexustech_user", JSON.stringify({ usuario: u, email: `${u}@nexusmail.cl` }));
      fLog.reset();
      const mAuth = document.getElementById("modalAuth");
      if (mAuth) bootstrap.Modal.getInstance(mAuth)?.hide();
      actualizarEstadoAuth();
      mostrarToastCarrito(`Sesión iniciada: ${u}`, 1);
    });
  }

  const btnLogout = document.getElementById("btnCerrarSesion");
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      localStorage.removeItem("nexustech_user");
      const mPerf = document.getElementById("modalPerfil");
      if (mPerf) bootstrap.Modal.getInstance(mPerf)?.hide();
      actualizarEstadoAuth();
      mostrarToastCarrito("Sesión cerrada.", 0);
    });
  }
});