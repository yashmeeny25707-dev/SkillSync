import { useMemo, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  FileSearch,
  LoaderCircle,
  ScanSearch,
  UploadCloud,
} from 'lucide-react';
import * as pdfjs from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const recommendedKeywords = [
  'React',
  'Node.js',
  'SQL',
  'REST APIs',
  'Agile',
  'System Design',
  'Problem Solving',
  'Team Collaboration',
  'Performance Optimization',
  'Communication',
];

const sectionChecks = [
  { key: 'summary', label: 'Summary', pattern: /summary|profile|objective/i },
  { key: 'skills', label: 'Skills', pattern: /skills|technical skills|technologies/i },
  { key: 'experience', label: 'Experience', pattern: /experience|internship|work history/i },
  { key: 'education', label: 'Education', pattern: /education|degree|university|college/i },
  { key: 'projects', label: 'Projects', pattern: /projects|portfolio|applications/i },
  { key: 'contact', label: 'Contact', pattern: /@|\+?\d[\d\s-]{7,}/i },
];

export default function ResumeAnalyzer({ appState }) {
  const [mode, setMode] = useState('idle');
  const [uploadedResume, setUploadedResume] = useState(null);
  const [uploadError, setUploadError] = useState('');

  const generatedText = useMemo(() => resumeToText(appState?.resumeData), [appState?.resumeData]);
  const generatedAvailable = Boolean(appState?.resumeMeta?.generated && generatedText.trim());
  const analysisText = uploadedResume?.text || generatedText;
  const sourceLabel = uploadedResume?.name || (generatedAvailable ? 'SkillSync generated resume' : '');

  const analysis = useMemo(
    () => analyzeResume(analysisText, appState?.skills || [], appState?.projects || []),
    [analysisText, appState?.skills, appState?.projects]
  );

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setMode('loading');
    setUploadError('');

    try {
      const text = await extractResumeText(file);
      if (!text.trim()) {
        throw new Error('Text could not be extracted from this file.');
      }

      setUploadedResume({ name: file.name, text });
      setMode('done');
    } catch (error) {
      setUploadedResume(null);
      setMode('idle');
      setUploadError(error.message || 'Could not read this resume file.');
    }
  };

  const runGeneratedAnalysis = () => {
    if (!analysisText.trim()) return;
    setMode('loading');
    setTimeout(() => setMode('done'), 800);
  };

  return (
    <div className="fade-up">
      <h1 style={title}>Resume Analyzer</h1>
      <p style={sub}>
        Upload a resume PDF/TXT or analyze the latest SkillSync-generated resume.
        The analyzer checks structure, keywords, skills, projects, and measurable impact.
      </p>

      <div style={uploadGrid}>
        <label className="card" style={uploadCard}>
          <div style={uploadIcon}>
            <UploadCloud size={22} />
          </div>
          <div>
            <div style={uploadTitle}>Upload resume</div>
            <div style={uploadText}>PDF or TXT file. SkillSync resume PDFs are supported.</div>
          </div>
          <input
            type="file"
            accept=".pdf,.txt,text/plain,application/pdf"
            onChange={handleFile}
            style={{ display: 'none' }}
          />
        </label>

        <div className="card" style={sourceCard}>
          <div style={flowStep}>
            <div style={flowIcon}>
              <ScanSearch size={16} />
            </div>
            <div>
              <div style={flowTitle}>Current source</div>
              <div style={flowDesc}>{sourceLabel || 'No resume selected yet'}</div>
            </div>
          </div>

          <button
            className="btn btn-primary"
            onClick={runGeneratedAnalysis}
            disabled={!analysisText.trim() || mode === 'loading'}
          >
            {mode === 'loading' ? 'Analyzing...' : 'Analyze resume'}
          </button>
        </div>
      </div>

      {uploadError && (
        <div className="card" style={errorCard}>
          <AlertCircle size={18} color="var(--danger)" />
          <span>{uploadError}</span>
        </div>
      )}

      {mode === 'loading' && (
        <div className="card" style={loadingCard}>
          <LoaderCircle size={20} style={{ animation: 'spin 1s linear infinite' }} />
          <span>Reading resume and calculating score...</span>
        </div>
      )}

      {mode !== 'done' && !analysisText.trim() && (
        <div className="card" style={emptyCard}>
          <div style={emptyIconWrap}>
            <FileSearch size={20} />
          </div>
          <div>
            <div style={emptyTitle}>Upload a resume to begin</div>
            <div style={emptyDesc}>
              You can also create a resume in Resume Builder, then come back here to analyze it.
            </div>
          </div>
        </div>
      )}

      {mode === 'done' && (
        <>
          <div style={topGrid}>
            <div className="card" style={scoreCard}>
              <div style={scoreLabel}>Resume quality score</div>
              <div style={scoreValue}>{analysis.score}%</div>
              <div style={scoreSub}>{analysis.verdict}</div>
            </div>

            <div className="card" style={breakdownCard}>
              <h3 style={smallTitle}>Analysis summary</h3>
              <div style={summaryList}>
                <SummaryRow label="Sections found" value={`${analysis.sectionsFound} / 6`} />
                <SummaryRow label="Matched keywords" value={String(analysis.foundKeywords.length)} />
                <SummaryRow label="Matched SkillSync skills" value={String(analysis.presentSkills.length)} />
                <SummaryRow label="Project signals" value={String(analysis.projectSignals)} />
                <SummaryRow label="Impact metrics" value={analysis.hasMetrics ? 'Present' : 'Missing'} />
              </div>
            </div>
          </div>

          <div style={resultGrid}>
            <ResultCard title="Strengths" items={analysis.strengths} type="success" empty="No strong points detected yet." />
            <ResultCard title="Recommended changes" items={analysis.improvements} type="warning" empty="No critical changes required." />
          </div>

          <div style={resultGrid}>
            <KeywordCard title="Keywords found" items={analysis.foundKeywords} pillStyle={greenPill} empty="No target keywords found yet." />
            <KeywordCard title="Keywords missing" items={analysis.missingKeywords} pillStyle={amberPill} empty="All recommended keywords are covered." />
          </div>
        </>
      )}
    </div>
  );
}

