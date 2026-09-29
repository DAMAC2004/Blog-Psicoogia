import { SITE } from '../config/site.js';

// Aviso que se agrega solo al final de cada entrada (se oculta con `healthNotice: false`).
export default function HealthNotice() {
  const { name, phone, hours } = SITE.crisisLine;

  return (
    <aside className="health-notice" role="note" aria-label="Aviso de salud">
      <p>
        <strong>Este artículo es informativo y no sustituye la atención de un profesional de la salud mental.</strong>{' '}
        Si estás pasando por un momento difícil, busca apoyo. En México puedes llamar gratis a la{' '}
        <strong>{name}: <a href={`tel:${phone.replace(/\D/g, '')}`}>{phone}</a></strong>, disponible {hours}.
      </p>
    </aside>
  );
}
