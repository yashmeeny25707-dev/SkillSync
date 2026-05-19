import { useState } from 'react';
import { LockKeyhole, Mail, School, User } from 'lucide-react';

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  college: '',
  password: '',
};

export default function Auth({ navigate, login }) {
  const [tab, setTab] = useState('login');
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const handle = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login();
    }, 800);
  };

  return (
    <div className="page-shell" style={pageWrap}>
      <div className="card" style={authCard}>
        <button style={brand} onClick={() => navigate('landing')}>
          SkillSync
        </button>

        <div style={tabs}>
          <button
            style={{ ...tabBtn, ...(tab === 'login' ? tabBtnActive : {}) }}
            onClick={() => setTab('login')}
          >
            Log in
          </button>
          <button
            style={{ ...tabBtn, ...(tab === 'signup' ? tabBtnActive : {}) }}
            onClick={() => setTab('signup')}
          >
            Sign up
          </button>
        </div>

        {tab === 'login' ? (
          <>
            <h1 style={title}>Welcome back</h1>
            <p style={sub}>Continue your preparation in a clean workspace.</p>

            <Field
              icon={Mail}
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handle}
              placeholder="you@college.edu"
            />
            <Field
              icon={LockKeyhole}
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handle}
              placeholder="Enter password"
            />

            <button className="btn btn-primary" style={fullBtn} onClick={submit} disabled={loading}>
              {loading ? 'Logging in...' : 'Log in'}
            </button>

            <p style={switchText}>
              No account?{' '}
              <button style={inlineBtn} onClick={() => setTab('signup')}>
                Create one
              </button>
            </p>
          </>
        ) : (
          <>
            <h1 style={title}>Create account</h1>
            <p style={sub}>Start with a simple setup and open your dashboard.</p>

            <div style={twoCol}>
              <Field
                icon={User}
                label="First name"
                name="firstName"
                value={form.firstName}
                onChange={handle}
                placeholder="Rahul"
              />
              <Field
                icon={User}
                label="Last name"
                name="lastName"
                value={form.lastName}
                onChange={handle}
                placeholder="Sharma"
              />
            </div>

            <Field
              icon={Mail}
              label="College email"
              name="email"
              type="email"
              value={form.email}
              onChange={handle}
              placeholder="you@college.edu"
            />
            <Field
              icon={School}
              label="College"
              name="college"
              value={form.college}
              onChange={handle}
              placeholder="Delhi Technological University"
            />
            <Field
              icon={LockKeyhole}
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handle}
              placeholder="Minimum 8 characters"
            />

            <button className="btn btn-primary" style={fullBtn} onClick={submit} disabled={loading}>
              {loading ? 'Creating account...' : 'Create account'}
            </button>

            <p style={switchText}>
              Already have an account?{' '}
              <button style={inlineBtn} onClick={() => setTab('login')}>
                Log in
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, name, value, onChange, placeholder, type = 'text' }) {
  return (
    <div style={fieldWrap}>
      <label style={labelStyle}>{label}</label>
      <div style={inputWrap}>
        <Icon size={16} color="var(--text-faint)" />
        <input
          className="input"
          style={inputStyle}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

const pageWrap = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px',
};

const authCard = {
  width: '100%',
  maxWidth: 460,
  padding: 28,
};

const brand = {
  border: 'none',
  background: 'transparent',
  color: 'var(--text)',
  fontFamily: 'Manrope, sans-serif',
  fontSize: 22,
  fontWeight: 700,
  marginBottom: 22,
};

const tabs = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 6,
  background: 'var(--bg-soft)',
  padding: 6,
  borderRadius: 14,
  marginBottom: 24,
};

const tabBtn = {
  border: 'none',
  background: 'transparent',
  color: 'var(--text-soft)',
  padding: '11px 14px',
  borderRadius: 10,
  fontWeight: 600,
};

const tabBtnActive = {
  background: '#fff',
  color: 'var(--primary)',
  boxShadow: 'var(--shadow-sm)',
};

const title = {
  fontSize: 30,
  marginBottom: 8,
};

const sub = {
  color: 'var(--text-soft)',
  lineHeight: 1.7,
  marginBottom: 22,
};

const twoCol = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 12,
};

const fieldWrap = {
  marginBottom: 14,
};

const labelStyle = {
  display: 'block',
  fontSize: 13,
  fontWeight: 600,
  marginBottom: 7,
  color: 'var(--text)',
};

const inputWrap = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  border: '1px solid var(--border)',
  background: 'var(--surface-muted)',
  borderRadius: 14,
  padding: '0 12px',
};

const inputStyle = {
  border: 'none',
  background: 'transparent',
  boxShadow: 'none',
  paddingLeft: 0,
};

const fullBtn = {
  width: '100%',
  marginTop: 6,
  justifyContent: 'center',
};

const switchText = {
  textAlign: 'center',
  marginTop: 16,
  color: 'var(--text-soft)',
  fontSize: 14,
};

const inlineBtn = {
  border: 'none',
  background: 'transparent',
  color: 'var(--primary)',
  fontWeight: 600,
  padding: 0,
};
