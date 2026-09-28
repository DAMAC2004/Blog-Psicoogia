import { Link, NavLink, Outlet } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher.jsx';

export default function Layout() {
  return (
    <div className="site">
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/home" className="brand">
            <span className="brand-mark" aria-hidden="true">✿</span>
            <span className="brand-name">Mente Abierta</span>
          </Link>
          <nav className="main-nav" aria-label="Principal">
            <NavLink to="/home">Blog</NavLink>
            <a href="#sobre">Sobre nosotros</a>
            <a href="#contacto">Contacto</a>
          </nav>
          <ThemeSwitcher />
        </div>
      </header>

      <main id="content">
        <Outlet />
      </main>

      <footer className="site-footer" id="contacto">
        <div className="container footer-inner">
          <div>
            <p className="brand-name">Mente Abierta</p>
            <p className="muted">Un espacio de confianza y libre de juicios.</p>
          </div>
          <p className="muted small">© {new Date().getFullYear()} · Blog de psicología</p>
        </div>
      </footer>
    </div>
  );
}
