import { ArrowRight, CreditCard, Building, Users, Package, PieChart, TrendingUp, Globe, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HomePageProps {
  onEnterDashboard: () => void;
}

export default function HomePage({ onEnterDashboard }: HomePageProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="landing-hero">
        <div className="landing-hero-content animate-fade-in-up">
          <div className="landing-badge animate-scale-in animate-delay-200">DEVCAREER X NOMBA HACKATHON ENTRY</div>
          <h1 className="landing-title animate-fade-in-up animate-delay-300">AI-Powered Payment Infrastructure for Nigerian Businesses</h1>
          <p className="landing-subtitle animate-fade-in-up animate-delay-400">
            PulseStack is the intelligence layer your business has been missing. We wrap Nomba's production-ready payment APIs inside a powerful, automated intelligence framework. Accept USDT, predict rent defaults, audit payroll, and get real-time business health telemetry—all powered by Claude AI.
          </p>
          <div className="landing-hero-actions animate-fade-in-up animate-delay-500">
            <button className="btn btn-gold" style={{ padding: '14px 28px', fontSize: '15px' }} onClick={onEnterDashboard}>
              Launch Sandbox Dashboard <ArrowRight size={16} />
            </button>
            <Link to="/features" className="btn btn-secondary" style={{ padding: '14px 28px', fontSize: '15px' }}>
              Explore Product Suite
            </Link>
          </div>
        </div>

        <div className="landing-hero-image-wrapper animate-slide-right animate-delay-400">
          <div className="animate-float">
            <img 
              src="/pulse_stack_hero.png" 
              alt="PulseStack Financial Terminal" 
              className="landing-hero-image" 
              style={{ 
                borderRadius: '20px', 
                boxShadow: '0 20px 60px rgba(0, 102, 255, 0.3)',
                border: '1px solid rgba(51, 133, 255, 0.3)'
              }}
            />
          </div>
        </div>
      </section>

      {/* Stats Block */}
      <section className="landing-stats">
        <div className="landing-stat-item">
          <span className="landing-stat-num">₦4.5M+</span>
          <span className="landing-stat-label">Simulated Vol.</span>
        </div>
        <div className="landing-stat-item">
          <span className="landing-stat-num">0.8s</span>
          <span className="landing-stat-label">Bulk Payout Latency</span>
        </div>
        <div className="landing-stat-item">
          <span className="landing-stat-num">99.8%</span>
          <span className="landing-stat-label">AI Card Fraud Detection</span>
        </div>
        <div className="landing-stat-item">
          <span className="landing-stat-num">T+1</span>
          <span className="landing-stat-label">Nomba Settlement</span>
        </div>
      </section>

      {/* Quick Features Overview */}
      <section style={{ padding: '80px 20px 40px', maxWidth: '1400px', margin: '0 auto' }}>
        <div className="landing-section-title-wrap">
          <h2 className="landing-section-title">The Complete AI-First Product Suite</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
            Every feature in PulseStack is AI-first. Nomba handles the payment rails. Claude handles the intelligence.
          </p>
        </div>

        <div className="landing-features-grid">
          <div className="landing-feature-card animate-fade-in-up animate-delay-100">
            <div className="landing-feature-icon">
              <CreditCard size={24} />
            </div>
            <h3 className="landing-feature-title">Smart Payment Collection</h3>
            <p className="landing-feature-desc">
              Accept payments via Nomba payment links, virtual accounts, or QR. PulseAI monitors transactions in real time.
            </p>
          </div>

          <div className="landing-feature-card animate-fade-in-up animate-delay-200">
            <div className="landing-feature-icon">
              <Building size={24} />
            </div>
            <h3 className="landing-feature-title">Rent & Property Manager</h3>
            <p className="landing-feature-desc">
              AI predicts which tenants are likely to default based on history and drafts auto-nudge reminders.
            </p>
          </div>

          <div className="landing-feature-card animate-fade-in-up animate-delay-300">
            <div className="landing-feature-icon">
              <Users size={24} />
            </div>
            <h3 className="landing-feature-title">Payroll & Staff Manager</h3>
            <p className="landing-feature-desc">
              Execute bulk payouts in one click. AI scans inputs to catch duplicate accounts or name mismatches.
            </p>
          </div>

          <div className="landing-feature-card animate-fade-in-up animate-delay-400">
            <div className="landing-feature-icon">
              <Package size={24} />
            </div>
            <h3 className="landing-feature-title">Inventory Intelligence</h3>
            <p className="landing-feature-desc">
              AI predicts stockout dates and drafts restock suggestions based on sales velocity.
            </p>
          </div>

          <div className="landing-feature-card animate-fade-in-up animate-delay-500">
            <div className="landing-feature-icon">
              <PieChart size={24} />
            </div>
            <h3 className="landing-feature-title">Expense Intelligence</h3>
            <p className="landing-feature-desc">
              AI categorizes descriptions and warns of wasteful spending leaks automatically.
            </p>
          </div>

          <div className="landing-feature-card animate-fade-in-up animate-delay-600">
            <div className="landing-feature-icon">
              <TrendingUp size={24} />
            </div>
            <h3 className="landing-feature-title">Ajo & Cooperative Pools</h3>
            <p className="landing-feature-desc">
              AI spots delinquency risks and auto-payouts to beneficiaries when cycles complete.
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link to="/features" className="btn btn-gold">
            Explore All Features <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Remittance Highlight */}
      <section style={{ padding: '40px 20px 80px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
          <div>
            <div className="landing-badge" style={{ marginBottom: '16px' }}>CROSS-BORDER RAILS</div>
            <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '16px' }}>Diaspora Remittance & Stablecoin Acceptance</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
              Receive USDT/USDC directly from family members abroad. PulseStack converts to NGN at live rates and routes funds instantly.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: 'var(--text-primary)' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)' }} />
                Save 12% on bank conversion rates
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)' }} />
                Settle directly into Nomba accounts
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)' }} />
                Real-time FX advisory
              </li>
            </ul>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', background: 'var(--bg-darker)', padding: '30px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700 }}>Conversion rate</span>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-gold)' }}>₦1,550.00 / $1</span>
            </div>
            <div style={{ height: '1px', backgroundColor: 'var(--border-color)' }} />
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Globe size={32} style={{ color: 'var(--electric-blue-bright)' }} />
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 700 }}>Instant Webhook Routing</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>USDT deposited triggers Nomba payout within 0.8 seconds.</p>
              </div>
            </div>
            <button className="btn" style={{ width: '100%' }} onClick={onEnterDashboard}>
              Try Sandbox Remittance Portal
            </button>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="landing-testimonial">
        <p className="landing-testimonial-quote">
          "Before PulseStack, reconciling my boutique's sales with bank transfers was a nightmare. Now, Nomba handles the collections, and the AI handles the rest. My business health score is up to 88%!"
        </p>
        <span className="landing-testimonial-author" style={{ display: 'block', marginBottom: '40px' }}>Zainab Alao, Z-Pulse Fashion House</span>
        <button className="btn btn-gold" style={{ padding: '16px 32px', fontSize: '16px' }} onClick={onEnterDashboard}>
          Enter Sandbox Dashboard <ArrowRight size={18} />
        </button>
      </section>
    </>
  );
}
