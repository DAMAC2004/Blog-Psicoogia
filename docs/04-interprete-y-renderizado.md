# 04 · Intérprete y renderizado

Cómo pasa una entrada de un archivo `index.md` a lo que se ve en `/postdetail/<id>`. Archivos implicados:

| Paso | Archivo | Función / componente |
| :--- | :--- | :--- |
| 1. Lectura | `src/lib/posts.js` | `import.meta.glob` |
| 2. Frontmatter | `src/lib/frontmatter.js` | `parseFrontmatter(raw)` |
| 3. División en bloques | `src/lib/blocks.js` | `splitBlocks(body, postId)` |
| 4. Renderizado | `src/components/PostContent.jsx`, `MediaBlock.jsx`, `YouTube.jsx`, `MissingImage.jsx` | `PostContent` |
| 5. Imágenes | `src/lib/posts.js` | `resolveImage(id, ruta)` → `post.resolveImage(ruta)` |

## 1. Lectura del archivo crudo

`src/lib/posts.js` pide a Vite, **al compilar**, el texto de todos los `index.md`:

```js
const markdownFiles = import.meta.glob('../posts/*/index.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});
```

El resultado es un objeto `{ '../posts/<id>/index.md': 'texto completo del archivo' }`. El `id` de cada entrada es el nombre de la carpeta (penúltimo segmento de la ruta, función `folderOf`). Solo se leen archivos a un nivel de profundidad: `src/posts/<id>/index.md`.

## 2. `parseFrontmatter`

`parseFrontmatter(raw)` (en `src/lib/frontmatter.js`) devuelve `{ data, body }`:

- Busca un bloque que empiece en la primera línea con `---` y termine en otra línea `---` (acepta saltos de línea `\n` y `\r\n`). Si no lo encuentra, devuelve `{ data: {}, body: raw }`.
- `body` es todo lo que sigue al segundo `---`.
- `data` se construye línea por línea.

Qué **sí** soporta:

| YAML | Resultado en `data` |
| :--- | :--- |
| `title: Texto` | `'Texto'` |
| `title: "Texto"` o `'Texto'` | `'Texto'` (se quitan las comillas de los extremos) |
| `tags: ["A", "B"]` | `['A', 'B']` (lista en línea, separada por comas) |
| `tags:` seguido de líneas `- A` | `['A', ...]` (lista con guiones) |
| `clave:` sin valor ni lista | `[]` |
| Líneas en blanco o que no son `clave: valor` | Se ignoran |

Qué **no** soporta:

- Tipos: todo es texto. `healthNotice: false` llega como la cadena `'false'` (por eso `posts.js` compara con `'false'`); los números llegan como texto.
- Objetos anidados, textos de varias líneas (`|`, `>`), anclas ni referencias.
- Comas dentro de un elemento de lista en línea: `["Hola, mundo"]` se parte en dos.
- Comentarios al final de un valor: `title: Hola # nota` guarda `Hola # nota`.
- Claves con espacios o acentos: la clave debe cumplir `[\w-]+`.

Con `data`, `posts.js` construye el objeto de la entrada:

```js
{
  id, title, date, author, tags, summary,
  cover,          // URL de coverImage ya resuelta (o null)
  body,           // Markdown sin el frontmatter
  healthNotice,   // true salvo que el frontmatter diga healthNotice: false
  resolveImage,   // (ruta) => URL final o null
}
```

## 3. `splitBlocks`

`splitBlocks(body, postId)` (en `src/lib/blocks.js`) recorre el cuerpo **línea por línea** y devuelve una lista de segmentos:

```js
{ type: 'markdown', content: '## Título\n\nTexto…' }
{ type: 'media', image: './x.svg', alt: '...', align: 'left' | 'right', content: '### ...' }
{ type: 'youtube', id: 'abc123def45' }
```

### Expresiones que reconoce

| Constante | Expresión | Reconoce |
| :--- | :--- | :--- |
| `MEDIA_OPEN` | `/^\s*<MediaBlock\b([^>]*)>\s*$/` | Apertura, sola en su línea (se permiten espacios antes) |
| `MEDIA_CLOSE` | `/^\s*<\/MediaBlock>\s*$/` | Cierre, solo en su línea |
| `YOUTUBE` | `/^\s*<YouTube\b([^>]*?)\/>\s*$/` | Etiqueta de YouTube autocerrada, sola en su línea |
| `FENCE` | ```` /^\s*(```\|~~~)/ ```` | Apertura o cierre de un bloque de código |

### Algoritmo

1. Mantiene tres estados: las líneas de Markdown acumuladas, el `MediaBlock` abierto (si lo hay) y la valla de código abierta (si la hay).
2. **Bloques de código:** si una línea abre una valla (```` ``` ```` o `~~~`), todas las líneas hasta la valla de cierre del mismo tipo se copian tal cual, sin buscar etiquetas.
3. **Dentro de un `MediaBlock`:**
   - Si la línea es `</MediaBlock>`, se cierra el bloque y se emite un segmento `media`.
   - Si la línea es otra apertura `<MediaBlock>` o un `<YouTube />`, se emite un `console.warn` ("No se permite anidar bloques…") y la línea se guarda como texto del bloque.
   - Cualquier otra línea se acumula como contenido del bloque.
