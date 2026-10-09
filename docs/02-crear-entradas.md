# 02 · Crear entradas

Guía paso a paso para publicar un artículo nuevo, pensada para personas sin experiencia técnica. Solo necesitas un editor de texto (por ejemplo, Visual Studio Code) y la terminal.

> Los bloques que puedes usar dentro del texto (imágenes, imagen con texto, videos…) están explicados en [03 · Bloques de escritura](./03-bloques-de-escritura.md).

## 1. Elegir el `id` y crear la carpeta

Cada entrada vive en su propia carpeta dentro de `src/posts/`. El nombre de la carpeta es el **`id`** de la entrada y forma parte de su dirección web:

```text
src/posts/limites-en-pareja/   →   https://tu-sitio/postdetail/limites-en-pareja
```

Reglas del `id`:

- Solo **minúsculas**, números y **guiones** (`-`).
- Sin espacios, sin acentos, sin `ñ` y sin signos (`¿?¡!`).
- Corto y descriptivo: `ansiedad-social`, no `articulo-nuevo-2`.
- No cambies el `id` después de publicar: la dirección de la entrada cambiaría y los enlaces antiguos dejarían de funcionar.

Crea la carpeta y, dentro, un archivo llamado exactamente `index.md`.

## 2. Escribir el frontmatter

El `index.md` empieza con un encabezado entre dos líneas `---`. Se llama *frontmatter* y contiene los datos de la entrada:

```markdown
---
title: "Título de la entrada"
date: "2026-10-01"
author: "Nombre de quien publica"
tags: ["Salud mental", "Estrés y Ansiedad"]
summary: "Resumen corto que aparece en la tarjeta del listado."
coverImage: "./portada.jpg"
---
```

