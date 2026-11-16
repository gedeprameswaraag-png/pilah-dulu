import { createContext, useContext, useEffect, useState } from 'react'
import { SITE } from '../config/site'
import { load, save } from '../utils/storage'

const Ctx = createContext({ on: false, toggle() {}, supported: false })
export const useVoice = () => useContext(Ctx)

// Opsi suara maskot memakai Web Speech API bawaan browser (tanpa library).
export function VoiceProvider({ children }) {
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window
  const [on, setOn] = useState(() => load('pilah-dulu:voice', false))
  useEffect(() => { save('pilah-dulu:voice', on); if (!on && supported) window.speechSynthesis.cancel() }, [on, supported])
  return <Ctx.Provider value={{ on, supported, toggle: () => setOn((v) => !v) }}>{children}</Ctx.Provider>
}

export function speak(text) {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = SITE.voiceLang
  u.rate = 1
  window.speechSynthesis.speak(u)
}
