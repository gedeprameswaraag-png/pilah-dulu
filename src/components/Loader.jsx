import { useEffect, useState } from 'react'
import Logo from './Logo'
import { SITE } from '../config/site'

// Layar loading singkat: logo berputar. Atur durasi di SITE.loader.minMs.
export default function Loader({ onDone }) {
  const [leaving, setLeaving] = useState(false)
  useEffect(() => {
    const t1 = setTimeout(() => setLeaving(true), SITE.loader.minMs)
    const t2 = setTimeout(onDone, SITE.loader.minMs + 550)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])

  return (
    <div className={`loader ${leaving ? 'loader--leave' : ''}`} role="status" aria-live="polite">
      <div className="loader__logo"><Logo size={96} spin /></div>
      <p className="loader__name">{SITE.name}</p>
      <div className="loader__bar" aria-hidden="true"><span style={{ animationDuration: `${SITE.loader.minMs}ms` }} /></div>
      <p className="loader__text">{SITE.loader.text}</p>
    </div>
  )
}