4. **Fuera de un `MediaBlock`:**
   - `<MediaBlock ...>`: se vacía el Markdown acumulado en un segmento `markdown` y se abre un bloque.
   - `<YouTube ... />`: se vacía el Markdown acumulado y se emite un segmento `youtube`.
   - Cualquier otra línea se acumula como Markdown.
5. **Al terminar**, si quedó un `MediaBlock` abierto, se emite un `console.warn` ("`<MediaBlock>` sin cierre…") y la línea de apertura y todo su contenido se devuelven como Markdown normal.
6. Los segmentos `markdown` vacíos (solo espacios) se descartan.

### Lectura de atributos

`readAttributes(texto)` aplica `/(\w+)="([^"]*)"/g` sobre lo que hay entre el nombre de la etiqueta y el `>`. Solo se leen atributos con **comillas dobles**; los que usan comillas simples o no llevan comillas se ignoran. Valores por defecto:

- `image` y `alt`: `''` si faltan.
- `align`: `'right'` solo si el valor es exactamente `right`; cualquier otro valor (o ninguno) se convierte en `'left'`.
- `id` de YouTube: `''` si falta (y el componente mostrará el marcador).

### Quitado de sangría

Antes de emitir un segmento `media`, `dedent(lineas)` calcula la sangría mínima (espacios o tabuladores) de las líneas **no vacías** y la quita de todas. Sin este paso, un contenido sangrado 4 espacios se interpretaría en Markdown como bloque de código.

## 4. Renderizado de los segmentos

`PostContent` (en `src/components/PostContent.jsx`) memoriza `splitBlocks(post.body, post.id)` y dibuja cada segmento:

| Segmento | Se dibuja como |
| :--- | :--- |
| `markdown` | `<div className="post-segment">` con `<ReactMarkdown remarkPlugins={[remarkGfm]} components={...}>` |
| `media` | `<MediaBlock post image alt align>` cuyo contenido es otro `ReactMarkdown` con los mismos componentes |
| `youtube` | `<YouTube id />` |

### `ReactMarkdown` y `remark-gfm`

`remark-gfm` añade tablas, tachado (`~~`), listas de tareas y enlaces automáticos. No se usa `rehype-raw`: los nodos HTML del Markdown se convierten en texto, así que cualquier etiqueta se ve literalmente.

### Componentes sobrescritos

`markdownComponents(post)` devuelve el mapa `components`:

| Elemento | Comportamiento |
| :--- | :--- |
| `img` | Resuelve `src` con `post.resolveImage(src)` y devuelve `<figure className="post-figure">` con `<img loading="lazy">` y `<figcaption>` con el `alt`. Si la imagen no existe, dibuja `<MissingImage src={src} />` ("Imagen no encontrada: nombre"). |
| `p` | `ReactMarkdown` pone cada imagen dentro de un `<p>`. Si el párrafo solo contiene una imagen, devuelve la figura sin `<p>`; si mezcla imagen y texto, usa `<div className="post-paragraph">`; en otro caso, un `<p>` normal. Así nunca hay `<figure>` dentro de `<p>`. |
| `a` | Enlaces que empiezan con `http://` o `https://` se abren con `target="_blank" rel="noopener noreferrer"`; el resto, normales. |

### `MediaBlock`

`src/components/MediaBlock.jsx` dibuja:

```html
<section class="media-block media-left | media-right">
  <div class="media-image"><img …> o recuadro de imagen no encontrada</div>
  <div class="media-content">…Markdown…</div>
</section>
```

El orden izquierda/derecha lo decide el CSS (`.media-right .media-image { order: 2 }`), y en menos de 720 px la rejilla pasa a una sola columna con la imagen arriba.

### `YouTube`

`src/components/YouTube.jsx` valida el `id` con `/^[A-Za-z0-9_-]{11}$/`. Si es válido, dibuja un `<iframe>` a `https://www.youtube-nocookie.com/embed/<id>` con `loading="lazy"` y `allowFullScreen` dentro de `.youtube` (`aspect-ratio: 16 / 9`). Si no, dibuja `.youtube.youtube-pending` con el texto "Video pendiente de agregar".

## 5. Resolución de rutas de imágenes

`posts.js` también pide a Vite las URLs de todas las imágenes:

