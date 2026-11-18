import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please enter both your email and password.');
      return;
    }

    const displayName = form.email.split('@')[0];
    localStorage.setItem(
      'mentora_user',
      JSON.stringify({ name: displayName, email: form.email })
    );
    navigate('/dashboard');
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
          {error && <div className="auth-alert error">{error}</div>}

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