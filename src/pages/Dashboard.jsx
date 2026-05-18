import { useState, useEffect } from 'react';
import Skills from './Skills';
import Portfolio from './Portfolio';
import Interview from './Interview';
import ResumeAnalyzer from './ResumeAnalyzer';
import ResumeGenerator from './ResumeGenerator';
import Notifications from './Notifications';
import Profile from './Profile';

export default function Dashboard({ navigate, logout }) {
  const [sub, setSub] = useState('home');

  const sideItems = [
    { id: 'home', icon: '⊞', label: 'Dashboard' },
    { id: 'skills', icon: '◈', label: 'Skill Tracker' },
    { id: 'portfolio', icon: '◉', label: 'Portfolio' },
    { id: 'interview', icon: '◎', label: 'AI Interview', badge: 'New' },
    { id: 'resume', icon: '▤', label: 'Resume Analyzer' },
    { id: 'generator', icon: '▦', label: 'Resume Generator' },
    { id: 'notifications', icon: '◷', label: 'Notifications', badge: '4' },
    { id: 'profile', icon: '◍', label: 'Profile' },
  ];

  // Scroll to top jab bhi sub-page change ho
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [sub]);

  return (
    <div style={{
      paddingTop: '64px',
      display: 'flex',
      minHeight: '100vh',
      background: 'var(--teal-lighter)',
      // overflow hidden prevents content bleed
      overflow: 'hidden',
    }}>
      {/* SIDEBAR */}
      <aside style={{
        width: '240px',
        background: 'white',
        borderRight: '1px solid var(--border)',
        position: 'fixed',           // fixed — scroll se independent
        top: '64px',
        left: 0,
        height: 'calc(100vh - 64px)',
        overflowY: 'auto',
        flexShrink: 0,
        padding: '1.5rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 100,
      }}>
        {/* User */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 12px', marginBottom: '1.75rem' }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,var(--teal),var(--teal-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '0.85rem', fontFamily: 'Syne', flexShrink: 0 }}>RS</div>
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>Rahul Sharma</div>
            <div style={{ fontSize: '0.73rem', color: 'var(--muted)' }}>B.Tech CSE, Year 3</div>
          </div>
        </div>

        {/* Nav items */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--inactive)', textTransform: 'uppercase', letterSpacing: '1px', padding: '0 12px', marginBottom: '6px' }}>Overview</div>
          {sideItems.slice(0, 4).map(item => (
            <SideItem key={item.id} item={item} active={sub === item.id} onClick={() => setSub(item.id)} />
          ))}
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--inactive)', textTransform: 'uppercase', letterSpacing: '1px', padding: '0 12px', margin: '1.25rem 0 6px' }}>Preparation</div>
          {sideItems.slice(4).map(item => (
            <SideItem key={item.id} item={item} active={sub === item.id} onClick={() => setSub(item.id)} />
          ))}
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', marginTop: '1rem' }}>
          <SideItem item={{ id: 'signout', icon: '↩', label: 'Sign Out' }} active={false} onClick={() => navigate('landing')} />
        </div>
      </aside>

      {/* MAIN — sidebar width ke barabar left margin */}
      <main style={{
        flex: 1,
        marginLeft: '240px',      // sidebar ki width
        padding: '2rem',
        minWidth: 0,
        overflowX: 'hidden',
        minHeight: 'calc(100vh - 64px)',
        boxSizing: 'border-box',
      }}>
        {sub === 'home' && <DashHome setSub={setSub} />}
        {sub === 'skills' && <Skills />}
        {sub === 'portfolio' && <Portfolio />}
        {sub === 'interview' && <Interview />}
        {sub === 'resume' && <ResumeAnalyzer />}
        {sub === 'generator' && <ResumeGenerator />}
        {sub === 'notifications' && <Notifications />}
        {sub === 'profile' && <Profile />}
      </main>
    </div>
  );
}

