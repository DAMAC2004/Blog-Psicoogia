# Blog de psicología — prototipo

React + Vite. Las entradas son archivos `.md` dentro de `src/posts/`.

## Arrancar
1. Instala Node.js 20 o superior (https://nodejs.org).
2. En esta carpeta: `npm install`
3. `npm run dev` y abre http://localhost:5173

## Rutas
- `/home` — listado de entradas
- `/postdetail/<id>` — entrada individual (`<id>` es el nombre de la carpeta)

## Crear una entrada
Crea `src/posts/<id>/index.md` y pon la portada en la misma carpeta:

```markdown
---
title: "Título de la entrada"
date: "2026-09-28"
author: "Nombre de quien publica"
tags: ["Salud mental", "Estigma"]
summary: "Resumen corto para la tarjeta del home."
coverImage: "./portada.jpg"
---

Contenido en Markdown...
```

El home se ordena por fecha (más reciente primero) y los filtros de temas se generan solos a partir de `tags`.

## Netlify
Build: `npm run build` · Carpeta a publicar: `dist`. El archivo `public/_redirects` ya evita el 404 al recargar rutas.

## Convenciones de construcción por bloques

Cada entrada es un archivo **`.md`** (no `.mdx`) que se interpreta en `/postdetail/<id>`. Además del Markdown estándar, el intérprete reconoce dos etiquetas especiales: `<MediaBlock>` y `<YouTube />`.

### Frontmatter

| Campo | Obligatorio | Formato | Ejemplo |
| :--- | :---: | :--- | :--- |
| `title` | Sí | Texto entre comillas | `"Poner límites en pareja"` |
| `date` | Sí | `AAAA-MM-DD` | `"2026-09-28"` |
| `author` | No (por defecto "Redacción") | Texto | `"Laura Méndez"` |
| `tags` | No | Lista | `["Salud mental", "Estigma"]` |
| `summary` | No | Texto de máximo 160 caracteres | `"Resumen para la tarjeta del home."` |
| `coverImage` | Sí | Ruta relativa a la carpeta del post | `"./portada.svg"` |

### Tabla de bloques

| Bloque | Sintaxis en el `.md` | Resultado |
| :--- | :--- | :--- |
| Títulos | `#` a `#####` | `<h1>`…`<h5>` con los colores `--heading-1`…`--heading-5` |
| Texto | párrafos, **negritas**, *cursivas*, listas, `> citas`, enlaces, tablas | Markdown normal (con `remark-gfm`) |
| Separador | `---` en su propia línea | línea divisoria sutil |
| Solo imagen | `![Descripción](./imagen.svg)` | imagen a ancho completo con pie de foto (el texto alternativo) |
| Texto + imagen | `<MediaBlock image="./x.svg" alt="..." align="left">` … `</MediaBlock>` | imagen a un lado, texto Markdown al otro |
| YouTube | `<YouTube id="XXXXXXXXXXX" />` | reproductor 16:9 responsivo |

Ejemplos copiables:

```markdown
## Título de sección
### Subtítulo
#### Apartado
##### Nota breve

Un párrafo con **negritas**, *cursivas* y un [enlace](https://ejemplo.com).

- Elemento de lista
- Otro elemento

> Una cita o idea destacada.

| Columna A | Columna B |
| :--- | :--- |
| Dato 1 | Dato 2 |

---

![Descripción de la imagen, que también sirve de pie de foto](./ilustracion-1.svg)

<MediaBlock image="./ilustracion-2.svg" alt="Descripción de la imagen" align="right">
### El primer paso
Pedir ayuda no es rendirse: es **tomar decisiones** sobre tu bienestar.
</MediaBlock>

<YouTube id="dQw4w9WgXcQ" />
```

### Reglas de sintaxis

- Las etiquetas `<MediaBlock ...>`, `</MediaBlock>` y `<YouTube />` van **solas en su línea**.
- Los atributos van siempre con **comillas dobles**: `align="left"`.
- **No se anidan bloques**: un `MediaBlock` no puede contener otro `MediaBlock` ni un `YouTube`.
- Solo se interpretan esas dos etiquetas; **cualquier otro HTML se muestra como texto**.
- `align` acepta `left` (imagen a la izquierda, valor por defecto) o `right` (imagen a la derecha). En móvil el bloque se apila: imagen arriba, texto abajo.
- El contenido de un `MediaBlock` puede ir sangrado; la sangría común se quita antes de interpretarlo.
- El id de YouTube es el código de 11 caracteres que aparece después de `v=` en la URL (`https://www.youtube.com/watch?v=`**`dQw4w9WgXcQ`**). Con `id="PENDIENTE"` se muestra un marcador de "Video pendiente de agregar".
- El título del post ya se muestra como H1 en la cabecera, así que el cuerpo empieza con un párrafo o con `##`.
- Las etiquetas escritas dentro de un bloque de código (triple acento grave) no se interpretan.

### Imágenes

- Van **dentro de la carpeta del post** (`src/posts/<id>/`), junto al `index.md`.
- Nombres en minúsculas y sin espacios: `ilustracion-1.jpg`, `grafica-sueno.png`.
- Formatos aceptados: `jpg`, `jpeg`, `png`, `webp`, `gif`, `svg`.
- Recomendación: ancho máximo de 1600 px y peso menor a 300 KB.
- El `alt` siempre debe ser descriptivo: se usa como pie de foto y lo leen los lectores de pantalla.
- Si una imagen no existe, la entrada muestra "Imagen no encontrada: nombre" en su lugar.

### Bloque de cierre estándar

Todas las entradas terminan con este bloque, idéntico:

```markdown
---

> **Este artículo es informativo y no sustituye la atención de un profesional de la salud mental.** Si estás pasando por un momento difícil, busca apoyo. En México puedes llamar gratis a la **Línea de la Vida: 800 911 2000**, disponible las 24 horas.
```

### Plantilla mínima de una entrada nueva

```markdown
---
title: "Título de la entrada"
date: "2026-10-01"
author: "Nombre de quien publica"
tags: ["Tema 1", "Tema 2"]
summary: "Resumen de máximo 160 caracteres para la tarjeta del home."
coverImage: "./portada.jpg"
---

Párrafo introductorio, sin título: el título ya aparece en la cabecera.

## Primera sección

Texto de la sección con una lista:

- Idea uno
- Idea dos

<MediaBlock image="./ilustracion-1.jpg" alt="Descripción de la imagen" align="left">
### Subtítulo junto a la imagen
Texto que acompaña a la imagen.
</MediaBlock>

![Descripción de la imagen a ancho completo](./ilustracion-2.jpg)

#### Un apartado

> Una idea destacada.

<YouTube id="PENDIENTE" />

##### Nota

Cierre del artículo.

---

> **Este artículo es informativo y no sustituye la atención de un profesional de la salud mental.** Si estás pasando por un momento difícil, busca apoyo. En México puedes llamar gratis a la **Línea de la Vida: 800 911 2000**, disponible las 24 horas.
```

### Checklist antes de publicar

- [ ] El `id` de la carpeta está en minúsculas y con guiones (`limites-en-pareja`).
- [ ] La portada indicada en `coverImage` existe en la carpeta.
- [ ] Todas las imágenes cargan (no aparece "Imagen no encontrada").
- [ ] Se revisó la entrada en `npm run dev`, en un tema claro, uno oscuro y en móvil.
- [ ] `npm run build` pasa sin errores.

### Flujo con Git

Pasos para publicar una entrada nueva:

```bash
git switch main
git switch -c content/<id>
# crear src/posts/<id>/index.md, la portada y las imágenes
npm run build
git add src/posts/<id>
git commit -m "content: articulo <id>"
git switch main
git merge content/<id>
git push
```

Los mensajes de commit siguen *Conventional Commits* en español, con el formato `tipo: descripción en minúsculas`:

| Tipo | Uso |
| :--- | :--- |
| `feat` | Funcionalidad nueva |
| `fix` | Corrección de errores |
| `style` | Solo estilos |
| `docs` | README y documentación |
| `content` | Texto e imágenes de entradas |
| `chore` | Configuración y dependencias |

Nunca se versionan `node_modules/` ni `dist/`; `package-lock.json` sí.
