import { Link, useParams } from 'react-router-dom';
import { getPost, formatDate } from '../lib/posts.js';
import { useDocumentTitle } from '../lib/useDocumentTitle.js';
import { initials } from '../components/PostCard.jsx';
import PostContent from '../components/PostContent.jsx';
import HealthNotice from '../components/HealthNotice.jsx';

// Tiempo de lectura estimado a 200 palabras por minuto.
function readingTime(body) {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function PostDetail() {
  const { id } = useParams();
  const post = getPost(id);
  useDocumentTitle(post ? post.title : 'Entrada no encontrada');

  if (!post) {
    return (
      <div className="container narrow placeholder-page">
        <h1>Entrada no encontrada</h1>
        <Link to="/home">← Volver al blog</Link>
      </div>
    );
  }

  return (
    <div className="container narrow post-page">
      <Link to="/home" className="back-link">← Volver al blog</Link>

      <header className="post-header">
        {post.tags.length > 0 && (
          <ul className="tag-list" aria-label="Temas">
            {post.tags.map((tag) => <li key={tag} className="tag">{tag}</li>)}
          </ul>
        )}

        <h1 className="post-title">{post.title}</h1>

        <div className="post-meta">
          <span className="avatar" aria-hidden="true">{initials(post.author)}</span>
          <span className="author">{post.author}</span>
          <span className="dot" aria-hidden="true">·</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="dot" aria-hidden="true">·</span>
          <span>{readingTime(post.body)} min de lectura</span>
        </div>

        {/* TODO fase contador: <PostViews id={post.id} /> */}
      </header>

      {post.cover && <img className="post-cover" src={post.cover} alt="" />}

      <article className="post-body"><PostContent post={post} /></article>

      {post.healthNotice && <HealthNotice />}

      <Link to="/home" className="back-link">← Volver al blog</Link>
    </div>
  );
}
