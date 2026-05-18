import { useEffect, useRef } from 'react';

export default function Landing({ navigate }) {
  const countersRef = useRef([]);

  useEffect(() => {
    const targets = [12400, 94, 340, 50000];
    const labels = ['12.4K', '94%', '340', '50K'];
    targets.forEach((target, i) => {
      let current = 0;
      const step = Math.ceil(target / 60);
      const el = document.getElementById(`count-${i}`);
      if (!el) return;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = target >= 10000 ? (current / 1000).toFixed(1) + 'K' : current + (i === 1 ? '%' : '');
        if (current >= target) { el.textContent = labels[i]; clearInterval(timer); }
      }, 20);
    });
  }, []);

  const features = [
    { icon: '◈', title: 'Placement Readiness Score', desc: 'Live AI-calculated score — not just CGPA, but real skills, projects, and communication measured together.' },
    { icon: '◉', title: 'AI Mock Interviews', desc: 'Practice with intelligent AI that asks technical and HR questions, then scores your confidence and accuracy.' },
    { icon: '◎', title: 'Verified Skill Tracker', desc: 'Track and certify every competency. Faculty verify skills, building a trusted profile recruiters believe.' },
    { icon: '▦', title: 'Portfolio Builder', desc: 'Showcase projects with live links, GitHub integration, and tech stacks. Get a shareable public portfolio URL.' },
    { icon: '◻', title: 'ATS Resume Analyzer', desc: 'Upload resume and get instant ATS compatibility score, keyword gaps, and AI improvement suggestions.' },
    { icon: '◭', title: 'Resume Generator', desc: 'Fill a form and generate a clean, ATS-optimized resume instantly. Download as PDF in one click.' },
  ];

  const testimonials = [
    { initials: 'AK', name: 'Arjun Khanna', college: 'DTU — Placed at Razorpay', quote: 'SkillSync\'s AI mock interview helped me land my first technical interview. The feedback was incredibly specific.' },
    { initials: 'PS', name: 'Priya Sharma', college: 'VIT — Placed at TCS Digital', quote: 'My college had no system to track skills. SkillSync gave me a verified portfolio that recruiters actually trusted.' },
    { initials: 'RV', name: 'Rahul Verma', college: 'NSUT — Placed at Microsoft', quote: 'The ATS scanner is underrated. Resume went from 76% to 96% and I started getting interview calls.' },
  ];

  return (
    <div style={{ paddingTop: '64px' }}>
      {/* HERO */}
      <section style={{
        padding: '6rem 2rem 4rem', textAlign: 'center',
        background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(13,158,138,0.12) 0%, transparent 70%)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'var(--teal-light)', border: '1px solid var(--border)',
          borderRadius: '100px', padding: '6px 16px', marginBottom: '2rem',
          fontSize: '0.82rem', fontWeight: 600, color: 'var(--teal)',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--teal)', display: 'inline-block', animation: 'pulse 2s infinite' }} />
          AI-Powered Career Readiness Platform
        </div>

        <h1 style={{ fontSize: 'clamp(2.8rem,6vw,5rem)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-2px', marginBottom: '1.5rem' }}>
          From Marks<br />to <span style={{ color: 'var(--teal)' }}>Mastery.</span>
        </h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--muted)', maxWidth: '560px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
          Track skills, build verified portfolios, prepare with AI, and become placement-ready before your first interview.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '3.5rem', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('auth')} style={{
            padding: '14px 32px', borderRadius: '12px', background: 'var(--teal)',
            color: 'white', border: 'none', fontSize: '1rem', fontWeight: 700,
            cursor: 'pointer', boxShadow: '0 4px 20px rgba(13,158,138,0.35)',
            fontFamily: 'DM Sans', transition: 'all 0.25s',
          }}>Start for Free</button>
          <button onClick={() => navigate('dashboard')} style={{
            padding: '14px 32px', borderRadius: '12px', background: 'white',
            color: 'var(--teal)', border: '1.5px solid var(--border)', fontSize: '1rem',
            fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans',
          }}>View Demo Dashboard</button>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
          {['Students Placed', 'Readiness Score Avg', 'Partner Companies', 'Mock Interviews Done'].map((label, i) => (
            <div key={i} style={{
              background: 'white', border: '1px solid var(--border)', borderRadius: '12px',
              padding: '1rem 1.75rem', textAlign: 'center', boxShadow: 'var(--shadow)', minWidth: '130px',
            }}>
              <span id={`count-${i}`} style={{ fontFamily: 'Syne', fontSize: '2rem', fontWeight: 800, color: 'var(--teal)', display: 'block' }}>0</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--muted)', fontWeight: 500 }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Preview */}
        <div style={{
          maxWidth: '800px', margin: '0 auto',
          background: 'white', borderRadius: '20px',
          border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)', overflow: 'hidden',
        }}>
          <div style={{ background: 'var(--teal-lighter)', borderBottom: '1px solid var(--border)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {['#FF5F57','#FFBD2E','#28CA41'].map((c, i) => <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
            <span style={{ fontSize: '0.75rem', color: 'var(--muted)', marginLeft: '8px', fontWeight: 500 }}>SkillSync — Dashboard</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr' }}>
            <div style={{ background: 'var(--teal-lighter)', borderRight: '1px solid var(--border)', padding: '1rem' }}>
              {['Dashboard','Skills','Portfolio','AI Interview','Resume'].map((item, i) => (
                <div key={i} style={{
                  padding: '8px 10px', borderRadius: '7px', fontSize: '0.78rem', fontWeight: 500,
                  color: i === 0 ? 'white' : 'var(--muted)',
                  background: i === 0 ? 'var(--teal)' : 'transparent', marginBottom: '2px',
                }}>
                  {item}
                </div>
              ))}
            </div>
            <div style={{ padding: '1.25rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[
                { label: 'Placement Readiness', val: '78%', sub: 'Target: 90%', teal: true },
                { label: 'Interview Score', val: '82', sub: '+12 from last session', teal: false },
                { label: 'Skills Verified', val: '14', sub: '+3 this month', teal: false },
                { label: 'Projects Live', val: '6', sub: '2 pending review', teal: false },
              ].map((card, i) => (
                <div key={i} style={{
                  background: card.teal ? 'linear-gradient(135deg,var(--teal),var(--teal-dark))' : 'var(--teal-lighter)',
                  borderRadius: '10px', border: '1px solid var(--border)', padding: '1rem',
                }}>
                  <div style={{ fontSize: '0.68rem', fontWeight: 600, color: card.teal ? 'rgba(255,255,255,0.7)' : 'var(--muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{card.label}</div>
                  <div style={{ fontFamily: 'Syne', fontSize: '1.8rem', fontWeight: 800, color: card.teal ? 'white' : 'var(--teal)' }}>{card.val}</div>
                  <div style={{ fontSize: '0.72rem', color: card.teal ? 'rgba(255,255,255,0.65)' : 'var(--teal)', marginTop: '2px' }}>{card.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Companies */}
      <div style={{ padding: '2.5rem 2rem', textAlign: 'center', background: 'white', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: '0.78rem', color: 'var(--inactive)', fontWeight: 500, marginBottom: '1.5rem', letterSpacing: '0.5px' }}>TRUSTED BY STUDENTS GETTING HIRED AT</p>
        <div style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
          {['Google','Microsoft','Infosys','TCS','Razorpay','Swiggy','Zepto'].map(c => (
            <span key={c} style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '1.05rem', color: 'var(--inactive)' }}>{c}</span>
          ))}
        </div>
      </div>

      {/* Features */}
      <section style={{ padding: '5rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0.75rem' }}>Core Features</div>
        <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.5rem)', fontWeight: 800, letterSpacing: '-1px', marginBottom: '0.75rem' }}>
          Everything you need to get <span style={{ color: 'var(--teal)' }}>placement-ready.</span>
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', marginBottom: '2.5rem', maxWidth: '500px', lineHeight: 1.6 }}>
          One platform. Real skills. Verified portfolios. AI interviews. Stop using 10 apps for what SkillSync does in one.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '1.25rem' }}>
          {features.map((f, i) => (
            <div key={i} style={{
              background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius)',
              padding: '1.75rem', boxShadow: 'var(--shadow)', transition: 'all 0.3s', cursor: 'default',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.borderColor = 'var(--teal)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
            >
              <div style={{ fontSize: '1.5rem', color: 'var(--teal)', marginBottom: '1rem' }}>{f.icon}</div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.6rem' }}>{f.title}</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '4rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0.75rem' }}>Student Stories</div>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.75px', marginBottom: '2rem' }}>Real students. Real placements.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.25rem' }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.75rem', boxShadow: 'var(--shadow)' }}>
              <p style={{ fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--text)', marginBottom: '1.25rem' }}>"{t.quote}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,var(--teal),var(--teal-dark))', color: 'white', fontWeight: 700, fontSize: '0.78rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne', flexShrink: 0 }}>{t.initials}</div>
                <div><div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{t.name}</div><div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{t.college}</div></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ margin: '0 2rem 4rem', maxWidth: '1100px', marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{ background: 'linear-gradient(135deg,var(--teal),var(--teal-dark))', borderRadius: '24px', padding: '3rem', textAlign: 'center', color: 'white' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.75px', marginBottom: '0.75rem' }}>Ready to become placement-ready?</h2>
          <p style={{ opacity: 0.75, fontSize: '1rem', marginBottom: '2rem' }}>Join thousands of students transforming their academic journey into industry success.</p>
          <button onClick={() => navigate('auth')} style={{ padding: '14px 36px', borderRadius: '12px', background: 'white', color: 'var(--teal)', border: 'none', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'DM Sans' }}>
            Get Started — Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: 'var(--text)', color: 'white', padding: '3rem 2rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
            <div>
              <div style={{ fontFamily: 'Syne', fontSize: '1.4rem', fontWeight: 800, color: 'var(--teal)', marginBottom: '1rem' }}>SkillSync</div>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>AI-powered career readiness platform bridging the gap between education and industry.</p>
            </div>
            {[
              { title: 'Platform', links: ['Dashboard','Skills','Portfolio','AI Interview','Resume'] },
              { title: 'Company', links: ['About','Blog','Careers','For Colleges','For Recruiters'] },
              { title: 'Legal', links: ['Privacy Policy','Terms','Security','Contact'] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.5)', marginBottom: '1rem' }}>{col.title}</h4>
                {col.links.map(l => <div key={l} style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.6rem', cursor: 'pointer' }}>{l}</div>)}
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
            <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)' }}>2025 SkillSync. Built for the next generation of professionals.</p>
            <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.2)' }}>Made with purpose.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}