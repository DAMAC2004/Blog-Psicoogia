import { useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher.jsx';
import PsiLogo from './PsiLogo.jsx';
import { MailIcon, PhoneIcon } from './ContactIcons.jsx';
import { SITE } from '../config/site.js';

const NAV_LINKS = [
  { to: '/home', label: 'Blog' },
  { to: '/sobre-nosotros', label: 'Sobre nosotros' },
  { to: '/contacto', label: 'Contacto' },
];

export default function Layout() {
  const { pathname } = useLocation();

  // Al cambiar de ruta la página vuelve arriba (los cambios de ?pagina, ?tema o ?q no cuentan).
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="site">
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/home" className="brand">
            <PsiLogo className="brand-mark" aria-hidden="true" />
            <span className="brand-name">{SITE.name}</span>
          </Link>
          <nav className="main-nav" aria-label="Principal">
            {NAV_LINKS.map((link) => <NavLink key={link.to} to={link.to}>{link.label}</NavLink>)}
          </nav>
          <ThemeSwitcher />
        </div>
      </header>

      <main id="content">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <p className="footer-brand">
              <PsiLogo size={20} className="brand-mark" aria-hidden="true" />
              <span className="brand-name">{SITE.name}</span>
            </p>
            <p className="muted">{SITE.tagline}</p>
          </div>
          <nav className="footer-nav" aria-label="Pie de página">
            <p className="footer-title">Navegación</p>
            {NAV_LINKS.map((link) => <Link key={link.to} to={link.to}>{link.label}</Link>)}
          </nav>
          <div className="footer-contact">
            <p className="footer-title">Contacto</p>
            <ul className="contact-links">
              {SITE.phones.map((phone) => (
                <li key={phone.tel}>
                  <a href={`tel:${phone.tel}`}><PhoneIcon />{phone.display}</a>
                </li>
              ))}
              <li>
                <a href={`mailto:${SITE.email}`}><MailIcon />{SITE.email}</a>
              </li>
            </ul>
          </div>
          <p className="footer-copy muted small">© {new Date().getFullYear()} · {SITE.blogName}</p>
        </div>
      </footer>
    </div>
  );
}
