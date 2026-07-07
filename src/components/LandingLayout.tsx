import { Link, Outlet, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface LandingLayoutProps {
  onEnterDashboard: () => void;
}

export default function LandingLayout({ onEnterDashboard }: LandingLayoutProps) {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="landing-container">
      {/* Landing Page Header */}
      <header className="landing-header">
        <div className="brand-section" style={{ borderBottom: 'none', padding: 0 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div className="pulse-logo">
              <div className="pulse-bar" />
              <div className="pulse-bar" />
              <div className="pulse-bar" />
              <div className="pulse-bar" />
              <div className="pulse-bar" />
            </div>
            <span className="brand-name">PulseStack</span>
          </Link>
        </div>

        <nav className="landing-nav">
          <Link 
            to="/features" 
            className="landing-nav-link"
            style={{ 
              color: isActive('/features') ? 'var(--electric-blue-bright)' : undefined,
              fontWeight: isActive('/features') ? 700 : undefined
            }}
          >
            Features
          </Link>
          <Link 
            to="/pricing" 
            className="landing-nav-link"
            style={{ 
              color: isActive('/pricing') ? 'var(--electric-blue-bright)' : undefined,
              fontWeight: isActive('/pricing') ? 700 : undefined
            }}
          >
            Pricing
          </Link>
          <Link 
            to="/about" 
            className="landing-nav-link"
            style={{ 
              color: isActive('/about') ? 'var(--electric-blue-bright)' : undefined,
              fontWeight: isActive('/about') ? 700 : undefined
            }}
          >
            About
          </Link>
          <button className="btn" onClick={onEnterDashboard}>
            Enter Dashboard <ArrowRight size={16} />
          </button>
        </nav>
      </header>

      {/* Page Content */}
      <Outlet />

      {/* Footer */}
      <footer className="landing-footer">
        <p>© 2026 PulseStack. Built for the DevCareer x Nomba Hackathon. All payment operations simulated via Nomba Sandbox APIs.</p>
      </footer>
    </div>
  );
}
