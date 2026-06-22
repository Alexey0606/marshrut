import { useState, useEffect, useRef, useCallback } from 'react'
import {
  Compass, Plane, Home, Briefcase, ChevronDown, ChevronRight,
  ChevronLeft, Menu, X, Star, Check, ArrowUpRight, Send,
  PlayCircle, Camera, MapPin, Clock, Sparkles, Shield, Zap
} from 'lucide-react'
import './index.css'

// ─── Tokens ────────────────────────────────────────────────────────────────────
const C = {
  deepNavy:    '#080f18',
  navy:        '#0D1B2A',
  slateBlue:   '#1B3A5C',
  mutedTeal:   '#2D6A8A',
  warmSand:    '#F2EDE4',
  softGold:    '#C9A84C',
  goldLight:   '#f0d98a',
  creamWhite:  '#FAFAF8',
  textPrimary: '#1A1A2E',
  textMuted:   '#6B7A8D',
}

// ─── Mesh gradient background ──────────────────────────────────────────────────
const meshBg = `
  radial-gradient(ellipse 80% 50% at 20% -10%, rgba(45,106,138,0.35) 0%, transparent 60%),
  radial-gradient(ellipse 60% 40% at 80% 10%, rgba(201,168,76,0.12) 0%, transparent 50%),
  radial-gradient(ellipse 40% 60% at 50% 80%, rgba(27,58,92,0.4) 0%, transparent 60%),
  #080f18
`

// ─── Hooks ─────────────────────────────────────────────────────────────────────
function useIntersection(threshold = 0.12) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect() }
    }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, vis]
}

function AnimSection({ children, delay = 0, className = '' }) {
  const [ref, vis] = useIntersection()
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'none' : 'translateY(36px)',
      transition: `opacity 0.75s cubic-bezier(0.4,0,0.2,1) ${delay}s, transform 0.75s cubic-bezier(0.4,0,0.2,1) ${delay}s`,
    }}>
      {children}
    </div>
  )
}

// ─── Label chip ────────────────────────────────────────────────────────────────
function Label({ children }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 7,
      background: 'rgba(201,168,76,0.1)',
      border: '1px solid rgba(201,168,76,0.3)',
      borderRadius: 100, padding: '6px 18px', alignSelf: 'flex-start',
    }}>
      <Sparkles size={12} color={C.softGold} />
      <span style={{ color: C.softGold, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
        {children}
      </span>
    </div>
  )
}

// ─── Section heading ───────────────────────────────────────────────────────────
function SectionHead({ label, title, light = false, center = true }) {
  return (
    <div style={{ textAlign: center ? 'center' : 'left', marginBottom: 56 }}>
      <Label>{label}</Label>
      <h2 style={{
        fontFamily: '"Playfair Display", Georgia, serif',
        fontSize: 'clamp(30px,4vw,48px)', fontWeight: 700,
        color: light ? '#fff' : C.textPrimary,
        margin: '16px 0 0', lineHeight: 1.15, letterSpacing: '-0.02em',
      }}
        dangerouslySetInnerHTML={{ __html: title }}
      />
    </div>
  )
}

// ─── Glow button ───────────────────────────────────────────────────────────────
function GlowBtn({ href, children, size = 'md', outline = false, onClick }) {
  const p = size === 'lg' ? '18px 48px' : '12px 28px'
  const fs = size === 'lg' ? 17 : 14
  const [hov, setHov] = useState(false)

  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: p, borderRadius: 12, fontWeight: 700, fontSize: fs,
    textDecoration: 'none', cursor: 'pointer', border: 'none',
    transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
    position: 'relative', overflow: 'hidden',
  }
  const solid = {
    background: hov
      ? `linear-gradient(135deg, ${C.goldLight}, ${C.softGold})`
      : `linear-gradient(135deg, ${C.softGold}, #a8893e)`,
    color: C.deepNavy,
    boxShadow: hov
      ? '0 0 0 1px rgba(201,168,76,0.6), 0 8px 32px rgba(201,168,76,0.5), 0 0 80px rgba(201,168,76,0.2)'
      : '0 4px 20px rgba(201,168,76,0.3)',
    transform: hov ? 'translateY(-2px) scale(1.02)' : 'none',
  }
  const outl = {
    background: hov ? 'rgba(201,168,76,0.08)' : 'transparent',
    color: '#fff',
    border: '2px solid rgba(255,255,255,0.25)',
    transform: hov ? 'translateY(-1px)' : 'none',
  }

  const Tag = href ? 'a' : 'button'
  return (
    <Tag href={href} onClick={onClick}
      style={{ ...base, ...(outline ? outl : solid) }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {children}
    </Tag>
  )
}

// ─── NAVBAR ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  const links = [
    { label: 'Услуги', href: '#pricing' },
    { label: 'Как это работает', href: '#how' },
    { label: 'Направления', href: '#directions' },
    { label: 'Цены', href: '#pricing' },
    { label: 'Контакт', href: '#contact' },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      transition: 'all 0.4s ease',
      background: scrolled ? 'rgba(8,15,24,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(201,168,76,0.12)' : 'none',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 70 }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: 'linear-gradient(135deg, #C9A84C, #a8893e)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(201,168,76,0.4)',
          }}>
            <Compass size={20} color="#0D1B2A" strokeWidth={2.5} />
          </div>
          <span style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 20, fontWeight: 700, letterSpacing: '0.1em', color: '#fff' }}>
            MARSHRUT
          </span>
        </a>

        <div style={{ display: 'flex', gap: 36, alignItems: 'center' }} className="nav-links">
          {links.map(l => (
            <a key={l.label} href={l.href} style={{
              color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontSize: 14, fontWeight: 500,
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = C.softGold}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.65)'}
            >{l.label}</a>
          ))}
          <GlowBtn href="#quiz">Начать маршрут</GlowBtn>
        </div>

        <button onClick={() => setOpen(!open)} style={{
          display: 'none', background: 'none', border: 'none',
          color: '#fff', cursor: 'pointer', padding: 4,
        }} className="burger">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="glass-dark" style={{ padding: '20px 24px 28px' }}>
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} style={{
              display: 'block', color: 'rgba(255,255,255,0.85)', textDecoration: 'none',
              padding: '13px 0', fontSize: 16, fontWeight: 500,
              borderBottom: '1px solid rgba(255,255,255,0.07)',
            }}>{l.label}</a>
          ))}
          <div style={{ marginTop: 20 }}>
            <GlowBtn href="#quiz" size="lg" onClick={() => setOpen(false)}>Начать маршрут</GlowBtn>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .burger { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}

