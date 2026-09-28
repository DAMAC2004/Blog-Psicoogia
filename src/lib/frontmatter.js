// Lector mínimo de frontmatter YAML (--- ... ---) sin dependencias.
// Soporta: texto, texto entre comillas y listas ["a", "b"] o con guiones.
export function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };

  const data = {};
  let currentKey = null;

  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim()) continue;

    const listItem = line.match(/^\s*-\s+(.*)$/);
    if (listItem && currentKey) {
      if (!Array.isArray(data[currentKey])) data[currentKey] = [];
      data[currentKey].push(clean(listItem[1]));
      continue;
    }

    const pair = line.match(/^([\w-]+):\s*(.*)$/);
    if (!pair) continue;
    currentKey = pair[1];
    const value = pair[2].trim();

    if (value.startsWith('[') && value.endsWith(']')) {
      data[currentKey] = value.slice(1, -1).split(',').map(clean).filter(Boolean);
    } else {
      data[currentKey] = value === '' ? [] : clean(value);
    }
  }
  return { data, body: match[2] };
}

function clean(value) {
  return value.trim().replace(/^["']|["']$/g, '');
}
