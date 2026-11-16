import { useEffect } from 'react'
import { X } from 'lucide-react'

// Lapisan layar penuh untuk buku, kuis, dan game. Esc untuk menutup.
export default function Overlay({ onClose, children, label, wide = false, hideClose = false }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose?.()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [onClose])

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label={label}>
      <div className={`overlay__panel ${wide ? 'overlay__panel--wide' : ''}`}>
        {!hideClose && (
          <button type="button" className="overlay__close" onClick={onClose} aria-label="Tutup"><X size={22} /></button>
        )}
        {children}
      </div>
    </div>
  )
}
