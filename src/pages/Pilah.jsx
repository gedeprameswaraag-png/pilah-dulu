import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchBox from '../components/SearchBox'
import ItemCard from '../components/ItemCard'
import { Icon } from '../utils/icons'
import { ALL_ITEMS, getItem, getSource, searchItems } from '../utils/search'
import { CATEGORIES, SITE } from '../config/site'
import home from '../data/home.json'

const FILTERS = ['semua', 'organik', 'anorganik', 'b3', 'residu']

export default function Pilah() {
  const [params, setParams] = useSearchParams()
  const tab = params.get('tab') === 'tentang' ? 'tentang' : 'cari'
  const q = params.get('q') ?? ''
  const kat = FILTERS.includes(params.get('kat')) ? params.get('kat') : 'semua'

  const update = (next) => {
    const p = new URLSearchParams(params)
    Object.entries(next).forEach(([k, v]) => (v ? p.set(k, v) : p.delete(k)))
    setParams(p, { replace: true })
  }

  return (
    <div className="container pilah">
      <header className="page-head">
        <h1>Pilah</h1>
        <p className="muted">Cari barangnya, lihat cara menanganinya. Kenali dulu, baru pilah.</p>
      </header>

      <div className="tabs" role="tablist" aria-label="Bagian Pilah">
        <button role="tab" aria-selected={tab === 'cari'} className={`tab ${tab === 'cari' ? 'is-active' : ''}`} onClick={() => update({ tab: '' })}>Cari sampah</button>
        <button role="tab" aria-selected={tab === 'tentang'} className={`tab ${tab === 'tentang' ? 'is-active' : ''}`} onClick={() => update({ tab: 'tentang' })}>Tentang</button>
      </div>

      {tab === 'cari' ? <Cari q={q} kat={kat} update={update} focusOnMount={params.get('fokus') === '1'} /> : <Tentang />}
    </div>
  )
}

function Cari({ q, kat, update, focusOnMount }) {
  const ref = useRef(null)
  useEffect(() => { if (focusOnMount) ref.current?.focus() }, [focusOnMount])
  const results = useMemo(() => searchItems(q, kat), [q, kat])
  const popular = home.popular.map(getItem).filter(Boolean)
  const count = (c) => (c === 'semua' ? ALL_ITEMS.length : ALL_ITEMS.filter((i) => i.category === c).length)

  return (
    <section>
      <SearchBox ref={ref} value={q} onChange={(v) => update({ q: v })} />
      <div className="chips chips--filter" role="group" aria-label="Filter kategori">
        {FILTERS.map((f) => (
          <button key={f} type="button" aria-pressed={kat === f} data-cat={f === 'semua' ? undefined : f} className={`chip chip--filter ${kat === f ? 'is-active' : ''}`} onClick={() => update({ kat: f === 'semua' ? '' : f })}>
            {f === 'semua' ? 'Semua' : CATEGORIES[f].label} <small>{count(f)}</small>
          </button>
        ))}
      </div>

      {!q.trim() && kat === 'semua' && (
        <>
          <p className="hero__chips-title">Sering dicari</p>
          <div className="chips">
            {popular.map((it) => <button key={it.id} className="chip" onClick={() => update({ q: it.name })}>{it.name}</button>)}
          </div>
          <div className="grid grid--4 cat-cards">
            {Object.entries(CATEGORIES).map(([key, c]) => (
              <article key={key} className="card cat-card" data-cat={key}>
                <span className="cat-card__dot" />
                <h3>{c.label}</h3>
                <p>{c.desc}</p>
                <button className="link-btn" onClick={() => update({ kat: key })}>Lihat barangnya</button>
              </article>
            ))}
          </div>
        </>
      )}

      <p className="results__count" aria-live="polite">{results.length} barang ditemukan</p>
      {results.length > 0 ? (
        <ul className="grid grid--3 results">
          {results.map((it) => <li key={it.id}><ItemCard item={it} /></li>)}
        </ul>
      ) : (
        <div className="card empty">
          <h3>Belum ada barang yang cocok</h3>
          <p>Coba kata yang lebih umum, misalnya “plastik” atau “baterai”. Atau usulkan barangnya agar kami tambahkan.</p>
          <button className="btn btn--primary" onClick={() => update({ tab: 'tentang' })}>Usulkan barang</button>
        </div>
      )}
    </section>
  )
}

