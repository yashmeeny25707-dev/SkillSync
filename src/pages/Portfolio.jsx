import { useState } from 'react';

const projects = [
  { name: 'EduTrack Platform', desc: 'Full-stack LMS with real-time progress tracking, quiz engine, and analytics dashboard.', tags: ['React', 'Node.js', 'PostgreSQL'], status: 'live', gradient: 'linear-gradient(135deg,var(--teal),#0f7a6b)', github: true, live: true },
  { name: 'FinBot — AI Finance', desc: 'AI-powered personal finance tracker with expense categorization and investment insights.', tags: ['Next.js', 'Python', 'OpenAI'], status: 'live', gradient: 'linear-gradient(135deg,var(--blue),#2b6fad)', github: true, live: true },
  { name: 'ShopIQ E-Commerce', desc: 'Complete e-commerce solution with recommendation engine and dynamic pricing module.', tags: ['React', 'Express', 'MongoDB'], status: 'pending', gradient: 'linear-gradient(135deg,var(--amber),#c8861f)', github: true, live: false },
  { name: 'CodeCollab IDE', desc: 'Collaborative real-time coding environment with video calling and Git integration.', tags: ['WebSockets', 'Docker', 'Redis'], status: 'live', gradient: 'linear-gradient(135deg,#7c3aed,#5b21b6)', github: true, live: true },
  { name: 'HealthTrack App', desc: 'Smart health monitoring app with ML-based anomaly detection and doctor consultation.', tags: ['React Native', 'TensorFlow', 'Firebase'], status: 'live', gradient: 'linear-gradient(135deg,#059669,#047857)', github: true, live: true },
  { name: 'SmartNote AI', desc: 'AI-powered note-taking with auto-summarization, tagging, and semantic search.', tags: ['Vue.js', 'LangChain', 'Supabase'], status: 'pending', gradient: 'linear-gradient(135deg,#dc2626,#b91c1c)', github: true, live: false },
];