```js
const imageFiles = import.meta.glob('../posts/*/*.{jpg,jpeg,png,webp,gif,svg}', {
  query: '?url',
  import: 'default',
  eager: true,
});
```

`resolveImage(id, rutaRelativa)`:

1. Si la ruta está vacía, devuelve `null`.
2. Si empieza con `http://` o `https://`, la devuelve tal cual (imagen externa).
3. Quita el `./` inicial y busca `../posts/<id>/<archivo>` en `imageFiles`. Devuelve la URL final (en producción, con *hash*: `/assets/ilustracion-1-AbC123.svg`) o `null` si no existe.

Cada entrada expone `post.resolveImage(ruta)`, que ya lleva su `id`. Solo se encuentran imágenes que estén **directamente** en la carpeta de la entrada y con una de las extensiones listadas.

## Ejemplo completo

Fragmento de `index.md` (después del frontmatter):

```markdown
Texto con **negrita**.

<MediaBlock image="./ilustracion-1.svg" alt="Dos siluetas conversando" align="right">
    ### Hola
    Texto del bloque.
</MediaBlock>

![Grupo de personas](./ilustracion-2.svg)

<YouTube id="PENDIENTE" />
```

Segmentos que produce `splitBlocks`:

```js
[
  { type: 'markdown', content: 'Texto con **negrita**.' },
  { type: 'media', image: './ilustracion-1.svg', alt: 'Dos siluetas conversando', align: 'right',
    content: '### Hola\nTexto del bloque.' },           // sangría de 4 espacios eliminada
  { type: 'markdown', content: '![Grupo de personas](./ilustracion-2.svg)' },
  { type: 'youtube', id: 'PENDIENTE' },
]
```

HTML resultante dentro de `<article class="post-body">` (URLs de desarrollo):

```html
<div class="post-segment">
  <p>Texto con <strong>negrita</strong>.</p>
</div>

<section class="media-block media-right">
  <div class="media-image">
    <img src="/src/posts/mi-entrada/ilustracion-1.svg" alt="Dos siluetas conversando" loading="lazy">
  </div>
  <div class="media-content">
    <h3>Hola</h3>
    <p>Texto del bloque.</p>
  </div>
</section>

<div class="post-segment">
  <figure class="post-figure">
    <img src="/src/posts/mi-entrada/ilustracion-2.svg" alt="Grupo de personas" loading="lazy">
    <figcaption>Grupo de personas</figcaption>
  </figure>
</div>

<div class="youtube youtube-pending" role="note">
  <span>Video pendiente de agregar</span>
</div>
```

Después de `</article>`, `PostDetail` añade `<HealthNotice />` si `post.healthNotice` es `true`.

## Limitaciones

- **No hay HTML crudo.** Cualquier etiqueta distinta de las dos reconocidas se muestra como texto.
- **Solo dos etiquetas:** `<MediaBlock>` y `<YouTube />`, siempre solas en su línea y con atributos entre comillas dobles.
- **No se anidan bloques.** Un `MediaBlock` no puede contener otro `MediaBlock` ni un `YouTube`.
- Las etiquetas no se reconocen dentro de citas (`> …`) ni en medio de una línea de texto. Una etiqueta sangrada dentro de una lista sí se reconoce, pero corta la lista en dos.
- El frontmatter solo admite el subconjunto de YAML descrito arriba.

## Cómo agregar un bloque nuevo

Ejemplo: una etiqueta `<Audio src="./audio.mp3" />`.

1. **`src/lib/blocks.js`**: añade una expresión (por ejemplo `const AUDIO = /^\s*<Audio\b([^>]*?)\/>\s*$/;`). En el recorrido **fuera** de un `MediaBlock`, si la línea coincide, llama a `flushMarkdown()` y emite `{ type: 'audio', src: readAttributes(...).src ?? '' }`. Dentro de un `MediaBlock`, añádela a la comprobación de anidado para que emita el `console.warn`.
2. **`src/components/Audio.jsx`**: crea el componente. Si usa archivos de la carpeta de la entrada, recibe `post` y resuelve la ruta con `post.resolveImage` (o una función equivalente si el tipo de archivo es nuevo).
3. **`src/lib/posts.js`** (solo si el bloque usa un tipo de archivo nuevo): añade la extensión al patrón del `import.meta.glob` de archivos.
4. **`src/components/PostContent.jsx`**: añade el caso `if (segment.type === 'audio') return <Audio key={index} … />;`.
5. **`src/assets/post.css`**: estilos del bloque, **solo con variables de `themes.css`**, y su versión móvil.
6. **Documentación**: añade el bloque a [03 · Bloques de escritura](./03-bloques-de-escritura.md) y a este documento, en el mismo commit.
7. Prueba el bloque en una entrada con `npm run dev` (4 temas, 390 px) y ejecuta `npm run build`.
