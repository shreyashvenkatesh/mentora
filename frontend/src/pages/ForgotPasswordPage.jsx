import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setStatus({ type: 'error', message: 'Enter your registered email address.' });
      return;
    }
    setStatus({
      type: 'success',
      message: 'If an account matches this email, a reset link will be sent.',
    });
  };

  return (
    <div className="auth-page">
      <header className="auth-header">
        <Link to="/" className="auth-brand">
          <img src="/logo.png" alt="Mentora" />
          <span>Mentora</span>
        </Link>
        <Link to="/login" className="auth-back">← Back to login</Link>
      </header>

      <div className="auth-card">
        <h1>Reset password</h1>
        <p className="auth-subtitle">
          Enter your email and we&apos;ll send you recovery instructions.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {status.message && (
            <div className={`auth-alert ${status.type}`}>{status.message}</div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="you@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary auth-submit">
            Send Reset Link
          </button>
        </form>
      </div>

      <p className="auth-bottom-note">Mentora Student Workspace</p>
    </div>
  );
}

export default ForgotPasswordPage;