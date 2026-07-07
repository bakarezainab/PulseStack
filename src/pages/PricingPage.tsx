import { CheckCircle2, ArrowRight, HelpCircle } from 'lucide-react';

interface PricingPageProps {
  onEnterDashboard: () => void;
}

export default function PricingPage({ onEnterDashboard }: PricingPageProps) {
  return (
    <>
      {/* Hero Section */}
      <section style={{ padding: '100px 20px 60px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <div className="landing-badge" style={{ margin: '0 auto 24px' }}>PRICING</div>
        <h1 style={{ fontSize: '56px', fontWeight: 900, marginBottom: '24px', lineHeight: '1.1' }}>
          Simple, Transparent Pricing
        </h1>
        <p style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 40px', lineHeight: '1.6' }}>
          No hidden fees. No surprises. Pay only for what you use. All plans include Nomba's standard transaction fees.
        </p>
      </section>

      {/* Pricing Cards */}
      <section style={{ padding: '40px 20px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
          {/* Starter Plan */}
          <div style={{ padding: '40px 32px', background: 'var(--bg-card)', borderRadius: '20px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>Starter</h3>
            <div style={{ margin: '24px 0' }}>
              <span style={{ fontSize: '48px', fontWeight: 800, color: 'var(--electric-blue-bright)' }}>Free</span>
              <span style={{ fontSize: '16px', color: 'var(--text-secondary)' }}> / month</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '32px' }}>
              Perfect for getting started and testing the waters
            </p>
            <ul style={{ listStyle: 'none', marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)' }} />
                <span>Up to 100 transactions/month</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)' }} />
                <span>Basic AI insights</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)' }} />
                <span>5 virtual accounts</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)' }} />
                <span>Payment links & QR codes</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)' }} />
                <span>Expense tracking</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)' }} />
                <span>Email support</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)' }} />
                <span>Dashboard analytics</span>
              </li>
            </ul>
            <button className="btn btn-secondary" style={{ width: '100%' }} onClick={onEnterDashboard}>
              Get Started Free
            </button>
          </div>

          {/* Professional Plan */}
          <div style={{ padding: '40px 32px', background: 'linear-gradient(135deg, var(--electric-blue-glow) 0%, rgba(0, 102, 255, 0.1) 100%)', borderRadius: '20px', border: '2px solid var(--electric-blue)', display: 'flex', flexDirection: 'column', position: 'relative', transform: 'scale(1.05)' }}>
            <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--electric-blue)', padding: '6px 20px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, color: 'white' }}>
              MOST POPULAR
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>Professional</h3>
            <div style={{ margin: '24px 0' }}>
              <span style={{ fontSize: '48px', fontWeight: 800, color: 'var(--electric-blue-bright)' }}>₦25,000</span>
              <span style={{ fontSize: '16px', color: 'var(--text-secondary)' }}> / month</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '32px' }}>
              For growing businesses that need more power
            </p>
            <ul style={{ listStyle: 'none', marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)' }} />
                <span><strong>Unlimited transactions</strong></span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)' }} />
                <span>Advanced AI predictions</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)' }} />
                <span>Unlimited virtual accounts</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)' }} />
                <span>Bulk payouts (unlimited staff)</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)' }} />
                <span>Rent collection with AI predictions</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)' }} />
                <span>Inventory management</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)' }} />
                <span>WhatsApp/SMS integration</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)' }} />
                <span>Priority support (24-48hr)</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)' }} />
                <span>Custom expense categories</span>
              </li>
            </ul>
            <button className="btn btn-gold" style={{ width: '100%', color: 'var(--bg-darkest)' }} onClick={onEnterDashboard}>
              Start 14-Day Free Trial
            </button>
          </div>

          {/* Enterprise Plan */}
          <div style={{ padding: '40px 32px', background: 'var(--bg-card)', borderRadius: '20px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>Enterprise</h3>
            <div style={{ margin: '24px 0' }}>
              <span style={{ fontSize: '48px', fontWeight: 800, color: 'var(--accent-gold)' }}>Custom</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '32px' }}>
              Tailored solutions for large organizations
            </p>
            <ul style={{ listStyle: 'none', marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)' }} />
                <span>Everything in Professional</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)' }} />
                <span>Custom AI models trained on your data</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)' }} />
                <span>Multi-location support</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)' }} />
                <span>White-label options</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)' }} />
                <span>Dedicated account manager</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)' }} />
                <span>24/7 phone support</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)' }} />
                <span>Custom integrations & API access</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)' }} />
                <span>SLA guarantees</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)' }} />
                <span>On-premise deployment options</span>
              </li>
            </ul>
            <button className="btn btn-secondary" style={{ width: '100%' }} onClick={onEnterDashboard}>
              Contact Sales
            </button>
          </div>
        </div>

        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '13px', marginTop: '40px' }}>
          All plans include Nomba's standard transaction fees: 1.5% for card payments, free for bank transfers and virtual accounts. No setup fees. Cancel anytime.
        </p>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '80px 20px', maxWidth: '900px', margin: '0 auto', background: 'var(--bg-darker)', borderRadius: '32px' }}>
        <div className="landing-section-title-wrap">
          <h2 className="landing-section-title">Frequently Asked Questions</h2>
        </div>

        <div style={{ marginTop: '60px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ padding: '28px', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <HelpCircle size={20} style={{ color: 'var(--electric-blue-bright)' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Do I need a Nomba account?</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', paddingLeft: '32px' }}>
              Yes, PulseStack is built on top of Nomba's payment infrastructure. You'll need a Nomba merchant account to accept real payments. Our sandbox lets you test everything without one.
            </p>
          </div>

          <div style={{ padding: '28px', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <HelpCircle size={20} style={{ color: 'var(--electric-blue-bright)' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 700 }}>What are Nomba's transaction fees?</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', paddingLeft: '32px' }}>
              Nomba charges 1.5% for card payments, with no fees for bank transfers or virtual account payments. These fees are standard across all Nigerian payment processors and are separate from PulseStack subscription fees.
            </p>
          </div>

          <div style={{ padding: '28px', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <HelpCircle size={20} style={{ color: 'var(--electric-blue-bright)' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Can I upgrade or downgrade anytime?</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', paddingLeft: '32px' }}>
              Absolutely! You can change plans anytime. Upgrades take effect immediately. Downgrades take effect at the end of your current billing period, and you'll keep all features until then.
            </p>
          </div>

          <div style={{ padding: '28px', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <HelpCircle size={20} style={{ color: 'var(--electric-blue-bright)' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Is my data secure?</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', paddingLeft: '32px' }}>
              Yes. All data is encrypted at rest and in transit. We never store your Nomba API keys—we use OAuth tokens that you can revoke anytime. We're compliant with Nigerian data protection regulations.
            </p>
          </div>

          <div style={{ padding: '28px', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <HelpCircle size={20} style={{ color: 'var(--electric-blue-bright)' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 700 }}>How does the AI work?</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', paddingLeft: '32px' }}>
              PulseStack uses Claude AI (by Anthropic) to analyze your transaction patterns, predict defaults, categorize expenses, and provide intelligent recommendations. The AI learns from your specific business data and improves over time.
            </p>
          </div>

          <div style={{ padding: '28px', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <HelpCircle size={20} style={{ color: 'var(--electric-blue-bright)' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Do you offer refunds?</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', paddingLeft: '32px' }}>
              We offer a 14-day money-back guarantee on the Professional plan. If you're not satisfied, contact support within 14 days for a full refund. The Starter plan is free, and Enterprise plans have custom terms.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '42px', fontWeight: 800, marginBottom: '24px' }}>Start Your Free Trial Today</h2>
        <p style={{ fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
          No credit card required. Test all Professional features for 14 days.
        </p>
        <button className="btn btn-gold" style={{ padding: '16px 32px', fontSize: '16px' }} onClick={onEnterDashboard}>
          Launch Sandbox Dashboard <ArrowRight size={18} />
        </button>
      </section>
    </>
  );
}
