import { useState, useEffect, useRef } from 'react';

const aiQuestions = {
  Technical: [
    "Hello! I'm your SkillSync AI interviewer. Let's begin with system design. How would you design a URL shortener like bit.ly? Focus on scalability, database choices, and handling 100M+ daily requests.",
    "Great answer! Now, explain the difference between SQL and NoSQL databases. When would you choose MongoDB over PostgreSQL for a production system?",
    "Good. Let's talk about React. How does the Virtual DOM work, and how does React's reconciliation algorithm decide what to re-render?",
    "Excellent! Final question — implement a function to find the longest substring without repeating characters. Walk me through your approach before coding.",
  ],
  HR: [
    "Welcome! I'll be conducting your HR interview today. Tell me about yourself and why you're interested in software engineering as a career.",
    "Great intro! Can you describe a situation where you had a major conflict with a teammate? How did you handle it and what was the outcome?",
    "Interesting! Where do you see yourself in 5 years? How does this role align with your long-term career goals?",
    "Last question — what's your biggest professional weakness, and what concrete steps have you taken to address it?",
  ],
  'Project Based': [
    "Hi! Let's dive into your projects. Walk me through your most technically challenging project — the architecture, tech stack, and key decisions you made.",
    "Interesting! What was the hardest bug you encountered in that project? How long did it take to find, and how did you debug it?",
    "What would you do differently if you rebuilt this project today? What technical debt exists and how would you address it?",
    "Final one — how did you handle deployment and CI/CD for this project? Did you face any production issues after launch?",
  ],
};

