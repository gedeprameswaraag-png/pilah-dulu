import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'
import { NAV_LINKS, SITE } from '../config/site'

// Navbar melayang. Mode: full -> orb (lingkaran logo saat scroll) -> rising (naik) -> full (timbul kembali).
export default function Navbar() {
  const [mode, setMode] = useState('full')
  const [pop, setPop] = useState(false)
  const [menu, setMenu] = useState(false)
  const modeRef = useRef('full')
  const pinY = useRef(null)
  const { pathname } = useLocation()
  const { collapseAt, reopenHold } = SITE.navbar

  const change = (m) => { modeRef.current = m; setMode(m) }

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const m = modeRef.current
      if (m === 'rising') return
      if (y <= collapseAt) {
        pinY.current = null
        if (m !== 'full') { change('full'); setPop(true); setTimeout(() => setPop(false), 600) }
        return
      }
      if (m === 'full') {
        const pinned = pinY.current !== null
        if (!pinned || Math.abs(y - pinY.current) > reopenHold) {
          pinY.current = null
          setMenu(false)
          change('orb')
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [collapseAt, reopenHold])

  useEffect(() => setMenu(false), [pathname])

  const reopen = () => {
    change('rising')
    setTimeout(() => {
      pinY.current = window.scrollY
      change('full')
      setPop(true)
      setTimeout(() => setPop(false), 600)
    }, 360)
  }

  // Saat mengecil, seluruh lingkaran bisa diklik (klik logo tidak pindah halaman).
  const brandClick = (e) => { if (mode !== 'full') e.preventDefault() }

  const collapsed = mode !== 'full'

  return (
    <header className={`nav nav--${mode} ${pop ? 'nav--pop' : ''}`}>
      <div className="nav__shell" onClick={mode === 'orb' ? reopen : undefined}>
        <Link to="/" className="nav__brand" onClick={brandClick} aria-label={collapsed ? 'Buka navigasi' : `${SITE.name}, ke beranda`}>
          <Logo size={36} className="nav__logo" />
          <span className="nav__name">{SITE.name}</span>
        </Link>
        <nav className="nav__links" aria-label="Navigasi utama" aria-hidden={collapsed}>
          {NAV_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} tabIndex={collapsed ? -1 : 0} className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <Link to="/pilah?fokus=1" tabIndex={collapsed ? -1 : 0} className="btn btn--pucuk btn--sm nav__cta">Cari sampahmu</Link>
        <button type="button" className="nav__burger" tabIndex={collapsed ? -1 : 0} onClick={() => setMenu((v) => !v)} aria-expanded={menu} aria-label="Menu">
          {menu ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {menu && !collapsed && (
        <div className="nav__menu">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className="nav__menu-link">{l.label}</NavLink>
          ))}
          <Link to="/pilah?fokus=1" className="btn btn--pucuk">Cari sampahmu</Link>
        </div>
      )}
    </header>
  )
}
