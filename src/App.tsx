import { useState, useEffect, useRef } from 'react';
import {
  Activity,
  CreditCard,
  Building,
  Users,
  Package,
  TrendingUp,
  ShieldAlert,
  Plus,
  Send,
  Bell,
  PieChart,
  Globe,
  Terminal,
  CheckCircle2,
  MessageSquare,
  X,
  FileText,
  ArrowRight
} from 'lucide-react';
import type {
  Transaction,
  Tenant,
  Employee,
  Product,
  Expense,
  AjoPool
} from './mockData';
import {
  INITIAL_TRANSACTIONS,
  INITIAL_TENANTS,
  INITIAL_EMPLOYEES,
  INITIAL_PRODUCTS,
  INITIAL_EXPENSES,
  INITIAL_AJO_POOLS,
  getBusinessHealth,
  parseAiCommand
} from './mockData';

interface WebhookLog {
  id: string;
  timestamp: string;
  tag: 'WEBHOOK' | 'AI_AGENT' | 'NOMBA_API' | 'CRYPTO_SETTLE';
  message: string;
}

interface Toast {
  id: string;
  type: 'success' | 'flagged' | 'info';
  message: string;
}

function App() {
  // Navigation State
  const [viewMode, setViewMode] = useState<'landing' | 'dashboard'>('landing');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'collections' | 'rent' | 'payroll' | 'inventory' | 'expenses' | 'ajo' | 'diaspora'>('dashboard');
  
  // Business State
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [tenants, setTenants] = useState<Tenant[]>(INITIAL_TENANTS);
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES);
  const [ajoPools, setAjoPools] = useState<AjoPool[]>(INITIAL_AJO_POOLS);
  const [balance, setBalance] = useState<number>(3450200);
  const [pendingSettlement] = useState<number>(180500);

  // UI States
  const [isAiOpen, setIsAiOpen] = useState<boolean>(true);
  const [isConsoleOpen, setIsConsoleOpen] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isPayingSalaries, setIsPayingSalaries] = useState<boolean>(false);
  const [liveExpenseDesc, setLiveExpenseDesc] = useState<string>('');
  const [liveExpenseAmount, setLiveExpenseAmount] = useState<string>('');
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [webhooksLogs, setWebhooksLogs] = useState<WebhookLog[]>([
    { id: '1', timestamp: new Date().toLocaleTimeString(), tag: 'NOMBA_API', message: 'Nomba payment rails connected successfully.' },
    { id: '2', timestamp: new Date().toLocaleTimeString(), tag: 'AI_AGENT', message: 'PulseAI engine loaded: Ready to process English & Pidgin commands.' },
    { id: '3', timestamp: new Date().toLocaleTimeString(), tag: 'WEBHOOK', message: 'Webhook engine listening on /api/v1/webhooks/nomba' }
  ]);
  
  // Real-time Pulse Heartbeat Animation State
  const [pulseData, setPulseData] = useState<number[]>(Array(40).fill(50));
  const pulseIndexRef = useRef<number>(0);
  const heartbeatPattern = [50, 50, 50, 50, 52, 48, 50, 50, 50, 40, 90, 10, 60, 45, 50, 50, 50, 50];

  // Chat State
  const [chatInput, setChatInput] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'assistant'; text: string; time: string }[]>([
    { sender: 'assistant', text: "Good morning, Zainab. Your business pulse is strong today 📈 How fit I run your business intelligence operations today?", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Modals States
  const [showAddTenantModal, setShowAddTenantModal] = useState<boolean>(false);
  const [showPaymentLinkModal, setShowPaymentLinkModal] = useState<boolean>(false);
  const [showNudgeModal, setShowNudgeModal] = useState<{ open: boolean; tenantName: string; draft: string } | null>(null);
  const [showPayslipModal, setShowPayslipModal] = useState<Employee | null>(null);
  
  // Form States
  const [newTenant, setNewTenant] = useState({ name: '', property: '', rentAmount: '', dueDate: '', phone: '' });
  const [newLink, setNewLink] = useState({ sender: '', amount: '', description: '' });
  const [newExpense, setNewExpense] = useState({ description: '', amount: '', category: 'Uncategorized' as any });

  // Crypto / Diaspora Remittance State
  const [cryptoForm, setCryptoForm] = useState({ sender: '', amountUsd: '200', recipientAccount: '1023948576' });

  // Heartbeat Logo / Live Chart Simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseData(prev => {
        const next = [...prev.slice(1)];
        const patternVal = heartbeatPattern[pulseIndexRef.current % heartbeatPattern.length];
        // Add minor randomness
        const randomNoise = Math.floor(Math.random() * 4) - 2;
        next.push(Math.max(5, Math.min(95, patternVal + randomNoise)));
        pulseIndexRef.current += 1;
        return next;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Toast Helper
  const showToast = (message: string, type: 'success' | 'flagged' | 'info' = 'success') => {
    const id = Math.random().toString();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  };

  // Developer Log Helper
  const addLog = (tag: 'WEBHOOK' | 'AI_AGENT' | 'NOMBA_API' | 'CRYPTO_SETTLE', message: string) => {
    setWebhooksLogs(prev => [
      { id: Math.random().toString(), timestamp: new Date().toLocaleTimeString(), tag, message },
      ...prev.slice(0, 19) // Limit to last 20 logs
    ]);
  };

  // AI Action Execution
  const triggerAiAction = (action: string, payload?: any) => {
    if (action === "NAVIGATE_RENT") {
      setActiveTab('rent');
    } else if (action === "NAVIGATE_PAYROLL") {
      setActiveTab('payroll');
    } else if (action === "NAVIGATE_EXPENSES") {
      setActiveTab('expenses');
    } else if (action === "NAVIGATE_HEALTH") {
      setActiveTab('dashboard');
    } else if (action === "NAVIGATE_DIASPORA") {
      setActiveTab('diaspora');
    } else if (action === "CREATE_PAYMENT_LINK" && payload) {
      const { sender, amount, description } = payload;
      const newTx: Transaction = {
        id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
        amount: Number(amount),
        type: 'payment_link',
        status: 'pending',
        sender,
        recipient: "Z-Pulse Fashion House",
        date: new Date().toISOString(),
        description,
        paymentChannel: "Nomba Checkout"
      };
      setTransactions(prev => [newTx, ...prev]);
      addLog('NOMBA_API', `Payment Link API called: Created Link for ${sender} - ₦${Number(amount).toLocaleString()}`);
      addLog('WEBHOOK', `Pending link generated. Webhook endpoint listening...`);
      showToast(`Payment link for ₦${Number(amount).toLocaleString()} created successfully!`, 'info');
    }
  };

  // Chat Submit
  const handleChatSend = (text?: string) => {
    const messageText = text || chatInput;
    if (!messageText.trim()) return;

    setChatMessages(prev => [...prev, {
      sender: 'user',
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);

    if (!text) setChatInput('');

    // Simulate AI response delay
    setTimeout(() => {
      const response = parseAiCommand(messageText, { tenants, employees, expenses, products, transactions, ajoPools }, triggerAiAction);
      
      setChatMessages(prev => [...prev, {
        sender: 'assistant',
        text: response.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);

      addLog('AI_AGENT', `Command parsed: "${messageText.substring(0, 30)}...". Triggered: ${response.actionTriggered || 'NONE'}`);
    }, 600);
  };

  // Developer Simulator Webhooks
  const simulatePaymentWebhook = (type: 'card' | 'rent' | 'ajo' | 'suspicious') => {
    const timestamp = new Date().toISOString();
    const id = `TX-${Math.floor(1000 + Math.random() * 9000)}`;

    if (type === 'card') {
      const amount = 250000;
      // Resolve any pending cards
      setTransactions(prev => {
        const hasPending = prev.some(t => t.sender === "Emeka Okoye" && t.status === "pending");
        if (hasPending) {
          return prev.map(t => t.sender === "Emeka Okoye" && t.status === "pending" ? { ...t, status: 'success' } : t);
        } else {
          return [{
            id, amount, type: 'payment_link', status: 'success',
            sender: "Emeka Okoye", recipient: "Z-Pulse Fashion House",
            date: timestamp, description: "Branding work - PulseStack Invoice",
            paymentChannel: "Nomba Checkout (Card)"
          }, ...prev];
        }
      });
      setBalance(b => b + amount);
      addLog('WEBHOOK', `NOMBA WEBHOOK RECEIVED: payment.link.paid | Payload: { txId: "${id}", amount: ${amount}, sender: "Emeka Okoye" }`);
      addLog('NOMBA_API', `Routed to collections: Settled ₦${amount.toLocaleString()} into Nomba Account`);
      showToast(`Webhook Success: ₦${amount.toLocaleString()} received from Emeka Okoye!`, 'success');
    } 
    
    else if (type === 'rent') {
      // Find Segun Arinze or Chinedu Okafor and mark paid
      const targetTenantName = "Segun Arinze";
      setTenants(prev => prev.map(t => t.name === targetTenantName ? { ...t, status: 'paid', lastPaymentDate: '2026-07-02' } : t));
      const amount = 350000;
      setTransactions(prev => [{
        id, amount, type: 'virtual_account', status: 'success',
        sender: targetTenantName, recipient: "Z-Pulse Fashion House",
        date: timestamp, description: "Rent Settlement - Yaba Office Suite 3B",
        paymentChannel: "Nomba Virtual Account (Providus)"
      }, ...prev]);
      setBalance(b => b + amount);
      addLog('WEBHOOK', `NOMBA WEBHOOK RECEIVED: virtual_account.payment | Payload: { acc: "983748293", amount: ${amount}, sender: "${targetTenantName}" }`);
      addLog('NOMBA_API', `Routed to Property module: Marked ${targetTenantName} rent as PAID.`);
      showToast(`Rent Webhook: ₦${amount.toLocaleString()} settled for Segun Arinze!`, 'success');
    }
    
    else if (type === 'ajo') {
      // Pay Mrs Ngozi Ajo contribution
      setAjoPools(prev => prev.map(p => {
        const updatedMembers = p.members.map(m => m.name === "Mrs. Ngozi" ? { ...m, paid: true, riskScore: 'low' as const } : m);
        const addedCont = p.members.find(m => m.name === "Mrs. Ngozi")?.paid ? 0 : 200000;
        return {
          ...p,
          currentContribution: p.currentContribution + addedCont,
          members: updatedMembers
        };
      }));
      const amount = 200000;
      setTransactions(prev => [{
        id, amount, type: 'payment_link', status: 'success',
        sender: "Mrs. Ngozi", recipient: "Balogun Market Association Contribution",
        date: timestamp, description: "Ajo Contribution Cycle 4",
        paymentChannel: "Nomba Checkout"
      }, ...prev]);
      addLog('WEBHOOK', `NOMBA WEBHOOK RECEIVED: payment.link.paid | Payload: { poolId: "AJO-01", sender: "Mrs. Ngozi", amount: 200000 }`);
      addLog('NOMBA_API', `Routed to Ajo module: Mrs. Ngozi contribution recorded. Pool at 80% capacity.`);
      showToast("Ajo Contribution: ₦200,000 recorded for Mrs. Ngozi!", 'success');
    }
    
    else if (type === 'suspicious') {
      const amount = 320000;
      const flaggedTx: Transaction = {
        id, amount, type: 'payment_link', status: 'flagged',
        sender: "Unknown Cardholder", recipient: "Z-Pulse Fashion House",
        date: timestamp, description: "High Value Order",
        paymentChannel: "Nomba Checkout (Card)",
        flagReason: "AI security flagged: Card BIN mismatch (IP: Lagos, Card: Brazil) - High Fraud Risk"
      };
      setTransactions(prev => [flaggedTx, ...prev]);
      addLog('WEBHOOK', `NOMBA WEBHOOK RECEIVED: payment.attempt | Payload: { txId: "${id}", cardBin: "453271", originIp: "102.89.34.12" }`);
      addLog('AI_AGENT', `🚨 Transaction ${id} flagged as SUSPICIOUS: Card/IP country mismatch. Settlement frozen.`);
      showToast("Security Alert: Suspicious transaction blocked before settlement!", 'flagged');
    }
  };

  // Salary Day Trigger
  const runSalaryDay = () => {
    // Check duplicates
    const duplicates = employees.filter(e => e.isDuplicate);
    if (duplicates.length > 0) {
      showToast("Salary Day Blocked: AI detected duplicates. Fix issues first!", 'flagged');
      addLog('AI_AGENT', "Payroll payout blocked. Reason: Duplicate entry Victor Nwachukwu (EMP-04) is present.");
      return;
    }

    setIsPayingSalaries(true);
    addLog('NOMBA_API', "Bulk Payout API invoked: Preparing payouts for 3 employees...");
    
    setTimeout(() => {
      setEmployees(prev => prev.map(e => ({ ...e, status: 'paid', lastPaidDate: new Date().toLocaleDateString() })));
      
      const totalPayout = employees.filter(e => !e.isDuplicate).reduce((sum, e) => sum + e.salary, 0);
      setBalance(b => b - totalPayout);

      // Add Payout transactions
      const timestamp = new Date().toISOString();
      const newTxs: Transaction[] = employees.filter(e => !e.isDuplicate).map((e, idx) => ({
        id: `TX-PAY-${1000 + idx}`,
        amount: e.salary,
        type: 'payout',
        status: 'success',
        sender: "Z-Pulse Fashion House",
        recipient: e.name,
        date: timestamp,
        description: `Monthly Salary - ${e.department}`,
        paymentChannel: "Nomba Payout API"
      }));

      setTransactions(prev => [...newTxs, ...prev]);
      addLog('NOMBA_API', `Bulk Payout execution success. Disbursed ₦${totalPayout.toLocaleString()} total.`);
      showToast(`One-Click Salary Day completed! ₦${totalPayout.toLocaleString()} paid via Nomba Payouts.`, 'success');
      setIsPayingSalaries(false);
    }, 1200);
  };

  // Remove duplicate employee
  const handleRemoveDuplicate = () => {
    setEmployees(prev => prev.filter(e => !e.isDuplicate));
    showToast("Duplicate employee records resolved. Payroll unlocked!", 'success');
    addLog('AI_AGENT', "Employee directory cleaned. Duplicate records removed successfully.");
  };

  // Add Tenant Submit
  const handleAddTenant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTenant.name || !newTenant.rentAmount) return;
    
    const added: Tenant = {
      id: `TEN-${Math.floor(100 + Math.random() * 900)}`,
      name: newTenant.name,
      property: newTenant.property || "Shop Space Yaba",
      rentAmount: Number(newTenant.rentAmount),
      dueDate: newTenant.dueDate || "2026-07-30",
      status: 'pending',
      riskScore: 'low',
      riskAnalysis: 'New tenant profile, initial risk rating low.',
      phone: newTenant.phone || '+234 800 000 0000'
    };

    setTenants(prev => [...prev, added]);
    setShowAddTenantModal(false);
    setNewTenant({ name: '', property: '', rentAmount: '', dueDate: '', phone: '' });
    showToast(`Tenant ${added.name} added successfully!`, 'success');
    addLog('NOMBA_API', `Virtual Account assigned: Providus Bank - 992837${Math.floor(100+Math.random()*900)}`);
  };

  // Create Custom Expense (AI Auto-Categorizes)
  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpense.description || !newExpense.amount) return;

    const desc = newExpense.description.toLowerCase();
    let cat: Expense['category'] = 'Uncategorized';
    
    if (desc.includes('fuel') || desc.includes('diesel') || desc.includes('generator') || desc.includes('gas')) {
      cat = 'Generator/Fuel';
    } else if (desc.includes('uber') || desc.includes('transport') || desc.includes('dispatch') || desc.includes('fare')) {
      cat = 'Transport';
    } else if (desc.includes('market') || desc.includes('goods') || desc.includes('materials') || desc.includes('lace') || desc.includes('buttons')) {
      cat = 'Market Run';
    } else if (desc.includes('airtime') || desc.includes('data') || desc.includes('wifi') || desc.includes('internet') || desc.includes('mtn')) {
      cat = 'Data/Airtime';
    } else if (desc.includes('lunch') || desc.includes('food') || desc.includes('feeding') || desc.includes('catering')) {
      cat = 'Staff Feeding';
    } else if (desc.includes('shipping') || desc.includes('delivery') || desc.includes('logistics')) {
      cat = 'Logistics';
    }

    const added: Expense = {
      id: `EXP-${Math.floor(100 + Math.random() * 900)}`,
      description: newExpense.description,
      amount: Number(newExpense.amount),
      date: new Date().toISOString().split('T')[0],
      category: cat
    };

    setExpenses(prev => [added, ...prev]);
    setNewExpense({ description: '', amount: '', category: 'Uncategorized' });
    showToast(`Expense logged: auto-categorized under "${cat}"`, 'success');
    addLog('AI_AGENT', `Auto-categorized expense "${added.description}" to "${cat}"`);
  };

  // Diaspora Remittance simulation
  const handleRemittanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rate = 1550;
    const amountUsd = Number(cryptoForm.amountUsd);
    const amountNgn = amountUsd * rate;

    addLog('CRYPTO_SETTLE', `NOWPayments Webhook: Crypto deposit detected (${amountUsd} USDT)`);
    addLog('NOMBA_API', `Exchanged ${amountUsd} USDT to NGN at rate ₦${rate}/$. Net: ₦${amountNgn.toLocaleString()}`);

    setTimeout(() => {
      setBalance(b => b + amountNgn);
      setTransactions(prev => [{
        id: `TX-REMIT-${Math.floor(1000 + Math.random() * 9000)}`,
        amount: amountNgn,
        type: 'crypto',
        status: 'success',
        sender: cryptoForm.sender || 'Diaspora Family Member',
        recipient: 'Zainab Nomba Account',
        date: new Date().toISOString(),
        description: `Diaspora Send: ${amountUsd} USDT converted to NGN`,
        paymentChannel: 'NOWPayments + Nomba Payouts'
      }, ...prev]);
      
      showToast(`USDT Remittance Successful: ₦${amountNgn.toLocaleString()} credited to recipient!`, 'success');
    }, 1000);
  };

  // Health Score Calculations
  const businessHealth = getBusinessHealth(expenses, transactions, tenants);

  // Auto-Draft Rent Nudge generator
  const triggerRentNudge = (tenant: Tenant) => {
    const draft = `Hello ${tenant.name}, this is a gentle reminder from Z-Pulse Fashion House. Rent for ${tenant.property} (₦${tenant.rentAmount.toLocaleString()}) was due on ${tenant.dueDate}. Abeg, make you clear this invoice so we can reconcile our Nomba accounts. Thank you!`;
    setShowNudgeModal({ open: true, tenantName: tenant.name, draft });
  };

  if (viewMode === 'landing') {
    return (
      <div className="landing-container">
        {/* Landing Page Header */}
        <header className="landing-header">
          <div className="brand-section" style={{ borderBottom: 'none', padding: 0 }}>
            <div className="pulse-logo">
              <div className="pulse-bar" />
              <div className="pulse-bar" />
              <div className="pulse-bar" />
              <div className="pulse-bar" />
              <div className="pulse-bar" />
            </div>
            <span className="brand-name">PulseStack</span>
          </div>

          <nav className="landing-nav">
            <a href="#features" className="landing-nav-link">Features</a>
            <a href="#diaspora" className="landing-nav-link">Remittance</a>
            <button className="btn" onClick={() => setViewMode('dashboard')}>
              Enter Sandbox Dashboard <ArrowRight size={16} />
            </button>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="landing-hero">
          <div className="landing-hero-content">
            <div className="landing-badge">DEVCAREER X NOMBA HACKATHON ENTRY</div>
            <h1 className="landing-title">AI-Powered Payment Infrastructure for Nigerian Businesses</h1>
            <p className="landing-subtitle">
              PulseStack is the intelligence layer your business has been missing. We wrap Nomba's production-ready payment APIs inside a powerful, automated intelligence framework. Accept USDT, predict rent defaults, audit payroll, and get real-time business health telemetry—all powered by Claude AI.
            </p>
            <div className="landing-hero-actions">
              <button className="btn btn-gold" style={{ padding: '14px 28px', fontSize: '15px' }} onClick={() => setViewMode('dashboard')}>
                Launch Sandbox Dashboard <ArrowRight size={16} />
              </button>
              <a href="#features" className="btn btn-secondary" style={{ padding: '14px 28px', fontSize: '15px' }}>
                Explore Product Suite
              </a>
            </div>
          </div>

          <div className="landing-hero-image-wrapper">
            <img src="/pulse_stack_hero.png" alt="PulseStack Financial Terminal" className="landing-hero-image" />
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

        {/* Features Section */}
        <section id="features" style={{ padding: '80px 20px 40px', maxWidth: '1400px', margin: '0 auto' }}>
          <div className="landing-section-title-wrap">
            <h2 className="landing-section-title">The Complete AI-First Product Suite</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
              Every feature in PulseStack is AI-first. Nomba handles the payment rails. Claude handles the intelligence. You just run your business.
            </p>
          </div>

          <div className="landing-features-grid">
            <div className="landing-feature-card">
              <div className="landing-feature-icon">
                <CreditCard size={24} />
              </div>
              <h3 className="landing-feature-title">Smart Payment Collection</h3>
              <p className="landing-feature-desc">
                Accept payments via Nomba payment links, virtual accounts, or QR. PulseAI monitors transactions in real time to flag fraud before settlement.
              </p>
            </div>

            <div className="landing-feature-card">
              <div className="landing-feature-icon">
                <Building size={24} />
              </div>
              <h3 className="landing-feature-title">Rent & Property Manager</h3>
              <p className="landing-feature-desc">
                Landlords manage tenants and collections. AI predicts which tenants are likely to default based on history and drafts auto-nudge reminders.
              </p>
            </div>

            <div className="landing-feature-card">
              <div className="landing-feature-icon">
                <Users size={24} />
              </div>
              <h3 className="landing-feature-title">Payroll & Staff Manager</h3>
              <p className="landing-feature-desc">
                Execute bulk payouts in one click using Nomba Payouts. AI scans payroll inputs before execution to catch duplicate accounts or name mismatches.
              </p>
            </div>

            <div className="landing-feature-card">
              <div className="landing-feature-icon">
                <Package size={24} />
              </div>
              <h3 className="landing-feature-title">Inventory & Shop Intelligence</h3>
              <p className="landing-feature-desc">
                Sales auto-deduct from stock upon webhook confirmation. AI predicts stockout dates and drafts restock suggestions based on sales velocity.
              </p>
            </div>

            <div className="landing-feature-card">
              <div className="landing-feature-icon">
                <PieChart size={24} />
              </div>
              <h3 className="landing-feature-title">Expense Intelligence</h3>
              <p className="landing-feature-desc">
                Expenses auto-import from Nomba history. AI categorizes descriptions (Generator/Fuel, Market Run) and warns of wasteful spending leaks.
              </p>
            </div>

            <div className="landing-feature-card">
              <div className="landing-feature-icon">
                <TrendingUp size={24} />
              </div>
              <h3 className="landing-feature-title">Ajo, Cooperative & Event Pools</h3>
              <p className="landing-feature-desc">
                Organize Owambe or cooperative pools. Members contribute via Nomba checkout, while AI spots delinquency risks and auto-payouts to beneficiaries.
              </p>
            </div>
          </div>
        </section>

        {/* Remittance Block */}
        <section id="diaspora" style={{ padding: '40px 20px 80px', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
            <div>
              <div className="landing-badge" style={{ marginBottom: '16px' }}>CROSS-BORDER RAILS</div>
              <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '16px' }}>Diaspora Remittance & Stablecoin Acceptance</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
                Receive USDT/USDC directly from family members or customers abroad. PulseStack dynamically converts stablecoins to NGN at live parallel rates and routes funds to recipients instantly via Nomba payouts. 
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: 'var(--text-primary)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: 'var(--success-green)', fontWeight: 'bold' }}>✓</span> Save 12% on bank remittance conversion rates.
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: 'var(--success-green)', fontWeight: 'bold' }}>✓</span> Settle directly into local Nomba merchant accounts.
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: 'var(--success-green)', fontWeight: 'bold' }}>✓</span> Real-time FX Advisory tells you the best time to send.
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
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>USDT deposited triggers standard Nomba payout within 0.8 seconds.</p>
                </div>
              </div>
              <button className="btn" style={{ width: '100%' }} onClick={() => {
                setViewMode('dashboard');
                setActiveTab('diaspora');
              }}>
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
          <button className="btn btn-gold" style={{ padding: '16px 32px', fontSize: '16px' }} onClick={() => setViewMode('dashboard')}>
            Enter Sandbox Dashboard <ArrowRight size={18} />
          </button>
        </section>

        {/* Footer */}
        <footer className="landing-footer">
          <p>© 2026 PulseStack. Built for the DevCareer x Nomba Hackathon. All payment operations simulated via Nomba Sandboxed Sandbox APIs.</p>
        </footer>
      </div>
    );
  }

  return (
    <div className="app-container" style={{
      gridTemplateRows: isConsoleOpen ? '70px 1fr 180px' : '70px 1fr 40px'
    }}>
      
      {/* Toast Notifications */}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${t.type}`}>
            {t.type === 'success' && <CheckCircle2 size={18} style={{ color: 'var(--success-green)' }} />}
            {t.type === 'flagged' && <ShieldAlert size={18} style={{ color: 'var(--danger-red)' }} />}
            {t.type === 'info' && <Bell size={18} style={{ color: 'var(--electric-blue-bright)' }} />}
            <span>{t.message}</span>
          </div>
        ))}
      </div>

      {/* Sidebar Panel */}
      <aside className="sidebar">
        <div className="brand-section">
          <div className="pulse-logo">
            <div className="pulse-bar" />
            <div className="pulse-bar" />
            <div className="pulse-bar" />
            <div className="pulse-bar" />
            <div className="pulse-bar" />
          </div>
          <span className="brand-name">PulseStack</span>
        </div>

        <nav className="nav-list">
          <span className="nav-section-title">Core Operations</span>
          <div className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <Activity />
            <span>Dashboard Pulse</span>
          </div>
          <div className={`nav-item ${activeTab === 'collections' ? 'active' : ''}`} onClick={() => setActiveTab('collections')}>
            <CreditCard />
            <span>Smart Payments</span>
          </div>
          
          <span className="nav-section-title">AI Managers</span>
          <div className={`nav-item ${activeTab === 'rent' ? 'active' : ''}`} onClick={() => setActiveTab('rent')}>
            <Building />
            <span>Rent & Properties</span>
          </div>
          <div className={`nav-item ${activeTab === 'payroll' ? 'active' : ''}`} onClick={() => setActiveTab('payroll')}>
            <Users />
            <span>Payroll & Staff</span>
          </div>
          <div className={`nav-item ${activeTab === 'inventory' ? 'active' : ''}`} onClick={() => setActiveTab('inventory')}>
            <Package />
            <span>Inventory Intel</span>
          </div>
          <div className={`nav-item ${activeTab === 'expenses' ? 'active' : ''}`} onClick={() => setActiveTab('expenses')}>
            <PieChart />
            <span>Expense AI</span>
          </div>
          <div className={`nav-item ${activeTab === 'ajo' ? 'active' : ''}`} onClick={() => setActiveTab('ajo')}>
            <TrendingUp />
            <span>Ajo & Co-op Pools</span>
          </div>

          <span className="nav-section-title">Global Rails</span>
          <div className={`nav-item ${activeTab === 'diaspora' ? 'active' : ''}`} onClick={() => setActiveTab('diaspora')}>
            <Globe />
            <span>Diaspora Send</span>
          </div>
          
          <span className="nav-section-title">Exit</span>
          <div className="nav-item" onClick={() => setViewMode('landing')}>
            <Globe />
            <span>Back to Website</span>
          </div>
        </nav>

        <div style={{ padding: '16px', borderTop: '1px solid var(--border-color)', fontSize: '11px', color: 'var(--text-muted)' }}>
          Powered by Claude API & Nomba API Rails
        </div>
      </aside>

      {/* Header Panel */}
      <header className="header">
        <div className="greeting-area">
          <span className="greeting-text">Good morning, Zainab. Your business pulse is strong today 📈</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '4px', flexWrap: 'wrap' }}>
            <span className="greeting-subtext">Zee Retail & Fashion House • Nomba Merchant ID: 893427</span>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: 'var(--text-secondary)', background: 'var(--bg-darker)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'var(--success-green)', boxShadow: '0 0 4px var(--success-green)', display: 'inline-block' }}></span>
                Collections: Live
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: 'var(--text-secondary)', background: 'var(--bg-darker)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'var(--success-green)', boxShadow: '0 0 4px var(--success-green)', display: 'inline-block' }}></span>
                Payouts: Live
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: 'var(--text-secondary)', background: 'var(--bg-darker)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'var(--success-green)', boxShadow: '0 0 4px var(--success-green)', display: 'inline-block' }}></span>
                Webhooks: Listening
              </div>
            </div>
          </div>
        </div>

        <div className="header-actions">
          <div className="balance-card-header">
            <div>
              <div className="balance-label">Nomba Balance</div>
              <div className="balance-value">₦{balance.toLocaleString()}</div>
            </div>
            <div>
              <div className="balance-label" style={{ color: 'var(--text-muted)' }}>Pending Settlement</div>
              <div className="balance-value" style={{ color: 'var(--text-secondary)' }}>₦{pendingSettlement.toLocaleString()}</div>
            </div>
          </div>
          
          <button className="btn btn-gold" onClick={() => {
            setShowPaymentLinkModal(true);
          }}>
            <Plus size={16} />
            <span>Payment Link</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab === 'dashboard' && (
          <div className="dashboard-grid">
            
            {/* Business Health Score Gauge */}
            <div className="card" style={{ gridColumn: 'span 4' }}>
              <div className="card-header-flex">
                <span className="card-title"><Activity /> Business Health Score</span>
                <span className="badge success">Optimal</span>
              </div>
              <div className="gauge-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '140px' }}>
                <svg width="120" height="70" style={{ transform: 'rotate(0deg)' }}>
                  {/* Gauge Arc Background */}
                  <path d="M 10 60 A 50 50 0 0 1 110 60" fill="none" stroke="var(--border-color)" strokeWidth="12" strokeLinecap="round" />
                  {/* Gauge Arc Colored fill based on health score */}
                  <path d="M 10 60 A 50 50 0 0 1 110 60" fill="none" stroke="var(--electric-blue)" strokeWidth="12" strokeLinecap="round"
                    strokeDasharray="157" strokeDashoffset={157 - (157 * businessHealth.score / 100)} />
                </svg>
                <div style={{ fontSize: '32px', fontWeight: 800, marginTop: '-30px', color: 'var(--text-primary)' }}>{businessHealth.score}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>Pulse Score</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '16px', fontSize: '12px' }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '6px', borderRadius: '6px' }}>
                  <div style={{ color: 'var(--text-muted)' }}>Cash Flow</div>
                  <div style={{ fontWeight: 700, color: 'var(--success-green)' }}>{businessHealth.cashFlowScore}%</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '6px', borderRadius: '6px' }}>
                  <div style={{ color: 'var(--text-muted)' }}>Expenses</div>
                  <div style={{ fontWeight: 700, color: businessHealth.expenseControlScore > 50 ? 'var(--success-green)' : 'var(--danger-red)' }}>{businessHealth.expenseControlScore}%</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '6px', borderRadius: '6px' }}>
                  <div style={{ color: 'var(--text-muted)' }}>Consistency</div>
                  <div style={{ fontWeight: 700, color: 'var(--success-green)' }}>{businessHealth.paymentConsistencyScore}%</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '6px', borderRadius: '6px' }}>
                  <div style={{ color: 'var(--text-muted)' }}>Growth</div>
                  <div style={{ fontWeight: 700, color: 'var(--electric-blue-bright)' }}>{businessHealth.revenueGrowthScore}%</div>
                </div>
              </div>
            </div>

            {/* AI Action Points Panel */}
            <div className="card" style={{ gridColumn: 'span 8' }}>
              <div className="card-header-flex">
                <span className="card-title"><MessageSquare /> PulseAI Strategic Actions</span>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Updated Live</span>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {businessHealth.actionPoints.map((point, index) => (
                  <li key={index} style={{ padding: '12px 14px', borderRadius: '8px', background: 'var(--bg-darker)', display: 'flex', gap: '12px', fontSize: '13px', borderLeft: `3px solid ${index === 1 ? 'var(--accent-gold)' : 'var(--electric-blue)'}` }}>
                    <div style={{ color: 'var(--electric-blue-bright)', fontWeight: 700 }}>0{index + 1}</div>
                    <div style={{ color: 'var(--text-primary)' }}>{point}</div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Live Pulse Heartbeat Graph */}
            <div className="card" style={{ gridColumn: 'span 6' }}>
              <div className="card-header-flex">
                <span className="card-title"><Activity /> Real-Time Transaction Pulse</span>
                <span className="badge" style={{ color: 'var(--success-green)', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--success-green)', display: 'inline-block' }}></span>
                  Live Monitor
                </span>
              </div>
              <div style={{ height: '150px', background: 'var(--bg-darker)', borderRadius: '8px', padding: '10px', display: 'flex', alignItems: 'center' }}>
                <svg viewBox="0 0 400 100" style={{ width: '100%', height: '100%' }}>
                  <path
                    d={`M ${pulseData.map((v, i) => `${(i / (pulseData.length - 1)) * 400},${100 - v}`).join(' L ')}`}
                    fill="none"
                    stroke="var(--electric-blue)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d={`M 0,100 L ${pulseData.map((v, i) => `${(i / (pulseData.length - 1)) * 400},${100 - v}`).join(' L ')} L 400,100 Z`}
                    fill="url(#pulseGrad)"
                    opacity="0.1"
                  />
                  <defs>
                    <linearGradient id="pulseGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--electric-blue)" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
                <span>Past 60 Seconds</span>
                <span>Active API Channels: Payment Links, Virtual Accounts, QR</span>
              </div>
            </div>

            {/* Revenue Forecasting Graph */}
            <div className="card" style={{ gridColumn: 'span 6' }}>
              <div className="card-header-flex">
                <span className="card-title"><TrendingUp /> Revenue Forecasting (30-Day Outlook)</span>
                <span className="badge" style={{ color: 'var(--accent-gold)', background: 'var(--accent-gold-glow)' }}>Seasonal AI Layer</span>
              </div>
              <div style={{ height: '150px', background: 'var(--bg-darker)', borderRadius: '8px', padding: '10px', display: 'flex', alignItems: 'center', position: 'relative' }}>
                <svg viewBox="0 0 400 100" style={{ width: '100%', height: '100%' }}>
                  {/* Past Trend */}
                  <path d="M 0,70 L 100,65 L 200,55 L 260,48" fill="none" stroke="var(--text-muted)" strokeWidth="2.5" />
                  
                  {/* Future Forecast */}
                  <path d="M 260,48 L 300,38 L 340,30 L 370,42 L 400,35" fill="none" stroke="var(--electric-blue)" strokeWidth="2.5" strokeDasharray="4" />
                  
                  {/* Confidence Interval Polygon */}
                  <polygon points="260,48 300,28 340,15 370,30 400,20 400,50 370,55 340,45 300,48 260,48" fill="var(--electric-blue-glow)" opacity="0.3" />
                  
                  {/* Annotations */}
                  <text x="250" y="25" fill="var(--accent-gold)" fontSize="8" fontWeight="bold">Sallah Cycle Prediction</text>
                  <line x1="260" y1="48" x2="260" y2="90" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="2" />
                  <text x="265" y="85" fill="var(--text-muted)" fontSize="8">Today</text>
                </svg>
              </div>
              <div style={{ marginTop: '10px', fontSize: '11px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyItems: 'space-between', width: '100%' }}>
                <span>Forecast: ₦1.8M - ₦2.4M (High Confidence). Sallah / Ramadan festival cycles will boost textile sales by 35% in mid-August.</span>
              </div>
            </div>

            {/* Recent Payments Feed */}
            <div className="card" style={{ gridColumn: 'span 12' }}>
              <div className="card-header-flex">
                <span className="card-title"><CreditCard /> Consolidated Live Nomba Settlements</span>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input
                    type="text"
                    placeholder="Search by sender or TXID..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="form-control"
                    style={{ width: '220px', padding: '6px 12px', fontSize: '12px' }}
                  />
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Settled Instantly T+1</span>
                </div>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table>
                  <thead>
                    <tr>
                      <th>TXID</th>
                      <th>Sender/Recipient</th>
                      <th>Category/Type</th>
                      <th>Payment Channel</th>
                      <th>Timestamp</th>
                      <th>Status</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions
                      .filter(t => 
                        t.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        t.id.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map(t => (
                        <tr key={t.id}>
                          <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{t.id}</td>
                          <td style={{ fontWeight: 600 }}>{t.sender}</td>
                          <td style={{ textTransform: 'capitalize' }}>{t.type.replace('_', ' ')}</td>
                          <td>{t.paymentChannel}</td>
                          <td>{new Date(t.date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</td>
                          <td>
                            <span className={`badge ${t.status}`}>
                              {t.status}
                            </span>
                          </td>
                          <td style={{ fontWeight: 800, color: t.type === 'payout' ? 'var(--danger-red)' : 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                            {t.type === 'payout' ? '-' : ''}₦{t.amount.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}

export default App;
