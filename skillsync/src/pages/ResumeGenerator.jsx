import { useMemo, useRef, useState } from 'react';
import { Download, Eye, FileText, PencilLine, Save } from 'lucide-react';

const emptyForm = {
  fullName: '',
  title: '',
  email: '',
  phone: '',
  location: '',
  linkedin: '',
  github: '',
  summary: '',
  skills: '',
  experience: '',
  education: '',
  projects: '',
  achievements: '',
};

export default function ResumeGenerator({ appState }) {
  const [form, setForm] = useState(appState.resumeData || emptyForm);
  const [tab, setTab] = useState('edit');
  const [isDownloading, setIsDownloading] = useState(false);
  const resumeRef = useRef(null);

  const canPreview = form.fullName.trim() && form.email.trim();

  const handle = (e) => {
    const next = { ...form, [e.target.name]: e.target.value };
    setForm(next);
    appState.saveResume(next);
  };

  const generate = () => {
    appState.saveResume(form);
    appState.markResumeGenerated();
    setTab('preview');
  };

  const skillList = useMemo(
    () =>
      form.skills
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    [form.skills]
  );

  const downloadResumePdf = async () => {
    if (!resumeRef.current || isDownloading) return;

    setIsDownloading(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const fileName = `${slugify(form.fullName || 'student')}-resume.pdf`;

      await html2pdf()
        .set({
          margin: [8, 8, 8, 8],
          filename: fileName,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff',
          },
          jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait',
          },
          pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
        })
        .from(resumeRef.current)
        .save();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div>
      <h1 style={title}>Resume Builder</h1>
      <p style={sub}>
        Create your SkillSync resume first. This version will be used by Resume Analyzer.
      </p>

      <div style={tabs}>
        <button
          style={{ ...tabBtn, ...(tab === 'edit' ? tabBtnActive : {}) }}
          onClick={() => setTab('edit')}
        >
          <PencilLine size={16} />
          Edit
        </button>
        <button
          style={{ ...tabBtn, ...(tab === 'preview' ? tabBtnActive : {}) }}
          onClick={() => setTab('preview')}
        >
          <Eye size={16} />
          Preview
        </button>
      </div>

      {tab === 'edit' ? (
        <>
          <div style={formGrid}>
            <div className="card" style={formCard}>
              <SectionTitle icon={FileText} title="Basic details" />
              <div style={twoCol}>
                <Field label="Full name" name="fullName" value={form.fullName} onChange={handle} />
                <Field label="Role / title" name="title" value={form.title} onChange={handle} />
              </div>
              <div style={twoCol}>
                <Field label="Email" name="email" value={form.email} onChange={handle} />
                <Field label="Phone" name="phone" value={form.phone} onChange={handle} />
              </div>
              <div style={twoCol}>
                <Field label="Location" name="location" value={form.location} onChange={handle} />
                <Field label="LinkedIn" name="linkedin" value={form.linkedin} onChange={handle} />
              </div>
              <Field label="GitHub" name="github" value={form.github} onChange={handle} />
              <Field
                label="Professional summary"
                name="summary"
                value={form.summary}
                onChange={handle}
                textarea
              />
            </div>

            <div className="card" style={formCard}>
              <SectionTitle icon={Save} title="Resume content" />
              <Field
                label="Skills"
                name="skills"
                value={form.skills}
                onChange={handle}
                placeholder="React, Node.js, SQL, Communication"
              />
              <Field
                label="Experience"
                name="experience"
                value={form.experience}
                onChange={handle}
                textarea
                placeholder="Company | Role | Dates"
              />
              <Field
                label="Education"
                name="education"
                value={form.education}
                onChange={handle}
                textarea
              />
              <Field
                label="Projects"
                name="projects"
                value={form.projects}
                onChange={handle}
                textarea
              />
              <Field
                label="Achievements"
                name="achievements"
                value={form.achievements}
                onChange={handle}
                textarea
              />
            </div>
          </div>

          <div style={builderActions}>
            <button className="btn btn-primary" onClick={generate} disabled={!canPreview}>
              Generate resume
            </button>
          </div>
        </>
      ) : (
        <div>
          <div style={previewTop}>
            <div>
              <h3 style={previewTitle}>Resume preview</h3>
              <p style={previewSub}>
                Latest generated version is ready for analysis and download.
              </p>
            </div>
            <div style={previewActions}>
              <button className="btn btn-secondary" onClick={() => setTab('edit')}>
                Back to edit
              </button>
              <button className="btn btn-primary" onClick={downloadResumePdf} disabled={isDownloading}>
                <Download size={16} />
                {isDownloading ? 'Preparing PDF...' : 'Download resume'}
              </button>
            </div>
          </div>

          <div ref={resumeRef} className="resume-pdf-sheet" style={resumePaper}>
            <div style={resumeHeader}>
              <h2 style={resumeName}>{form.fullName || 'Your Name'}</h2>
              <div style={resumeRole}>{form.title || 'Role / Title'}</div>
              <div style={resumeContact}>
                {[form.email, form.phone, form.location, form.linkedin, form.github]
                  .filter(Boolean)
                  .join('  •  ')}
              </div>
            </div>

            <ResumeSection title="Professional Summary" content={form.summary} />
            <ResumeSection
              title="Skills"
              content={
                skillList.length ? (
                  <div style={skillWrap}>
                    {skillList.map((skill) => (
                      <span key={skill} style={skillPill}>
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  ''
                )
              }
            />
            <ResumeSection title="Experience" content={formatLines(form.experience)} />
            <ResumeSection title="Education" content={formatLines(form.education)} />
            <ResumeSection title="Projects" content={formatLines(form.projects)} />
            <ResumeSection title="Achievements" content={formatLines(form.achievements)} />
          </div>
        </div>
      )}
    </div>
  );
}

function SectionTitle({ icon: Icon, title }) {
  return (
    <div style={sectionTitleRow}>
      <div style={sectionIcon}>
        <Icon size={16} />
      </div>
      <h3 style={sectionTitle}>{title}</h3>
    </div>
  );
}

function Field({ label, name, value, onChange, textarea = false, placeholder = '' }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={labelStyle}>{label}</label>
      {textarea ? (
        <textarea
          className="textarea"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : (
        <input
          className="input"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

function ResumeSection({ title, content }) {
  if (!content || (typeof content === 'string' && !content.trim())) return null;

  return (
    <div style={resumeSection}>
      <div style={resumeSectionTitle}>{title}</div>
      <div style={resumeBody}>{content}</div>
    </div>
  );
}

function formatLines(text) {
  if (!text?.trim()) return '';
  return text.split('\n').filter(Boolean).map((line, i) => (
    <p key={i} style={lineText}>
      {line}
    </p>
  ));
}

function slugify(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const title = {
  fontSize: 34,
  marginBottom: 8,
};

const sub = {
  color: 'var(--text-soft)',
  lineHeight: 1.7,
  marginBottom: 20,
};

const tabs = {
  display: 'inline-flex',
  gap: 6,
  background: 'var(--bg-soft)',
  padding: 6,
  borderRadius: 14,
  marginBottom: 18,
};

const tabBtn = {
  border: 'none',
  background: 'transparent',
  color: 'var(--text-soft)',
  padding: '10px 14px',
  borderRadius: 10,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  fontWeight: 600,
};

const tabBtnActive = {
  background: '#fff',
  color: 'var(--primary)',
};

const formGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
  gap: 18,
};

const formCard = {
  padding: 24,
};

const twoCol = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: 12,
};

const sectionTitleRow = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  marginBottom: 18,
};

const sectionIcon = {
  width: 34,
  height: 34,
  borderRadius: 12,
  background: 'var(--primary-soft)',
  color: 'var(--primary)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const sectionTitle = {
  fontSize: 18,
};

const labelStyle = {
  display: 'block',
  fontSize: 13,
  fontWeight: 600,
  marginBottom: 7,
};

const builderActions = {
  marginTop: 18,
};

const previewTop = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: 16,
  marginBottom: 18,
};

const previewTitle = {
  fontSize: 24,
  marginBottom: 6,
};

const previewSub = {
  color: 'var(--text-soft)',
};

const previewActions = {
  display: 'flex',
  gap: 10,
  flexWrap: 'wrap',
};

const resumePaper = {
  padding: '40px 44px',
  width: '794px',
  maxWidth: '100%',
  minHeight: '1123px',
  background: '#fff',
  border: '1px solid var(--border)',
  borderRadius: 0,
  boxShadow: 'var(--shadow-sm)',
  color: '#111827',
};

const resumeHeader = {
  borderBottom: '1px solid var(--border)',
  paddingBottom: 20,
  marginBottom: 22,
};

const resumeName = {
  fontSize: 34,
  marginBottom: 6,
};

const resumeRole = {
  fontWeight: 600,
  color: 'var(--text-soft)',
  marginBottom: 10,
};

const resumeContact = {
  color: 'var(--text-soft)',
  lineHeight: 1.8,
  fontSize: 14,
};

const resumeSection = {
  marginBottom: 22,
};

const resumeSectionTitle = {
  fontSize: 12,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: 'var(--text-faint)',
  fontWeight: 700,
  marginBottom: 10,
};

const resumeBody = {
  lineHeight: 1.8,
  color: 'var(--text)',
};

const lineText = {
  margin: '0 0 6px',
};

const skillWrap = {
  display: 'flex',
  gap: 8,
  flexWrap: 'wrap',
};

const skillPill = {
  padding: '7px 10px',
  borderRadius: 999,
  background: 'var(--surface-muted)',
  border: '1px solid var(--border)',
  fontSize: 13,
  fontWeight: 600,
};
