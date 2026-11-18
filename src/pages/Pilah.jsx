import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'
import SearchBox from '../components/SearchBox'
import ItemCard from '../components/ItemCard'
import { Icon } from '../utils/icons'
import { ALL_ITEMS, getSource, searchItems } from '../utils/search'
import { CATEGORIES, SITE } from '../config/site'

const FILTERS = ['semua', 'organik', 'anorganik', 'b3', 'residu']

// Sesuaikan nama ikon dengan yang tersedia di utils/icons.js
const CAT_ICONS = {
  organik: 'leaf',
  anorganik: 'recycle',
  b3: 'alert-triangle',
  residu: 'trash-2',
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
function Tentang({ goCari }) {
  const usedSources = [...new Set(ALL_ITEMS.flatMap((i) => i.sources))]

  return (
    <section className="about">
      {/* 1. Apa itu pilah sampah */}
      <div className="about__intro">
        <h2 className="section__title">Apa itu pilah sampah?</h2>
        <p className="about__lead">
          Memilah sampah adalah memisahkan barang-barang yang kita buang ke dalam kelompok yang
          tepat — <strong>organik, anorganik, B3 (bahan berbahaya &amp; beracun), dan residu</strong> —
          supaya masing-masing bisa diolah dengan cara yang benar. Ini langkah paling murah dan paling
          berdampak yang bisa dimulai dari rumah.
        </p>
      </div>

      {/* 2. Latar belakang */}
      <article className="card">
        <h2>Latar belakang</h2>
        <p>
          Setiap hari rumah tangga Indonesia menyumbang lebih dari setengah total sampah nasional.
          Sebagian besar berakhir di TPA tanpa terpilah, padahal banyak yang masih bisa didaur ulang
          atau dijadikan kompos. Sayangnya informasi cara memilah tersebar dan penuh istilah teknis,
          sehingga banyak orang ragu untuk memulai. {SITE.name} hadir untuk menjawab satu pertanyaan
          sederhana: <em>barang ini sebaiknya diapakan?</em>
        </p>
      </article>

      {/* 3. Visi & Misi */}
      <div className="about__vm">
        <article className="card about__vm-card">
          <h2>Visi</h2>
          <p>
            Mewujudkan generasi yang sadar sampah — yang memilah bukan karena kewajiban, tetapi karena
            paham. Setiap orang tahu ke mana barangnya harus pergi, dan mengapa itu penting.
          </p>
        </article>
        <article className="card about__vm-card">
          <h2>Misi</h2>
          <ul className="about__list">
            <li>Menyediakan informasi pemilahan yang ringkas, akurat, dan mudah dipahami.</li>
            <li>Mengedukasi lewat materi, kuis, dan permainan yang menyenangkan.</li>
            <li>Membangun kebiasaan kecil yang berdampak besar, mulai dari rumah.</li>
            <li>Terbuka pada koreksi dan kolaborasi dengan komunitas serta ahli.</li>
          </ul>
        </article>
      </div>

      {/* 4. Harapan kami */}
      <article className="card">
        <h2>Harapan kami</h2>
        <p>
          Kami berharap {SITE.name} bukan sekadar kamus sampah, tetapi titik awal perubahan. Bahwa
          setiap kali seseorang bertanya <em>"ini masuk tong mana?"</em>, ia teringat pada satu langkah
          kecil yang ia mulai hari ini. Satu orang yang memilah bisa menginspirasi satu rumah. Satu
          rumah bisa menginspirasi satu lingkungan.
        </p>
      </article>

      {/* 5. Cara kerja */}
      <h2 className="section__title">Cara kerja {SITE.name}</h2>
      <ol className="about__steps">
        <li className="about__step">
          <span className="about__step-num">1</span>
          <div>
            <h3>Edukasi</h3>
            <p>Pahami jenis sampah, risikonya, dan dampaknya bagi lingkungan sekitar kita.</p>
          </div>
        </li>
        <li className="about__step">
          <span className="about__step-num">2</span>
          <div>
            <h3>Pemilahan</h3>
            <p>Cari barangmu di daftar, ikuti panduan kurangi-pakai ulang-olah-serahkan.</p>
          </div>
        </li>
        <li className="about__step">
          <span className="about__step-num">3</span>
          <div>
            <h3>Materi &amp; kuis</h3>
            <p>Pelajari lebih dalam lewat kartu materi dan kuis cerita bersama maskot Pilo.</p>
          </div>
        </li>
        <li className="about__step">
          <span className="about__step-num">4</span>
          <div>
            <h3>Games</h3>
            <p>Praktikkan kebiasaan memilah lewat permainan singkat yang seru.</p>
          </div>
        </li>
      </ol>

      {/* 6. CTA mulai memilah */}
      <div className="about__cta">
        <button type="button" className="btn btn--primary" onClick={goCari}>
          Mulai memilah <ArrowRight size={18} />
        </button>
      </div>

      {/* 7. Sumber */}
      <h2 className="section__title">Sumber</h2>
      <ul className="sources">
        {usedSources.map((id) => {
          const s = getSource(id)
          return (
            <li key={id}>
              {s.url ? (
                <a href={s.url} target="_blank" rel="noreferrer">{s.title}</a>
              ) : (
                s.title
              )}
              <span className="muted"> — {s.issuer}</span>
            </li>
          )
        })}
      </ul>

      {/* 8. Tim */}
      <h2 className="section__title">Tim {SITE.team.name}</h2>
      <ul className="grid grid--3 team">
        {SITE.team.members.map((m) => (
          <li key={m.name} className="card team__card">
            <span className="team__avatar">{m.name[0]}</span>
            <strong>{m.name}</strong>
            <span className="muted">{m.role}</span>
          </li>
        ))}
      </ul>
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