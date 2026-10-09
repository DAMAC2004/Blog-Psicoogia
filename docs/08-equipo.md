# 08 · Equipo de psicología

Guía para actualizar las fichas del equipo que aparecen en **Sobre nosotros** (`/sobre-nosotros`). No hace falta saber programar: solo se edita un archivo de texto y, si hay foto, se copia una imagen.

> **Importante:** las 3 fichas que trae hoy el proyecto (Laura Méndez, Andrés Ruiz y Sofía Herrera) y sus ilustraciones son **ficticias**, solo para pruebas. Hay que reemplazarlas por las del equipo real.

## Dónde está cada cosa

```text
src/
├── data/
│   └── psicologos.json          ← información del equipo (este es el archivo que se edita)
└── assets/
    └── psicologos/              ← fotos o ilustraciones del equipo
        ├── psicologa-1.svg
        ├── psicologo-2.svg
        └── psicologa-3.svg
```

`src/lib/team.js` lee el JSON, quita a las personas con `"activo": false` y busca cada imagen. `src/components/PsychologistCard.jsx` dibuja la ficha. No necesitas tocar ninguno de los dos.

## Formato de `psicologos.json`

El archivo es una **lista** (entre `[` y `]`) con una **ficha** por persona (entre `{` y `}`). **El orden de la lista es el orden en que aparecen en la página.**

| Campo | ¿Obligatorio? | Ejemplo | Descripción |
| :--- | :---: | :--- | :--- |
| `id` | Sí | `"laura-mendez"` | Único, en minúsculas y con guiones, sin acentos ni espacios. No se muestra; sirve para distinguir las fichas. |
| `nombre` | Sí | `"Lic. Laura Méndez Ortiz"` | Nombre completo, con título si aplica. |
| `grado` | Sí | `"Licenciatura en Psicología"` | Grado de estudio (licenciatura, maestría, doctorado…). |
| `especialidades` | Sí | `["Duelo", "Terapia de pareja"]` | Lista de casos o terapias. Cada una se muestra como una etiqueta. |
| `imagen` | No | `"psicologos/laura-mendez.jpg"` | Ruta de la foto **a partir de `src/assets/`**. Si no se escribe o no existe, se muestran las iniciales. |
| `activo` | No | `true` o `false` | `false` oculta la ficha sin borrar los datos. Si no se escribe, cuenta como `true`. |

## Ejemplo listo para copiar

```json
  {
    "id": "nombre-apellido",
    "nombre": "Lic. Nombre Apellido Apellido",
    "grado": "Licenciatura en Psicología",
    "especialidades": ["Especialidad 1", "Especialidad 2", "Especialidad 3"],
    "imagen": "psicologos/nombre-apellido.jpg",
    "activo": true
  }
```

## Tareas habituales

### Agregar a una persona

1. Copia su foto en `src/assets/psicologos/` (ver [La foto](#la-foto)).
2. Abre `src/data/psicologos.json`.
3. Pega el [ejemplo](#ejemplo-listo-para-copiar) en el lugar donde quieres que aparezca y rellena sus datos.
4. Revisa las comas: **cada ficha va separada de la siguiente por una coma**, y la **última** ficha **no** lleva coma después de `}`.

```json
[
  { "id": "persona-a", "...": "..." },
  { "id": "persona-b", "...": "..." },
  { "id": "persona-nueva", "...": "..." }
]
```

### Editar sus datos

Cambia el texto entre comillas del campo que quieras. Para agregar una especialidad, añádela a la lista separada por coma: `["Duelo", "Ansiedad", "Nueva"]`.

### Reordenar

Corta la ficha completa (desde `{` hasta `}`) y pégala en la nueva posición. Después revisa las comas, como en "Agregar".

### Ocultar a alguien (sin borrar sus datos)

Cambia `"activo": true` por `"activo": false`. La ficha desaparece de la página, pero los datos se quedan por si vuelve. Para mostrarla otra vez, regresa a `true`.

### Quitar a alguien definitivamente

Borra su ficha completa (desde `{` hasta `}`, con su coma) y su foto de `src/assets/psicologos/`.

## La foto

- **Dónde:** dentro de `src/assets/psicologos/`.
- **Nombre del archivo:** en minúsculas, con guiones, sin espacios ni acentos. Lo más fácil es usar el `id`: `laura-mendez.jpg`.
- **Cómo escribir la ruta en el JSON:** `"imagen": "psicologos/laura-mendez.jpg"` (sin `src/assets/` delante y sin `./`).
- **Formatos admitidos:** `jpg`, `jpeg`, `png`, `webp` y `svg`.
- **Tamaño recomendado:** **cuadrada, 600 × 600 px y menos de 200 KB.** La página la recorta en círculo, así que conviene que la cara quede centrada y con un poco de espacio alrededor.
- Sin foto, deja fuera el campo `imagen`: la ficha muestra las iniciales del nombre (sin el título "Lic." o "Mtro.").

## Revisar en tu computadora

```bash
npm run dev
```

Abre <http://localhost:5173/sobre-nosotros> y revisa las fichas en un tema claro, uno oscuro y en tamaño de celular. Abre también la consola del navegador (F12 → pestaña **Consola**) y comprueba que no haya avisos `[equipo]`.

## Errores comunes

### La página se queda en blanco o `npm run dev` muestra un error de JSON

Casi siempre es una **coma de más o de menos**:

- Falta una coma entre dos fichas (`}` seguido de `{` sin coma).
- Sobra una coma después de la última ficha o después del último campo de una ficha (`"activo": true,` justo antes de `}`).
- Faltan comillas dobles `"` en algún texto, o se usaron comillas tipográficas (`“ ”`) en lugar de `"`.

El mensaje de error indica la línea aproximada. Puedes pegar el contenido del archivo en un validador de JSON (por ejemplo <https://jsonlint.com>) para encontrarlo.

### La foto no aparece y salen las iniciales

La ruta no coincide con el archivo. En la consola aparece:

```text
[equipo] Imagen no encontrada: src/assets/psicologos/laura-mendez.jpg
```

Revisa que:

- el archivo esté dentro de `src/assets/psicologos/`;
- el nombre sea **idéntico**, incluidas mayúsculas y extensión (`.jpg` no es lo mismo que `.JPG` ni que `.jpeg`);
- la ruta empiece por `psicologos/`.

Si acabas de agregar la foto con `npm run dev` abierto y sigue sin verse, detén el servidor (Ctrl + C) y vuelve a ejecutar `npm run dev`.

### Aviso de campo faltante

```text
[equipo] A la persona "laura-mendez" le falta: grado
```

Completa el campo indicado. Si la ficha no tiene `id`, el aviso dice su posición en la lista (por ejemplo, "en la posición 2"). `especialidades` debe ser una lista entre corchetes, aunque tenga un solo elemento: `["Duelo"]`.

### La persona no aparece

Revisa que no tenga `"activo": false`.

## Publicar el cambio con Git

```bash
git switch main
git pull
git switch -c content/equipo
# … editar psicologos.json y copiar las fotos …
npm run build
git add src/data/psicologos.json src/assets/psicologos
git commit -m "content: actualizar equipo de psicologia"
git switch main
git merge content/equipo
git push
```

`npm run build` debe terminar sin errores antes del commit. Después del `git push`, Netlify publica el sitio en uno o dos minutos (ver [06 · Despliegue](./06-despliegue.md)).
