
import { useState } from 'react'
import { Mail, ArrowUpRight, Leaf } from 'lucide-react'
import { SITE } from '../config/site'
import '../styles/kontak.css'

export default function Kontak() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    organization: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const subject = encodeURIComponent(
      `Pesan dari ${form.firstName} ${form.lastName}`
    )

    const body = encodeURIComponent(
      `Nama: ${form.firstName} ${form.lastName}
Nomor telepon: ${form.phone}
Email: ${form.email}
Organisasi: ${form.organization || '-'}

Pesan:
${form.message}`
    )

    window.location.href =
      `mailto:${SITE.email}?subject=${subject}&body=${body}`
  }

  return (
    <main className="contact-page">

      {/* HERO DAN FORM */}
      <section className="contact-hero">
        <div className="contact-hero__landscape" aria-hidden="true">
          <div className="contact-hill contact-hill--back" />
          <div className="contact-hill contact-hill--front" />

          <div className="contact-trees">
            {Array.from({ length: 13 }).map((_, index) => (
              <span
                className={`contact-tree contact-tree--${index % 3}`}
                key={index}
              />
            ))}
          </div>
        </div>

        <div className="container contact-hero__layout">

          {/* KONTEN KIRI */}
          <div className="contact-hero__content">
            <span className="contact-label">
              <Leaf size={13} />
              CONTACT
            </span>

            <h1>
              Mari Terhubung
              <span>Dengan Kami.</span>
            </h1>

            <p>
              Punya pertanyaan, saran, atau ide untuk membuat
              pengelolaan sampah menjadi lebih baik? Kami ingin
              mendengarnya. Mari bersama-sama membangun kebiasaan
              memilah sampah mulai dari rumah.
            </p>

            <div className="contact-hero__note">
              <span className="contact-hero__note-icon">
                <Mail size={17} />
              </span>
              <span>Kami terbuka untuk setiap masukanmu.</span>
            </div>
          </div>

          {/* FORM KANAN */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form__heading">
              <span>LET'S TALK</span>
              <h2>Kirim Pesan</h2>
              <p>Isi informasi berikut untuk menghubungi tim kami.</p>
            </div>

            <div className="contact-form__grid">
              <div className="contact-field">
                <label htmlFor="firstName">Nama Depan</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Nama depan"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-field">
                <label htmlFor="lastName">Nama Belakang</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Nama belakang"
                  value={form.lastName}
                  onChange={handleChange}
                />
              </div>

              <div className="contact-field">
                <label htmlFor="phone">Nomor Telepon</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="08xxxxxxxxxx"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="contact-field">
                <label htmlFor="email">Alamat Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nama@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-field contact-field--full">
                <label htmlFor="organization">
                  Instansi / Organisasi
                </label>
                <input
                  id="organization"
                  name="organization"
                  type="text"
                  placeholder="Nama instansi atau organisasi (opsional)"
                  value={form.organization}
                  onChange={handleChange}
                />
              </div>

              <div className="contact-field contact-field--full">
                <label htmlFor="message">Pesan</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Tuliskan pesan atau usulan kamu..."
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="contact-submit">
              Kirim Pesan
              <ArrowUpRight size={18} />
            </button>

            <p className="contact-form__footnote">
              Pesan akan disiapkan melalui aplikasi email kamu.
            </p>
          </form>
        </div>
      </section>

      {/* INFORMASI BAGIAN BAWAH */}
      <section className="contact-bottom">
        <div className="container contact-bottom__inner">

          <div className="contact-bottom__about">
            <span className="contact-bottom__eyebrow">
              TENTANG KAMI
            </span>
            <h2>Kenali tim di balik Pilah Dulu.</h2>
            <p>
              {SITE.name} dikembangkan oleh tim {SITE.team.name}
              {' '}untuk membantu masyarakat mengenali dan memilah
              sampah dengan lebih mudah.
            </p>
          </div>

          <div className="contact-bottom__details">
            <span className="contact-bottom__eyebrow">
              HUBUNGI KAMI
            </span>
            <a href={`mailto:${SITE.email}`}>
              {SITE.email}
              <ArrowUpRight size={19} />
            </a>

            <div className="contact-bottom__team">
              {SITE.team.members.map((member, index) => (
                <span key={`${member.name}-${index}`}>
                  {member.name}
                  <small>{member.role}</small>
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

    </main>
  )
}
