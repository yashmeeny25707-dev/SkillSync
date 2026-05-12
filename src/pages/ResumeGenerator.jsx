import { useState } from 'react';

const empty = { name: '', title: '', email: '', phone: '', location: '', linkedin: '', about: '', skills: '', experience: '', education: '', projects: '', achievements: '' };

const inputStyle = { width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1.5px solid var(--border)', background: 'var(--teal-lighter)', fontSize: '0.9rem', color: 'var(--text)', fontFamily: 'DM Sans', outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box' };
const labelStyle = { display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text)', marginBottom: '6px' };

const focusOn = (e) => { e.target.style.borderColor = 'var(--teal)'; e.target.style.background = 'white'; e.target.style.boxShadow = '0 0 0 3px rgba(13,158,138,0.1)'; };
const focusOff = (e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.background = 'var(--teal-lighter)'; e.target.style.boxShadow = 'none'; };

// ✅ Field ko component ke BAHAR define kiya — yahi asli fix hai
// Pehle yeh ResumeGenerator ke andar tha, isliye har keystroke pe
// Field ka naya instance banta tha aur input unmount/remount hota tha
// jisse cursor reset ho jaata tha
const Field = ({ label, name, placeholder, textarea, rows = 3, hint, value, onChange }) => (
  <div style={{ marginBottom: '1.1rem' }}>
    <label style={labelStyle}>
      {label}
      {hint && <span style={{ fontWeight: 400, color: 'var(--muted)', marginLeft: '6px', fontSize: '0.78rem' }}>({hint})</span>}
    </label>
    {textarea ? (
      <textarea
        name={name}
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={onChange}
        style={{ ...inputStyle, resize: 'vertical' }}
        onFocus={focusOn}
        onBlur={focusOff}
      />
    ) : (
      <input
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={inputStyle}
        onFocus={focusOn}
        onBlur={focusOff}
      />
    )}
  </div>
);

