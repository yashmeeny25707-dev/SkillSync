import { useMemo, useState } from 'react';
import {
  Bell,
  CheckCircle2,
  FileSearch,
  FileText,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  ScanSearch,
  Target,
  TrendingUp,
  UserCircle2,
} from 'lucide-react';
import Skills from './Skills';
import Portfolio from './Portfolio';
import Interview from './Interview';
import ResumeAnalyzer from './ResumeAnalyzer';
import ResumeGenerator from './ResumeGenerator';
import Notifications from './Notifications';
import Profile from './Profile';

const navItems = [
  { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'skills', label: 'Skills', icon: ScanSearch },
  { id: 'portfolio', label: 'Portfolio', icon: FolderKanban },
  { id: 'interview', label: 'AI Interview', icon: UserCircle2 },
  { id: 'generator', label: 'Resume Builder', icon: FileText },
  { id: 'resume', label: 'Resume Analyzer', icon: FileSearch },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'profile', label: 'Profile', icon: UserCircle2 },
];

export default function Dashboard({ navigate, logout, appState }) {
  const [sub, setSub] = useState('home');

  const content = useMemo(() => {
    switch (sub) {
      case 'skills':
        return <Skills appState={appState} />;
      case 'portfolio':
        return <Portfolio appState={appState} />;
      case 'interview':
        return <Interview />;
      case 'generator':
        return <ResumeGenerator appState={appState} />;
      case 'resume':
        return <ResumeAnalyzer appState={appState} />;
      case 'notifications':
        return <Notifications />;
      case 'profile':
        return <Profile appState={appState} />;
      default:
        return <HomePanel setSub={setSub} appState={appState} />;
    }
  }, [sub, appState]);

  return (
    <div className="dashboard-shell" style={dashboardShell}>
      <aside className="dashboard-sidebar" style={sidebar}>
        <div>
          <div style={sidebarBrand}>SkillSync</div>
          <div style={sidebarGroup}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = sub === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSub(item.id)}
                  style={{
                    ...sideBtn,
                    ...(active ? sideBtnActive : {}),
                  }}
                >
                  <Icon size={17} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          style={{ ...sideBtn, marginTop: 12 }}
          onClick={() => {
            logout();
            navigate('landing');
          }}
        >
          <LogOut size={17} />
          <span>Sign out</span>
        </button>
      </aside>

      <main className="dashboard-main" style={mainContent}>{content}</main>
    </div>
  );
}

