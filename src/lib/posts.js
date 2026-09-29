import { parseFrontmatter } from './frontmatter.js';

// Cada entrada vive en src/posts/<id>/index.md junto con sus imágenes.
// Vite lee todos los .md y todas las imágenes en tiempo de compilación.
const markdownFiles = import.meta.glob('../posts/*/index.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const imageFiles = import.meta.glob('../posts/*/*.{jpg,jpeg,png,webp,gif,svg}', {
  query: '?url',
  import: 'default',
  eager: true,
});

function folderOf(path) {
  return path.split('/').at(-2);
}

// Convierte "./portada.jpg" en la URL final que Vite genera para esa imagen.
function resolveImage(id, relativePath) {
  if (!relativePath) return null;
  if (/^https?:\/\//.test(relativePath)) return relativePath;
  const file = relativePath.replace(/^\.\//, '');
  return imageFiles[`../posts/${id}/${file}`] ?? null;
}

export const posts = Object.entries(markdownFiles)
  .map(([path, raw]) => {
    const id = folderOf(path);
    const { data, body } = parseFrontmatter(raw);
    return {
      id,
      title: data.title ?? id,
      date: data.date ?? '',
      author: data.author ?? 'Redacción',
      tags: Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [],
      summary: data.summary ?? '',
      cover: resolveImage(id, data.coverImage),
      body,
      // El lector de frontmatter devuelve texto: solo "false" oculta el aviso.
      healthNotice: data.healthNotice !== 'false',
      resolveImage: (rel) => resolveImage(id, rel),
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

export function getPost(id) {
  return posts.find((p) => p.id === id);
}

export function formatDate(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}
