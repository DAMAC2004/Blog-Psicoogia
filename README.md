# Blog de psicología — prototipo

React + Vite. Las entradas son archivos `.md` dentro de `src/posts/`.

## Arrancar
1. Instala Node.js 20 o superior (https://nodejs.org).
2. En esta carpeta: `npm install`
3. `npm run dev` y abre http://localhost:5173

## Rutas
- `/home` — listado de entradas
- `/postdetail/<id>` — entrada individual (provisional; `<id>` es el nombre de la carpeta)

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
