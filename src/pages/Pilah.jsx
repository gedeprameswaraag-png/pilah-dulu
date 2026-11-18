import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'
import SearchBox from '../components/SearchBox'
import ItemCard from '../components/ItemCard'
import Mascot from '../components/Mascot'
import Reveal from '../components/Reveal'
import CountUp from '../components/CountUp'
import { Icon } from '../utils/icons'
import { ALL_ITEMS, getSource, searchItems } from '../utils/search'
import { CATEGORIES, SITE } from '../config/site'

const FILTERS = ['semua', 'organik', 'anorganik', 'b3', 'residu']

// Nama ikon harus sama dengan kunci di utils/icons.jsx
const CAT_ICONS = {
  organik: 'Leaf',
  anorganik: 'Recycle',
  b3: 'TriangleAlert',
  residu: 'Trash2',
}

export default function Pilah() {
  const [params, setParams] = useSearchParams()
  // Tentang jadi tab default
  const tab = params.get('tab') === 'cari' ? 'cari' : 'tentang'
  const q = params.get('q') ?? ''
  const kat = FILTERS.includes(params.get('kat')) ? params.get('kat') : 'semua'

  // Perubahan di dalam tab (search & filter) → replace agar tidak menumpuk history
  const update = (next) => {
    const p = new URLSearchParams(params)
    Object.entries(next).forEach(([k, v]) => (v ? p.set(k, v) : p.delete(k)))
    setParams(p, { replace: true })
  }

  // Pindah antar tab → push agar tombol back berfungsi
  const goTab = (next) => {
    const p = new URLSearchParams(params)
    if (next) p.set('tab', next)
    else p.delete('tab')
    setParams(p)
  }

  return (
    <div className="container pilah">
      <header className="page-head">
        <h1>{tab === 'cari' ? 'Pilah Sampah' : 'Tentang'}</h1>
        <p className="muted">
          {tab === 'cari'
            ? 'Cari barangnya, lihat cara menanganinya.'
            : 'Kenali dulu, baru pilah — inilah cerita di balik AMBANG.'}
        </p>
      </header>

      <div className="tabs" role="tablist" aria-label="Bagian Pilah">
        <button
          role="tab"
          aria-selected={tab === 'tentang'}
          className={`tab ${tab === 'tentang' ? 'is-active' : ''}`}
          onClick={() => goTab('')}
        >
          Tentang
        </button>
        <button
          role="tab"
          aria-selected={tab === 'cari'}
          className={`tab ${tab === 'cari' ? 'is-active' : ''}`}
          onClick={() => goTab('cari')}
        >
          Cari sampah
        </button>
      </div>

      {tab === 'cari' ? (
        <Cari
          q={q}
          kat={kat}
          update={update}
          focusOnMount={params.get('fokus') === '1'}
        />
      ) : (
        <Tentang goCari={() => goTab('cari')} />
      )}
    </div>
  )
}

/* =============================================================
   TENTANG
   ============================================================= */
const MISSIONS = [
  { icon: 'ListChecks', cat: 'organik', text: 'Menyediakan informasi pemilahan yang ringkas, akurat, dan mudah dipahami.' },
  { icon: 'Gamepad2', cat: 'anorganik', text: 'Mengedukasi lewat materi, kuis, dan permainan yang menyenangkan.' },
  { icon: 'Sprout', cat: 'b3', text: 'Membangun kebiasaan kecil yang berdampak besar, mulai dari rumah.' },
  { icon: 'Users', cat: 'residu', text: 'Terbuka pada koreksi dan kolaborasi dengan komunitas serta ahli.' },
]

// Angka sama dengan yang dipakai di beranda (SIPSN / KLH, 2025).
const BG_STATS = [
  { to: 52, decimals: 0, label: 'sampah nasional berasal dari rumah tangga' },
  { to: 31.5, decimals: 1, label: 'sampah tercatat terkelola, sisanya belum tertangani optimal' },
  { to: 39.87, decimals: 2, label: 'komposisi terbesar adalah sisa makanan, yang bisa dikompos' },
]

const CHAIN = [
  { icon: 'Sprout', label: '1 orang' },
  { icon: 'Home', label: '1 rumah' },
  { icon: 'Users', label: '1 lingkungan' },
]

