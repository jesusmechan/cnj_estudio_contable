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

Antes del contenido visible, el `<head>` prepara metadatos y recursos externos.

| Elemento | Qué hace y por qué está |
|----------|-------------------------|
| `lang="es"` | Indica que el contenido está en español (accesibilidad y SEO). |
| `<meta charset="UTF-8">` | Permite tildes, eñes y caracteres especiales sin errores. |
| `<meta name="viewport">` | Clave para responsive: el ancho se adapta al dispositivo. |
| `<meta name="description">` | Texto que Google puede mostrar en resultados de búsqueda. |
| `<title>` | Título de la pestaña del navegador. |
| Favicon (`logo3.png`) | Icono pequeño en la pestaña y al guardar favoritos. |
| `preconnect` a Google Fonts | Acelera la carga de la tipografía conectando antes al servidor. |
| `css/styles.css` | Toda la apariencia visual del sitio. |

**Tipografía elegida:** *Fira Sans* — sans-serif moderna, legible y profesional, acorde a una firma contable.

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
| **JS global** | Menú, scroll sin hash, observer, nav activo — todo vanilla, sin librerías. |

---

*Documento elaborado por Jesús Manuel Mechan Gonzales — UTP, Marcos de Desarrollo Web 48308, 2026.*
