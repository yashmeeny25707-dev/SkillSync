import { BriefcaseBusiness } from 'lucide-react';
import { useMemo, useState } from 'react';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import './index.css';

const emptyResume = {
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

const initialProfile = {
  fullName: 'Rahul Sharma',
  initials: 'RS',
  role: 'Student profile',
  program: 'B.Tech Computer Science, 3rd year',
  college: 'Delhi Technological University',
  email: 'rahul@college.edu',
  phone: '+91 98765 43210',
  location: 'Delhi, India',
};

const initialSkills = [
  { id: 1, name: 'React', level: 88, type: 'Frontend', verified: true },
  { id: 2, name: 'Node.js', level: 72, type: 'Backend', verified: false },
  { id: 3, name: 'DSA', level: 65, type: 'Problem Solving', verified: false },
  { id: 4, name: 'SQL', level: 80, type: 'Database', verified: true },
  { id: 5, name: 'Communication', level: 74, type: 'Soft skill', verified: false },
  { id: 6, name: 'System Design', level: 54, type: 'Architecture', verified: false },
];

const initialProjects = [
  {
    id: 1,
    name: 'EduTrack Platform',
    desc: 'Learning management platform with student progress tracking and analytics.',
    tags: 'React, Node.js, PostgreSQL',
    status: 'Live',
    github: 'https://github.com/rahul/edutrack',
    live: 'https://edutrack.example.com',
    impact: 'Improved student progress visibility with dashboard analytics.',
  },
  {
    id: 2,
    name: 'FinBot',
    desc: 'Personal finance assistant with categorized expense insights.',
    tags: 'Next.js, Python, OpenAI',
    status: 'Live',
    github: 'https://github.com/rahul/finbot',
    live: 'https://finbot.example.com',
    impact: 'Automated expense summaries and reduced manual tracking time.',
  },
  {
    id: 3,
    name: 'ShopIQ',
    desc: 'E-commerce project with product catalog, cart, and dashboard.',
    tags: 'React, Express, MongoDB',
    status: 'Pending',
    github: 'https://github.com/rahul/shopiq',
    live: '',
    impact: 'Built full-stack commerce flows with admin inventory views.',
  },
];

export default function App() {
  const [page, setPage] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [resumeData, setResumeData] = useState(emptyResume);
  const [profile, setProfile] = useState(initialProfile);
  const [skills, setSkills] = useState(initialSkills);
  const [projects, setProjects] = useState(initialProjects);
  const [resumeMeta, setResumeMeta] = useState({
    generated: false,
    version: 0,
    lastGeneratedAt: null,
  });

  const navigate = (nextPage) => {
    setPage(nextPage);
    window.scrollTo(0, 0);
  };

  const login = () => {
    setIsLoggedIn(true);
    setPage('dashboard');
    window.scrollTo(0, 0);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setPage('landing');
    window.scrollTo(0, 0);
  };

  const saveResume = (data) => {
    setResumeData(data);
  };

  const markResumeGenerated = () => {
    setResumeMeta((prev) => ({
      generated: true,
      version: prev.version + 1,
      lastGeneratedAt: new Date().toISOString(),
    }));
  };

  const saveProfile = (data) => {
    const initials = data.fullName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('');

    setProfile({ ...data, initials: initials || 'ST' });
  };

  const addSkill = (skill) => {
    setSkills((prev) => [{ ...skill, id: skill.id || Date.now() }, ...prev]);
  };

  const updateSkill = (id, updates) => {
    setSkills((prev) =>
      prev.map((skill) => (skill.id === id ? { ...skill, ...updates } : skill))
    );
  };

  const addProject = (project) => {
    setProjects((prev) => [{ ...project, id: project.id || Date.now() }, ...prev]);
  };

  const updateProject = (id, updates) => {
    setProjects((prev) =>
      prev.map((project) => (project.id === id ? { ...project, ...updates } : project))
    );
  };

  const appState = useMemo(
    () => ({
      resumeData,
      saveResume,
      resumeMeta,
      markResumeGenerated,
      profile,
      saveProfile,
      skills,
      addSkill,
      updateSkill,
      projects,
      addProject,
      updateProject,
    }),
    [resumeData, resumeMeta, profile, skills, projects]
  );

  const showTopNav = page === 'landing' || page === 'auth';

  return (
    <div className="app-root">
      {showTopNav && (
        <TopNav
          isLoggedIn={isLoggedIn}
          navigate={navigate}
          logout={logout}
        />
      )}

      {page === 'landing' && <Landing navigate={navigate} />}
      {page === 'auth' && <Auth navigate={navigate} login={login} />}

      {page === 'dashboard' && (
        <Dashboard
          navigate={navigate}
          logout={logout}
          appState={appState}
        />
      )}
    </div>
  );
}

function TopNav({ isLoggedIn, navigate, logout }) {
  return (
    <header className="top-nav">
      <button className="brand-button" onClick={() => navigate('landing')}>
        <span className="brand-mark">
          <BriefcaseBusiness size={18} />
        </span>
        <span>SkillSync</span>
      </button>

      <div className="top-nav-actions">
        {isLoggedIn ? (
          <button className="btn btn-secondary" onClick={logout}>
            Sign out
          </button>
        ) : (
          <>
            <button className="btn btn-secondary" onClick={() => navigate('auth')}>
              Log in
            </button>
            <button className="btn btn-primary" onClick={() => navigate('auth')}>
              Get started
            </button>
          </>
        )}
      </div>
    </header>
  );
}
