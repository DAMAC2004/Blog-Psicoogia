# 06 · Despliegue

Cómo ejecutar el proyecto en local, compilarlo y publicarlo en Netlify.

## Requisitos

- Node.js 20 o superior (<https://nodejs.org>).
- Git.

## Comandos

Todos se ejecutan en la raíz del proyecto (donde está `package.json`).

| Comando | Qué hace |
| :--- | :--- |
| `npm install` | Descarga las dependencias en `node_modules/` a partir de `package-lock.json`. Se ejecuta una vez al clonar el proyecto y cada vez que cambian las dependencias. |
| `npm run dev` | Levanta el servidor de desarrollo de Vite en <http://localhost:5173>. Los cambios en `src/` (incluidas las entradas `.md`) se ven al instante. |
| `npm run build` | Compila el sitio para producción en la carpeta `dist/`. Si hay un error en el código, aquí aparece. |
| `npm run preview` | Sirve la carpeta `dist/` en local para revisar la versión compilada antes de publicarla. |

> `node_modules/` y `dist/` no se versionan (están en `.gitignore`); `package-lock.json` sí.

## Configuración de Netlify

En **Site configuration → Build & deploy** del sitio en Netlify:

| Opción | Valor |
| :--- | :--- |
| Base directory | *(vacío: la raíz del repositorio)* |
| Build command | `npm run build` |
| Publish directory | `dist` |

No hace falta ningún archivo `netlify.toml`: con estos dos valores es suficiente.

## Para qué sirve `public/_redirects`

El sitio es una aplicación de una sola página (SPA): todas las rutas (`/home`, `/sobre-nosotros`, `/postdetail/<id>`…) las resuelve React Router en el navegador. Si alguien recarga la página en `/contacto`, Netlify buscaría un archivo `contacto` que no existe y respondería con un 404.

`public/_redirects` contiene una sola regla:

```text
/*    /index.html   200
```

Significa: "para cualquier ruta, entrega `index.html` con código 200". Vite copia todo lo que hay en `public/` a `dist/` sin cambios, así que la regla llega a Netlify en cada despliegue.

## Flujo de publicación

```mermaid
flowchart LR
  A[Cambios en una rama] --> B[git merge a main]
  B --> C[git push]
  C --> D[Netlify detecta el push]
  D --> E[npm run build]
  E --> F[Publica dist/]
  F --> G[Sitio actualizado]
```

1. Se trabaja en una rama (por ejemplo `content/<id>` o `feat/...`) y se comprueba que `npm run build` pase.
2. Se fusiona la rama en `main` y se hace `git push`.
3. Netlify detecta el push a `main`, ejecuta `npm run build` y publica la carpeta `dist/`.
4. En uno o dos minutos el sitio muestra los cambios. Si la compilación falla, Netlify conserva la versión anterior y muestra el error en el registro del despliegue (*Deploys*).

Los pasos concretos para publicar una entrada están en [02 · Crear entradas](./02-crear-entradas.md#7-publicar-con-git).
