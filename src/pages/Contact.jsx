import { SITE } from '../config/site.js';
import { useDocumentTitle } from '../lib/useDocumentTitle.js';

export default function Contact() {
  useDocumentTitle('Contacto');
  const { crisisLine } = SITE;

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <h1>Contacto</h1>
          <p className="hero-intro">
            ¿Tienes una duda, una sugerencia o un tema que te gustaría leer? Nos encantará saber de ti.
          </p>
        </div>
      </section>

      <div className="container narrow page-content">
        <section className="card contact-card">
          <h2>Correo electrónico</h2>
          <p>Escríbenos y te responderemos en cuanto podamos.</p>
          <p><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
          <a href={`mailto:${SITE.email}`} className="btn">Escríbenos</a>
        </section>

        {SITE.social.length > 0 && (
          <section className="card contact-card">
            <h2>Redes sociales</h2>
            <ul className="social-list">
              {SITE.social.map((item) => (
                <li key={item.url}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">{item.label}</a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <aside className="crisis-notice" role="note" aria-label="Aviso de emergencias">
          <p>
            <strong>Este canal no es para emergencias.</strong> Si estás en crisis o tu vida corre
            peligro, llama gratis a la <strong>{crisisLine.name}: </strong>
            <a href={`tel:${crisisLine.phone.replace(/\D/g, '')}`}>{crisisLine.phone}</a>, disponible
            {' '}{crisisLine.hours}, o al <a href="tel:911">911</a>.
          </p>
        </aside>
      </div>
    </>
  );
}