// ─── HERO ──────────────────────────────────────────────────────────────────────
function HeroOrbs() {
  return (
    <>
      {/* Ambient orbs */}
      <div style={{
        position: 'absolute', top: '5%', left: '10%', width: 500, height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(45,106,138,0.25) 0%, transparent 70%)',
        animation: 'floatOrb 12s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '20%', right: '5%', width: 380, height: 380,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)',
        animation: 'floatOrb 9s ease-in-out infinite 2s',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '30%', width: 300, height: 300,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(27,58,92,0.4) 0%, transparent 70%)',
        animation: 'floatOrb 15s ease-in-out infinite 1s',
        pointerEvents: 'none',
      }} />
    </>
  )
}

function HeroMap() {
  const pts = [
    { x: 60,  y: 230, l: 'Москва',    d: 0 },
    { x: 180, y: 130, l: 'Берлин',    d: 0.5 },
    { x: 310, y: 65,  l: 'Париж',     d: 0.9 },
    { x: 165, y: 275, l: 'Дубай',     d: 1.3 },
    { x: 350, y: 185, l: 'Лиссабон',  d: 1.7 },
    { x: 75,  y: 100, l: 'Белград',   d: 0.3 },
  ]
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 460 }} className="float-anim">
      {/* Glow bg */}
      <div style={{
        position: 'absolute', inset: '-20%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 65%)',
        borderRadius: '50%',
      }} />

      <svg viewBox="0 0 430 350" width="100%" style={{ display: 'block', position: 'relative', zIndex: 1 }}>
        <defs>
          <radialGradient id="g1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={C.softGold} stopOpacity="0.12" />
            <stop offset="100%" stopColor={C.softGold} stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={C.softGold} stopOpacity="0.9" />
            <stop offset="100%" stopColor={C.goldLight} stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Grid */}
        {[60,120,180,240,300].map(y => (
          <line key={y} x1="20" y1={y} x2="410" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        ))}
        {[80,160,240,320,400].map(x => (
          <line key={x} x1={x} y1="20" x2={x} y2="330" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        ))}

        {/* Background glow path */}
        <path d={path} fill="none" stroke={C.softGold} strokeWidth="8" opacity="0.06" />

        {/* Dash path */}
        <path d={path} fill="none" stroke={C.softGold} strokeWidth="1" strokeDasharray="5 5" opacity="0.3" className="draw-line" />

        {/* Main path */}
        <path d={path} fill="none" stroke="url(#lineGrad)" strokeWidth="2.5"
          filter="url(#glow)" opacity="0.9"
          style={{ strokeDasharray: 900, strokeDashoffset: 900, animation: 'drawLine 3s cubic-bezier(0.4,0,0.2,1) forwards 0.5s' }}
        />

        {/* Points */}
        {pts.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="22" fill={C.softGold} opacity="0.06" />
            <circle cx={p.x} cy={p.y} r="14" fill={C.softGold} opacity="0.1" />
            <circle cx={p.x} cy={p.y} r="7" fill={C.softGold} filter="url(#glow)"
              className="pulse-dot"
              style={{ animationDelay: `${p.d + 2}s` }}
            />
            <circle cx={p.x} cy={p.y} r="3" fill="#fff" />
            <text x={p.x + 14} y={p.y + 5} fill="rgba(255,255,255,0.7)" fontSize="11"
              fontFamily="Inter,sans-serif" fontWeight="500">{p.l}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}

function Hero() {
  return (
    <section style={{
      background: meshBg,
      minHeight: '100vh', paddingTop: 70, overflow: 'hidden',
      position: 'relative', display: 'flex', alignItems: 'center',
    }}>
      <HeroOrbs />

      {/* Scanline effect */}
      <div style={{
        position: 'absolute', left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)',
        animation: 'scanline 8s linear infinite',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 24px', width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gap: 56, alignItems: 'center' }} className="hero-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <Label>Релокационная экосистема</Label>

            <h1 style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(36px,5.5vw,68px)', fontWeight: 900,
              color: '#fff', lineHeight: 1.08, margin: 0, letterSpacing: '-0.03em',
            }}>
              Ваш маршрут в<br />
              новую жизнь —<br />
              <span className="shimmer-text">с опорой</span>, не в<br />одиночку
            </h1>

            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 18, lineHeight: 1.7, maxWidth: 500, margin: 0, fontWeight: 300 }}>
              Помогаем русскоязычным людям переезжать легально, спокойно и с поддержкой. Шенген, Дубай, ЕС и другие направления.
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <GlowBtn href="#quiz" size="lg">
                Пройти диагностику <ArrowUpRight size={18} />
              </GlowBtn>
              <GlowBtn href="#pricing" size="lg" outline>
                Услуги и цены
              </GlowBtn>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', paddingTop: 8 }}>
              {[
                { v: '200+', l: 'клиентов' },
                { v: '15+', l: 'стран' },
                { v: '$250', l: 'средний чек' },
              ].map(s => (
                <div key={s.l}>
                  <div style={{ fontFamily: '"Playfair Display",serif', fontSize: 28, fontWeight: 700, color: C.softGold, lineHeight: 1 }}>{s.v}</div>
                  <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, marginTop: 4 }}>{s.l}</div>
                </div>
              ))}
              <div style={{ width: 1, background: 'rgba(255,255,255,0.1)', alignSelf: 'stretch' }} />
              <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={C.softGold} color={C.softGold} />)}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }} className="hero-map">
            <HeroMap />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 120,
        background: 'linear-gradient(to bottom, transparent, #080f18)',
        pointerEvents: 'none',
      }} />

      <style>{`
        @media (min-width: 900px) { .hero-grid { grid-template-columns: 1fr 460px !important; } }
        @media (max-width: 899px) { .hero-map { display: none !important; } }
      `}</style>
    </section>
  )
}

