import { CreditCard, Building, Users, Package, PieChart, TrendingUp, Shield, Zap, Brain, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeaturesPageProps {
  onEnterDashboard: () => void;
}

export default function FeaturesPage({ onEnterDashboard }: FeaturesPageProps) {
  return (
    <>
      {/* Hero Section */}
      <section style={{ padding: '100px 20px 60px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <div className="landing-badge" style={{ margin: '0 auto 24px' }}>FEATURES</div>
        <h1 style={{ fontSize: '56px', fontWeight: 900, marginBottom: '24px', lineHeight: '1.1' }}>
          Everything You Need to Run Your Business
        </h1>
        <p style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 40px', lineHeight: '1.6' }}>
          PulseStack combines Nomba's payment infrastructure with Claude AI to give you superpowers. From rent collection to inventory management, every feature is built to save you time and money.
        </p>
      </section>

      {/* Core Features Grid */}
      <section style={{ padding: '60px 20px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
          {/* Smart Payment Collection */}
          <div style={{ padding: '40px', background: 'var(--bg-card)', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: 'var(--electric-blue-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <CreditCard size={28} style={{ color: 'var(--electric-blue-bright)' }} />
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>Smart Payment Collection</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.6' }}>
              Accept payments through multiple channels powered by Nomba's infrastructure. Generate payment links, virtual accounts, and QR codes in seconds.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                <span>Real-time fraud detection with 99.8% accuracy</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                <span>Automatic payment link generation and tracking</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                <span>Webhook-based instant settlement notifications</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                <span>Support for cards, transfers, and virtual accounts</span>
              </li>
            </ul>
          </div>

          {/* Rent & Property Management */}
          <div style={{ padding: '40px', background: 'var(--bg-card)', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: 'rgba(255, 184, 0, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <Building size={28} style={{ color: 'var(--accent-gold)' }} />
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>Rent & Property Management</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.6' }}>
              Manage tenants, track rent payments, and predict defaults before they happen. Perfect for landlords and property managers.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                <span>AI predicts tenant default risk based on payment history</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                <span>Auto-generate payment reminders in English or Pidgin</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                <span>Unique virtual account per tenant for easy tracking</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                <span>Track maintenance costs and calculate property ROI</span>
              </li>
            </ul>
          </div>

          {/* Payroll & Staff Management */}
          <div style={{ padding: '40px', background: 'var(--bg-card)', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <Users size={28} style={{ color: 'var(--success-green)' }} />
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>Payroll & Staff Management</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.6' }}>
              Execute bulk payouts to hundreds of employees in seconds using Nomba's payout API. AI audits every transaction before execution.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                <span>Bulk payouts with 0.8s average processing time</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                <span>AI scans for duplicate accounts and name mismatches</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                <span>Upload CSV or enter data manually</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                <span>Automatic payroll history and compliance tracking</span>
              </li>
            </ul>
          </div>

          {/* Inventory & Shop Intelligence */}
          <div style={{ padding: '40px', background: 'var(--bg-card)', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <Package size={28} style={{ color: '#8b5cf6' }} />
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>Inventory & Shop Intelligence</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.6' }}>
              Track inventory in real-time. Sales automatically deduct from stock when payments are confirmed via webhook.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                <span>AI predicts stockout dates based on sales velocity</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                <span>Automatic reorder suggestions with vendor info</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                <span>Real-time inventory sync with payment webhooks</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                <span>Track profit margins and best-selling items</span>
              </li>
            </ul>
          </div>

          {/* Expense Intelligence */}
          <div style={{ padding: '40px', background: 'var(--bg-card)', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <PieChart size={28} style={{ color: '#ef4444' }} />
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>Expense Intelligence</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.6' }}>
              Import expenses from Nomba transaction history. AI automatically categorizes and flags wasteful spending patterns.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                <span>Auto-categorize expenses (fuel, transport, utilities)</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                <span>AI detects spending anomalies and leaks</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                <span>Monthly budget tracking and alerts</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                <span>Export reports for tax and accounting</span>
              </li>
            </ul>
          </div>

          {/* Ajo & Cooperative Pools */}
          <div style={{ padding: '40px', background: 'var(--bg-card)', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: 'var(--electric-blue-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <TrendingUp size={28} style={{ color: 'var(--electric-blue-bright)' }} />
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>Ajo, Cooperative & Event Pools</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.6' }}>
              Organize Owambe events, cooperative savings, or rotating contribution pools. Members pay via Nomba checkout.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                <span>Track member contributions in real-time</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                <span>AI flags delinquent members before issues escalate</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                <span>Auto-disburse payouts when targets are reached</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                <span>Send contribution reminders via SMS/WhatsApp</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* AI-Powered Intelligence Section */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto', background: 'var(--bg-darker)', borderRadius: '32px' }}>
        <div className="landing-section-title-wrap">
          <h2 className="landing-section-title">Powered by Claude AI</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
            Every feature is enhanced with artificial intelligence
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', marginTop: '60px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '16px', background: 'var(--electric-blue-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Brain size={36} style={{ color: 'var(--electric-blue-bright)' }} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>Predictive Analytics</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              AI analyzes patterns to predict tenant defaults, stockouts, and spending anomalies before they happen.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '16px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Shield size={36} style={{ color: 'var(--success-green)' }} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>Fraud Detection</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              99.8% accuracy in detecting suspicious transactions, duplicate payroll entries, and account mismatches.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '16px', background: 'rgba(255, 184, 0, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Zap size={36} style={{ color: 'var(--accent-gold)' }} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>Auto-Suggestions</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Get instant recommendations for reorders, payment reminders, budget adjustments, and operational improvements.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '42px', fontWeight: 800, marginBottom: '24px' }}>Ready to Transform Your Business?</h2>
        <p style={{ fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
          Try PulseStack in our sandbox environment. No credit card required.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
          <button className="btn btn-gold" style={{ padding: '16px 32px', fontSize: '16px' }} onClick={onEnterDashboard}>
            Launch Sandbox Dashboard <ArrowRight size={18} />
          </button>
          <Link to="/pricing" className="btn btn-secondary" style={{ padding: '16px 32px', fontSize: '16px' }}>
            View Pricing
          </Link>
        </div>
      </section>
    </>
  );
}
