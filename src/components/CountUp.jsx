import { useEffect, useRef, useState } from 'react'

const fmt = (n, d) =>
  n.toLocaleString('id-ID', { minimumFractionDigits: d, maximumFractionDigits: d })

// Angka yang menghitung naik saat terlihat di layar. Pembaca layar langsung mendapat angka akhir.
export default function CountUp({ to, decimals = 0, suffix = '', duration = 1500, className = '' }) {
  const ref = useRef(null)
  const [val, setVal] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce || typeof IntersectionObserver === 'undefined') {
      setVal(to)
      return
    }

    let raf = 0
    const run = () => {
      const t0 = performance.now()
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / duration)
        setVal(to * (1 - Math.pow(1 - p, 3))) // ease-out cubic
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect()
          run()
        }
      },
      { threshold: 0.4 }
    )
    io.observe(el)

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [to, duration])

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">{fmt(val, decimals)}{suffix}</span>
      <span className="sr-only">{fmt(to, decimals)}{suffix}</span>
    </span>
  )
}
