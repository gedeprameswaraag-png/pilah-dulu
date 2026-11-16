import { useMemo, useRef, useState } from 'react'
import { Trash2 } from 'lucide-react'
import Speaker from '../../components/Speaker'
import { Icon } from '../../utils/icons'
import { getItem } from '../../utils/search'
import { CATEGORIES } from '../../config/site'
import game from '../../data/game.json'

// Game bersih-bersih: seret sampah ke tempat yang benar (pointer events: mouse dan sentuh).
// Cadangan: ketuk sampah lalu ketuk tempatnya.
export default function Game({ onClose, onQuiz }) {
  const all = useMemo(() => game.items.map((g) => ({ ...getItem(g.id), x: g.x, y: g.y })), [])
  const [left, setLeft] = useState(() => all.map((i) => i.id))
  const [mistakes, setMistakes] = useState(0)
  const [selected, setSelected] = useState(null)
  const [drag, setDrag] = useState(null)
  const [hover, setHover] = useState(null)
  const [flash, setFlash] = useState(null)
  const [say, setSay] = useState({ text: game.intro, mood: 'happy' })
  const dragRef = useRef(null)

  const total = all.length
  const clean = (total - left.length) / total
  const finished = left.length === 0
  const stars = mistakes <= 1 ? 3 : mistakes <= 4 ? 2 : 1

  const binAt = (x, y) => document.elementsFromPoint(x, y).find((el) => el.dataset?.bin)?.dataset.bin

  const drop = (id, bin) => {
    const item = all.find((i) => i.id === id)
    const ok = item.category === bin
    setSelected(null)
    setFlash({ bin, ok, k: Date.now() })
    setTimeout(() => setFlash(null), 600)
    if (ok) {
      setLeft((l) => l.filter((x) => x !== id))
      setSay({ text: `Tepat! ${item.tip}`, mood: 'cheer' })
    } else {
      setMistakes((m) => m + 1)
      setSay({ text: `Hmm, ${item.name.toLowerCase()} bukan ${CATEGORIES[bin].label}. ${item.tip}`, mood: 'oops' })
    }
  }

  const down = (e, id) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    dragRef.current = { id, x0: e.clientX, y0: e.clientY, moved: false }
    setDrag({ id, dx: 0, dy: 0 })
  }
  const move = (e) => {
    const d = dragRef.current
    if (!d) return
    const dx = e.clientX - d.x0, dy = e.clientY - d.y0
    if (Math.hypot(dx, dy) > 6) d.moved = true
    setDrag({ id: d.id, dx, dy })
    setHover(binAt(e.clientX, e.clientY) || null)
  }
  const up = (e) => {
    const d = dragRef.current
    dragRef.current = null
    setDrag(null); setHover(null)
    if (!d) return
    if (!d.moved) return setSelected((s) => (s === d.id ? null : d.id))
    const bin = binAt(e.clientX, e.clientY)
    if (bin) drop(d.id, bin)
  }
  const keyClick = (e, id) => { if (e.detail === 0) setSelected((s) => (s === id ? null : id)) } // Enter/Spasi
  const replay = () => { setLeft(all.map((i) => i.id)); setMistakes(0); setSelected(null); setSay({ text: game.intro, mood: 'happy' }) }

  return (
    <div className="game" style={{ '--clean': clean }}>
      <header className="game__head">
        <h2>{game.title}</h2>
        <div className="meter" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={Math.round(clean * 100)} aria-label="Kebersihan lingkungan">
          <span style={{ width: `${clean * 100}%` }} /><small>{total - left.length}/{total} bersih</small>
        </div>
      </header>

      <div className="game__speaker"><Speaker key={say.text} text={say.text} mood={say.mood} size={84} speed={14} layout="row" /></div>

      <div className="scene">
        <Scene clean={clean} />
        {all.filter((i) => left.includes(i.id)).map((it) => {
          const dragging = drag?.id === it.id
          return (
            <button
              key={it.id} type="button" data-cat-hint={it.category}
              className={`trash ${dragging ? 'is-drag' : ''} ${selected === it.id ? 'is-selected' : ''}`}
              style={{ left: `${it.x}%`, top: `${it.y}%`, transform: dragging ? `translate(-50%,-50%) translate(${drag.dx}px,${drag.dy}px) scale(1.12)` : undefined, '--d': `${(it.x % 7) * 0.3}s` }}
              onPointerDown={(e) => down(e, it.id)} onPointerMove={move} onPointerUp={up} onPointerCancel={up}
              onClick={(e) => keyClick(e, it.id)} aria-pressed={selected === it.id}
            >
              <span className="trash__icon"><Icon name={it.icon} size={22} /></span>
              <span className="trash__name">{it.name}</span>
            </button>
          )
        })}

        {finished && (
          <div className="game__done" role="status">
            <div className="confetti" aria-hidden="true">{Array.from({ length: 24 }, (_, i) => <i key={i} style={{ left: `${(i * 37) % 100}%`, animationDelay: `${(i % 8) * 0.12}s`, background: ['#C7F25C', '#4AA3C7', '#E4572E', '#2F6B4F'][i % 4] }} />)}</div>
            <h3>Lingkungan bersih!</h3>
            <p className="stars" aria-label={`${stars} bintang`}>{'★'.repeat(stars)}{'☆'.repeat(3 - stars)}</p>
            <p>{mistakes === 0 ? 'Tanpa salah sama sekali.' : `${mistakes} kali salah tempat. Tidak apa-apa, itu bagian dari belajar.`}</p>
            <div className="quiz__actions">
              <button className="btn btn--primary" onClick={replay}>Main lagi</button>
              <button className="btn btn--pucuk" onClick={onQuiz}>Coba kuis</button>
              <button className="btn btn--ghost" onClick={onClose}>Tutup</button>
            </div>
          </div>
        )}
      </div>

      <div className="bins" role="group" aria-label="Tempat sampah">
        {game.bins.map((b) => (
          <button
            key={b} type="button" data-bin={b} data-cat={b}
            className={`bin ${hover === b ? 'is-hover' : ''} ${selected ? 'is-ready' : ''} ${flash?.bin === b ? (flash.ok ? 'is-ok' : 'is-no') : ''}`}
            onClick={() => selected && drop(selected, b)}
          >
            <Trash2 size={26} />
            <span>{CATEGORIES[b].label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// Pemandangan: makin bersih makin cerah. Variabel --clean (0..1) diatur CSS.
function Scene({ clean }) {
  return (
    <svg className="scene__svg" viewBox="0 0 800 440" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8FD3EE" /><stop offset="1" stopColor="#E9F6E4" /></linearGradient>
      </defs>
      <rect width="800" height="440" fill="url(#sky)" />
      <circle cx="680" cy="80" r="44" fill="#FFE27A" stroke="#1F2A24" strokeWidth="3" />
      <g fill="#fff" stroke="#1F2A24" strokeWidth="3"><ellipse cx="150" cy="90" rx="60" ry="22" /><ellipse cx="420" cy="60" rx="48" ry="18" /></g>
      <path d="M0 230Q120 150 260 215T520 205T800 200V300H0Z" fill="#7DBB8C" stroke="#1F2A24" strokeWidth="3" />
      <path d="M0 290Q200 250 400 285T800 270V440H0Z" fill="#9AD27A" stroke="#1F2A24" strokeWidth="3" />
      <path d="M0 335Q200 305 380 340T800 325V360Q600 385 380 365T0 372Z" fill="#4AA3C7" stroke="#1F2A24" strokeWidth="3" />
      <g stroke="#1F2A24" strokeWidth="3">
        <rect x="60" y="215" width="14" height="50" fill="#8A5A3C" /><circle cx="67" cy="205" r="34" fill="#2F6B4F" />
        <rect x="728" y="205" width="14" height="55" fill="#8A5A3C" /><circle cx="735" cy="195" r="38" fill="#2F6B4F" />
      </g>
      <g className="scene__life" style={{ opacity: clean >= 0.5 ? 1 : 0 }}>
        {[[200, 300], [330, 285], [560, 300], [640, 290]].map(([x, y]) => (
          <g key={x}><circle cx={x} cy={y} r="7" fill="#FFB8D0" stroke="#1F2A24" strokeWidth="2.5" /><path d={`M${x} ${y + 7}v16`} stroke="#1F2A24" strokeWidth="2.5" /></g>
        ))}
      </g>
      <g className="scene__life scene__bird" style={{ opacity: clean >= 0.9 ? 1 : 0 }} stroke="#1F2A24" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M300 120q10-12 20 0q10-12 20 0" /><path d="M460 150q8-10 16 0q8-10 16 0" />
      </g>
    </svg>
  )
}
