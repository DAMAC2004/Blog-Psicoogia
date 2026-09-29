import { Link } from 'react-router-dom';
import { formatDate } from '../lib/posts.js';

export function initials(name) {
  return name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
}

export default function PostCard({ post }) {
  const url = `/postdetail/${post.id}`;
  return (
    <article className="post-row card">
      <Link to={url} className="post-row-image" tabIndex={-1} aria-hidden="true">
        {post.cover
          ? <img src={post.cover} alt="" loading="lazy" />
          : <div className="post-row-placeholder" />}
      </Link>

      <div className="post-row-body">
        {post.tags.length > 0 && (
          <ul className="tag-list" aria-label="Temas">
            {post.tags.map((tag) => <li key={tag} className="tag">{tag}</li>)}
          </ul>
        )}

        <h3 className="post-row-title">
          <Link to={url}>{post.title}</Link>
        </h3>

        {post.summary && <p className="post-row-summary">{post.summary}</p>}

        <div className="post-meta">
          <span className="avatar" aria-hidden="true">{initials(post.author)}</span>
          <span className="author">{post.author}</span>
          <span className="dot" aria-hidden="true">·</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
      </div>
    </article>
  );
}
