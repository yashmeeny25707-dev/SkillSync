import { useState } from 'react';

export default function ResumeAnalyzer() {
  const [state, setState] = useState('idle'); // idle | analyzing | done

  const simulateUpload = () => {
    setState('analyzing');
    setTimeout(() => setState('done'), 2200);
  };

  const scoreBreakdown = [
    { label: 'Keywords', pct: 68, color: 'var(--amber)' },
    { label: 'Formatting', pct: 90, color: 'var(--teal)' },
    { label: 'Readability', pct: 82, color: 'var(--teal)' },
    { label: 'Completeness', pct: 72, color: 'var(--amber)' },
    { label: 'Impact Metrics', pct: 55, color: '#A32D2D' },
  ];

  const checklist = [
    { status: 'ok', text: 'Contact information is complete and properly formatted' },
    { status: 'ok', text: 'Education section with CGPA and graduation year included' },
    { status: 'ok', text: 'Work experience uses action verbs and quantified results' },
    { status: 'warn', text: 'Add missing keywords: "REST APIs", "Agile", "System Design", "Microservices"' },
    { status: 'warn', text: 'Skills section lacks industry-standard tool names (Docker, AWS, CI/CD)' },
    { status: 'fail', text: 'No measurable impact in 2 of 4 project descriptions — add metrics' },
    { status: 'fail', text: 'Summary/Objective section missing — critical for ATS first-pass filtering' },
  ];

  const keywords = {
    missing: ['REST APIs', 'Agile', 'System Design', 'Microservices', 'Docker', 'AWS', 'CI/CD', 'TypeScript'],
    present: ['React', 'JavaScript', 'Node.js', 'SQL', 'Python', 'Git'],
  };

  return (
    <div style={{ animation: 'fadeUp 0.4s ease' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'Syne', fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.75px', marginBottom: '4px' }}>Resume Analyzer</h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>AI-powered ATS compatibility scanner and resume improvement engine.</p>
      </div>

      {/* Drop zone */}
      {state === 'idle' && (
        <div onClick={simulateUpload} style={{ border: '2px dashed var(--border)', borderRadius: '16px', padding: '4rem 2rem', textAlign: 'center', cursor: 'pointer', background: 'white', marginBottom: '1.5rem', transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--teal)'; e.currentTarget.style.background = 'var(--teal-lighter)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'white'; }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
          <h4 style={{ fontFamily: 'Syne', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Drop your resume here or click to upload</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '1.5rem' }}>Supports PDF, DOC, DOCX — Max 5MB</p>
          <button style={{ padding: '11px 28px', borderRadius: '10px', background: 'var(--teal)', color: 'white', border: 'none', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', fontFamily: 'DM Sans' }}>Upload Resume</button>
        </div>
      )}

      {/* Analyzing */}
      {state === 'analyzing' && (
        <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '4rem', textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', border: '4px solid var(--teal)', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite', margin: '0 auto 1.5rem' }} />
          <h4 style={{ fontFamily: 'Syne', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Analyzing your resume with AI...</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Checking ATS compatibility, keywords, formatting, and impact metrics</p>
        </div>
      )}

      {/* Results */}
      {state === 'done' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            {/* ATS Score */}
            <div style={{ background: 'linear-gradient(135deg,var(--teal),var(--teal-dark))', borderRadius: '16px', padding: '2rem', color: 'white', textAlign: 'center' }}>
              <p style={{ opacity: 0.7, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', fontWeight: 700 }}>ATS Compatibility Score</p>
              <div style={{ fontFamily: 'Syne', fontSize: '4.5rem', fontWeight: 800, lineHeight: 1 }}>76%</div>
              <p style={{ opacity: 0.75, fontSize: '0.9rem', marginTop: '0.5rem' }}>Good — 3 critical improvements needed</p>
              <button onClick={() => setState('idle')} style={{ marginTop: '1.5rem', padding: '9px 20px', borderRadius: '9px', background: 'rgba(255,255,255,0.2)', color: 'white', border: '1.5px solid rgba(255,255,255,0.4)', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans' }}>
                Analyze New Resume
              </button>
            </div>

            {/* Score breakdown */}
            <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem', boxShadow: 'var(--shadow)' }}>
              <h4 style={{ fontFamily: 'Syne', fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem' }}>Score Breakdown</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {scoreBreakdown.map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--muted)', width: '100px', flexShrink: 0 }}>{s.label}</div>
                    <div style={{ flex: 1, height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${s.pct}%`, background: s.color, borderRadius: '4px' }} />
                    </div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: s.color, width: '35px', textAlign: 'right' }}>{s.pct}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: 'var(--shadow)' }}>
            <h4 style={{ fontFamily: 'Syne', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Improvement Checklist</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {checklist.map((c, i) => {
                const colors = { ok: 'var(--teal)', warn: 'var(--amber)', fail: '#A32D2D' };
                const icons = { ok: '✓', warn: '⚠', fail: '✕' };
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: c.status === 'ok' ? 'rgba(13,158,138,0.04)' : c.status === 'warn' ? 'rgba(239,159,39,0.05)' : 'rgba(163,45,45,0.04)', border: `1px solid ${c.status === 'ok' ? 'rgba(13,158,138,0.15)' : c.status === 'warn' ? 'rgba(239,159,39,0.2)' : 'rgba(163,45,45,0.15)'}`, borderRadius: '9px', fontSize: '0.85rem' }}>
                    <span style={{ color: colors[c.status], fontWeight: 700, fontSize: '0.9rem', flexShrink: 0 }}>{icons[c.status]}</span>
                    {c.text}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Keywords */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {[
              { title: 'Missing Keywords', items: keywords.missing, color: 'var(--amber)', bg: 'rgba(239,159,39,0.1)', border: 'rgba(239,159,39,0.25)' },
              { title: 'Keywords Found', items: keywords.present, color: 'var(--teal)', bg: 'rgba(13,158,138,0.08)', border: 'rgba(13,158,138,0.2)' },
            ].map((kw, i) => (
              <div key={i} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem', boxShadow: 'var(--shadow)' }}>
                <h4 style={{ fontFamily: 'Syne', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>{kw.title}</h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {kw.items.map((k, j) => (
                    <span key={j} style={{ padding: '5px 12px', borderRadius: '100px', fontSize: '0.78rem', fontWeight: 600, background: kw.bg, color: kw.color, border: `1px solid ${kw.border}` }}>{k}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}