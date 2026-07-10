import Logo from './Logo'
import { useApp } from '../context'
import { t } from '../i18n'
import { Send, MessageCircle } from 'lucide-react'

export default function Footer() {
  const { lang } = useApp()
  const tr = t[lang].footer
  return (
    <footer style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border2)', paddingTop: 64, paddingBottom: 40 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 48 }}>
          <div>
            <Logo size="sm"/>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: 16, lineHeight: 1.6, maxWidth: 240 }}>{tr.tagline}</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              {[
                { icon: <Send size={16}/>, href: 'https://t.me/domira_gl', label: 'Telegram' },
                { icon: <MessageCircle size={16}/>, href: 'https://wa.me/79000000000', label: 'WhatsApp' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(var(--gold-rgb),.1)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', textDecoration: 'none', transition: 'all .2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(var(--gold-rgb),.2)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(var(--gold-rgb),.1)'; e.currentTarget.style.transform = 'none' }}
                >{s.icon}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>{tr.col1}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {tr.l1.map(item => (<li key={item}><a href="/#services" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color .2s' }} onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'var(--muted)'}>{item}</a></li>))}
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>{tr.col2}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[{ label: tr.l2[0], href: '#/about' }, { label: tr.l2[1], href: '/#process' }, { label: tr.l2[2], href: '/#testimonials' }, { label: tr.l2[3], href: '/#faq' }].map(item => (<li key={item.label}><a href={item.href} style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color .2s' }} onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'var(--muted)'}>{item.label}</a></li>))}
            </ul>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--border2)', paddingTop: 24, display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <p style={{ color: 'var(--muted)', fontSize: '0.8rem', margin: 0 }}>{tr.copy}</p>
          <p style={{ color: 'var(--muted)', fontSize: '0.75rem', margin: 0, maxWidth: 400, opacity: 0.7 }}>{tr.disclaimer}</p>
        </div>
      </div>
    </footer>
  )
}
