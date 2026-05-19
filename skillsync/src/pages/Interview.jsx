import { useMemo, useState } from 'react';
import {
  Bot,
  CheckCircle2,
  Clock3,
  MessageSquareText,
  Mic,
  RotateCcw,
  SendHorizontal,
  Sparkles,
  UserRound,
} from 'lucide-react';

const questionBank = {
  Technical: [
    'Explain how you would design a scalable URL shortener.',
    'What is the difference between SQL and NoSQL databases?',
    'How does React decide what to re-render?',
    'How would you improve API response time in a production app?',
  ],
  HR: [
    'Tell me about yourself in a concise and structured way.',
    'Describe a time you handled a conflict with a teammate.',
    'Why do you want this role?',
    'What is one weakness you are actively improving?',
  ],
};

const starterTips = [
  ['Answer structure', 'Use problem, approach, tradeoff, result for technical answers.'],
  ['Target length', 'Keep answers crisp, specific, and supported by one example.'],
  ['Review focus', 'You will get feedback on clarity, structure, confidence, and next actions.'],
];

export default function Interview() {
  const [type, setType] = useState('Technical');
  const [status, setStatus] = useState('setup');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [answers, setAnswers] = useState([]);

  const questions = useMemo(() => questionBank[type], [type]);
  const report = useMemo(() => buildReport(answers, type), [answers, type]);

  const startSession = () => {
    setStatus('running');
    setQuestionIndex(0);
    setAnswers([]);
    setInput('');
    setMessages([
      {
        role: 'ai',
        text: `Hi, I am your SkillSync AI interviewer. We will do a ${type.toLowerCase()} round. Answer naturally, and I will guide you one question at a time.`,
      },
      { role: 'ai', text: questions[0] },
    ]);
  };

  const sendAnswer = () => {
    if (!input.trim()) return;

    const answer = {
      question: questions[questionIndex],
      response: input.trim(),
    };
    const nextAnswers = [...answers, answer];
    const feedback = quickFeedback(input, type);
    const nextIndex = questionIndex + 1;

    if (nextIndex >= questions.length) {
      setAnswers(nextAnswers);
      setMessages((prev) => [
        ...prev,
        { role: 'user', text: input.trim() },
        { role: 'ai', text: feedback },
        { role: 'ai', text: 'Session complete. I prepared your full interview feedback report below.' },
      ]);
      setInput('');
      setStatus('complete');
      return;
    }

    setAnswers(nextAnswers);
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: input.trim() },
      { role: 'ai', text: feedback },
      { role: 'ai', text: questions[nextIndex] },
    ]);
    setQuestionIndex(nextIndex);
    setInput('');
  };

  const endSession = () => {
    if (answers.length === 0 && !input.trim()) {
      setStatus('setup');
      return;
    }

    const finalAnswers = input.trim()
      ? [...answers, { question: questions[questionIndex], response: input.trim() }]
      : answers;
    setAnswers(finalAnswers);
    setInput('');
    setMessages((prev) => [
      ...prev,
      ...(input.trim() ? [{ role: 'user', text: input.trim() }] : []),
      { role: 'ai', text: 'Session closed. Here is your feedback summary and next practice plan.' },
    ]);
    setStatus('complete');
  };

  const reset = () => {
    setStatus('setup');
    setQuestionIndex(0);
    setInput('');
    setMessages([]);
    setAnswers([]);
  };

  if (status === 'setup') {
    return (
      <div className="fade-up">
        <h1 style={title}>AI Interview</h1>
        <p style={sub}>
          Practice like you are talking to an AI interviewer. End the session to get detailed feedback and next steps.
        </p>

        <div style={modeRow}>
          {Object.keys(questionBank).map((mode) => (
            <button
              key={mode}
              onClick={() => setType(mode)}
              style={{ ...modeBtn, ...(type === mode ? modeBtnActive : {}) }}
            >
              {mode}
            </button>
          ))}
        </div>

        <div style={setupGrid}>
          <div className="card" style={setupCard}>
            <div style={setupIcon}>
              <Mic size={20} />
            </div>
            <h3 style={setupTitle}>{type} mock interview</h3>
            <p style={setupDesc}>
              {type === 'Technical'
                ? 'Answer system design, React, database, and performance questions with structured reasoning.'
                : 'Practice self-introduction, conflict handling, role motivation, and confidence-building answers.'}
            </p>
            <button className="btn btn-primary" onClick={startSession}>
              Start AI session
            </button>
          </div>

          <div style={prepGrid}>
            {starterTips.map(([heading, text]) => (
              <div key={heading} className="card" style={prepCard}>
                <strong>{heading}</strong>
                <p style={prepText}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-up">
      <div style={interviewHead}>
        <div>
          <h1 style={title}>AI Interview</h1>
          <p style={sub}>Live {type.toLowerCase()} conversation with session feedback.</p>
        </div>
        <div style={timer}>
          <Clock3 size={16} />
          <span>{Math.min(questionIndex + 1, questions.length)} / {questions.length}</span>
        </div>
      </div>

      <div style={workspace}>
        <div className="card" style={chatCard}>
          <div style={chatHeader}>
            <div style={aiBadge}>
              <Bot size={18} />
            </div>
            <div>
              <strong>SkillSync AI Interviewer</strong>
              <p style={miniText}>Adaptive practice session</p>
            </div>
          </div>

          <div style={chatStream}>
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                style={{
                  ...messageRow,
                  justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                {message.role === 'ai' && <Bot size={16} style={avatarIcon} />}
                <div style={{ ...bubble, ...(message.role === 'user' ? userBubble : aiBubble) }}>
                  {message.text}
                </div>
                {message.role === 'user' && <UserRound size={16} style={avatarIcon} />}
              </div>
            ))}
          </div>

          {status === 'running' && (
            <div style={composer}>
              <textarea
                className="textarea"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Type your answer like you are speaking to the interviewer..."
                style={{ minHeight: 112 }}
              />
              <div style={answerActions}>
                <button className="btn btn-secondary" onClick={endSession}>
                  End session
                </button>
                <button className="btn btn-primary" onClick={sendAnswer}>
                  <SendHorizontal size={16} />
                  Send answer
                </button>
              </div>
            </div>
          )}
        </div>

        <div style={sideColumn}>
          <div className="card" style={sessionCard}>
            <div style={miniLabel}>Session status</div>
            <h3 style={sideTitle}>{status === 'complete' ? 'Feedback ready' : 'In progress'}</h3>
            <p style={prepText}>
              {answers.length} answer{answers.length === 1 ? '' : 's'} recorded. Close the session anytime to generate a summary.
            </p>
          </div>

          {status === 'complete' && (
            <FeedbackReport report={report} reset={reset} />
          )}
        </div>
      </div>
    </div>
  );
}

function FeedbackReport({ report, reset }) {
  return (
    <div className="card" style={reportCard}>
      <div style={miniLabel}>Session feedback</div>
      <div style={scoreRow}>
        <div>
          <h3 style={sideTitle}>Overall score</h3>
          <p style={miniText}>{report.verdict}</p>
        </div>
        <div style={scoreCircle}>{report.score}%</div>
      </div>

      <div style={reportGrid}>
        <ReportBlock title="What went well" items={report.strengths} icon={CheckCircle2} />
        <ReportBlock title="Improve next" items={report.improvements} icon={Sparkles} />
        <ReportBlock title="Next practice plan" items={report.nextSteps} icon={MessageSquareText} />
      </div>

      <button className="btn btn-primary" onClick={reset} style={{ marginTop: 16 }}>
        <RotateCcw size={16} />
        Start new session
      </button>
    </div>
  );
}

function ReportBlock({ title, items, icon: Icon }) {
  return (
    <div style={reportBlock}>
      <h4 style={blockTitle}>
        <Icon size={15} />
        {title}
      </h4>
      <div style={bulletList}>
        {items.map((item) => (
          <div key={item} style={bulletItem}>{item}</div>
        ))}
      </div>
    </div>
  );
}

function quickFeedback(answer, type) {
  const wordCount = answer.trim().split(/\s+/).filter(Boolean).length;
  if (wordCount < 25) {
    return 'Good start. Add one concrete example, explain your reasoning, and close with the result or tradeoff.';
  }
  if (/\d|%|users|latency|scale|team|project/i.test(answer)) {
    return type === 'Technical'
      ? 'Strong answer. You included evidence or measurable detail. Now make the tradeoff and final decision even clearer.'
      : 'Nice. You used specific detail, which makes the answer believable. Add one sentence about what you learned.';
  }
  return 'Clear answer. To make it stronger, include a specific project, number, result, or lesson learned.';
}

function buildReport(answers, type) {
  const text = answers.map((answer) => answer.response).join(' ');
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const hasExample = /project|internship|team|built|created|handled|designed|implemented/i.test(text);
  const hasMetrics = /\d|%|users|latency|scale|improved|reduced/i.test(text);
  const complete = answers.length >= 3;
  const score = Math.min(100, 42 + answers.length * 9 + (hasExample ? 15 : 0) + (hasMetrics ? 12 : 0) + (wordCount > 180 ? 10 : 0));

  const strengths = [
    complete ? 'You stayed through most of the interview flow.' : 'You started the interview and answered the active prompt.',
    hasExample ? 'Your answers included real experience or project context.' : 'You kept the answers understandable and direct.',
    hasMetrics ? 'You used evidence or measurable details in at least one response.' : 'Your answers have a clear base that can be expanded with evidence.',
  ];

  const improvements = [
    hasExample ? 'Connect every answer to one clear outcome or learning.' : 'Add one concrete project, internship, or classroom example to each answer.',
    hasMetrics ? 'Use metrics consistently, not just once.' : 'Add numbers such as %, users, time saved, latency, scale, or team size.',
    type === 'Technical'
      ? 'Mention tradeoffs, edge cases, and why you chose a particular approach.'
      : 'Use STAR format: situation, task, action, result, then one learning.',
  ];

  const nextSteps = [
    'Rewrite your weakest answer in 5 bullet points.',
    'Record a 90-second version and remove filler words.',
    type === 'Technical'
      ? 'Practice one system design question with scalability and database choices.'
      : 'Prepare two stories: conflict handling and leadership under pressure.',
  ];

  return {
    score,
    verdict: score >= 80 ? 'Strong session. Keep sharpening specificity.' : score >= 65 ? 'Good base. Add stronger evidence and structure.' : 'Needs more detail, examples, and confidence practice.',
    strengths,
    improvements,
    nextSteps,
  };
}

const title = { fontSize: 34, marginBottom: 8 };
const sub = { color: 'var(--text-soft)', lineHeight: 1.7, marginBottom: 20 };
const modeRow = { display: 'flex', gap: 10, marginBottom: 18, flexWrap: 'wrap' };
const modeBtn = { border: '1px solid var(--border)', background: '#fff', color: 'var(--text-soft)', padding: '11px 16px', borderRadius: 14, fontWeight: 700 };
const modeBtnActive = { background: 'var(--primary-soft)', color: 'var(--primary)', borderColor: 'var(--primary)' };
const setupGrid = { display: 'grid', gridTemplateColumns: 'minmax(280px, 520px) minmax(280px, 1fr)', gap: 18, alignItems: 'start' };
const setupCard = { padding: 28, textAlign: 'center' };
const setupIcon = { width: 52, height: 52, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', background: 'var(--primary-soft)', color: 'var(--primary)' };
const setupTitle = { fontSize: 22, marginBottom: 10 };
const setupDesc = { color: 'var(--text-soft)', lineHeight: 1.7, marginBottom: 18 };
const prepGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 };
const prepCard = { padding: 18 };
const prepText = { color: 'var(--text-soft)', lineHeight: 1.7, fontSize: 14, marginTop: 8 };
const interviewHead = { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 16, flexWrap: 'wrap' };
const timer = { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 999, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-soft)', fontWeight: 700 };
const workspace = { display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(320px, 0.9fr)', gap: 18, alignItems: 'start' };
const chatCard = { padding: 0, overflow: 'hidden' };
const chatHeader = { display: 'flex', alignItems: 'center', gap: 12, padding: 18, borderBottom: '1px solid var(--border)' };
const aiBadge = { width: 42, height: 42, borderRadius: 14, background: 'var(--primary-soft)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const miniText = { color: 'var(--text-soft)', fontSize: 13, lineHeight: 1.6, marginTop: 2 };
const chatStream = { display: 'grid', gap: 14, padding: 18, minHeight: 360, maxHeight: 520, overflowY: 'auto', background: '#fbfdfc' };
const messageRow = { display: 'flex', alignItems: 'flex-start', gap: 8 };
const avatarIcon = { marginTop: 10, color: 'var(--text-faint)', flexShrink: 0 };
const bubble = { maxWidth: '78%', padding: '12px 14px', borderRadius: 16, lineHeight: 1.65, fontSize: 14 };
const aiBubble = { background: '#fff', border: '1px solid var(--border)', color: 'var(--text)' };
const userBubble = { background: 'var(--primary)', color: '#fff' };
const composer = { padding: 18, borderTop: '1px solid var(--border)', background: '#fff' };
const answerActions = { display: 'flex', justifyContent: 'space-between', gap: 12, marginTop: 12, flexWrap: 'wrap' };
const sideColumn = { display: 'grid', gap: 18 };
const sessionCard = { padding: 20 };
const miniLabel = { fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-faint)', marginBottom: 6, fontWeight: 800 };
const sideTitle = { fontSize: 20, marginBottom: 6 };
const reportCard = { padding: 20 };
const scoreRow = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14, marginBottom: 16 };
const scoreCircle = { width: 76, height: 76, borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--accent))', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 20, flexShrink: 0 };
const reportGrid = { display: 'grid', gap: 12 };
const reportBlock = { padding: 14, borderRadius: 14, background: 'var(--surface-muted)', border: '1px solid var(--border)' };
const blockTitle = { display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, marginBottom: 10 };
const bulletList = { display: 'grid', gap: 8 };
const bulletItem = { color: 'var(--text-soft)', fontSize: 13, lineHeight: 1.6 };