function SideItem({ item, active, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '9px 12px', borderRadius: '9px', marginBottom: '2px',
        background: active ? 'var(--teal-light)' : 'transparent',
        color: active ? 'var(--teal)' : 'var(--muted)',
        fontWeight: active ? 600 : 500, fontSize: '0.875rem',
        cursor: 'pointer', transition: 'all 0.15s', userSelect: 'none',
      }}
      onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'var(--teal-lighter)'; e.currentTarget.style.color = 'var(--teal)'; } }}
      onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--muted)'; } }}
    >
      <span style={{ fontSize: '1rem', flexShrink: 0 }}>{item.icon}</span>
      <span style={{ flex: 1 }}>{item.label}</span>
      {item.badge && (
        <span style={{ background: 'var(--teal)', color: 'white', fontSize: '0.68rem', fontWeight: 700, borderRadius: '100px', padding: '2px 7px' }}>{item.badge}</span>
      )}
    </div>
  );
}

function DashHome({ setSub }) {
  const [score, setScore] = useState(0);

  useEffect(() => {
    let c = 0;
    const t = setInterval(() => {
      c = Math.min(c + 2, 78);
      setScore(c);
      if (c >= 78) clearInterval(t);
    }, 30);
    return () => clearInterval(t);
  }, []);

  const metrics = [
    { label: 'Skills Verified', value: '14', change: '+3 this month', up: true, pct: 70, color: 'var(--teal)' },
    { label: 'Interview Score', value: '82', change: '+12 last session', up: true, pct: 82, color: 'var(--teal)' },
    { label: 'Projects Live', value: '6', change: '2 pending review', up: false, pct: 60, color: 'var(--amber)' },
    { label: 'Prep Streak', value: '17d', change: 'Personal best!', up: true, pct: 85, color: 'var(--blue)' },
  ];

  const skills = [
    { name: 'React', pct: 88 }, { name: 'Node.js', pct: 72 }, { name: 'DSA', pct: 65 },
    { name: 'SQL', pct: 80 }, { name: 'Communication', pct: 74 }, { name: 'Python', pct: 60 },
  ];

  const weekDays = [
    { d: 'Mon', h: 60 }, { d: 'Tue', h: 85 }, { d: 'Wed', h: 45 },
    { d: 'Thu', h: 100 }, { d: 'Fri', h: 70 }, { d: 'Sat', h: 90, amber: true }, { d: 'Sun', h: 55 },
  ];

  const circumference = 2 * Math.PI * 58;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div style={{ animation: 'fadeUp 0.4s ease' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'Syne', fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.75px', marginBottom: '4px' }}>Good morning, Rahul 👋</h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Your placement readiness improved by 4 points this week. Keep going.</p>
      </div>

      {/* Top row */}
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Score ring */}
        <div style={{ background: 'linear-gradient(135deg,var(--teal),var(--teal-dark))', borderRadius: '16px', padding: '2rem', color: 'white', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
          <div style={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.75, marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Placement Readiness</div>
          <div style={{ position: 'relative', width: 140, height: 140, margin: '0 auto 1.25rem' }}>
            <svg viewBox="0 0 140 140" width="140" height="140" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="70" cy="70" r="58" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="10" />
              <circle cx="70" cy="70" r="58" fill="none" stroke="white" strokeWidth="10" strokeLinecap="round"
                strokeDasharray={circumference} strokeDashoffset={offset} style={{ transition: 'stroke-dashoffset 0.1s' }} />
            </svg>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontFamily: 'Syne', fontSize: '2.2rem', fontWeight: 800, color: 'white' }}>
              {score}<span style={{ fontSize: '0.9rem', fontWeight: 400, opacity: 0.7 }}>%</span>
            </div>
          </div>
          <div style={{ fontSize: '0.82rem', opacity: 0.7 }}>Target: <strong style={{ color: 'white', opacity: 1 }}>90%</strong> by Placement Season</div>
        </div>

        {/* Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {metrics.map((m, i) => (
            <div key={i} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.25rem', boxShadow: 'var(--shadow)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem' }}>{m.label}</div>
              <div style={{ fontFamily: 'Syne', fontSize: '1.8rem', fontWeight: 800, lineHeight: 1, marginBottom: '0.4rem' }}>{m.value}</div>
              <div style={{ fontSize: '0.78rem', color: m.up ? 'var(--teal)' : 'var(--amber)', marginBottom: '10px' }}>{m.change}</div>
              <div style={{ height: '5px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${m.pct}%`, background: m.color, borderRadius: '3px', transition: 'width 1s ease' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem', boxShadow: 'var(--shadow)' }}>
          <h4 style={{ fontFamily: 'Syne', fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem' }}>Skill Proficiency</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {skills.map((sk, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)', width: '110px', textAlign: 'right', flexShrink: 0 }}>{sk.name}</div>
                <div style={{ flex: 1, height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${sk.pct}%`, background: 'linear-gradient(90deg,var(--teal),var(--teal-dark))', borderRadius: '4px' }} />
                </div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--teal)', width: '35px' }}>{sk.pct}%</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem', boxShadow: 'var(--shadow)' }}>
          <h4 style={{ fontFamily: 'Syne', fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem' }}>Weekly Activity</h4>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '140px' }}>
            {weekDays.map((d, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%' }}>
                <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'flex-end', background: 'var(--teal-lighter)', borderRadius: '6px 6px 0 0' }}>
                  <div style={{ width: '100%', borderRadius: '6px 6px 0 0', height: `${d.h}%`, background: d.amber ? 'linear-gradient(180deg,var(--amber),#c8861f)' : 'linear-gradient(180deg,var(--teal),var(--teal-dark))', transition: 'height 0.8s ease' }} />
                </div>
                <div style={{ fontSize: '0.68rem', color: 'var(--muted)' }}>{d.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Suggestions */}
      <div style={{ background: 'linear-gradient(135deg,rgba(13,158,138,0.06),rgba(55,138,221,0.06))', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem', position: 'relative' }}>
        <span style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', fontFamily: 'Syne', fontSize: '0.7rem', fontWeight: 800, background: 'var(--teal)', color: 'white', padding: '3px 10px', borderRadius: '100px', letterSpacing: '1px' }}>AI</span>
        <h4 style={{ fontFamily: 'Syne', fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>AI Recommendations</h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '1rem' }}>Based on your profile and target companies, here are your next steps.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { title: 'Strengthen DSA — Arrays & Graphs', desc: 'Your DSA score (65%) is below the Razorpay cutoff. Focus on LeetCode Medium problems this week.', icon: '⌨' },
            { title: 'Schedule another AI Mock Interview', desc: 'Your communication score dropped 8 points. A 30-min HR mock will help significantly.', icon: '🎤' },
            { title: 'Resume ATS score is 76% — needs improvement', desc: 'Add keywords: "REST APIs", "Agile", "System Design". These appear in 80% of target JDs.', icon: '📄' },
          ].map((s, i) => (
            <div key={i} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px 14px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ width: 32, height: 32, borderRadius: '8px', background: 'var(--teal-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', flexShrink: 0 }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '2px' }}>{s.title}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem', boxShadow: 'var(--shadow)' }}>
        <h4 style={{ fontFamily: 'Syne', fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem' }}>Recent Activity</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { icon: '◎', color: 'var(--teal)', bg: 'var(--teal-light)', title: 'Completed AI Mock Interview — Technical Round', sub: 'Score: 82/100 — Communication excellent, DSA needs work', time: '2h ago' },
            { icon: '◈', color: 'var(--amber)', bg: 'rgba(239,159,39,0.12)', title: 'Skill Verified: React.js — Expert Level', sub: 'Verified by Prof. Anita Mehta, CS Dept.', time: 'Yesterday' },
            { icon: '◉', color: 'var(--blue)', bg: 'rgba(55,138,221,0.12)', title: 'New project added: EduTrack Platform', sub: 'Built with React + Node.js + PostgreSQL', time: '2 days ago' },
            { icon: '▤', color: 'var(--teal)', bg: 'var(--teal-light)', title: 'Resume scanned — ATS Score: 76%', sub: '3 critical improvements suggested by AI', time: '3 days ago' },
          ].map((a, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--teal-lighter)', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px 14px' }}>
              <div style={{ width: 36, height: 36, borderRadius: '10px', background: a.bg, color: a.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>{a.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.87rem', fontWeight: 600, marginBottom: '2px' }}>{a.title}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{a.sub}</div>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--inactive)', flexShrink: 0 }}>{a.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}