// ─── TICKER ────────────────────────────────────────────────────────────────────
function CountryTicker() {
  const items = ['🇩🇪 Германия','🇦🇪 ОАЭ','🇷🇸 Сербия','🇵🇹 Португалия','🇹🇭 Таиланд','🇲🇪 Черногория','🇫🇷 Франция','🇮🇹 Италия','🇨🇿 Чехия']
  return (
    <div style={{
      background: 'rgba(201,168,76,0.06)',
      borderTop: '1px solid rgba(201,168,76,0.2)',
      borderBottom: '1px solid rgba(201,168,76,0.2)',
      padding: '16px 0', overflow: 'hidden', position: 'relative',
    }}>
      {/* Edge fades */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(to right, #080f18, transparent)', zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(to left, #080f18, transparent)', zIndex: 2, pointerEvents: 'none' }} />

      <div className="ticker-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{
            padding: '0 44px', color: 'rgba(255,255,255,0.75)', fontSize: 15, fontWeight: 500,
            display: 'inline-flex', alignItems: 'center', gap: 14, flexShrink: 0,
          }}>
            {item}
            <span style={{ color: C.softGold, opacity: 0.4, fontSize: 18 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── AUDIENCE ──────────────────────────────────────────────────────────────────
function AudienceCards() {
  const cards = [
    { icon: Plane, title: 'Путешественник', tag: 'Виза', desc: 'Нужна шенгенская виза для путешествий. Хотите получить её надёжно, без стресса и очередей, с полной проверкой документов.', color: '#2D6A8A' },
    { icon: Home, title: 'Семья в переезде', tag: 'Релокация', desc: 'Долгосрочный переезд всей семьёй. Важны школы, безопасность, социальные гарантии и понятный план на год вперёд.', color: '#C9A84C' },
    { icon: Briefcase, title: 'Предприниматель', tag: 'Бизнес', desc: 'Дубай, открытие компании, золотая виза, налоговая оптимизация. Переехать и продолжить бизнес в другой юрисдикции.', color: '#3d8aa8' },
  ]

  return (
    <section style={{ background: '#080f18', padding: '100px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <AnimSection>
          <SectionHead label="Для кого" title="Узнайте&nbsp;<em>себя</em>" light />
        </AnimSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: 24 }}>
          {cards.map((c, i) => (
            <AnimSection key={i} delay={i * 0.12}>
              <AudienceCard {...c} />
            </AnimSection>
          ))}
        </div>
      </div>
    </section>
  )
}

function AudienceCard({ icon: Icon, title, tag, desc, color }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 20, padding: '36px 32px', cursor: 'default',
        background: hov ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hov ? `rgba(${hexToRgb(color)},0.5)` : 'rgba(255,255,255,0.08)'}`,
        backdropFilter: 'blur(20px)',
        transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
        transform: hov ? 'translateY(-8px)' : 'none',
        boxShadow: hov ? `0 24px 60px rgba(${hexToRgb(color)},0.15), 0 0 0 1px rgba(${hexToRgb(color)},0.2)` : 'none',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Top glow line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        opacity: hov ? 1 : 0, transition: 'opacity 0.3s',
      }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div style={{
          width: 56, height: 56, borderRadius: 16,
          background: `linear-gradient(135deg, ${color}33, ${color}22)`,
          border: `1px solid ${color}44`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={24} color={color} />
        </div>
        <span style={{
          fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em',
          color: color, background: `${color}18`,
          padding: '5px 12px', borderRadius: 100, border: `1px solid ${color}33`,
        }}>{tag}</span>
      </div>

      <h3 style={{ fontFamily: '"Playfair Display",serif', fontSize: 24, fontWeight: 700, color: '#fff', margin: '0 0 14px' }}>
        {title}
      </h3>
      <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 15, lineHeight: 1.7, margin: '0 0 24px' }}>{desc}</p>
      <a href="#quiz" style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        color: color, fontWeight: 600, fontSize: 14, textDecoration: 'none',
        transition: 'gap 0.2s',
      }}
        onMouseEnter={e => e.currentTarget.style.gap = '10px'}
        onMouseLeave={e => e.currentTarget.style.gap = '6px'}
      >
        Мне подходит <ChevronRight size={16} />
      </a>
    </div>
  )
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16)
  return `${r},${g},${b}`
}

// ─── HOW IT WORKS ──────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { n: '01', icon: Zap, title: 'Диагностика', desc: 'Заполняете анкету, бот собирает данные о вашей ситуации: цель, направление, документы, бюджет. 5–7 минут.', color: C.softGold },
    { n: '02', icon: MapPin, title: 'Маршрут', desc: 'Эксперт составляет персональный план: какая виза, какие документы, что и когда делать. Чёткий список без воды.', color: '#3d8aa8' },
    { n: '03', icon: Shield, title: 'Сопровождение', desc: 'Проверяем каждый документ, готовим к собеседованию, держим в курсе на каждом шаге. Вы не одни.', color: C.softGold },
    { n: '04', icon: Sparkles, title: 'Результат', desc: 'Виза, ВНЖ или переезд — вы в новой точке жизни. Мы рядом и дальше, если нужно.', color: '#3d8aa8' },
  ]
  return (
    <section id="how" style={{ background: '#0a1520', padding: '100px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* BG decoration */}
      <div style={{
        position: 'absolute', right: -200, top: '50%', transform: 'translateY(-50%)',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(45,106,138,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative' }}>
        <AnimSection>
          <SectionHead label="Процесс" title="От первого вопроса<br/>до нового адреса" light />
        </AnimSection>

        <div style={{ position: 'relative' }}>
          {/* Thread line */}
          <div style={{
            position: 'absolute', left: 31, top: 44, bottom: 44, width: 2,
            background: `linear-gradient(to bottom, ${C.softGold}, rgba(45,106,138,0.6), rgba(45,106,138,0.1))`,
          }} />

          {steps.map((s, i) => (
            <AnimSection key={i} delay={i * 0.16}>
              <HowStep {...s} isLast={i === steps.length - 1} />
            </AnimSection>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowStep({ n, icon: Icon, title, desc, color, isLast }) {
  const [hov, setHov] = useState(false)
  return (
    <div style={{ display: 'flex', gap: 28, marginBottom: isLast ? 0 : 48 }}>
      <div style={{ flexShrink: 0, position: 'relative', zIndex: 1 }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: `linear-gradient(135deg, ${color}, ${color}bb)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: '"Playfair Display",serif', fontSize: 18, fontWeight: 700, color: C.deepNavy,
          boxShadow: `0 8px 24px ${color}44`,
          transition: 'transform 0.3s, box-shadow 0.3s',
          transform: hov ? 'scale(1.08)' : 'none',
        }}>{n}</div>
      </div>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          flex: 1, padding: '18px 24px', borderRadius: 16, marginTop: 8,
          background: hov ? 'rgba(255,255,255,0.05)' : 'transparent',
          border: `1px solid ${hov ? 'rgba(255,255,255,0.1)' : 'transparent'}`,
          transition: 'all 0.3s',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <Icon size={16} color={color} />
          <h3 style={{ fontFamily: '"Playfair Display",serif', fontSize: 22, color: '#fff', margin: 0, fontWeight: 700 }}>{title}</h3>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 15, lineHeight: 1.7, margin: 0 }}>{desc}</p>
      </div>
    </div>
  )
}

