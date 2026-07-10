import { useState } from 'react'
import AnimSection from '../components/AnimSection'
import SectionHead from '../components/SectionHead'
import GlowBtn from '../components/GlowBtn'
import { useApp } from '../context'
import { t } from '../i18n'
import { Send, MessageCircle, ChevronDown } from 'lucide-react'

export default function Contact() {
  const { lang } = useApp()
  const tr = t[lang]
  const qtr = tr.quiz
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const questions = [qtr.q1, qtr.q2, qtr.q3]
  const done = step >= questions.length

  const pick = (opt) => {
    setAnswers(a => [...a, opt])
    setStep(s => s + 1)
  }

  return (
    <div style={{ paddingTop: 80 }}>
      <section style={{ padding: '80px 24px', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(var(--gold-rgb),.07) 0%, transparent 70%)', pointerEvents: 'none' }}/>
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          <SectionHead label={tr.contact.label} h2a={tr.contact.h2a} h2b={tr.contact.h2b} sub={tr.contact.sub} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, marginTop: 64 }}>
            {/* Direct contact */}
            <AnimSection>
              <div>
                <h3 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text)', marginBottom: 24 }}>
                  {lang === 'ru' ? 'Написать напрямую' : 'Contact Directly'}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <a href="https://t.me/domira_gl" target="_blank" rel="noreferrer" style={{
                    display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none',
                    background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '18px 20px',
                    transition: 'all .2s', color: 'var(--text)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.transform = 'translateX(4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none' }}
                  >
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(0,136,204,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Send size={20} style={{ color: '#0088cc' }}/>
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Telegram</div>
                      <div style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>@domira_gl</div>
                    </div>
                  </a>
                  <a href="https://wa.me/79000000000" target="_blank" rel="noreferrer" style={{
                    display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none',
                    background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '18px 20px',
                    transition: 'all .2s', color: 'var(--text)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.transform = 'translateX(4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none' }}
                  >
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(37,211,102,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <MessageCircle size={20} style={{ color: '#25d366' }}/>
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>WhatsApp</div>
                      <div style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>+7 900 000-00-00</div>
                    </div>
                  </a>
                </div>

                {/* Working hours */}
                <div style={{ marginTop: 28, background: 'rgba(var(--gold-rgb),.06)', border: '1px solid var(--border)', borderRadius: 14, padding: '18px 20px' }}>
                  <div style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>
                    {lang === 'ru' ? 'Время работы' : 'Working Hours'}
                  </div>
                  <div style={{ color: 'var(--text2)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                    {lang === 'ru' ? 'Пн–Пт: 10:00–20:00 МСК\nСб–Вс: по договорённости' : 'Mon–Fri: 10:00–20:00 MSK\nSat–Sun: by arrangement'}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4CAF50', display: 'inline-block' }} className="pulse-dot"/>
                    <span style={{ color: '#4CAF50', fontSize: '0.8rem', fontWeight: 600 }}>
                      {lang === 'ru' ? 'Онлайн сейчас' : 'Online now'}
                    </span>
                  </div>
                </div>
              </div>
            </AnimSection>

            {/* Quiz */}
            <AnimSection delay={0.15}>
              <div>
                <h3 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text)', marginBottom: 24 }}>
                  {lang === 'ru' ? 'Быстрая диагностика' : 'Quick Diagnostic'}
                </h3>
                <div style={{
                  background: 'var(--surface)', borderRadius: 20, padding: '32px 28px',
                  border: '1px solid var(--border)', boxShadow: '0 8px 40px rgba(var(--gold-rgb),.08)',
                }}>
                  {!done && (
                    <div style={{ marginBottom: 24 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>{step + 1} / {questions.length}</span>
                      </div>
                      <div style={{ height: 3, background: 'var(--border2)', borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${(step / questions.length) * 100}%`, background: 'linear-gradient(90deg, var(--gold), var(--gold2))', borderRadius: 4, transition: 'width .4s', boxShadow: '0 0 8px rgba(var(--gold-rgb),.5)' }}/>
                      </div>
                    </div>
                  )}

                  {!done ? (
                    <>
                      <h4 style={{ fontWeight: 700, color: 'var(--text)', fontSize: '1rem', marginBottom: 18 }}>{questions[step].q}</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {questions[step].opts.map((opt, i) => (
                          <button key={i} onClick={() => pick(opt)} style={{
                            background: 'transparent', border: '1px solid var(--border2)', borderRadius: 10,
                            padding: '12px 16px', textAlign: 'left', color: 'var(--text)',
                            fontSize: '0.88rem', cursor: 'pointer', transition: 'all .2s',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.background = 'rgba(var(--gold-rgb),.06)' }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.background = 'transparent' }}
                          >{opt}</button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '2.5rem', marginBottom: 14 }}>✅</div>
                      <p style={{ color: 'var(--text)', fontWeight: 600, marginBottom: 16 }}>{qtr.result}</p>
                      <GlowBtn href="https://t.me/domira_gl">{qtr.cta}</GlowBtn>
                      <button onClick={() => { setStep(0); setAnswers([]) }} style={{ display: 'block', margin: '12px auto 0', background: 'none', border: 'none', color: 'var(--muted)', fontSize: '0.82rem', cursor: 'pointer', textDecoration: 'underline' }}>
                        {lang === 'ru' ? 'Начать заново' : 'Start over'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>
    </div>
  )
}
