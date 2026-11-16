import { useEffect, useState } from 'react'
import Mascot from './Mascot'
import { useTypewriter } from '../hooks/useTypewriter'
import { speak, useVoice } from './VoiceContext'
import { SITE } from '../config/site'

// Maskot + gelembung ucapan yang mengetik. Klik gelembung untuk melewati ketikan.
export default function Speaker({ text, mood = 'happy', size = 130, speed = 22, skipToken = 0, onDone, onStart, layout = 'row', name = SITE.mascotName }) {
  const [skip, setSkip] = useState(0)
  const voice = useVoice()
  const { shown, finished } = useTypewriter(text, { speed, skipToken: skipToken + skip, onDone })

  useEffect(() => { onStart?.() }, [text]) // eslint-disable-line
  useEffect(() => {
    if (voice.on && voice.supported && text) speak(text)
    return () => { if (voice.supported) window.speechSynthesis.cancel() }
  }, [text, voice.on]) // eslint-disable-line

  return (
    <div className={`speaker speaker--${layout}`}>
      <Mascot mood={mood} talking={!finished} size={size} />
      <button type="button" className="bubble" onClick={() => setSkip((v) => v + 1)} aria-label={`${name}: ${text}`} title="Klik untuk melewati ketikan">
        <span className="bubble__name" aria-hidden="true">{name}</span>
        <span className="bubble__text" aria-hidden="true">
          <span className="bubble__ghost">{text}</span>
          <span>{shown}<span className={`bubble__caret ${finished ? 'is-off' : ''}`} /></span>
        </span>
      </button>
    </div>
  )
}
