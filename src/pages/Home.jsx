import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SearchBox from '../components/SearchBox'
import ItemCard from '../components/ItemCard'
import CategoryBadge from '../components/CategoryBadge'
import Mascot from '../components/Mascot'
import { Icon } from '../utils/icons'
import { getItem, searchItems } from '../utils/search'
import home from '../data/home.json'

const HERO_CARDS = ['sachet-kopi', 'baterai', 'kulit-pisang']

export default function Home() {
  const [q, setQ] = useState('')
  const nav = useNavigate()
  const results = useMemo(() => (q.trim() ? searchItems(q).slice(0, 4) : []), [q])
  const popular = home.popular.map(getItem).filter(Boolean)
  const preview = getItem('sachet-kopi')

  const go = (value) => nav(`/pilah${value.trim() ? `?q=${encodeURIComponent(value.trim())}` : ''}`)

  return (
    <>
      <section className="hero container">
        <div className="hero__copy">
          <h1 className="hero__title">Sampah ini masuk mana?</h1>
          <p className="hero__lead">Ketik nama barangnya. Kami tunjukkan jenisnya, risikonya, dan cara menanganinya, tanpa istilah yang rumit.</p>
          <SearchBox big value={q} onChange={setQ} onSubmit={go} />
          <div className="hero__live" aria-live="polite">
            {results.length > 0 ? (
              <>
                <ul className="stack">
                  {results.map((it) => <li key={it.id}><ItemCard item={it} compact /></li>)}
                </ul>
                <button className="link-btn" onClick={() => go(q)}>Lihat semua hasil <ArrowRight size={16} /></button>
              </>
            ) : q.trim() ? (
              <p className="muted">Belum ada yang cocok. Coba kata lain, atau <Link to="/pilah?tab=tentang#usul">usulkan barangnya</Link>.</p>
            ) : (
              <div>
                <p className="hero__chips-title">Sering dicari</p>
                <div className="chips">
                  {popular.map((it) => (
                    <Link key={it.id} to={`/pilah/${it.id}`} className="chip">{it.name}</Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="hero__art" aria-hidden="true">
          {HERO_CARDS.map((id, i) => {
            const it = getItem(id)
            return (
              <div key={id} className={`tag-card tag-card--${i + 1}`} data-cat={it.category}>
                <span className="tag-card__hole" />
                <Icon name={it.icon} size={26} />
                <span className="tag-card__name">{it.name}</span>
                <CategoryBadge category={it.category} />
              </div>
            )
          })}
          <Mascot className="hero__mascot" mood="happy" size={170} />
        </div>
      </section>

      <section className="section container" aria-labelledby="cara">
        <h2 id="cara" className="section__title">Cara kerja</h2>
        <ol className="steps">
          {home.steps.map((s, i) => (
            <li key={s.title} className="steps__item">
              <span className="steps__num">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section container" aria-labelledby="info">
        <h2 id="info" className="section__title">Yang perlu kamu tahu</h2>
        <div className="grid grid--3">
          {home.infoCards.map((c) => (
            <article key={c.title} className="card info-card">
              <span className="info-card__icon"><Icon name={c.icon} size={24} /></span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section container" aria-labelledby="intip">
        <div className="preview">
          <div>
            <h2 id="intip" className="section__title">Satu barang, satu kartu lengkap</h2>
            <p className="muted">Setiap kartu berisi langkah yang bisa langsung dilakukan, bukan hanya nama tong sampahnya.</p>
            <Link to={`/pilah/${preview.id}`} className="btn btn--primary">Buka kartu {preview.name.toLowerCase()}</Link>
          </div>
          <div className="card preview__card" data-cat={preview.category}>
            <div className="preview__head">
              <span className="item-card__icon"><Icon name={preview.icon} size={22} /></span>
              <strong className="mono">{preview.name}</strong>
              <CategoryBadge category={preview.category} />
            </div>
            <dl className="preview__list">
              <dt>Kurangi</dt><dd>{preview.reduce}</dd>
              <dt>Olah</dt><dd>{preview.process}</dd>
              <dt>Serahkan</dt><dd>{preview.dispose}</dd>
            </dl>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="cta">
          <Mascot mood="cheer" size={120} />
          <div>
            <h2>Mau belajar sambil main?</h2>
            <p>Baca materinya bareng Pilo, jawab kuis ceritanya, lalu bersihkan lingkungan di game.</p>
          </div>
          <Link to="/belajar" className="btn btn--pucuk">Mulai belajar <ArrowRight size={18} /></Link>
        </div>
      </section>
    </>
  )
}
