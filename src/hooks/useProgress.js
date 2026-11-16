import { useCallback, useState } from 'react'
import { load, save } from '../utils/storage'

const KEY = 'pilah-dulu:progress'

// Menyimpan id materi yang sudah selesai dibaca.
export function useProgress() {
  const [done, setDone] = useState(() => load(KEY, []))
  const markDone = useCallback((id) => {
    setDone((d) => {
      if (d.includes(id)) return d
      const next = [...d, id]
      save(KEY, next)
      return next
    })
  }, [])
  const reset = useCallback(() => { save(KEY, []); setDone([]) }, [])
  return { done, markDone, reset }
}
