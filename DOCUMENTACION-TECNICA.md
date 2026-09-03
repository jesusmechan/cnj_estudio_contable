# Documentación técnica — CNJ Integridad Contable

Este documento explica **cómo se construyó** la página web del **Avance N°1** del curso Marcos de Desarrollo Web (48308). Está pensado como guía de estudio y referencia personal; **no se versiona en Git** (ver `.gitignore`).

---

## 1. Visión general

El sitio es una **landing page de una sola página** (single page) para la empresa ficticia **CNJ - Integridad Contable**. No usa frameworks (React, Bootstrap, etc.) ni bundlers: solo **HTML5**, **CSS3** y **JavaScript vanilla**.

### Estructura de carpetas

```
Avance 1/
├── index.html              → Estructura y contenido de toda la página
├── css/styles.css          → Diseño, animaciones y responsive
├── js/main.js              → Interactividad (menú, scroll, reveal)
├── assets/                 → Imágenes, logos, video e iconos
└── DOCUMENTACION-TECNICA.md → Este archivo (ignorado por Git)
```

### Flujo de carga en el navegador

1. El navegador descarga y parsea `index.html`.
2. En el `<head>` se solicitan la fuente **Fira Sans** (Google Fonts) y el archivo `css/styles.css`.
3. El CSS se aplica mientras se construye el DOM (árbol de elementos).
4. Al final del `<body>`, se carga `js/main.js`. Cuando termina de ejecutarse, la página ya es interactiva.

### Mapa de secciones (orden vertical)

```
┌─────────────────────────────────────┐
│  HEADER (sticky)                    │  ← Siempre visible al hacer scroll
├─────────────────────────────────────┤
│  PORTADA (#inicio)                  │  ← Hero con imagen de fondo
├─────────────────────────────────────┤
│  NOSOTROS (#empresa)                │  ← Info empresa + valores
├─────────────────────────────────────┤
│  SERVICIOS (#servicios)             │  ← 3 tarjetas de productos
├─────────────────────────────────────┤
│  VIDEO (#video)                     │  ← Reproductor + lista
├─────────────────────────────────────┤
│  CLIENTES (#clientes)               │  ← 2 testimonios
├─────────────────────────────────────┤
│  FOOTER (#contacto)                 │  ← 3 columnas + copyright
└─────────────────────────────────────┘
         ↑ Botón flotante "volver arriba"
```

---

## 2. Apartado por apartado de la web

A continuación se explica **cada sección** con su HTML, CSS y JavaScript. Así puedes defender el proyecto sección por sección.

---

### 2.1 Cabecera del documento (`<head>`)

Antes del contenido visible, el `<head>` prepara metadatos, SEO y recursos externos.

#### Metadatos básicos

| Elemento | Qué hace y por qué está |
|----------|-------------------------|
| `lang="es"` | Indica que el contenido está en español (accesibilidad y SEO). |
| `<meta charset="UTF-8">` | Permite tildes, eñes y caracteres especiales sin errores. |
| `<meta name="viewport">` | Clave para responsive: el ancho se adapta al dispositivo. |
| `<meta name="description">` | Texto que Google muestra en resultados de búsqueda (~155 caracteres con keywords del rubro). |
| `<meta name="robots">` | `index, follow` indica a buscadores que indexen la página y sigan los enlaces. |
| `<meta name="author">` | Identifica al autor del sitio (Jesús Manuel Mechan Gonzales). |
| `<meta name="theme-color">` | Color `#243447` (navy) que Chrome y navegadores móviles usan en la barra de dirección. |
| `<meta name="format-detection">` | Evita que iOS detecte automáticamente teléfonos y correos como enlaces. |
| `<title>` | Título de la pestaña — incluye marca + tagline para SEO. |
| Favicon (`logo3.png`) | Icono pequeño en la pestaña y al guardar favoritos. |

#### Open Graph (Facebook, LinkedIn, WhatsApp)

Etiquetas `og:` que controlan cómo se ve el enlace al compartirlo en redes sociales:

| Meta | Valor | Propósito |
|------|-------|-----------|
| `og:locale` | `es_PE` | Idioma y región del contenido |
| `og:type` | `website` | Tipo de recurso |
| `og:title` | Título de la marca | Encabezado al compartir |
| `og:description` | Resumen de servicios | Texto bajo el título |
| `og:image` | `assets/portada.jpg` | Vista previa visual |
| `og:image:alt` | Texto alternativo | Accesibilidad de la imagen |
| `og:site_name` | Nombre del sitio | Identificador de marca |

#### Twitter Card

Etiquetas `twitter:` para la tarjeta de previsualización en X (Twitter):

| Meta | Valor |
|------|-------|
| `twitter:card` | `summary_large_image` — tarjeta con imagen grande |
| `twitter:title` | Mismo título de la marca |
| `twitter:description` | Resumen corto del servicio |
| `twitter:image` | `assets/portada.jpg` |

#### Datos estructurados (JSON-LD / Schema.org)

Un bloque `<script type="application/ld+json">` que Google lee para entender qué tipo de negocio es:

```json
{
  "@context": "https://schema.org",
  "@type": "AccountingService",
  "name": "CNJ - Integridad Contable",
  "serviceType": ["Gestión Tributaria SUNAT", "Contabilidad Integral", "Asesoría Financiera"],
  "sameAs": ["facebook.com/...", "instagram.com/...", "linkedin.com/..."]
}
```

- **`@type: AccountingService`** — tipo específico de negocio contable en Schema.org.
- **`serviceType`** — lista los 3 servicios para Google Knowledge Panel.
- **`sameAs`** — vincula redes sociales para unificar la presencia digital.
- También incluye `logo`, `email`, `areaServed` y `slogan`.

#### Recursos externos

| Recurso | Detalle |
|---------|---------|
| `preconnect` a Google Fonts | Acelera la carga de la tipografía conectando antes al servidor. |
| Google Fonts (Fira Sans) | Tipografía sans-serif moderna, legible y profesional. |
| `css/styles.css` | Toda la apariencia visual del sitio. |

**Tipografía elegida:** *Fira Sans* — acorde a una firma contable profesional.

---

### 2.2 Header — Encabezado fijo

**Requisito del avance:** encabezado con logo y nombre de la empresa.

**Ubicación en HTML:** líneas 18–44 de `index.html`.

#### ¿Qué contiene?

El header tiene tres zonas dentro de `.header__inner`:

```
[ Logo + nombre ]  [ Nav: Inicio | Nosotros | ... ]  [ Contáctenos | ☰ ]
```

1. **Logo (`<a class="logo">`)** — Imagen `logo3.png` + texto con nombre y tagline "Confianza y Precisión". Al hacer clic lleva a `#inicio`.
2. **Navegación (`<nav id="nav">`)** — Seis enlaces internos. El enlace activo lleva la clase `nav__link--active` (se actualiza con JS al hacer scroll).
3. **Acciones (`header__actions`)** — Botón dorado "Contáctenos" y botón hamburguesa (solo móvil).

#### HTML relevante

```html
<header class="header">
  <div class="container header__inner">
    <a href="#inicio" class="logo">...</a>
    <nav class="nav" id="nav">...</nav>
    <div class="header__actions">...</div>
  </div>
</header>
```

- `<header>` es etiqueta semántica (no un `<div>` genérico).
- `id="nav"` e `id="menuToggle"` permiten que JavaScript los encuentre fácilmente.

#### CSS — cómo se ve y comporta

| Regla / clase | Efecto |
|---------------|--------|
| `.header` | `position: sticky; top: 0` → se queda pegado arriba al hacer scroll. |
| Fondo `rgba(255,255,255,0.92)` + `backdrop-filter: blur(10px)` | Efecto "cristal" semitransparente sobre el contenido que pasa debajo. |
| `.header--scrolled` | JS la añade al bajar >12px: borde inferior y sombra para separarlo del contenido. |
| `.nav__link::after` | Línea dorada animada bajo el enlace al hover o cuando está activo. |
| `.menu-toggle` | `display: none` en desktop; visible solo en `@media (max-width: 768px)`. |

#### JavaScript — qué hace aquí

- **Menú hamburguesa:** al clic, alterna `.nav--open` en el nav y `.is-open` en el botón. Las dos barras del botón rotan formando una "X".
- **Nav activo:** `updateActiveNav()` recorre las secciones y marca el enlace cuyo `href` coincide con la sección visible.
- **Al navegar:** cualquier clic en un enlace del menú cierra el menú móvil con `closeMenu()`.

#### Responsive

| Pantalla | Comportamiento |
|----------|----------------|
| Desktop | Nav horizontal visible; hamburguesa oculta. |
| ≤768px | Nav oculto; hamburguesa visible. Al abrir, nav aparece en columna debajo del header. |
| ≤480px | Se oculta el botón "Contáctenos" del header para ganar espacio (el contacto sigue en el menú y footer). |

---

### 2.3 Portada — Hero principal

**Requisito del avance:** portada principal con imagen de fondo y texto superpuesto.

**Ubicación:** `<section class="cover" id="inicio">` (líneas 47–68).

#### Estructura interna

