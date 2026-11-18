
import { useRef, useState } from 'react'
import { BookOpen, Check, Gamepad2, Lock, Volume2, VolumeX } from 'lucide-react'
import Overlay from '../../components/Overlay'
import Mascot from '../../components/Mascot'
import Speaker from '../../components/Speaker'
import { useVoice } from '../../components/VoiceContext'
import { Icon } from '../../utils/icons'
import { useProgress } from '../../hooks/useProgress'
import { SITE } from '../../config/site'
import chapters from '../../data/materials.json'
import Book from './Book'
import Quiz from './Quiz'
import Game from './Game'

// Import gambar
const bookImages = [
  '/buku1.svg',
  '/buku2.svg',
  '/buku3.svg',
  '/buku4.svg'
]

const bgMaskot = '/bgmaskot.svg'

export default function Belajar() {
  const { done, markDone, reset } = useProgress()
  const voice = useVoice()
  const [view, setView] = useState(null)
  const [nextId, setNextId] = useState(null)
  const cardsRef = useRef(null)

  const allDone = chapters.every((c) => done.includes(c.id))
  const unlocked = (i) => SITE.belajar.unlockAll || i === 0 || done.includes(chapters[i - 1].id)
  const stageOpen = allDone || SITE.belajar.unlockAll

  const finish = (id) => {
    markDone(id)
    const idx = chapters.findIndex((c) => c.id === id)

    if (idx === chapters.length - 1) {
      setView({ type: 'choice' })
    } else {
      setNextId(chapters[idx + 1].id)
      setView(null)
      setTimeout(() => cardsRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      }), 60)
    }
  }

  return (
    <div className="container belajar">

      {/* HEADER BELAJAR */}
      <header className="belajar__hero">

        <div className="belajar__hero-content">
          <span className="belajar__eyebrow">
            RUANG BELAJAR PILO
          </span>

          <h1>
            Belajar bareng {SITE.mascotName}
          </h1>

          <p className="muted">
            Baca empat bab secara berurutan.
            Setelah semuanya selesai, pilih kuis cerita
            atau game bersih-bersih.
          </p>

          <p className="belajar__count">
            {done.length} dari {chapters.length} materi selesai
          </p>

          <div
            className="belajar__bar"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={chapters.length}
            aria-valuenow={done.length}
          >
            <span style={{ width: `${(done.length / chapters.length) * 100}%` }} />
          </div>

          <div className="belajar__tools">
            {voice.supported && (
              <button
                className="btn btn--ghost btn--sm"
                onClick={voice.toggle}
                aria-pressed={voice.on}
              >
                {voice.on ? <Volume2 size={18} /> : <VolumeX size={18} />}
                Suara {voice.on ? 'aktif' : 'mati'}
              </button>
            )}

            {done.length > 0 && (
              <button className="link-btn" onClick={reset}>
                Ulangi dari awal
              </button>
            )}
          </div>
        </div>

        <img
          src={bgMaskot}
          alt=""
          className="belajar__hero-art"
          aria-hidden="true"
        />

      </header>

      {/* DAFTAR BAB */}
      <div className="shelf">
        <ol className="chapters" ref={cardsRef}>
          {chapters.map((c, i) => {
            const open = unlocked(i)
            const isDone = done.includes(c.id)

            return (
              <li key={c.id}>
                <button
                  className={`chapter cover-skin ${open ? '' : 'is-locked'} ${isDone ? 'is-done' : ''} ${nextId === c.id && !isDone ? 'is-next' : ''}`}
                  style={{ '--cover': `var(--cover-${(i % 4) + 1})` }}
                  disabled={!open}
                  onClick={() => {
                    setNextId(null)
                    setView({ type: 'book', id: c.id })
                  }}
                >
                  <span className="chapter__stamp" aria-hidden="true">
                    <Check size={18} strokeWidth={3} />
                  </span>

                  <span className="cover__tag">Bab {i + 1}</span>

                  <img
                    className="cover__medal"
                    src={bookImages[i % bookImages.length]}
                    alt={`Buku bab ${i + 1}`}
                  />

                  <strong className="cover__title">{c.title}</strong>
                  <span className="cover__sum">{c.summary}</span>

                  <span className="cover__state">
                    {!open ? (
                      <><Lock size={16} /> Selesaikan bab {i} dulu</>
                    ) : isDone ? (
                      <><Check size={16} /> Baca lagi</>
                    ) : (
                      <><BookOpen size={16} /> Buka buku</>
                    )}
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
      </div>

      {/* KUIS DAN GAME */}
      <section className="stage" aria-labelledby="stage-title">
        <h2 id="stage-title" className="section__title">
          Kuis dan game
        </h2>

        {!stageOpen && (
          <p className="muted stage__lock">
            <Lock size={16} />
            Terbuka setelah keempat materi selesai dibaca.
          </p>
        )}

        <div className={`stage__grid ${stageOpen ? '' : 'is-locked'}`}>
          <button
            className="stage__card"
            disabled={!stageOpen}
            onClick={() => setView({ type: 'quiz' })}
          >
            <Mascot mood="think" size={90} />
            <strong>Kuis cerita</strong>
            <span>Pilo bercerita, kamu menjawab pertanyaannya.</span>
          </button>

          <button
            className="stage__card"
            disabled={!stageOpen}
            onClick={() => setView({ type: 'game' })}
          >
            <span className="stage__game-icon">
              <Gamepad2 size={44} />
            </span>
            <strong>Bersihkan lingkungan</strong>
            <span>Seret sampah ke tempat yang benar.</span>
          </button>
        </div>
      </section>

      {/* BUKU MATERI */}
      {view?.type === 'book' && (
        <Overlay
          label="Buku materi"
          onClose={() => setView(null)}
          wide
          hideClose
        >
          {(() => {
            const idx = chapters.findIndex((c) => c.id === view.id)

            return (
              <Book
                key={view.id}
                chapter={chapters[idx]}
                index={idx}
                cover={bookImages[idx % bookImages.length]}
                isLast={idx === chapters.length - 1}
                onClose={() => setView(null)}
                onFinish={finish}
              />
            )
          })()}
        </Overlay>
      )}

      {/* PILIHAN KUIS ATAU GAME */}
      {view?.type === 'choice' && (
        <Overlay
          label="Pilih kuis atau game"
          onClose={() => setView(null)}
        >
          <div className="choice">
            <Speaker
              text="Bukunya sudah selesai dibaca! Mau lanjut ke kuis cerita atau game bersih-bersih?"
              mood="cheer"
              size={140}
              layout="col"
            />

            <div className="quiz__actions">
              <button
                className="btn btn--primary"
                onClick={() => setView({ type: 'quiz' })}
              >
                Kuis cerita
              </button>

              <button
                className="btn btn--pucuk"
                onClick={() => setView({ type: 'game' })}
              >
                Game bersih-bersih
              </button>
            </div>
          </div>
        </Overlay>
      )}

      {/* KUIS */}
      {view?.type === 'quiz' && (
        <Overlay
          label="Kuis cerita"
          onClose={() => setView(null)}
        >
          <Quiz
            onClose={() => setView(null)}
            onGame={() => setView({ type: 'game' })}
          />
        </Overlay>
      )}

      {/* GAME */}
      {view?.type === 'game' && (
        <Overlay
          label="Game bersih-bersih"
          onClose={() => setView(null)}
          wide
        >
          <Game
            onClose={() => setView(null)}
            onQuiz={() => setView({ type: 'quiz' })}
          />
        </Overlay>
      )}

    </div>
  )
}
