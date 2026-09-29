# 03 · Bloques de escritura

Catálogo de todo lo que puedes usar en el cuerpo de una entrada (`src/posts/<id>/index.md`). Las entradas son Markdown estándar con dos etiquetas propias: `<MediaBlock>` y `<YouTube />`.

Antes de empezar, dos recordatorios:

- **El título de la entrada ya se muestra como título principal (H1)** en la cabecera, tomado del frontmatter. El cuerpo empieza con un párrafo o con `##`.
- **El aviso de salud se agrega solo** al final de cada entrada. No lo escribas en el `.md` (se puede ocultar con `healthNotice: false` en el frontmatter; ver [02 · Crear entradas](./02-crear-entradas.md#2-escribir-el-frontmatter)).

## Resumen

| Bloque | Sintaxis | Resultado |
| :--- | :--- | :--- |
| [Títulos](#títulos) | `#` a `#####` | `<h1>`…`<h5>` con los colores `--heading-1`…`--heading-5` |
| [Texto y formato](#texto-y-formato) | párrafos, `**negritas**`, `*cursivas*`, enlaces | Texto normal |
| [Listas](#listas) | `-` o `1.` | Listas con viñetas o numeradas |
| [Citas](#citas) | `> texto` | Cita con borde de color |
| [Tablas](#tablas) | `\| A \| B \|` | Tabla con encabezado |
| [Separador](#separador) | `---` en su propia línea | Línea divisoria sutil |
| [Imagen sola](#imagen-sola) | `![Descripción](./imagen.jpg)` | Imagen a ancho completo con pie de foto |
| [Texto + imagen](#texto--imagen-mediablock) | `<MediaBlock image="..." alt="..." align="...">` … `</MediaBlock>` | Imagen a un lado, texto al otro |
| [YouTube](#youtube) | `<YouTube id="..." />` | Reproductor 16:9 responsivo |

## Títulos

**Para qué sirve:** organizar el artículo en secciones.

```markdown
## Sección principal
### Subsección
#### Apartado
##### Nota breve
```

Reglas:

- Usa `##` para las secciones principales; `#` casi nunca hace falta, porque el título de la entrada ya es el H1.
- No te saltes niveles: dentro de un `##` usa `###`, no `#####`.
- Deja una línea en blanco antes y después de cada título.

## Texto y formato

**Para qué sirve:** el texto del artículo.

```markdown
Un párrafo es texto seguido. Para empezar otro párrafo, deja una línea en blanco.

Puedes usar **negritas**, *cursivas*, ~~tachado~~ y [enlaces](https://ejemplo.com).
```

Reglas:

- Los enlaces que empiezan con `http` se abren en una pestaña nueva.
- Un salto de línea simple no crea un párrafo nuevo: hace falta una línea en blanco.

## Listas

**Para qué sirve:** enumerar ideas, pasos o consejos.

```markdown
- Elemento con viñeta
- Otro elemento
  - Elemento anidado (dos espacios de sangría)

1. Primer paso
2. Segundo paso
3. Tercer paso
```

Reglas:

- Deja una línea en blanco antes y después de la lista.
- En listas numeradas puedes poner `**negritas**` al inicio para resaltar el nombre de cada punto.

## Citas

**Para qué sirve:** destacar una idea fuerza o un ejemplo de frase.

```markdown
> Pedir ayuda es un acto de valentía.
```

Reglas:

- Cada línea de la cita empieza con `>`.
- **No inventes citas atribuidas a personas reales.** Usa frases propias o ejemplos.

## Tablas

**Para qué sirve:** comparar información en columnas.

```markdown
| Reflexionar | Rumiar |
| :--- | :--- |
| Busca entender algo | Repite la misma pregunta |
| Tiene un final | Vuelve a empezar |
```

Reglas:

- La segunda línea (`| :--- |`) es obligatoria: separa el encabezado del contenido.
- Mantén las tablas cortas (2 o 3 columnas); en celular se desplazan horizontalmente si no caben.

## Separador

**Para qué sirve:** marcar un cambio de tema.

```markdown
Texto antes.

---

Texto después.
```

Reglas:

- `---` va solo en su línea, con una línea en blanco antes y después (sin la línea en blanco anterior, el texto de arriba se convierte en título).

## Imagen sola

**Para qué sirve:** una ilustración o fotografía a ancho completo.

```markdown
![Persona caminando junto al mar al atardecer](./ilustracion-1.jpg)
```

Reglas:

- La imagen va en la carpeta de la entrada y la ruta empieza con `./`.
- El texto entre corchetes es el **texto alternativo** y también el **pie de foto**: descríbela siempre.
- Escríbela sola en su párrafo (con líneas en blanco antes y después).
- Si la imagen no existe, se muestra un recuadro "Imagen no encontrada: nombre" en su lugar.
- Formatos, tamaños y pesos recomendados: ver [02 · Crear entradas](./02-crear-entradas.md#4-agregar-la-portada-y-las-imágenes).

## Texto + imagen (`MediaBlock`)

**Para qué sirve:** poner una imagen a un lado y texto al otro.

```markdown
<MediaBlock image="./ilustracion-2.jpg" alt="Dos personas conversando" align="right">
### El primer paso
Pedir ayuda no es rendirse: es **tomar decisiones** sobre tu bienestar.
</MediaBlock>
```

Atributos:

| Atributo | Obligatorio | Valores | Descripción |
| :--- | :---: | :--- | :--- |
| `image` | Sí | `"./archivo.jpg"` | Imagen de la carpeta de la entrada. Se recorta en formato cuadrado. |
| `alt` | Sí | Texto | Descripción de la imagen. |
| `align` | No | `"left"` (predeterminado) o `"right"` | `left`: imagen a la izquierda y texto a la derecha. `right`: al revés. |

Reglas:

- `<MediaBlock ...>` y `</MediaBlock>` van **cada una sola en su línea**.
- Los atributos van siempre con **comillas dobles**.
- Adentro puedes usar cualquier Markdown: títulos, párrafos, listas, tablas, citas.
- **No se anidan bloques**: dentro de un `MediaBlock` no puede ir otro `MediaBlock` ni un `YouTube` (se mostrarían como texto).
- El contenido puede ir sangrado: la sangría común se quita automáticamente.
- En celular (menos de 720 px de ancho) el bloque se apila: imagen arriba, texto abajo, sin importar `align`.
- Si falta `</MediaBlock>`, todo lo que sigue se muestra como texto normal.

## YouTube

**Para qué sirve:** insertar un video de YouTube.

```markdown
<YouTube id="dQw4w9WgXcQ" />
```

Cómo obtener el `id`: es el código de **11 caracteres** que aparece en la dirección del video.

| Dirección del video | `id` |
| :--- | :--- |
| `https://www.youtube.com/watch?v=dQw4w9WgXcQ` | `dQw4w9WgXcQ` (lo que va después de `v=`) |
| `https://youtu.be/dQw4w9WgXcQ` | `dQw4w9WgXcQ` (lo que va después de la última `/`) |

Reglas:

- La etiqueta va sola en su línea y termina en `/>`.
- Si el `id` no tiene 11 caracteres válidos, no se inserta nada de YouTube: se muestra un recuadro "Video pendiente de agregar". Por eso puedes dejar `<YouTube id="PENDIENTE" />` como marcador mientras eliges el video.
- El video se inserta desde `youtube-nocookie.com`, el modo de privacidad mejorada de YouTube.
- Introduce el video con una frase antes, para que se entienda por qué está ahí.

## Lo que no funciona

- **HTML**: cualquier otra etiqueta (`<div>`, `<br>`, `<iframe>`, `<span style="...">`…) se muestra como texto, tal cual.
- **Etiquetas en línea con texto**: `Mira esto <YouTube id="..." />` no se interpreta; la etiqueta debe ir sola.
- **Etiquetas dentro de bloques de código** (entre ```` ``` ````): se muestran como código, que es útil para documentar.
