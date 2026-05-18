import { useState } from 'react';

const s = {
  page: { minHeight: '100vh', paddingTop: '64px', background: 'var(--teal-lighter)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' },
  card: { background: 'white', borderRadius: '24px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)', padding: '2.5rem', maxWidth: '440px', width: '100%' },
  logo: { fontFamily: 'Syne', fontSize: '1.3rem', fontWeight: 800, color: 'var(--teal)', textAlign: 'center', marginBottom: '1.5rem', cursor: 'pointer' },
  tabs: { display: 'flex', background: 'var(--teal-lighter)', borderRadius: '10px', padding: '4px', marginBottom: '2rem' },
  tab: (active) => ({ flex: 1, padding: '9px', borderRadius: '8px', border: 'none', background: active ? 'white' : 'transparent', color: active ? 'var(--teal)' : 'var(--muted)', fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer', fontFamily: 'DM Sans', transition: 'all 0.2s', boxShadow: active ? '0 2px 8px rgba(13,158,138,0.12)' : 'none' }),
  title: { fontFamily: 'Syne', fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.75px', marginBottom: '0.4rem' },
  sub: { fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '1.75rem' },
  label: { display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text)', marginBottom: '6px' },
  input: { width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid var(--border)', background: 'var(--teal-lighter)', fontSize: '0.93rem', color: 'var(--text)', fontFamily: 'DM Sans', outline: 'none', transition: 'all 0.2s' },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  group: { marginBottom: '1.1rem' },
  btn: (loading) => ({ width: '100%', padding: '13px', borderRadius: '10px', background: loading ? 'var(--muted)' : 'var(--teal)', color: 'white', border: 'none', fontSize: '0.95rem', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'DM Sans', transition: 'all 0.2s', marginTop: '4px' }),
  toggle: { textAlign: 'center', marginTop: '1.25rem', fontSize: '0.88rem', color: 'var(--muted)' },
  link: { color: 'var(--teal)', fontWeight: 600, cursor: 'pointer' },
  divider: { textAlign: 'center', margin: '1.25rem 0', position: 'relative', fontSize: '0.82rem', color: 'var(--inactive)' },
  divLine: { position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'var(--border)' },
  divText: { position: 'relative', background: 'white', padding: '0 1rem' },
  googleBtn: { width: '100%', padding: '11px', borderRadius: '10px', border: '1.5px solid var(--border)', background: 'white', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: 'var(--text)', transition: 'all 0.2s' },
};

// ✅ FocusInput ko component ke BAHAR define kiya — yahi fix hai
// Pehle yeh Auth ke andar tha, jisse har re-render pe naya component banta tha
// aur input ka focus chala jaata tha
const FocusInput = ({ name, type = 'text', placeholder, value, onChange }) => (
  <input
    name={name}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    style={s.input}
    onFocus={e => { e.target.style.borderColor = 'var(--teal)'; e.target.style.background = 'white'; e.target.style.boxShadow = '0 0 0 3px rgba(13,158,138,0.1)'; }}
    onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.background = 'var(--teal-lighter)'; e.target.style.boxShadow = 'none'; }}
  />
);

export default function Auth({ navigate, login }) {
  const [tab, setTab] = useState('login');
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', college: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); login(); }, 1200);
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.logo} onClick={() => navigate('landing')}>SkillSync</div>

        <div style={s.tabs}>
          <button style={s.tab(tab === 'login')} onClick={() => setTab('login')}>Log In</button>
          <button style={s.tab(tab === 'signup')} onClick={() => setTab('signup')}>Sign Up</button>
        </div>

        {tab === 'login' ? (
          <>
            <div style={s.title}>Welcome back</div>
            <p style={s.sub}>Continue your placement journey.</p>
            <div style={s.group}>
              <label style={s.label}>Email</label>
              <FocusInput name="email" type="email" placeholder="you@college.edu" value={form.email} onChange={handle} />
            </div>
            <div style={s.group}>
              <label style={s.label}>Password</label>
              <FocusInput name="password" type="password" placeholder="••••••••" value={form.password} onChange={handle} />
            </div>
            <div style={{ textAlign: 'right', marginBottom: '1.25rem' }}>
              <span style={s.link} onClick={() => {}}>Forgot password?</span>
            </div>
            <button style={s.btn(loading)} onClick={submit}>{loading ? 'Logging in...' : 'Log In'}</button>
            <div style={s.divider}><div style={s.divLine} /><span style={s.divText}>or continue with</span></div>
            <button style={s.googleBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
            <div style={s.toggle}>No account? <span style={s.link} onClick={() => setTab('signup')}>Sign Up</span></div>
          </>
        ) : (
          <>
            <div style={s.title}>Get started</div>
            <p style={s.sub}>Create your free SkillSync account.</p>
            <div style={s.row}>
              <div style={s.group}>
                <label style={s.label}>First Name</label>
                <FocusInput name="firstName" placeholder="Rahul" value={form.firstName} onChange={handle} />
              </div>
              <div style={s.group}>
                <label style={s.label}>Last Name</label>
                <FocusInput name="lastName" placeholder="Sharma" value={form.lastName} onChange={handle} />
              </div>
            </div>
            <div style={s.group}>
              <label style={s.label}>College Email</label>
              <FocusInput name="email" type="email" placeholder="you@college.edu" value={form.email} onChange={handle} />
            </div>
            <div style={s.group}>
              <label style={s.label}>College / University</label>
              <FocusInput name="college" placeholder="Delhi Technological University" value={form.college} onChange={handle} />
            </div>
            <div style={s.group}>
              <label style={s.label}>Password</label>
              <FocusInput name="password" type="password" placeholder="Min 8 characters" value={form.password} onChange={handle} />
            </div>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--muted)', cursor: 'pointer' }}>
                <input type="checkbox" style={{ accentColor: 'var(--teal)' }} /> I agree to the <span style={s.link}>Terms</span> &amp; <span style={s.link}>Privacy Policy</span>
              </label>
            </div>
            <button style={s.btn(loading)} onClick={submit}>{loading ? 'Creating account...' : 'Create Account'}</button>
            <div style={s.toggle}>Have an account? <span style={s.link} onClick={() => setTab('login')}>Log In</span></div>
          </>
        )}
      </div>
    </div>
  );
}