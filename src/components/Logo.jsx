import { SITE } from '../config/site'

// Logo bawaan (kartu label + tunas). Ganti dengan gambar lewat SITE.logoImage.
export default function Logo({ size = 40, spin = false, className = '' }) {
  const cls = `logo ${spin ? 'logo--spin' : ''} ${className}`
  if (SITE.logoImage) {
    return <img src={SITE.logoImage} width={size} height={size} alt="" className={cls} />
  }
  return (
    <svg className={cls} width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <rect x="6" y="10" width="52" height="46" rx="14" fill="var(--moss)" stroke="var(--ink)" strokeWidth="3" />
      <circle cx="32" cy="19" r="3.5" fill="var(--cream)" stroke="var(--ink)" strokeWidth="2" />
      <path d="M32 50V34" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
      <path d="M32 40C22 40 18 34 18 28C27 28 32 32 32 40Z" fill="var(--pucuk)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M32 36C32 28 37 24 46 24C46 32 42 36 32 36Z" fill="var(--pucuk)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  )
}
