import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard.jsx';
import { posts } from '../lib/posts.js';

const normalize = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export default function Home() {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState(null);

  const allTags = useMemo(
    () => [...new Set(posts.flatMap((p) => p.tags))].sort((a, b) => a.localeCompare(b)),
    []
  );

  const visible = posts.filter((p) => {
    const matchesTag = !activeTag || p.tags.includes(activeTag);
    const q = normalize(query.trim());
    const matchesQuery = !q || normalize(`${p.title} ${p.summary} ${p.tags.join(' ')}`).includes(q);
    return matchesTag && matchesQuery;
  });

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <h1>Blog de psicología</h1>
          <p className="hero-values">
            <span>Conocimiento.</span> <span>Bienestar.</span> <span>Comprensión.</span> <span>Ayuda.</span>
          </p>
          <p className="hero-intro">
            Bienvenida y bienvenido a este rincón para <strong>mirar hacia dentro</strong>,
            entender lo que sentimos y derribar los estigmas que aún rodean a la salud mental.
          </p>
        </div>
      </section>

      <section className="container posts-section" aria-labelledby="latest">
        <div className="posts-header">
          <h2 id="latest">Últimos artículos del blog</h2>
          <input
            type="search"
            className="search"
            placeholder="Buscar un artículo…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Buscar artículos"
          />
        </div>

        {allTags.length > 0 && (
          <div className="tag-filter" role="group" aria-label="Filtrar por tema">
            <button
              type="button"
              className={`chip ${activeTag === null ? 'is-active' : ''}`}
              onClick={() => setActiveTag(null)}
            >
              Todos
            </button>
            {allTags.map((tag) => (
              <button
                type="button"
                key={tag}
                className={`chip ${activeTag === tag ? 'is-active' : ''}`}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        <div className="post-list">
          {visible.map((post) => <PostCard key={post.id} post={post} />)}
          {visible.length === 0 && (
            <p className="empty">No encontramos artículos con ese criterio.</p>
          )}
        </div>
      </section>

      <section className="home-about">
        <div className="container home-about-inner">
          <p>
            Escribimos para acercar la psicología a la vida diaria y derribar el estigma
            alrededor de la salud mental. <Link to="/sobre-nosotros">Conoce más sobre nosotros →</Link>
          </p>
        </div>
      </section>
    </>
  );
}