export default function Portfolio() {
  const [copied, setCopied] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({ name: '', desc: '', tags: '', github: '', live: '' });

  const copyUrl = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ animation: 'fadeUp 0.4s ease' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' }}>
        <div>
          <h2 style={{ fontFamily: 'Syne', fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.75px', marginBottom: '4px' }}>Portfolio</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Showcase your work. Share your public URL with recruiters.</p>
        </div>
        <button onClick={() => setShowAdd(true)} style={{ padding: '10px 20px', borderRadius: '10px', background: 'var(--teal)', color: 'white', border: 'none', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', fontFamily: 'DM Sans' }}>
          + Add Project
        </button>
      </div>

      {/* Public URL banner */}
      <div style={{ background: 'linear-gradient(90deg,var(--teal-light),rgba(55,138,221,0.08))', border: '1px solid var(--border)', borderRadius: '14px', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.78rem', color: 'var(--muted)', fontWeight: 500, marginBottom: '4px' }}>Your Public Portfolio URL</div>
          <div style={{ fontFamily: 'Syne', fontWeight: 700, color: 'var(--teal)', fontSize: '0.95rem' }}>skillsync.io/rahul-sharma</div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={copyUrl} style={{ padding: '8px 14px', borderRadius: '9px', border: '1.5px solid var(--border)', background: 'white', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600, color: copied ? 'var(--teal)' : 'var(--muted)', fontFamily: 'DM Sans', transition: 'all 0.2s' }}>
            {copied ? '✓ Copied!' : '⎘ Copy'}
          </button>
          <button style={{ padding: '8px 16px', borderRadius: '9px', border: 'none', background: 'var(--teal)', color: 'white', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 700, fontFamily: 'DM Sans' }}>Share ↗</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Total Projects', val: projects.length, color: 'var(--teal)' },
          { label: 'Live Projects', val: projects.filter(p => p.status === 'live').length, color: 'var(--teal)' },
          { label: 'Pending Review', val: projects.filter(p => p.status === 'pending').length, color: 'var(--amber)' },
          { label: 'Tech Stack Used', val: new Set(projects.flatMap(p => p.tags)).size, color: 'var(--blue)' },
        ].map((c, i) => (
          <div key={i} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '12px', padding: '1rem 1.25rem', textAlign: 'center', boxShadow: 'var(--shadow)' }}>
            <div style={{ fontFamily: 'Syne', fontSize: '1.8rem', fontWeight: 800, color: c.color }}>{c.val}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '2px' }}>{c.label}</div>
          </div>
        ))}
      </div>

      {/* Project grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '1.5rem' }}>
        {projects.map((p, i) => (
          <div key={i} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow)', transition: 'all 0.25s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}
          >
            <div style={{ height: 140, background: p.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne', fontSize: '1.1rem', fontWeight: 800, color: 'white', letterSpacing: '-0.5px', position: 'relative' }}>
              {p.name.split(' ')[0]}
              <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '6px' }}>
                {p.github && <a style={{ width: 28, height: 28, borderRadius: '8px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '0.8rem', color: 'white' }}>⌥</a>}
                {p.live && <a style={{ width: 28, height: 28, borderRadius: '8px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '0.8rem', color: 'white' }}>↗</a>}
              </div>
            </div>
            <div style={{ padding: '1.25rem' }}>
              <div style={{ fontFamily: 'Syne', fontSize: '1rem', fontWeight: 700, marginBottom: '6px' }}>{p.name}</div>
              <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '1rem' }}>{p.desc}</p>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '1rem' }}>
                {p.tags.map((t, j) => <span key={j} style={{ fontSize: '0.72rem', fontWeight: 600, padding: '4px 10px', borderRadius: '6px', background: 'var(--teal-lighter)', color: 'var(--teal)', border: '1px solid var(--border)' }}>{t}</span>)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 600, color: p.status === 'live' ? 'var(--teal)' : 'var(--amber)' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: p.status === 'live' ? 'var(--teal)' : 'var(--amber)' }} />
                  {p.status === 'live' ? 'Live' : 'Pending Review'}
                </div>
                <button style={{ padding: '6px 12px', borderRadius: '8px', border: '1.5px solid var(--border)', background: 'transparent', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600, color: 'var(--muted)', fontFamily: 'DM Sans', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--teal-light)'; e.currentTarget.style.color = 'var(--teal)'; e.currentTarget.style.borderColor = 'var(--teal)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                >Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add modal */}
      {showAdd && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(13,43,39,0.4)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }} onClick={() => setShowAdd(false)}>
          <div style={{ background: 'white', borderRadius: '20px', padding: '2rem', maxWidth: '480px', width: '100%', boxShadow: 'var(--shadow-lg)' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontFamily: 'Syne', fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.5rem' }}>Add New Project</h3>
            {[
              { label: 'Project Name', key: 'name', placeholder: 'EduTrack Platform' },
              { label: 'Description', key: 'desc', placeholder: 'Brief description of what you built...' },
              { label: 'Tech Stack (comma separated)', key: 'tags', placeholder: 'React, Node.js, MongoDB' },
              { label: 'GitHub URL', key: 'github', placeholder: 'https://github.com/you/project' },
              { label: 'Live URL (optional)', key: 'live', placeholder: 'https://yourproject.vercel.app' },
            ].map((f, i) => (
              <div key={i} style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>{f.label}</label>
                <input value={addForm[f.key]} onChange={e => setAddForm({ ...addForm, [f.key]: e.target.value })} placeholder={f.placeholder}
                  style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1.5px solid var(--border)', background: 'var(--teal-lighter)', fontSize: '0.9rem', fontFamily: 'DM Sans', outline: 'none' }} />
              </div>
            ))}
            <div style={{ display: 'flex', gap: '10px', marginTop: '1.5rem' }}>
              <button onClick={() => setShowAdd(false)} style={{ flex: 1, padding: '11px', borderRadius: '10px', border: '1.5px solid var(--border)', background: 'white', color: 'var(--muted)', fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans' }}>Cancel</button>
              <button onClick={() => setShowAdd(false)} style={{ flex: 1, padding: '11px', borderRadius: '10px', border: 'none', background: 'var(--teal)', color: 'white', fontWeight: 700, cursor: 'pointer', fontFamily: 'DM Sans' }}>Add Project</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}