async function extractResumeText(file) {
  if (file.type === 'text/plain' || file.name.toLowerCase().endsWith('.txt')) {
    return file.text();
  }

  if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
    const buffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: buffer }).promise;
    const pages = [];

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();
      pages.push(content.items.map((item) => item.str).join(' '));
    }

    return pages.join('\n');
  }

  throw new Error('Please upload a PDF or TXT resume.');
}

function resumeToText(resume = {}) {
  return [
    resume.fullName,
    resume.title,
    resume.email,
    resume.phone,
    resume.location,
    resume.summary,
    resume.skills,
    resume.experience,
    resume.education,
    resume.projects,
    resume.achievements,
  ]
    .filter(Boolean)
    .join('\n');
}

function analyzeResume(text, skills, projects) {
  const normalized = text.toLowerCase();
  const foundKeywords = recommendedKeywords.filter((keyword) =>
    normalized.includes(keyword.toLowerCase())
  );
  const missingKeywords = recommendedKeywords.filter((keyword) => !foundKeywords.includes(keyword));
  const presentSkills = skills
    .map((skill) => skill.name)
    .filter((skill) => normalized.includes(skill.toLowerCase()));
  const sectionsFound = sectionChecks.filter((section) => section.pattern.test(text)).length;
  const hasMetrics = /\b\d+[%xkK+]?\b/.test(text);
  const projectSignals = ['project', 'dashboard', 'api', 'platform', 'analytics', ...projects.map((p) => p.name)]
    .filter(Boolean)
    .filter((signal) => normalized.includes(String(signal).toLowerCase())).length;
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  const score = Math.min(
    100,
    20 +
      sectionsFound * 8 +
      foundKeywords.length * 4 +
      Math.min(presentSkills.length, 6) * 3 +
      Math.min(projectSignals, 5) * 3 +
      (hasMetrics ? 10 : 0) +
      (wordCount >= 180 ? 8 : 0)
  );

  const strengths = [];
  const improvements = [];

  if (sectionsFound >= 5) strengths.push('Resume has most important sections.');
  else improvements.push('Add clear sections for summary, skills, experience, education, and projects.');

  if (foundKeywords.length >= 5) strengths.push('Good keyword coverage for ATS screening.');
  else improvements.push('Add more role-relevant keywords from the missing keyword list.');

  if (presentSkills.length >= 3) strengths.push('Resume reflects SkillSync profile skills.');
  else improvements.push('Include more skills from your SkillSync profile.');

  if (projectSignals >= 2) strengths.push('Project work is visible in the resume.');
  else improvements.push('Add stronger project descriptions with tech stack and outcomes.');

  if (hasMetrics) strengths.push('Uses measurable impact language.');
  else improvements.push('Add numbers such as %, users, response time, scale, or improvement.');

  if (wordCount < 120) improvements.push('Resume content is too short; add more detail to experience and projects.');
  if (wordCount > 700) improvements.push('Resume may be too long; tighten bullets and remove repetition.');

  return {
    score,
    verdict:
      score >= 80
        ? 'Strong resume. Polish wording and tailor it to each job.'
        : score >= 60
          ? 'Good base. Add stronger keywords, metrics, and project detail.'
          : 'Needs improvement. Build clearer sections and add measurable project impact.',
    foundKeywords,
    missingKeywords,
    presentSkills,
    sectionsFound,
    projectSignals,
    hasMetrics,
    strengths,
    improvements,
  };
}

