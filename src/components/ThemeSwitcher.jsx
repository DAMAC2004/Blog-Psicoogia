import { useEffect, useState } from 'react';

export const THEMES = [
  { id: 'theme-relajado', label: 'Relajado' },
  { id: 'theme-relajado-oscuro', label: 'Relajado oscuro' },
  { id: 'theme-concentracion', label: 'Concentración' },
  { id: 'theme-concentracion-oscuro', label: 'Concentración oscuro' },
];

const STORAGE_KEY = 'blog-theme';

function readSaved() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (THEMES.some((t) => t.id === saved)) return saved;
  } catch { /* almacenamiento bloqueado */ }
  return THEMES[0].id;
}

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(readSaved);

  useEffect(() => {
    const body = document.body;
    THEMES.forEach((t) => body.classList.remove(t.id));
    body.classList.add(theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch { /* ignorar */ }
  }, [theme]);

  return (
    <label className="theme-switcher">
      <span className="visually-hidden">Tema de lectura</span>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        {THEMES.map((t) => (
          <option key={t.id} value={t.id}>{t.label}</option>
        ))}
      </select>
    </label>
  );
}