```
.cover
├── .cover__bg
│   ├── img.cover__image     ← Foto de fondo (portada.jpg)
│   └── .cover__overlay      ← Capa oscura encima de la foto
└── .container.cover__inner
    └── .cover__content
        ├── .cover__eyebrow   ← Texto pequeño superior
        ├── h1.cover__title   ← Título principal (único h1 de la página)
        ├── p.cover__text     ← Párrafo descriptivo
        └── .cover__actions   ← Dos botones
```

#### ¿Por qué esta estructura?

- La imagen y el overlay van en un contenedor **absoluto** (`cover__bg`) que llena toda la sección.
- El texto va en otro contenedor con `position: relative; z-index: 1` para quedar **encima** de la imagen.
- Solo hay un `<h1>` en toda la página (buena práctica SEO: un título principal por página).

#### CSS — detalles visuales

| Elemento | Estilo clave |
|----------|--------------|
| `.cover` | Altura `clamp(480px, 72vh, 680px)` — crece con la ventana pero con límites. |
| `.cover__image` | `object-fit: cover` llena el espacio sin deformarse; animación **Ken Burns** (zoom lento 18s). |
| `.cover__overlay` | Gradiente diagonal oscuro (105deg) para que el texto blanco sea legible sobre la foto. |
| `.cover__eyebrow` | Dorado claro, mayúsculas, letter-spacing — estilo "etiqueta" corporativa. |
| `.cover__title` | `clamp(2rem, 4.5vw, 3.2rem)` — tamaño fluido según ancho de pantalla. |
| `.btn-cta` | Fondo dorado, texto blanco, bordes redondeados (pill). |
| `.btn-ghost` | Transparente con borde blanco semitransparente — contraste sobre el hero oscuro. |

#### Animaciones de entrada

Al cargar la página, los hijos de `.cover__content` entran uno tras otro con `fadeInUp` (suben y aparecen):

- Eyebrow → delay 0s  
- Título → 0.12s  
- Texto → 0.24s  
- Botones → 0.36s  

Esto da sensación de presentación profesional sin depender de JavaScript.

#### JavaScript

- `id="inicio"` es el destino de "Inicio", logo y botón volver arriba.
- `scrollToInicio()` usa `inicioSection.scrollIntoView({ behavior: 'smooth' })`.
- Al hacer clic en enlaces hacia `#inicio`, se llama `clearHash()` para no dejar `#inicio` en la URL.

#### Responsive

En móvil (≤768px) el gradiente del overlay pasa a vertical (de arriba abajo) y los botones se apilan al 100% de ancho.

---

### 2.4 Nosotros — Información de la empresa

**Requisito del avance:** información de la empresa y su rubro (texto descriptivo).

**Ubicación:** `<section class="about" id="empresa">` (líneas 71–116).

#### Contenido en dos bloques

**Bloque 1 — Intro (`about__intro`):** dos párrafos centrados que explican:
- Qué hace CNJ (contabilidad, tributación, asesoría, auditoría).
- A qué rubro pertenece (contabilidad, finanzas, consultoría empresarial).
- Mención de NIIF y normativa tributaria peruana.

**Bloque 2 — Valores (`about__values`):** cuatro tarjetas en grid:

| # | Valor | Mensaje |
|---|-------|---------|
| 01 | Honestidad | Transparencia en informes |
| 02 | Integridad | Ética profesional |
| 03 | Profesionalismo | Estándares técnicos |
| 04 | Confidencialidad | Protección de datos |

Cada valor es un `<article>` semántico (contenido independiente).

#### Patrón reutilizable: encabezado de sección

```html
<header class="section-header">
  <span class="section-tag">Sobre nosotros</span>
  <h2 class="section-title">Información de la Empresa y su Rubro</h2>
</header>
```

Este mismo patrón se repite en Servicios, Video y Clientes:
- `.section-tag` — etiqueta dorada en mayúsculas.
- `.section-title` — título grande navy.
- `.section-subtitle` — párrafo opcional gris (solo en algunas secciones).

#### CSS

| Clase | Comportamiento |
|-------|----------------|
| `.about` | Padding vertical 5.5rem; fondo blanco. |
| `.about__intro` | Max-width 720px centrado; texto en color `--muted`. |
| `.about__values` | Grid de 4 columnas iguales en desktop. |
| `.about__value` | Fondo gris claro, borde, hover sube 4px con sombra. |
| `.about__value-num` | Número "01"…"04" en dorado, decorativo (`aria-hidden="true"`). |

#### JavaScript — animación reveal

Los elementos `.about__intro`, `.about__value` y `.section-header` reciben la clase `.reveal` al cargar. Cuando entran en pantalla, el Intersection Observer añade `.is-visible` y aparecen con fade-in. Los valores tienen **delays escalonados** (0, 0.08s, 0.16s, 0.24s) para un efecto cascada.

#### Responsive

| Breakpoint | Grid de valores |
|------------|-----------------|
| Desktop | 4 columnas |
| ≤1024px | 2×2 |
| ≤480px | 1 columna |

---

### 2.5 Servicios — Tres productos

**Requisito del avance:** 3 productos o servicios con imagen, descripción y precio.

**Ubicación:** `<section class="services" id="servicios">` (líneas 119–167).

#### Cada tarjeta (`service-card`) incluye

```
┌─────────────────────────┐
│ [01]                    │  ← Badge numérico (absolute)
│ ┌─────────────────────┐ │
│ │     IMAGEN          │ │  ← 180px alto, object-fit cover
│ └─────────────────────┘ │
│ Título del servicio     │
│ Descripción larga...    │
│ Desde S/ XXX / mes      │  ← Precio en dorado
└─────────────────────────┘
```

| Servicio | Imagen | Precio |
|----------|--------|--------|
| Gestión Tributaria SUNAT | producto-1.jpg | S/ 350 / mes |
| Contabilidad Integral | producto-2.jpg | S/ 500 / mes |
| Asesoría Financiera | producto-3.jpg | S/ 800 / mes |

#### HTML

Cada servicio es un `<article class="service-card">` — semánticamente correcto porque es contenido autocontenido.

El badge `<span class="service-card__number">01</span>` va **fuera** del flujo normal; CSS lo posiciona con `position: absolute; top: 1rem; left: 1rem`.

#### CSS — interacciones

| Estado | Efecto |
|--------|--------|
| Normal | Sombra suave, borde gris claro. |
| Hover tarjeta | Sube 6px, sombra más grande, borde dorado tenue. |
| Hover imagen | Zoom interno `scale(1.06)` con transición 0.5s. |
| Precio | Color `--gold`, peso bold, padding con border-radius. |

#### JavaScript

Las tres `.service-card` tienen `.reveal` con delays 0s, 0.1s y 0.2s al aparecer en scroll.

#### Responsive

| Breakpoint | Columnas |
|------------|----------|
| Desktop | 3 |
| ≤1024px | 2 (la tercera baja sola) |
| ≤768px | 1 (apiladas) |

---

### 2.6 Video — Sección institucional

**Requisito del avance:** video integrado en la página.

**Ubicación:** `<section class="video-section" id="video">` (líneas 170–215).

#### Layout de dos columnas

```
┌──────────────────────┬─────────────────┐
│                      │ Lo que hacemos  │
│   REPRODUCTOR        │ • SUNAT         │
│   (16:9, borde gold) │ • Contabilidad  │
│                      │ • Asesoría      │
└──────────────────────┴─────────────────┘
     1.4fr                    1fr
```

#### HTML del video

```html
<video controls playsinline preload="metadata" poster="assets/portada.jpg">
  <source src="assets/video-cnj.mp4" type="video/mp4">
  Tu navegador no admite la reproducción de video.
</video>
```

| Atributo | Propósito |
|----------|-----------|
| `controls` | Muestra play, volumen, barra de progreso nativos del navegador. |
| `playsinline` | En iPhone evita que el video abra pantalla completa automáticamente. |
| `preload="metadata"` | Solo carga duración y poster al inicio (ahorra datos). |
| `poster` | Imagen de portada antes de dar play. |
| Texto fallback | Mensaje si el navegador no soporta `<video>`. |

El video (`assets/video-cnj.mp4`) se generó con el script Python `scripts/generate_video.py` (diapositivas + narración TTS). En el navegador solo se reproduce el MP4 final.

#### Columna informativa

Lista `<ul class="video-section__list">` con tres ítems. Cada `<li>` tiene:
- `<strong>` — título del servicio.
- `<span>` — descripción breve.

Borde izquierdo dorado de 3px; al hover el ítem se desplaza 6px a la derecha.

#### CSS

- Sección con fondo `--gray` (gris claro) para alternar con secciones blancas.
- `.video-section__player`: `aspect-ratio: 16/9`, borde dorado 3px, sombra grande.
- Video con `object-fit: cover` dentro del contenedor.

#### JavaScript

`.video-section__player` y `.video-section__info` tienen animación reveal (info con delay 0.15s).

#### Responsive

En ≤1024px el grid pasa a **1 columna**: video arriba, texto abajo.

---

### 2.7 Clientes — Testimonios referenciales

**Requisito del avance:** 2 clientes referenciales con imagen e información.

