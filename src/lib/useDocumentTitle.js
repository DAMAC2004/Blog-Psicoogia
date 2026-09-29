import { useEffect } from 'react';
import { SITE } from '../config/site.js';

// Actualiza la pestaña del navegador con el formato "<Página> · <nombre del sitio>".
export function useDocumentTitle(page) {
  useEffect(() => {
    document.title = page ? `${page} · ${SITE.name}` : SITE.name;
  }, [page]);
}