// ─── PRICING ───────────────────────────────────────────────────────────────────
const TABS = [
  { id: 'visas', label: 'Визы', icon: Plane },
  { id: 'relocation', label: 'Переезд', icon: Home },
  { id: 'dubai', label: 'Дубай', icon: Briefcase },
  { id: 'club', label: 'Клуб', icon: Sparkles },
]
const PRICES = {
  visas: [
    { name: 'Консультация 60 мин', price: '$80', period: '1 день' },
    { name: 'Проверка пакета документов', price: '$60', period: '2 дня' },
    { name: 'Шенген под ключ (туристический)', price: '$250', period: '7–14 дней' },
    { name: 'Шенген под ключ (многократный)', price: '$350', period: '10–21 день' },
    { name: 'Подготовка к собеседованию', price: '$100', period: '1–2 дня' },
  ],
  relocation: [
    { name: 'Подбор страны для релокации', price: '$180', period: '3–5 дней' },
    { name: 'Персональная релокационная стратегия', price: '$400', period: '5–7 дней' },
    { name: 'Семейный релокационный пакет', price: '$900', period: '30–60 дней' },
    { name: 'Пакет ЕС / Шенген + ВНЖ маршрут', price: '$1 800', period: '30–90 дней' },
  ],
  dubai: [
    { name: 'Пакет «Дубай под ключ» (виза + компания + старт жизни)', price: '$2 200', period: '45–90 дней' },
    { name: 'Бизнес-релокация предпринимателя', price: '$2 500', period: '45–90 дней' },
  ],
}
const CLUB = ['Закрытый Telegram-чат по странам','Еженедельный эфир с разбором кейсов','База актуальных гайдов','Нетворкинг и встречи в городах','Скидки 10–15% на все услуги','Чат психологической адаптации']

function PricingTabs() {
  const [tab, setTab] = useState('visas')
  return (
    <section id="pricing" style={{ background: '#080f18', padding: '100px 24px', position: 'relative' }}>
      <div style={{
        position: 'absolute', left: -150, top: '30%', width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{ maxWidth: 920, margin: '0 auto', position: 'relative' }}>
        <AnimSection>
          <SectionHead label="Услуги и цены" title="Выберите свой формат" light />
        </AnimSection>

        {/* Tab bar */}
        <AnimSection delay={0.1}>
          <div style={{
            display: 'flex', gap: 4, background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14,
            padding: 4, marginBottom: 28, flexWrap: 'wrap',
          }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                flex: 1, padding: '12px 16px', borderRadius: 11, border: 'none', cursor: 'pointer',
                fontWeight: 600, fontSize: 14, transition: 'all 0.25s', minWidth: 80,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                background: tab === t.id
                  ? 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.1))'
                  : 'transparent',
                color: tab === t.id ? C.softGold : 'rgba(255,255,255,0.45)',
                border: tab === t.id ? '1px solid rgba(201,168,76,0.3)' : '1px solid transparent',
                boxShadow: tab === t.id ? '0 4px 16px rgba(201,168,76,0.1)' : 'none',
              }}>
                <t.icon size={15} />{t.label}
              </button>
            ))}
          </div>
        </AnimSection>

        <AnimSection delay={0.15}>
          {(tab === 'visas' || tab === 'relocation' || tab === 'dubai') &&
            PRICES[tab].map((r, i) => <PriceRow key={i} {...r} />)
          }
          {tab === 'club' && <ClubCard />}
        </AnimSection>

        <AnimSection delay={0.2}>
          <div style={{
            marginTop: 24, padding: '16px 22px', borderRadius: 12,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderLeft: `3px solid ${C.mutedTeal}`,
          }}>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, lineHeight: 1.65, margin: 0 }}>
              <strong style={{ color: 'rgba(255,255,255,0.7)' }}>Важно: </strong>
              Мы продаём сопровождение и экспертизу, а не гарантию результата. Ни один добросовестный специалист не может гарантировать выдачу визы или ВНЖ.
            </p>
          </div>
        </AnimSection>
      </div>
    </section>
  )
}