**Ubicación:** `<section class="testimonials" id="clientes">` (líneas 218–267).

#### Estructura de cada testimonio

```
┌────────────────────────────────────────┐
│ Rubro: Minimarket "Los Pinos" — ...    │  ← Dorado, pequeño
│ Descripción del trabajo realizado...   │  ← Gris, contexto
│ "Cita del cliente entre comillas..."   │  ← Itálica, cuerpo principal
│ ─────────────────────────────────────  │
│ [Avatar]  Nombre                       │
│           Cargo — Empresa              │
└────────────────────────────────────────┘
```

#### Clientes ficticios

1. **Juan Pérez** — Dueño de Minimarket "Los Pinos" (comercio minorista).
2. **Ing. Ana Echevarría** — Gerente de Constructora Echevarría S.A.C. (construcción).

Los avatares vienen de **Unsplash** (URLs externas con parámetros de recorte `w=100&h=100&fit=crop&crop=face`).

#### CSS

| Clase | Estilo |
|-------|--------|
| `.testimonial-card` | Fondo gris, padding generoso, borde, hover con elevación. |
| `.testimonial-card__rubro` | Dorado, 0.82rem — identifica sector del cliente. |
| `.testimonial-card__text` | Itálica — distingue la cita del resto. |
| `.testimonial-card__avatar` | 48×48px, circular (`border-radius: 50%`). |
| `.testimonial-card__footer` | Flexbox: avatar + nombre/cargo separados por línea superior. |

#### JavaScript

Dos tarjetas con reveal; la segunda tiene delay 0.12s.

#### Responsive

Grid 2 columnas en desktop → 1 columna en móvil.

---

### 2.8 Footer — Pie de página (contacto)

**Requisito del avance:** footer con 3 columnas — redes + UTP | contacto integrante | 3 páginas del rubro.

**Ubicación:** `<footer class="footer" id="contacto">` (líneas 270–341).

El footer también tiene `id="contacto"` porque el menú "Contacto" y el botón "Contáctenos" apuntan aquí.

#### Las tres columnas

**Columna 1 — Marca, redes y UTP**

```
[Logo CNJ]
Redes sociales: [FB] [IG] [LinkedIn]
[Logo UTP] Universidad Tecnológica del Perú
           Marcos de Desarrollo Web — 48308
```

- Redes con iconos PNG locales (`red-facebook.png`, etc.).
- Enlaces externos con `target="_blank"` y `rel="noopener noreferrer"` (seguridad al abrir pestaña nueva).
- Bloque UTP cumple requisito académico de identificar universidad y curso.

**Columna 2 — Contacto integrante**

```
CONTACTO INTEGRANTE
Nombre    Jesús Manuel Mechan Gonzales
Correo    jesus.mechan@utp.edu.pe
```

- Correo con `<a href="mailto:...">` para abrir cliente de email al clic.

**Columna 3 — Páginas del rubro contable**

Referencias a firmas reales del sector:

| Logo | Empresa | Enlace |
|------|---------|--------|
| logo_pwc.png | PwC Perú | pwc.com/pe |
| logo_ey.png | EY Perú | ey.com/es_pe |
| logo_kpmg.png | KPMG Perú | kpmg.com/pe |

Cada enlace muestra logo + nombre; hover desplaza 4px a la derecha y cambia color a dorado.

#### Barra inferior

`.footer__bottom` — franja gris con copyright centrado: `© 2026 CNJ - Integridad Contable`.

#### CSS extra

- Línea decorativa dorada en la parte superior del footer (`::before` con gradiente).
- Grid `1.3fr 1fr 1.1fr` — primera columna un poco más ancha por el logo y redes.

#### JavaScript

Las tres `.footer__col` tienen animación reveal al hacer scroll hasta el final.

#### Responsive

| Breakpoint | Layout |
|------------|--------|
| Desktop | 3 columnas |
| ≤1024px | Col 1 ocupa ancho completo arriba; cols 2 y 3 abajo en 2 columnas |
| ≤768px | Todo apilado en 1 columna |

---

### 2.9 Botón "Volver arriba"

**Ubicación:** fuera del footer, antes de `<script>` (líneas 343–347).

Botón flotante fijo abajo a la derecha con ícono SVG de flecha hacia arriba (inline en HTML, no archivo externo).

#### Comportamiento

| Estado | CSS |
|--------|-----|
| Oculto (inicio/medio de página) | `opacity: 0`, `pointer-events: none`, desplazado 12px abajo |
| Visible (cerca del final) | Clase `.is-visible` — aparece con transición |
| Hover | Fondo dorado, texto navy, sube 3px |

#### JavaScript

```javascript
const nearEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 120;
backToTop.classList.toggle('is-visible', nearEnd);
```

Solo aparece cuando faltan ~120px para el final de la página. Al clic: scroll suave a `#inicio` y limpia el hash de la URL.

---

## 3. CSS global — `css/styles.css`

Además de lo explicado por sección, el CSS tiene capas transversales.

### 3.1 Variables CSS (`:root`)

Centralizan colores, sombras, radios y tiempos de animación. Ejemplo: cambiar `--gold` actualiza botones, enlaces activos, acentos y bordes en todo el sitio.

### 3.2 Reset y utilidades

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
```

- **`box-sizing: border-box`** — padding y border no suman al ancho total (evita sorpresas en layouts).
- **`.container`** — ancho máximo ~1120px, centrado, usado en casi todas las secciones.
- **`scroll-margin-top: 5.5rem`** en secciones con `id` — al navegar, el título no queda tapado por el header sticky.

### 3.3 Metodología BEM-like

| Tipo | Ejemplo | Significado |
|------|---------|-------------|
| Bloque | `.header` | Componente independiente |
| Elemento | `.header__inner` | Parte del bloque |
| Modificador | `.nav__link--active` | Variante del elemento |

Ventaja: nombres predecibles; `.cover__title` no choca con `.service-card__title`.

### 3.4 Animaciones reveal (CSS + JS)

**CSS define el estado:**
```css
.reveal { opacity: 0; transform: translateY(28px); transition: ... }
.reveal.is-visible { opacity: 1; transform: translateY(0); }
```

**JS añade `.reveal` y observa cuándo mostrar:**
- Intersection Observer detecta entrada en viewport.
- Añade `.is-visible` una sola vez (`unobserve` después).

**Accesibilidad:** `@media (prefers-reduced-motion: reduce)` desactiva animaciones para usuarios que lo prefieren en el sistema operativo.

### 3.5 Breakpoints responsive (resumen)

| Ancho | Cambios globales |
|-------|------------------|
| ≤1024px | Grids pasan de 3–4 cols a 2; video y footer se reorganizan |
| ≤768px | Menú hamburguesa; grids a 1 columna; hero con overlay vertical |
| ≤480px | Valores a 1 col; CTA del header oculto |

---

## 4. JavaScript global — `js/main.js`

Un solo archivo, sin imports. Se ejecuta al final del body cuando el DOM ya existe.

### 4.1 Funciones auxiliares

| Función | Qué hace |
|---------|----------|
| `closeMenu()` | Cierra menú móvil y actualiza `aria-expanded` |
| `clearHash()` | Quita `#seccion` de la URL con `history.replaceState` |
| `scrollToInicio()` | Scroll suave al hero |

**¿Por qué `clearHash()`?** El proyecto pide navegación interna sin dejar anclas visibles en la barra de direcciones. El scroll lo hace JavaScript; la URL queda limpia (`/index.html` sin `#servicios`).

### 4.2 Menú hamburguesa

Toggle de clases al clic:
- `nav` → `.nav--open`
- `menuToggle` → `.is-open` + `aria-expanded="true|false"`

CSS transforma las dos barras en "X" cuando `.is-open`.

### 4.3 Navegación por anclas

Escucha clics en todos los `a[href^="#"]` (excepto back-to-top):

1. `preventDefault()` — evita salto brusco y hash en URL.
2. `scrollIntoView({ behavior: 'smooth' })` — scroll animado.
3. `closeMenu()` — cierra menú si estaba abierto en móvil.
4. `clearHash()` — limpia URL.

### 4.4 Intersection Observer (reveal)

```javascript
const revealObserver = new IntersectionObserver(callback, {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
});
```

- **threshold 0.15** — dispara cuando ~15% del elemento es visible.
- **rootMargin negativo abajo** — activa un poco antes de que llegue al borde inferior.

Elementos observados: headers, intro, tarjetas, columnas del footer, reproductor de video.

### 4.5 Scroll: header, nav activo y back-to-top

En cada evento `scroll` y `resize`:

| Función | Acción |
|---------|--------|
| `updateHeader()` | Añade `.header--scrolled` si `scrollY > 12` |
| `updateActiveNav()` | Compara posición de scroll con `offsetTop` de cada sección; marca enlace activo |
| `updateBackToTop()` | Muestra botón flotante cerca del final |

Offset de 120px en `updateActiveNav` compensa la altura del header sticky.

---

## 5. Cómo encajan las tres capas (ejemplo completo)

**Escenario:** usuario en móvil hace clic en "Servicios" con menú abierto.

