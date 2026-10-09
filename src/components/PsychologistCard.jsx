import { initials } from './PostCard.jsx';

// Ficha de una persona del equipo: imagen a la izquierda y datos a la derecha.
export default function PsychologistCard({ persona }) {
  const { nombre, grado, especialidades = [], imagenUrl } = persona;
  // Para las iniciales se omiten títulos abreviados como "Lic." o "Mtro.".
  const sinTitulo = nombre.split(' ').filter((w) => !w.endsWith('.')).join(' ');

  return (
    <article className="psychologist-card card">
      {imagenUrl ? (
        <img className="psychologist-photo" src={imagenUrl} alt={`Foto de ${nombre}`} />
      ) : (
        <span className="avatar psychologist-photo" role="img" aria-label={`Foto de ${nombre}`}>
          {initials(sinTitulo || nombre)}
        </span>
      )}
      <div className="psychologist-info">
        <h3>{nombre}</h3>
        <p className="psychologist-grade">{grado}</p>
        {especialidades.length > 0 && (
          <ul className="tag-list" aria-label="Especialidades">
            {especialidades.map((esp) => <li key={esp} className="tag">{esp}</li>)}
          </ul>
        )}
      </div>
    </article>
  );
}
