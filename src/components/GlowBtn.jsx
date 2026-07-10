export default function GlowBtn({ href, onClick, children, outline = false, size = 'md', className = '' }) {
  const pad = size === 'lg' ? 'px-8 py-4 text-base' : size === 'sm' ? 'px-5 py-2.5 text-sm' : 'px-7 py-3.5 text-sm'
  const base = `inline-flex items-center gap-2 font-semibold rounded-full transition-all duration-300 cursor-pointer select-none ${pad} ${className}`
  const style = outline
    ? { border: '1.5px solid var(--gold)', color: 'var(--gold)', background: 'transparent' }
    : { background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold2) 50%, var(--gold) 100%)', backgroundSize: '200% 200%', color: '#0D0900', fontWeight: 700, boxShadow: '0 4px 20px rgba(var(--gold-rgb),.4)' }
  const El = href ? 'a' : 'button'
  return (
    <El href={href} onClick={onClick} className={base} style={style}
      onMouseEnter={e => {
        if (outline) { e.currentTarget.style.background = 'rgba(var(--gold-rgb),.12)' }
        else { e.currentTarget.style.boxShadow = '0 6px 32px rgba(var(--gold-rgb),.6), 0 0 60px rgba(var(--gold-rgb),.2)'; e.currentTarget.style.transform = 'translateY(-1px)' }
      }}
      onMouseLeave={e => {
        if (outline) { e.currentTarget.style.background = 'transparent' }
        else { e.currentTarget.style.boxShadow = '0 4px 20px rgba(var(--gold-rgb),.4)'; e.currentTarget.style.transform = 'translateY(0)' }
      }}
    >{children}</El>
  )
}