const STEPS = [
  { icon: 'BookOpen', title: 'Edukasi', text: 'Pahami jenis sampah, risikonya, dan dampaknya bagi lingkungan sekitar kita.' },
  { icon: 'Search', title: 'Pemilahan', text: 'Cari barangmu di daftar, ikuti panduan kurangi-pakai ulang-olah-serahkan.' },
  { icon: 'Lightbulb', title: 'Materi & kuis', text: 'Pelajari lebih dalam lewat kartu materi dan kuis cerita bersama maskot Pilo.' },
  { icon: 'Gamepad2', title: 'Games', text: 'Praktikkan kebiasaan memilah lewat permainan singkat yang seru.' },
]

const TEAM_CATS = ['organik', 'anorganik', 'b3']

// Ambil barang secara bergantian antar kategori agar warna ticker beragam.
function mixItems(list, n) {
  const groups = {}
  list.forEach((i) => (groups[i.category] ||= []).push(i))
  const keys = Object.keys(groups)
  const out = []
  for (let r = 0; out.length < n && r < 8; r++) {
    keys.forEach((k) => {
      if (groups[k][r] && out.length < n) out.push(groups[k][r])
    })
  }
  return out
}

function Tentang({ goCari }) {
  const usedSources = [...new Set(ALL_ITEMS.flatMap((i) => i.sources))]
  const ticker = useMemo(() => mixItems(ALL_ITEMS, 14), [])

  return (
    <section className="ab">
      {/* 1. HERO — apa itu pilah sampah */}
      <div className="ab-hero">
        <div className="ab-hero__copy">
          <span className="eyebrow">Kenali dulu, baru pilah</span>
          <h2 className="ab-hero__title">
            Apa itu <mark>pilah sampah</mark>?
          </h2>
          <p className="ab-hero__lead">
            Memilah sampah adalah memisahkan barang-barang yang kita buang ke dalam kelompok yang
            tepat — <strong>organik, anorganik, B3 (bahan berbahaya &amp; beracun), dan residu</strong> —
            supaya masing-masing bisa diolah dengan cara yang benar. Ini langkah paling murah dan paling
            berdampak yang bisa dimulai dari rumah.
          </p>

          <ul className="ab-kinds" aria-label="Empat jenis sampah">
            {Object.entries(CATEGORIES).map(([key, c], i) => (
              <li key={key} style={{ '--i': i }}>
                <Link to={`/pilah?tab=cari&kat=${key}`} data-cat={key} className="ab-kind">
                  <span className="ab-kind__ico"><Icon name={CAT_ICONS[key]} size={16} /></span>
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="ab-stage" aria-hidden="true">
          <div className="ab-stage__disc" />
          <div className="ab-orbit">
            {Object.entries(CATEGORIES).map(([key, c], i) => (
              <span key={key} data-cat={key} className={`ab-tok ab-tok--${i + 1}`}>{c.label}</span>
            ))}
          </div>
          <div className="ab-stage__mascot">
            <Mascot mood="happy" size={200} />
          </div>
          <p className="ab-ask">Barang ini sebaiknya diapakan?</p>
        </div>
      </div>

      {/* Ticker barang */}
      <div className="ab-ticker" aria-hidden="true">
        <div className="ab-ticker__track">
          {[0, 1].map((g) => (
            <div key={g} className="ab-ticker__group">
              {ticker.map((it) => (
                <span key={`${g}-${it.id}`} data-cat={it.category} className="ab-tick">
                  <i />{it.name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 2. LATAR BELAKANG */}
      <Reveal className="ab-bg">
        <div className="ab-bg__copy">
          <span className="eyebrow">Kenapa {SITE.name} ada</span>
          <h2>Latar belakang</h2>
          <p>
            Setiap hari rumah tangga Indonesia menyumbang lebih dari setengah total sampah nasional.
            Sebagian besar berakhir di TPA tanpa terpilah, padahal banyak yang masih bisa didaur ulang
            atau dijadikan kompos. Sayangnya informasi cara memilah tersebar dan penuh istilah teknis,
            sehingga banyak orang ragu untuk memulai. {SITE.name} hadir untuk menjawab satu pertanyaan
            sederhana: <em>barang ini sebaiknya diapakan?</em>
          </p>
          <p className="ab-bg__src">Sumber angka: SIPSN / Kementerian Lingkungan Hidup, 2025.</p>
        </div>

        <ul className="ab-bg__stats">
          {BG_STATS.map((s, i) => (
            <Reveal as="li" key={s.label} variant="right" delay={i * 120} className="ab-stat" style={{ '--w': `${s.to}%` }}>
              <strong className="ab-stat__num">
                <CountUp to={s.to} decimals={s.decimals} suffix="%" />
              </strong>
              <p className="ab-stat__label">{s.label}</p>
              <span className="ab-stat__bar" aria-hidden="true"><span /></span>
            </Reveal>
          ))}
        </ul>
      </Reveal>

      {/* 3. VISI & MISI */}
      <div className="ab-vm">
        <Reveal variant="left" className="ab-vision">
          <span className="ab-vision__quote"><Icon name="Quote" size={22} /></span>
          <div>
            <h2 className="ab-vision__label">Visi</h2>
            <p className="ab-vision__text">
              Mewujudkan generasi yang sadar sampah — yang memilah bukan karena kewajiban, tetapi karena
              paham. Setiap orang tahu ke mana barangnya harus pergi, dan mengapa itu penting.
            </p>
          </div>
        </Reveal>

        <div className="ab-mission">
          <Reveal className="ab-head">
            <span className="eyebrow">Yang kami kerjakan</span>
            <h2>Misi</h2>
          </Reveal>
          <ol className="ab-mission__list">
            {MISSIONS.map((m, i) => (
              <Reveal as="li" key={m.text} variant="right" delay={i * 90}>
                <div className="ab-m" data-cat={m.cat}>
                  <span className="ab-m__ico"><Icon name={m.icon} size={22} /></span>
                  <div>
                    <span className="ab-m__n">0{i + 1}</span>
                    <p>{m.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>

      {/* 4. HARAPAN KAMI */}
      <Reveal className="ab-hope">
        <div className="ab-hope__copy">
          <span className="eyebrow">Harapan kami</span>
          <h2>Satu langkah kecil, riaknya menyebar.</h2>
          <p>
            Kami berharap {SITE.name} bukan sekadar kamus sampah, tetapi titik awal perubahan. Bahwa
            setiap kali seseorang bertanya <em>"ini masuk tong mana?"</em>, ia teringat pada satu langkah
            kecil yang ia mulai hari ini. Satu orang yang memilah bisa menginspirasi satu rumah. Satu
            rumah bisa menginspirasi satu lingkungan.
          </p>
        </div>

        <div className="ab-chain" aria-hidden="true">
          {CHAIN.map((n, i) => (
            <Fragment key={n.label}>
              {i > 0 && <span className="ab-chain__link" />}
              <span className={`ab-node ab-node--${i + 1}`} style={{ '--i': i }}>
                <Icon name={n.icon} size={22 + i * 4} />
                <b>{n.label}</b>
              </span>
            </Fragment>
          ))}
        </div>
      </Reveal>

      {/* 5. CARA KERJA */}
      <div>
        <Reveal className="ab-head">
          <span className="eyebrow">Empat langkah</span>
          <h2>Cara kerja {SITE.name}</h2>
        </Reveal>
        <ol className="ab-steps">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.title} variant="pop" delay={i * 110} className="ab-step">
              <div className="ab-step__card">
                <div className="ab-step__top">
                  <span className="ab-step__num">{i + 1}</span>
                  <span className="ab-step__ico"><Icon name={s.icon} size={22} /></span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>

      {/* 6. CTA */}
      <Reveal className="ab-cta">
        <h2>Sudah kenal? Saatnya mencoba.</h2>
        <p>Ketik satu nama barang dan lihat ke mana ia harus pergi.</p>
        <button type="button" className="btn btn--primary" onClick={goCari}>
          Mulai memilah <ArrowRight size={18} />
        </button>
      </Reveal>

      {/* 7. SUMBER */}
      <div>
        <Reveal className="ab-head">
          <span className="eyebrow">Rujukan</span>
          <h2>Sumber</h2>
        </Reveal>
        <ol className="ab-src">
          {usedSources.map((id, i) => {
            const s = getSource(id)
            return (
              <Reveal as="li" key={id} delay={i * 60} className="ab-src__item">
                <span className="ab-src__n">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noreferrer">{s.title}</a>
                  ) : (
                    s.title
                  )}
                  <span className="muted"> — {s.issuer}</span>
                </span>
              </Reveal>
            )
          })}
        </ol>
      </div>

      {/* 8. TIM */}
      <div>
        <Reveal className="ab-head">
          <span className="eyebrow">Orang di baliknya</span>
          <h2>Tim {SITE.team.name}</h2>
        </Reveal>
        <ul className="ab-team">
          {SITE.team.members.map((m, i) => (
            <Reveal as="li" key={m.name} variant="pop" delay={i * 110}>
              <div className="ab-member" data-cat={TEAM_CATS[i % TEAM_CATS.length]}>
                <span className="ab-member__avatar">{m.name[0]}</span>
                <strong>{m.name}</strong>
                <span className="ab-member__role">{m.role}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* =============================================================
   CARI
   ============================================================= */
function Cari({ q, kat, update, focusOnMount }) {
  const ref = useRef(null)
  const [expanded, setExpanded] = useState(null)

  useEffect(() => { if (focusOnMount) ref.current?.focus() }, [focusOnMount])

  const results = useMemo(() => searchItems(q, kat), [q, kat])
  const count = (c) =>
    c === 'semua' ? ALL_ITEMS.length : ALL_ITEMS.filter((i) => i.category === c).length

  const toggle = (key) => setExpanded((v) => (v === key ? null : key))

  return (
    <section>
      {/* Search */}
      <SearchBox ref={ref} value={q} onChange={(v) => update({ q: v })} />

      {/* Filter kategori (chip) */}
      <div className="chips chips--filter" role="group" aria-label="Filter kategori">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={kat === f}
            data-cat={f === 'semua' ? undefined : f}
            className={`chip chip--filter ${kat === f ? 'is-active' : ''}`}
            onClick={() => update({ kat: f === 'semua' ? '' : f })}
          >
            {f === 'semua' ? 'Semua' : CATEGORIES[f].label} <small>{count(f)}</small>
          </button>
        ))}
      </div>

      {/* 4 jenis sampah — logo yang melebar saat diklik */}
      <div className="cat-expand" role="group" aria-label="Kenali jenis sampah">
        {Object.entries(CATEGORIES).map(([key, c]) => {
          const isOpen = expanded === key
          return (
            <article
              key={key}
              data-cat={key}
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              className={`cat-expand__card ${isOpen ? 'is-expanded' : ''}`}
              onClick={() => toggle(key)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  toggle(key)
                }
              }}
            >
              <div className="cat-expand__head">
                <span className="cat-expand__icon">
                  <Icon name={CAT_ICONS[key]} size={26} />
                </span>
                <h3>{c.label}</h3>
                <span className="cat-expand__count">{count(key)}</span>
                <ChevronDown className="cat-expand__chev" size={16} />
              </div>

              <div className="cat-expand__body">
                <div>
                  <p>{c.desc}</p>
                  <button
                    type="button"
                    className="link-btn"
                    onClick={(e) => { e.stopPropagation(); update({ kat: key }) }}
                  >
                    Lihat barangnya <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {/* Hasil */}
      <p className="results__count" aria-live="polite">{results.length} barang ditemukan</p>

      {results.length > 0 ? (
        <ul className="grid grid--3 results">
          {results.map((it) => (
            <li key={it.id}><ItemCard item={it} /></li>
          ))}
        </ul>
      ) : (
        <div className="card empty">
          <h3>Belum ada barang yang cocok</h3>
          <p>
            Coba kata yang lebih umum, misalnya "plastik" atau "baterai". Atau{' '}
            <Link to="/kontak">usulkan barangnya</Link> agar kami tambahkan.
          </p>
          <button className="btn btn--primary" onClick={() => update({ q: '', kat: '' })}>
            Reset pencarian
          </button>
        </div>
      )}
    </section>
  )
}