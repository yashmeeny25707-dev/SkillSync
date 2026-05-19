import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  FileText,
  Layers3,
  Sparkles,
  TrendingUp,
  UserRoundSearch,
} from 'lucide-react';

const features = [
  {
    icon: TrendingUp,
    title: 'Skill Tracking',
    desc: 'Measurable competency growth over time with proficiency levels, verified badges, and visible progress.',
  },
  {
    icon: FileText,
    title: 'Portfolio Builder',
    desc: 'Organizes projects, links, technologies, and outcomes into a professional student portfolio.',
  },
  {
    icon: UserRoundSearch,
    title: 'AI Mock Interviews',
    desc: 'Structured practice for technical and HR rounds to reduce interview anxiety and build confidence.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    desc: 'Visual readiness scores, performance trends, resume insights, and improvement direction.',
  },
];

const stats = [
  { value: '85.4%', label: 'students feel education is marks-focused' },
  { value: '83.3%', label: 'prefer skill-based evaluation' },
  { value: '64.6%', label: 'report lack of project-based learning' },
  { value: '77.1%', label: 'want more industry interaction' },
];

const trustPoints = ['Marks to mastery', 'Competency visibility', 'Continuous feedback'];

export default function Landing({ navigate }) {
  return (
    <div className="page-shell fade-up">
      <section style={heroWrap}>
        <div className="section-container">
          <div style={heroInner}>
            <div style={heroText}>
              <div style={eyebrow}>
                <Sparkles size={16} />
                <span>Career readiness platform</span>
              </div>

              <h1 style={heroTitle}>
                Shift from marks to mastery
              </h1>

              <p style={heroDesc}>
                SkillSync bridges academic learning and industry readiness through
                skill tracking, portfolio building, AI interview practice, and a live
                readiness dashboard.
              </p>

              <div style={heroActions}>
                <button className="btn btn-primary" onClick={() => navigate('auth')}>
                  Open prototype <ArrowRight size={16} />
                </button>
                <button className="btn btn-secondary" onClick={() => navigate('auth')}>
                  View dashboard
                </button>
              </div>

              <div style={trustRow}>
                {trustPoints.map((point) => (
                  <span key={point} style={trustItem}>
                    <CheckCircle2 size={15} />
                    {point}
                  </span>
                ))}
              </div>
            </div>

            <div style={previewCard} className="card">
              <div style={windowBar}>
                <div style={dots}>
                  <span style={{ ...dot, background: '#ff5f57' }} />
                  <span style={{ ...dot, background: '#febc2e' }} />
                  <span style={{ ...dot, background: '#28c840' }} />
                </div>
                <span style={windowTitle}>SkillSync — Competency Dashboard</span>
              </div>

              <div style={previewLayout}>
                <aside style={previewSidebar}>
                  {['Dashboard', 'Skills', 'Portfolio', 'AI Interview', 'Resume'].map((item, index) => (
                    <div
                      key={item}
                      style={{
                        ...previewNavItem,
                        ...(index === 0 ? previewNavItemActive : {}),
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </aside>

                <div style={previewContent}>
                  {[
                    { title: 'Readiness', value: '78%', sub: 'Industry target 90%', primary: true },
                    { title: 'Confidence', value: '82', sub: 'Interview practice' },
                    { title: 'Skills', value: '14', sub: 'Visible mastery' },
                    { title: 'Projects', value: '6', sub: 'Portfolio proof' },
                  ].map((card, index) => (
                    <div
                      key={index}
                      style={{
                        ...previewMetric,
                        ...(card.primary ? previewMetricPrimary : {}),
                      }}
                    >
                      <div style={previewMetricTitle}>{card.title}</div>
                      <div style={previewMetricValue}>{card.value}</div>
                      <div style={previewMetricSub}>{card.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={featureSection}>
        <div className="section-container">
          <div style={sectionHead}>
            <div style={sectionKicker}>Final solution</div>
            <h2 style={sectionTitle}>Introducing SkillSync</h2>
            <p style={sectionDesc}>
              A responsive web platform purpose-built to bridge academic learning
              and industry readiness, competency by competency.
            </p>
          </div>

          <div className="professional-grid-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="card" style={featureCard}>
                  <div style={featureIcon}>
                    <Icon size={18} />
                  </div>
                  <h3 style={featureTitle}>{feature.title}</h3>
                  <p style={featureDesc}>{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section style={statsSection}>
        <div className="section-container">
          <div style={sectionHead}>
            <div style={sectionKicker}>Research synthesis</div>
            <h2 style={sectionTitle}>The gap is measurable</h2>
            <p style={sectionDesc}>
              Students are academically strong but still feel underprepared for
              real interviews, practical tasks, and industry expectations.
            </p>
          </div>

          <div className="professional-grid-4">
            {stats.map((item) => (
              <div key={item.value} className="card" style={statCard}>
                <div style={statValue}>{item.value}</div>
                <p style={featureDesc}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={loopSection}>
        <div className="section-container">
          <div className="card" style={loopCard}>
            <div>
              <div style={sectionKicker}>System flow</div>
              <h2 style={sectionTitle}>A continuous improvement loop</h2>
              <p style={sectionDesc}>
                Every upload, project update, skill change, and interview practice
                feeds back into the student readiness score.
              </p>
            </div>
            <div style={loopSteps}>
              {['Record competency', 'Action upload', 'Notify insights', 'Alert students'].map((step) => (
                <div key={step} style={loopStep}>
                  <Layers3 size={16} />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={ctaSection}>
        <div className="section-container">
          <div className="card" style={ctaCard}>
            <div>
              <div style={sectionKicker}>Validation & feedback</div>
              <h3 style={{ ...sectionTitle, marginBottom: 8 }}>What early testers said</h3>
              <p style={sectionDesc}>
                Students found the competency tracking motivating, the portfolio
                section professional, and interview prep immediately useful.
              </p>
            </div>
            <button className="btn btn-primary" onClick={() => navigate('auth')}>
              Open SkillSync <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

const heroWrap = {
  padding: '70px 0 44px',
};

const heroInner = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 430px), 1fr))',
  gap: 36,
  alignItems: 'center',
};

const heroText = {
  padding: '10px 0',
};

const eyebrow = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  background: 'var(--primary-soft)',
  color: 'var(--primary)',
  padding: '10px 14px',
  borderRadius: 999,
  border: '1px solid var(--border)',
  fontSize: 13,
  fontWeight: 600,
  marginBottom: 20,
};

const heroTitle = {
  fontSize: 'clamp(2.65rem, 5.8vw, 4.8rem)',
  lineHeight: 1,
  marginBottom: 18,
  maxWidth: 760,
};

const heroDesc = {
  maxWidth: 560,
  color: 'var(--text-soft)',
  fontSize: 17,
  lineHeight: 1.75,
};

const heroActions = {
  display: 'flex',
  gap: 12,
  marginTop: 28,
  flexWrap: 'wrap',
};

const trustRow = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 10,
  marginTop: 18,
};

const trustItem = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 7,
  color: 'var(--text-soft)',
  fontSize: 14,
  fontWeight: 600,
};

const previewCard = {
  overflow: 'hidden',
  borderRadius: 18,
  boxShadow: 'var(--shadow-lg)',
};

const windowBar = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '16px 18px',
  borderBottom: '1px solid var(--border)',
  background: '#fbfdfc',
};

const dots = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
};

const dot = {
  width: 10,
  height: 10,
  borderRadius: '50%',
  display: 'inline-block',
};

const windowTitle = {
  fontSize: 14,
  color: 'var(--text-soft)',
  fontWeight: 600,
};

const previewLayout = {
  display: 'grid',
  gridTemplateColumns: 'minmax(140px, 168px) minmax(260px, 1fr)',
  minHeight: 350,
};

const previewSidebar = {
  padding: 18,
  borderRight: '1px solid var(--border)',
  background: '#f8fcfb',
};

const previewNavItem = {
  padding: '11px 14px',
  borderRadius: 12,
  color: 'var(--text-soft)',
  fontSize: 14,
  fontWeight: 500,
  marginBottom: 6,
};

const previewNavItemActive = {
  background: 'var(--primary)',
  color: '#fff',
};

const previewContent = {
  padding: 18,
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 14,
};

const previewMetric = {
  border: '1px solid var(--border)',
  borderRadius: 14,
  padding: 20,
  background: '#ffffff',
};

const previewMetricPrimary = {
  background: 'linear-gradient(135deg, #159a8c 0%, #12887c 100%)',
  color: '#fff',
};

const previewMetricTitle = {
  fontSize: 12,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom: 10,
  opacity: 0.82,
  fontWeight: 700,
};

const previewMetricValue = {
  fontSize: 34,
  fontFamily: 'Manrope, sans-serif',
  fontWeight: 700,
  lineHeight: 1.05,
};

const previewMetricSub = {
  marginTop: 8,
  fontSize: 13,
  opacity: 0.8,
};

const featureSection = {
  padding: '30px 0 18px',
};

const sectionHead = {
  maxWidth: 640,
  marginBottom: 22,
};

const sectionKicker = {
  fontSize: 13,
  color: 'var(--primary)',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom: 10,
};

const sectionTitle = {
  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
  marginBottom: 10,
};

const sectionDesc = {
  color: 'var(--text-soft)',
  lineHeight: 1.7,
  fontSize: 15,
};

const featureCard = {
  padding: 22,
  minHeight: 190,
};

const featureIcon = {
  width: 40,
  height: 40,
  borderRadius: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'var(--primary-soft)',
  color: 'var(--primary)',
  marginBottom: 16,
};

const featureTitle = {
  fontSize: 16,
  marginBottom: 8,
};

const featureDesc = {
  fontSize: 14,
  lineHeight: 1.7,
  color: 'var(--text-soft)',
};

const ctaSection = {
  padding: '18px 0 64px',
};

const statsSection = {
  padding: '28px 0 18px',
};

const statCard = {
  padding: 22,
  minHeight: 150,
};

const statValue = {
  fontFamily: 'Manrope, sans-serif',
  fontSize: 34,
  fontWeight: 800,
  color: 'var(--primary)',
  marginBottom: 8,
};

const loopSection = {
  padding: '18px 0',
};

const loopCard = {
  padding: 28,
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 0.9fr) minmax(280px, 1.1fr)',
  gap: 24,
  alignItems: 'center',
};

const loopSteps = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
  gap: 12,
};

const loopStep = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
  padding: '14px 16px',
  borderRadius: 14,
  background: 'var(--surface-muted)',
  border: '1px solid var(--border)',
  color: 'var(--text-soft)',
  fontWeight: 700,
};

const ctaCard = {
  padding: '28px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 18,
  flexWrap: 'wrap',
};
