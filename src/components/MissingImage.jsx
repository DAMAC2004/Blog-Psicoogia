// Recuadro discreto que sustituye a una imagen que no existe en la carpeta del post.
export default function MissingImage({ src }) {
  const name = (src ?? '').split('/').pop() || 'sin ruta';
  return <div className="image-missing" role="img" aria-label={`Imagen no encontrada: ${name}`}>Imagen no encontrada: {name}</div>;
}
