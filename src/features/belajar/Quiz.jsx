import { useState } from 'react'
import Speaker from '../../components/Speaker'
import { Icon } from '../../utils/icons'
import quiz from '../../data/quiz.json'

const SCENE_ICON = { dapur: 'Utensils', ruang: 'Home', kamar: 'Baby', teras: 'Leaf' }

// Kuis bercerita. Tahap: intro -> tanya (tiap soal) -> umpan balik -> hasil.
export default function Quiz({ onClose, onGame }) {
  const qs = quiz.questions
  const [step, setStep] = useState(-1) // -1 intro, 0..n-1 soal, n hasil
  const [picked, setPicked] = useState(null)
  const [score, setScore] = useState(0)
  const [typed, setTyped] = useState(false)

  const q = qs[step]
  const restart = () => { setStep(-1); setPicked(null); setScore(0); setTyped(false) }
  const answer = (i) => {
    if (picked !== null) return
    setPicked(i)
    if (i === q.correct) setScore((s) => s + 1)
    setTyped(false)
  }
  const next = () => { setPicked(null); setTyped(false); setStep((s) => s + 1) }

  if (step === -1) {
    return (
      <div className="quiz" data-scene="ruang">
        <h2 className="quiz__title">{quiz.title}</h2>
        <Speaker key="intro" text={quiz.intro} mood="happy" size={150} layout="col" onStart={() => setTyped(false)} onDone={() => setTyped(true)} />
        <button className="btn btn--pucuk" disabled={!typed} onClick={() => setStep(0)}>Mulai cerita</button>
      </div>
    )
  }

  if (step >= qs.length) {
    const r = [...quiz.results].reverse().find((x) => score >= x.min)
    return (
      <div className="quiz" data-scene="ruang">
        <h2 className="quiz__title">Cerita selesai</h2>
        <p className="quiz__score"><strong>{score}</strong> dari {qs.length} jawaban tepat</p>
        <Speaker key="end" text={r.say} mood={r.mood} size={150} layout="col" />
        <div className="quiz__actions">
          <button className="btn btn--primary" onClick={restart}>Main lagi</button>
          <button className="btn btn--pucuk" onClick={onGame}>Coba game</button>
          <button className="btn btn--ghost" onClick={onClose}>Tutup</button>
        </div>
      </div>
    )
  }

  const answered = picked !== null
  const ok = picked === q.correct
  const text = !answered ? q.say : `${ok ? 'Betul!' : 'Hampir!'} ${q.explain}`
  const mood = !answered ? 'think' : ok ? 'cheer' : 'oops'

  return (
    <div className="quiz" data-scene={q.scene}>
      <div className="quiz__path" aria-label={`Soal ${step + 1} dari ${qs.length}`}>
        {qs.map((_, i) => <span key={i} className={i < step ? 'is-past' : i === step ? 'is-on' : ''} />)}
      </div>
      <span className="quiz__scene-icon" aria-hidden="true"><Icon name={SCENE_ICON[q.scene] || 'Home'} size={120} /></span>
      <Speaker key={`${step}-${answered}`} text={text} mood={mood} size={140} layout="col" onStart={() => setTyped(false)} onDone={() => setTyped(true)} />
      {!answered ? (
        typed && (
          <div className="quiz__options" role="group" aria-label="Pilihan jawaban">
            {q.options.map((o, i) => <button key={o.text} className="option" onClick={() => answer(i)}>{o.text}</button>)}
          </div>
        )
      ) : (
        <div className="quiz__options">
          {q.options.map((o, i) => <button key={o.text} disabled className={`option ${i === q.correct ? 'is-correct' : i === picked ? 'is-wrong' : ''}`}>{o.text}</button>)}
          <button className="btn btn--primary quiz__next" disabled={!typed} onClick={next}>{step === qs.length - 1 ? 'Lihat hasil' : 'Lanjut cerita'}</button>
        </div>
      )}
    </div>
  )
}
