import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Mascot from '../components/Mascot'
import { Icon } from '../utils/icons'

const SHORT_FACTS = [
  'Indonesia menghasilkan sekitar 34,67 juta ton sampah per tahun — lebih dari 9.000 kg setiap menit.',
  'Hanya sekitar 31% sampah nasional yang tercatat terkelola. Sisanya menumpuk di TPA atau bocor ke lingkungan.',
  'Sisa makanan menyumbang hampir 40% dari total sampah Indonesia. Membuang makanan = membuang air, lahan, dan energi.',
  '52% sampah berasal dari rumah tangga. Perubahan kecil di daparmu berdampak besar secara nasional.',
  'Sampah plastik ±20% dari total sampah nasional, tetapi butuh ratusan tahun untuk terurai.',
  '75% sampah Indonesia belum terkelola efektif. Memilah dari rumah adalah langkah termurah.',
  'Satu kantong plastik bisa mencemari air tanah puluhan tahun. Bawa tas sendiri, mulai hari ini.',
]

const WASTE_STATS = [
  { value: '34,67 jt', unit: 'ton / tahun', label: 'Timbulan sampah nasional', note: 'Laporan 327 kabupaten/kota, 2025' },
  { value: '31,5%', unit: 'terkelola', label: 'Sampah tercatat dikelola', note: '≈10,92 juta ton; sisanya belum tertangani optimal' },
  { value: '39,87%', unit: 'sisa makanan', label: 'Komposisi terbesar', note: 'Disusul plastik 20,14% dan kertas 10,37%' },
  { value: '52%', unit: 'rumah tangga', label: 'Sumber sampah utama', note: 'Perubahan dimulai dari dapur dan kebiasaan kita' },
]

const POLLUTION = [
  {
    key: 'air', icon: 'droplets', short: 'Air', title: 'Pencemaran Air',
    text: 'Sampah plastik dan limbah rumah tangga mencemari sungai, danau, dan air tanah yang kita minum.'
  },
  {
    key: 'tanah', icon: 'sprout', short: 'Tanah', title: 'Pencemaran Tanah',
    text: 'Sampah yang tidak terurai melepaskan zat berbahaya ke tanah dan merusak ekosistem.'
  },
  {
    key: 'udara', icon: 'wind', short: 'Udara', title: 'Pencemaran Udara',
    text: 'Pembakaran sampah dan gas dari TPA menghasilkan polutan yang berbahaya bagi pernapasan.'
  },
]

let factIndex = 0

export default function Home() {
  const [fact] = useState(() => {
    const f = SHORT_FACTS[factIndex % SHORT_FACTS.length]
    factIndex += 1
    return f
  })
  const [openItem, setOpenItem] = useState(null)

  return (
    <>
      {/* ================= HERO (menyatu dengan navbar) ================= */}
      <section className="home-hero">
        <div className="home-hero__art" aria-hidden="true">
          <img src="/background.svg" alt="" />
        </div>

        <div className="container home-hero__inner">
          <div className="home-hero__copy">
            <span className="eyebrow">Tahukah kamu?</span>
            <h1 className="home-hero__title">
              Hal kecil yang kamu lakukan hari ini bisa membawa perubahan besar bagi lingkungan.
            </h1>
            <p className="home-hero__lead">
              “Langkah kecil, dampak besar.”
            </p>
            <div className="home-hero__actions">
              <Link to="/pilah?tab=tentang" className="btn btn--primary">
                Cari sampahmu <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ BRIDGE PENCEMARAN (tepat di garis batas) ============ */}
      <div className="pollution-bridge">
        <div className="pollution-bridge__inner">
          <span className="pollution-bridge__label">Pencemaran</span>
          {POLLUTION.map((p) => (
            <div key={p.key} className="pollution-bridge__item">
              <button
                type="button"
                className={`pollution-pill pollution-pill--${p.key} ${openItem === p.key ? 'is-open' : ''}`}
                onClick={() => setOpenItem(openItem === p.key ? null : p.key)}
                aria-expanded={openItem === p.key}
              >
                <Icon name={p.icon} size={16} />
                <span>{p.short}</span>
              </button>
              {openItem === p.key && (
                <div className="pollution-pill__panel" role="region">
                  <h4>{p.title}</h4>
                  <p>{p.text}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ============ FAKTA SAMPAH INDONESIA ============ */}
      <section className="facts" aria-labelledby="fakta">
        <div className="container">
          <div className="facts__head">
            <div>
              <span className="eyebrow">Fakta Sampah Indonesia</span>
              <h2 id="fakta" className="facts__title">Angka yang perlu kita hadapi bersama</h2>
            </div>
            <a
              href="https://sampahnasional.kemenlh.go.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--pucuk btn--sm"
            >
              Selengkapnya <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="stats">
            {WASTE_STATS.map((s) => (
              <article key={s.label} className="stat">
                <strong className="stat__value">
                  {s.value}
                  <small>{s.unit}</small>
                </strong>
                <h3>{s.label}</h3>
                <p>{s.note}</p>
              </article>
            ))}
          </div>

          <p className="facts__source">Sumber: SIPSN / Kementerian Lingkungan Hidup, 2025.</p>
        </div>
      </section>

      {/* ============ BELAJAR BERSAMA AMBANG ============ */}
      <section className="section section--learn container" aria-labelledby="belajar">
        <div className="learn">
          <Mascot className="learn__mascot" mood="cheer" size={140} />
          <div className="learn__copy">
            <span className="eyebrow">Mulai belajar bersama Pilo</span>
            <h2 id="belajar">Belajar sambil bertindak, satu langkah kecil setiap hari.</h2>
            <p>Kenali jenis sampah, pahami risikonya, dan temukan cara menanganinya lewat kartu interaktif dan kuis seru.</p>
          </div>
          <Link to="/belajar" className="btn btn--primary learn__cta">
            Mulai belajar <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  )
}