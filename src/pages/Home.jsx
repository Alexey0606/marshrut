import { useState, useEffect } from 'react'
import { ChevronDown, ChevronRight, ChevronLeft, Check, Star, ArrowUpRight } from 'lucide-react'
import AnimSection from '../components/AnimSection'
import SectionHead from '../components/SectionHead'
import GlowBtn from '../components/GlowBtn'
import { useApp } from '../context'
import { t } from '../i18n'

/* ── Hero orbs (bg decoration) ──────────────────────────────────────────────── */
function Orbs() {
  const { theme } = useApp()
  const d = theme === 'dark'
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <div className="float-anim" style={{ position: 'absolute', top: '10%', left: '5%', width: 420, height: 420, borderRadius: '50%', background: d ? 'radial-gradient(circle, rgba(45,106,138,.22) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(184,146,42,.1) 0%, transparent 70%)' }} />
      <div className="float-anim-2" style={{ position: 'absolute', top: '20%', right: '8%', width: 320, height: 320, borderRadius: '50%', background: d ? 'radial-gradient(circle, rgba(201,168,76,.12) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(45,106,138,.08) 0%, transparent 70%)' }} />
      <div className="float-anim-3" style={{ position: 'absolute', bottom: '15%', left: '40%', width: 250, height: 250, borderRadius: '50%', background: d ? 'radial-gradient(circle, rgba(27,58,92,.3) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(184,146,42,.07) 0%, transparent 70%)' }} />
    </div>
  )
}

/* ── SVG map decoration ────────────────────────────────────────────────── */
function HeroMap() {
  return (
    <div className="float-anim-2" style={{ position: 'absolute', right: '3%', top: '50%', transform: 'translateY(-50%)', opacity: 0.18, pointerEvents: 'none', width: 480 }}>
      <svg viewBox="0 0 500 340" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className="draw-line" d="M 60 220 Q 100 160 160 140 Q 220 120 280 90 Q 330 70 390 100 Q 440 130 460 160"
          stroke="var(--gold)" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {[[60,220],[160,140],[280,90],[390,100],[460,160]].map(([cx,cy],i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="8" fill="var(--gold)" opacity="0.25" className="pulse-dot"/>
            <circle cx={cx} cy={cy} r="4" fill="var(--gold)" opacity="0.7"/>
          </g>
        ))}
        <text x="65" y="240" fill="var(--gold)" fontSize="11" opacity="0.7">🇷🇺</text>
        <text x="285" y="110" fill="var(--gold)" fontSize="11" opacity="0.7">🇦🇪</text>
        <text x="460" y="180" fill="var(--gold)" fontSize="11" opacity="0.7">🇪🇺</text>
      </svg>
    </div>
  )
}

/* ── Hero ──────────────────────────────────────────────────────────────────── */
function Hero({ tr }) {
  const { theme } = useApp()
  const d = theme === 'dark'

  return (
    <section id="home" style={{
      position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center',
      background: d
        ? 'radial-gradient(ellipse 80% 50% at 20% -10%, rgba(45,106,138,.3) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 10%, rgba(201,168,76,.1) 0%, transparent 50%), var(--bg)'
        : 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(184,146,42,.12) 0%, transparent 65%), var(--bg)',
      overflow: 'hidden',
    }}>
      <Orbs />
      <HeroMap />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '120px 24px 80px', position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{ maxWidth: 680 }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28,
            background: 'rgba(var(--gold-rgb),.1)', border: '1px solid var(--border)',
            borderRadius: 999, padding: '7px 18px',
          }}>
            <span className="pulse-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: '#4CAF50', display: 'inline-block' }}/>
            <span style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em' }}>{tr.badge}</span>
          </div>

          <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem,6vw,4.5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: 24, color: 'var(--text)' }}>
            {tr.h1a}<br/>
            <span className="shimmer-gold">{tr.h1b}</span>
          </h1>

          <p style={{ fontSize: '1.15rem', color: 'var(--text2)', lineHeight: 1.75, maxWidth: 540, marginBottom: 40 }}>
            {tr.sub}
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 56 }}>
            <GlowBtn href="/#quiz" size="lg">{tr.cta1} <ArrowUpRight size={18}/></GlowBtn>
            <GlowBtn href="/#services" size="lg" outline>{tr.cta2}</GlowBtn>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            {[
              { v: tr.s1v, l: tr.s1l },
              { v: tr.s2v, l: tr.s2l },
              { v: tr.s3v, l: tr.s3l },
            ].map(s => (
              <div key={s.l}>
                <div className="font-display shimmer-gold" style={{ fontSize: '2.2rem', fontWeight: 900, lineHeight: 1 }}>{s.v}</div>
                <div style={{ color: 'var(--muted)', fontSize: '0.85rem', marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: 0.5 }}>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, transparent, var(--gold))' }}/>
        <ChevronDown size={16} color="var(--gold)"/>
      </div>
    </section>
  )
}

