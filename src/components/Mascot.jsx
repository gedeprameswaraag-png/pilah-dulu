
export default function Mascot({
  mood = 'happy',
  talking = false,
  size = 140,
  className = ''
}) {
  return (
    <img
      src="/ambang.svg"
      alt="Ambang, maskot Pilah Dulu"
      width={size}
      height={size * 1.12}
      className={`mascot mascot--${mood} ${
        talking ? 'mascot--talking' : ''
      } ${className}`}
      style={{
        objectFit: 'contain'
      }}
    />
  )
}