| Campo | ¿Obligatorio? | Formato | Qué pasa si falta |
| :--- | :---: | :--- | :--- |
| `title` | Sí | Texto entre comillas | Se muestra el `id` como título. |
| `date` | Sí | `"AAAA-MM-DD"` (año, mes y día con dos cifras) | La entrada queda al final del listado y sin fecha. |
| `author` | No | Texto entre comillas | Aparece "Redacción". |
| `tags` | No | Lista entre corchetes: `["Tema 1", "Tema 2"]`, solo con etiquetas del [catálogo oficial](#catálogo-oficial-de-etiquetas) | La entrada no aparece en ningún filtro de temas. |
| `summary` | No | Texto de **máximo 160 caracteres** | La tarjeta no muestra resumen. |
| `coverImage` | Sí | Ruta a la imagen: `"./portada.jpg"` | La tarjeta y la entrada se muestran sin portada. |
| `healthNotice` | No | `false` | Si escribes `healthNotice: false`, esa entrada **no** muestra el aviso de salud del final. Si no lo escribes, el aviso aparece solo. |

Consejos:

- Usa siempre comillas dobles `"` en los textos.
- Los temas (`tags`) se escriben siempre igual en todas las entradas: `"Salud mental"` y `"salud mental"` serían dos filtros distintos. Copia el nombre exacto del catálogo de abajo.
- El listado se ordena por `date`, de la más reciente a la más antigua.

### Catálogo oficial de etiquetas

Las etiquetas válidas están en la lista `tags` de `src/config/site.js`. Escríbelas **exactamente** así (mayúsculas y acentos incluidos):

| Etiqueta | Para artículos sobre… |
| :--- | :--- |
| `Aprendizaje` | Estudio, memoria y formas de aprender. *Hoy ninguna entrada la usa.* |
| `Bienestar` | Autocuidado y salud emocional en el día a día. |
| `Comunicación` | Cómo expresarnos y escuchar. |
| `Estigma` | Prejuicios alrededor de la salud mental. |
| `Estrés y Ansiedad` | Estrés, ansiedad, preocupación y rumiación. |
| `Hábitos` | Rutinas y pequeños cambios cotidianos. |
| `Relaciones de pareja` | Vínculos, límites y convivencia en pareja. |
| `Salud mental` | Temas generales de salud mental. |

El filtro del home muestra **solo las etiquetas que usa al menos una entrada**: `Aprendizaje` aparecerá en cuanto un artículo la tenga.

**Agregar una etiqueta nueva:** añádela a la lista `tags` de `src/config/site.js` (en orden alfabético), agrega su fila a esta tabla y haz ambos cambios en el mismo commit.

Si una entrada usa una etiqueta que **no** está en el catálogo, el sitio funciona igual, pero con `npm run dev` la consola del navegador (F12 → Consola) muestra un aviso como:

```text
[etiquetas] La entrada "mi-entrada" usa una etiqueta fuera del catálogo: "Ansiedad"
```

Corrige el nombre en el frontmatter o agrega la etiqueta al catálogo.

## 3. Escribir el cuerpo

Debajo del segundo `---` va el texto del artículo.

- **No escribas el título otra vez**: ya aparece arriba, en grande. Empieza con un párrafo o con una sección `##`.
- **No agregues el aviso de salud** ("Este artículo es informativo…"): el sitio lo pone solo al final de cada entrada.
- Para secciones, imágenes, videos y demás, consulta [03 · Bloques de escritura](./03-bloques-de-escritura.md).

## 4. Agregar la portada y las imágenes

Todas las imágenes de una entrada van **en su misma carpeta**, junto al `index.md`:

```text
src/posts/ansiedad-social/
├── index.md
├── portada.jpg
├── ilustracion-1.jpg
└── ilustracion-2.png
```

- **Nombres**: en minúsculas, sin espacios ni acentos (`ilustracion-1.jpg`, `grafica-sueno.png`).
- **Formatos aceptados**: `jpg`, `jpeg`, `png`, `webp`, `gif`, `svg`. Otros formatos (por ejemplo `heic` o `bmp`) no se cargan.
- **Tamaño recomendado**: ancho máximo de **1600 px**.
- **Peso recomendado**: menos de **300 KB** por imagen. Puedes reducirlas con herramientas gratuitas como [Squoosh](https://squoosh.app).
- **Texto alternativo (`alt`)**: describe siempre lo que se ve ("Persona caminando junto al mar al atardecer"). Se usa como pie de foto y lo leen los lectores de pantalla.
- En el texto, las rutas empiezan con `./`: `![Descripción](./ilustracion-1.jpg)`.

## 5. Plantilla completa

Copia esto en tu `index.md` y reemplaza los textos:

```markdown
---
title: "Título de la entrada"
date: "2026-10-01"
author: "Nombre de quien publica"
tags: ["Tema 1", "Tema 2"]
summary: "Resumen de máximo 160 caracteres para la tarjeta del listado."
coverImage: "./portada.jpg"
---

Párrafo de introducción. Cuenta de qué trata el artículo y por qué le puede servir a quien lo lee.

## Primera sección

Texto de la sección con una lista:

- Primera idea
- Segunda idea

<MediaBlock image="./ilustracion-1.jpg" alt="Descripción de la imagen" align="left">
### Subtítulo junto a la imagen
Texto que acompaña a la imagen. Puede tener **negritas** y *cursivas*.
</MediaBlock>

## Segunda sección

![Descripción de la imagen a ancho completo](./ilustracion-2.jpg)

#### Un apartado

> Una idea destacada que quieras resaltar.

Si quieres profundizar, este video complementa lo que hemos platicado:

<YouTube id="PENDIENTE" />

##### Nota

Cierre del artículo.
```

## 6. Revisar en tu computadora

1. Abre la terminal en la carpeta del proyecto.
2. La primera vez, ejecuta `npm install`.
3. Ejecuta `npm run dev` y abre <http://localhost:5173>.
4. Busca tu entrada en el listado y ábrela. Revísala:
   - en un tema claro y en uno oscuro (selector de la esquina superior derecha);
   - en tamaño de celular (en el navegador: clic derecho → *Inspeccionar* → icono de celular).
5. Cuando termines, detén el servidor con `Ctrl + C` y ejecuta `npm run build`. Debe terminar con `✓ built`.

## 7. Publicar con Git

Sustituye `<id>` por el nombre de tu carpeta:

```bash
git switch main
git pull
git switch -c content/<id>
# … crear la carpeta, el index.md y las imágenes …
npm run build
git add src/posts/<id>
git commit -m "content: articulo <id>"
git switch main
git merge content/<id>
git push
```

Después del `git push`, Netlify publica el sitio en uno o dos minutos (ver [06 · Despliegue](./06-despliegue.md)).

Los mensajes de commit siguen el formato *Conventional Commits* en español: `tipo: descripción en minúsculas`.

| Tipo | Uso |
| :--- | :--- |
| `feat` | Funcionalidad nueva |
| `fix` | Corrección de errores |
| `refactor` | Reorganización de código sin cambiar su comportamiento |
| `style` | Solo estilos |
| `docs` | README y documentación |
| `content` | Texto e imágenes de entradas |
| `chore` | Configuración y dependencias |

Nunca se suben `node_modules/` ni `dist/` (ya están en `.gitignore`).

## 8. Checklist antes de publicar

- [ ] El `id` de la carpeta está en minúsculas y con guiones.
- [ ] El frontmatter tiene `title`, `date` (`AAAA-MM-DD`) y `coverImage`.
- [ ] El `summary` tiene 160 caracteres o menos.
- [ ] Las etiquetas están en el catálogo oficial (no hay avisos `[etiquetas]` en la consola).
- [ ] La portada existe en la carpeta con el mismo nombre que en `coverImage`.
- [ ] Todas las imágenes cargan (no aparece "Imagen no encontrada").
- [ ] Todas las imágenes tienen un `alt` descriptivo.
- [ ] El cuerpo no repite el título ni el aviso de salud.
- [ ] Se revisó en `npm run dev`, en un tema claro, uno oscuro y en tamaño de celular.
- [ ] `npm run build` termina sin errores.

## 9. Errores comunes

### La imagen no aparece (se ve "Imagen no encontrada: …")

- El archivo no está en la carpeta de la entrada, o el nombre no coincide **exactamente** (mayúsculas, extensión `.jpg` frente a `.jpeg`, acentos).
- La ruta no empieza con `./`.
- El formato no es uno de los aceptados.
- Si acabas de agregar la imagen, detén `npm run dev` y vuelve a ejecutarlo.

### La entrada no sale en el listado

- El archivo no se llama exactamente `index.md` o no está directamente dentro de `src/posts/<id>/`.
- Hay un filtro de tema o una búsqueda activa en el listado: pulsa "Todos" y borra la búsqueda.
- La entrada está en otra página del listado (se muestran 10 por página).

### La entrada aparece con el `id` como título, sin fecha y al final del listado

- El frontmatter no se pudo leer: debe empezar en la **primera línea** del archivo (sin líneas en blanco antes) y cerrarse con otro `---` en su propia línea.

### La fecha sale mal o la entrada aparece en otro lugar del listado

- La fecha debe ser `"AAAA-MM-DD"`: `"2026-10-01"`, no `"1/10/2026"` ni `"2026-10-1"`.

### Un `MediaBlock` se ve como código o las etiquetas aparecen como texto

- `<MediaBlock ...>` y `</MediaBlock>` deben ir **cada una en su propia línea**, sin texto antes ni después.
- Los atributos van con comillas **dobles**: `align="left"`, no `align='left'`.
- Falta el cierre `</MediaBlock>`: entonces todo lo que sigue se muestra como texto normal.
- Si el texto de adentro está sangrado (con espacios al inicio), el sitio quita la sangría común; pero si una línea tiene mucha más sangría que las demás, esa línea sí puede verse como código. Lo más seguro es no sangrar.
