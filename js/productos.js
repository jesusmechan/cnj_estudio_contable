const servicios = [
  {
    id: 1,
    nombre: "Gestión y Declaración Tributaria SUNAT",
    categoria: "Tributario",
    descripcion: "Cálculo, preparación y presentación de PDT, PLAME y SIRE. Evitamos multas y mantenemos tu RUC al día.",
    precio: 350,
    unidad: "mes",
    imagen: "assets/servicios/servicio-01.jpg",
    imagenSlider: "assets/servicios/slider-01.jpg?v=6",
    destacado: true,
  },
  {
    id: 2,
    nombre: "Contabilidad Integral y Libros Electrónicos",
    categoria: "Contabilidad",
    descripcion: "Registro de comprobantes, control de libros electrónicos y estados financieros oportunos para tu MYPE.",
    precio: 500,
    unidad: "mes",
    imagen: "assets/servicios/servicio-02.jpg",
    imagenSlider: "assets/servicios/slider-02.jpg?v=6",
    destacado: true,
  },
  {
    id: 3,
    nombre: "Asesoría Financiera y Planificación Fiscal",
    categoria: "Financiero",
    descripcion: "Estrategias legales para optimizar la carga tributaria y mejorar la rentabilidad del negocio.",
    precio: 800,
    unidad: "mes",
    imagen: "assets/servicios/servicio-03.jpg",
    imagenSlider: "assets/servicios/slider-03.jpg?v=6",
    destacado: true,
  },
  {
    id: 4,
    nombre: "Constitución de Empresas",
    categoria: "Societario",
    descripcion: "Minuta, inscripción en SUNARP, RUC, clave SOL y régimen tributario inicial para tu nueva empresa.",
    precio: 650,
    unidad: "único",
    imagen: "assets/servicios/servicio-04.jpg",
    imagenSlider: "assets/servicios/slider-04.jpg?v=6",
    destacado: true,
  },
  {
    id: 5,
    nombre: "Alta de RUC y Régimen Tributario",
    categoria: "Tributario",
    descripcion: "Inscripción en SUNAT, elección de NRUS, RER o Régimen General y configuración de clave SOL.",
    precio: 180,
    unidad: "único",
    imagen: "assets/servicios/servicio-05.jpg",
  },
  {
    id: 6,
    nombre: "Planillas y PLAME",
    categoria: "Laboral",
    descripcion: "Cálculo de remuneraciones, CTS, gratificaciones, AFP/ONP y presentación mensual del PLAME.",
    precio: 280,
    unidad: "mes",
    imagen: "assets/servicios/servicio-06.jpg",
    imagenSlider: "assets/servicios/slider-05.jpg?v=6",
    destacado: true,
  },
  {
    id: 7,
    nombre: "Auditoría Interna Contable",
    categoria: "Auditoría",
    descripcion: "Revisión de procesos, controles internos y hallazgos para prevenir errores antes de una fiscalización.",
    precio: 1500,
    unidad: "único",
    imagen: "assets/servicios/servicio-07.jpg",
  },
  {
    id: 8,
    nombre: "Cierre Contable Anual",
    categoria: "Contabilidad",
    descripcion: "Ajustes de cierre, conciliación de cuentas, inventario y preparación de la declaración anual.",
    precio: 900,
    unidad: "único",
    imagen: "assets/servicios/servicio-08.jpg",
  },
  {
    id: 9,
    nombre: "Representación ante SUNAT",
    categoria: "Tributario",
    descripcion: "Acompañamiento en requerimientos, esquelas, fiscalizaciones y descargos ante la administración tributaria.",
    precio: 450,
    unidad: "único",
    imagen: "assets/servicios/servicio-09.jpg",
  },
  {
    id: 10,
    nombre: "Elaboración de Estados Financieros",
    categoria: "Contabilidad",
    descripcion: "Estado de situación financiera, resultados, flujo de efectivo y notas listas para bancos o socios.",
    precio: 600,
    unidad: "único",
    imagen: "assets/servicios/servicio-10.jpg",
  },
  {
    id: 11,
    nombre: "Outsourcing Contable para MYPE",
    categoria: "Contabilidad",
    descripcion: "Tercerizamos tu área contable: registro diario, reportes mensuales y atención de consultas.",
    precio: 400,
    unidad: "mes",
    imagen: "assets/servicios/servicio-11.jpg",
  },
  {
    id: 12,
    nombre: "Control de Inventarios y Kardex",
    categoria: "Contabilidad",
    descripcion: "Kardex valorizado, costeo de mercadería y conciliación entre almacén y contabilidad.",
    precio: 320,
    unidad: "mes",
    imagen: "assets/servicios/servicio-12.jpg",
  },
  {
    id: 13,
    nombre: "Implementación de Facturación Electrónica",
    categoria: "Tributario",
    descripcion: "Alta en SEE, configuración de PSE/OSE y capacitación para emitir boletas y facturas electrónicas.",
    precio: 220,
    unidad: "mes",
    imagen: "assets/servicios/servicio-13.jpg",
  },
  {
    id: 14,
    nombre: "PDT 621 y Declaraciones Mensuales",
    categoria: "Tributario",
    descripcion: "Determinación de IGV, renta mensual y presentación puntual de los PDT de tu empresa.",
    precio: 250,
    unidad: "mes",
    imagen: "assets/servicios/servicio-14.jpg",
  },
  {
    id: 15,
    nombre: "Declaración Anual del Impuesto a la Renta",
    categoria: "Tributario",
    descripcion: "Formularios 710/706, arrastre de pérdidas, créditos y presentación anual ante SUNAT.",
    precio: 480,
    unidad: "único",
    imagen: "assets/servicios/servicio-15.jpg",
  },
  {
    id: 16,
    nombre: "Asesoría Laboral y Contratos",
    categoria: "Laboral",
    descripcion: "Contratos, altas T-Registro, liquidaciones y cumplimiento de obligaciones laborales.",
    precio: 350,
    unidad: "mes",
    imagen: "assets/servicios/servicio-16.jpg",
  },
  {
    id: 17,
    nombre: "Flujo de Caja y Presupuestos",
    categoria: "Financiero",
    descripcion: "Proyección de ingresos y egresos, presupuestos anuales y control de liquidez para decisiones.",
    precio: 700,
    unidad: "único",
    imagen: "assets/servicios/servicio-17.jpg",
  },
  {
    id: 18,
    nombre: "Consultoría NIIF",
    categoria: "Contabilidad",
    descripcion: "Adopción y aplicación de Normas Internacionales de Información Financiera según tu sector.",
    precio: 1200,
    unidad: "único",
    imagen: "assets/servicios/servicio-18.jpg",
  },
  {
    id: 19,
    nombre: "Trámites SUNAT y Clave SOL",
    categoria: "Tributario",
    descripcion: "Recuperación de clave SOL, casilla electrónica, fraccionamientos y trámites virtuales.",
    precio: 150,
    unidad: "único",
    imagen: "assets/servicios/servicio-19.jpg",
  },
  {
    id: 20,
    nombre: "Liquidación de IGV",
    categoria: "Tributario",
    descripcion: "Cruce de compras y ventas, crédito fiscal y determinación mensual del IGV a pagar o arrastrar.",
    precio: 200,
    unidad: "mes",
    imagen: "assets/servicios/servicio-20.jpg",
  },
  {
    id: 21,
    nombre: "Auditoría Tributaria Preventiva",
    categoria: "Auditoría",
    descripcion: "Simulación de fiscalización SUNAT, revisión de comprobantes y plan de corrección de contingencias.",
    precio: 1800,
    unidad: "único",
    imagen: "assets/servicios/servicio-21.jpg",
  },
  {
    id: 22,
    nombre: "Capacitación Contable para tu equipo",
    categoria: "Consultoría",
    descripcion: "Talleres prácticos de registros, comprobantes electrónicos y lectura de estados financieros.",
    precio: 450,
    unidad: "único",
    imagen: "assets/servicios/servicio-22.jpg",
  },
];

