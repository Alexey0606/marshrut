import { useState, useEffect, useRef, useCallback } from 'react'
import {
  Compass, Plane, Home, Briefcase, ChevronDown, ChevronRight,
  ChevronLeft, Menu, X, Star, Check, ArrowUpRight, Send,
  PlayCircle, Camera, MapPin, Clock
} from 'lucide-react'
import './index.css'

// ─── Design tokens ─────────────────────────────────────────────────────────────
const C = {
  deepNavy:   '#0D1B2A',
  slateBlue:  '#1B3A5C',
  mutedTeal:  '#2D6A8A',
  warmSand:   '#F2EDE4',
  softGold:   '#C9A84C',
  creamWhite: '#FAFAF8',
  textPrimary:'#1A1A2E',
  textMuted:  '#6B7A8D',
}

// ─── useIntersection hook ──────────────────────────────────────────────────────
function useIntersection() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold: 0.12 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

function AnimSection({ children, className = '', delay = 0 }) {
  const [ref, vis] = useIntersection()
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(28px)',
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
    }}>
      {children}
    </div>
  )
}

// ─── NAVBAR ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
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
      background: scrolled ? 'rgba(13,27,42,0.93)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 34, height: 34, borderRadius: 9,
            background: `linear-gradient(135deg, ${C.softGold}, #a8893e)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Compass size={18} color="#0D1B2A" strokeWidth={2.5} />
          </div>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: 19, fontWeight: 700, letterSpacing: '0.12em', color: '#fff', textTransform: 'uppercase' }}>
            MARSHRUT
          </span>
          <ArrowUpRight size={14} color={C.softGold} />
        </a>

        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="nav-links">
          {links.map(l => (
            <a key={l.label} href={l.href} style={{
              color: 'rgba(255,255,255,0.78)', textDecoration: 'none',
              fontSize: 14, fontWeight: 500, letterSpacing: '0.02em', transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = C.softGold}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.78)'}
            >{l.label}</a>
          ))}
          <a href="#quiz" style={{
            background: C.softGold, color: C.deepNavy, padding: '10px 22px',
            borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: 'none',
          }}>Начать маршрут</a>
        </div>

        <button onClick={() => setOpen(!open)} style={{
          display: 'none', background: 'none', border: 'none',
          color: '#fff', cursor: 'pointer', padding: 4,
        }} className="burger">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div style={{ background: C.deepNavy, borderTop: '1px solid rgba(255,255,255,0.08)', padding: '20px 24px 28px' }}>
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} style={{
              display: 'block', color: 'rgba(255,255,255,0.85)', textDecoration: 'none',
              padding: '13px 0', fontSize: 16, fontWeight: 500,
              borderBottom: '1px solid rgba(255,255,255,0.07)',
            }}>{l.label}</a>
          ))}
          <a href="#quiz" onClick={() => setOpen(false)} style={{
            display: 'block', marginTop: 20, background: C.softGold, color: C.deepNavy,
            padding: '14px 22px', borderRadius: 8, fontWeight: 700, fontSize: 15,
            textDecoration: 'none', textAlign: 'center',
          }}>Начать маршрут</a>
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
function HeroMap() {
  const pts = [
    { x: 60,  y: 220, label: 'Москва' },
    { x: 190, y: 130, label: 'Берлин' },
    { x: 300, y: 60,  label: 'Париж' },
    { x: 170, y: 270, label: 'Дубай' },
    { x: 340, y: 185, label: 'Лиссабон' },
    { x: 70,  y: 100, label: 'Белград' },
  ]
  const pathD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

  return (
    <svg viewBox="0 0 420 340" width="100%" style={{ maxWidth: 420, display: 'block' }}>
      <defs>
        <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.softGold} stopOpacity="0.12" />
          <stop offset="100%" stopColor={C.softGold} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="210" cy="170" rx="200" ry="155" fill="url(#mapGlow)" />
      {[60,120,180,240,300].map(y => <line key={y} x1="20" y1={y} x2="400" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />)}
      {[80,160,240,320].map(x => <line key={x} x1={x} y1="20" x2={x} y2="320" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />)}
      <path d={pathD} fill="none" stroke={C.softGold} strokeWidth="1.5" strokeDasharray="6 4" opacity="0.4" className="draw-line" />
      <path d={pathD} fill="none" stroke={C.softGold} strokeWidth="2.5" opacity="0.9"
        style={{ strokeDasharray: 800, strokeDashoffset: 800, animation: 'drawLine 2.5s ease forwards 0.4s' }} />
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="16" fill={`rgba(201,168,76,0.1)`} />
          <circle cx={p.x} cy={p.y} r="7" fill={C.softGold} className="pulse-dot" style={{ animationDelay: `${i * 0.4}s` }} />
          <circle cx={p.x} cy={p.y} r="3" fill="#fff" />
          <text x={p.x + 13} y={p.y + 4} fill="rgba(255,255,255,0.65)" fontSize="11" fontFamily="Inter,sans-serif">{p.label}</text>
        </g>
      ))}
    </svg>
  )
}

function Hero() {
  return (
    <section id="hero" style={{ background: C.deepNavy, minHeight: '100vh', paddingTop: 68, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 48, alignItems: 'center' }} className="hero-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)',
              borderRadius: 100, padding: '6px 16px', alignSelf: 'flex-start',
            }}>
              <MapPin size={13} color={C.softGold} />
              <span style={{ color: C.softGold, fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Релокационная экосистема
              </span>
            </div>

            <h1 style={{
              fontFamily: 'Georgia, serif', fontSize: 'clamp(34px, 5vw, 58px)',
              fontWeight: 700, color: '#fff', lineHeight: 1.12, margin: 0, letterSpacing: '-0.02em',
            }}>
              Ваш маршрут в новую жизнь —<br />
              <span style={{ color: C.softGold }}>с опорой</span>, а не в одиночку
            </h1>

            <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 18, lineHeight: 1.65, maxWidth: 520, margin: 0 }}>
              Помогаем русскоязычным людям переезжать легально, спокойно и с поддержкой. Шенген, Дубай, ЕС и другие направления.
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a href="#quiz" style={{
                background: C.softGold, color: C.deepNavy, padding: '15px 32px',
                borderRadius: 10, fontWeight: 700, fontSize: 16, textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                boxShadow: '0 4px 24px rgba(201,168,76,0.35)',
              }}>
                Пройти диагностику <ArrowUpRight size={16} />
              </a>
              <a href="#pricing" style={{
                border: '2px solid rgba(255,255,255,0.28)', color: '#fff',
                padding: '15px 32px', borderRadius: 10, fontWeight: 600, fontSize: 16, textDecoration: 'none',
              }}>
                Смотреть услуги
              </a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: 2 }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={15} fill={C.softGold} color={C.softGold} />)}
              </div>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>
                Более 200 клиентов · 15+ стран · Средний чек $250
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }} className="hero-map">
            <HeroMap />
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .hero-grid { grid-template-columns: 1fr 420px !important; }
        }
        @media (max-width: 899px) {
          .hero-map { display: none !important; }
        }
      `}</style>
    </section>
  )
}

