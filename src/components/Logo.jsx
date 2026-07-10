import { useApp } from '../context'

export default function Logo({ size = 'md', forceLight = false }) {
  const { lang, theme } = useApp()
  const isDark = !forceLight && theme === 'dark'
  const gold = isDark ? '#C9A84C' : '#B8922A'
  const gold2 = isDark ? '#F0D98A' : '#D4A93C'
  const name = lang === 'ru' ? 'ДоМира' : 'DoMira'
  const tagline = lang === 'ru' ? 'Ваш путь к новым возможностям' : 'Your path to new opportunities'
  const w = size === 'sm' ? 120 : size === 'lg' ? 200 : 150

  return (
    <svg width={w} height={w * 0.72} viewBox="0 0 200 144" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`gold-grad-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gold2} />
          <stop offset="50%" stopColor={gold} />
          <stop offset="100%" stopColor={gold2} />
        </linearGradient>
        <filter id="glow-logo">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <path d="M 18 82 A 82 82 0 0 1 182 82" stroke={`url(#gold-grad-${size})`} strokeWidth="1.4" fill="none" filter="url(#glow-logo)" />
      <path d="M 50 55 A 52 30 0 0 1 150 55" stroke={gold} strokeWidth="0.6" fill="none" opacity="0.4"/>
      <path d="M 36 68 A 68 22 0 0 1 164 68" stroke={gold} strokeWidth="0.5" fill="none" opacity="0.3"/>
      <line x1="100" y1="10" x2="100" y2="82" stroke={gold} strokeWidth="0.5" opacity="0.25"/>
      <ellipse cx="100" cy="46" rx="78" ry="46" stroke={gold} strokeWidth="0.5" fill="none" opacity="0.12"/>
      <path d="M 42 52 Q 48 42 56 48 Q 62 58 54 68 Q 46 66 42 52Z" fill={gold} opacity="0.55"/>
      <path d="M 90 32 Q 104 28 114 38 Q 118 50 108 58 Q 95 54 90 42Z" fill={gold} opacity="0.5"/>
      <path d="M 108 58 Q 116 56 120 66 Q 118 78 108 74 Q 103 66 108 58Z" fill={gold} opacity="0.4"/>
      <path d="M 128 30 Q 148 25 158 38 Q 160 52 148 58 Q 135 54 128 42Z" fill={gold} opacity="0.35"/>
      <path d="M 182 22 L 184.5 16 L 187 22 L 193 24.5 L 187 27 L 184.5 33 L 182 27 L 176 24.5Z" fill={gold2} filter="url(#glow-logo)" opacity="0.95"/>
      <text x="100" y="104" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontSize="30" fontWeight="700" fill={`url(#gold-grad-${size})`} filter="url(#glow-logo)">{name}</text>
      <text x="100" y="119" textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="7.5" letterSpacing="1.2" fill={gold} opacity="0.8">{tagline}</text>
      <path d="M 82 126 L 100 130 L 118 126 M 82 126 L 100 122 L 118 126" stroke={gold} strokeWidth="0.6" fill="none" opacity="0.5"/>
      <rect x="98.5" y="123.5" width="3" height="3" transform="rotate(45 100 125)" fill={gold} opacity="0.7"/>
    </svg>
  )
}
