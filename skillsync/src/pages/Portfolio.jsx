import { useState } from 'react';
import { ExternalLink, GitBranch, Link2, Plus } from 'lucide-react';

const emptyProject = {
  name: '',
  desc: '',
  tags: '',
  status: 'Live',
  github: '',
  live: '',
  impact: '',
};

export default function Portfolio({ appState }) {
  const [draft, setDraft] = useState(emptyProject);
  const [selectedId, setSelectedId] = useState(appState.projects[0]?.id || null);
  const [showForm, setShowForm] = useState(false);

  const selected = appState.projects.find((project) => project.id === selectedId) || appState.projects[0];

  const handle = (event) => {
    const { name, value } = event.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  };

  const submit = (event) => {
    event.preventDefault();
    if (!draft.name.trim()) return;
    const id = Date.now();
    const project = {
      ...draft,
      id,
      name: draft.name.trim(),
      desc: draft.desc.trim(),
    };
    appState.addProject(project);
    setSelectedId(id);
    setDraft(emptyProject);
    setShowForm(false);
  };

  return (
    <div className="fade-up">
      <div style={head}>
        <div>
          <h1 style={title}>Portfolio</h1>
          <p style={sub}>Make real work visible with project proof, links, technologies, and outcomes.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm((value) => !value)}>
          <Plus size={16} />
          {showForm ? 'Close form' : 'Add project'}
        </button>
      </div>

      {showForm && (
        <form className="card" style={formCard} onSubmit={submit}>
          <div style={formGrid}>
            <Field label="Project name">
              <input className="input" name="name" value={draft.name} onChange={handle} />
            </Field>
            <Field label="Status">
              <select className="select" name="status" value={draft.status} onChange={handle}>
                <option>Live</option>
                <option>Pending</option>
                <option>In progress</option>
              </select>
            </Field>
            <Field label="Tech stack">
              <input
                className="input"
                name="tags"
                value={draft.tags}
                onChange={handle}
                placeholder="React, Node.js, MongoDB"
              />
            </Field>
            <Field label="GitHub URL">
              <input className="input" name="github" value={draft.github} onChange={handle} />
            </Field>
            <Field label="Live URL">
              <input className="input" name="live" value={draft.live} onChange={handle} />
            </Field>
          </div>

          <Field label="Short description">
            <textarea className="textarea" name="desc" value={draft.desc} onChange={handle} />
          </Field>
          <Field label="Impact / result">
            <textarea className="textarea" name="impact" value={draft.impact} onChange={handle} />
          </Field>

          <button className="btn btn-primary" type="submit">
            <Plus size={16} />
            Save project
          </button>
        </form>
      )}

      <div className="card" style={publicCard}>
        <div>
          <div style={miniLabel}>Public portfolio link</div>
          <div style={linkText}>skillsync.app/{appState.profile.fullName.toLowerCase().replaceAll(' ', '-')}</div>
        </div>

        <button
          className="btn btn-secondary"
          onClick={() => navigator.clipboard?.writeText('https://skillsync.app/portfolio')}
        >
          <Link2 size={16} />
          Copy link
        </button>
      </div>

      <div style={layout}>
        <div style={grid}>
          {appState.projects.map((project) => (
            <button
              key={project.id}
              className="card"
              style={{
                ...card,
                ...(selected?.id === project.id ? selectedCard : {}),
              }}
              onClick={() => setSelectedId(project.id)}
            >
              <div style={projectTop}>
                <div>
                  <h3 style={projectTitle}>{project.name}</h3>
                  <p style={projectDesc}>{project.desc}</p>
                </div>
                <span
                  style={{
                    ...statusPill,
                    color: project.status === 'Live' ? 'var(--success)' : 'var(--warning)',
                    background: project.status === 'Live' ? '#edf9f3' : '#fff6e7',
                  }}
                >
                  {project.status}
                </span>
              </div>

              <div style={tags}>
                {splitTags(project.tags).map((tag) => (
                  <span key={tag} style={tagPill}>
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>

        {selected && (
          <div className="card" style={detailCard}>
            <div style={miniLabel}>Selected project</div>
            <h2 style={detailTitle}>{selected.name}</h2>
            <p style={detailText}>{selected.desc}</p>
            <p style={detailText}>{selected.impact}</p>

            <div style={projectActions}>
              <a className="btn btn-secondary" href={selected.github || '#'} target="_blank">
                <GitBranch size={16} />
                GitHub
              </a>
              <a className="btn btn-primary" href={selected.live || '#'} target="_blank">
                <ExternalLink size={16} />
                Live
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label style={field}>
      <span style={labelStyle}>{label}</span>
      {children}
    </label>
  );
}

function splitTags(tags) {
  return String(tags || '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
}

const head = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: 14,
  marginBottom: 20,
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
  gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
  gap: 14,
};

const field = {
  display: 'block',
  marginBottom: 14,
};

const labelStyle = {
  display: 'block',
  fontSize: 13,
  fontWeight: 700,
  marginBottom: 7,
};

const publicCard = {
  padding: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 16,
  marginBottom: 18,
  flexWrap: 'wrap',
};

const miniLabel = {
  fontSize: 12,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: 'var(--text-faint)',
  marginBottom: 6,
  fontWeight: 700,
};

const linkText = {
  fontWeight: 700,
  color: 'var(--primary)',
};

const layout = {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) minmax(280px, 360px)',
  gap: 18,
};

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: 18,
};

const card = {
  padding: 24,
  textAlign: 'left',
  cursor: 'pointer',
};

const selectedCard = {
  borderColor: 'var(--primary)',
  boxShadow: '0 16px 34px rgba(15, 118, 110, 0.12)',
};

const projectTop = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: 12,
  marginBottom: 16,
};

const projectTitle = {
  fontSize: 18,
  marginBottom: 8,
};

const projectDesc = {
  color: 'var(--text-soft)',
  lineHeight: 1.7,
  fontSize: 14,
};

const statusPill = {
  alignSelf: 'flex-start',
  padding: '7px 10px',
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 700,
};

const tags = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
};

const tagPill = {
  padding: '7px 10px',
  borderRadius: 999,
  background: 'var(--primary-soft)',
  color: 'var(--primary)',
  fontSize: 12,
  fontWeight: 700,
};

const detailCard = {
  padding: 24,
  height: 'fit-content',
  position: 'sticky',
  top: 24,
};

const detailTitle = {
  fontSize: 24,
  marginBottom: 10,
};

const detailText = {
  color: 'var(--text-soft)',
  lineHeight: 1.7,
  marginBottom: 14,
};

const projectActions = {
  display: 'flex',
  gap: 10,
  flexWrap: 'wrap',
};
