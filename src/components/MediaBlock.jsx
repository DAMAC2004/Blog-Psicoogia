import MissingImage from './MissingImage.jsx';

// Bloque de imagen a un lado y texto al otro. En móvil se apila: imagen arriba, texto abajo.
export default function MediaBlock({ post, image, alt, align = 'left', children }) {
  const src = post.resolveImage(image);
  const side = align === 'right' ? 'right' : 'left';

  return (
    <section className={`media-block media-${side}`}>
      <div className="media-image">
        {src ? <img src={src} alt={alt} loading="lazy" /> : <MissingImage src={image} />}
      </div>
      <div className="media-content">{children}</div>
    </section>
  );
}