function HomePanel({ setSub, appState }) {
  const cards = [
    {
      title: 'Industry readiness',
      value: '78%',
      sub: 'Competency score',
      primary: true,
    },
    {
      title: 'Interview confidence',
      value: '82',
      sub: 'AI mock practice',
    },
    {
      title: 'Visible skills',
      value: String(appState.skills.length),
      sub: `${appState.skills.filter((skill) => skill.verified).length} verified`,
    },
    {
      title: 'Portfolio projects',
      value: String(appState.projects.length),
      sub: `${appState.projects.filter((project) => project.status === 'Live').length} live`,
    },
  ];

  const hasResume = appState.resumeMeta.generated;

  return (
    <div className="fade-up">
      <div style={headWrap}>
        <div>
          <h1 style={pageTitle}>Dashboard</h1>
          <p style={pageSub}>
            Track the shift from marks-driven identity to competency-driven readiness.
            Skills, projects, interviews, and resume quality all feed one growth loop.
          </p>
        </div>
        <div style={readinessBadge}>
          <Target size={17} />
          <span>Placement target: 90%</span>
        </div>
      </div>

      <div style={homeGrid}>
        <div style={metricsWrap}>
          {cards.map((card) => (
            <div
              key={card.title}
              className="card"
              style={{
                ...metricCard,
                ...(card.primary ? metricPrimary : {}),
              }}
            >
              <div style={metricLabel}>{card.title}</div>
              <div style={metricValue}>{card.value}</div>
              <div style={metricSub}>{card.sub}</div>
            </div>
          ))}
        </div>

        <div className="card" style={actionCard}>
          <div style={actionHead}>
            <h3 style={panelTitle}>Resume workflow</h3>
            <p style={panelText}>
              Build a resume once, then run analysis on the latest generated version.
            </p>
          </div>

          <div style={actionList}>
            <div style={actionRow}>
              <div style={stepIcon}>
                <FileText size={16} />
              </div>
              <div>
                <div style={actionTitle}>1. Create resume</div>
                <div style={actionDesc}>Use one structured form to produce a clean resume.</div>
              </div>
              <button className="btn btn-secondary" onClick={() => setSub('generator')}>
                Open
              </button>
            </div>

            <div style={actionRow}>
              <div style={stepIcon}>
                <CheckCircle2 size={16} />
              </div>
              <div>
                <div style={actionTitle}>2. Analyze latest version</div>
                <div style={actionDesc}>
                  Analyzer checks generated resume against SkillSync profile data.
                </div>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => setSub('resume')}
                disabled={!hasResume}
                style={!hasResume ? disabledBtn : {}}
              >
                Analyze
              </button>
            </div>
          </div>

          {!hasResume && (
            <div style={helperNote}>
              No generated resume yet. Create one in Resume Builder to unlock analysis.
            </div>
          )}
        </div>
      </div>

      <div style={insightGrid}>
        <div className="card" style={insightCard}>
          <div style={insightIcon}>
            <TrendingUp size={18} />
          </div>
          <div>
            <h3 style={panelTitle}>Core insight</h3>
            <p style={panelText}>
              The real problem is not lack of knowledge, but lack of visible,
              verifiable skills. SkillSync makes competency growth measurable.
            </p>
          </div>
        </div>

        <div className="card" style={insightCard}>
          <div style={insightIcon}>
            <Target size={18} />
          </div>
          <div>
            <h3 style={panelTitle}>Readiness parameters</h3>
            <div style={chipRow}>
              {['Technical skills', 'Projects', 'Communication', 'Interview readiness', 'Industry exposure', 'Consistency'].map((item) => (
                <span key={item} style={smallChip}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const dashboardShell = {
  display: 'grid',
  gridTemplateColumns: '260px minmax(0, 1fr)',
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #f8fafc 0%, #eef5f4 100%)',
};

const sidebar = {
  padding: 22,
  borderRight: '1px solid var(--border)',
  background: 'rgba(255,255,255,0.74)',
  backdropFilter: 'blur(18px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'sticky',
  top: 0,
  height: '100vh',
};

const sidebarBrand = {
  fontFamily: 'Manrope, sans-serif',
  fontSize: 24,
  fontWeight: 800,
  marginBottom: 22,
};

const sidebarGroup = {
  display: 'grid',
  gap: 8,
};

const sideBtn = {
  border: '1px solid transparent',
  background: 'transparent',
  color: 'var(--text-soft)',
  padding: '11px 13px',
  borderRadius: 12,
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  fontWeight: 600,
  textAlign: 'left',
};

const sideBtnActive = {
  background: 'var(--primary)',
  color: '#fff',
  boxShadow: '0 14px 28px rgba(15, 118, 110, 0.18)',
};

const mainContent = {
  padding: '30px clamp(20px, 4vw, 42px)',
  minWidth: 0,
};

const headWrap = {
  marginBottom: 24,
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: 18,
  flexWrap: 'wrap',
};

const pageTitle = {
  fontSize: 'clamp(1.9rem, 3vw, 2.45rem)',
  marginBottom: 8,
};

const pageSub = {
  color: 'var(--text-soft)',
  lineHeight: 1.7,
  maxWidth: 660,
};

const readinessBadge = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '10px 14px',
  borderRadius: 999,
  background: 'var(--accent-soft)',
  color: 'var(--accent)',
  border: '1px solid #dbe7ff',
  fontWeight: 700,
  fontSize: 13,
};

const homeGrid = {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1.15fr) minmax(320px, 0.85fr)',
  gap: 18,
  marginBottom: 18,
};

const metricsWrap = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: 16,
};

const metricCard = {
  padding: 24,
  minHeight: 142,
};

const metricPrimary = {
  background: 'linear-gradient(135deg, #159a8c 0%, #11877b 100%)',
  color: '#fff',
  border: 'none',
};

const metricLabel = {
  fontSize: 12,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom: 12,
  opacity: 0.82,
  fontWeight: 700,
};

const metricValue = {
  fontFamily: 'Manrope, sans-serif',
  fontSize: 38,
  fontWeight: 700,
  lineHeight: 1.05,
};

const metricSub = {
  marginTop: 10,
  fontSize: 14,
  opacity: 0.8,
};

const actionCard = {
  padding: 24,
  height: 'fit-content',
};

const actionHead = {
  marginBottom: 18,
};

const panelTitle = {
  fontSize: 20,
  marginBottom: 8,
};

const panelText = {
  color: 'var(--text-soft)',
  lineHeight: 1.7,
  fontSize: 14,
};

const actionList = {
  display: 'grid',
  gap: 12,
};

const actionRow = {
  display: 'grid',
  gridTemplateColumns: '40px 1fr auto',
  alignItems: 'center',
  gap: 12,
  padding: 16,
  borderRadius: 14,
  background: 'var(--surface-muted)',
  border: '1px solid var(--border)',
};

const stepIcon = {
  width: 40,
  height: 40,
  borderRadius: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'var(--primary-soft)',
  color: 'var(--primary)',
};

const actionTitle = {
  fontWeight: 700,
  marginBottom: 4,
};

const actionDesc = {
  color: 'var(--text-soft)',
  fontSize: 14,
  lineHeight: 1.6,
};

const helperNote = {
  marginTop: 14,
  padding: 14,
  borderRadius: 14,
  background: '#f8fbff',
  border: '1px solid #dde9f7',
  color: 'var(--text-soft)',
  fontSize: 14,
  lineHeight: 1.6,
};

const disabledBtn = {
  opacity: 0.5,
  pointerEvents: 'none',
};

const insightGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: 18,
};

const insightCard = {
  padding: 22,
  display: 'grid',
  gridTemplateColumns: '44px 1fr',
  gap: 14,
};

const insightIcon = {
  width: 44,
  height: 44,
  borderRadius: 14,
  background: 'var(--primary-soft)',
  color: 'var(--primary)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const chipRow = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
};

const smallChip = {
  padding: '7px 10px',
  borderRadius: 999,
  background: 'var(--surface-muted)',
  border: '1px solid var(--border)',
  color: 'var(--text-soft)',
  fontSize: 12,
  fontWeight: 700,
};
