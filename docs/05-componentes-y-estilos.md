# 05 · Componentes y estilos

## Páginas

Están en `src/pages/`. Ninguna recibe props: leen lo que necesitan de la URL y de `src/lib/posts.js`. Todas llaman a `useDocumentTitle()` (`src/lib/useDocumentTitle.js`), que pone en la pestaña `"<Página> · <SITE.name>"`.

| Página | Ruta | Responsabilidad |
| :--- | :--- | :--- |
| `Home` | `/home` | *Hero*, buscador, filtro por tema, listado paginado y enlace a "Sobre nosotros". Lee y escribe `?q`, `?tema` y `?pagina` con `useSearchParams`. Corrige con `replace` una `?pagina` inválida o fuera de rango. |
| `PostDetail` | `/postdetail/:id` | Cabecera de la entrada (etiquetas, título, autor, fecha, tiempo de lectura), portada, `PostContent`, `HealthNotice` (si `post.healthNotice` es `true`) y enlaces "← Volver al blog". Si el `id` no existe muestra "Entrada no encontrada". Contiene el marcador `TODO fase contador`. |
| `About` | `/sobre-nosotros` | Quiénes somos, qué encontrarás, valores en tarjetas, compromiso, texto de cierre con cita y botones a `/contacto` y `/home`. |
| `Contact` | `/contacto` | Correo (`SITE.email`), redes (`SITE.social`, solo si hay elementos) y aviso de que el canal no es para emergencias, con `SITE.crisisLine` y el 911. |

## Componentes

Están en `src/components/`.

| Componente | Props | Responsabilidad |
| :--- | :--- | :--- |
| `Layout` | — | Cabecera con marca, navegación (`NavLink` a `/home`, `/sobre-nosotros`, `/contacto`) y `ThemeSwitcher`; `<Outlet />` para la página; pie con enlaces. Hace `window.scrollTo(0, 0)` cuando cambia `pathname` (no cuando solo cambian los parámetros `?`). |
| `ThemeSwitcher` | — | `<select>` con los 4 temas. Aplica la clase del tema a `<body>` y la guarda en `localStorage`. |
| `PostCard` | `post` | Tarjeta de una entrada en el listado: portada, etiquetas, título, resumen, autor y fecha. También exporta la función `initials(name)`, que usa `PostDetail`. |
| `Pagination` | `currentPage`, `totalPages`, `onPageChange(page)` | Botones "← Anterior", números y "Siguiente →". No se dibuja si `totalPages <= 1`. Con más de 7 páginas muestra primera, última, actual y vecinas, con "…" en los huecos. |
| `PostContent` | `post` | Intérprete: llama a `splitBlocks(post.body, post.id)` y dibuja cada segmento con `ReactMarkdown`, `MediaBlock` o `YouTube`. Ver [04](./04-interprete-y-renderizado.md). |
| `MediaBlock` | `post`, `image`, `alt`, `align` (`'left'` o `'right'`), `children` | Imagen a un lado y contenido al otro. Resuelve la imagen con `post.resolveImage`. |
| `YouTube` | `id` | Reproductor 16:9 de `youtube-nocookie.com` si `id` cumple `/^[A-Za-z0-9_-]{11}$/`; si no, recuadro "Video pendiente de agregar". |
| `MissingImage` | `src` | Recuadro "Imagen no encontrada: nombre" cuando una imagen no existe. |
| `HealthNotice` | — | `<aside role="note" aria-label="Aviso de salud">` con el aviso y el teléfono de `SITE.crisisLine` como enlace `tel:`. |

## Sistema de temas

### Las 4 clases

Definidas en `src/assets/themes.css` y listadas en `THEMES` dentro de `src/components/ThemeSwitcher.jsx`:

| Clase | Nombre en el selector |
| :--- | :--- |
| `theme-relajado` | Relajado (predeterminado) |
| `theme-relajado-oscuro` | Relajado oscuro |
| `theme-concentracion` | Concentración |
| `theme-concentracion-oscuro` | Concentración oscuro |

