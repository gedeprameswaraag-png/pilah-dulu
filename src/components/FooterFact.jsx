
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, Lightbulb } from 'lucide-react'
import Mascot from './Mascot'

const SHORT_FACTS = [
  'Indonesia menghasilkan sekitar 34,67 juta ton sampah per tahun.',
  'Sisa makanan menyumbang hampir 40% dari total sampah Indonesia.',
  'Sampah plastik membutuhkan waktu puluhan hingga ratusan tahun untuk terurai.',
  'Memilah sampah dari rumah membantu proses daur ulang menjadi lebih efektif.',
  'Sampah organik dapat diolah menjadi kompos yang bermanfaat bagi tanaman.',
  'Minyak jelantah yang dibuang ke saluran air dapat mencemari lingkungan.',
  'Membawa botol minum sendiri membantu mengurangi sampah plastik sekali pakai.',
  'Kertas dapat didaur ulang menjadi berbagai produk baru.',
  'Baterai bekas termasuk sampah B3 dan tidak boleh dibuang sembarangan.',
  'Menghabiskan makanan adalah salah satu cara sederhana mengurangi sampah.',
  'Sampah elektronik mengandung material yang perlu ditangani secara khusus.',
]

export default function FooterFact() {
  const location = useLocation()
  const [fact, setFact] = useState(SHORT_FACTS[0])

  useEffect(() => {
    setFact(current => {
      const available = SHORT_FACTS.filter(item => item !== current)
      return available[Math.floor(Math.random() * available.length)]
    })
  }, [location.pathname, location.search])

  return (
    <div className="footer-fact">
      <div className="footer-fact__mascot">
        <Mascot mood="thinking" size={92} />
      </div>

      <div className="footer-fact__content">
        <div className="footer-fact__label">
          <Lightbulb size={14} />
          <span>TAHUKAH KAMU?</span>
        </div>

        <p key={fact} className="footer-fact__text" aria-live="polite">
          {fact}
        </p>

        <Link to="/belajar" className="footer-fact__link">
          Kenali lebih banyak
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}
