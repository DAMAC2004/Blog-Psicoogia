import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { splitBlocks } from '../lib/blocks.js';
import MediaBlock from './MediaBlock.jsx';
import YouTube from './YouTube.jsx';
import MissingImage from './MissingImage.jsx';

const isImage = (child) => child.type === 'element' && child.tagName === 'img';
const isBlank = (child) => child.type === 'text' && !child.value.trim();

// Sobrescrituras de ReactMarkdown que dependen del post (para resolver sus imágenes).
function markdownComponents(post) {
  return {
    img({ src, alt }) {
      const url = post.resolveImage(src);
      return (
        <figure className="post-figure">
          {url ? <img src={url} alt={alt ?? ''} loading="lazy" /> : <MissingImage src={src} />}
          {alt && <figcaption>{alt}</figcaption>}
        </figure>
      );
    },
    // ReactMarkdown mete las imágenes dentro de <p>; evitamos anidar <figure> en <p>.
    p({ node, children }) {
      const content = node.children.filter((child) => !isBlank(child));
      if (content.length === 1 && isImage(content[0])) return <>{children}</>;
      if (content.some(isImage)) return <div className="post-paragraph">{children}</div>;
      return <p>{children}</p>;
    },
    a({ href, children }) {
      if (/^https?:\/\//.test(href ?? '')) {
        return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
      }
      return <a href={href}>{children}</a>;
    },
  };
}

export default function PostContent({ post }) {
  const segments = useMemo(() => splitBlocks(post.body, post.id), [post]);
  const components = useMemo(() => markdownComponents(post), [post]);

  const markdown = (content) => (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{content}</ReactMarkdown>
  );

  return segments.map((segment, index) => {
    if (segment.type === 'media') {
      return (
        <MediaBlock key={index} post={post} image={segment.image} alt={segment.alt} align={segment.align}>
          {markdown(segment.content)}
        </MediaBlock>
      );
    }
    if (segment.type === 'youtube') return <YouTube key={index} id={segment.id} />;
    return <div key={index} className="post-segment">{markdown(segment.content)}</div>;
  });
}
