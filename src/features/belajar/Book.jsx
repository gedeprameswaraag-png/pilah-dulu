import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'
import Speaker from '../../components/Speaker'
import { Icon } from '../../utils/icons'

// Buku materi. Fase: closed -> opening -> open -> closing (setelah halaman terakhir).
export default function Book({ chapter, isLast, onClose, onFinish }) {
  const [phase, setPhase] = useState('closed')
  const [page, setPage] = useState(0)
  const [dir, setDir] = useState(1)
  const [typed, setTyped] = useState(false)
  const [skip, setSkip] = useState(0)
  const timers = useRef([])
  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms))

  useEffect(() => {
    later(() => setPhase('opening'), 700)
    later(() => setPhase('open'), 1700)
    return () => timers.current.forEach(clearTimeout)
  }, [])

  const pages = chapter.pages
  const p = pages[page]
  const last = page === pages.length - 1

  const go = (d) => { setDir(d); setTyped(false); setPage((v) => v + d) }
  const next = () => {
    if (!typed) return setSkip((v) => v + 1)
    if (!last) return go(1)
    setPhase('closing')
    later(() => onFinish(chapter.id), 1100)
  }

  const isOpen = phase === 'opening' || phase === 'open'

  return (
    <div className="book-wrap">
      <p className="book__label">{chapter.title}</p>
      <div className={`book book--${phase}`} data-accent={chapter.accent}>
        <div className="book__cover" aria-hidden={isOpen}>
          <span className="book__cover-icon"><Icon name={chapter.icon} size={54} /></span>
          <strong>{chapter.title}</strong>
          <small>Bersama Pilo</small>
        </div>

        <div className="book__spread" aria-hidden={!isOpen}>
          <section className="book__page book__page--left">
            {phase !== 'closed' && <Speaker key={`${chapter.id}-${page}`} text={p.say} mood={p.mood} size={120} layout="col" skipToken={skip} onStart={() => setTyped(false)} onDone={() => setTyped(true)} />}
          </section>
          <section className="book__page book__page--right">
            <div key={page} className={`sheet ${dir > 0 ? 'sheet--next' : 'sheet--prev'}`}>
              <h2 className="sheet__title">{p.title}</h2>
              <div className="sheet__figure">
                {p.figure.map((f) => (
                  <figure key={f.label}><span><Icon name={f.icon} size={30} /></span><figcaption>{f.label}</figcaption></figure>
                ))}
              </div>
              <ul className="sheet__points">{p.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
              <span className="sheet__no">{page + 1} / {pages.length}</span>
            </div>
          </section>
        </div>
      </div>

      <div className="book__controls">
        <button className="btn btn--ghost" onClick={() => go(-1)} disabled={page === 0 || phase !== 'open'}><ChevronLeft size={18} /> Sebelumnya</button>
        <div className="dots" aria-hidden="true">{pages.map((_, i) => <span key={i} className={i === page ? 'is-on' : i < page ? 'is-past' : ''} />)}</div>
        <button className="btn btn--primary" onClick={next} disabled={phase !== 'open'}>
          {!typed ? 'Lewati narasi' : last ? <>Selesai <Check size={18} /></> : <>Berikutnya <ChevronRight size={18} /></>}
        </button>
      </div>
      <button className="link-btn book__exit" onClick={onClose}>Tutup buku</button>
    </div>
  )
}
