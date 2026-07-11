import { useApp } from '../context'

export default function Logo({ size = 'md', forceLight = false }) {
  const { lang, theme } = useApp()
  const isDark = !forceLight && theme === 'dark'
  const gold = isDark ? '#C9A84C' : '#B8922A'
  const gold2 = isDark ? '#F0D98A' : '#D4A93C'
  const textColor = isDark ? '#F0EDE6' : '#1A1208'
  const name = lang === 'ru' ? 'ДоМира' : 'DoMira'
  const h = size === 'sm' ? 32 : size === 'lg' ? 52 : 40

  const gid = `lg-${size}-${isDark ? 'd' : 'l'}`

  return (
    <svg width={h * 3.6} height={h} viewBox="0 0 180 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${gid}-g`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gold2} />
          <stop offset="50%" stopColor={gold} />
          <stop offset="100%" stopColor={gold2} />
        </linearGradient>
        <radialGradient id={`${gid}-r`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={gold2} stopOpacity="0.2" />
          <stop offset="100%" stopColor={gold} stopOpacity="0" />
        </radialGradient>
        <filter id={`${gid}-glow`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.2" result="b" />
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <clipPath id={`${gid}-clip`}>
          <circle cx="25" cy="25" r="19" />
        </clipPath>
      </defs>

      {/* Globe background glow */}
      <circle cx="25" cy="25" r="22" fill={`url(#${gid}-r)`} />

      {/* Globe outline */}
      <circle cx="25" cy="25" r="18" stroke={`url(#${gid}-g)`} strokeWidth="1.5" fill="none" filter={`url(#${gid}-glow)`} />

      {/* Equator */}
      <ellipse cx="25" cy="25" rx="18" ry="6" stroke={gold} strokeWidth="0.8" fill="none" opacity="0.7" clipPath={`url(#${gid}-clip)`} />

      {/* Meridian vertical */}
      <ellipse cx="25" cy="25" rx="8" ry="18" stroke={gold} strokeWidth="0.8" fill="none" opacity="0.6" clipPath={`url(#${gid}-clip)`} />

      {/* Meridian 2 */}
      <ellipse cx="25" cy="25" rx="14" ry="18" stroke={gold} strokeWidth="0.6" fill="none" opacity="0.35" clipPath={`url(#${gid}-clip)`} />

      {/* Latitude lines */}
      <ellipse cx="25" cy="19" rx="16" ry="4.5" stroke={gold} strokeWidth="0.6" fill="none" opacity="0.4" clipPath={`url(#${gid}-clip)`} />
      <ellipse cx="25" cy="31" rx="16" ry="4.5" stroke={gold} strokeWidth="0.6" fill="none" opacity="0.4" clipPath={`url(#${gid}-clip)`} />

      {/* North pole dot */}
      <circle cx="25" cy="7" r="1.5" fill={gold2} opacity="0.9" filter={`url(#${gid}-glow)`} />

      {/* Text: DoMira */}
      <text
        x="52" y="30"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="22"
        fontWeight="700"
        fill={`url(#${gid}-g)`}
        filter={`url(#${gid}-glow)`}
      >{name}</text>

      {/* Tagline */}
      <text
        x="53" y="41"
        fontFamily="'Inter', sans-serif"
        fontSize="6.5"
        letterSpacing="1.5"
        fill={gold}
        opacity="0.75"
        textTransform="uppercase"
      >{lang === 'ru' ? 'ВАШЕ ГЛОБАЛЬНОЕ РЕШЕНИЕ' : 'YOUR GLOBAL SOLUTION'}</text>
    </svg>
  )
}