```
1. Click en <a href="#servicios">
        ↓
2. main.js: event.preventDefault()
        ↓
3. document.getElementById('servicios').scrollIntoView({ smooth })
        ↓
4. closeMenu() → quita nav--open, is-open
        ↓
5. clearHash() → URL sin #
        ↓
6. CSS: scroll-margin-top deja visible el título bajo el header
        ↓
7. onScroll → updateActiveNav marca "Servicios" como activo
        ↓
8. IntersectionObserver → service-cards reciben is-visible (fade in)
```

---

## 6. Assets utilizados

| Archivo | Usado en |
|---------|----------|
| `logo3.png` | Header, footer, favicon |
| `portada.jpg` | Hero, poster del video |
| `producto-1.jpg` … `producto-3.jpg` | Tarjetas de servicios |
| `video-cnj.mp4` | Sección video |
| `red-facebook.png`, `red-instagram.png`, `red-linkedin.png` | Footer redes |
| `logo_utp.png` | Footer académico |
| `logo_pwc.png`, `logo_ey.png`, `logo_kpmg.png` | Footer rubro |

---

## 7. Cómo probar y qué verificar

1. Abrir `index.html` en el navegador.
2. **Desktop:** nav horizontal, hover en enlaces y tarjetas, scroll suave.
3. **Móvil (DevTools F12 → responsive):** menú hamburguesa, grids en 1 columna.
4. **Scroll lento:** animaciones reveal, enlace activo cambia, header gana sombra.
5. **Ir al footer:** botón volver arriba aparece; clic regresa al inicio.
6. **Video:** play, controles nativos, poster antes de reproducir.
7. **URL:** después de navegar por secciones, la barra no debe mostrar `#`.

---

## 8. Resumen para defensa oral (por apartado)

| Apartado | Qué decir en pocas palabras |
|----------|----------------------------|
| **Header** | Sticky con logo, nav de 6 ítems, CTA y hamburguesa en móvil. Nav activo y sombra al scroll vía JS. |
| **Portada** | Hero full-bleed con imagen, overlay, h1 único, botones CTA. Animación Ken Burns y fadeInUp en CSS. |
| **Nosotros** | Texto del rubro + 4 valores en grid. Reveal al scroll con delays escalonados. |
| **Servicios** | 3 `<article>` con imagen, texto y precio. Hover eleva tarjeta y hace zoom en imagen. |
| **Video** | `<video>` nativo MP4 local, layout 2 cols, lista complementaria. Fondo gris alternado. |
| **Clientes** | 2 testimonios con rubro, cita, avatar. Grid 2→1 en móvil. |
| **Footer** | 3 columnas (redes+UTP, contacto, rubro), mailto, enlaces externos seguros. |
| **JS global** | Menú, scroll sin hash, observer, nav activo, año dinámico — todo vanilla, sin librerías. |
| **SEO** | Meta description, Open Graph, Twitter Card, JSON-LD (AccountingService), lazy loading, fetchpriority, `<main>`, skip link. |

---

## 9. SEO y buenas prácticas implementadas

Esta sección documenta todas las optimizaciones de **posicionamiento web (SEO)** y **buenas prácticas de desarrollo** aplicadas al proyecto.

---

### 9.1 ¿Qué es SEO?

**Search Engine Optimization** — conjunto de técnicas para que una página aparezca en las primeras posiciones de buscadores como Google. Se divide en:

- **SEO on-page:** lo que se controla dentro del HTML (metadatos, semántica, rendimiento, accesibilidad).
- **SEO off-page:** backlinks, presencia en redes, reputación externa (no aplica en este avance estático).

---

### 9.2 Metadatos SEO implementados en `<head>`

| Etiqueta | Valor | Para qué sirve |
|----------|-------|-----------------|
| `<meta name="description">` | Descripción con keywords naturales | Google la muestra como snippet en resultados de búsqueda |
| `<meta name="robots">` | `index, follow` | Permite que los bots indexen la página y sigan los enlaces |
| `<meta name="author">` | Nombre del estudiante | Identifica al creador del contenido |
| `<meta name="theme-color">` | `#243447` (navy) | Color de la barra del navegador en Android/Chrome |
| `<meta name="format-detection">` | Desactiva autodetección | Evita que iOS convierta números y correos en links automáticos |

**Buenas prácticas aplicadas:**
- La `description` tiene ~155 caracteres (longitud óptima para snippet de Google).
- Incluye **keywords naturales** del rubro: "contabilidad", "SUNAT", "libros electrónicos", "asesoría financiera", "MYPE", "Perú".
- El `<title>` combina marca + tagline: `CNJ - Integridad Contable | Confianza y Precisión`.

---

### 9.3 Open Graph y Twitter Card

Controlan cómo se ve la página al compartir el enlace en redes sociales:

**Open Graph** (Facebook, LinkedIn, WhatsApp):
```html
<meta property="og:locale" content="es_PE">
<meta property="og:type" content="website">
<meta property="og:title" content="CNJ - Integridad Contable | Confianza y Precisión">
<meta property="og:description" content="Servicios contables... para empresas en Perú.">
<meta property="og:image" content="assets/portada.jpg">
<meta property="og:site_name" content="CNJ - Integridad Contable">
```

**Twitter Card** (X):
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="assets/portada.jpg">
```

Sin estas etiquetas, al compartir el link se vería solo la URL. Con ellas se muestra una **tarjeta visual** con imagen, título y descripción.

---

### 9.4 Datos estructurados (JSON-LD / Schema.org)

Bloque `<script type="application/ld+json">` que Google lee para entender el tipo de negocio:

```json
{
  "@context": "https://schema.org",
  "@type": "AccountingService",
  "name": "CNJ - Integridad Contable",
  "serviceType": [
    "Gestión y Declaración Tributaria SUNAT",
    "Contabilidad Integral y Libros Electrónicos",
    "Asesoría Financiera y Planificación Fiscal"
  ],
  "sameAs": ["facebook.com/...", "instagram.com/...", "linkedin.com/..."]
}
```

| Propiedad | Propósito |
|-----------|-----------|
| `@type: AccountingService` | Google identifica el sitio como firma contable |
| `serviceType` | Lista los 3 servicios para el Knowledge Panel |
| `sameAs` | Vincula las redes sociales de la empresa |
| `logo`, `image` | Imágenes de la marca para resultados enriquecidos |
| `areaServed` | Región de operación (Perú) |
| `slogan` | Lema "Confianza y Precisión" |

**Beneficio:** Google puede mostrar resultados enriquecidos (rich snippets) con logo, servicios y redes al buscar "CNJ Integridad Contable".

---

### 9.5 Semántica HTML y accesibilidad (afectan SEO)

Google premia las páginas bien estructuradas y accesibles:

| Práctica | Implementación | Beneficio SEO |
|----------|----------------|---------------|
| Un solo `<h1>` por página | El título del hero | Google identifica el tema principal |
| Jerarquía de encabezados | `<h1>` → `<h2>` → `<h3>` sin saltos | Estructura clara para rastreo |
| Etiquetas semánticas | `<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>` | Bots entienden la estructura |
| Landmark `<main>` | Envuelve todo el contenido entre header y footer | Indica dónde está el contenido principal |
| Enlace "Saltar al contenido" | `<a href="#contenido-principal" class="sr-only">` | Accesibilidad y WCAG; visible solo al foco de teclado |
| `alt` descriptivo en imágenes | "Gestión y Declaración Tributaria SUNAT" en vez de "imagen1" | Google Images indexa el texto alternativo |
| `aria-label` en botones/video | Menú, volver arriba, video | Lectores de pantalla pueden describir elementos |
| `aria-expanded` en hamburguesa | JS lo actualiza dinámicamente | Estado del menú comunicado a tecnologías asistivas |

---

### 9.6 Rendimiento (Core Web Vitals → afecta ranking)

Google usa métricas de rendimiento para posicionar páginas. Optimizaciones aplicadas:

| Técnica | Dónde | Qué mejora |
|---------|-------|------------|
| `fetchpriority="high"` | Imagen del hero (`portada.jpg`) | **LCP** — el navegador prioriza la descarga de la imagen más importante |
| `loading="lazy"` | Todas las imágenes fuera del viewport inicial (servicios, testimonios, footer) | **Carga inicial** — no descarga lo que no se ve; ahorra datos |
| `decoding="async"` | Mismas imágenes lazy | **Render** — decodifica en background sin bloquear el hilo principal |
| `preconnect` a Google Fonts | `<link rel="preconnect">` | **FCP** — conexión anticipada reduce latencia de la tipografía |
| `preload="metadata"` en `<video>` | Solo carga duración/poster, no el video completo | **Peso inicial** — el MP4 solo se descarga al dar play |
| CSS externo (no inline) | Un solo archivo `styles.css` | **Caché** — el navegador lo guarda; en visitas sucesivas no lo vuelve a descargar |
| JS al final del `<body>` | `<script src="js/main.js">` | **Render** — el HTML y CSS se pintan sin esperar a JavaScript |
| `referrerpolicy="no-referrer"` | Avatares de Unsplash | **Privacidad y velocidad** — no envía la URL del sitio al servidor externo |

**Métricas clave de Google (Core Web Vitals):**
- **LCP** (Largest Contentful Paint) — cuánto tarda en pintarse el contenido principal → `fetchpriority="high"` ayuda.
- **FID/INP** (Interaction to Next Paint) — respuesta a interacciones → JS liviano y `{ passive: true }` en scroll.
- **CLS** (Cumulative Layout Shift) — saltos visuales → las imágenes tienen `max-width: 100%; height: auto` para no "empujar" contenido.

---

### 9.7 Seguridad y enlaces externos

| Práctica | Implementación | Propósito |
|----------|----------------|-----------|
| `target="_blank"` + `rel="noopener noreferrer"` | Todos los enlaces externos (redes, UTP, PwC, EY, KPMG) | La pestaña nueva no puede acceder a `window.opener`; no envía referrer |
| HTTPS en enlaces | Todas las URLs externas usan `https://` | Seguridad en la navegación del usuario |

