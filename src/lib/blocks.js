// Divide el cuerpo Markdown de una entrada en segmentos que el intérprete sabe dibujar:
//   { type: 'markdown', content }
//   { type: 'media', image, alt, align, content }
//   { type: 'youtube', id }
// Solo se reconocen <MediaBlock ...>, </MediaBlock> y <YouTube ... />, cada una en su propia línea.

const MEDIA_OPEN = /^\s*<MediaBlock\b([^>]*)>\s*$/;
const MEDIA_CLOSE = /^\s*<\/MediaBlock>\s*$/;
const YOUTUBE = /^\s*<YouTube\b([^>]*?)\/>\s*$/;
const FENCE = /^\s*(```|~~~)/;

function readAttributes(text) {
  const attrs = {};
  for (const [, name, value] of text.matchAll(/(\w+)="([^"]*)"/g)) attrs[name] = value;
  return attrs;
}

// Quita la sangría común para que el texto sangrado no se lea como bloque de código.
function dedent(lines) {
  const indents = lines
    .filter((line) => line.trim())
    .map((line) => line.match(/^[ \t]*/)[0].length);
  const common = indents.length ? Math.min(...indents) : 0;
  return lines.map((line) => line.slice(Math.min(common, line.match(/^[ \t]*/)[0].length)));
}

export function splitBlocks(body, postId = '') {
  const segments = [];
  let markdown = [];
  let media = null; // { attrs, openLine, lines }
  let fence = null; // marcador de la valla de código abierta (``` o ~~~)

  const flushMarkdown = () => {
    const content = markdown.join('\n').trim();
    if (content) segments.push({ type: 'markdown', content });
    markdown = [];
  };

  for (const line of body.split(/\r?\n/)) {
    // Dentro de un bloque de código las etiquetas no se interpretan.
    const fenceMatch = line.match(FENCE);
    if (fence) {
      if (fenceMatch && fenceMatch[1] === fence) fence = null;
      (media ? media.lines : markdown).push(line);
      continue;
    }
    if (fenceMatch) {
      fence = fenceMatch[1];
      (media ? media.lines : markdown).push(line);
      continue;
    }

    if (media) {
      if (MEDIA_CLOSE.test(line)) {
        const align = media.attrs.align === 'right' ? 'right' : 'left';
        segments.push({
          type: 'media',
          image: media.attrs.image ?? '',
          alt: media.attrs.alt ?? '',
          align,
          content: dedent(media.lines).join('\n').trim(),
        });
        media = null;
      } else {
        if (MEDIA_OPEN.test(line) || YOUTUBE.test(line)) {
          console.warn(`[${postId}] No se permite anidar bloques; la etiqueta se muestra como texto: ${line.trim()}`);
        }
        media.lines.push(line);
      }
      continue;
    }

    const open = line.match(MEDIA_OPEN);
    if (open) {
      flushMarkdown();
      media = { attrs: readAttributes(open[1]), openLine: line, lines: [] };
      continue;
    }

    const youtube = line.match(YOUTUBE);
    if (youtube) {
      flushMarkdown();
      segments.push({ type: 'youtube', id: readAttributes(youtube[1]).id ?? '' });
      continue;
    }

    markdown.push(line);
  }

  // Un <MediaBlock> sin cierre se trata como texto normal hasta el final.
  if (media) {
    console.warn(`[${postId}] <MediaBlock> sin cierre; se muestra como texto normal.`);
    markdown.push(media.openLine, ...media.lines);
  }
  flushMarkdown();

  return segments;
}
