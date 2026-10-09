import data from '../data/psicologos.json';

// Vite importa todas las imágenes del equipo al compilar.
const images = import.meta.glob('../assets/psicologos/*.{jpg,jpeg,png,webp,svg}', {
  query: '?url',
  import: 'default',
  eager: true,
});

function resolveImage(ruta) {
  if (!ruta) return null;
  const url = images[`../assets/${ruta}`];
  if (!url && import.meta.env.DEV) {
    console.warn(`[equipo] Imagen no encontrada: src/assets/${ruta}`);
  }
  return url ?? null;
}

// En desarrollo avisa si a una persona le falta un campo obligatorio.
if (import.meta.env.DEV) {
  data.forEach((p, i) => {
    const quien = p.id ? `"${p.id}"` : `en la posición ${i + 1}`;
    const faltan = ['id', 'nombre', 'grado'].filter((campo) => !p[campo]);
    if (!Array.isArray(p.especialidades)) faltan.push('especialidades (lista)');
    if (faltan.length > 0) {
      console.warn(`[equipo] A la persona ${quien} le falta: ${faltan.join(', ')}`);
    }
  });
}

export const team = data
  .filter((p) => p.activo !== false)
  .map((p) => ({ ...p, imagenUrl: resolveImage(p.imagen) }));
