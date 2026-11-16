// Maskot "Pilo" — tong kecil dengan tunas. mood: happy | think | oops | cheer
export default function Mascot({ mood = 'happy', talking = false, size = 140, className = '' }) {
  const cheer = mood === 'cheer'
  return (
    <svg
      className={`mascot mascot--${mood} ${talking ? 'mascot--talking' : ''} ${className}`}
      width={size} height={size * 1.12} viewBox="0 0 160 180" role="img" aria-label="Pilo, maskot Pilah Dulu"
    >
      <ellipse className="mascot__shadow" cx="80" cy="172" rx="42" ry="6" fill="rgba(31,42,36,.18)" />
      <g className="mascot__body">
        {/* tunas */}
        <g className="mascot__sprout">
          <path d="M80 56V36" stroke="#1F2A24" strokeWidth="4" strokeLinecap="round" />
          <path d="M80 42C66 42 60 34 60 26C73 26 80 32 80 42Z" fill="var(--pucuk)" stroke="#1F2A24" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M80 38C80 28 87 22 100 22C100 33 94 38 80 38Z" fill="var(--pucuk)" stroke="#1F2A24" strokeWidth="3.5" strokeLinejoin="round" />
        </g>
        {/* lengan */}
        <path className="mascot__arm mascot__arm--l" d={cheer ? 'M40 96C24 86 20 72 24 62' : 'M40 100C24 108 22 122 26 132'} stroke="#1F2A24" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path className="mascot__arm mascot__arm--r" d={cheer ? 'M120 96C136 86 140 72 136 62' : 'M120 100C136 108 138 122 134 132'} stroke="#1F2A24" strokeWidth="6" strokeLinecap="round" fill="none" />
        {/* badan */}
        <path d="M36 72H124L116 156Q115 164 107 164H53Q45 164 44 156Z" fill="var(--moss)" stroke="#1F2A24" strokeWidth="4.5" strokeLinejoin="round" />
        <path d="M52 84L56 150" stroke="rgba(246,241,231,.25)" strokeWidth="5" strokeLinecap="round" />
        {/* tutup */}
        <rect className="mascot__lid" x="28" y="56" width="104" height="22" rx="11" fill="#3E8562" stroke="#1F2A24" strokeWidth="4.5" />
        {/* label perut */}
        <rect x="58" y="128" width="44" height="22" rx="7" fill="var(--cream)" stroke="#1F2A24" strokeWidth="3" />
        <rect x="64" y="136" width="32" height="6" rx="3" fill="var(--pucuk)" />
        {/* wajah */}
        <g className="mascot__eyes">
          {cheer ? (
            <>
              <path d="M54 102Q62 92 70 102" stroke="#1F2A24" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M90 102Q98 92 106 102" stroke="#1F2A24" strokeWidth="4" fill="none" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="62" cy="100" r={mood === 'oops' ? 10 : 9} fill="#fff" stroke="#1F2A24" strokeWidth="3" />
              <circle cx="98" cy="100" r={mood === 'oops' ? 10 : 9} fill="#fff" stroke="#1F2A24" strokeWidth="3" />
              <circle cx={mood === 'think' ? 65 : 62} cy={mood === 'think' ? 97 : 101} r="4.5" fill="#1F2A24" />
              <circle cx={mood === 'think' ? 101 : 98} cy={mood === 'think' ? 97 : 101} r="4.5" fill="#1F2A24" />
            </>
          )}
        </g>
        {mood === 'think' && <path d="M88 86L108 82" stroke="#1F2A24" strokeWidth="3.5" strokeLinecap="round" />}
        <ellipse cx="50" cy="114" rx="7" ry="4.5" fill="#E4572E" opacity=".35" />
        <ellipse cx="110" cy="114" rx="7" ry="4.5" fill="#E4572E" opacity=".35" />
        {mood === 'oops' ? (
          <path className="mascot__mouth" d="M70 122Q80 114 90 122" stroke="#1F2A24" strokeWidth="4" fill="none" strokeLinecap="round" />
        ) : (
          <path className="mascot__mouth" d={cheer ? 'M68 114Q80 134 92 114Z' : 'M70 116Q80 126 90 116'} stroke="#1F2A24" strokeWidth="4" fill={cheer ? '#fff' : 'none'} strokeLinecap="round" strokeLinejoin="round" />
        )}
      </g>
    </svg>
  )
}