function Tentang() {
  const [form, setForm] = useState({ nama: '', email: '', pesan: '' })
  const [err, setErr] = useState('')
  const [sent, setSent] = useState(false)
  const usedSources = [...new Set(ALL_ITEMS.flatMap((i) => i.sources))]

  const submit = (e) => {
    e.preventDefault()
    if (!form.nama.trim() || !/^\S+@\S+\.\S+$/.test(form.email) || form.pesan.trim().length < 5) {
      setErr('Isi nama, email yang valid, dan usulan barang atau pertanyaanmu.')
      return
    }
    setErr('')
    const body = `Nama: ${form.nama}\nEmail: ${form.email}\n\n${form.pesan}`
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent('Usulan barang Pilah Dulu')}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <section className="about">
      <div className="about__grid">
        <article className="card">
          <h2>Masalah yang ingin diselesaikan</h2>
          <p>Banyak orang sudah ingin memilah, tetapi ragu pada barang sehari-hari seperti sachet, baterai, atau minyak jelantah. Informasinya tersebar dan penuh istilah teknis. {SITE.name} menjawab satu pertanyaan sederhana: barang ini sebaiknya diapakan?</p>
        </article>
        <article className="card">
          <h2>Metode klasifikasi</h2>
          <p>Setiap barang dicocokkan ke satu kategori dengan definisi yang sama di seluruh situs, lalu diberi panduan kurangi, pakai ulang, olah, dan serahkan. Informasi yang belum terverifikasi diberi label “Perlu konfirmasi”.</p>
        </article>
      </div>

      <h2 className="section__title">Definisi kategori</h2>
      <div className="grid grid--4">
        {Object.entries(CATEGORIES).map(([k, c]) => (
          <article key={k} className="card cat-card" data-cat={k}><span className="cat-card__dot" /><h3>{c.label}</h3><p>{c.desc}</p></article>
        ))}
      </div>

      <div className="card note">
        <h2>Batasan informasi</h2>
        <p>Aturan pemilahan dan fasilitas daur ulang berbeda di tiap daerah. Kategori di situs ini adalah alat bantu belajar. Untuk B3 rumah tangga, ikuti prosedur Dinas Lingkungan Hidup setempat. Kami tidak mencantumkan alamat drop point atau nomor layanan yang belum diverifikasi.</p>
      </div>

      <h2 className="section__title">Sumber</h2>
      <ul className="sources">
        {usedSources.map((id) => {
          const s = getSource(id)
          return <li key={id}>{s.url ? <a href={s.url} target="_blank" rel="noreferrer">{s.title}</a> : s.title}<span className="muted"> — {s.issuer}</span></li>
        })}
      </ul>

      <h2 className="section__title">Tim {SITE.team.name}</h2>
      <ul className="grid grid--3 team">
        {SITE.team.members.map((m) => (
          <li key={m.name} className="card team__card"><span className="team__avatar">{m.name[0]}</span><strong>{m.name}</strong><span className="muted">{m.role}</span></li>
        ))}
      </ul>

      <h2 id="usul" className="section__title">Usulkan barang atau tanya</h2>
      <form className="card form" onSubmit={submit} noValidate>
        <label>Nama<input value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} /></label>
        <label>Email<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
        <label>Usulan barang atau pertanyaan<textarea rows="4" value={form.pesan} onChange={(e) => setForm({ ...form, pesan: e.target.value })} /></label>
        {err && <p className="form__err" role="alert">{err}</p>}
        {sent && <p className="form__ok" role="status">Aplikasi emailmu akan terbuka. Tekan kirim di sana.</p>}
        <button className="btn btn--primary" type="submit">Kirim lewat email</button>
      </form>
    </section>
  )
}