function PriceRow({ name, price, period }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 24px', borderRadius: 14, marginBottom: 10, gap: 16, flexWrap: 'wrap',
        background: hov ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hov ? 'rgba(201,168,76,0.25)' : 'rgba(255,255,255,0.07)'}`,
        transition: 'all 0.25s', backdropFilter: 'blur(10px)',
        transform: hov ? 'translateX(4px)' : 'none',
      }}
    >
      <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15, fontWeight: 500, flex: 1 }}>{name}</span>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexShrink: 0, flexWrap: 'wrap' }}>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 5 }}>
          <Clock size={12} />{period}
        </span>
        <span style={{ fontFamily: '"Playfair Display",serif', fontSize: 22, fontWeight: 700, color: C.softGold }}>{price}</span>
        <GlowBtn href="#quiz">Выбрать</GlowBtn>
      </div>
    </div>
  )
}

function ClubCard() {
  return (
    <div style={{
      borderRadius: 20, padding: '44px 40px', position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(135deg, rgba(27,58,92,0.9), rgba(45,106,138,0.7))',
      border: '1px solid rgba(201,168,76,0.2)',
      backdropFilter: 'blur(20px)',
    }}>
      <div style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20, marginBottom: 36, position: 'relative' }}>
        <div>
          <h3 style={{ fontFamily: '"Playfair Display",serif', fontSize: 32, fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>Клуб MARSHRUT</h3>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, margin: 0 }}>Сообщество тех, кто уже в пути или готовится</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="shimmer-text" style={{ fontFamily: '"Playfair Display",serif', fontSize: 42, fontWeight: 700 }}>$40–80</div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>в месяц</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px,1fr))', gap: 16, marginBottom: 36 }}>
        {CLUB.map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(201,168,76,0.2)', border: '1px solid rgba(201,168,76,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Check size={12} color={C.softGold} strokeWidth={3} />
            </div>
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>{f}</span>
          </div>
        ))}
      </div>
      <GlowBtn href="#quiz" size="lg">Вступить в клуб <ArrowUpRight size={16} /></GlowBtn>
    </div>
  )
}

// ─── DIRECTIONS ────────────────────────────────────────────────────────────────
const COUNTRIES = [
  { flag: '🇦🇪', name: 'ОАЭ (Дубай)', desc: 'Бизнес без налогов, золотая виза, высокий уровень жизни', visa: 'Золотая виза', color: '#C9A84C' },
  { flag: '🇩🇪', name: 'Германия', desc: 'Рабочая и национальная виза, путь к ПМЖ и гражданству', visa: 'Нац. виза / ВНЖ', color: '#2D6A8A' },
  { flag: '🇵🇹', name: 'Португалия', desc: 'Мягкий климат, Digital Nomad виза, путь к ПМЖ за 5 лет', visa: 'D8 / NHR', color: '#3d8aa8' },
  { flag: '🇷🇸', name: 'Сербия', desc: 'Безвизово для россиян, простая регистрация, низкие цены', visa: 'ВНЖ через компанию', color: '#C9A84C' },
  { flag: '🇲🇪', name: 'Черногория', desc: 'Безвизово 30 дней, ВНЖ через аренду, на пути в ЕС', visa: 'ВНЖ через недвижимость', color: '#2D6A8A' },
  { flag: '🇹🇭', name: 'Таиланд', desc: 'LTR-виза для цифровых кочевников, тропический климат', visa: 'LTR Visa', color: '#3d8aa8' },
  { flag: '🇫🇷', name: 'Франция', desc: 'Шенгенская зона, культура, образование мирового уровня', visa: 'Talent Passport', color: '#C9A84C' },
  { flag: '🇮🇹', name: 'Италия', desc: 'Виза цифрового кочевника, ВНЖ через инвестиции', visa: 'Digital Nomad', color: '#2D6A8A' },
  { flag: '🇨🇿', name: 'Чехия', desc: 'Сердце Европы, доступные цены, путь к гражданству ЕС', visa: 'Раб. виза / ВНЖ', color: '#3d8aa8' },
]

function Directions() {
  return (
    <section id="directions" style={{ background: '#0a1520', padding: '100px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <AnimSection>
          <SectionHead label="География" title="Куда мы помогаем переехать" light />
        </AnimSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px,1fr))', gap: 18 }}>
          {COUNTRIES.map((c, i) => (
            <AnimSection key={i} delay={i * 0.06}>
              <CountryCard {...c} />
            </AnimSection>
          ))}
          <AnimSection delay={0.65}>
            <div style={{
              borderRadius: 18, padding: '30px 26px', minHeight: 200,
              background: 'linear-gradient(135deg, rgba(45,106,138,0.3), rgba(27,58,92,0.5))',
              border: '1px solid rgba(201,168,76,0.2)',
              display: 'flex', flexDirection: 'column',
            }}>
              <div style={{ fontSize: 48, marginBottom: 14 }}>🌍</div>
              <h3 style={{ fontFamily: '"Playfair Display",serif', fontSize: 24, fontWeight: 700, color: '#fff', margin: '0 0 10px' }}>+15 стран</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.65, flex: 1 }}>
                Нет вашего направления? Напишите нам — мы работаем с большинством направлений
              </p>
              <GlowBtn href="https://t.me/marshrut_team">Написать нам <ArrowUpRight size={14} /></GlowBtn>
            </div>
          </AnimSection>
        </div>
      </div>
    </section>
  )
}

function CountryCard({ flag, name, desc, visa, color }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 18, padding: '28px 24px',
        background: hov ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hov ? `rgba(${hexToRgb(color)},0.4)` : 'rgba(255,255,255,0.07)'}`,
        transition: 'all 0.3s', backdropFilter: 'blur(10px)',
        transform: hov ? 'translateY(-6px)' : 'none',
        boxShadow: hov ? `0 20px 48px rgba(${hexToRgb(color)},0.12)` : 'none',
        cursor: 'default',
      }}
    >
      <div style={{ fontSize: 44, marginBottom: 16, lineHeight: 1 }}>{flag}</div>
      <h3 style={{ fontFamily: '"Playfair Display",serif', fontSize: 18, fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>{name}</h3>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, lineHeight: 1.65, margin: '0 0 16px' }}>{desc}</p>
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        background: `rgba(${hexToRgb(color)},0.12)`, color: color,
        border: `1px solid rgba(${hexToRgb(color)},0.25)`,
        padding: '5px 12px', borderRadius: 100, fontSize: 12, fontWeight: 600,
      }}>
        <MapPin size={11} />{visa}
      </span>
    </div>
  )
}

// ─── QUIZ ──────────────────────────────────────────────────────────────────────
function getQuizResult(a) {
  const g = a[0] || '', b = a[2] || ''
  if (g.includes('Туризм')) {
    if (b.includes('300')) return { title: 'Сербия / Черногория', product: 'Туристический шенген', desc: 'Отличный старт — минимум документов, максимум свободы. Сербия и Черногория доступны без визы, а мы поможем с шенгеном для дальнейших путешествий.' }
    return { title: 'Шенген под ключ', product: 'Туристический или многократный', desc: 'Полное сопровождение: от сбора документов до записи и подачи. Подберём посольство с лучшим процентом одобрения.' }
  }
  if (g.includes('переезд')) return { title: 'Персональная стратегия', product: 'Семейный релокационный пакет', desc: 'Разберём вашу ситуацию детально: бюджет, дети, работа, язык. Составим маршрут с учётом всех нюансов и сопроводим до результата.' }
  if (g.includes('Бизнес') && (b.includes('1000') || b.includes('3000'))) return { title: 'Дубай или Европа', product: 'Пакет Дубай под ключ / Бизнес-релокация', desc: 'Дубай — ноль налогов, быстрая регистрация компании, золотая виза. Или выберем юрисдикцию в ЕС под ваш бизнес.' }
  return { title: 'Консультация с экспертом', product: 'Консультация 60 минут ($80)', desc: 'Разберём вашу ситуацию персонально. За 60 минут дадим чёткий план действий и ответим на все вопросы.' }
}

