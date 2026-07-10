import AnimSection from '../components/AnimSection'
import SectionHead from '../components/SectionHead'
import GlowBtn from '../components/GlowBtn'
import { useApp } from '../context'
import { t } from '../i18n'

export default function About() {
  const { lang } = useApp()
  const tr = t[lang].about

  return (
    <div style={{ paddingTop: 80 }}>
      {/* Hero */}
      <section style={{ padding: '80px 24px 80px', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(var(--gold-rgb),.08) 0%, transparent 70%)', pointerEvents: 'none' }}/>
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          <SectionHead label={tr.label} h2a={tr.h2a} h2b={tr.h2b} />
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ padding: '80px 24px', background: 'var(--bg2)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28 }}>
          {[
            { label: tr.mission, text: tr.missionText, icon: '🧭' },
            { label: tr.vision,  text: tr.visionText,  icon: '🌟' },
          ].map((item, i) => (
            <AnimSection key={i} delay={i * 0.15}>
              <div style={{
                background: 'var(--surface)', borderRadius: 20, padding: '36px 32px',
                border: '1px solid var(--border)', boxShadow: 'var(--card-shadow)',
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>{item.icon}</div>
                <div style={{ color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>{item.label}</div>
                <p className="font-display" style={{ fontSize: '1.15rem', color: 'var(--text)', lineHeight: 1.7, fontStyle: 'italic' }}>{item.text}</p>
              </div>
            </AnimSection>
          ))}
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHead label={tr.team} h2a={tr.team} h2b="" sub={tr.teamSub} />
          <AnimSection delay={0.2}>
            <div style={{
              maxWidth: 560, margin: '40px auto 0',
              background: 'var(--surface)', borderRadius: 24, padding: '40px 36px',
              border: '1px solid var(--border)', boxShadow: '0 8px 40px rgba(var(--gold-rgb),.1)',
              display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'flex-start',
            }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), var(--gold2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', flexShrink: 0 }}>
                🌍
              </div>
              <div style={{ flex: 1 }}>
                <h3 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Алексей Березин / Alexey Berezin</h3>
                <div style={{ color: 'var(--gold)', fontSize: '0.85rem', fontWeight: 600, marginBottom: 14 }}>{tr.alexTitle}</div>
                <p style={{ color: 'var(--muted)', lineHeight: 1.7, fontSize: '0.92rem' }}>{tr.alexDesc}</p>
                <div style={{ display: 'flex', gap: 8, marginTop: 18, flexWrap: 'wrap' }}>
                  {['25 стран / 25 countries','6 лет / 6 years','Synergy University Dubai','MSc Economics'].map(tag => (
                    <span key={tag} style={{ background: 'rgba(var(--gold-rgb),.1)', border: '1px solid var(--border)', color: 'var(--gold)', borderRadius: 999, padding: '4px 12px', fontSize: '0.75rem', fontWeight: 600 }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '80px 24px', background: 'var(--bg2)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHead label={tr.values} h2a={tr.values} h2b="" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginTop: 48 }}>
            {tr.vals.map((v, i) => (
              <AnimSection key={i} delay={i * 0.1}>
                <div className="glass-gold" style={{ borderRadius: 16, padding: '28px 24px', border: '1px solid var(--border)', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.2rem', marginBottom: 14 }}>{v.icon}</div>
                  <h3 style={{ fontWeight: 700, color: 'var(--text)', marginBottom: 8, fontSize: '1rem' }}>{v.name}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.65 }}>{v.desc}</p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px', background: 'var(--bg)', textAlign: 'center' }}>
        <AnimSection>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>
            {lang === 'ru' ? 'Готовы начать?' : 'Ready to start?'}
          </h2>
          <p style={{ color: 'var(--muted)', marginBottom: 28 }}>
            {lang === 'ru' ? 'Запишитесь на бесплатную диагностику' : 'Book a free consultation'}
          </p>
          <GlowBtn href="/#quiz" size="lg">
            {lang === 'ru' ? 'Бесплатная диагностика' : 'Free Consultation'}
          </GlowBtn>
        </AnimSection>
      </section>
    </div>
  )
}
