import { Link, useParams } from 'react-router-dom';
import { getPost, formatDate } from '../lib/posts.js';

// Vista provisional: el renderizado completo del .md se construye en la siguiente fase.
export default function PostDetail() {
  const { id } = useParams();
  const post = getPost(id);

  if (!post) {
    return (
      <div className="container narrow placeholder-page">
        <h1>Entrada no encontrada</h1>
        <Link to="/home">← Volver al blog</Link>
      </div>
    );
  }

  return (
    <div className="container narrow placeholder-page">
      <Link to="/home">← Volver al blog</Link>
      <h1>{post.title}</h1>
      <p className="muted">{post.author} · {formatDate(post.date)}</p>
      <p className="notice">La vista completa de la entrada se construirá en la siguiente fase.</p>
    </div>
  );
}
