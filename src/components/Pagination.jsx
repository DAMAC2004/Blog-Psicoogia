// Con 7 páginas o menos se muestran todas; si hay más, la primera, la última,
// la actual y sus vecinas, con "…" en los huecos. Ej.: 24 páginas en la 8 → 1 … 7 8 9 … 24.
function pageItems(currentPage, totalPages) {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

  const pages = [...new Set([1, currentPage - 1, currentPage, currentPage + 1, totalPages])]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);

  const items = [];
  pages.forEach((page, index) => {
    if (index > 0 && page - pages[index - 1] > 1) items.push(`hueco-${page}`);
    items.push(page);
  });
  return items;
}

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <nav className="pagination" aria-label="Paginación">
      <button
        type="button"
        className="chip pagination-step"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirst}
        aria-label="Página anterior"
      >
        ← <span className="pagination-label">Anterior</span>
      </button>

      {pageItems(currentPage, totalPages).map((item) =>
        typeof item === 'string' ? (
          <span key={item} className="pagination-gap" aria-hidden="true">…</span>
        ) : (
          <button
            type="button"
            key={item}
            className={`chip pagination-page ${item === currentPage ? 'is-active' : ''}`}
            onClick={() => onPageChange(item)}
            aria-current={item === currentPage ? 'page' : undefined}
            aria-label={`Página ${item}`}
          >
            {item}
          </button>
        )
      )}

      <button
        type="button"
        className="chip pagination-step"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLast}
        aria-label="Página siguiente"
      >
        <span className="pagination-label">Siguiente</span> →
      </button>
    </nav>
  );
}
