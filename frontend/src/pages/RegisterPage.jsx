import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email || form.password.length < 6) {
      setStatus({
        type: 'error',
        message: 'Enter your name, valid email, and a password (min 6 characters).',
      });
      return;
    }
    setStatus({
      type: 'success',
      message: `Workspace ready for ${form.name}! Next we wire MongoDB registration.`,
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
        <h1>Create your account</h1>
        <p className="auth-subtitle">Organize notes, quizzes, and revision in one place.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {status.message && (
            <div className={`auth-alert ${status.type}`}>{status.message}</div>
          )}

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-input"
              placeholder="Shreyash Venkatesh"
              value={form.name}
              onChange={handleChange}
            />
          </div>

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
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-input"
              placeholder="At least 6 characters"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-accent auth-submit">
            Create Free Account
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{' '}
          <Link to="/login" className="form-link">Log in</Link>
        </div>
      </div>

      <p className="auth-bottom-note">Mentora Student Workspace</p>
    </div>
  );
}

export default RegisterPage;