---

### 9.8 Año dinámico en copyright

```html
<p>&copy; <span id="currentYear"></span> CNJ - Integridad Contable...</p>
```
```javascript
document.getElementById('currentYear').textContent = new Date().getFullYear();
```

El año se actualiza **automáticamente** sin editar HTML. Si JavaScript está desactivado, el `<span>` queda vacío pero el copyright sigue legible.

---

### 9.9 Qué falta para producción (fuera del avance)

Estas mejoras aplicarían si el sitio se despliega con dominio propio:

| Mejora | Descripción |
|--------|-------------|
| `<link rel="canonical">` | URL canónica para evitar contenido duplicado (requiere dominio real) |
| `robots.txt` | Indica a bots qué pueden y qué no pueden rastrear |
| `sitemap.xml` | Mapa del sitio en formato XML para Google Search Console |
| Imágenes WebP/AVIF | Formatos más ligeros que JPG/PNG con mejor compresión |
| Minificación CSS/JS | Reducir peso eliminando espacios y comentarios |
| CDN | Servir recursos desde servidores distribuidos cerca del usuario |
| HTTPS propio | Certificado SSL para el dominio (Google prioriza HTTPS) |
| Google Search Console | Verificar indexación y monitorear errores |
| Google Analytics | Medir tráfico, comportamiento y conversiones |

---

## 10. Preguntas y respuestas (temario del curso)

Esta sección responde posibles preguntas del docente según el **temario de evaluación**, siempre relacionadas con el proyecto CNJ.

---

### 10.1 Variables, datos e información

**P: ¿Qué es una variable en programación?**  
R: Es un espacio con nombre que guarda un valor que puede cambiar durante la ejecución del programa. En JavaScript se declara con `const` o `let`.

**P: ¿Qué variables usa tu proyecto?**  
R: En `main.js` hay varias, por ejemplo:

```javascript
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const header = document.querySelector('.header');
let currentId = 'inicio';  // dentro de updateActiveNav()
```

- `menuToggle`, `nav`, `header` guardan referencias a elementos HTML del DOM.
- `currentId` guarda el id de la sección visible para marcar el enlace activo del menú.

**P: ¿Qué diferencia hay entre dato e información?**  
R: Un **dato** es un valor aislado (un número, un texto, un true/false). La **información** es el dato con contexto y significado. Por ejemplo, `350` es un dato; `"Desde S/ 350 / mes"` en la tarjeta de servicios es información porque comunica el precio del servicio tributario.

**P: ¿Qué es `const` y por qué lo usaste?**  
R: `const` declara una constante: no se puede reasignar después. Se usa para elementos del DOM que no cambian (`nav`, `header`) y para funciones auxiliares. Solo se usa `let` cuando el valor sí cambia, como `currentId`.

---

### 10.2 Tipos de datos

**P: ¿Qué tipos de datos existen en JavaScript?**  
R: Los principales son:

| Tipo | Ejemplo en el proyecto |
|------|------------------------|
| **String** (texto) | `'inicio'`, `'#servicios'`, `'aria-expanded'` |
| **Number** (número) | `120`, `12`, `0.15` (threshold del observer) |
| **Boolean** (verdadero/falso) | `true` / `false` en `open`, `entry.isIntersecting` |
| **Object** (objeto) | `{ behavior: 'smooth', block: 'start' }` en scrollIntoView |
| **Undefined** | Cuando un elemento no existe y `getElementById` no lo encuentra |
| **DOM Element** | Lo que devuelve `document.getElementById('nav')` |

**P: ¿Qué tipo de dato devuelve `document.querySelectorAll('.nav__link')`?**  
R: Devuelve una **NodeList** (lista de nodos del DOM), similar a un arreglo. Por eso se puede usar `.forEach()` para recorrer cada enlace del menú.

**P: ¿Qué tipos de datos hay en HTML/CSS?**  
R: En HTML los datos son principalmente **texto** (contenido de párrafos, títulos) y **atributos** (href, src, alt, id). En CSS los valores pueden ser strings (`"Fira Sans"`), números con unidad (`5.5rem`, `768px`), colores (`#c9a227`) o funciones (`clamp()`, `rgba()`).

---

### 10.3 Métodos o funciones

**P: ¿Qué es una función?**  
R: Es un bloque de código reutilizable con un nombre que ejecuta una tarea. Puede recibir parámetros y devolver un resultado.

**P: ¿Qué funciones creaste en tu proyecto?**  
R: En `main.js`:

| Función | Qué hace |
|---------|----------|
| `closeMenu()` | Cierra el menú móvil y actualiza accesibilidad |
| `clearHash()` | Limpia el `#` de la URL |
| `scrollToInicio()` | Hace scroll suave al inicio |
| `updateBackToTop()` | Muestra u oculta el botón flotante |
| `updateHeader()` | Añade sombra al header al hacer scroll |
| `updateActiveNav()` | Marca el enlace activo del menú |
| `onScroll()` | Llama a updateHeader y updateActiveNav |

**P: ¿Qué es un método?**  
R: Es una función que pertenece a un objeto. Ejemplos usados en el proyecto:

```javascript
nav.classList.toggle('nav--open');           // método del objeto classList
target.scrollIntoView({ behavior: 'smooth' }); // método del elemento DOM
link.addEventListener('click', handler);      // método de document/element
entries.forEach((entry) => { ... });          // método del arreglo/NodeList
history.replaceState(null, '', url);          // método del objeto history
```

**P: ¿Qué es una función flecha (`=>`)?**  
R: Es una forma moderna de escribir funciones en JavaScript. Ejemplo del proyecto:

```javascript
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('nav--open');
});
```

Equivale a una función anónima, pero con sintaxis más corta.

---

### 10.4 Estructuras de programación

#### Estructura secuencial

**P: ¿Qué es la estructura secuencial?**  
R: Es cuando las instrucciones se ejecutan **una tras otra**, en orden, de arriba hacia abajo.

**P: ¿Dónde se ve en tu código?**  
R: Al cargar `main.js`, primero se obtienen las referencias al DOM, luego se definen funciones, después se registran event listeners y al final se llama `onScroll()`. Ese flujo es secuencial:

```
1. const menuToggle = ...
2. const closeMenu = () => { ... }
3. menuToggle.addEventListener(...)
4. document.querySelectorAll(...).forEach(...)
5. onScroll()  ← ejecuta updateHeader + updateActiveNav al cargar
```

#### Estructura condicional

**P: ¿Qué es una estructura condicional?**  
R: Ejecuta código **solo si se cumple una condición** (`if`, `else if`, `else`).

**P: ¿Qué condicionales usa tu proyecto?**  
R: Ejemplos reales:

```javascript
// Solo cierra menú si existen nav y menuToggle
if (nav && menuToggle) { ... }

// Si el destino es inicio, scroll especial
if (id === 'inicio') {
  event.preventDefault();
  scrollToInicio();
  return;
}

// Si el elemento entra en pantalla, mostrarlo
if (entry.isIntersecting) {
  entry.target.classList.add('is-visible');
}

// Header con sombra solo si scroll > 12px
header.classList.toggle('header--scrolled', window.scrollY > 12);

// Animaciones solo si el usuario NO prefiere movimiento reducido
if (!prefersReducedMotion) { ... } else { ... }
```

**P: ¿Qué es el operador ternario?**  
R: Es un `if` corto en una línea: `condición ? valorSiTrue : valorSiFalse`. En el proyecto se usa indirectamente con `.classList.toggle('clase', condición)`, que añade la clase si la condición es true y la quita si es false.

#### Estructura repetitiva

**P: ¿Qué es una estructura repetitiva?**  
R: Ejecuta un bloque de código **varias veces** (bucles: `for`, `forEach`, `while`).

**P: ¿Qué bucles usa tu proyecto?**  
R:

