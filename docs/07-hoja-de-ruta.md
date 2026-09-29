# 07 · Hoja de ruta

> **Nada de lo que aparece en este documento está implementado.** Son pendientes e ideas para fases futuras. Cuando una se implemente, se documenta en el archivo correspondiente de `docs/` y se quita de aquí en el mismo commit.

| # | Función | Estado |
| :---: | :--- | :--- |
| 1 | Contador de visitas por entrada | No implementado (existe el marcador en el código) |
| 2 | Página pública `/estadisticas` | No implementado |
| 3 | Constructor visual de entradas por bloques | No implementado |
| 4 | Formulario de contacto y datos reales | No implementado |
| 5 | Contenido pendiente (videos e imágenes reales) | Pendiente |
| 6 | SEO y vistas previas al compartir | No implementado |

---

## 1. Contador de visitas por entrada

**Estado:** no implementado. En `src/pages/PostDetail.jsx` ya existe el marcador:

```jsx
{/* TODO fase contador: <PostViews id={post.id} /> */}
```

**Objetivo:** mostrar al inicio de cada entrada cuántas veces se ha leído.

**Propuesta técnica:**

- **Base de datos (Supabase):** tabla `post_views(slug text primary key, views bigint not null default 0, updated_at timestamptz not null default now())`.
- **Suma atómica:** función SQL `increment_view(p_slug text)` que haga `insert into post_views (slug, views) values (p_slug, 1) on conflict (slug) do update set views = post_views.views + 1, updated_at = now()` y devuelva el nuevo valor. Así dos visitas simultáneas nunca se pisan.
- **Seguridad:** RLS activado en `post_views` **sin políticas**, de modo que nadie puede leer ni escribir desde el navegador con la clave pública. Solo la función del servidor accede, con la clave de servicio.
- **API (Netlify Function)** en `/api/views`:
  - `POST` con `{ slug }`: llama a `increment_view` y devuelve el conteo.
  - `GET`: devuelve los conteos (`[{ slug, views }]`), para el contador y para `/estadisticas`.
  - La URL de Supabase y la clave de servicio viven **solo** en variables de entorno de Netlify (nunca en el repositorio ni en el código del navegador).
- **Componente `PostViews`** (`src/components/PostViews.jsx`) con prop `id`: hace el `POST` una sola vez por sesión y entrada (se guarda la marca en `sessionStorage`; si ya existe, hace solo `GET`) y muestra "N lecturas". Si la API falla, no muestra nada.

**Dependencias:** proyecto de Supabase, `@supabase/supabase-js` en la función (no en el sitio), carpeta `netlify/functions/` y regla de redirección `/api/*` → función.

## 2. Página pública `/estadisticas`

**Estado:** no implementado.

**Objetivo:** mostrar el alcance de cada entrada en una tabla ordenable.

**Propuesta técnica:**

- Nueva ruta `/estadisticas` en `src/App.jsx` con `src/pages/Stats.jsx`.
- Hace `GET /api/views` y **cruza** los conteos con la lista `posts` de `src/lib/posts.js`: muestra el título y la fecha de cada entrada, y **descarta los `slug` que no existan** (entradas borradas o renombradas).
- Entradas sin visitas aparecen con 0.

**Dependencias:** punto 1.

## 3. Constructor visual de entradas por bloques

**Estado:** no implementado.

**Objetivo:** que personas no técnicas creen entradas sin editar archivos ni usar Git.

**Propuesta técnica:**

- Editor de **arrastrar y soltar** con los mismos bloques de [03 · Bloques de escritura](./03-bloques-de-escritura.md): títulos, texto, listas, citas, tabla, separador, imagen sola, `MediaBlock` y `YouTube`, más un formulario para el frontmatter.
- Vista previa en vivo reutilizando `PostContent`.
- El editor genera la carpeta completa (`index.md` + imágenes) y la envía a una **Netlify Function** que la sube a GitHub en **un solo commit** (API de Git Data: blobs → tree → commit → actualizar la rama). El **token de GitHub se guarda solo en el servidor** (variable de entorno).
- **Compresión de imágenes en el navegador** antes de subirlas (redimensionar a 1600 px como máximo y convertir a `webp`), para respetar el peso recomendado.
- **Inicio de sesión de autores** (por ejemplo, Supabase Auth); la función verifica la sesión antes de escribir.
- Opción de **publicar mediante Pull Request** en lugar de commit directo a `main`, para que otra persona revise antes de publicar.

**Dependencias:** Netlify Functions, token de GitHub con permisos al repositorio, proveedor de autenticación.

## 4. Formulario de contacto y datos reales

**Estado:** no implementado. Hoy `/contacto` solo muestra el correo.

**Objetivo:** recibir mensajes sin exponer el correo y sin servidor propio.

**Propuesta técnica:**

- Formulario en `src/pages/Contact.jsx` con **Netlify Forms** (atributo `data-netlify="true"` y un formulario oculto en `index.html` para que Netlify lo detecte al compilar, porque el sitio es una SPA). Campos: nombre, correo, mensaje y un campo trampa (*honeypot*) contra spam.
- Mantener el aviso de que el canal no es para emergencias junto al formulario.
- Completar en `src/config/site.js` los datos marcados `PENDIENTE`: `email` real y la lista `social`.

**Dependencias:** ninguna externa (Netlify Forms viene incluido en Netlify).

## 5. Contenido pendiente

**Estado:** pendiente de la autoría.

- **Videos:** reemplazar los marcadores `<YouTube id="PENDIENTE" />` por IDs reales en:
  - `src/posts/ir-al-psicologo-es-para-locos/index.md`
  - `src/posts/autocuidado-cotidiano/index.md`
- **Imágenes:** sustituir las ilustraciones SVG provisionales (`portada.svg`, `ilustracion-*.svg`) por imágenes reales, siguiendo las recomendaciones de [02 · Crear entradas](./02-crear-entradas.md#4-agregar-la-portada-y-las-imágenes), y actualizar `coverImage` y las rutas del `.md` si cambia la extensión.

## 6. SEO y vistas previas al compartir

**Estado:** no implementado. Hoy todas las rutas comparten el mismo `index.html`, así que buscadores y redes sociales ven el mismo título y descripción en cualquier enlace.

**Objetivo:** que cada entrada tenga su propio título, descripción e imagen al compartirla y en los buscadores.

**Propuesta técnica:**

- **Prerenderizado de rutas** al compilar: generar un HTML estático por cada ruta (`/home`, `/sobre-nosotros`, `/contacto` y `/postdetail/<id>` para cada entrada de `posts`), por ejemplo con un script posterior a `vite build` o un plugin de prerenderizado.
- **Metaetiquetas por entrada:** `<title>`, `description` (desde `summary`), Open Graph (`og:title`, `og:description`, `og:image` desde `coverImage` con URL absoluta, `og:type=article`) y Twitter Card.
- `sitemap.xml` y `robots.txt` generados a partir de `posts`.
- Considerar portadas en `jpg`/`png` (muchas redes no muestran `svg` como vista previa).

**Dependencias:** herramienta de prerenderizado (nueva dependencia de desarrollo) y la URL definitiva del sitio.
