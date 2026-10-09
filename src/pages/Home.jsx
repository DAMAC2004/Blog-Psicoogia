import { useEffect, useMemo, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PostCard from '../components/PostCard.jsx';
import Pagination from '../components/Pagination.jsx';
import { SITE } from '../config/site.js';
import { posts } from '../lib/posts.js';
import { useDocumentTitle } from '../lib/useDocumentTitle.js';

const normalize = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export default function Home() {
  useDocumentTitle(SITE.blogName);
  // El estado del listado vive en la URL: ?q=texto&tema=Tema&pagina=2
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const activeTag = searchParams.get('tema');
  const rawPage = searchParams.get('pagina');
  const headingRef = useRef(null);

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

  // Primero se filtra y después se pagina el resultado.
  const perPage = SITE.postsPerPage;
  const totalPages = Math.max(1, Math.ceil(visible.length / perPage));
  const requestedPage = Number(rawPage);
  const currentPage = Number.isInteger(requestedPage)
    ? Math.min(Math.max(requestedPage, 1), totalPages)
    : 1;
  const start = (currentPage - 1) * perPage;
  const pageItems = visible.slice(start, start + perPage);

  // Actualiza parámetros de la URL; los valores vacíos se quitan.
  const updateParams = (changes, options) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      for (const [key, value] of Object.entries(changes)) {
        if (value === null || value === '' || value === 1) next.delete(key);
        else next.set(key, String(value));
      }
      return next;
    }, options);
  };

  // Si ?pagina no es válida o se sale del rango, se corrige la URL con la página más cercana.
  useEffect(() => {
    if (rawPage !== null && rawPage !== String(currentPage)) {
      updateParams({ pagina: currentPage }, { replace: true });
    }
  }, [rawPage, currentPage]);

  // Cambiar la búsqueda o el tema regresa a la página 1.
  const changeQuery = (value) => updateParams({ q: value, pagina: null }, { replace: true });
  const changeTag = (tag) => updateParams({ tema: tag, pagina: null });

  const changePage = (page) => {
    updateParams({ pagina: page });
    // Desplaza suavemente al título del listado, descontando la cabecera fija.
    requestAnimationFrame(() => {
      const heading = headingRef.current;
      if (!heading) return;
      const headerHeight = document.querySelector('.site-header')?.offsetHeight ?? 0;
      const top = heading.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  };

  const summary = visible.length === 1
    ? 'Mostrando 1 artículo'
    : `Mostrando ${start + 1}–${start + pageItems.length} de ${visible.length} artículos`;

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <h1>{SITE.blogName}</h1>
          <p className="hero-values">
            <span>Conocimiento.</span> <span>Bienestar.</span> <span>Comprensión.</span> <span>Ayuda.</span>
          </p>
          <p className="hero-intro">
            Bienvenida y bienvenido a este rincón para <strong>comprender lo que sentimos</strong> y
            derribar los estigmas que aún rodean a la salud mental.
          </p>
        </div>
      </section>

      <section className="container posts-section" aria-labelledby="latest">
        <div className="posts-header">
          <h2 id="latest" ref={headingRef}>Últimos artículos del blog</h2>
          <input
            type="search"
            className="search"
            placeholder="Buscar un artículo…"
            value={query}
            onChange={(e) => changeQuery(e.target.value)}
            aria-label="Buscar artículos"
          />
        </div>

        {allTags.length > 0 && (
          <div className="tag-filter" role="group" aria-label="Filtrar por tema">
            <button
              type="button"
              className={`chip ${activeTag === null ? 'is-active' : ''}`}
              onClick={() => changeTag(null)}
            >
              Todos
            </button>
            {allTags.map((tag) => (
              <button
                type="button"
                key={tag}
                className={`chip ${activeTag === tag ? 'is-active' : ''}`}
                onClick={() => changeTag(activeTag === tag ? null : tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        <div className="post-list">
          {pageItems.map((post) => <PostCard key={post.id} post={post} />)}
          {visible.length === 0 && (
            <p className="empty">No encontramos artículos con ese criterio.</p>
          )}
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={changePage} />
        {visible.length > 0 && <p className="pagination-summary">{summary}</p>}
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