export default function ResumeGenerator() {
  const [form, setForm] = useState(empty);
  const [tab, setTab] = useState('edit');
  const [generating, setGenerating] = useState(false);

  const set = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const generate = () => {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setTab('preview'); }, 1200);
  };

  const downloadPDF = () => {
    const content = document.getElementById('resume-preview');
    if (!content) return;
    const html = content.innerHTML;
    const w = window.open('', '_blank');
    w.document.write(`<!DOCTYPE html><html><head><title>${form.name || 'Resume'}</title><style>
      * { margin:0; padding:0; box-sizing:border-box; }
      body { font-family: 'Arial', sans-serif; padding: 40px; color: #0D2B27; }
      h1 { font-size: 2.2rem; font-weight: 800; }
      h2 { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px; color: #4A7B75; border-bottom: 1.5px solid #D1EDE9; padding-bottom: 6px; margin-top: 20px; }
      p { font-size: 0.9rem; line-height: 1.6; }
      .tag { display: inline-block; padding: 3px 10px; border-radius: 100px; border: 1px solid #D1EDE9; font-size: 0.8rem; margin: 2px; }
    </style></head><body>${html}</body></html>`);
    w.document.close();
    setTimeout(() => { w.print(); w.close(); }, 500);
  };

  return (
    <div style={{ animation: 'fadeUp 0.4s ease' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'Syne', fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.75px', marginBottom: '4px' }}>Resume Generator</h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Fill in your details, preview your resume, and download as PDF.</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', background: 'var(--teal-lighter)', borderRadius: '12px', padding: '4px', marginBottom: '2rem', maxWidth: '320px' }}>
        {['edit', 'preview'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: '9px', borderRadius: '9px', border: 'none', background: tab === t ? 'white' : 'transparent', color: tab === t ? 'var(--teal)' : 'var(--muted)', fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer', fontFamily: 'DM Sans', transition: 'all 0.2s', boxShadow: tab === t ? '0 2px 8px rgba(13,158,138,0.12)' : 'none', textTransform: 'capitalize' }}>
            {t === 'edit' ? '✏ Edit Details' : '👁 Preview Resume'}
          </button>
        ))}
      </div>

      {tab === 'edit' ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* LEFT */}
          <div>
            <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.75rem', boxShadow: 'var(--shadow)', marginBottom: '1.25rem' }}>
              <h4 style={{ fontFamily: 'Syne', fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>Personal Info</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <Field label="Full Name" name="name" placeholder="Rahul Sharma" value={form.name} onChange={set} />
                <Field label="Job Title" name="title" placeholder="Full Stack Developer" value={form.title} onChange={set} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <Field label="Email" name="email" placeholder="rahul@dtu.ac.in" value={form.email} onChange={set} />
                <Field label="Phone" name="phone" placeholder="+91 9876543210" value={form.phone} onChange={set} />
              </div>
              <Field label="Location" name="location" placeholder="Delhi, India" value={form.location} onChange={set} />
              <Field label="LinkedIn URL" name="linkedin" placeholder="linkedin.com/in/rahul-sharma" value={form.linkedin} onChange={set} />
            </div>

            <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.75rem', boxShadow: 'var(--shadow)' }}>
              <h4 style={{ fontFamily: 'Syne', fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>Summary & Skills</h4>
              <Field label="Professional Summary" name="about" placeholder="Results-driven Full Stack Developer with 2+ years experience building scalable web applications..." textarea rows={4} value={form.about} onChange={set} />
              <Field label="Skills" name="skills" placeholder="React, Node.js, Python, AWS, Docker, SQL" hint="comma separated" value={form.skills} onChange={set} />
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.75rem', boxShadow: 'var(--shadow)', marginBottom: '1.25rem' }}>
              <h4 style={{ fontFamily: 'Syne', fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>Experience</h4>
              <Field label="Work Experience" name="experience" hint="one entry per line" placeholder={`Google | Software Intern | June–Aug 2024\nBuilt REST APIs serving 100K users, reducing latency by 40%\n\nFreelance | React Developer | 2023–Present\nDelivered 8 client projects, 5-star ratings`} textarea rows={7} value={form.experience} onChange={set} />
            </div>

            <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.75rem', boxShadow: 'var(--shadow)', marginBottom: '1.25rem' }}>
              <h4 style={{ fontFamily: 'Syne', fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>Education</h4>
              <Field label="Education" name="education" hint="one entry per line" placeholder={`B.Tech Computer Science | DTU Delhi | 2022–2026\nCGPA: 8.4 / 10`} textarea rows={3} value={form.education} onChange={set} />
            </div>

            <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.75rem', boxShadow: 'var(--shadow)', marginBottom: '1.25rem' }}>
              <h4 style={{ fontFamily: 'Syne', fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>Projects</h4>
              <Field label="Projects" name="projects" hint="one entry per line" placeholder={`EduTrack | React + Node.js + PostgreSQL | github.com/...\nFull-stack LMS with real-time tracking — 500+ active users`} textarea rows={4} value={form.projects} onChange={set} />
            </div>

            <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.75rem', boxShadow: 'var(--shadow)' }}>
              <h4 style={{ fontFamily: 'Syne', fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>Achievements (optional)</h4>
              <Field label="Achievements & Certifications" name="achievements" placeholder={`AWS Cloud Practitioner — Amazon, 2024\nMeta React Developer Certificate — Coursera, 2024\nHackerRank DSA Gold Level`} textarea rows={4} value={form.achievements} onChange={set} />
            </div>
          </div>

          {/* Generate button */}
          <div style={{ gridColumn: '1/-1', display: 'flex', justifyContent: 'center', paddingTop: '0.5rem' }}>
            <button onClick={generate} disabled={!form.name} style={{ padding: '14px 48px', borderRadius: '12px', background: !form.name ? 'var(--border)' : 'var(--teal)', color: 'white', border: 'none', fontSize: '1rem', fontWeight: 700, cursor: !form.name ? 'not-allowed' : 'pointer', fontFamily: 'DM Sans', boxShadow: form.name ? '0 4px 20px rgba(13,158,138,0.35)' : 'none', transition: 'all 0.25s' }}>
              {generating ? 'Generating...' : '✨ Generate Resume Preview →'}
            </button>
          </div>
        </div>
      ) : (
        <div>
          {/* Preview + Download */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h4 style={{ fontFamily: 'Syne', fontSize: '1rem', fontWeight: 700 }}>Resume Preview</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>Your ATS-optimized resume is ready. Download as PDF or go back to edit.</p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setTab('edit')} style={{ padding: '9px 18px', borderRadius: '9px', border: '1.5px solid var(--border)', background: 'white', color: 'var(--muted)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'DM Sans' }}>← Edit</button>
              <button onClick={downloadPDF} style={{ padding: '9px 20px', borderRadius: '9px', border: 'none', background: 'var(--teal)', color: 'white', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'DM Sans' }}>↓ Download PDF</button>
            </div>
          </div>

          {/* ATS tip */}
          <div style={{ background: 'linear-gradient(90deg,var(--teal-light),rgba(55,138,221,0.08))', border: '1px solid var(--border)', borderRadius: '12px', padding: '12px 16px', marginBottom: '1.5rem', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ fontSize: '1rem' }}>💡</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text)' }}>This resume is optimized for ATS systems. Use "Download PDF" above to save. For best results, customize it for each job application.</span>
          </div>

          {/* Resume */}
          <div id="resume-preview" style={{ background: 'white', borderRadius: '16px', border: '1px solid var(--border)', padding: '3rem 3.5rem', boxShadow: 'var(--shadow-lg)', maxWidth: '800px', margin: '0 auto', fontFamily: 'Georgia, serif' }}>
            {/* Header */}
            <div style={{ borderBottom: '2px solid var(--border)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
              <h1 style={{ fontFamily: 'Syne', fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-1px', color: 'var(--text)', marginBottom: '6px' }}>{form.name || 'Your Name'}</h1>
              <div style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--muted)', marginBottom: '12px' }}>{form.title || 'Your Title'}</div>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--muted)' }}>
                {form.email && <span>✉ {form.email}</span>}
                {form.phone && <span>✆ {form.phone}</span>}
                {form.location && <span>◎ {form.location}</span>}
                {form.linkedin && <span>🔗 {form.linkedin}</span>}
              </div>
            </div>

            {/* Sections */}
            {[
              { key: 'about', title: 'Professional Summary', render: () => <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text)' }}>{form.about}</p> },
              { key: 'skills', title: 'Technical Skills', render: () => (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {form.skills.split(',').map((s, i) => s.trim() && <span key={i} style={{ padding: '4px 12px', borderRadius: '100px', border: '1px solid var(--border)', fontSize: '0.82rem', color: 'var(--text)', background: 'var(--teal-lighter)' }}>{s.trim()}</span>)}
                </div>
              )},
              { key: 'experience', title: 'Work Experience', render: () => form.experience.split('\n').map((l, i) => <p key={i} style={{ fontSize: '0.88rem', lineHeight: 1.7, color: l.includes('|') ? 'var(--text)' : 'var(--muted)', fontWeight: l.includes('|') ? 700 : 400, marginBottom: l === '' ? '8px' : '2px' }}>{l}</p>) },
              { key: 'education', title: 'Education', render: () => form.education.split('\n').map((l, i) => <p key={i} style={{ fontSize: '0.88rem', lineHeight: 1.7, color: 'var(--text)', fontWeight: l.includes('|') ? 600 : 400 }}>{l}</p>) },
              { key: 'projects', title: 'Projects', render: () => form.projects.split('\n').map((l, i) => <p key={i} style={{ fontSize: '0.88rem', lineHeight: 1.7, color: l.includes('|') ? 'var(--text)' : 'var(--muted)', fontWeight: l.includes('|') ? 600 : 400, marginBottom: l === '' ? '6px' : '2px' }}>{l}</p>) },
              { key: 'achievements', title: 'Achievements & Certifications', render: () => form.achievements.split('\n').map((l, i) => l.trim() && <p key={i} style={{ fontSize: '0.88rem', lineHeight: 1.7, color: 'var(--text)' }}>• {l}</p>) },
            ].filter(s => form[s.key]?.trim()).map((s, i) => (
              <div key={i} style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--muted)', marginBottom: '8px', borderBottom: '1.5px solid var(--border)', paddingBottom: '6px' }}>{s.title}</div>
                {s.render()}
              </div>
            ))}

            {!form.name && !form.email && (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--inactive)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📝</div>
                <p style={{ fontSize: '0.9rem' }}>Fill in your details in the Edit tab to see your resume here.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}