const categorias = ["Todas", ...new Set(servicios.map((servicio) => servicio.categoria))];

const state = {
  modo: "dinamica",
  terminoDinamico: "",
  terminoEstatico: "",
  categoria: "Todas",
  slide: 0,
};

const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");
const searchButton = document.getElementById("searchButton");
const resetButton = document.getElementById("resetButton");
const searchHint = document.getElementById("searchHint");
const resultsCount = document.getElementById("resultsCount");
const productosGrid = document.getElementById("productosGrid");
const emptyState = document.getElementById("emptyState");
const categoryFilters = document.getElementById("categoryFilters");
const sliderTrack = document.getElementById("sliderTrack");
const sliderDots = document.getElementById("sliderDots");
const sliderPrev = document.getElementById("sliderPrev");
const sliderNext = document.getElementById("sliderNext");
const modoButtons = document.querySelectorAll("[data-modo]");

const destacados = servicios.filter((servicio) => servicio.destacado).slice(0, 5);

const imagenesUsadas = [
  ...destacados.map((servicio) => servicio.imagenSlider),
  ...servicios.map((servicio) => servicio.imagen),
];

if (new Set(imagenesUsadas).size !== imagenesUsadas.length) {
  throw new Error("Las imágenes del slider y del catálogo no pueden repetirse.");
}

