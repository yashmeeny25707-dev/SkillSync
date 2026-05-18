import { useState } from 'react';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import './index.css';

export default function App() {
  const [page, setPage] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = (p) => {
    setPage(p);
    window.scrollTo(0, 0);
  };

  const login = () => {
    setIsLoggedIn(true);
    navigate('dashboard');
  };

  const logout = () => {
    setIsLoggedIn(false);
    navigate('landing');
  };

  return (
    <>
      <Nav page={page} navigate={navigate} isLoggedIn={isLoggedIn} logout={logout} />
      {page === 'landing' && <Landing navigate={navigate} />}
      {page === 'auth' && <Auth navigate={navigate} login={login} />}
      {(page === 'dashboard' || isLoggedIn) && page !== 'landing' && page !== 'auth' && (
        <Dashboard navigate={navigate} logout={logout} currentPage={page} setPage={setPage} />
      )}
      {page === 'dashboard' && !isLoggedIn && (
        <Dashboard navigate={navigate} logout={logout} currentPage="dashboard" setPage={setPage} />
      )}
    </>
  );
}

function Nav({ page, navigate, isLoggedIn, logout }) {
  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
    background: 'rgba(244,251,250,0.9)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid var(--border)',
    padding: '0 2rem', height: '64px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  };

  return (
    <nav style={navStyle}>
      <div
        onClick={() => navigate('landing')}
        style={{ fontFamily: 'Syne', fontSize: '1.4rem', fontWeight: 800, color: 'var(--teal)', cursor: 'pointer', letterSpacing: '-0.5px' }}
      >
        Skill<span style={{ color: 'var(--text)' }}>Sync</span>
      </div>

      <div style={{ display: 'flex', gap: '4px' }}>
        {['landing', 'dashboard'].map(p => (
          <button key={p} onClick={() => navigate(p === 'landing' ? 'landing' : 'dashboard')}
            style={{
              padding: '8px 16px', borderRadius: '8px', border: 'none',
              background: page === p ? 'var(--teal-light)' : 'transparent',
              color: page === p ? 'var(--teal)' : 'var(--muted)',
              fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer',
              fontFamily: 'DM Sans', transition: 'all 0.2s',
            }}>
            {p === 'landing' ? 'Home' : 'Dashboard'}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        {isLoggedIn ? (
          <button onClick={logout} style={btnOutline}>Sign Out</button>
        ) : (
          <>
            <button onClick={() => navigate('auth')} style={btnOutline}>Log In</button>
            <button onClick={() => navigate('auth')} style={btnPrimary}>Get Started</button>
          </>
        )}
      </div>
    </nav>
  );
}

const btnOutline = {
  padding: '8px 18px', borderRadius: '8px',
  border: '1.5px solid var(--teal)', color: 'var(--teal)',
  background: 'transparent', fontSize: '0.88rem', fontWeight: 600,
  cursor: 'pointer', fontFamily: 'DM Sans',
};
const btnPrimary = {
  padding: '8px 20px', borderRadius: '8px',
  background: 'var(--teal)', color: 'white',
  border: 'none', fontSize: '0.88rem', fontWeight: 600,
  cursor: 'pointer', fontFamily: 'DM Sans',
};