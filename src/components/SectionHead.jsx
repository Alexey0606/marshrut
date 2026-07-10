import AnimSection from './AnimSection'

export default function SectionHead({ label, h2a, h2b, sub, center = true }) {
  return (
    <AnimSection className={center ? 'text-center' : ''}>
      {label && (
        <div className="inline-flex items-center gap-2 mb-5" style={{
          background: 'rgba(var(--gold-rgb),.1)',
          border: '1px solid var(--border)',
          color: 'var(--gold)',
          borderRadius: 999,
          padding: '6px 18px',
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block' }}/>
          {label}
        </div>
      )}
      <h2 className="font-display mb-4" style={{ fontSize: 'clamp(1.9rem,4vw,3rem)', fontWeight: 700, lineHeight: 1.18, color: 'var(--text)' }}>
        {h2a} <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>{h2b}</em>
      </h2>
      {sub && <p style={{ color: 'var(--muted)', maxWidth: 560, margin: center ? '0 auto' : 0, lineHeight: 1.7 }}>{sub}</p>}
    </AnimSection>
  )
}