const QUIZ_STEPS = [
  { q: 'Какова ваша основная цель?', opts: ['🧳 Туризм и путешествия', '🏠 Долгосрочный переезд с семьёй', '💼 Бизнес и открытие компании', '🌍 Просто хочу варианты'] },
  { q: 'Ваш горизонт планирования?', opts: ['В ближайшие 1–3 месяца', 'В течение полугода', 'Пока только изучаю варианты'] },
  { q: 'Ваш примерный бюджет?', opts: ['До $300', '$300–1000', '$1000–3000', 'Более $3000'] },
]

function LeadQuiz() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const [telegram, setTelegram] = useState('')
  const [sent, setSent] = useState(false)

  const ans = (opt) => {
    const na = [...answers, opt]
    setAnswers(na)
    if (step < QUIZ_STEPS.length - 1) setStep(step + 1)
    else setStep(QUIZ_STEPS.length)
  }
  const reset = () => { setStep(0); setAnswers([]); setTelegram(''); setSent(false) }
  const result = answers.length >= 3 ? getQuizResult(answers) : null

  return (
    <section id="quiz" style={{ background: '#080f18', padding: '100px 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative' }}>
        <AnimSection>
          <SectionHead label="Подбор" title="Какая страна вам подходит?" light />
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, textAlign: 'center', marginTop: -32, marginBottom: 48 }}>
            Ответьте на 3 вопроса — получите персональную рекомендацию
          </p>
        </AnimSection>

        <AnimSection delay={0.1}>
          <div style={{
            borderRadius: 24, padding: '44px 44px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(24px)',
          }}>
            {step < QUIZ_STEPS.length && (
              <>
                {/* Progress */}
                <div style={{ marginBottom: 32 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>Шаг {step + 1} из {QUIZ_STEPS.length}</span>
                    <span style={{ fontSize: 13, color: C.softGold, fontWeight: 600 }}>{Math.round((step / QUIZ_STEPS.length) * 100)}%</span>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 100, height: 4 }}>
                    <div style={{
                      height: '100%', borderRadius: 100,
                      background: `linear-gradient(90deg, ${C.softGold}, ${C.goldLight})`,
                      width: `${(step / QUIZ_STEPS.length) * 100}%`,
                      transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
                      boxShadow: `0 0 8px ${C.softGold}66`,
                    }} />
                  </div>
                </div>

                <h3 style={{ fontFamily: '"Playfair Display",serif', fontSize: 24, color: '#fff', margin: '0 0 24px', fontWeight: 700 }}>
                  {QUIZ_STEPS[step].q}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {QUIZ_STEPS[step].opts.map((opt, i) => {
                    const [h, sh] = useState(false)
                    return (
                      <button key={i} onClick={() => ans(opt)}
                        onMouseEnter={() => sh(true)} onMouseLeave={() => sh(false)}
                        style={{
                          textAlign: 'left', padding: '16px 20px', borderRadius: 14,
                          border: `2px solid ${h ? 'rgba(201,168,76,0.5)' : 'rgba(255,255,255,0.08)'}`,
                          background: h ? 'rgba(201,168,76,0.08)' : 'rgba(255,255,255,0.03)',
                          cursor: 'pointer', fontSize: 15, color: h ? '#fff' : 'rgba(255,255,255,0.75)',
                          fontWeight: 500, transition: 'all 0.2s',
                          transform: h ? 'translateX(4px)' : 'none',
                        }}
                      >{opt}</button>
                    )
                  })}
                </div>
              </>
            )}

            {step === QUIZ_STEPS.length && result && !sent && (
              <div>
                <div style={{
                  background: 'rgba(201,168,76,0.06)', borderRadius: 16, padding: '28px',
                  marginBottom: 28, borderLeft: `3px solid ${C.softGold}`,
                  border: `1px solid rgba(201,168,76,0.2)`,
                }}>
                  <div style={{ fontSize: 11, color: C.softGold, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10 }}>Ваша рекомендация</div>
                  <h3 style={{ fontFamily: '"Playfair Display",serif', fontSize: 26, color: '#fff', margin: '0 0 8px', fontWeight: 700 }}>{result.title}</h3>
                  <p style={{ color: C.softGold, fontSize: 14, fontWeight: 600, margin: '0 0 12px' }}>{result.product}</p>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, lineHeight: 1.7, margin: 0 }}>{result.desc}</p>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, margin: '0 0 12px' }}>Оставьте Telegram — напишем в течение часа:</p>
                <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                  <input type="text" placeholder="@ваш_username" value={telegram}
                    onChange={e => setTelegram(e.target.value)}
                    style={{
                      flex: 1, padding: '14px 18px', borderRadius: 12, fontSize: 15,
                      border: '2px solid rgba(255,255,255,0.1)', outline: 'none',
                      color: '#fff', background: 'rgba(255,255,255,0.05)',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                  <GlowBtn onClick={() => telegram && setSent(true)}>Отправить</GlowBtn>
                </div>
                <button onClick={reset} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', fontSize: 13, textDecoration: 'underline' }}>
                  Пройти заново
                </button>
              </div>
            )}

            {sent && (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{
                  width: 72, height: 72, borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(45,106,138,0.2))',
                  border: '2px solid rgba(201,168,76,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px',
                  boxShadow: '0 0 40px rgba(201,168,76,0.2)',
                }}>
                  <Check size={30} color={C.softGold} strokeWidth={2.5} />
                </div>
                <h3 style={{ fontFamily: '"Playfair Display",serif', fontSize: 26, color: '#fff', margin: '0 0 12px' }}>Отлично!</h3>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 16, lineHeight: 1.7 }}>Мы получили ваш запрос и напишем в Telegram в течение часа.</p>
                <button onClick={reset} style={{ marginTop: 20, background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)', padding: '10px 24px', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>
                  Пройти ещё раз
                </button>
              </div>
            )}
          </div>
        </AnimSection>
      </div>
    </section>
  )
}