```javascript
// Recorre TODOS los enlaces internos (#)
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', ...);
});

// Recorre cada entrada del Intersection Observer
entries.forEach((entry) => { ... });

// Recorre secciones para saber cuál está activa
sections.forEach((section) => {
  if (section.offsetTop <= scrollPos) {
    currentId = section.id;
  }
});

// Recorre enlaces del nav para marcar el activo
navLinks.forEach((link) => {
  link.classList.toggle('nav__link--active', href === `#${currentId}`);
});
```

**P: ¿Por qué usas `forEach` y no `for`?**  
R: `forEach` es más legible cuando se recorre una lista de elementos del DOM. En este proyecto no se necesita un índice numérico, solo procesar cada elemento.

---

### 10.5 Lenguajes de programación: HTML, CSS y JavaScript

#### HTML

**P: ¿Qué es HTML y para qué sirve en tu proyecto?**  
R: **HyperText Markup Language** — lenguaje de marcado que define la **estructura y contenido** de la página. En CNJ organiza header, secciones, artículos, footer, imágenes, video y enlaces. No define colores ni comportamiento; solo el esqueleto semántico.

**P: ¿Qué etiquetas semánticas usaste?**  
R: `<header>`, `<nav>`, `<section>`, `<article>`, `<footer>`, `<h1>`–`<h4>`, `<p>`, `<ul>`, `<li>`, `<video>`, `<img>`, `<a>`. Ayudan a lectores de pantalla, SEO y mantenimiento del código.

**P: ¿Qué es un atributo HTML?**  
R: Información extra en una etiqueta. Ejemplos del proyecto: `id="servicios"`, `class="service-card"`, `href="#contacto"`, `alt="Logo CNJ"`, `aria-label="Abrir menú"`.

#### CSS

**P: ¿Qué es CSS y para qué sirve?**  
R: **Cascading Style Sheets** — define **presentación visual**: colores, tipografías, tamaños, layout, animaciones y responsive. En CNJ está todo en `css/styles.css`.

**P: ¿Qué técnicas de CSS usaste?**  
R:
- **Variables CSS** (`:root`) para la paleta navy + gold.
- **Flexbox** para header, botones, footer social.
- **Grid** para servicios (3 cols), valores (4 cols), testimonios (2 cols).
- **Media queries** para tablet (1024px), móvil (768px) y móvil pequeño (480px).
- **Transiciones y keyframes** para hover, reveal y Ken Burns.
- **Position** sticky (header), fixed (back-to-top), absolute (overlay del hero).

**P: ¿Qué es responsive design?**  
R: Diseño que se adapta a distintos tamaños de pantalla. En el proyecto el menú pasa de horizontal a hamburguesa, los grids de 3–4 columnas bajan a 1, y los botones del hero se apilan en móvil.

#### JavaScript

**P: ¿Qué es JavaScript y qué hace en tu página?**  
R: Lenguaje de programación que corre en el **navegador** y añade **comportamiento dinámico**: menú móvil, scroll suave, nav activo, animaciones al scroll y botón volver arriba. Sin JS la página se vería igual pero no sería interactiva.

**P: ¿Qué es el DOM?**  
R: **Document Object Model** — representación en memoria del HTML que JavaScript puede leer y modificar. Por eso `document.getElementById('nav')` devuelve el `<nav>` real de la página y se le pueden añadir clases o eventos.

**P: ¿Qué es un event listener?**  
R: Escucha un evento del usuario (clic, scroll, resize) y ejecuta una función. Ejemplo:

```javascript
window.addEventListener('scroll', onScroll, { passive: true });
```

**P: ¿Por qué no usaste jQuery ni React?**  
R: El avance pide tecnologías base del curso. El sitio es estático y pequeño; JavaScript vanilla es suficiente y no añade dependencias.

---

### 10.6 Base de datos

**P: ¿Tu proyecto usa base de datos?**  
R: **No.** Es un sitio web **estático**: todo el contenido (textos, imágenes, video) está en archivos HTML, CSS, JS y la carpeta `assets/`. No hay login, formularios que guarden datos ni servidor backend.

**P: ¿Qué es una base de datos?**  
R: Sistema organizado para **almacenar, consultar y modificar datos** de forma persistente. Ejemplos: MySQL, PostgreSQL, MongoDB. Se usa cuando hay usuarios registrados, productos en tienda online, blog con artículos dinámicos, etc.

**P: ¿Dónde están los “datos” de CNJ entonces?**  
R: Directamente en el HTML (servicios, testimonios, contacto) y en archivos multimedia (`assets/`). Si en un avance futuro hubiera formulario de contacto con backend, ahí sí podría guardarse información en una base de datos.

**P: ¿Qué relación tiene con el rubro contable?**  
R: Una firma contable real podría usar BD para clientes, facturas y declaraciones. Este avance solo **presenta** la empresa; no gestiona operaciones contables.

---

### 10.7 Mapa de sitio web

**P: ¿Qué es un mapa de sitio?**  
R: Diagrama que muestra la **estructura y jerarquía** de las páginas o secciones de un sitio. Indica qué contenido existe y cómo se relaciona.

**P: ¿Cuál es el mapa de sitio de tu proyecto?**  
R: Al ser **single page**, no hay múltiples archivos HTML; el mapa son las **secciones ancladas** dentro de `index.html`:

```
CNJ - Integridad Contable (index.html)
│
├── Inicio (#inicio) ..................... Portada / Hero
├── Nosotros (#empresa) ................ Info empresa + valores
├── Servicios (#servicios) ............. 3 productos/servicios
├── Video (#video) ..................... Video institucional
├── Clientes (#clientes) ............. 2 testimonios
└── Contacto (#contacto) ............... Footer (redes, UTP, contacto, rubro)
```

**P: ¿Cómo se navega entre secciones?**  
R: Por el menú del header y enlaces internos (`href="#seccion"`). JavaScript hace scroll suave sin cambiar de archivo ni dejar `#` en la URL.

---

### 10.8 Wireframe

**P: ¿Qué es un wireframe?**  
R: **Boceto o maqueta** de baja fidelidad de una página. Define disposición de bloques (header, hero, columnas, footer) **sin colores finales ni imágenes reales**. Es el plano antes del diseño visual.

**P: ¿Tu proyecto siguió un wireframe?**  
R: Sí, implícitamente según el **checklist del avance** y un layout corporativo típico:

```
┌─────────────────────────────────────────┐
│ [Logo]  Nav Nav Nav Nav Nav  [CTA][≡]  │  ← Header
├─────────────────────────────────────────┤
│ ████████████████████████████████████████│
│ █  Título grande                      █│  ← Portada (imagen + texto)
│ █  [Botón] [Botón]                    █│
├─────────────────────────────────────────┤
│         Título sección                  │
│    Texto intro + [4 cajas valores]      │  ← Nosotros
├─────────────────────────────────────────┤
│    [Card 1]  [Card 2]  [Card 3]       │  ← Servicios
├─────────────────────────────────────────┤
│    [Video]     |    Lista info          │  ← Video
├─────────────────────────────────────────┤
│    [Testimonio 1]  [Testimonio 2]       │  ← Clientes
├─────────────────────────────────────────┤
│ Col1: Redes+UTP | Col2: Contacto | Col3 │  ← Footer
│              Copyright                  │
└─────────────────────────────────────────┘
```

**P: ¿Wireframe vs diseño final?**  
R: El wireframe define **posición**; el CSS aplica **identidad visual** (navy, gold, Fira Sans, sombras, animaciones). El HTML implementa la estructura que el wireframe planteó.

---

### 10.9 Página web

**P: ¿Qué es una página web?**  
R: Documento o conjunto de documentos accesibles por navegador vía HTTP/HTTPS. Puede ser estática (archivos fijos) o dinámica (contenido generado por servidor/BD).

**P: ¿Qué tipo de página web es la tuya?**  
R: **Landing page estática de una sola página** (one-page). Todo vive en `index.html` con secciones verticales. Objetivo: presentar CNJ, sus servicios, video, clientes y datos de contacto.

**P: ¿Qué archivos componen la página web completa?**  
R:

| Capa | Archivo | Rol |
|------|---------|-----|
| Estructura | `index.html` | Contenido y semántica |
| Presentación | `css/styles.css` | Diseño y responsive |
| Comportamiento | `js/main.js` | Interactividad |
| Recursos | `assets/*` | Imágenes, logos, video |

**P: ¿Cómo se publica o visualiza?**  
R: Abriendo `index.html` en cualquier navegador moderno. También puede subirse a GitHub Pages, Netlify o un hosting; no requiere servidor de aplicaciones ni base de datos.

**P: ¿Qué requisitos del avance cumple la página?**  
R:

| Requisito | Sección |
|-----------|---------|
| Encabezado (logo + nombre) | Header |
| Portada con imagen | `#inicio` |
| Info empresa y rubro | `#empresa` |
| 3 productos/servicios | `#servicios` |
| Video | `#video` |
| 2 clientes referenciales | `#clientes` |
| Footer 3 columnas | `#contacto` |

**P: ¿Qué mejoras podría tener en avances futuros?**  
R: Formulario de contacto con validación JS, backend + base de datos, más páginas (blog, portal cliente), CMS para editar contenido sin tocar HTML, o PWA para uso offline.

---

## 11. Preguntas difíciles y preguntas trampa (defensa oral)

Esta sección prepara respuestas para preguntas más exigentes o con “truco”: conceptos que suenan parecidos, detalles del código que el docente puede pedir explicar en vivo, y errores comunes que conviene no cometer.

> **Consejo:** Si no recuerdas algo al instante, di “está en `main.js` línea X” o “lo resolví con CSS en la clase Y” y explica la lógica, no memorices palabra por palabra.

---

### 11.1 Preguntas difíciles

**P: ¿Por qué usaste `const` casi everywhere y no `var`?**  
R: `var` tiene *hoisting* y scope de función; puede causar bugs. `const` y `let` tienen *block scope* (más predecible). Uso `const` cuando la referencia no cambia (elementos DOM) y `let` solo cuando el valor se reasigna (`currentId`).

**P: ¿Qué es el DOM y en qué momento se construye?**  
R: El DOM es el árbol de nodos que representa el HTML en memoria. El navegador lo construye al parsear `index.html`. `main.js` va al final del `<body>` precisamente para que, cuando se ejecute, el DOM ya exista y `getElementById('nav')` encuentre el elemento.

**P: ¿Qué pasa si quitas el `<script>` del final del body y lo pones en el `<head>` sin `defer`?**  
R: El script se ejecutaría **antes** de que existan `#nav` o `#menuToggle`. `getElementById` devolvería `null` y los event listeners no se registrarían. Por eso el script va al final o se usa `defer`.

**P: Explica qué hace `event.preventDefault()` en la navegación.**  
R: Los enlaces `href="#servicios"` por defecto saltan a la sección **y** añaden `#servicios` a la URL. `preventDefault()` cancela ese comportamiento nativo; luego yo controlo el scroll con `scrollIntoView` y limpio la URL con `clearHash()`.

**P: ¿Por qué limpiar el hash si el scroll ya funciona con `#`?**  
R: Requisito de diseño del avance: URL limpia. Además evita que al recargar la página el navegador abra directamente en una sección intermedia y que el historial quede lleno de `#empresa`, `#servicios`, etc.

**P: ¿Qué es `history.replaceState` y por qué no usaste `history.pushState`?**  
R: `replaceState` **sustituye** la entrada actual del historial sin crear una nueva. `pushState` añadiría una entrada por cada clic en el menú. Con `replaceState` el botón “atrás” del navegador no recorre cada sección visitada.

**P: ¿Qué es Intersection Observer y por qué no usaste scroll + `getBoundingClientRect`?**  
R: Intersection Observer es una API del navegador que avisa cuando un elemento entra o sale del viewport, con mejor rendimiento que calcular posiciones en cada evento `scroll`. Para animaciones “al aparecer” es la opción moderna y eficiente.

**P: Explica `threshold: 0.15` y `rootMargin: '0px 0px -40px 0px'`.**  
R: `threshold: 0.15` → el callback se dispara cuando ~15% del elemento es visible. `rootMargin` negativo abajo reduce el área de detección: el reveal se activa un poco **antes** de que el elemento quede pegado al borde inferior de la pantalla.

**P: ¿Por qué haces `unobserve` después de mostrar un elemento?**  
R: Para no seguir observando algo que ya animó. Ahorra trabajo en cada scroll y evita togglear clases innecesariamente.

**P: ¿Qué significa `{ passive: true }` en el listener de scroll?**  
R: Le dice al navegador que el handler **no** va a llamar `preventDefault()`. Eso permite optimizar el scroll (menos bloqueos). Es buena práctica en listeners de scroll/touch que solo leen posición.

**P: ¿Cómo sabe el menú cuál enlace marcar como activo?**  
R: `updateActiveNav()` toma `scrollY + 120` (compensa header sticky), recorre `section[id]` y `footer[id]`, y guarda el `id` de la última sección cuyo `offsetTop` ya pasó. Luego compara cada `nav__link` con `#${currentId}` y aplica `nav__link--active`.

**P: ¿Por qué 120px de offset y no exactamente la altura del header?**  
R: 120px es una compensación práctica: altura del header (~70–80px) más un margen para que el cambio de sección activa se sienta natural antes de que el título quede tapado. Es un valor de afinación, no una constante mágica del navegador.

**P: ¿Qué diferencia hay entre `id` y `class`?**  
R: `id` debe ser **único** en la página (`id="nav"`, `id="servicios"`). `class` puede repetirse en muchos elementos (`class="nav__link"`, `class="service-card"`). JS usa `id` para un elemento concreto; CSS y JS usan `class` para estilos y grupos.

**P: ¿Qué es BEM y un ejemplo de tu proyecto?**  
R: Block Element Modifier: nomenclatura para CSS. Bloque `.service-card`, elemento `.service-card__title`, modificador `.nav__link--active`. Evita choques como `.title` genérico en toda la página.

**P: ¿Flexbox o Grid: cuándo usaste cada uno?**  
R: **Flexbox** para alinear en una fila o columna (header, logo + texto, footer social). **Grid** para layouts bidimensionales con columnas iguales (3 servicios, 4 valores, 3 columnas footer). Regla práctica: flex para componentes pequeños; grid para la “rejilla” de secciones.

**P: ¿Qué hace `position: sticky` en el header?**  
R: Se comporta como `relative` hasta que el scroll llega a `top: 0`; entonces “se pega” arriba como `fixed` pero **dentro** de su contenedor padre. Ideal para nav que siempre se ve al bajar.

**P: ¿Qué es `clamp()` en CSS y dónde lo usaste?**  
R: `clamp(mínimo, preferido, máximo)` — valor fluido. Ejemplo: `clamp(2rem, 4.5vw, 3.2rem)` en `.cover__title`: el título crece con el ancho de pantalla pero nunca baja de 2rem ni supera 3.2rem.

**P: ¿Qué es `box-sizing: border-box`?**  
R: El `padding` y `border` se incluyen en el `width`/`height` declarado. Sin esto, un elemento `width: 100%` + padding podría desbordar su contenedor. El reset lo aplica a todos los elementos.

**P: ¿Por qué un solo `<h1>` en toda la página?**  
R: Buena práctica SEO y accesibilidad: un título principal por documento. Los demás encabezados son `<h2>` (secciones) y `<h3>` (subtítulos en tarjetas o video).

**P: ¿Qué es `scroll-margin-top: 5.5rem`?**  
R: Cuando navegas a `#empresa`, el navegador deja 5.5rem de espacio arriba del borde de la sección al hacer scroll. Compensa el header sticky para que el título no quede oculto debajo.

**P: ¿Por qué `playsinline` en el `<video>`?**  
R: En iOS Safari, sin `playsinline` el video a menudo fuerza pantalla completa. Con el atributo se reproduce dentro del layout de la página.

**P: ¿Qué es `rel="noopener noreferrer"` en enlaces externos?**  
R: Seguridad: `noopener` evita que la pestaña nueva acceda a `window.opener` (tu página). `noreferrer` no envía referrer. Estándar en links con `target="_blank"`.

**P: ¿Por qué algunas imágenes tienen `alt=""` vacío en redes sociales?**  
R: El enlace ya tiene `aria-label="Facebook"`. Si el `alt` repitiera “Facebook”, un lector de pantalla diría dos veces lo mismo. `alt=""` marca la imagen como decorativa cuando el texto alternativo está en el enlace.

---

### 11.2 Preguntas trampa (¡cuidado con estas!)

**P: “Tu página usa JavaScript para el scroll suave, entonces CSS `scroll-behavior: smooth` sobra, ¿no?”**  
R: **Trampa.** No sobra del todo: CSS smooth puede actuar como respaldo si JS falla o en navegación nativa. Pero el flujo principal lo controla JS porque también necesito `preventDefault`, `clearHash` y `closeMenu`. Ambos conviven; JS tiene la lógica de negocio.

**P: “¿HTML es un lenguaje de programación?”**  
R: **No.** HTML es lenguaje de **marcado** (estructura). CSS es hoja de **estilos**. JavaScript sí es lenguaje de **programación** (lógica, condicionales, bucles). Los tres se complementan.

**P: “¿Tu sitio es dinámico porque tiene animaciones?”**  
R: **Trampa.** “Dinámico” en web suele significar contenido generado en servidor o desde BD. Las animaciones CSS/JS son **interactividad en el cliente**, pero el sitio sigue siendo **estático**: mismos archivos HTML para todos los usuarios.

**P: “¿Usaste Bootstrap?” / “¿Es WordPress?”**  
R: **No.** Todo es código propio: un `index.html`, un `styles.css`, un `main.js`. Sin frameworks CSS ni CMS. Si preguntan por qué: el avance evalúa HTML/CSS/JS base.

**P: “¿El footer no es una sección `<section>`?”**  
R: Correcto usar `<footer>`, no `<section>`. Semánticamente el footer es pie de página. Aun así tiene `id="contacto"` y JS lo incluye en `querySelectorAll('section[id], footer[id]')` para el nav activo.

**P: “¿Cuántas páginas tiene tu sitio?”**  
R: **Una** página HTML (`index.html`) con **seis secciones** navegables por anclas. No confundir “secciones” con “archivos .html”.

**P: “¿Por qué Contacto apunta al footer y no a un formulario?”**  
R: El avance pide datos de contacto del integrante en el footer (nombre y correo). No exige formulario. `mailto:jesus.mechan@utp.edu.pe` permite contacto directo por correo.

**P: “¿`getElementById` y `querySelector` son lo mismo?”**  
R: **No.** `getElementById('nav')` busca un id único. `querySelector('.header')` acepta cualquier selector CSS (clase, id, combinaciones). `querySelectorAll` devuelve **todos** los que coinciden (NodeList).

**P: “¿`==` y `===`?”**  
R: `==` compara con coerción de tipos (`5 == '5'` es true). `===` compara valor **y** tipo (`5 === '5'` es false). En el proyecto se usa `===` implícitamente en comparaciones estrictas como `href === '#${currentId}'`.

**P: “¿Una variable y un atributo HTML son lo mismo?”**  
R: **No.** Variable JS vive en memoria durante ejecución (`const nav`). Atributo HTML vive en el markup (`id="nav"`, `aria-expanded="false"`). JS puede **leer y modificar** atributos con `setAttribute` / `getAttribute`.

**P: “¿La base de datos está en la carpeta `assets`?”**  
R: **No.** `assets` son archivos estáticos (imágenes, video, logos). No hay BD en este avance.

**P: “¿El mapa de sitio es el menú de navegación?”**  
R: **Relacionados pero no iguales.** El menú es la UI para navegar. El **mapa de sitio** es el diagrama de estructura (qué bloques existen y cómo se organizan). Aquí coinciden porque hay una sola página con secciones ancladas.

**P: “¿Wireframe y mockup es lo mismo?”**  
R: **No.** Wireframe = boceto de layout (cajas, sin diseño final). Mockup = diseño visual más fiel (colores, tipografía, imágenes). Este proyecto pasó de wireframe conceptual al mockup implementado en CSS.

**P: “¿Por qué no usaste `<iframe>` para el video?”**  
R: El video es **local** (`assets/video-cnj.mp4`). `<video>` nativo es más ligero, sin dependencia de YouTube, funciona offline y cumple el requisito de video integrado en la página.

**P: “¿Si desactivo JavaScript la página se rompe?”**  
R: No se “rompe”: el contenido HTML y CSS se ven. Lo que **deja de funcionar**: menú hamburguesa, scroll suave controlado, limpieza de URL, nav activo al scroll, animaciones reveal y botón volver arriba. Los enlaces `#` seguirían saltando a secciones (comportamiento nativo).

**P: “¿`forEach` puede detenerse con `break`?”**  
R: **Trampa.** En un `forEach` normal **no** funciona `break`. Para salir antes habría que usar `for...of`, `for` clásico o `some`/`every`. En este proyecto no hace falta cortar el bucle a mitad.

**P: “¿Arrow function tiene su propio `this`?”**  
R: **No** — no tiene `this` propio (hereda del contexto léxico). En este proyecto casi no usamos `this`; usamos funciones flecha en callbacks (`addEventListener`, `forEach`, Intersection Observer) por sintaxis clara.

---

### 11.3 “Explícame este código en vivo”

Preguntas típicas señalando un fragmento. Respuestas listas:

#### Bloque A — Menú hamburguesa

```javascript
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('nav--open');
  menuToggle.classList.toggle('is-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
});
```

**Qué decir:** Al clic, `toggle` devuelve `true` si añadió la clase y `false` si la quitó. Ese booleano `open` sincroniza el icono X (`.is-open`) y accesibilidad (`aria-expanded`). CSS muestra u oculta el menú con `.nav--open`.

#### Bloque B — Navegación interna

```javascript
if (id === 'inicio') {
  event.preventDefault();
  scrollToInicio();
  closeMenu();
  clearHash();
  return;
}
```

**Qué decir:** Caso especial para inicio: evito el default del enlace, scroll suave al hero, cierro menú móvil si estaba abierto, limpio URL y salgo con `return` para no ejecutar el código de abajo.

#### Bloque C — Nav activo

```javascript
sections.forEach((section) => {
  if (section.offsetTop <= scrollPos) {
    currentId = section.id;
  }
});
```

**Qué decir:** Recorro secciones en orden del DOM. Si el top de la sección ya pasó el punto de scroll (+ offset), actualizo `currentId`. La última que cumpla la condición es la sección “actual” visible.

#### Bloque D — Reveal

```javascript
if (entry.isIntersecting) {
  entry.target.classList.add('is-visible');
  revealObserver.unobserve(entry.target);
}
```

**Qué decir:** Cuando el elemento entra en viewport, CSS pasa de `.reveal` a `.reveal.is-visible` (fade in). Dejo de observarlo para no repetir la animación.

#### Bloque E — CSS header sticky

```css
.header {
  position: sticky;
  top: 0;
  z-index: 100;
}
.header--scrolled {
  border-bottom-color: var(--border);
  box-shadow: var(--shadow);
}
```

**Qué decir:** Sticky mantiene el header visible. JS añade `--scrolled` al bajar para dar feedback visual (sombra) separando contenido fijo del que scroll.

---

### 11.4 Comparativas rápidas (el docente pregunta “¿por qué X y no Y?”)

| Pregunta | Respuesta corta |
|----------|-----------------|
| ¿jQuery vs vanilla JS? | Vanilla: sin librería extra, suficiente para DOM y eventos de este avance. |
| ¿Varios HTML vs one-page? | One-page cumple el avance “Pg Inicio”; navegación por anclas es más simple. |
| ¿Inline CSS vs archivo externo? | Externo: mantenimiento, caché del navegador, separación de responsabilidades. |
| ¿Inline JS vs `main.js`? | Externo: mismo beneficio; HTML más limpio. |
| ¿`<div>` vs `<section>`? | `<section>` tiene significado semántico para bloques temáticos (servicios, video). |
| ¿Pixel perfect vs responsive? | Responsive con `clamp`, grid y media queries; prioriza adaptarse a móvil/tablet. |
| ¿CDN imágenes vs locales? | Casi todo local en `assets/`; solo avatares de testimonios en Unsplash. |
| ¿SQL vs sin BD? | Sin backend no hay persistencia; contenido embebido en HTML. |
| ¿Git vs solo carpeta? | Git versiona cambios; `.gitignore` excluye docs personales como este archivo. |

---

### 11.5 Errores que NO debes cometer en la defensa

1. Decir que HTML “programa” la lógica del menú → **lo hace JavaScript**.
2. Confundir **sección** con **página** → es 1 HTML, 6 secciones.
3. No saber para qué sirve un `id` que tú mismo pusiste (`menuToggle`, `backToTop`).
4. Decir que hay base de datos porque “hay datos de clientes” → están **escritos en HTML**, no en BD.
5. No poder explicar **una** función propia (`closeMenu`, `updateActiveNav`, etc.).
6. Afirmar que sin JS no se ve nada → **sí se ve**; solo pierde interactividad.
7. Confundir **wireframe** (boceto) con la **página terminada** (implementación).
8. Decir “responsive es hacer la página más pequeña” → es **reorganizar layout** (grid, menú hamburguesa, etc.).

---

### 11.6 Mini simulacro (30 segundos por respuesta)

Practica en voz alta:

1. **“¿Qué hace tu JavaScript?”** → Menú móvil, scroll suave sin hash, nav activo, reveal al scroll, botón volver arriba.
2. **“¿Dónde están los 3 servicios?”** → Sección `#servicios`, tres `<article class="service-card">` en grid.
3. **“¿Cómo es el footer?”** → Tres columnas: redes+UTP, contacto integrante, logos del rubro (PwC, EY, KPMG).
4. **“¿Qué es una variable en tu código?”** → Ejemplo: `const nav = document.getElementById('nav')` guarda referencia al menú.
5. **“¿Condicional en tu JS?”** → `if (entry.isIntersecting)` para mostrar animación reveal.
6. **“¿Bucle en tu JS?”** → `navLinks.forEach(...)` para marcar enlace activo.
7. **“¿Por qué no hay BD?”** → Sitio estático de presentación, sin login ni formularios que guarden datos.

---

## 12. Resumen rápido del temario (chuleta)

| Tema | Respuesta en una línea (proyecto CNJ) |
|------|----------------------------------------|
| Variables | `const nav`, `let currentId` — guardan referencias DOM y estado |
| Tipos de datos | String, Number, Boolean, Object, NodeList en JS |
| Funciones | `closeMenu`, `scrollToInicio`, `updateActiveNav`, etc. |
| Secuencial | Código de main.js se ejecuta línea por línea al cargar |
| Condicional | `if (nav && menuToggle)`, `if (id === 'inicio')`, toggles |
| Repetitiva | `.forEach()` en enlaces, secciones, navLinks, entries |
| HTML | Estructura semántica en index.html |
| CSS | Estilos, grid/flex, responsive en styles.css |
| JavaScript | Menú, scroll, observer en main.js |
| Base de datos | No aplica — sitio estático sin backend |
| Mapa de sitio | 6 secciones ancladas en una sola página |
| Wireframe | Layout vertical: header → secciones → footer |
| Página web | Landing estática CNJ, 3 capas HTML+CSS+JS |
| SEO | Meta tags, OG, Twitter Card, JSON-LD, lazy loading, fetchpriority, semántica, skip link |

---

*Documento elaborado por Jesús Manuel Mechan Gonzales — UTP, Marcos de Desarrollo Web 48308, 2026.*
