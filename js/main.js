// CODIGO JS 
// Taller Evaluado 1 - Desarrollo Web UNAB

// listas para ir armando los 2.400 productos mezclados
const MARCAS = [
  "ASUS ROG", "Lenovo ThinkPad", "Apple Pro", "Dell Precision", "MSI Creator",
  "HP Omen Enterprise", "Corsair Dominator", "Logitech MX", "Kingston Fury Renegade",
  "Samsung 990 Pro", "Gigabyte AORUS", "Sony Master Series"
];

// categorias con sus tipos y fotos de internet
const FAMILIAS_PRODUCTO = [
  { cat: "Workstations", tipo: "Workstation Móvil", imgs: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80", "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&q=80", "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&q=80"], pMin: 1200000, pMax: 2350000 },
  { cat: "Workstations", tipo: "Laptop Ultrabook Dev", imgs: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80", "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&q=80"], pMin: 850000, pMax: 1600000 },
  { cat: "Workstations", tipo: "Mini PC Cluster Node", imgs: ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=500&q=80"], pMin: 450000, pMax: 890000 },
  { cat: "Hardware", tipo: "Tarjeta Gráfica GPU", imgs: ["https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500&q=80"], pMin: 620000, pMax: 1980000 },
  { cat: "Hardware", tipo: "Procesador Multi-Core", imgs: ["https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=500&q=80"], pMin: 280000, pMax: 650000 },
  { cat: "Hardware", tipo: "Unidad NVMe M.2 Gen4", imgs: ["https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&q=80"], pMin: 95000, pMax: 320000 },
  { cat: "Hardware", tipo: "Kit Memoria RAM Dual Channel", imgs: ["https://images.unsplash.com/photo-1562976540-1502c2145186?w=500&q=80"], pMin: 85000, pMax: 240000 },
  { cat: "Hardware", tipo: "Servidor Rack 1U Hot-Swap", imgs: ["https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=80"], pMin: 950000, pMax: 2400000 },
  { cat: "Hardware", tipo: "Switch Gestionable L2/L3", imgs: ["https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500&q=80"], pMin: 180000, pMax: 490000 },
  { cat: "Hardware", tipo: "Placa Madre Arquitectura Pro", imgs: ["https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80"], pMin: 190000, pMax: 520000 },
  { cat: "Periféricos", tipo: "Audífonos Monitores DAC", imgs: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"], pMin: 65000, pMax: 210000 },
  { cat: "Periféricos", tipo: "Teclado Mecánico Custom", imgs: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80"], pMin: 55000, pMax: 185000 },
  { cat: "Periféricos", tipo: "Monitor Curvo Color Grading", imgs: ["https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80"], pMin: 280000, pMax: 990000 },
  { cat: "Periféricos", tipo: "Mouse Inalámbrico Ultra-Polling", imgs: ["https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&q=80"], pMin: 35000, pMax: 120000 },
  { cat: "Periféricos", tipo: "Micrófono Estudio USB Condenser", imgs: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80"], pMin: 48000, pMax: 165000 },
  { cat: "Soluciones", tipo: "Pasarela Webpay Plus API", imgs: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80"], pMin: 90000, pMax: 250000 },
  { cat: "Soluciones", tipo: "Landing Page CoreWebVitals", imgs: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80"], pMin: 50000, pMax: 150000 },
  { cat: "Soluciones", tipo: "Auditoría Seguridad Web OWASP", imgs: ["https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&q=80"], pMin: 120000, pMax: 350000 }
];

// nombres de modelos para que no sean todos iguales
const SERIES_MODELO = [
  "Elite Series", "Vanguard Edition", "Carbon Spec", "Aero Pro",
  "Studio Line", "Industrial Tier", "X-Treme Edition", "Prime Build"
];

// caracteristicas tecnicas
const SPECS_LISTA = [
  "32GB RAM / 1TB NVMe Gen4", "64GB DDR5 / RTX 4080 16GB", "24GB VRAM GDDR6X / 450W TDP",
  "16 Cores / 32 Hilos 5.7GHz Boost", "4TB NVMe / 7400MB/s Lectura", "OLED 4K 144Hz / 99% DCI-P3",
  "Linear Red Switches / Hot-Swap", "Cancelación Activa 45dB / 24-bit DAC", "10G SFP+ Dual / 48 Puertos PoE+",
  "Despliegue Docker Swarm + SSL Wildcard"
];

// nombres de estudiantes inventados para las resenas
const NOMBRES_ESTUDIANTES = [
  "Camila Rojas", "Matías Soto", "Ignacio Vera", "Sofía Morales", "Diego Arancibia",
  "Valentina Peña", "Nicolás Castro", "Maximiliano Valdés", "Enrique Chamys", "Miguel Margas",
  "Javier Figueroa", "Fernanda Tapia", "Sebastián Muñoz", "Catalina Parra", "Tomás Herrera"
];

// comentarios genericos creibles
const PLANTILLAS_OPINION = [
  "Excelente rendimiento para las sesiones de laboratorio en la UNAB. La temperatura se mantiene estable bajo carga.",
  "Comprado con despacho dentro de Viña del Mar, llegó en menos de 24 horas y con sello de garantía intacto.",
  "Llevo 3 semanas usándolo para desarrollo y compilación pesada; cero caídas de frames ni problemas térmicos.",
  "La construcción de los materiales es premium. Cumple 100% con la frecuencia y especificaciones descritas.",
  "Muy buena integración en el entorno de trabajo. El soporte del vendedor fue súper rápido para responder dudas.",
  "Relación precio-calidad insuperable comparado con el retail tradicional. Totalmente certificado para ingeniería."
];

const VENDEDORES = [
  "NexusTech Hub", "Valpo Tech Supply", "MasterTech SpA", "Silicon Reñaca", "Enterprise Labs", "Viña Dev Hardware"
];

// #################################################
// bucle para crear los 2.400 productos en memoria
// #################################################
let productos = [];
const TOTAL_PRODUCTOS = 2400;

for (let i = 1; i <= TOTAL_PRODUCTOS; i++) {
  const fam = FAMILIAS_PRODUCTO[(i * 7) % FAMILIAS_PRODUCTO.length];
  const marca = MARCAS[(i * 11) % MARCAS.length];
  const serie = SERIES_MODELO[(i * 13) % SERIES_MODELO.length];
  const spec = SPECS_LISTA[(i * 17) % SPECS_LISTA.length];
  const img = fam.imgs[i % fam.imgs.length];
  const vend = VENDEDORES[(i * 5) % VENDEDORES.length];

  // calculo para que el precio cambie un poco
  const rango = fam.pMax - fam.pMin;
  const precioCalculado = fam.pMin + Math.floor(((i * 9973) % rango) / 1000) * 1000;

  // armar los dos comentarios de cada producto
  const autor1 = NOMBRES_ESTUDIANTES[(i * 3) % NOMBRES_ESTUDIANTES.length];
  const autor2 = NOMBRES_ESTUDIANTES[(i * 3 + 1) % NOMBRES_ESTUDIANTES.length];
  const texto1 = `${PLANTILLAS_OPINION[(i * 2) % PLANTILLAS_OPINION.length]} Destaco especialmente el detalle de: ${spec}.`;
  const texto2 = `${PLANTILLAS_OPINION[(i * 2 + 1) % PLANTILLAS_OPINION.length]} Verificado con ${marca}.`;

  productos.push({
    id: i,
    nombre: `${marca} ${fam.tipo} ${serie} (${spec})`,
    categoria: fam.cat,
    precio: precioCalculado,
    imagen: img,
    descripcion: `Hardware certificado de alto nivel para estudiantes y profesionales. Configuración equipada con ${spec}. Verificado por el laboratorio de testing NexusTech.`,
    vendedor: vend,
    contacto: "contacto@mastertechg.com",
    reseñas: [
      {
        usuario: autor1,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(autor1)}`,
        rating: 5,
        texto: texto1
      },
      {
        usuario: autor2,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(autor2)}`,
        rating: 4 + (i % 2),
        texto: texto2
      }
    ]
  });
}

// variables para controlar la pagina y el carrito
let paginaActual = 1;
const ITEMS_POR_PAGINA = 24; // mostramos 24 por pagina
let carrito = [];
let favoritos = new Set();
let prodSeleccionado = null;

// funcion chica para ponerle signo peso y puntos al numero
function formatearPrecio(n) {
  return new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(n);
}

// filtra segun lo que escribes, la categoria y el precio maximo
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

// pinta en pantalla solo los 24 productos de la pagina donde estas
function renderizarCatalogo() {
  const grilla = document.getElementById("grillaProductos");
  const contador = document.getElementById("contadorProductos");
  if (!grilla) return;

  const filtrados = filtrarProductos();
  const totalPaginas = Math.ceil(filtrados.length / ITEMS_POR_PAGINA) || 1;
  if (paginaActual > totalPaginas) paginaActual = 1;

  // agarra solo el pedazo de 24 productos con slice
  const inicio = (paginaActual - 1) * ITEMS_POR_PAGINA;
  const lote = filtrados.slice(inicio, inicio + ITEMS_POR_PAGINA);

  if (contador) {
    contador.textContent = `Mostrando ${lote.length} de ${filtrados.length} productos (Página ${paginaActual} de ${totalPaginas})`;
  }

  // si no pillo nada
  if (lote.length === 0) {
    grilla.innerHTML = `<div class="col-12 py-5 text-center text-white">No hay existencias con esos parámetros.</div>`;
    renderizarPaginadores(0);
    return;
  }

  // armamos el html de cada tarjeta
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

// crea los botones de anterior y siguiente
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

// cambia de pagina y sube arriba
function cambiarPagina(nueva) {
  paginaActual = nueva;
  renderizarCatalogo();
  window.scrollTo({ top: 180, behavior: 'smooth' });
}

// saca el cartelito cuando agregas algo
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

// boton rapido del carrito en la tarjeta
function agregarAlCarritoRapido(id) {
  const p = productos.find(x => x.id === id);
  if (!p) return;
  const item = carrito.find(x => x.id === id);
  if (item) item.cantidad += 1;
  else carrito.push({ ...p, cantidad: 1, color: "Gris Espacial" });
  actualizarCarrito();
  mostrarToastCarrito(p.nombre, 1);
}

// boton de agregar desde adentro de la ventana de detalle
function agregarAlCarritoCompleto(id, cant, color) {
  const p = productos.find(x => x.id === id);
  if (!p) return;
  const item = carrito.find(x => x.id === id && x.color === color);
  if (item) item.cantidad += cant;
  else carrito.push({ ...p, cantidad: cant, color: color });
  actualizarCarrito();
  mostrarToastCarrito(p.nombre, cant);
}

// sacar algo del carro
function eliminarDelCarrito(id, color) {
  carrito = carrito.filter(x => !(x.id === id && x.color === color));
  actualizarCarrito();
}

// vuelve a sumar la plata y redibuja la lista del carrito lateral
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

// marcar o desmarcar favoritos con el corazon
function toggleFavorito(id) {
  if (favoritos.has(id)) favoritos.delete(id);
  else favoritos.add(id);
  const badge = document.getElementById("badgeFavoritos");
  if (badge) badge.textContent = favoritos.size;
  renderizarCatalogo();
}

// boton del basurero para borrar un producto de la lista
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

// abre la ventana con la foto grande, specs y las resenas
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

  // dibuja las opiniones de este producto
  const contenedor = document.getElementById("contenedorReseñas");
  if (contenedor && prod.reseñas) {
    contenedor.innerHTML = prod.reseñas.map(r => `
      <div class="p-2 rounded bg-dark border border-secondary mb-2">
        <div class="d-flex align-items-center justify-content-between mb-1">
          <div class="d-flex align-items-center gap-2">
            <img src="${r.avatar}" class="review-avatar" alt="${r.usuario}" style="width: 30px; height: 30px; border-radius: 50%; object-fit: cover;">
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

// saca el usuario guardado del navegador (localStorage)
function obtenerUsuarioActivo() {
  try {
    const u = localStorage.getItem("nexustech_user");
    return u ? JSON.parse(u) : null;
  } catch (e) {
    return null;
  }
}

// revisa si estas logueado para mostrar la letra A o el boton de entrar
function actualizarEstadoAuth() {
  const c = document.getElementById("contenedorAuthNav");
  if (!c) return;
  const user = obtenerUsuarioActivo();
  if (user) {
    const inicial = user.usuario.charAt(0).toUpperCase();
    c.innerHTML = `
      <div class="d-flex align-items-center gap-1" onclick="abrirPerfil()" style="cursor: pointer;">
        <div class="rounded-circle bg-info text-dark d-flex align-items-center justify-content-center fw-bold shadow-sm" style="width: 30px; height: 30px; font-size: 0.85rem;">
          ${inicial}
        </div>
        <span class="small fw-bold text-white d-none d-md-inline ms-1">${user.usuario}</span>
      </div>
    `;
  } else {
    c.innerHTML = `
      <button class="btn btn-sm btn-outline-light btn-compact" data-bs-toggle="modal" data-bs-target="#modalAuth">
        <i class="bi bi-person-circle"></i> <span>Ingresar</span>
      </button>
    `;
  }
}

// abre la ventanita del perfil
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

// #################################################
// aca arrancan los botones cuando carga la pagina
// #################################################
document.addEventListener("DOMContentLoaded", () => {
  // si no habia usuario, dejamos a Andres por defecto
  if (!localStorage.getItem("nexustech_user")) {
    localStorage.setItem("nexustech_user", JSON.stringify({
      usuario: "Andrés",
      email: "andres.olguin@uandresbello.edu"
    }));
  }

  // dibuja todo al inicio
  renderizarCatalogo();
  actualizarCarrito();
  actualizarEstadoAuth();

  // eventos de cuando escribes o tocas los filtros
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

  // botones de la ventana de detalle (anadir o comprar de una)
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

  // simular el pago
  const fCheck = document.getElementById("formCheckout");
  if (fCheck) {
    fCheck.addEventListener("submit", (e) => {
      e.preventDefault();
      if (carrito.length === 0) return alert("El carrito está vacío.");
      const trackCode = "TRK-" + Math.floor(100000 + Math.random() * 900000);
      const mCheck = document.getElementById("modalCheckout");
      if (mCheck) bootstrap.Modal.getInstance(mCheck)?.hide();
      alert(`¡PAGO PROCESADO EXITOSAMENTE!\n\nCódigo de Envío: ${trackCode}\nProveedor: MasterTech SpA`);
      carrito = [];
      actualizarCarrito();
    });
  }

  // formulario para agregar un producto a la lista
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
          { usuario: "Comunidad UNAB", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80", rating: 5, texto: "Publicación reciente verificada." }
        ]
      };
      productos.unshift(nuevo); // lo mete al principio
      fPub.reset();
      fPub.classList.remove("was-validated");
      const mPub = document.getElementById("modalNuevoProducto");
      if (mPub) bootstrap.Modal.getInstance(mPub)?.hide();
      paginaActual = 1;
      renderizarCatalogo();
    });
  }

  // formulario de iniciar sesion
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

  // cerrar sesion y borrar de localStorage
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