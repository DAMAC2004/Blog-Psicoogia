# Documentación técnica

Documentación para las personas que mantienen el blog. Esta carpeta **no forma parte del sitio**: no se importa desde el código ni se publica (Vite solo procesa `src/` y `public/`).

## Índice

| Documento | Descripción |
| :--- | :--- |
| [01 · Arquitectura](./01-arquitectura.md) | Stack, árbol de carpetas, rutas, flujo de datos y decisiones de diseño. |
| [02 · Crear entradas](./02-crear-entradas.md) | Guía paso a paso, para personas no técnicas, para escribir y publicar un artículo. |
| [03 · Bloques de escritura](./03-bloques-de-escritura.md) | Catálogo de bloques disponibles en las entradas, con sintaxis y ejemplos. |
| [04 · Intérprete y renderizado](./04-interprete-y-renderizado.md) | Cómo se convierte un `index.md` en la página de la entrada y cómo agregar bloques nuevos. |
| [05 · Componentes y estilos](./05-componentes-y-estilos.md) | Páginas, componentes y sus props, sistema de temas, archivos CSS y `site.js`. |
| [06 · Despliegue](./06-despliegue.md) | Comandos, configuración de Netlify, `public/_redirects` y flujo de publicación. |
| [07 · Hoja de ruta](./07-hoja-de-ruta.md) | Pendientes y funciones futuras (no implementadas). |

## Por dónde empezar

- **Vas a escribir un artículo:** lee [02](./02-crear-entradas.md) y [03](./03-bloques-de-escritura.md).
- **Vas a cambiar el código:** lee [01](./01-arquitectura.md) y después el documento del área que vas a tocar.

## Cómo mantener esta documentación

- La documentación describe **lo que existe en el código**. Las rutas, archivos, funciones, props y campos que se mencionan deben coincidir exactamente con el proyecto.
- **Al cambiar el código, se actualiza el documento correspondiente en el mismo commit.** Por ejemplo, un bloque nuevo toca `src/lib/blocks.js`, `src/components/PostContent.jsx`, [03](./03-bloques-de-escritura.md) y [04](./04-interprete-y-renderizado.md) a la vez.
- Lo que está pendiente o es solo una idea va únicamente en [07 · Hoja de ruta](./07-hoja-de-ruta.md), marcado como no implementado. Cuando se implementa, se documenta en su archivo y se quita de la hoja de ruta.
- Los diagramas están en [Mermaid](https://mermaid.js.org), que GitHub muestra directamente.
