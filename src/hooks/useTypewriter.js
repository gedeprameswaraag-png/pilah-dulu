import { useEffect, useRef, useState } from 'react'

// Mengetik teks sedikit demi sedikit. Ubah skipToken untuk langsung menampilkan semua.
export function useTypewriter(text, { speed = 24, skipToken = 0, onDone } = {}) {
  const [n, setN] = useState(0)
  const doneRef = useRef(onDone)
  doneRef.current = onDone
  const finished = n >= text.length

  useEffect(() => { setN(0) }, [text])
  const firstSkip = useRef(true)
  useEffect(() => {
    if (firstSkip.current) { firstSkip.current = false; return }
    setN(text.length)
  }, [skipToken]) // eslint-disable-line
  useEffect(() => {
    if (n >= text.length) return
    const t = setTimeout(() => setN((v) => v + 1), speed)
    return () => clearTimeout(t)
  }, [n, text, speed])
  useEffect(() => { if (finished && text) doneRef.current?.() }, [finished, text])

  return { shown: text.slice(0, n), finished }
}
