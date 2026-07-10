import { useState, useEffect } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import Logo from './Logo'
import GlowBtn from './GlowBtn'
import { useApp } from '../context'
import { t } from '../i18n'

export default function Navbar() {
  const { lang, theme, toggleTheme, toggleLang } = useApp()
  const tr = t[lang].nav
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { label: tr.home, href: '/#home' },
    { label: tr.services, href: '/#services' },
    { label: tr.about, href: '#/about' },
    { label: tr.contact, href: '#/contact' },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? 'var(--navbar-bg)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px) saturate(160%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(160%)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border2)' : 'none',
      transition: 'all .35s ease',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', height: 72, gap: 24 }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <Logo size="sm" />
        </a>
        <div className="hidden md:flex" style={{ gap: 32, marginLeft: 'auto' }}>
          {links.map(l => (
            <a key={l.href} href={l.href} style={{
              color: 'var(--text2)', textDecoration: 'none', fontSize: '0.9rem',
              fontWeight: 500, transition: 'color .2s',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--gold)'}
            onMouseLeave={e => e.target.style.color = 'var(--text2)'}
            >{l.label}</a>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 'auto' }}>
          <button onClick={toggleLang} style={{
            background: 'rgba(var(--gold-rgb),.1)', border: '1px solid var(--border)',
            color: 'var(--gold)', borderRadius: 999, padding: '5px 14px',
            fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.05em',
          }}>
            {lang === 'ru' ? 'EN' : 'RU'}
          </button>
          <button onClick={toggleTheme} style={{
            background: 'rgba(var(--gold-rgb),.1)', border: '1px solid var(--border)',
            color: 'var(--gold)', borderRadius: 999, padding: '7px', display: 'flex',
            cursor: 'pointer',
          }}>
            {theme === 'dark' ? <Sun size={15}/> : <Moon size={15}/>}
          </button>
          <div className="hidden md:block">
            <GlowBtn href="/#quiz" size="sm">{tr.cta}</GlowBtn>
          </div>
          <button className="md:hidden" onClick={() => setOpen(!open)} style={{
            background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer', padding: 4,
          }}>
            {open ? <X size={22}/> : <Menu size={22}/>}
          </button>
        </div>
      </div>
      {open && (
        <div style={{
          position: 'fixed', top: 72, left: 0, right: 0, bottom: 0,
          background: 'var(--navbar-bg)', backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)', padding: '32px 24px',
          display: 'flex', flexDirection: 'column', gap: 24,
        }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              color: 'var(--text)', textDecoration: 'none', fontSize: '1.2rem',
              fontWeight: 600, fontFamily: "'Playfair Display', serif",
              borderBottom: '1px solid var(--border2)', paddingBottom: 16,
            }}>{l.label}</a>
          ))}
          <GlowBtn href="/#quiz" size="lg" onClick={() => setOpen(false)}>{tr.cta}</GlowBtn>
        </div>
      )}
    </nav>
  )
}
