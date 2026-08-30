# CNJ - Integridad Contable

## Descripción del proyecto

Sitio web corporativo de una sola página (landing) desarrollado como **Avance N°1** del curso **Marcos de Desarrollo Web (48308)** de la Universidad Tecnológica del Perú (UTP).

El proyecto presenta a la empresa ficticia **CNJ - Integridad Contable**, una firma de consultoría y servicios contables orientada a micro, pequeñas y medianas empresas (MYPE) en Perú. El lema de la marca es *Confianza y Precisión*.

---

## Objetivo académico

Cumplir los requisitos del avance de página de inicio (`Pg Inicio`), incluyendo:

| Requisito | Implementación |
|-----------|----------------|
| Encabezado (logo + nombre) | Header con logo y nombre de empresa |
| Portada principal (imagen) | Hero full-bleed con imagen y texto superpuesto |
| Información empresa y rubro | Sección “Nosotros” con texto (24px) y rubro |
| 3 productos/servicios | Tarjetas con imagen, descripción y precio |
| Video | Video institucional local (`assets/video-cnj.mp4`) generado con marca CNJ |
| Clientes referenciales | 2 testimonios con imagen e información |
| Footer | 3 columnas: redes + UTP, contacto integrante (nombre/correo), 3 páginas del rubro |

---

## Empresa representada

**CNJ - Integridad Contable** ofrece:

1. **Gestión y Declaración Tributaria SUNAT** — desde S/ 350 / mes  
2. **Contabilidad Integral y Libros Electrónicos** — desde S/ 500 / mes  
3. **Asesoría Financiera y Planificación Fiscal** — desde S/ 800 / mes  

**Rubro:** servicios profesionales de contabilidad, finanzas y consultoría empresarial.

---

## Estructura del sitio

1. **Header** — logo, menú de navegación y botón “Contáctenos”  
2. **Portada** — imagen de fondo, título y llamados a la acción  
3. **Nosotros** — información de la empresa, valores y rubro  
4. **Servicios** — tres servicios con imagen, texto y precio  
5. **Video** — video institucional local sobre servicios de CNJ  
6. **Clientes** — dos clientes referenciales con testimonio  
7. **Footer** — 3 redes (logo+link), UTP, contacto integrante (nombre y correo), 3 páginas del rubro (logo+link)

Para regenerar el video institucional (con narración en español y audio de fondo):

```bash
pip install edge-tts pillow
python scripts/generate_video.py
```

La navegación hace scroll suave entre secciones **sin modificar la URL** con `#`.

---

## Estructura de archivos

```
Avance 1/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos y diseño responsive
├── js/
│   └── main.js         # Menú móvil y scroll interno
├── assets/
│   ├── logo.png / logo3.png
│   ├── portada.jpg
│   ├── producto-1.jpg … producto-3.jpg
│   ├── video-cnj.mp4
│   ├── video-slides/   # diapositivas usadas para generar el video
│   ├── red-facebook.png / red-instagram.png / red-linkedin.png
│   ├── logo_utp.png
│   └── logo_pwc.png / logo_ey.png / logo_kpmg.png
└── README.md           # Este documento
```

---

## Tecnologías

- **HTML5** — estructura semántica  
- **CSS3** — variables CSS, flexbox, grid y media queries  
- **JavaScript** — menú hamburguesa y navegación interna  
- **Google Fonts** — tipografía *Fira Sans*

No se utilizan frameworks; el sitio es estático y puede abrirse directamente en el navegador.

---

## Diseño

- **Paleta:** slate (`#243447`) + dorado suave (`#c9a227`)  
- **Enfoque:** estilo corporativo de firma contable  
- **Responsive:** adaptable a escritorio, tablet y móvil  
- **Favicon:** `assets/logo3.png`

---

## Cómo visualizar

1. Abrir la carpeta del proyecto.  
2. Abrir `index.html` en el navegador (doble clic o “Open with Live Server”).  
3. No requiere instalación de dependencias ni servidor obligatorio.

---

## Datos del estudiante

| Campo | Valor |
|-------|--------|
| **Nombre** | Jesús Manuel Mechan Gonzales |
| **Curso** | Marcos de Desarrollo Web — 48308 |
| **Institución** | Universidad Tecnológica del Perú (UTP) |
| **Contacto (demo)** | contacto@cnjcontable.pe / +51 987 654 321 |

---

## Autor

Proyecto académico elaborado por **Jesús Manuel Mechan Gonzales** para la UTP — Ciclo 6 (2026).
