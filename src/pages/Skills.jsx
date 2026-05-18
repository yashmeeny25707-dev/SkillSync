import { useState } from 'react';

const allSkills = [
  { name: 'React.js', category: 'Technical', type: 'Frontend', level: 'Expert', pct: 88, projects: 4, demand: 'High', verified: true, color: 'var(--teal)', icon: '⚛' },
  { name: 'Node.js', category: 'Technical', type: 'Backend', level: 'Intermediate', pct: 72, projects: 3, demand: 'High', verified: false, color: 'var(--blue)', icon: '◉' },
  { name: 'DSA', category: 'Technical', type: 'CS Fundamentals', level: 'Intermediate', pct: 65, problems: 180, demand: 'Critical', verified: false, color: 'var(--amber)', icon: '◈' },
  { name: 'SQL & Databases', category: 'Technical', type: 'Data', level: 'Expert', pct: 80, projects: 2, demand: 'High', verified: true, color: 'var(--teal)', icon: '▦' },
  { name: 'Communication', category: 'Soft Skills', type: 'Soft Skills', level: 'Intermediate', pct: 74, projects: 5, demand: 'Medium', verified: false, color: 'var(--blue)', icon: '◎' },
  { name: 'Python', category: 'Technical', type: 'Programming', level: 'Beginner', pct: 60, projects: 1, demand: 'High', verified: false, color: '#7c3aed', icon: '◭' },
  { name: 'System Design', category: 'Domain', type: 'Architecture', level: 'Beginner', pct: 50, projects: 0, demand: 'High', verified: false, color: 'var(--amber)', icon: '▤' },
  { name: 'Docker & DevOps', category: 'Technical', type: 'DevOps', level: 'Beginner', pct: 45, projects: 2, demand: 'High', verified: false, color: 'var(--blue)', icon: '◻' },
];

const filters = ['All Skills', 'Technical', 'Soft Skills', 'Domain', 'Verified Only'];
const levelColors = { Expert: 'var(--teal)', Intermediate: 'var(--amber)', Beginner: 'var(--blue)' };
const levelBg = { Expert: 'rgba(13,158,138,0.1)', Intermediate: 'rgba(239,159,39,0.12)', Beginner: 'rgba(55,138,221,0.12)' };

export default function Skills() {
  const [active, setActive] = useState('All Skills');
  const [showAdd, setShowAdd] = useState(false);

  const filtered = allSkills.filter(sk => {
    if (active === 'All Skills') return true;
    if (active === 'Verified Only') return sk.verified;
    return sk.category === active;
  });

  return (
    <div style={{ animation: 'fadeUp 0.4s ease' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontFamily: 'Syne', fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.75px', marginBottom: '4px' }}>Skill Tracker</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Track, verify, and grow every competency with evidence-backed profiles.</p>
        </div>
        <button onClick={() => setShowAdd(true)} style={{ padding: '10px 20px', borderRadius: '10px', background: 'var(--teal)', color: 'white', border: 'none', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', fontFamily: 'DM Sans', display: 'flex', alignItems: 'center', gap: '6px' }}>
          + Add Skill
        </button>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Total Skills', val: allSkills.length, color: 'var(--teal)' },
          { label: 'Verified', val: allSkills.filter(s => s.verified).length, color: 'var(--teal)' },
          { label: 'Expert Level', val: allSkills.filter(s => s.level === 'Expert').length, color: 'var(--amber)' },
          { label: 'Avg Proficiency', val: Math.round(allSkills.reduce((a, s) => a + s.pct, 0) / allSkills.length) + '%', color: 'var(--blue)' },
        ].map((c, i) => (
          <div key={i} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '12px', padding: '1rem 1.25rem', boxShadow: 'var(--shadow)', textAlign: 'center' }}>
            <div style={{ fontFamily: 'Syne', fontSize: '1.8rem', fontWeight: 800, color: c.color }}>{c.val}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '2px' }}>{c.label}</div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
        {filters.map(f => (
          <button key={f} onClick={() => setActive(f)} style={{
            padding: '7px 16px', borderRadius: '100px',
            border: `1.5px solid ${active === f ? 'var(--teal)' : 'var(--border)'}`,
            background: active === f ? 'var(--teal)' : 'white',
            color: active === f ? 'white' : 'var(--muted)',
            fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
            fontFamily: 'DM Sans', transition: 'all 0.2s',
          }}>{f}</button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1.25rem' }}>
        {filtered.map((sk, i) => (
          <div key={i} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem', boxShadow: 'var(--shadow)', transition: 'all 0.25s', cursor: 'default' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: '12px', background: `${sk.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', color: sk.color }}>{sk.icon}</div>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                {sk.verified && <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '3px 8px', borderRadius: '100px', background: 'rgba(13,158,138,0.08)', color: 'var(--teal)', border: '1px solid var(--border)' }}>✓ Verified</span>}
                <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '4px 10px', borderRadius: '100px', background: levelBg[sk.level], color: levelColors[sk.level] }}>{sk.level}</span>
              </div>
            </div>
            <div style={{ fontFamily: 'Syne', fontSize: '1rem', fontWeight: 700, marginBottom: '3px' }}>{sk.name}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginBottom: '1rem' }}>{sk.type}</div>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '6px' }}>
                <span style={{ color: 'var(--muted)' }}>Proficiency</span>
                <span style={{ fontWeight: 700 }}>{sk.pct}%</span>
              </div>
              <div style={{ height: '7px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${sk.pct}%`, background: `linear-gradient(90deg,${sk.color},${sk.color}cc)`, borderRadius: '4px' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {sk.projects !== undefined && <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>{sk.projects}</strong> projects</div>}
              {sk.problems !== undefined && <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>{sk.problems}</strong> problems</div>}
              <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}><strong style={{ color: sk.demand === 'Critical' ? 'var(--danger,#A32D2D)' : 'var(--text)' }}>{sk.demand}</strong> demand</div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Skill Modal */}
      {showAdd && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(13,43,39,0.4)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }} onClick={() => setShowAdd(false)}>
          <div style={{ background: 'white', borderRadius: '20px', padding: '2rem', maxWidth: '440px', width: '100%', boxShadow: 'var(--shadow-lg)' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontFamily: 'Syne', fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.5rem' }}>Add New Skill</h3>
            {[
              { label: 'Skill Name', placeholder: 'e.g. TypeScript, AWS, Leadership' },
              { label: 'Category', placeholder: 'Technical / Soft Skills / Domain' },
              { label: 'Proficiency (%)', placeholder: '0 – 100' },
            ].map((f, i) => (
              <div key={i} style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>{f.label}</label>
                <input placeholder={f.placeholder} style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1.5px solid var(--border)', background: 'var(--teal-lighter)', fontSize: '0.9rem', fontFamily: 'DM Sans', outline: 'none' }} />
              </div>
            ))}
            <div style={{ display: 'flex', gap: '10px', marginTop: '1.5rem' }}>
              <button onClick={() => setShowAdd(false)} style={{ flex: 1, padding: '11px', borderRadius: '10px', border: '1.5px solid var(--border)', background: 'white', color: 'var(--muted)', fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans' }}>Cancel</button>
              <button onClick={() => setShowAdd(false)} style={{ flex: 1, padding: '11px', borderRadius: '10px', border: 'none', background: 'var(--teal)', color: 'white', fontWeight: 700, cursor: 'pointer', fontFamily: 'DM Sans' }}>Add Skill</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}