const formatPrecio = (servicio) => {
  const monto = `S/ ${servicio.precio.toLocaleString("es-PE")}`;
  return servicio.unidad === "mes" ? `Desde ${monto} / mes` : `${monto} (pago único)`;
};

const getTerminoActivo = () => (
  state.modo === "dinamica" ? state.terminoDinamico : state.terminoEstatico
);

const normalizarTexto = (texto) => texto
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9\s]/g, " ")
  .replace(/\s+/g, " ")
  .trim();

const filtrarServicios = () => {
  const tokens = normalizarTexto(getTerminoActivo()).split(" ").filter(Boolean);

  return servicios.filter((servicio) => {
    const coincideCategoria = state.categoria === "Todas" || servicio.categoria === state.categoria;
    const texto = normalizarTexto(
      `${servicio.nombre} ${servicio.categoria} ${servicio.descripcion}`
    );
    const coincideTexto = tokens.every((token) => texto.includes(token));
    return coincideCategoria && coincideTexto;
  });
};

const getVisibleSlides = () => 1;

const goToSlide = (index) => {
  if (!destacados.length || !sliderTrack) return;

  const visible = getVisibleSlides();
  const maxIndex = Math.max(0, destacados.length - visible);
  state.slide = Math.min(Math.max(index, 0), maxIndex);

  sliderTrack.style.transform = `translateX(-${state.slide * (100 / visible)}%)`;

  document.querySelectorAll("[data-dot]").forEach((dot, i) => {
    dot.classList.toggle("is-active", i === state.slide);
  });

  if (sliderPrev) sliderPrev.disabled = state.slide === 0;
  if (sliderNext) sliderNext.disabled = state.slide === maxIndex;
};

const renderSlider = () => {
  if (!sliderTrack || !sliderDots) return;

  sliderTrack.innerHTML = destacados.map((servicio) => `
    <article class="slider-card">
      <img src="${servicio.imagenSlider}" alt="${servicio.nombre}">
    </article>
  `).join("");

  sliderDots.innerHTML = destacados.map((_, index) => `
    <button type="button" data-dot="${index}" class="slider-dot ${index === 0 ? "is-active" : ""}" aria-label="Ir al slide ${index + 1}"></button>
  `).join("");
};

const renderCategorias = () => {
  if (!categoryFilters) return;

  categoryFilters.innerHTML = categorias.map((categoria) => {
    const active = categoria === state.categoria;
    return `
      <button type="button" data-categoria="${categoria}" class="chip ${active ? "is-active" : ""}">
        ${categoria}
      </button>
    `;
  }).join("");
};

