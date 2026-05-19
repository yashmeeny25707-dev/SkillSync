import { useState } from 'react';
import { BriefcaseBusiness, GraduationCap, Mail, MapPin, PencilLine, Phone, Save } from 'lucide-react';

export default function Profile({ appState }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(appState.profile);
  const topSkills = appState.skills.slice(0, 6);

  const info = [
    { icon: BriefcaseBusiness, name: 'program', label: 'Program' },
    { icon: GraduationCap, name: 'college', label: 'College' },
    { icon: Mail, name: 'email', label: 'Email' },
    { icon: Phone, name: 'phone', label: 'Phone' },
    { icon: MapPin, name: 'location', label: 'Location' },
  ];

  const handle = (event) => {
    setDraft((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const save = () => {
    appState.saveProfile(draft);
    setEditing(false);
  };

  return (
    <div className="fade-up">
      <div style={head}>
        <div>
          <h1 style={title}>Profile</h1>
          <p style={sub}>Editable academic profile with a live skill graph.</p>
        </div>
        <button className="btn btn-primary" onClick={editing ? save : () => setEditing(true)}>
          {editing ? <Save size={16} /> : <PencilLine size={16} />}
          {editing ? 'Save profile' : 'Edit profile'}
        </button>
      </div>

      <div style={grid}>
        <div>
          <div className="card" style={heroCard}>
            <div style={avatar}>{appState.profile.initials}</div>
            <div style={{ flex: 1 }}>
              {editing ? (
                <>
                  <input className="input" name="fullName" value={draft.fullName} onChange={handle} />
                  <input className="input" name="role" value={draft.role} onChange={handle} style={{ marginTop: 10 }} />
                </>
              ) : (
                <>
                  <h2 style={name}>{appState.profile.fullName}</h2>
                  <p style={role}>{appState.profile.role}</p>
                </>
              )}
            </div>
          </div>

          <div className="card" style={infoCard}>
            {info.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.name} style={infoRow}>
                  <div style={infoLabel}>
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </div>
                  {editing ? (
                    <input className="input" name={item.name} value={draft[item.name]} onChange={handle} />
                  ) : (
                    <div style={infoValue}>{appState.profile[item.name]}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="card" style={graphCard}>
          <div style={graphHead}>
            <div>
              <div style={miniLabel}>Skill profile</div>
              <h3 style={graphTitle}>Hexagon skill graph</h3>
            </div>
            <strong>{Math.round(avg(topSkills))}%</strong>
          </div>

          <HexagonGraph skills={topSkills} />

          <div style={skillList}>
            {topSkills.map((skill) => (
              <div key={skill.id} style={skillRow}>
                <span>{skill.name}</span>
                <strong>{skill.level}%</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HexagonGraph({ skills }) {
  const size = 270;
  const center = size / 2;
  const radius = 92;
  const labels = normalizeSkills(skills);
  const points = labels.map((skill, index) => {
    const angle = -Math.PI / 2 + (index * Math.PI * 2) / 6;
    const skillRadius = radius * (skill.level / 100);
    return `${center + Math.cos(angle) * skillRadius},${center + Math.sin(angle) * skillRadius}`;
  });
  const outer = labels.map((_, index) => {
    const angle = -Math.PI / 2 + (index * Math.PI * 2) / 6;
    return `${center + Math.cos(angle) * radius},${center + Math.sin(angle) * radius}`;
  });

  return (
    <svg viewBox={`0 0 ${size} ${size}`} style={{ width: '100%', maxWidth: 320, margin: '0 auto' }}>
      {[0.35, 0.7, 1].map((scale) => (
        <polygon
          key={scale}
          points={outer
            .map((point) => point.split(',').map(Number))
            .map(([x, y]) => `${center + (x - center) * scale},${center + (y - center) * scale}`)
            .join(' ')}
          fill="none"
          stroke="#dbe7e5"
          strokeWidth="1"
        />
      ))}
      {outer.map((point) => (
        <line key={point} x1={center} y1={center} x2={point.split(',')[0]} y2={point.split(',')[1]} stroke="#e2e8f0" />
      ))}
      <polygon points={points.join(' ')} fill="rgba(15, 118, 110, 0.22)" stroke="var(--primary)" strokeWidth="3" />
      {labels.map((skill, index) => {
        const angle = -Math.PI / 2 + (index * Math.PI * 2) / 6;
        return (
          <text
            key={skill.name}
            x={center + Math.cos(angle) * 122}
            y={center + Math.sin(angle) * 122}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--text-soft)"
            fontSize="11"
            fontWeight="700"
          >
            {skill.name.slice(0, 12)}
          </text>
        );
      })}
    </svg>
  );
}

function normalizeSkills(skills) {
  const fallback = [
    { name: 'Frontend', level: 70 },
    { name: 'Backend', level: 65 },
    { name: 'DSA', level: 60 },
    { name: 'Database', level: 68 },
    { name: 'Communication', level: 72 },
    { name: 'Projects', level: 66 },
  ];
  return [...skills, ...fallback].slice(0, 6);
}

function avg(skills) {
  if (!skills.length) return 0;
  return skills.reduce((total, skill) => total + Number(skill.level || 0), 0) / skills.length;
}

const head = { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 20, flexWrap: 'wrap' };
const title = { fontSize: 34, marginBottom: 8 };
const sub = { color: 'var(--text-soft)', lineHeight: 1.7 };
const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: 18 };
const heroCard = { padding: 24, display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 };
const avatar = { width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 22, flexShrink: 0 };
const name = { fontSize: 26, marginBottom: 6 };
const role = { color: 'var(--text-soft)' };
const infoCard = { padding: 24 };
const infoRow = { display: 'grid', gridTemplateColumns: 'minmax(140px, 180px) minmax(0, 1fr)', alignItems: 'center', gap: 18, padding: '14px 0', borderBottom: '1px solid var(--border)' };
const infoLabel = { display: 'inline-flex', alignItems: 'center', gap: 10, color: 'var(--text-soft)', fontWeight: 700 };
const infoValue = { fontWeight: 700 };
const graphCard = { padding: 24, height: 'fit-content' };
const graphHead = { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14, marginBottom: 14 };
const miniLabel = { fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-faint)', marginBottom: 6, fontWeight: 800 };
const graphTitle = { fontSize: 20 };
const skillList = { display: 'grid', gap: 10, marginTop: 12 };
const skillRow = { display: 'flex', justifyContent: 'space-between', gap: 12, padding: '10px 12px', borderRadius: 12, background: 'var(--surface-muted)', color: 'var(--text-soft)' };