/* ── Ticker ──────────────────────────────────────────────────────────────────────── */
function Ticker({ items }) {
  const all = [...items, ...items]
  return (
    <div style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border2)', borderBottom: '1px solid var(--border2)', padding: '14px 0', overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to right, var(--bg2), transparent)', zIndex: 1 }}/>
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to left, var(--bg2), transparent)', zIndex: 1 }}/>
      <div className="ticker-track" style={{ gap: 0 }}>
        {all.map((item, i) => (
          <span key={i} style={{ color: 'var(--text2)', fontSize: '0.85rem', fontWeight: 500, padding: '0 28px' }}>
            {item} <span style={{ color: 'var(--gold)', marginLeft: 20 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── Audience ─────────────────────────────────────────────────────────────────────── */
function AudienceCards({ tr }) {
  const colors = ['#2D6A8A','#7A4CAF','#2D8A6A']
  return (
    <section id="audience" style={{ padding: '100px 24px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionHead label={tr.label} h2a={tr.h2a} h2b={tr.h2b} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginTop: 56 }}>
          {tr.cards.map((c, i) => (
            <AnimSection key={i} delay={i * 0.12}>
              <div className="glass" style={{
                borderRadius: 20, padding: '32px 28px',
                borderTop: `3px solid ${colors[i]}`,
                boxShadow: 'var(--card-shadow)',
                transition: 'transform .3s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}
              >
                <div style={{ fontSize: '2.4rem', marginBottom: 16 }}>{c.icon}</div>
                <div style={{ display: 'inline-block', background: `rgba(${colors[i].slice(1).match(/../g).map(x=>parseInt(x,16)).join(',')},0.15)`, borderRadius: 999, padding: '4px 12px', fontSize: '0.72rem', fontWeight: 700, color: colors[i], marginBottom: 14, letterSpacing: '0.06em' }}>{c.tag}</div>
                <h3 className="font-display" style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: 12, color: 'var(--text)' }}>{c.title}</h3>
                <p style={{ color: 'var(--muted)', lineHeight: 1.7, fontSize: '0.92rem' }}>{c.desc}</p>
              </div>
            </AnimSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Services ─────────────────────────────────────────────────────────────────────── */
function Services({ tr }) {
  return (
    <section id="services" style={{ padding: '100px 24px', background: 'var(--bg2)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionHead label={tr.label} h2a={tr.h2a} h2b={tr.h2b} sub={tr.sub} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28, marginTop: 60 }}>
          {tr.cats.map((cat, ci) => (
            <AnimSection key={ci} delay={ci * 0.1}>
              <div style={{
                background: cat.featured ? 'linear-gradient(135deg, rgba(var(--gold-rgb),.08) 0%, rgba(var(--gold-rgb),.02) 100%)' : 'var(--surface)',
                border: cat.featured ? '1.5px solid var(--border)' : '1px solid var(--border2)',
                borderRadius: 20, padding: '32px 28px',
                boxShadow: cat.featured ? '0 8px 40px rgba(var(--gold-rgb),.12)' : 'var(--card-shadow)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                  <span style={{ fontSize: '1.8rem' }}>{cat.icon}</span>
                  <h3 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 700, color: cat.featured ? 'var(--gold)' : 'var(--text)' }}>{cat.name}</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {cat.items.map((item, ii) => (
                    <div key={ii} style={{
                      borderBottom: '1px solid var(--border2)', paddingBottom: 14,
                      display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start',
                    }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)', marginBottom: 3 }}>{item.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{item.desc}</div>
                      </div>
                      <div style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.85rem', whiteSpace: 'nowrap', flexShrink: 0 }}>{item.price}</div>
                    </div>
                  ))}
                </div>
                {cat.featured && (
                  <div style={{ marginTop: 24 }}>
                    <GlowBtn href="/#quiz" size="sm" className="w-full" style={{ width: '100%', justifyContent: 'center' }}>
                      {tr.label === 'Services' ? 'Book Consultation' : 'Записаться'}
                    </GlowBtn>
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

/* ── Why ──────────────────────────────────────────────────────────────────────────── */
function Why({ tr }) {
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionHead label={tr.label} h2a={tr.h2a} h2b={tr.h2b} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, marginTop: 56 }}>
          {tr.items.map((item, i) => (
            <AnimSection key={i} delay={i * 0.1}>
              <div className="glass-gold" style={{ borderRadius: 16, padding: '28px 24px', border: '1px solid var(--border)', transition: 'transform .3s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                <div style={{ fontSize: '2rem', marginBottom: 14 }}>{item.icon}</div>
                <h3 style={{ fontWeight: 700, color: 'var(--text)', marginBottom: 8, fontSize: '1rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            </AnimSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Process ──────────────────────────────────────────────────────────────────────── */
function Process({ tr }) {
  const colors = ['var(--gold)','#2D8A6A','#2D6A8A','#7A4CAF']
  return (
    <section id="process" style={{ padding: '100px 24px', background: 'var(--bg2)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionHead label={tr.label} h2a={tr.h2a} h2b={tr.h2b} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 28, marginTop: 60, position: 'relative' }}>
          {tr.steps.map((s, i) => (
            <AnimSection key={i} delay={i * 0.12}>
              <div style={{ position: 'relative', padding: '28px 24px', background: 'var(--surface)', borderRadius: 18, border: `1px solid var(--border2)`, boxShadow: 'var(--card-shadow)' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: "'Playfair Display', serif", color: colors[i], opacity: 0.25, position: 'absolute', top: 16, right: 20, lineHeight: 1 }}>{s.n}</div>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: `rgba(var(--gold-rgb),.1)`, border: `1.5px solid ${colors[i]}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, color: colors[i], fontWeight: 800, fontSize: '1rem', fontFamily: "'Playfair Display', serif" }}>{i + 1}</div>
                <h3 style={{ fontWeight: 700, color: 'var(--text)', fontSize: '1.05rem', marginBottom: 8 }}>{s.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            </AnimSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Directions ────────────────────────────────────────────────────────────────────── */
function Directions({ tr }) {
  const colors = ['#C9A84C','#2D6A8A','#2D8A6A','#8A6A2D','#6A2D8A','#2D8A8A']
  return (
    <section id="directions" style={{ padding: '100px 24px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionHead label={tr.label} h2a={tr.h2a} h2b={tr.h2b} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20, marginTop: 56 }}>
          {tr.list.map((d, i) => (
            <AnimSection key={i} delay={i * 0.08}>
              <div style={{
                background: 'var(--surface)', borderRadius: 16, padding: '24px 20px',
                border: '1px solid var(--border2)', borderLeft: `4px solid ${colors[i]}`,
                transition: 'transform .3s, box-shadow .3s', cursor: 'default',
                boxShadow: 'var(--card-shadow)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 40px rgba(var(--gold-rgb),.12)` }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--card-shadow)' }}
              >
                <div style={{ fontSize: '2rem', marginBottom: 10 }}>{d.flag}</div>
                <h3 style={{ fontWeight: 700, color: 'var(--text)', fontSize: '1.05rem', marginBottom: 6 }}>{d.name}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.82rem', lineHeight: 1.55, marginBottom: 12 }}>{d.desc}</p>
                <span style={{ background: `rgba(${colors[i].slice(1).match(/../g)?.map(x=>parseInt(x,16)).join(',')||'201,168,76'},0.12)`, color: colors[i], borderRadius: 999, padding: '4px 10px', fontSize: '0.72rem', fontWeight: 700 }}>{d.visa}</span>
              </div>
            </AnimSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Quiz ────────────────────────────────────────────────────────────────────────────── */
function Quiz({ tr }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const questions = [tr.q1, tr.q2, tr.q3]
  const done = step >= questions.length

  const pick = (opt) => {
    const next = [...answers, opt]
    setAnswers(next)
    setStep(s => s + 1)
  }

  return (
    <section id="quiz" style={{ padding: '100px 24px', background: 'var(--bg2)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionHead label={tr.label} h2a={tr.h2a} h2b={tr.h2b} sub={tr.sub} />

        <AnimSection delay={0.2}>
          <div style={{
            maxWidth: 640, margin: '48px auto 0',
            background: 'var(--surface)', borderRadius: 24, padding: '40px 36px',
            border: '1px solid var(--border)', boxShadow: '0 16px 60px rgba(var(--gold-rgb),.1)',
          }}>
            {/* Progress bar */}
            {!done && (
              <div style={{ marginBottom: 32 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{step + 1} / {questions.length}</span>
                </div>
                <div style={{ height: 4, background: 'var(--border2)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${((step) / questions.length) * 100}%`, background: 'linear-gradient(90deg, var(--gold), var(--gold2))', borderRadius: 4, transition: 'width .4s ease', boxShadow: '0 0 10px rgba(var(--gold-rgb),.5)' }}/>
                </div>
              </div>
            )}

            {!done ? (
              <>
                <h3 className="font-display" style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: 24 }}>{questions[step].q}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {questions[step].opts.map((opt, i) => (
                    <button key={i} onClick={() => pick(opt)} style={{
                      background: 'transparent', border: '1.5px solid var(--border2)',
                      borderRadius: 12, padding: '14px 20px', textAlign: 'left',
                      color: 'var(--text)', fontSize: '0.95rem', cursor: 'pointer',
                      transition: 'all .2s', display: 'flex', alignItems: 'center', gap: 12,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.background = 'rgba(var(--gold-rgb),.06)'; e.currentTarget.style.transform = 'translateX(4px)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'none' }}
                    >
                      <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(var(--gold-rgb),.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: 'var(--gold)', fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: 16 }}>✅</div>
                <h3 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>{tr.result}</h3>
                <p style={{ color: 'var(--muted)', marginBottom: 28, lineHeight: 1.65 }}>{tr.sub}</p>
                <GlowBtn href="https://t.me/domira_gl" size="lg">{tr.cta}</GlowBtn>
                <div style={{ marginTop: 16 }}>
                  <button onClick={() => { setStep(0); setAnswers([]) }} style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: '0.85rem', cursor: 'pointer', textDecoration: 'underline' }}>
                    {tr.prev}
                  </button>
                </div>
              </div>
            )}
          </div>
        </AnimSection>
      </div>
    </section>
  )
}

/* ── Testimonials ───────────────────────────────────────────────────────────────────── */
function Testimonials({ tr }) {
  const [idx, setIdx] = useState(0)
  const items = tr.items
  return (
    <section id="testimonials" style={{ padding: '100px 24px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionHead label={tr.label} h2a={tr.h2a} h2b={tr.h2b} />
        <AnimSection delay={0.2}>
          <div style={{ maxWidth: 720, margin: '48px auto 0' }}>
            <div style={{
              background: 'var(--surface)', borderRadius: 24, padding: '40px 36px',
              border: '1px solid var(--border)', boxShadow: 'var(--card-shadow)',
              position: 'relative',
            }}>
              <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
                {[...Array(items[idx].stars)].map((_,i) => <Star key={i} size={18} fill="var(--gold)" color="var(--gold)"/>)}
              </div>
              <p style={{ fontSize: '1.05rem', color: 'var(--text)', lineHeight: 1.75, marginBottom: 24, fontStyle: 'italic' }}>"{items[idx].text}"</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text)' }}>{items[idx].name}</div>
                  <div style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{items[idx].loc}</div>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button onClick={() => setIdx(i => (i - 1 + items.length) % items.length)} style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--bg2)', border: '1px solid var(--border2)', cursor: 'pointer', color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronLeft size={18}/></button>
                  <button onClick={() => setIdx(i => (i + 1) % items.length)} style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--bg2)', border: '1px solid var(--border2)', cursor: 'pointer', color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronRight size={18}/></button>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 20, justifyContent: 'center' }}>
                {items.map((_,i) => <button key={i} onClick={() => setIdx(i)} style={{ width: i === idx ? 24 : 8, height: 8, borderRadius: 99, background: i === idx ? 'var(--gold)' : 'var(--border)', border: 'none', cursor: 'pointer', transition: 'all .3s' }}/>)}
              </div>
            </div>
          </div>
        </AnimSection>
      </div>
    </section>
  )
}

/* ── FAQ ───────────────────────────────────────────────────────────────────────────────── */
function FAQ({ tr }) {
  const [open, setOpen] = useState(null)
  return (
    <section id="faq" style={{ padding: '100px 24px', background: 'var(--bg2)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <SectionHead label={tr.label} h2a={tr.h2a} h2b={tr.h2b} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 56 }}>
          {tr.items.map((item, i) => (
            <AnimSection key={i} delay={i * 0.06}>
              <div style={{
                background: 'var(--surface)', borderRadius: 16, overflow: 'hidden',
                border: open === i ? '1.5px solid var(--border)' : '1px solid var(--border2)',
                transition: 'border .2s',
              }}>
                <button onClick={() => setOpen(open === i ? null : i)} style={{
                  width: '100%', textAlign: 'left', padding: '20px 24px',
                  background: 'none', border: 'none', cursor: 'pointer',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
                  color: 'var(--text)', fontSize: '0.95rem', fontWeight: 600,
                }}>
                  {item.q}
                  <ChevronDown size={18} style={{ color: 'var(--gold)', flexShrink: 0, transform: open === i ? 'rotate(180deg)' : 'none', transition: 'transform .3s' }}/>
                </button>
                {open === i && (
                  <div style={{ padding: '0 24px 20px', color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>{item.a}</div>
                )}
              </div>
            </AnimSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Final CTA ───────────────────────────────────────────────────────────────────────── */
function FinalCTA({ tr }) {
  const { theme } = useApp()
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(var(--gold-rgb),.07) 0%, transparent 70%)', pointerEvents: 'none' }}/>
      <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <AnimSection>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24,
            background: 'rgba(var(--gold-rgb),.1)', border: '1px solid var(--border)', borderRadius: 999, padding: '7px 18px',
          }}>
            <span className="pulse-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: '#4CAF50', display: 'inline-block' }}/>
            <span style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600 }}>{tr.label}</span>
          </div>
          <h2 className="font-display" style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 900, lineHeight: 1.15, marginBottom: 18, color: 'var(--text)' }}>
            {tr.h2a} <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>{tr.h2b}</em>
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: 36 }}>{tr.sub}</p>
          <GlowBtn href="https://t.me/domira_gl" size="lg">{tr.btn}</GlowBtn>
          <p style={{ color: 'var(--muted)', fontSize: '0.82rem', marginTop: 16 }}>{tr.online}</p>
        </AnimSection>
      </div>
    </section>
  )
}

/* ── Page ──────────────────────────────────────────────────────────────────────────── */
export default function Home() {
  const { lang } = useApp()
  const tr = t[lang]
  return (
    <>
      <Hero tr={tr.hero} />
      <Ticker items={tr.ticker} />
      <AudienceCards tr={tr.audience} />
      <Services tr={tr.services} />
      <Why tr={tr.why} />
      <Process tr={tr.process} />
      <Directions tr={tr.directions} />
      <Quiz tr={tr.quiz} />
      <Testimonials tr={tr.testimonials} />
      <FAQ tr={tr.faq} />
      <FinalCTA tr={tr.cta} />
    </>
  )
}