### Variables CSS

Cada clase define el mismo conjunto de variables. **Todo color del sitio debe salir de estas variables**, nunca de un valor fijo.

| Grupo | Variables | Uso |
| :--- | :--- | :--- |
| Fondos | `--bg-primary`, `--bg-secondary`, `--bg-block`, `--border-color` | Fondo de página; fondos de tarjetas, *hero*, pie y avisos; recuadros de marcadores; bordes y separadores. |
| Texto | `--text-simple`, `--text-bold` | Texto normal y negritas. |
| Títulos | `--heading-1` … `--heading-5` | Color de `h1`…`h5`. `--heading-5` también se usa para texto secundario (`.muted`, pies de foto, resumen de paginación). |
| Interacción | `--link-color`, `--link-hover`, `--btn-bg`, `--btn-text`, `--btn-hover` | Enlaces, botones y el elemento activo (chip de tema, página actual). |
| Etiquetas | `--tag-bg`, `--tag-text` | `.tag`, avatar y fondo al pasar sobre los `.chip`. |
| Otros | `--code-bg`, `--code-text`, `--quote-border`, `--shadow-color` | Código, borde de citas y avisos, sombras de tarjetas. |

### Cómo se guarda la elección

`ThemeSwitcher` guarda la clase elegida en `localStorage` con la clave `blog-theme` y, al cargar, la lee (si no existe o no es válida usa la primera de `THEMES`). La clase se aplica a `<body>` con `classList`, y las variables se heredan en todo el documento.

### Cómo agregar un tema nuevo

1. En `src/assets/themes.css`, copia el bloque de un tema existente, cambia el nombre de la clase (por ejemplo `.theme-bosque`) y ajusta **todas** las variables.
2. En `src/components/ThemeSwitcher.jsx`, añade `{ id: 'theme-bosque', label: 'Bosque' }` a `THEMES`.
3. Revisa el home, una entrada, "Sobre nosotros" y "Contacto" con el nuevo tema, en escritorio y a 390 px.

## Archivos CSS

Se importan en `src/main.jsx` en este orden:

| Archivo | Contenido |
| :--- | :--- |
| `src/assets/themes.css` | Las 4 clases de tema y estilos base que dependen de ellas: `body`, `h1`…`h5`, `p`, `a`, `button`/`.btn`, `.tag`, `code`, `blockquote`, `.card`/`.media-block`. |
| `src/assets/global.css` | Maquetación general: `.container`, `.container.narrow`, cabecera, *hero*, buscador, `.chip`, listado (`.post-row`), `.post-meta`, `.avatar`, paginación (`.pagination`, `.pagination-summary`), pie y ajustes móviles. |
| `src/assets/post.css` | Vista de entrada: `.post-page`, `.post-header`, `.post-cover`, `.post-body` (títulos, listas, tablas, `hr`), `.post-figure`, `.image-missing`, `.media-block`, `.youtube`, `.health-notice`. |
| `src/assets/pages.css` | Páginas propias: `.page-content`, `.values-grid`, `.value-card`, `.about-closing`, `.page-actions`, `.btn-secondary`, `.contact-card`, `.crisis-notice`, `.home-about`. |

Punto de corte móvil principal: `720px`. La paginación oculta los textos "Anterior" y "Siguiente" por debajo de `480px`.

## Configuración en `src/config/site.js`

| Campo | Uso |
| :--- | :--- |
| `name` | Nombre del sitio en cabecera, pie, títulos de pestaña y "Sobre nosotros". |
| `tagline` | Lema del pie. |
| `email` | Correo de la página de contacto (**PENDIENTE**: hoy es `contacto@ejemplo.com`). |
| `social` | Lista de `{ label, url }`. Vacía = no se muestra la tarjeta de redes (**PENDIENTE**). |
| `postsPerPage` | Entradas por página en el listado (10). |
| `crisisLine` | `{ name, phone, hours }` de la línea de apoyo; lo usan `HealthNotice` y `Contact`. |
