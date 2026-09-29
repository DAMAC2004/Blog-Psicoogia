const VALID_ID = /^[A-Za-z0-9_-]{11}$/;

// Reproductor 16:9 responsivo. Con un id no válido (por ejemplo "PENDIENTE") muestra un marcador.
export default function YouTube({ id }) {
  if (!VALID_ID.test(id ?? '')) {
    return (
      <div className="youtube youtube-pending" role="note">
        <span>Video pendiente de agregar</span>
      </div>
    );
  }

  return (
    <div className="youtube">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title="Video de YouTube"
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}