// ─── TESTIMONIALS ──────────────────────────────────────────────────────────────
const REVIEWS = [
  { initials: 'АК', name: 'Анна К.', city: 'Лиссабон, Португалия', rating: 5, text: 'Переехали с мужем и двумя детьми — казалось, это невозможно организовать. Команда MARSHRUT сделала пошаговый план на 3 месяца: документы, школы, аренда, NHR-статус. Всё случилось именно так, как обещали.', tag: 'Семейный переезд', color: '#2D6A8A' },
  { initials: 'МР', name: 'Михаил Р.', city: 'Дубай, ОАЭ', rating: 5, text: 'Открыл IT-компанию во Freezone за 3 недели. Золотую визу получил ещё через месяц. Ребята чётко объяснили разницу между Freezone и Mainland. Всё легально и прозрачно.', tag: 'Бизнес-релокация', color: '#C9A84C' },
  { initials: 'ЕВ', name: 'Екатерина В.', city: 'Берлин, Германия', rating: 5, text: 'Первая шенгенская виза в немецкое посольство — думала, что откажут. Проверили каждый документ, объяснили как отвечать на вопросы. Одобрили с первого раза на 6 месяцев.', tag: 'Шенген под ключ', color: '#3d8aa8' },
  { initials: 'ДЮ', name: 'Дмитрий и Юля', city: 'Будва, Черногория', rating: 5, text: 'Поехали с тремя детьми "попробовать". Благодаря маршруту от MARSHRUT оформили ВНЖ, нашли школу и обустроились за месяц. Отвечали на вопросы даже в выходные.', tag: 'Семейный переезд', color: '#2D6A8A' },
]

