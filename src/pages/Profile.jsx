import { useState } from 'react';

export default function Profile() {
  const [editing, setEditing] = useState(false);
  const [info, setInfo] = useState({ name: 'Rahul Sharma', title: 'B.Tech Computer Science, Year 3', college: 'Delhi Technological University', cgpa: '8.4', email: 'rahul@dtu.ac.in', location: 'Delhi, India', github: 'github.com/rahulsharma', linkedin: 'linkedin.com/in/rahulsharma' });

  const readiness = [
    { label: 'Technical Skills', pct: 76, color: 'var(--teal)' },
    { label: 'Communication', pct: 74, color: 'var(--amber)' },
    { label: 'Projects', pct: 85, color: 'var(--teal)' },
    { label: 'Resume Quality', pct: 76, color: 'var(--amber)' },
    { label: 'Interview Score', pct: 82, color: 'var(--teal)' },
  ];

  const certs = [
    { name: 'AWS Cloud Practitioner', org: 'Amazon Web Services', year: '2024', icon: '☁' },
    { name: 'Meta React Developer', org: 'Coursera / Meta', year: '2024', icon: '⚛' },
    { name: 'DSA Problem Solving', org: 'HackerRank — Gold Level', year: '2023', icon: '◈' },
    { name: 'System Design Basics', org: 'Educative.io', year: '2024', icon: '▦' },
  ];

  const tags = ['React', 'Node.js', 'Full Stack', 'DSA', 'Python', 'SQL'];

  return (
    <div style={{ animation: 'fadeUp 0.4s ease' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'Syne', fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.75px', marginBottom: '4px' }}>Profile</h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Your verified academic and professional identity.</p>
      </div>

      {/* Profile header card */}
      <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', marginBottom: '1.5rem', boxShadow: 'var(--shadow)' }}>
        {/* Cover */}
        <div style={{ height: 140, background: 'linear-gradient(135deg,var(--teal) 0%,var(--teal-dark) 60%,#0f5e56 100%)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        </div>
        {/* Info */}
        <div style={{ padding: '0 2rem 2rem', display: 'flex', alignItems: 'flex-end', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ width: 90, height: 90, borderRadius: '50%', border: '4px solid white', background: 'linear-gradient(135deg,var(--teal),var(--teal-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne', fontSize: '1.8rem', fontWeight: 800, color: 'white', marginTop: '-45px', flexShrink: 0, boxShadow: '0 4px 16px rgba(13,158,138,0.3)' }}>RS</div>
          <div style={{ flex: 1, paddingTop: '0.75rem' }}>
            <h2 style={{ fontFamily: 'Syne', fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '4px' }}>{info.name}</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '10px' }}>{info.title} — {info.college}</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {tags.map((t, i) => (
                <span key={i} style={{ padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600, background: 'var(--teal-light)', color: 'var(--teal)', border: '1px solid var(--border)' }}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', paddingTop: '0.75rem' }}>
            <button onClick={() => setEditing(!editing)} style={{ padding: '9px 18px', borderRadius: '9px', border: '1.5px solid var(--border)', background: editing ? 'var(--teal)' : 'white', color: editing ? 'white' : 'var(--muted)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'DM Sans', transition: 'all 0.2s' }}>
              {editing ? '✓ Save' : '✏ Edit'}
            </button>
            <button style={{ padding: '9px 18px', borderRadius: '9px', border: 'none', background: 'var(--teal)', color: 'white', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'DM Sans' }}>↓ Resume</button>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
        {/* Left column */}
        <div>
          {/* Academic info */}
          <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem', boxShadow: 'var(--shadow)', marginBottom: '1rem' }}>
            <h4 style={{ fontFamily: 'Syne', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>Academic Info</h4>
            {[
              { icon: '📚', label: 'Branch', val: 'Computer Science' },
              { icon: '📅', label: 'Year', val: '3rd Year (2022–26)' },
              { icon: '⭐', label: 'CGPA', val: `${info.cgpa} / 10` },
              { icon: '✉', label: 'Email', val: info.email },
              { icon: '📍', label: 'Location', val: info.location },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.9rem', fontSize: '0.85rem' }}>
                <span style={{ width: 20, textAlign: 'center', flexShrink: 0 }}>{row.icon}</span>
                <span style={{ color: 'var(--muted)', flexShrink: 0, minWidth: '70px' }}>{row.label}:</span>
                {editing ? (
                  <input defaultValue={row.val} style={{ flex: 1, padding: '4px 8px', borderRadius: '6px', border: '1px solid var(--border)', fontSize: '0.82rem', fontFamily: 'DM Sans', background: 'var(--teal-lighter)', outline: 'none' }} />
                ) : (
                  <strong style={{ color: 'var(--text)', fontWeight: 600 }}>{row.val}</strong>
                )}
              </div>
            ))}
            {/* Social links */}
            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
              {[
                { icon: '⌥', label: 'GitHub', val: info.github },
                { icon: '🔗', label: 'LinkedIn', val: info.linkedin },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span>{s.icon}</span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--teal)', cursor: 'pointer', textDecoration: 'underline' }}>{s.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem', boxShadow: 'var(--shadow)' }}>
            <h4 style={{ fontFamily: 'Syne', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>Certifications</h4>
            <div>
              {certs.map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: i < certs.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '9px', background: 'var(--teal-light)', color: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{c.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{c.org} · {c.year}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div>
          {/* Readiness */}
          <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem', boxShadow: 'var(--shadow)', marginBottom: '1rem' }}>
            <h4 style={{ fontFamily: 'Syne', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>Placement Readiness Analysis</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '1.5rem' }}>
              {readiness.map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--muted)', width: '130px', flexShrink: 0 }}>{r.label}</div>
                  <div style={{ flex: 1, height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${r.pct}%`, background: r.color, borderRadius: '4px', transition: 'width 1s ease' }} />
                  </div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: r.color, width: '35px', textAlign: 'right' }}>{r.pct}%</div>
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--teal-lighter)', borderRadius: '12px', border: '1px solid var(--border)', padding: '1rem 1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 700 }}>Overall Placement Readiness</span>
                <span style={{ fontFamily: 'Syne', fontSize: '1.5rem', fontWeight: 800, color: 'var(--teal)' }}>78%</span>
              </div>
              <div style={{ height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' }}>
                <div style={{ height: '100%', width: '78%', background: 'linear-gradient(90deg,var(--teal),var(--teal-dark))', borderRadius: '4px' }} />
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Target: 90% before placement season in November 2025.</p>
            </div>
          </div>

          {/* Activity */}
          <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem', boxShadow: 'var(--shadow)', marginBottom: '1rem' }}>
            <h4 style={{ fontFamily: 'Syne', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>Activity Overview</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem' }}>
              {[
                { label: 'Day Streak', val: '17', color: 'var(--teal)', icon: '🔥' },
                { label: 'Mock Interviews', val: '23', color: 'var(--amber)', icon: '◎' },
                { label: 'DSA Problems', val: '180', color: 'var(--blue)', icon: '◈' },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '1rem', background: 'var(--teal-lighter)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{s.icon}</div>
                  <div style={{ fontFamily: 'Syne', fontSize: '1.8rem', fontWeight: 800, color: s.color }}>{s.val}</div>
                  <div style={{ fontSize: '0.73rem', color: 'var(--muted)', fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Target companies */}
          <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem', boxShadow: 'var(--shadow)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>
              <h4 style={{ fontFamily: 'Syne', fontSize: '0.95rem', fontWeight: 700 }}>Target Companies</h4>
              <button style={{ padding: '5px 12px', borderRadius: '8px', border: '1.5px solid var(--teal)', background: 'transparent', color: 'var(--teal)', fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer', fontFamily: 'DM Sans' }}>+ Add</button>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {[
                { name: 'Razorpay', match: 78, status: 'close' },
                { name: 'Google', match: 65, status: 'preparing' },
                { name: 'Microsoft', match: 72, status: 'close' },
                { name: 'Swiggy', match: 85, status: 'ready' },
                { name: 'Zepto', match: 88, status: 'ready' },
              ].map((c, i) => (
                <div key={i} style={{ background: 'var(--teal-lighter)', border: '1px solid var(--border)', borderRadius: '10px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px', flex: '1 1 140px' }}>
                  <div>
                    <div style={{ fontFamily: 'Syne', fontSize: '0.88rem', fontWeight: 700 }}>{c.name}</div>
                    <div style={{ fontSize: '0.72rem', color: c.status === 'ready' ? 'var(--teal)' : c.status === 'close' ? 'var(--amber)' : 'var(--muted)', fontWeight: 600, marginTop: '2px' }}>
                      {c.match}% match · {c.status === 'ready' ? '✓ Ready' : c.status === 'close' ? '⚡ Almost' : '◎ Preparing'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}