import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ShieldAlert, Info } from 'lucide-react'
import CategoryBadge from '../components/CategoryBadge'
import ItemCard from '../components/ItemCard'
import { Icon } from '../utils/icons'
import { ALL_ITEMS, getItem, getSource } from '../utils/search'
import { RECYCLING } from '../config/site'

const STEPS = [
  ['reduce', 'Kurangi', 'Minus'],
  ['reuse', 'Pakai ulang', 'RefreshCw'],
  ['process', 'Olah / daur ulang', 'Recycle'],
  ['dispose', 'Buang / serahkan', 'Trash2']
]

export default function ItemDetail() {
  const { id } = useParams()
  const item = getItem(id)

  if (!item) {
    return (
      <div className="container page-head">
        <h1>Barang tidak ditemukan</h1>
        <p className="muted">Kartu ini belum ada. Coba cari dengan kata lain.</p>
        <Link to="/pilah" className="btn btn--primary">Kembali ke Pilah</Link>
      </div>
    )
  }

  const r = RECYCLING[item.recycling]
  const related = ALL_ITEMS.filter((i) => i.category === item.category && i.id !== item.id).slice(0, 3)

  return (
    <div className="container detail" data-cat={item.category}>
      <Link to="/pilah" className="back"><ArrowLeft size={18} /> Kembali ke Pilah</Link>

      <header className="card detail__head">
        <span className="detail__icon"><Icon name={item.icon} size={40} /></span>
        <div>
          <h1 className="mono">{item.name}</h1>
          <div className="item-card__meta">
            <CategoryBadge category={item.category} />
            <span className={`status status--${r.tone}`}>{r.label}</span>
          </div>
          <p className="muted detail__material">Bahan: {item.material}</p>
        </div>
      </header>

      {!item.verified && (
        <p className="callout callout--info"><Info size={18} /> Informasi ini perlu konfirmasi. Cek juga aturan di daerahmu sebelum bertindak.</p>
      )}

      <section className="card detail__impact">
        <h2>Dampaknya</h2>
        <p>{item.impact}</p>
      </section>

      <ol className="detail__steps">
        {STEPS.filter(([k]) => item[k]).map(([k, label, icon]) => (
          <li key={k} className="card step">
            <span className="step__icon"><Icon name={icon} size={20} /></span>
            <div><h3>{label}</h3><p>{item[k]}</p></div>
          </li>
        ))}
      </ol>

      {item.safety && (
        <p className="callout callout--warn"><ShieldAlert size={20} /> <span><strong>Keselamatan.</strong> {item.safety}</span></p>
      )}

      <section className="detail__sources">
        <h2>Sumber</h2>
        <ul>
          {item.sources.map((sid) => {
            const s = getSource(sid)
            return <li key={sid}>{s.url ? <a href={s.url} target="_blank" rel="noreferrer">{s.title}</a> : s.title} <span className="muted">— {s.issuer}</span></li>
          })}
        </ul>
      </section>

      {related.length > 0 && (
        <section>
          <h2>Barang sejenis</h2>
          <ul className="grid grid--3">{related.map((it) => <li key={it.id}><ItemCard item={it} /></li>)}</ul>
        </section>
      )}
    </div>
  )
}