const renderCatalogo = () => {
  if (!productosGrid || !emptyState || !resultsCount) return;

  const resultados = filtrarServicios();
  resultsCount.textContent = `Mostrando ${resultados.length} de ${servicios.length} servicios`;
  emptyState.classList.toggle("hidden", resultados.length > 0);
  productosGrid.classList.toggle("hidden", resultados.length === 0);

  productosGrid.innerHTML = resultados.map((servicio) => `
    <article class="service-card group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div class="relative">
        <span class="absolute left-4 top-4 z-10 rounded-full bg-navy px-3 py-1 text-xs font-bold text-white">${String(servicio.id).padStart(2, "0")}</span>
        <img src="${servicio.imagen}" alt="${servicio.nombre}" class="h-44 w-full object-cover transition duration-500 group-hover:scale-105">
      </div>
      <div class="flex flex-1 flex-col p-6">
        <p class="mb-2 text-xs font-bold uppercase tracking-wider text-gold">${servicio.categoria}</p>
        <h3 class="mb-3 text-lg font-bold text-navy">${servicio.nombre}</h3>
        <p class="mb-4 flex-1 text-sm leading-relaxed text-slate-500">${servicio.descripcion}</p>
        <div class="mt-auto flex items-center justify-between gap-3">
          <span class="font-bold text-gold">${formatPrecio(servicio)}</span>
          <a href="index.html#contacto" class="catalog-card__cta">Solicitar</a>
        </div>
      </div>
    </article>
  `).join("");
};

const actualizarModo = () => {
  const esDinamica = state.modo === "dinamica";
  searchButton.disabled = esDinamica;
  searchHint.textContent = esDinamica
    ? "Modo dinámica: los resultados se filtran mientras escribes."
    : "Modo estática: escribe el término y pulsa Buscar.";

  modoButtons.forEach((boton) => {
    boton.classList.toggle("is-active", boton.dataset.modo === state.modo);
  });
};

if (searchInput && searchForm && searchButton && resetButton) {
  modoButtons.forEach((boton) => {
    boton.addEventListener("click", () => {
      state.modo = boton.dataset.modo;
      actualizarModo();
      if (state.modo === "dinamica") {
        state.terminoDinamico = searchInput.value;
        renderCatalogo();
      }
    });
  });

  searchInput.addEventListener("input", () => {
    if (state.modo !== "dinamica") return;
    state.terminoDinamico = searchInput.value;
    renderCatalogo();
  });

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (state.modo === "estatica") {
      state.terminoEstatico = searchInput.value;
      renderCatalogo();
    }
  });

  resetButton.addEventListener("click", () => {
    searchInput.value = "";
    state.terminoDinamico = "";
    state.terminoEstatico = "";
    state.categoria = "Todas";
    renderCategorias();
    renderCatalogo();
    searchInput.focus();
  });

  categoryFilters.addEventListener("click", (event) => {
    const boton = event.target.closest("[data-categoria]");
    if (!boton) return;
    state.categoria = boton.dataset.categoria;
    renderCategorias();
    renderCatalogo();
  });

  renderSlider();
  goToSlide(0);
  renderCategorias();
  actualizarModo();
  renderCatalogo();

  sliderPrev?.addEventListener("click", () => goToSlide(state.slide - 1));
  sliderNext?.addEventListener("click", () => goToSlide(state.slide + 1));
  sliderDots?.addEventListener("click", (event) => {
    const dot = event.target.closest("[data-dot]");
    if (!dot) return;
    goToSlide(Number(dot.dataset.dot));
  });

  window.addEventListener("resize", () => goToSlide(state.slide));

  setInterval(() => {
    const visible = getVisibleSlides();
    const maxIndex = Math.max(0, destacados.length - visible);
    goToSlide(state.slide >= maxIndex ? 0 : state.slide + 1);
  }, 7000);
}