export default function Interview() {
  const [mode, setMode] = useState('setup');
  const [type, setType] = useState('Technical');
  const [difficulty, setDifficulty] = useState('Medium');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const chatRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, typing]);

  useEffect(() => {
    if (mode === 'chat') {
      timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
      const firstQ = aiQuestions[type]?.[0] || aiQuestions['Technical'][0];
      setMessages([{ role: 'ai', text: firstQ }]);
      setQIndex(1);
    }
    return () => clearInterval(timerRef.current);
  }, [mode]);

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const sendMsg = () => {
    if (!input.trim() || typing) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      const qs = aiQuestions[type] || aiQuestions['Technical'];
      const reply = qIndex < qs.length ? qs[qIndex] : "Thank you — that wraps up our session. I'm now generating your performance report. You did really well overall! Click 'End Session' to see your detailed scores.";
      setMessages(prev => [...prev, { role: 'ai', text: reply }]);
      setQIndex(i => i + 1);
    }, 1800 + Math.random() * 800);
  };

  const endSession = () => {
    clearInterval(timerRef.current);
    setShowScore(true);
  };

  const scores = { technical: 82, communication: 76, confidence: 88 };

  if (mode === 'setup') return (
    <div style={{ animation: 'fadeUp 0.4s ease' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'Syne', fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.75px', marginBottom: '4px' }}>AI Mock Interview</h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Practice with an intelligent AI and receive detailed performance feedback.</p>
      </div>

      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <h3 style={{ fontFamily: 'Syne', fontSize: '1.3rem', fontWeight: 700, textAlign: 'center', marginBottom: '0.75rem' }}>Choose Your Interview Mode</h3>
        <p style={{ color: 'var(--muted)', textAlign: 'center', fontSize: '0.9rem', marginBottom: '2rem' }}>Select type, difficulty, then start your session.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {Object.keys(aiQuestions).map(t => (
            <div key={t} onClick={() => setType(t)} style={{
              background: 'white', border: `2px solid ${type === t ? 'var(--teal)' : 'var(--border)'}`,
              borderRadius: '16px', padding: '1.5rem', cursor: 'pointer', transition: 'all 0.2s',
              background: type === t ? 'var(--teal-lighter)' : 'white',
            }}>
              <div style={{ width: 40, height: 40, borderRadius: '10px', background: 'var(--teal-light)', color: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', marginBottom: '1rem' }}>
                {t === 'Technical' ? '⌨' : t === 'HR' ? '◎' : '▦'}
              </div>
              <h4 style={{ fontFamily: 'Syne', fontSize: '0.95rem', fontWeight: 700, marginBottom: '4px' }}>{t} Round</h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.5 }}>
                {t === 'Technical' ? 'DSA, System Design, coding problems, CS fundamentals.' : t === 'HR' ? 'Behavioral, situational judgment, and cultural fit.' : 'Deep dive into projects, design decisions, and choices.'}
              </p>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '2rem' }}>
          {['Easy', 'Medium', 'Hard'].map(d => (
            <button key={d} onClick={() => setDifficulty(d)} style={{
              padding: '9px 28px', borderRadius: '100px', cursor: 'pointer', fontFamily: 'DM Sans', fontWeight: 600, fontSize: '0.88rem', transition: 'all 0.2s',
              border: difficulty === d ? `1.5px solid ${d === 'Easy' ? 'var(--teal)' : d === 'Medium' ? 'var(--amber)' : '#A32D2D'}` : '1.5px solid var(--border)',
              background: difficulty === d ? (d === 'Easy' ? 'rgba(13,158,138,0.1)' : d === 'Medium' ? 'rgba(239,159,39,0.1)' : 'rgba(163,45,45,0.1)') : 'white',
              color: difficulty === d ? (d === 'Easy' ? 'var(--teal)' : d === 'Medium' ? 'var(--amber)' : '#A32D2D') : 'var(--muted)',
            }}>{d}</button>
          ))}
        </div>

        {/* Past sessions */}
        <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem', marginBottom: '2rem', boxShadow: 'var(--shadow)' }}>
          <h4 style={{ fontFamily: 'Syne', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem' }}>Past Sessions</h4>
          {[
            { type: 'Technical', score: 82, date: '2 days ago', diff: 'Medium' },
            { type: 'HR', score: 74, date: '5 days ago', diff: 'Easy' },
            { type: 'Technical', score: 70, date: '1 week ago', diff: 'Hard' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: i < 2 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ width: 36, height: 36, borderRadius: '10px', background: 'var(--teal-light)', color: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', flexShrink: 0 }}>◎</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.87rem', fontWeight: 600 }}>{s.type} Round — {s.diff}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{s.date}</div>
              </div>
              <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '1.1rem', color: s.score >= 80 ? 'var(--teal)' : 'var(--amber)' }}>{s.score}<span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--muted)' }}>/100</span></div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button onClick={() => setMode('chat')} style={{ padding: '14px 48px', borderRadius: '12px', background: 'var(--teal)', color: 'white', border: 'none', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'DM Sans', boxShadow: '0 4px 20px rgba(13,158,138,0.35)', transition: 'all 0.25s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(13,158,138,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 20px rgba(13,158,138,0.35)'; }}>
            Start {type} Interview →
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ animation: 'fadeUp 0.4s ease' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'Syne', fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.75px', marginBottom: '4px' }}>AI Mock Interview</h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Session active — {type} Round · {difficulty} difficulty</p>
      </div>

      {/* Header bar */}
      <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', boxShadow: 'var(--shadow)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,var(--teal),var(--teal-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '0.9rem', fontFamily: 'Syne' }}>AI</div>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>SkillSync AI Interviewer</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--teal)', fontWeight: 600 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--teal)', animation: 'pulse 1.5s infinite' }} />
              Session Active — {type} Round
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontFamily: 'Syne', fontSize: '1.1rem', fontWeight: 700 }}>{formatTime(seconds)}</div>
          <button onClick={endSession} style={{ padding: '8px 16px', borderRadius: '9px', border: '1.5px solid var(--teal)', background: 'transparent', color: 'var(--teal)', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', fontFamily: 'DM Sans' }}>End Session</button>
        </div>
      </div>

      {/* Chat area */}
      <div ref={chatRef} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', height: '380px', overflowY: 'auto', padding: '1.5rem', marginBottom: '1rem', boxShadow: 'var(--shadow)' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '1.25rem', flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, background: m.role === 'ai' ? 'linear-gradient(135deg,var(--teal),var(--teal-dark))' : 'linear-gradient(135deg,var(--blue),#2b6fad)', color: 'white', fontSize: '0.72rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne' }}>
              {m.role === 'ai' ? 'AI' : 'RS'}
            </div>
            <div style={{ maxWidth: '75%', padding: '12px 16px', borderRadius: m.role === 'ai' ? '4px 14px 14px 14px' : '14px 4px 14px 14px', fontSize: '0.88rem', lineHeight: 1.6, background: m.role === 'ai' ? 'var(--teal-lighter)' : 'var(--teal)', color: m.role === 'ai' ? 'var(--text)' : 'white', border: m.role === 'ai' ? '1px solid var(--border)' : 'none' }}>
              {m.text}
            </div>
          </div>
        ))}
        {typing && (
          <div style={{ display: 'flex', gap: '10px', marginBottom: '1.25rem' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,var(--teal),var(--teal-dark))', color: 'white', fontSize: '0.72rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne', flexShrink: 0 }}>AI</div>
            <div style={{ padding: '12px 16px', background: 'var(--teal-lighter)', border: '1px solid var(--border)', borderRadius: '4px 14px 14px 14px', display: 'flex', gap: '5px', alignItems: 'center' }}>
              {[0, 0.2, 0.4].map((d, i) => <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--teal)', animation: `typing 1.2s ${d}s infinite` }} />)}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: showScore ? '1.5rem' : 0 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMsg()} placeholder="Type your answer here..."
          style={{ flex: 1, padding: '13px 16px', borderRadius: '12px', border: '1.5px solid var(--border)', background: 'var(--teal-lighter)', fontSize: '0.9rem', color: 'var(--text)', fontFamily: 'DM Sans', outline: 'none', transition: 'all 0.2s' }}
          onFocus={e => { e.target.style.borderColor = 'var(--teal)'; e.target.style.background = 'white'; }}
          onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.background = 'var(--teal-lighter)'; }} />
        <button onClick={sendMsg} disabled={!input.trim() || typing} style={{ width: 48, height: 48, borderRadius: '12px', background: input.trim() && !typing ? 'var(--teal)' : 'var(--border)', color: 'white', border: 'none', cursor: input.trim() && !typing ? 'pointer' : 'not-allowed', fontSize: '1.1rem', transition: 'all 0.2s' }}>→</button>
      </div>

      {/* Score breakdown */}
      {showScore && (
        <div style={{ animation: 'fadeUp 0.5s ease', marginTop: '1.5rem' }}>
          <h4 style={{ fontFamily: 'Syne', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Session Feedback</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
            {[
              { label: 'Technical Score', val: scores.technical, color: 'var(--teal)' },
              { label: 'Communication', val: scores.communication, color: 'var(--blue)' },
              { label: 'Confidence', val: scores.confidence, color: 'var(--amber)' },
            ].map((sc, i) => (
              <div key={i} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.25rem', textAlign: 'center', boxShadow: 'var(--shadow)' }}>
                <div style={{ fontFamily: 'Syne', fontSize: '2rem', fontWeight: 800, color: sc.color }}>{sc.val}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '4px' }}>{sc.label}</div>
              </div>
            ))}
          </div>
          <div style={{ background: 'linear-gradient(135deg,rgba(13,158,138,0.06),rgba(55,138,221,0.06))', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem', position: 'relative' }}>
            <span style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', fontFamily: 'Syne', fontSize: '0.7rem', fontWeight: 800, background: 'var(--teal)', color: 'white', padding: '3px 10px', borderRadius: '100px', letterSpacing: '1px' }}>AI</span>
            <h4 style={{ fontFamily: 'Syne', fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>AI Feedback Summary</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1rem' }}>You demonstrated solid understanding of distributed systems. Your answers on scalability were strong. Areas to improve: structure answers with STAR framework, and practice explaining CAP theorem trade-offs more concisely.</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['✓ System Design', '✓ Caching', '⚠ CAP Theorem', '⚠ STAR Method'].map((t, i) => (
                <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 12px', borderRadius: '100px', fontSize: '0.78rem', fontWeight: 600, background: t.startsWith('✓') ? 'var(--teal-light)' : 'rgba(239,159,39,0.1)', color: t.startsWith('✓') ? 'var(--teal)' : 'var(--amber)', border: '1px solid var(--border)' }}>{t}</span>
              ))}
            </div>
          </div>
          <button onClick={() => { setMode('setup'); setMessages([]); setQIndex(0); setSeconds(0); setShowScore(false); }} style={{ marginTop: '1.5rem', padding: '12px 28px', borderRadius: '10px', background: 'var(--teal)', color: 'white', border: 'none', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', fontFamily: 'DM Sans' }}>Start New Session</button>
        </div>
      )}
    </div>
  );
}