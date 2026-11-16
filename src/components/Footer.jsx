import { Link } from 'react-router-dom'
import Logo from './Logo'
import { NAV_LINKS, SITE } from '../config/site'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <Link to="/" className="footer__brand"><Logo size={40} /><span>{SITE.name}</span></Link>
          <p className="footer__tag">{SITE.tagline}</p>
        </div>
        <nav aria-label="Tautan footer">
          <h2 className="footer__h">Halaman</h2>
          <ul>
            {NAV_LINKS.map((l) => <li key={l.to}><Link to={l.to}>{l.label}</Link></li>)}
            <li><Link to="/pilah?tab=tentang">Tentang dan sumber</Link></li>
          </ul>
        </nav>
        <div>
          <h2 className="footer__h">Tim {SITE.team.name}</h2>
          <ul>{SITE.team.members.map((m) => <li key={m.name}>{m.name}</li>)}</ul>
          <p className="footer__mail"><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
        </div>
      </div>
      <div className="container footer__note">
        Aturan pemilahan dapat berbeda di tiap daerah. Ikuti petunjuk fasilitas pengelolaan sampah dan Dinas Lingkungan Hidup setempat.
      </div>
    </footer>
  )
}