function SummaryRow({ label, value }) {
  return (
    <div style={summaryRow}>
      <span style={summaryLabel}>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ResultCard({ title, items, type, empty }) {
  return (
    <div className="card" style={resultCard}>
      <h3 style={smallTitle}>{title}</h3>
      <div style={stack}>
        {items.length ? (
          items.map((item) => <StatusRow key={item} type={type} text={item} />)
        ) : (
          <span style={mutedText}>{empty}</span>
        )}
      </div>
    </div>
  );
}

function KeywordCard({ title, items, pillStyle, empty }) {
  return (
    <div className="card" style={resultCard}>
      <h3 style={smallTitle}>{title}</h3>
      <div style={pillWrap}>
        {items.length ? items.map((item) => <span key={item} style={pillStyle}>{item}</span>) : <span style={mutedText}>{empty}</span>}
      </div>
    </div>
  );
}

function StatusRow({ type, text }) {
  const success = type === 'success';
  return (
    <div
      style={{
        ...statusRow,
        background: success ? '#f3fbf6' : '#fff8ef',
        borderColor: success ? '#d8efdf' : '#f4dfb8',
      }}
    >
      {success ? <CheckCircle2 size={16} color="var(--success)" /> : <AlertCircle size={16} color="var(--warning)" />}
      <span>{text}</span>
    </div>
  );
}

const title = { fontSize: '1.9rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '8px' };
const sub = { color: 'var(--text-soft)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '24px', maxWidth: 860 };
const uploadGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 18, marginBottom: 18 };
const uploadCard = { padding: 22, display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' };
const uploadIcon = { width: 48, height: 48, borderRadius: 16, background: 'var(--primary-soft)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const uploadTitle = { fontWeight: 800, marginBottom: 4 };
const uploadText = { color: 'var(--text-soft)', lineHeight: 1.6, fontSize: 14 };
const sourceCard = { padding: 22, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' };
const errorCard = { padding: 16, display: 'flex', alignItems: 'center', gap: 10, color: 'var(--danger)', marginBottom: 18 };
const emptyCard = { padding: '20px', display: 'flex', alignItems: 'flex-start', gap: '14px' };
const emptyIconWrap = { width: '42px', height: '42px', borderRadius: '14px', background: 'var(--primary-soft)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 };
const emptyTitle = { fontSize: '1rem', fontWeight: 700, marginBottom: '6px' };
const emptyDesc = { color: 'var(--text-soft)', fontSize: '0.9rem', lineHeight: 1.7 };
const flowStep = { display: 'flex', alignItems: 'center', gap: '12px', minWidth: '220px' };
const flowIcon = { width: '38px', height: '38px', borderRadius: '12px', background: 'var(--accent-soft)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 };
const flowTitle = { fontSize: '0.78rem', color: 'var(--text-faint)', fontWeight: 700, marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.05em' };
const flowDesc = { fontSize: '0.92rem', fontWeight: 800 };
const loadingCard = { padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px', color: 'var(--text-soft)' };
const topGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '18px', marginBottom: '18px' };
const scoreCard = { padding: '24px', background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))', color: '#ffffff', border: 'none' };
const scoreLabel = { fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.82, marginBottom: '10px', fontWeight: 700 };
const scoreValue = { fontSize: '3.4rem', fontWeight: 800, lineHeight: 1, marginBottom: '10px' };
const scoreSub = { fontSize: '0.9rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.82)' };
const breakdownCard = { padding: '22px' };
const smallTitle = { fontSize: '1rem', fontWeight: 800, marginBottom: '14px' };
const summaryList = { display: 'grid', gap: '10px' };
const summaryRow = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', padding: '12px 14px', background: 'var(--surface-muted)', border: '1px solid var(--border)', borderRadius: '14px' };
const summaryLabel = { color: 'var(--text-soft)', fontSize: '0.88rem' };
const resultGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '18px', marginBottom: '18px' };
const resultCard = { padding: '22px' };
const stack = { display: 'grid', gap: '10px' };
const statusRow = { display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px 14px', border: '1px solid', borderRadius: '14px', fontSize: '0.88rem', lineHeight: 1.6 };
const pillWrap = { display: 'flex', flexWrap: 'wrap', gap: '10px' };
const greenPill = { padding: '8px 12px', borderRadius: '999px', background: '#f3fbf6', color: 'var(--success)', border: '1px solid #d8efdf', fontSize: '0.82rem', fontWeight: 700 };
const amberPill = { padding: '8px 12px', borderRadius: '999px', background: '#fff8ef', color: 'var(--warning)', border: '1px solid #f4dfb8', fontSize: '0.82rem', fontWeight: 700 };
const mutedText = { color: 'var(--text-soft)', fontSize: '0.9rem', lineHeight: 1.7 };
