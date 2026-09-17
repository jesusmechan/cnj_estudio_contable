# CNJ - Integridad Contable

## Descripción del proyecto

Sitio web corporativo desarrollado para el curso **Marcos de Desarrollo Web (48308)** de la Universidad Tecnológica del Perú (UTP).

El proyecto presenta a la empresa ficticia **CNJ - Integridad Contable**, una firma de consultoría y servicios contables orientada a micro, pequeñas y medianas empresas (MYPE) en Perú. El lema de la marca es *Confianza y Precisión*.

Este repositorio incluye:

- **Avance N°1:** página de inicio (`index.html`) con portada, nosotros, 3 servicios, video, clientes y footer.
- **Avance N°2:** **Tailwind CSS**, página de **productos y servicios** (`productos.html`) con 22 ítems, imágenes únicas, slider y búsqueda estática/dinámica.

---

## Objetivo académico

| Requisito | Implementación |
|-----------|----------------|
| Framework CSS | Tailwind CSS (CDN) |
| Encabezado (logo + nombre) | Navbar sticky con logo y nombre |
| Portada principal (imagen) | Hero full-bleed con imagen y texto superpuesto |
| Información empresa y rubro | Sección “Nosotros” |
| 3 productos/servicios (inicio) | Tarjetas Tailwind con imagen, descripción y precio |
| Página de 20+ productos | `productos.html` renderizado desde un arreglo de objetos |
| Slider 3 a 5 | Slider con 5 servicios destacados e imágenes distintas |
| Búsqueda | Dinámica (al escribir) y estática (botón Buscar) |
| Video | Video institucional local (`assets/video-cnj.mp4`) |
| Clientes referenciales | 2 testimonios |
| Footer | Redes + UTP, contacto integrante y páginas del rubro |

---

## Empresa representada

**CNJ - Integridad Contable** ofrece servicios de contabilidad, tributación SUNAT, planillas, auditoría, constitución de empresas y asesoría financiera.

**Rubro:** servicios profesionales de contabilidad, finanzas y consultoría empresarial.

---

## Estructura del sitio

1. **Inicio** (`index.html`) — portada, nosotros, 3 servicios destacados, video, clientes y footer.
2. **Productos** (`productos.html`) — slider, catálogo de 22 servicios, filtros y búsquedas.

La navegación interna de Inicio hace scroll suave **sin dejar `#` en la URL**. Productos es una página independiente.

---

## Búsqueda (página Productos)

Los servicios viven en un **arreglo de objetos** en `js/productos.js` (equivalente a un ArrayList).

- **Búsqueda dinámica:** al escribir, el catálogo se filtra y se actualiza al instante.
- **Búsqueda estática:** el resultado cambia solo al pulsar **Buscar** (o Enter).
- También se puede filtrar por categoría (Tributario, Contabilidad, Financiero, Laboral, Auditoría, Societario, Consultoría).

---

## Estructura de archivos

```
cnj_estudio_contable/
├── index.html
├── productos.html
├── css/styles.css
├── js/main.js
├── js/productos.js
├── assets/
└── README.md
```

---

## Tecnologías

- **HTML5** — estructura semántica
- **Tailwind CSS** — layout, navbar, grid, cards, slider y formularios
- **CSS3** — animaciones y acentos de marca (navy + gold)
- **JavaScript** — menú, scroll, catálogo y búsquedas
- **Google Fonts** — *Fira Sans*

---

## Cómo visualizar

1. Abrir la carpeta del proyecto.
2. Abrir `index.html` o `productos.html` en el navegador.
3. No requiere instalación de dependencias. Sí se necesita conexión a internet para cargar Tailwind desde el CDN.

---

## Datos del estudiante

| Campo | Valor |
|-------|--------|
| **Nombre** | Jesús Manuel Mechan Gonzales |
| **Curso** | Marcos de Desarrollo Web — 48308 |
| **Institución** | Universidad Tecnológica del Perú (UTP) |

---

## Autor

Proyecto académico elaborado por **Jesús Manuel Mechan Gonzales** para la UTP — Ciclo 6 (2026).