// ─── TICKER ────────────────────────────────────────────────────────────────────
function CountryTicker() {
  const items = [
    '🇩🇪 Германия', '🇦🇪 ОАЭ', '🇷🇸 Сербия', '🇵🇹 Португалия',
    '🇹🇭 Таиланд', '🇲🇪 Черногория', '🇫🇷 Франция', '🇮🇹 Италия', '🇨🇿 Чехия',
  ]
  return (
    <div style={{ background: C.warmSand, padding: '18px 0', overflow: 'hidden', borderTop: `3px solid ${C.softGold}` }}>
      <div className="ticker-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{
            padding: '0 40px', color: C.textPrimary, fontSize: 15, fontWeight: 600,
            display: 'inline-flex', alignItems: 'center', gap: 12, flexShrink: 0,
          }}>
            {item} <span style={{ color: C.softGold, opacity: 0.5 }}>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── AUDIENCE ──────────────────────────────────────────────────────────────────
function AudienceCards() {
  const cards = [
    {
      icon: Plane, title: 'Путешественник',
      desc: 'Нужна шенгенская виза для путешествий. Хотите получить её надёжно, без стресса и очередей, с полной проверкой документов.',
    },
    {
      icon: Home, title: 'Семья в переезде',
      desc: 'Планируете долгосрочный переезд всей семьёй. Важны школы, безопасность, социальные гарантии и понятный план на год вперёд.',
    },
    {
      icon: Briefcase, title: 'Предприниматель',
      desc: 'Дубай, открытие компании, золотая виза, налоговая оптимизация. Хотите переехать и продолжить бизнес в другой юрисдикции.',
    },
  ]
  return (
    <section style={{ background: C.warmSand, padding: '96px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <AnimSection>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{ color: C.mutedTeal, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Для кого</span>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px,4vw,42px)', color: C.textPrimary, margin: '12px 0 0', fontWeight: 700 }}>Узнайте себя</h2>
          </div>
        </AnimSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {cards.map((c, i) => (
            <AnimSection key={i} delay={i * 0.15}>
              <div style={{
                background: C.creamWhite, borderRadius: 16, padding: '36px 32px',
                border: '1px solid rgba(45,106,138,0.12)',
                transition: 'transform 0.25s, box-shadow 0.25s', cursor: 'default',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 48px rgba(13,27,42,0.12)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: 14,
                  background: `linear-gradient(135deg, ${C.slateBlue}, ${C.mutedTeal})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20,
                }}>
                  <c.icon size={26} color="#fff" />
                </div>
                <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 22, fontWeight: 700, color: C.textPrimary, margin: '0 0 12px' }}>{c.title}</h3>
                <p style={{ color: C.textMuted, fontSize: 15, lineHeight: 1.65, margin: '0 0 20px' }}>{c.desc}</p>
                <a href="#quiz" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: C.mutedTeal, fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                  Мне подходит <ChevronRight size={16} />
                </a>
              </div>
            </AnimSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── HOW IT WORKS ──────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { n: '01', title: 'Диагностика', desc: 'Заполняете анкету, бот собирает данные о вашей ситуации: цель, направление, документы, бюджет. Это займёт 5–7 минут.' },
    { n: '02', title: 'Маршрут', desc: 'Эксперт составляет персональный план: какая виза, какие документы, что и когда делать. Чёткий список без воды.' },
    { n: '03', title: 'Сопровождение', desc: 'Проверяем каждый документ, готовим к собеседованию, держим в курсе на каждом шаге. Вы не одни.' },
    { n: '04', title: 'Результат', desc: 'Виза, ВНЖ или переезд — вы в новой точке жизни. Мы рядом и дальше, если нужно.' },
  ]
  return (
    <section id="how" style={{ background: C.deepNavy, padding: '96px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <AnimSection>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <span style={{ color: C.softGold, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Процесс</span>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(28px,4vw,42px)', color: '#fff', margin: '12px 0 0', fontWeight: 700 }}>
              От первого вопроса до нового адреса
            </h2>
          </div>
        </AnimSection>
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute', left: 31, top: 36, bottom: 36, width: 2,
            background: `linear-gradient(to bottom, ${C.softGold}, rgba(201,168,76,0.05))`,
          }} />
          {steps.map((s, i) => (
            <AnimSection key={i} delay={i * 0.18}>
              <div style={{ display: 'flex', gap: 28, marginBottom: i < steps.length - 1 ? 52 : 0 }}>
                <div style={{ flexShrink: 0 }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${C.softGold}, #a8893e)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Georgia,serif', fontSize: 18, fontWeight: 700, color: C.deepNavy,
                    position: 'relative', zIndex: 1,
                  }}>{s.n}</div>
                </div>
                <div style={{ paddingTop: 15 }}>
                  <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 22, color: '#fff', margin: '0 0 10px', fontWeight: 700 }}>{s.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.62)', fontSize: 16, lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
                </div>
              </div>
            </AnimSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── PRICING ───────────────────────────────────────────────────────────────────
const TABS = [
  { id: 'visas', label: 'Визы' },
  { id: 'relocation', label: 'Переезд' },
  { id: 'dubai', label: 'Дубай' },
  { id: 'club', label: 'Клуб' },
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

const CLUB_FEATURES = [
  'Закрытый Telegram-чат по странам',
  'Еженедельный эфир с разбором кейсов',
  'База актуальных гайдов',
  'Нетворкинг и встречи в городах',
  'Скидки 10–15% на все услуги',
  'Чат психологической адаптации',
]

function PriceRow({ name, price, period }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '18px 24px', borderRadius: 12, background: C.creamWhite,
      marginBottom: 10, gap: 16, flexWrap: 'wrap',
      border: '1px solid rgba(45,106,138,0.1)',
      transition: 'box-shadow 0.2s',
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(13,27,42,0.08)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = ''}
    >
      <span style={{ color: C.textPrimary, fontSize: 15, fontWeight: 500, flex: 1 }}>{name}</span>
      <div style={{ display: 'flex', gap: 18, alignItems: 'center', flexShrink: 0, flexWrap: 'wrap' }}>
        <span style={{ color: C.mutedTeal, fontSize: 13, display: 'flex', alignItems: 'center', gap: 5 }}>
          <Clock size={13} />{period}
        </span>
        <span style={{ fontFamily: 'Georgia,serif', fontSize: 20, fontWeight: 700, color: C.textPrimary }}>{price}</span>
        <a href="#quiz" style={{
          background: C.softGold, color: C.deepNavy, padding: '8px 18px',
          borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: 'none',
        }}>Выбрать</a>
      </div>
    </div>
  )
}

function PricingTabs() {
  const [activeTab, setActiveTab] = useState('visas')

  return (
    <section id="pricing" style={{ background: C.warmSand, padding: '96px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <AnimSection>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ color: C.mutedTeal, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Услуги и цены</span>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(28px,4vw,42px)', color: C.textPrimary, margin: '12px 0 0', fontWeight: 700 }}>
              Выберите свой формат
            </h2>
          </div>
        </AnimSection>

        <AnimSection delay={0.1}>
          <div style={{
            display: 'flex', gap: 4, background: 'rgba(13,27,42,0.08)', borderRadius: 13,
            padding: 4, marginBottom: 32, flexWrap: 'wrap',
          }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                flex: 1, padding: '11px 18px', borderRadius: 10, border: 'none', cursor: 'pointer',
                fontWeight: 600, fontSize: 14, transition: 'all 0.22s', minWidth: 72,
                background: activeTab === t.id ? C.deepNavy : 'transparent',
                color: activeTab === t.id ? '#fff' : C.textMuted,
                boxShadow: activeTab === t.id ? '0 2px 12px rgba(13,27,42,0.2)' : 'none',
              }}>{t.label}</button>
            ))}
          </div>
        </AnimSection>

        <AnimSection delay={0.15}>
          {(activeTab === 'visas' || activeTab === 'relocation' || activeTab === 'dubai') &&
            PRICES[activeTab].map((r, i) => <PriceRow key={i} {...r} />)
          }
          {activeTab === 'club' && (
            <div style={{
              background: `linear-gradient(135deg, ${C.slateBlue}, ${C.mutedTeal})`,
              borderRadius: 18, padding: '40px 36px', color: '#fff',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20, marginBottom: 32 }}>
                <div>
                  <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 28, fontWeight: 700, margin: '0 0 8px' }}>Клуб MARSHRUT</h3>
                  <p style={{ opacity: 0.8, fontSize: 15, margin: 0 }}>Сообщество тех, кто уже в пути или готовится</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'Georgia,serif', fontSize: 36, fontWeight: 700, color: C.softGold }}>$40–80</div>
                  <div style={{ opacity: 0.65, fontSize: 13 }}>в месяц</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 14, marginBottom: 32 }}>
                {CLUB_FEATURES.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: '50%', background: 'rgba(201,168,76,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <Check size={12} color={C.softGold} strokeWidth={3} />
                    </div>
                    <span style={{ fontSize: 14, opacity: 0.9 }}>{f}</span>
                  </div>
                ))}
              </div>
              <button style={{
                background: C.softGold, color: C.deepNavy, padding: '14px 36px',
                borderRadius: 10, fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer',
              }}>Вступить в клуб</button>
            </div>
          )}
        </AnimSection>

        <AnimSection delay={0.2}>
          <div style={{
            marginTop: 28, padding: '16px 22px', background: 'rgba(13,27,42,0.06)',
            borderRadius: 10, borderLeft: `3px solid ${C.mutedTeal}`,
          }}>
            <p style={{ color: C.textMuted, fontSize: 13, lineHeight: 1.6, margin: 0 }}>
              <strong style={{ color: C.textPrimary }}>Важно: </strong>
              Мы продаём сопровождение и экспертизу, а не гарантию результата. Ни один добросовестный специалист не может гарантировать выдачу визы или ВНЖ.
            </p>
          </div>
        </AnimSection>
      </div>
    </section>
  )
}

// ─── DIRECTIONS ────────────────────────────────────────────────────────────────
const COUNTRIES = [
  { flag: '🇦🇪', name: 'ОАЭ (Дубай)', desc: 'Бизнес без налогов, золотая виза, высокий уровень жизни', visa: 'Золотая виза / Фриланс-виза' },
  { flag: '🇩🇪', name: 'Германия', desc: 'Рабочая и национальная виза, путь к ПМЖ и гражданству', visa: 'Национальная виза / ВНЖ' },
  { flag: '🇵🇹', name: 'Португалия', desc: 'Мягкий климат, Digital Nomad виза, путь к ПМЖ за 5 лет', visa: 'D8 Digital Nomad / NHR' },
  { flag: '🇷🇸', name: 'Сербия', desc: 'Безвизовый въезд для россиян, простая регистрация, низкие цены', visa: 'ВНЖ через компанию' },
  { flag: '🇲🇪', name: 'Черногория', desc: 'Безвизово 30 дней, ВНЖ через аренду, на пути в ЕС', visa: 'ВНЖ через недвижимость' },
  { flag: '🇹🇭', name: 'Таиланд', desc: 'LTR-виза для цифровых кочевников, тропический климат', visa: 'LTR Visa / Thailand Elite' },
  { flag: '🇫🇷', name: 'Франция', desc: 'Шенгенская зона, культура, образование мирового уровня', visa: 'Talent Passport / ВНЖ' },
  { flag: '🇮🇹', name: 'Италия', desc: 'Виза цифрового кочевника с 2024 года, ВНЖ через инвестиции', visa: 'Digital Nomad Visa' },
  { flag: '🇨🇿', name: 'Чехия', desc: 'Сердце Европы, доступные цены, путь к гражданству ЕС', visa: 'Рабочая виза / ВНЖ' },
]

const CountryCard = ({ flag, name, desc, visa }) => (
  <div style={{
    background: C.creamWhite, borderRadius: 14, padding: '28px 24px',
    border: '1px solid rgba(45,106,138,0.1)',
    transition: 'transform 0.25s, box-shadow 0.25s',
  }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(13,27,42,0.1)' }}
    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
  >
    <div style={{ fontSize: 44, marginBottom: 14, lineHeight: 1 }}>{flag}</div>
    <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 18, fontWeight: 700, color: C.textPrimary, margin: '0 0 8px' }}>{name}</h3>
    <p style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.6, margin: '0 0 16px' }}>{desc}</p>
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: 'rgba(45,106,138,0.1)', color: C.mutedTeal,
      padding: '5px 12px', borderRadius: 100, fontSize: 12, fontWeight: 600,
    }}>
      <MapPin size={11} />{visa}
    </span>
  </div>
)

function Directions() {
  return (
    <section id="directions" style={{ background: C.deepNavy, padding: '96px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <AnimSection>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{ color: C.softGold, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>География</span>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(28px,4vw,42px)', color: '#fff', margin: '12px 0 0', fontWeight: 700 }}>
              Куда мы помогаем переехать
            </h2>
          </div>
        </AnimSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: 20 }}>
          {COUNTRIES.map((c, i) => (
            <AnimSection key={i} delay={i * 0.07}>
              <CountryCard {...c} />
            </AnimSection>
          ))}
          <AnimSection delay={0.7}>
            <div style={{
              background: `linear-gradient(135deg, ${C.slateBlue}, ${C.mutedTeal})`,
              borderRadius: 14, padding: '28px 24px', display: 'flex', flexDirection: 'column', minHeight: 220,
            }}>
              <div style={{ fontSize: 44, marginBottom: 14 }}>🌍</div>
              <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 22, fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>+15 стран</h3>
              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 14, lineHeight: 1.6, margin: '0 0 24px', flex: 1 }}>
                Нет вашего направления? Напишите нам — мы работаем с большинством направлений
              </p>
              <a href="https://t.me/marshrut_team" target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                background: C.softGold, color: C.deepNavy, padding: '11px 20px',
                borderRadius: 8, fontWeight: 700, fontSize: 13, textDecoration: 'none', alignSelf: 'flex-start',
              }}>
                Написать нам <ArrowUpRight size={14} />
              </a>
            </div>
          </AnimSection>
        </div>
      </div>
    </section>
  )
}

// ─── LEAD QUIZ ─────────────────────────────────────────────────────────────────
function getQuizResult(answers) {
  const goal = answers[0] || ''
  const budget = answers[2] || ''
  if (goal.includes('Туризм')) {
    if (budget.includes('300')) return { title: 'Сербия / Черногория', product: 'Безвизовый въезд + туристический шенген', desc: 'Отличный старт — минимум документов, максимум свободы. Сербия и Черногория доступны без визы, а мы поможем с шенгеном для дальнейших путешествий.' }
    return { title: 'Шенген под ключ', product: 'Туристический или многократный шенген', desc: 'Полное сопровождение: от сбора документов до записи и подачи. Подберём посольство с лучшим процентом одобрения.' }
  }
  if (goal.includes('переезд')) {
    return { title: 'Персональная стратегия релокации', product: 'Семейный релокационный пакет', desc: 'Разберём вашу ситуацию детально: бюджет, дети, работа, язык. Составим маршрут с учётом всех нюансов и сопроводим до результата.' }
  }
  if (goal.includes('Бизнес') && (budget.includes('1000') || budget.includes('3000'))) {
    return { title: 'Дубай или Европа', product: 'Бизнес-релокация / Пакет Дубай под ключ', desc: 'Дубай — ноль налогов, быстрая регистрация компании, золотая виза. Или выберем юрисдикцию в ЕС под ваш бизнес и цели.' }
  }
  return { title: 'Консультация с экспертом', product: 'Консультация 60 минут ($80)', desc: 'Разберём вашу ситуацию персонально. За 60 минут дадим чёткий план действий и ответим на все вопросы.' }
}

const QUIZ_STEPS = [
  {
    q: 'Какова ваша основная цель?',
    opts: ['🧳 Туризм и путешествия', '🏠 Долгосрочный переезд с семьёй', '💼 Бизнес и открытие компании', '🌍 Просто хочу варианты'],
  },
  {
    q: 'Ваш горизонт планирования?',
    opts: ['В ближайшие 1–3 месяца', 'В течение полугода', 'Пока только изучаю варианты'],
  },
  {
    q: 'Ваш примерный бюджет на переезд/визу?',
    opts: ['До $300', '$300–1000', '$1000–3000', 'Более $3000'],
  },
]

function LeadQuiz() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const [telegram, setTelegram] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleAnswer = (opt) => {
    const newAns = [...answers, opt]
    setAnswers(newAns)
    if (step < QUIZ_STEPS.length - 1) setStep(step + 1)
    else setStep(QUIZ_STEPS.length)
  }

  const reset = () => { setStep(0); setAnswers([]); setTelegram(''); setSubmitted(false) }

  const result = answers.length >= 3 ? getQuizResult(answers) : null

  return (
    <section id="quiz" style={{ background: C.warmSand, padding: '96px 24px' }}>
      <div style={{ maxWidth: 660, margin: '0 auto' }}>
        <AnimSection>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ color: C.mutedTeal, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Подбор</span>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(28px,4vw,42px)', color: C.textPrimary, margin: '12px 0 8px', fontWeight: 700 }}>
              Какая страна вам подходит?
            </h2>
            <p style={{ color: C.textMuted, fontSize: 16, margin: 0 }}>Ответьте на 3 вопроса — получите персональную рекомендацию</p>
          </div>
        </AnimSection>
        <AnimSection delay={0.1}>
          <div style={{ background: C.creamWhite, borderRadius: 20, padding: '40px 40px', boxShadow: '0 8px 48px rgba(13,27,42,0.09)' }}>
            {step < QUIZ_STEPS.length && (
              <>
                <div style={{ marginBottom: 28 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: C.textMuted, fontWeight: 500 }}>Вопрос {step + 1} из {QUIZ_STEPS.length}</span>
                    <span style={{ fontSize: 13, color: C.mutedTeal, fontWeight: 600 }}>{Math.round((step / QUIZ_STEPS.length) * 100)}%</span>
                  </div>
                  <div style={{ background: 'rgba(45,106,138,0.12)', borderRadius: 100, height: 6 }}>
                    <div style={{
                      height: '100%', borderRadius: 100,
                      background: `linear-gradient(to right, ${C.mutedTeal}, ${C.softGold})`,
                      width: `${(step / QUIZ_STEPS.length) * 100}%`,
                      transition: 'width 0.4s ease',
                    }} />
                  </div>
                </div>
                <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 22, color: C.textPrimary, margin: '0 0 22px', fontWeight: 700 }}>
                  {QUIZ_STEPS[step].q}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {QUIZ_STEPS[step].opts.map((opt, i) => (
                    <button key={i} onClick={() => handleAnswer(opt)} style={{
                      textAlign: 'left', padding: '16px 20px', borderRadius: 12,
                      border: '2px solid rgba(45,106,138,0.15)', background: '#fff',
                      cursor: 'pointer', fontSize: 15, color: C.textPrimary, fontWeight: 500,
                      transition: 'all 0.2s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = C.mutedTeal; e.currentTarget.style.background = 'rgba(45,106,138,0.04)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(45,106,138,0.15)'; e.currentTarget.style.background = '#fff' }}
                    >{opt}</button>
                  ))}
                </div>
              </>
            )}

            {step === QUIZ_STEPS.length && result && !submitted && (
              <div>
                <div style={{ background: 'rgba(45,106,138,0.05)', borderRadius: 14, padding: '24px', marginBottom: 28, borderLeft: `4px solid ${C.softGold}` }}>
                  <div style={{ fontSize: 12, color: C.mutedTeal, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Ваша рекомендация</div>
                  <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 24, color: C.textPrimary, margin: '0 0 8px', fontWeight: 700 }}>{result.title}</h3>
                  <p style={{ color: C.mutedTeal, fontSize: 14, fontWeight: 600, margin: '0 0 12px' }}>{result.product}</p>
                  <p style={{ color: C.textMuted, fontSize: 15, lineHeight: 1.65, margin: 0 }}>{result.desc}</p>
                </div>
                <p style={{ color: C.textMuted, fontSize: 14, margin: '0 0 12px' }}>Оставьте ваш Telegram — напишем в течение часа:</p>
                <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                  <input type="text" placeholder="@ваш_username" value={telegram}
                    onChange={e => setTelegram(e.target.value)}
                    style={{
                      flex: 1, padding: '13px 16px', borderRadius: 10, fontSize: 15,
                      border: '2px solid rgba(45,106,138,0.2)', outline: 'none', color: C.textPrimary, background: '#fff',
                    }} />
                  <button onClick={() => telegram && setSubmitted(true)} style={{
                    background: C.softGold, color: C.deepNavy, padding: '13px 24px',
                    borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14,
                  }}>Отправить</button>
                </div>
                <button onClick={reset} style={{ background: 'none', border: 'none', color: C.textMuted, cursor: 'pointer', fontSize: 13, textDecoration: 'underline' }}>
                  Пройти заново
                </button>
              </div>
            )}

            {submitted && (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${C.mutedTeal}, ${C.slateBlue})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
                }}>
                  <Check size={28} color="#fff" strokeWidth={3} />
                </div>
                <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 24, color: C.textPrimary, margin: '0 0 12px' }}>Отлично!</h3>
                <p style={{ color: C.textMuted, fontSize: 16, lineHeight: 1.65 }}>Мы получили ваш запрос и напишем на Telegram в течение часа. Спасибо за доверие!</p>
                <button onClick={reset} style={{
                  marginTop: 20, background: 'none', border: `2px solid rgba(45,106,138,0.2)`,
                  color: C.mutedTeal, padding: '10px 24px', borderRadius: 8, cursor: 'pointer', fontWeight: 600,
                }}>Пройти ещё раз</button>
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
  {
    initials: 'АК', name: 'Анна К.', city: 'Лиссабон, Португалия', rating: 5,
    text: 'Переехали с мужем и двумя детьми — казалось, это невозможно организовать. Команда MARSHRUT сделала пошаговый план на 3 месяца: документы, школы, аренда, NHR-статус. Всё случилось именно так, как обещали.',
    tag: 'Семейный переезд',
    grad: 'linear-gradient(135deg, #2D6A8A, #1B3A5C)',
  },
  {
    initials: 'МР', name: 'Михаил Р.', city: 'Дубай, ОАЭ', rating: 5,
    text: 'Открыл IT-компанию во Freezone за 3 недели. Золотую визу получил ещё через месяц. Ребята чётко объяснили разницу между Freezone и Mainland, помогли выбрать emirate. Всё легально и прозрачно.',
    tag: 'Бизнес-релокация',
    grad: 'linear-gradient(135deg, #C9A84C, #a8893e)',
  },
  {
    initials: 'ЕВ', name: 'Екатерина В.', city: 'Берлин, Германия', rating: 5,
    text: 'Первая шенгенская виза в немецкое посольство — думала, что откажут. Проверили каждый документ, объяснили как отвечать на вопросы, помогли с письмом. Одобрили с первого раза на 6 месяцев.',
    tag: 'Шенген под ключ',
    grad: 'linear-gradient(135deg, #2D6A8A, #3d8aa8)',
  },
  {
    initials: 'ДЮ', name: 'Дмитрий и Юля', city: 'Будва, Черногория', rating: 5,
    text: 'Поехали с тремя детьми "попробовать". Благодаря маршруту от MARSHRUT оформили ВНЖ, нашли школу и обустроились за месяц. Очень ценим, что всегда отвечали на наши вопросы — даже в выходные.',
    tag: 'Семейный переезд',
    grad: 'linear-gradient(135deg, #1B3A5C, #2D6A8A)',
  },
]

function Testimonials() {
  const [idx, setIdx] = useState(0)
  const timerRef = useRef(null)
  const next = useCallback(() => setIdx(i => (i + 1) % REVIEWS.length), [])
  const prev = useCallback(() => setIdx(i => (i - 1 + REVIEWS.length) % REVIEWS.length), [])

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(next, 5500)
  }, [next])

  useEffect(() => { startTimer(); return () => clearInterval(timerRef.current) }, [startTimer])

  const t = REVIEWS[idx]

  return (
    <section style={{ background: C.slateBlue, padding: '96px 24px' }}>
      <div style={{ maxWidth: 840, margin: '0 auto' }}>
        <AnimSection>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span style={{ color: C.softGold, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Истории</span>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(28px,4vw,42px)', color: '#fff', margin: '12px 0 0', fontWeight: 700 }}>
              Истории наших клиентов
            </h2>
          </div>
        </AnimSection>

        <div
          onMouseEnter={() => clearInterval(timerRef.current)}
          onMouseLeave={startTimer}
          style={{ background: C.creamWhite, borderRadius: 20, padding: '44px 48px', boxShadow: '0 24px 72px rgba(0,0,0,0.18)', transition: 'all 0.3s' }}
        >
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%', background: t.grad, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Georgia,serif', fontSize: 20, fontWeight: 700, color: '#fff',
            }}>{t.initials}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: C.textPrimary }}>{t.name}</div>
                  <div style={{ color: C.textMuted, fontSize: 13, marginTop: 2 }}>{t.city}</div>
                </div>
                <span style={{ background: 'rgba(45,106,138,0.1)', color: C.mutedTeal, padding: '5px 12px', borderRadius: 100, fontSize: 12, fontWeight: 600 }}>{t.tag}</span>
              </div>
              <div style={{ display: 'flex', gap: 3, margin: '14px 0 16px' }}>
                {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill={C.softGold} color={C.softGold} />)}
              </div>
              <p style={{ color: C.textMuted, fontSize: 16, lineHeight: 1.75, margin: 0, fontStyle: 'italic' }}>«{t.text}»</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, marginTop: 32 }}>
          <button onClick={() => { prev(); startTimer() }} style={{
            width: 44, height: 44, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.25)',
            background: 'transparent', color: '#fff', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = C.softGold}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'}
          ><ChevronLeft size={18} /></button>
          <div style={{ display: 'flex', gap: 8 }}>
            {REVIEWS.map((_, i) => (
              <button key={i} onClick={() => { setIdx(i); startTimer() }} style={{
                width: i === idx ? 24 : 8, height: 8, borderRadius: 100,
                background: i === idx ? C.softGold : 'rgba(255,255,255,0.3)',
                border: 'none', cursor: 'pointer', transition: 'all 0.3s', padding: 0,
              }} />
            ))}
          </div>
          <button onClick={() => { next(); startTimer() }} style={{
            width: 44, height: 44, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.25)',
            background: 'transparent', color: '#fff', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = C.softGold}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'}
          ><ChevronRight size={18} /></button>
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ───────────────────────────────────────────────────────────────────────
const FAQ_DATA = [
  { q: 'Вы гарантируете получение визы?', a: 'Нет. Ни одна добросовестная компания не может этого гарантировать — решение принимает посольство или иммиграционный орган страны. Мы гарантируем профессиональную подготовку документов, полное сопровождение и максимально сильную заявку. Статистически это существенно повышает шансы.' },
  { q: 'Что значит «информационное сопровождение»?', a: 'Мы — консультационная компания: разбираем законодательство, собираем актуальные требования посольств, проверяем и структурируем документы, помогаем с подготовкой к собеседованию. Мы не являемся лицензированными адвокатами и не подаём документы от вашего имени.' },
  { q: 'Как принимаете оплату из России и из-за рубежа?', a: 'Принимаем USDT/USDC (крипто), переводы через Wise, Swift из-за рубежа, а также в некоторых случаях — переводы внутри России. Уточните актуальные способы у менеджера.' },
  { q: 'Работаете ли вы с гражданами Беларуси, Украины, Казахстана?', a: 'Да, мы работаем со всеми русскоязычными клиентами вне зависимости от гражданства. Учитываем специфику каждого паспорта при подборе стратегии.' },
  { q: 'Что происходит, если в визе отказали?', a: 'Разбираем причину отказа, корректируем стратегию и документы, помогаем с повторной подачей. Если отказ был до начала работы с нами — это не проблема, мы работаем и с такими случаями.' },
  { q: 'Как долго длится работа по пакету?', a: 'Зависит от услуги: консультация — 1 день, туристический шенген — 7–14 дней, семейный переезд — 30–60 дней. Точные сроки указаны в описании каждого продукта.' },
  { q: 'Можно ли начать, если у меня уже есть отказы по визе?', a: 'Да. Предыдущие отказы нужно учитывать, но они не блокируют новую подачу. Мы разберём историю, поймём причину и составим стратегию с учётом вашей ситуации.' },
  { q: 'Как проходит консультация?', a: 'Онлайн — в Zoom или Telegram-видеозвонке. Длится 60 минут. После консультации вы получаете итоговое письмо с планом действий и рекомендованными следующими шагами.' },
]

function FAQ() {
  const [faqOpen, setFaqOpen] = useState(null)
  return (
    <section style={{ background: C.warmSand, padding: '96px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <AnimSection>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span style={{ color: C.mutedTeal, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>FAQ</span>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(28px,4vw,42px)', color: C.textPrimary, margin: '12px 0 0', fontWeight: 700 }}>
              Ответы на частые вопросы
            </h2>
          </div>
        </AnimSection>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {FAQ_DATA.map((item, i) => (
            <AnimSection key={i} delay={i * 0.04}>
              <div style={{
                background: C.creamWhite, borderRadius: 14, overflow: 'hidden',
                border: `1px solid ${faqOpen === i ? C.mutedTeal : 'rgba(45,106,138,0.12)'}`,
                transition: 'border-color 0.2s',
              }}>
                <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} style={{
                  width: '100%', padding: '20px 24px', background: 'none', border: 'none',
                  cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, textAlign: 'left',
                }}>
                  <span style={{ fontWeight: 600, fontSize: 16, color: C.textPrimary }}>{item.q}</span>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: faqOpen === i ? C.mutedTeal : 'rgba(45,106,138,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    transition: 'background 0.2s, transform 0.3s',
                    transform: faqOpen === i ? 'rotate(180deg)' : 'none',
                  }}>
                    <ChevronDown size={16} color={faqOpen === i ? '#fff' : C.mutedTeal} />
                  </div>
                </button>
                {faqOpen === i && (
                  <div style={{ padding: '0 24px 22px' }}>
                    <p style={{ color: C.textMuted, fontSize: 15, lineHeight: 1.7, margin: 0 }}>{item.a}</p>
                  </div>
                )}
              </div>
            </AnimSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FINAL CTA ─────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section id="contact" style={{ background: C.slateBlue, padding: '100px 24px' }}>
      <div style={{ maxWidth: 660, margin: '0 auto', textAlign: 'center' }}>
        <AnimSection>
          <span style={{ color: C.softGold, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Первый шаг</span>
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(30px,4vw,48px)', color: '#fff', margin: '16px 0 20px', fontWeight: 700 }}>
            Готовы сделать первый шаг?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 18, lineHeight: 1.65, marginBottom: 44 }}>
            Пройдите бесплатную диагностику — это займёт 5 минут. Мы изучим ситуацию и предложим конкретный маршрут.
          </p>
          <a href="#quiz" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: C.softGold, color: C.deepNavy, padding: '18px 48px',
            borderRadius: 12, fontWeight: 700, fontSize: 18, textDecoration: 'none',
            boxShadow: '0 8px 36px rgba(201,168,76,0.4)',
          }}>
            Начать диагностику <ArrowUpRight size={20} />
          </a>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, marginTop: 24 }}>
            Или напишите нам напрямую:{' '}
            <a href="https://t.me/marshrut_team" target="_blank" rel="noopener noreferrer"
              style={{ color: C.softGold, fontWeight: 600, textDecoration: 'none' }}>@marshrut_team</a>
          </p>
          <div style={{
            marginTop: 36, display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'rgba(255,255,255,0.08)', borderRadius: 100, padding: '10px 22px',
          }}>
            <Clock size={15} color={C.softGold} />
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: 500 }}>
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
  const SERVICES = ['Консультация 60 мин', 'Шенген под ключ', 'Персональная стратегия', 'Семейный переезд', 'Дубай под ключ', 'Клуб MARSHRUT']
  const DIRS = ['ОАЭ (Дубай)', 'Германия', 'Португалия', 'Сербия', 'Черногория', 'Таиланд', 'Франция', 'Чехия']
  const COMPANY = ['О нас', 'Блог', 'Отзывы', 'Партнёрам', 'Контакты']

  return (
    <footer style={{ background: C.deepNavy, padding: '72px 24px 40px', borderTop: '1px solid rgba(201,168,76,0.14)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 48, marginBottom: 56 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 9,
                background: `linear-gradient(135deg, ${C.softGold}, #a8893e)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Compass size={20} color="#0D1B2A" strokeWidth={2.5} />
              </div>
              <span style={{ fontFamily: 'Georgia,serif', fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '0.1em' }}>MARSHRUT</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.48)', fontSize: 14, lineHeight: 1.65, marginBottom: 24 }}>Ваш маршрут в новую жизнь</p>
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { icon: Send, href: 'https://t.me/marshrut_team', label: 'Telegram' },
                { icon: PlayCircle, href: '#', label: 'YouTube' },
                { icon: Camera, href: '#', label: 'Instagram' },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} style={{
                  width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.07)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'background 0.2s, color 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = C.softGold; e.currentTarget.style.color = C.deepNavy }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)' }}
                ><Icon size={18} /></a>
              ))}
            </div>
          </div>

          {[{ title: 'Услуги', items: SERVICES, href: '#pricing' }, { title: 'Направления', items: DIRS, href: '#directions' }, { title: 'Компания', items: COMPANY, href: '#' }].map(col => (
            <div key={col.title}>
              <h4 style={{ color: '#fff', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 18px' }}>{col.title}</h4>
              {col.items.map(item => (
                <a key={item} href={col.href} style={{ display: 'block', color: 'rgba(255,255,255,0.45)', fontSize: 14, textDecoration: 'none', marginBottom: 10, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.9)'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.45)'}
                >{item}</a>
              ))}
            </div>
          ))}
        </div>

        <div style={{ padding: '22px 24px', borderRadius: 12, background: 'rgba(255,255,255,0.04)', marginBottom: 28, border: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: 13, lineHeight: 1.65, margin: 0, textAlign: 'center' }}>
            MARSHRUT — информационно-консультационная компания. Не является лицензированным иммиграционным адвокатом. Мы предоставляем экспертизу и сопровождение, но не гарантируем результат.
          </p>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 22, textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: 13, margin: 0 }}>© 2025 MARSHRUT. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}

// ─── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div>
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
