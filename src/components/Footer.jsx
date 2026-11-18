import { Link } from 'react-router-dom'
import Logo from './Logo'
import { NAV_LINKS, SITE } from '../config/site'
import FooterFact from './FooterFact'

export default function Footer() {
  return (

    <footer className="footer">
      <div className="container">

        <div className="footer__grid">

          {/* KOLOM KIRI - FAKTA AMBANG */}
          <div className="footer__fact-column">
            <FooterFact />

            <div className="footer__brand-info">
              <span className="footer__brand-name">AMBANG.</span>
              <p>
                Langkah kecil, dampak besar.
                Kenali sampah dan mulai perubahan
                dari diri sendiri.
              </p>
            </div>
          </div>

          {/* KOLOM NAVIGASI */}
          <div className="footer__column">
            <h3 className="footer__h">Navigasi</h3>
            <ul>
              <li><Link to="/">Beranda</Link></li>
              <li><Link to="/pilah?tab=tentang">Pilah Sampah</Link></li>
              <li><Link to="/belajar">Belajar</Link></li>
              <li><Link to="/kontak">Kontak</Link></li>
            </ul>
          </div>

          {/* KOLOM INFORMASI */}
          <div className="footer__column">
            <h3 className="footer__h">Tentang AMBANG</h3>
            <p>
              Platform edukasi untuk mengenali,
              memahami, dan mengelola sampah
              dengan lebih bijak.
            </p>
          </div>

          {/* KOLOM SUMBER */}
          <div className="footer__column">
            <h3 className="footer__h">Referensi</h3>
            <ul>
              <li>
                <a
                  href="https://sampahnasional.kemenlh.go.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Data SIPSN
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="footer__bottom">
          <span>© 2026 AMBANG. All rights reserved.</span>
          <span>Langkah kecil, dampak besar.</span>
        </div>

      </div>
    </footer>
  )
}
