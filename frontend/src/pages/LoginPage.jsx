import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setStatus({ type: 'error', message: 'Please enter both email and password.' });
      return;
    }
    setStatus({
      type: 'success',
      message: 'Form validated! Ready to connect to Node/Express auth API.',
    });
  };

  return (
    <div className="auth-page">
      <header className="auth-header">
        <Link to="/" className="auth-brand">
          <img src="/logo.png" alt="Mentora" />
          <span>Mentora</span>
        </Link>
        <Link to="/" className="auth-back">← Back to home</Link>
      </header>

      <div className="auth-card">
        <h1>Welcome back</h1>
        <p className="auth-subtitle">Sign in to access your study workspace.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {status.message && (
            <div className={`auth-alert ${status.type}`}>{status.message}</div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-input"
              placeholder="you@university.edu"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <div className="form-label-row">
              <label htmlFor="password">Password</label>
              <Link to="/forgot-password" className="form-link">
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary auth-submit">
            Log In
          </button>
        </form>

        <div className="auth-footer">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="form-link">Create one</Link>
        </div>
      </div>

      <p className="auth-bottom-note">Mentora Student Workspace</p>
    </div>
  );
}

export default LoginPage;