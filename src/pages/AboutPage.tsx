import { Building, Package, Users, Globe, CheckCircle2, ArrowRight, Zap, Target, Heart } from 'lucide-react';

interface AboutPageProps {
  onEnterDashboard: () => void;
}

export default function AboutPage({ onEnterDashboard }: AboutPageProps) {
  return (
    <>
      {/* Hero Section */}
      <section style={{ padding: '100px 20px 60px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <div className="landing-badge" style={{ margin: '0 auto 24px' }}>HOW IT WORKS</div>
        <h1 style={{ fontSize: '56px', fontWeight: 900, marginBottom: '24px', lineHeight: '1.1' }}>
          Built for Nigerian Business Owners
        </h1>
        <p style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto 40px', lineHeight: '1.6' }}>
          We understand the unique challenges of running a business in Nigeria. PulseStack combines world-class payment infrastructure with AI intelligence to solve real problems.
        </p>
      </section>

      {/* How It Works Section */}
      <section style={{ padding: '60px 20px 80px', maxWidth: '1400px', margin: '0 auto' }}>
        <div className="landing-section-title-wrap">
          <h2 className="landing-section-title">Get Started in Three Simple Steps</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
            From signup to full operation in under 10 minutes
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', marginTop: '60px', padding: '0 20px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--electric-blue) 0%, var(--accent-gold) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '32px', fontWeight: 800, color: 'white' }}>
              1
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>Connect Your Nomba Account</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Sign up and link your Nomba merchant account in seconds. We'll automatically sync your payment rails, virtual accounts, and payout infrastructure. No complex setup or technical knowledge required.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-gold) 0%, var(--success-green) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '32px', fontWeight: 800, color: 'white' }}>
              2
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>Let AI Learn Your Business</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              PulseAI analyzes your transaction patterns, tenant behaviors, and spending habits. Within 24 hours, you'll get personalized insights, predictions, and automated recommendations tailored to your business.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--success-green) 0%, var(--electric-blue) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '32px', fontWeight: 800, color: 'white' }}>
              3
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>Automate & Optimize</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Run one-click payroll, auto-generate rent nudges, predict stockouts, and let PulseAI handle the intelligence while you focus on growth. Everything happens automatically.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section style={{ padding: '80px 20px', maxWidth: '1400px', margin: '0 auto', background: 'var(--bg-darker)', borderRadius: '32px' }}>
        <div className="landing-section-title-wrap">
          <h2 className="landing-section-title">Real Solutions for Real Businesses</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
            Designed specifically for Nigerian business challenges
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px', marginTop: '60px', padding: '0 20px' }}>
          {/* Landlord Use Case */}
          <div style={{ padding: '32px', background: 'var(--bg-card)', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: 'var(--electric-blue-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Building size={28} style={{ color: 'var(--electric-blue-bright)' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 700 }}>For Landlords</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Property Management Made Easy</p>
              </div>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={20} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: 'var(--text-primary)', lineHeight: '1.5' }}>Assign unique virtual accounts to each tenant for automatic rent collection</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={20} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: 'var(--text-primary)', lineHeight: '1.5' }}>AI predicts which tenants might default based on payment patterns</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={20} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: 'var(--text-primary)', lineHeight: '1.5' }}>Auto-generate WhatsApp/SMS reminders in Pidgin or English</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={20} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: 'var(--text-primary)', lineHeight: '1.5' }}>Track maintenance expenses and calculate ROI per property</span>
              </li>
            </ul>
          </div>

          {/* Retail Business Use Case */}
          <div style={{ padding: '32px', background: 'var(--bg-card)', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: 'rgba(255, 184, 0, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Package size={28} style={{ color: 'var(--accent-gold)' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 700 }}>For Retail Shops</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Inventory & Sales Intelligence</p>
              </div>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={20} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: 'var(--text-primary)', lineHeight: '1.5' }}>Accept payments via QR codes, payment links, and virtual accounts</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={20} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: 'var(--text-primary)', lineHeight: '1.5' }}>AI predicts stockout dates and generates reorder alerts</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={20} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: 'var(--text-primary)', lineHeight: '1.5' }}>Automatically categorize expenses (fuel, transport, market runs)</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={20} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: 'var(--text-primary)', lineHeight: '1.5' }}>Run bulk payroll for staff with fraud detection built-in</span>
              </li>
            </ul>
          </div>

          {/* Cooperative Society Use Case */}
          <div style={{ padding: '32px', background: 'var(--bg-card)', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={28} style={{ color: 'var(--success-green)' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 700 }}>For Cooperatives</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Ajo & Thrift Management</p>
              </div>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={20} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: 'var(--text-primary)', lineHeight: '1.5' }}>Organize rotating savings pools with automated contribution tracking</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={20} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: 'var(--text-primary)', lineHeight: '1.5' }}>AI monitors member payment reliability and flags risks</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={20} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: 'var(--text-primary)', lineHeight: '1.5' }}>Auto-disburse to beneficiary when cycle reaches 100%</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={20} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: 'var(--text-primary)', lineHeight: '1.5' }}>Send automated reminders to members via SMS/WhatsApp</span>
              </li>
            </ul>
          </div>

          {/* Diaspora Family Use Case */}
          <div style={{ padding: '32px', background: 'var(--bg-card)', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: 'rgba(0, 102, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Globe size={28} style={{ color: 'var(--electric-blue-bright)' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 700 }}>For Diaspora</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Cross-Border Remittance</p>
              </div>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={20} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: 'var(--text-primary)', lineHeight: '1.5' }}>Send USDT/USDC directly to family in Nigeria</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={20} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: 'var(--text-primary)', lineHeight: '1.5' }}>Auto-convert to Naira at parallel market rates (₦1,550/$)</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={20} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: 'var(--text-primary)', lineHeight: '1.5' }}>Settle to Nomba account in 0.8 seconds</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={20} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: 'var(--text-primary)', lineHeight: '1.5' }}>Save ₦90K+ per $500 vs traditional bank transfers</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="landing-section-title-wrap">
          <h2 className="landing-section-title">Our Mission</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            To democratize access to world-class financial operations infrastructure for every Nigerian business, regardless of size or technical expertise.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', marginTop: '60px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '16px', background: 'var(--electric-blue-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Zap size={36} style={{ color: 'var(--electric-blue-bright)' }} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>Speed & Simplicity</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Complex operations shouldn't require complex tools. We make advanced features accessible with one-click actions.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '16px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Target size={36} style={{ color: 'var(--success-green)' }} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>Nigerian-First</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Built specifically for Nigerian businesses, understanding local payment rails, languages, and business practices.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '16px', background: 'rgba(255, 184, 0, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Heart size={36} style={{ color: 'var(--accent-gold)' }} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>Customer Success</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Your success is our success. We provide world-class support and continuously improve based on feedback.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 20px', textAlign: 'center', background: 'var(--bg-darker)', borderRadius: '32px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '42px', fontWeight: 800, marginBottom: '24px' }}>Ready to Get Started?</h2>
        <p style={{ fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
          Join hundreds of Nigerian businesses already using PulseStack to automate their operations.
        </p>
        <button className="btn btn-gold" style={{ padding: '16px 32px', fontSize: '16px' }} onClick={onEnterDashboard}>
          Launch Sandbox Dashboard <ArrowRight size={18} />
        </button>
      </section>
    </>
  );
}
