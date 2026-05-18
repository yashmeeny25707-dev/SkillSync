import { useState } from 'react';

const initNotifs = [
  { id: 1, unread: true, icon: '◎', bg: 'rgba(13,158,138,0.1)', color: 'var(--teal)', title: 'AI Interview Feedback Ready', desc: 'Your Technical Round session has been analyzed. Overall Score: 82/100. View detailed breakdown with improvement suggestions.', time: '2h ago', type: 'interview' },
  { id: 2, unread: true, icon: '◈', bg: 'rgba(239,159,39,0.1)', color: 'var(--amber)', title: 'Skill Verification Approved', desc: 'Prof. Anita Mehta has verified your React.js skill at Expert level. This has been added to your verified portfolio.', time: 'Yesterday', type: 'skill' },
  { id: 3, unread: true, icon: '▦', bg: 'rgba(55,138,221,0.1)', color: 'var(--blue)', title: 'Placement Drive: Razorpay — 3 Days Left', desc: 'Razorpay campus placement drive begins in 3 days. Your current readiness score is 78% — Razorpay requires 80%. Focus on DSA today.', time: '2 days ago', type: 'placement' },
  { id: 4, unread: true, icon: '◉', bg: 'rgba(13,158,138,0.1)', color: 'var(--teal)', title: 'Placement Readiness Milestone', desc: 'Congratulations — you\'ve crossed 75% placement readiness. You\'re now eligible for pre-placement interview tracks at 12 partner companies.', time: '3 days ago', type: 'milestone' },
  { id: 5, unread: false, icon: '◍', bg: 'rgba(55,138,221,0.1)', color: 'var(--blue)', title: 'Mentor Session Scheduled', desc: 'Your session with Mentor Vikram Nair (ex-Google SWE) is confirmed for Friday, 4 PM. Topic: System Design Preparation.', time: '4 days ago', type: 'mentor' },
  { id: 6, unread: false, icon: '▤', bg: 'rgba(13,158,138,0.1)', color: 'var(--teal)', title: 'Weekly Readiness Report', desc: 'Your weekly placement readiness report is ready. You improved by 4 points this week. Top gain: Interview Score (+12).', time: '5 days ago', type: 'report' },
  { id: 7, unread: false, icon: '◎', bg: 'rgba(239,159,39,0.1)', color: 'var(--amber)', title: 'New Company Added to Network', desc: 'Zepto has joined SkillSync\'s recruiter network. They\'re actively hiring Full Stack Developers with React + Node.js experience.', time: '6 days ago', type: 'company' },
];

export default function Notifications() {
  const [notifs, setNotifs] = useState(initNotifs);
  const [filter, setFilter] = useState('All');

  const markAll = () => setNotifs(ns => ns.map(n => ({ ...n, unread: false })));
  const markOne = (id) => setNotifs(ns => ns.map(n => n.id === id ? { ...n, unread: false } : n));
  const deleteOne = (id) => setNotifs(ns => ns.filter(n => n.id !== id));

  const types = ['All', 'interview', 'skill', 'placement', 'milestone', 'mentor'];
  const filtered = filter === 'All' ? notifs : notifs.filter(n => n.type === filter);
  const unreadCount = notifs.filter(n => n.unread).length;

  return (
    <div style={{ animation: 'fadeUp 0.4s ease' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontFamily: 'Syne', fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.75px', marginBottom: '4px' }}>
            Notifications
            {unreadCount > 0 && <span style={{ marginLeft: '12px', background: 'var(--teal)', color: 'white', fontSize: '0.75rem', fontWeight: 700, borderRadius: '100px', padding: '3px 10px', verticalAlign: 'middle' }}>{unreadCount} new</span>}
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Stay updated on interviews, skill verifications, and placement alerts.</p>
        </div>
        <button onClick={markAll} style={{ padding: '9px 18px', borderRadius: '9px', border: '1.5px solid var(--border)', background: 'white', color: 'var(--muted)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'DM Sans', transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--teal)'; e.currentTarget.style.color = 'var(--teal)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)'; }}>
          ✓ Mark all as read
        </button>
      </div>

      {/* Filter pills */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
        {types.map(t => (
          <button key={t} onClick={() => setFilter(t)} style={{ padding: '6px 14px', borderRadius: '100px', border: `1.5px solid ${filter === t ? 'var(--teal)' : 'var(--border)'}`, background: filter === t ? 'var(--teal)' : 'white', color: filter === t ? 'white' : 'var(--muted)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans', transition: 'all 0.2s', textTransform: 'capitalize' }}>{t}</button>
        ))}
      </div>

      {/* Notifications list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '16px', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🔔</div>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>No notifications in this category.</p>
          </div>
        )}
        {filtered.map((n, i) => (
          <div key={n.id} style={{ background: 'white', border: `1px solid ${n.unread ? 'var(--border)' : 'var(--border)'}`, borderLeft: n.unread ? '3px solid var(--teal)' : '3px solid transparent', borderRadius: '12px', padding: '1rem 1.25rem', display: 'flex', alignItems: 'flex-start', gap: '12px', transition: 'all 0.2s', cursor: 'pointer' }}
            onClick={() => markOne(n.id)}
            onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
          >
            {n.unread && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--teal)', flexShrink: 0, marginTop: '6px' }} />}
            {!n.unread && <div style={{ width: 8, height: 8, flexShrink: 0 }} />}
            <div style={{ width: 40, height: 40, borderRadius: '10px', background: n.bg, color: n.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>{n.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.88rem', fontWeight: n.unread ? 700 : 600, marginBottom: '3px', color: 'var(--text)' }}>{n.title}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.5 }}>{n.desc}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', flexShrink: 0 }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--inactive)', whiteSpace: 'nowrap' }}>{n.time}</div>
              <button onClick={e => { e.stopPropagation(); deleteOne(n.id); }} style={{ padding: '3px 8px', borderRadius: '6px', border: 'none', background: 'transparent', color: 'var(--inactive)', fontSize: '0.75rem', cursor: 'pointer', fontFamily: 'DM Sans', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(163,45,45,0.08)'; e.currentTarget.style.color = '#A32D2D'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--inactive)'; }}>
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}