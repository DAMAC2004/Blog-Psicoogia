import { Link } from 'react-router-dom';
import PsychologistCard from '../components/PsychologistCard.jsx';
import { SITE } from '../config/site.js';
import { team } from '../lib/team.js';
import { useDocumentTitle } from '../lib/useDocumentTitle.js';

const VALUES = [
  { name: 'Conocimiento', text: 'Compartimos información clara y cuidada para entender mejor lo que sentimos.' },
  { name: 'Bienestar', text: 'Proponemos pequeños pasos para cuidar la salud emocional en el día a día.' },
  { name: 'Comprensión', text: 'Hablamos sin juicios: cada experiencia merece ser escuchada con respeto.' },
  { name: 'Ayuda', text: 'Recordamos que pedir apoyo es un acto de valentía, nunca de debilidad.' },
];

export default function About() {
  useDocumentTitle('Sobre nosotros');

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <h1>Sobre nosotros</h1>
          <p className="hero-intro">
            {SITE.name} es un rincón para hablar de salud mental con cercanía, claridad y sin estigmas.
          </p>
        </div>
      </section>

      <div className="container narrow page-content">
        <section className="team-section" aria-labelledby="equipo">
          <div className="team-intro">
            <h2 id="equipo">Nuestro equipo de psicología</h2>
            <p>
              Detrás de {SITE.name} hay un equipo de profesionales de la psicología comprometido con
              acercar la salud mental a la vida cotidiana. Queremos que encuentres aquí información
              clara, cercana y libre de juicios.
            </p>
            <p>
              Cada persona del equipo aporta su experiencia y su mirada para acompañarte a comprender
              lo que sientes y a dar el primer paso cuando necesites apoyo.
            </p>
          </div>
          {team.length > 0 && (
            <div className="team-list">
              {team.map((persona) => (
                <PsychologistCard key={persona.id} persona={persona} />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2>Quiénes somos</h2>
          <p>
            Somos un blog que busca acercar la psicología a la vida cotidiana. Creemos que entender
            lo que nos pasa por dentro no debería ser un privilegio ni un tabú, y queremos ayudar a
            derribar el estigma que todavía rodea a la salud mental.
          </p>
        </section>

        <section>
          <h2>Qué encontrarás aquí</h2>
          <ul className="page-list">
            <li>Artículos informativos escritos con cuidado y respeto.</li>
            <li>Temas de salud mental, bienestar, relaciones y hábitos cotidianos.</li>
            <li>Lenguaje claro, sin tecnicismos innecesarios.</li>
          </ul>
        </section>

        <section>
          <h2>Nuestros valores</h2>
          <div className="values-grid">
            {VALUES.map((value) => (
              <article key={value.name} className="card value-card">
                <h3>{value.name}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2>Nuestro compromiso</h2>
          <p>
            Todo el contenido de este blog es <strong>informativo</strong> y no reemplaza la atención
            de una persona profesional de la salud mental. Si estás pasando por un momento difícil,
            te animamos a buscar apoyo.
          </p>
        </section>

        <section className="about-closing">
          <p>
            Este blog no solo busca que aprendas a <strong>gestionar la vida</strong> en muchos
            aspectos, sino visibilizar temas que todavía cargan con estigma social.
          </p>
          <p>Léenos sin juzgarte ni castigarte. <strong>No estás sola, no estás solo.</strong></p>
          <blockquote>El autoconocimiento es el primer paso para aceptar, perdonar y sanar.</blockquote>
        </section>

        <div className="page-actions">
          <Link to="/contacto" className="btn">Contáctanos</Link>
          <Link to="/home" className="btn btn-secondary">Ir al blog</Link>
        </div>
      </div>
    </>
  );
}
