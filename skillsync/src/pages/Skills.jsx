import { useState } from 'react';
import {
  BadgeCheck,
  BarChart3,
  Brain,
  Code2,
  Database,
  MessageSquareText,
  Plus,
} from 'lucide-react';

const emptySkill = {
  name: '',
  level: 70,
  type: 'Frontend',
  verified: false,
};

const iconMap = {
  Frontend: Code2,
  Backend: Database,
  Database,
  'Problem Solving': Brain,
  'Soft skill': MessageSquareText,
  Architecture: BarChart3,
};

const skillTypes = Object.keys(iconMap);

export default function Skills({ appState }) {
  const [draft, setDraft] = useState(emptySkill);
  const [showForm, setShowForm] = useState(false);

  const handle = (event) => {
    const { name, value, type, checked } = event.target;
    setDraft((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const submit = (event) => {
    event.preventDefault();
    if (!draft.name.trim()) return;
    appState.addSkill({
      ...draft,
      name: draft.name.trim(),
      level: Number(draft.level),
    });
    setDraft(emptySkill);
    setShowForm(false);
  };

  return (
    <div className="fade-up">
      <div style={head}>
        <div>
          <h1 style={title}>Skills</h1>
          <p style={sub}>Add skills, update proficiency, and make competency growth visible over time.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm((value) => !value)}>
          <Plus size={16} />
          {showForm ? 'Close form' : 'Add skill'}
        </button>
      </div>

      {showForm && (
        <form className="card" style={formCard} onSubmit={submit}>
          <div style={formGrid}>
            <Field label="Skill name">
              <input
                className="input"
                name="name"
                value={draft.name}
                onChange={handle}
                placeholder="e.g. JavaScript"
              />
            </Field>

            <Field label="Category">
              <select className="select" name="type" value={draft.type} onChange={handle}>
                {skillTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </Field>

            <Field label={`Level: ${draft.level}%`}>
              <input
                className="input"
                name="level"
                type="range"
                min="0"
                max="100"
                value={draft.level}
                onChange={handle}
                style={{ paddingInline: 0 }}
              />
            </Field>

            <label style={checkWrap}>
              <input
                name="verified"
                type="checkbox"
                checked={draft.verified}
                onChange={handle}
              />
              Mark as verified
            </label>
          </div>

          <button className="btn btn-primary" type="submit">
            <Plus size={16} />
            Save skill
          </button>
        </form>
      )}

      <div style={grid}>
        {appState.skills.map((skill) => {
          const Icon = iconMap[skill.type] || Code2;
          return (
            <div key={skill.id} className="card" style={card}>
              <div style={topRow}>
                <div style={iconWrap}>
                  <Icon size={18} />
                </div>
                {skill.verified && (
                  <span style={verifiedPill}>
                    <BadgeCheck size={14} />
                    Verified
                  </span>
                )}
              </div>

              <h3 style={skillTitle}>{skill.name}</h3>
              <p style={typeText}>{skill.type}</p>

              <div style={barTrack}>
                <div style={{ ...barFill, width: `${skill.level}%` }} />
              </div>

              <div style={levelRow}>
                <span style={levelText}>Proficiency</span>
                <strong>{skill.level}%</strong>
              </div>

              <input
                className="input"
                type="range"
                min="0"
                max="100"
                value={skill.level}
                onChange={(event) =>
                  appState.updateSkill(skill.id, { level: Number(event.target.value) })
                }
                style={{ paddingInline: 0, marginTop: 14 }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label>
      <span style={labelStyle}>{label}</span>
      {children}
    </label>
  );
}

const head = {
  marginBottom: 20,
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: 16,
  flexWrap: 'wrap',
};

const title = {
  fontSize: 34,
  marginBottom: 8,
};

const sub = {
  color: 'var(--text-soft)',
  lineHeight: 1.7,
};

const formCard = {
  padding: 20,
  marginBottom: 18,
};

const formGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: 14,
  marginBottom: 16,
};

const labelStyle = {
  display: 'block',
  fontSize: 13,
  fontWeight: 700,
  marginBottom: 7,
};

const checkWrap = {
  alignSelf: 'end',
  minHeight: 46,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  color: 'var(--text-soft)',
  fontWeight: 700,
};

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
  gap: 18,
};

const card = {
  padding: 24,
};

const topRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 18,
};

const iconWrap = {
  width: 42,
  height: 42,
  borderRadius: 14,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'var(--primary-soft)',
  color: 'var(--primary)',
};

const verifiedPill = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  padding: '6px 10px',
  borderRadius: 999,
  background: '#edf9f3',
  color: 'var(--success)',
  fontSize: 12,
  fontWeight: 700,
};

const skillTitle = {
  fontSize: 18,
  marginBottom: 6,
};

const typeText = {
  color: 'var(--text-soft)',
  fontSize: 14,
  marginBottom: 16,
};

const barTrack = {
  height: 8,
  borderRadius: 999,
  background: 'var(--bg-soft)',
  overflow: 'hidden',
  marginBottom: 10,
};

const barFill = {
  height: '100%',
  borderRadius: 999,
  background: 'linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%)',
};

const levelRow = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const levelText = {
  color: 'var(--text-soft)',
  fontSize: 14,
};
