import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand">
          <img src="/logo.png" alt="Mentora" className="brand-logo" />
          <span>Mentora</span>
        </Link>

        <nav className="navbar-links">
          <a href="#features">Features</a>
          <a href="#workflow">How It Works</a>
          <a href="#modules">Study Suite</a>
        </nav>

        <div className="navbar-actions">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => navigate('/login')}
          >
            Log In
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate('/register')}
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;