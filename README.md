# Psicoblog — Mente Abierta

Blog estático de psicología hecho con React + Vite. Las entradas son archivos Markdown dentro de `src/posts/<id>/index.md` y se publican en Netlify.

## Requisitos

- Node.js 20 o superior (<https://nodejs.org>).
- Git.

## Arrancar

```bash
npm install
npm run dev
```

Abre <http://localhost:5173>. Para compilar: `npm run build` (genera `dist/`).

## Documentación

Toda la documentación está en [`docs/`](./docs/README.md):

- [01 · Arquitectura](./docs/01-arquitectura.md): stack, carpetas, rutas, flujo de datos y decisiones de diseño.
- [02 · Crear entradas](./docs/02-crear-entradas.md): guía paso a paso para escribir y publicar un artículo.
- [03 · Bloques de escritura](./docs/03-bloques-de-escritura.md): catálogo de bloques (imágenes, `MediaBlock`, `YouTube`…).
- [04 · Intérprete y renderizado](./docs/04-interprete-y-renderizado.md): cómo se convierte un `.md` en página.
- [05 · Componentes y estilos](./docs/05-componentes-y-estilos.md): componentes, temas, CSS y `site.js`.
- [06 · Despliegue](./docs/06-despliegue.md): comandos y Netlify.
- [07 · Hoja de ruta](./docs/07-hoja-de-ruta.md): pendientes y funciones futuras.