function Testimonials() {
  const [idx, setIdx] = useState(0)
  const timer = useRef(null)
  const next = useCallback(() => setIdx(i => (i + 1) % REVIEWS.length), [])
  const prev = useCallback(() => setIdx(i => (i - 1 + REVIEWS.length) % REVIEWS.length), [])
  const start = useCallback(() => { clearInterval(timer.current); timer.current = setInterval(next, 5500) }, [next])
  useEffect(() => { start(); return () => clearInterval(timer.current) }, [start])

  const r = REVIEWS[idx]

  return (
    <section style={{ background: '#080f18', padding: '100px 24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <AnimSection>
          <SectionHead label="Истории клиентов" title="Они уже&nbsp;<em>в пути</em>" light />
        </AnimSection>

        <div onMouseEnter={() => clearInterval(timer.current)} onMouseLeave={start}>
          {/* Card */}
          <div style={{
            borderRadius: 24, padding: '44px 48px',
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid rgba(${hexToRgb(r.color)},0.25)`,
            backdropFilter: 'blur(20px)',
            boxShadow: `0 40px 80px rgba(0,0,0,0.3), 0 0 0 1px rgba(${hexToRgb(r.color)},0.1)`,
            transition: 'border-color 0.4s',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Top glow */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${r.color}, transparent)` }} />

            <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <div style={{
                width: 68, height: 68, borderRadius: '50%', flexShrink: 0,
                background: `linear-gradient(135deg, ${r.color}44, ${r.color}22)`,
                border: `2px solid ${r.color}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: '"Playfair Display",serif', fontSize: 22, fontWeight: 700, color: r.color,
                boxShadow: `0 8px 24px ${r.color}22`,
              }}>{r.initials}</div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 17, color: '#fff' }}>{r.name}</div>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, marginTop: 3 }}>{r.city}</div>
                  </div>
                  <span style={{ background: `rgba(${hexToRgb(r.color)},0.12)`, color: r.color, border: `1px solid rgba(${hexToRgb(r.color)},0.3)`, padding: '5px 14px', borderRadius: 100, fontSize: 12, fontWeight: 600 }}>
                    {r.tag}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 3, margin: '16px 0 18px' }}>
                  {[...Array(r.rating)].map((_, i) => <Star key={i} size={16} fill={C.softGold} color={C.softGold} />)}
                </div>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, lineHeight: 1.8, margin: 0, fontStyle: 'italic', fontFamily: '"Playfair Display",serif' }}>
                  «{r.text}»
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, marginTop: 32 }}>
            {[prev, next].map((fn, j) => (
              <button key={j} onClick={() => { fn(); start() }} style={{
                width: 46, height: 46, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.6)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.softGold; e.currentTarget.style.color = C.softGold }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
              >
                {j === 0 ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
              </button>
            ))}
            <div style={{ display: 'flex', gap: 8 }}>
              {REVIEWS.map((_, i) => (
                <button key={i} onClick={() => { setIdx(i); start() }} style={{
                  width: i === idx ? 28 : 8, height: 8, borderRadius: 100, border: 'none', cursor: 'pointer', padding: 0,
                  background: i === idx ? C.softGold : 'rgba(255,255,255,0.2)',
                  boxShadow: i === idx ? `0 0 10px ${C.softGold}88` : 'none',
                  transition: 'all 0.3s',
                }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ───────────────────────────────────────────────────────────────────────
const FAQ_DATA = [
  { q: 'Вы гарантируете получение визы?', a: 'Нет. Ни одна добросовестная компания не может этого гарантировать — решение принимает посольство. Мы гарантируем профессиональную подготовку документов и максимально сильную заявку.' },
  { q: 'Что значит «информационное сопровождение»?', a: 'Мы — консультационная компания: разбираем законодательство, собираем требования посольств, проверяем документы, готовим к собеседованию. Не являемся лицензированными адвокатами.' },
  { q: 'Как принимаете оплату из России и из-за рубежа?', a: 'Принимаем USDT/USDC (крипто), Wise, Swift из-за рубежа, в некоторых случаях переводы внутри России. Уточните актуальные способы у менеджера.' },
  { q: 'Работаете ли вы с гражданами Беларуси, Украины, Казахстана?', a: 'Да, работаем со всеми русскоязычными клиентами вне зависимости от гражданства. Учитываем специфику каждого паспорта.' },
  { q: 'Что происходит, если в визе отказали?', a: 'Разбираем причину, корректируем стратегию и документы, помогаем с повторной подачей. Работаем и с теми, у кого уже были отказы.' },
  { q: 'Как долго длится работа по пакету?', a: 'Консультация — 1 день, туристический шенген — 7–14 дней, семейный переезд — 30–60 дней. Сроки указаны в описании каждого продукта.' },
  { q: 'Можно ли начать, если у меня уже есть отказы?', a: 'Да. Разберём историю, поймём причину и составим стратегию с учётом вашей ситуации. Отказы не блокируют новую подачу.' },
  { q: 'Как проходит консультация?', a: 'Онлайн в Zoom или Telegram-звонке, 60 минут. После — письмо с планом действий и следующими шагами.' },
]

function FAQ() {
  const [open, setOpen] = useState(null)
  return (
    <section style={{ background: '#0a1520', padding: '100px 24px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <AnimSection>
          <SectionHead label="FAQ" title="Ответы на частые вопросы" light />
        </AnimSection>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {FAQ_DATA.map((item, i) => {
            const isOpen = open === i
            return (
              <AnimSection key={i} delay={i * 0.04}>
                <div style={{
                  borderRadius: 16, overflow: 'hidden',
                  background: isOpen ? 'rgba(201,168,76,0.06)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isOpen ? 'rgba(201,168,76,0.3)' : 'rgba(255,255,255,0.07)'}`,
                  transition: 'all 0.3s', backdropFilter: 'blur(10px)',
                }}>
                  <button onClick={() => setOpen(isOpen ? null : i)} style={{
                    width: '100%', padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, textAlign: 'left',
                  }}>
                    <span style={{ fontWeight: 600, fontSize: 16, color: isOpen ? '#fff' : 'rgba(255,255,255,0.8)' }}>{item.q}</span>
                    <div style={{
                      width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                      background: isOpen ? 'rgba(201,168,76,0.2)' : 'rgba(255,255,255,0.06)',
                      border: `1px solid ${isOpen ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.1)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.3s', transform: isOpen ? 'rotate(180deg)' : 'none',
                    }}>
                      <ChevronDown size={15} color={isOpen ? C.softGold : 'rgba(255,255,255,0.5)'} />
                    </div>
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 24px 22px' }}>
                      <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 15, lineHeight: 1.75, margin: 0 }}>{item.a}</p>
                    </div>
                  )}
                </div>
              </AnimSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── FINAL CTA ─────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section id="contact" style={{ background: '#080f18', padding: '120px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(45,106,138,0.2) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 600, height: 300, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 660, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <AnimSection>
          <Label>Первый шаг</Label>
          <h2 style={{
            fontFamily: '"Playfair Display",serif', fontSize: 'clamp(32px,5vw,56px)',
            fontWeight: 900, color: '#fff', margin: '20px 0 24px', lineHeight: 1.1, letterSpacing: '-0.03em',
          }}>
            Готовы сделать<br /><span className="shimmer-text">первый шаг?</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 18, lineHeight: 1.7, marginBottom: 48, fontWeight: 300 }}>
            Пройдите бесплатную диагностику — это займёт 5 минут. Мы изучим ситуацию и предложим конкретный маршрут.
          </p>

          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
            <GlowBtn href="#quiz" size="lg">
              Начать диагностику <ArrowUpRight size={20} />
            </GlowBtn>
          </div>

          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 15 }}>
            Или напишите напрямую:{' '}
            <a href="https://t.me/marshrut_team" target="_blank" rel="noopener noreferrer"
              style={{ color: C.softGold, fontWeight: 600, textDecoration: 'none' }}>@marshrut_team</a>
          </p>

          <div style={{
            marginTop: 40, display: 'inline-flex', alignItems: 'center', gap: 12,
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 100, padding: '12px 26px', backdropFilter: 'blur(10px)',
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80' }} />
            <Clock size={15} color={C.softGold} />
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: 500 }}>
              Следующая свободная консультация — в пятницу
            </span>
          </div>
        </AnimSection>
      </div>
    </section>
  )
}

// ─── FOOTER ────────────────────────────────────────────────────────────────────
function Footer() {
  const cols = [
    { title: 'Услуги', items: ['Консультация 60 мин','Шенген под ключ','Персональная стратегия','Семейный переезд','Дубай под ключ','Клуб MARSHRUT'], href: '#pricing' },
    { title: 'Направления', items: ['ОАЭ (Дубай)','Германия','Португалия','Сербия','Черногория','Таиланд'], href: '#directions' },
    { title: 'Компания', items: ['О нас','Блог','Отзывы','Партнёрам','Контакты'], href: '#' },
  ]
  const socials = [
    { icon: Send, href: 'https://t.me/marshrut_team', label: 'Telegram' },
    { icon: PlayCircle, href: '#', label: 'YouTube' },
    { icon: Camera, href: '#', label: 'Instagram' },
  ]

  return (
    <footer style={{ background: '#040b12', padding: '72px 24px 40px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(185px,1fr))', gap: 48, marginBottom: 56 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg, #C9A84C, #a8893e)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(201,168,76,0.3)' }}>
                <Compass size={20} color="#0D1B2A" strokeWidth={2.5} />
              </div>
              <span style={{ fontFamily: '"Playfair Display",serif', fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '0.08em' }}>MARSHRUT</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14, lineHeight: 1.65, marginBottom: 24 }}>Ваш маршрут в новую жизнь</p>
            <div style={{ display: 'flex', gap: 10 }}>
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} style={{
                  width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.15)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'; e.currentTarget.style.color = C.softGold }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)' }}
                ><Icon size={18} /></a>
              ))}
            </div>
          </div>

          {cols.map(col => (
            <div key={col.title}>
              <h4 style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 18px' }}>{col.title}</h4>
              {col.items.map(item => (
                <a key={item} href={col.href} style={{ display: 'block', color: 'rgba(255,255,255,0.3)', fontSize: 14, textDecoration: 'none', marginBottom: 10, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.8)'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.3)'}
                >{item}</a>
              ))}
            </div>
          ))}
        </div>

        <div style={{ padding: '20px 24px', borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', marginBottom: 24 }}>
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12, lineHeight: 1.65, margin: 0, textAlign: 'center' }}>
            MARSHRUT — информационно-консультационная компания. Не является лицензированным иммиграционным адвокатом. Мы предоставляем экспертизу и сопровождение, но не гарантируем результат.
          </p>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 20, textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12, margin: 0 }}>© 2025 MARSHRUT. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}

// ─── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ fontFamily: '"Inter", system-ui, sans-serif' }}>
      <Navbar />
      <Hero />
      <CountryTicker />
      <AudienceCards />
      <HowItWorks />
      <PricingTabs />
      <Directions />
      <LeadQuiz />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  )
}
