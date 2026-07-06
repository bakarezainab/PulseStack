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
  ArrowRight,
  Settings,
  BarChart3,
  HelpCircle,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Mail,
  Phone,
  MapPin,
  Clock,
  ChevronRight,
  Save,
  RefreshCw,
  Download,
  Filter,
  Calendar,
  ExternalLink,
  BookOpen,
  Zap
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
  const [activeTab, setActiveTab] = useState<'dashboard' | 'collections' | 'rent' | 'payroll' | 'inventory' | 'expenses' | 'ajo' | 'diaspora' | 'settings' | 'analytics' | 'help'>('dashboard');
  
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
  const [showNudgeModal, setShowNudgeModal] = useState<{
    open: boolean;
    tenant: { name: string; property: string; rentAmount: number; dueDate: string; id: string; isAjo?: boolean };
    tone: 'pidgin' | 'formal' | 'urgent';
    draft: string;
  } | null>(null);
  const [showPayslipModal, setShowPayslipModal] = useState<Employee | null>(null);
  const [activeRiskTenant, setActiveRiskTenant] = useState<Tenant | null>(null);
  const [activeLogFilter, setActiveLogFilter] = useState<'ALL' | 'WEBHOOK' | 'AI_AGENT' | 'NOMBA_API' | 'CRYPTO_SETTLE'>('ALL');
  
  // Form States
  const [newTenant, setNewTenant] = useState({ name: '', property: '', rentAmount: '', dueDate: '', phone: '' });
  const [newLink, setNewLink] = useState({ sender: '', amount: '', description: '' });
  const [newExpense, setNewExpense] = useState({ description: '', amount: '', category: 'Uncategorized' as any });

  // Crypto / Diaspora Remittance State
  const [cryptoForm, setCryptoForm] = useState({ sender: '', amountUsd: '200', recipientAccount: '1023948576' });

  // Settings State
  const [settings, setSettings] = useState({
    darkMode: true,
    notifications: true,
    soundEffects: false,
    autoSettlement: true,
    language: 'en' as 'en' | 'pidgin',
    currency: 'NGN' as 'NGN' | 'USD',
    emailAlerts: true,
    smsAlerts: false
  });

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
  const generateNudgeText = (
    tenant: { name: string; property: string; rentAmount: number; dueDate: string; id: string; isAjo?: boolean },
    tone: 'pidgin' | 'formal' | 'urgent'
  ) => {
    const amountStr = tenant.rentAmount.toLocaleString();
    if (tenant.isAjo) {
      if (tone === 'pidgin') {
        return `Hello ${tenant.name}, Ajo cooperative contributions are active. Your payment of ₦${amountStr} is due. Abeg, click this Nomba link to clear: pay.nomba.com/ajo/${tenant.id.toLowerCase()}`;
      } else if (tone === 'formal') {
        return `Dear ${tenant.name}, this is a reminder that your Ajo cooperative contribution of ₦${amountStr} is currently pending. Please click the link to complete payment: pay.nomba.com/ajo/${tenant.id.toLowerCase()}. Thank you.`;
      } else {
        return `URGENT: Ajo cooperative payment of ₦${amountStr} from ${tenant.name} is due immediately. Please click pay.nomba.com/ajo/${tenant.id.toLowerCase()} to complete payment and keep the circle active.`;
      }
    } else {
      if (tone === 'pidgin') {
        return `Hello ${tenant.name}, this is a gentle reminder from Z-Pulse Fashion House. Rent for ${tenant.property} (₦${amountStr}) was due on ${tenant.dueDate}. Abeg, make you clear this invoice so we can reconcile our Nomba accounts. Thank you!`;
      } else if (tone === 'formal') {
        return `Dear ${tenant.name}, this is a formal notification from Z-Pulse Fashion House regarding the rent invoice for ${tenant.property} in the amount of ₦${amountStr}, which was due on ${tenant.dueDate}. Please click the link to complete payment: pay.nomba.com/l/${tenant.id.toLowerCase()}. Thank you.`;
      } else {
        return `URGENT: Rent payment of ₦${amountStr} for ${tenant.property} is overdue since ${tenant.dueDate}. Z-Pulse Fashion House requires immediate settlement. Please click pay.nomba.com/l/${tenant.id.toLowerCase()} to complete payment immediately.`;
      }
    }
  };

  const triggerRentNudge = (tenant: Tenant) => {
    const tenantObj = { name: tenant.name, property: tenant.property, rentAmount: tenant.rentAmount, dueDate: tenant.dueDate, id: tenant.id };
    const draft = generateNudgeText(tenantObj, 'pidgin');
    setShowNudgeModal({ open: true, tenant: tenantObj, tone: 'pidgin', draft });
  };

  const handleAjoPayout = (poolId: string) => {
    const pool = ajoPools.find(p => p.id === poolId);
    if (!pool) return;
    
    addLog('NOMBA_API', `Bulk Payout API invoked: Disbursing Ajo Pool "${pool.name}" beneficiary funds...`);
    
    setTimeout(() => {
      setAjoPools(prev => prev.map(p => p.id === poolId ? { ...p, status: 'completed' } : p));
      setBalance(b => b - pool.targetAmount);
      
      const timestamp = new Date().toISOString();
      setTransactions(prev => [{
        id: `TX-AJO-PAY-${Math.floor(1000 + Math.random() * 9000)}`,
        amount: pool.targetAmount,
        type: 'payout',
        status: 'success',
        sender: "Balogun Market Association",
        recipient: pool.recipient,
        date: timestamp,
        description: `Ajo Pool Disbursal - Cycle Beneficiary: ${pool.recipient}`,
        paymentChannel: "Nomba Payout API"
      }, ...prev]);
      
      addLog('NOMBA_API', `Ajo Pool disburse success: ₦${pool.targetAmount.toLocaleString()} paid to ${pool.recipient}.`);
      addLog('AI_AGENT', `Ajo cycle closed. Automated payout registered for ${pool.recipient}.`);
      showToast(`Ajo Pool Disbursed: ₦${pool.targetAmount.toLocaleString()} sent to ${pool.recipient}!`, 'success');
    }, 1000);
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
          
          <span className="nav-section-title">Insights</span>
          <div className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>
            <BarChart3 />
            <span>Analytics</span>
          </div>
          
          <span className="nav-section-title">Support</span>
          <div className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
            <Settings />
            <span>Settings</span>
          </div>
          <div className={`nav-item ${activeTab === 'help' ? 'active' : ''}`} onClick={() => setActiveTab('help')}>
            <HelpCircle />
            <span>Help & Support</span>
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
        
        {/* VIEW 1: DASHBOARD */}
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

        {/* VIEW 2: SMART PAYMENTS */}
        {activeTab === 'collections' && (
          <div className="dashboard-grid">
            <div className="card" style={{ gridColumn: 'span 7' }}>
              <div className="card-header-flex">
                <span className="card-title"><CreditCard /> Active Payment Links</span>
                <button className="btn btn-secondary" onClick={() => setShowPaymentLinkModal(true)}>
                  <Plus size={16} /> Add Link
                </button>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '16px' }}>
                Generate immediate Nomba checkout links to accept cards, bank transfers, and mobile money.
              </p>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Description</th>
                      <th>Link URL</th>
                      <th>Status</th>
                      <th>Amount</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.filter(t => t.type === 'payment_link').map(t => (
                      <tr key={t.id}>
                        <td style={{ fontWeight: 600 }}>{t.sender}</td>
                        <td>{t.description}</td>
                        <td>
                          <code style={{ fontSize: '11px', color: 'var(--electric-blue-bright)' }}>
                            https://pay.nomba.com/l/{t.id.toLowerCase()}
                          </code>
                        </td>
                        <td>
                          <span className={`badge ${t.status}`}>{t.status}</span>
                        </td>
                        <td style={{ fontWeight: 700 }}>₦{t.amount.toLocaleString()}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '11px' }} onClick={() => {
                              navigator.clipboard.writeText(`https://pay.nomba.com/l/${t.id.toLowerCase()}`);
                              showToast("Payment link copied to clipboard!", "success");
                            }}>
                              Copy
                            </button>
                            {t.status === 'pending' && (
                              <button className="btn btn-gold" style={{ padding: '4px 8px', fontSize: '11px', color: 'var(--bg-darkest)' }} onClick={() => {
                                setTransactions(prev => prev.map(item => item.id === t.id ? { ...item, status: 'success' } : item));
                                setBalance(prev => prev + t.amount);
                                addLog('WEBHOOK', `[NOMBA WEBHOOK] payment.link.paid | TXID: ${t.id} | Amount: ₦${t.amount.toLocaleString()} | Customer: ${t.sender} settled.`);
                                showToast(`Webhook simulated: ₦${t.amount.toLocaleString()} received from ${t.sender}!`, 'success');
                              }}>
                                Settle
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card" style={{ gridColumn: 'span 5' }}>
              <div className="card-header-flex">
                <span className="card-title"><Building /> Active Virtual Accounts</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '16px' }}>
                Dedicated Providus/Wema bank accounts assigned to customers for automatic webhook reconciliation.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {tenants.map(t => (
                  <div key={t.id} style={{ padding: '14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-darker)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 700 }}>{t.name}</span>
                      <span className="badge success">Active</span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
                      <div>Bank: <b>Providus Bank</b></div>
                      <div>Account: <b>902837482{t.id.slice(-1)}</b></div>
                      <div>Assigned: <b>Property Flat</b></div>
                      <div>Webhook Target: <b>Rent Handler</b></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{ gridColumn: 'span 6' }}>
              <div className="card-header-flex">
                <span className="card-title"><ShieldAlert /> Real-time Payment Security Inspector</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '12px' }}>
                AI monitors incoming payment signatures to stop chargebacks and flag fraud prior to Nomba settlement.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ borderLeft: '3px solid var(--danger-red)', padding: '10px', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '4px', fontSize: '12px' }}>
                  <div style={{ fontWeight: 700, color: 'var(--danger-red)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldAlert size={14} /> Suspicious Transaction Flagged (TX-9019)
                  </div>
                  <div style={{ margin: '4px 0', color: 'var(--text-primary)' }}>
                    Amount: ₦320,000 | Sender: Unknown Cardholder
                  </div>
                  <div style={{ color: 'var(--text-secondary)' }}>
                    AI Analysis: Card BIN issued in Brazil (BIN: 453271), executing from IP address in Ikeja, Nigeria. Session velocity exceeded standard thresholds. Settle on Hold.
                  </div>
                </div>

                <div style={{ borderLeft: '3px solid var(--success-green)', padding: '10px', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '4px', fontSize: '12px' }}>
                  <div style={{ fontWeight: 700, color: 'var(--success-green)' }}>
                    Verified Remittance Route (TX-9020)
                  </div>
                  <div style={{ margin: '4px 0', color: 'var(--text-primary)' }}>
                    Amount: ₦620,000 ($400 USDT Equivalent) | Sender: Chidi Obi (UK)
                  </div>
                  <div style={{ color: 'var(--text-secondary)' }}>
                    AI Analysis: Payout routed via NOWPayments API, settled to Nomba MFB account. Wallet signature matches historical UK remittance cycles. Verified & Cleared.
                  </div>
                </div>
              </div>
            </div>

            <div className="card" style={{ gridColumn: 'span 6' }}>
              <div className="card-header-flex">
                <span className="card-title"><Globe /> Crypto Acceptance Portal</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '16px' }}>
                Accept USDT/USDC directly from customers and instantly convert/route as Naira to your Nomba Wallet.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', background: 'var(--bg-darker)', padding: '16px', borderRadius: '8px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>USDT/USDC Live Rate</div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--accent-gold)', margin: '4px 0' }}>₦1,550.00 / $1</div>
                  <div style={{ fontSize: '11px', color: 'var(--success-green)' }}>+0.4% in 24h • AI conversion optimized</div>
                </div>
                <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '4px' }}>
                  <div>• Settle to: <b>Nomba Wallet (1023948576)</b></div>
                  <div>• Network: <b>TRON (TRC-20) / Polygon</b></div>
                  <div>• Gateway: <b>NOWPayments API Webhook</b></div>
                </div>
              </div>
              
              <button className="btn btn-gold" style={{ width: '100%', marginTop: '16px' }} onClick={() => setActiveTab('diaspora')}>
                Go to Diaspora Remittance Portal
              </button>
            </div>
          </div>
        )}

        {/* VIEW 3: RENT & PROPERTY MANAGER */}
        {activeTab === 'rent' && (
          <div className="dashboard-grid">
            <div className="card" style={{ gridColumn: 'span 12' }}>
              <div className="card-header-flex">
                <span className="card-title"><Building /> Real Estate Portfolio & Tenant Ledger</span>
                <button className="btn" onClick={() => setShowAddTenantModal(true)}>
                  <Plus size={16} /> Add Property / Tenant
                </button>
              </div>

              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Tenant</th>
                      <th>Property Assigned</th>
                      <th>Monthly Rent</th>
                      <th>Due Date</th>
                      <th>AI Default Risk</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tenants.map(t => (
                      <tr key={t.id}>
                        <td style={{ fontWeight: 700 }}>{t.name}</td>
                        <td>{t.property}</td>
                        <td style={{ fontFamily: 'var(--font-mono)' }}>₦{t.rentAmount.toLocaleString()}</td>
                        <td>{t.dueDate}</td>
                        <td>
                          <span
                            className={`badge ${t.riskScore}`}
                            style={{ cursor: 'pointer' }}
                            onClick={() => setActiveRiskTenant(t)}
                            title="Click to view AI Risk Profile"
                          >
                            {t.riskScore} Risk
                          </span>
                          <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '2px', maxWidth: '280px' }}>
                            {t.riskAnalysis}
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${t.status}`}>{t.status}</span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            {t.status !== 'paid' && (
                              <button className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '11px' }} onClick={() => triggerRentNudge(t)}>
                                Draft Nudge
                              </button>
                            )}
                            <button className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '11px' }} onClick={() => {
                              showToast(`Rent Webhook Simulated for ${t.name}`, 'info');
                              simulatePaymentWebhook('rent');
                            }}>
                              Simulate Webhook Pay
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card" style={{ gridColumn: 'span 6' }}>
              <div className="card-header-flex">
                <span className="card-title"><MessageSquare /> AI Nudge Draft Engine</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '16px' }}>
                When tenants fall behind, the AI analyzes payment history and generates personalized reminders in English or Pidgin to encourage quick settlement without friction.
              </p>
              
              <div style={{ background: 'var(--bg-darker)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid var(--accent-gold)', fontSize: '13px' }}>
                <div style={{ fontWeight: 700, marginBottom: '6px', color: 'var(--accent-gold)' }}>Auto-Draft Template: Default Risk (Segun Arinze)</div>
                <p style={{ fontStyle: 'italic', color: 'var(--text-primary)' }}>
                  "Abeg Segun, how body? PulseAI notice say the rent for Office Suite 3B (₦350,000) overdue since June 25. Cash flow is important for business, so click this Nomba link to clear: pay.nomba.com/l/tx-segun. Bless up."
                </p>
              </div>
            </div>

            <div className="card" style={{ gridColumn: 'span 6' }}>
              <div className="card-header-flex">
                <span className="card-title"><Globe /> Diaspora Tenant Portal</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '12px' }}>
                Do you have tenant sponsors living abroad? They can settle invoices using USDC/USDT directly from their wallets, routing to your Nomba account in Nigeria.
              </p>
              <div style={{ border: '1px dashed var(--border-color)', padding: '16px', borderRadius: '8px', background: 'var(--bg-darkest)', textAlign: 'center' }}>
                <Globe size={32} style={{ color: 'var(--electric-blue-bright)', marginBottom: '8px' }} />
                <div style={{ fontWeight: 700, fontSize: '14px' }}>Diaspora Sponsor Checkout active</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '4px 0' }}>Saves 12% on conversion fees relative to standard remittance corridors.</div>
                <button className="btn btn-secondary" style={{ marginTop: '8px' }} onClick={() => setActiveTab('diaspora')}>
                  Open Remittance Interface
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: PAYROLL & STAFF */}
        {activeTab === 'payroll' && (
          <div className="dashboard-grid">
            
            {/* Duplication anomaly alert */}
            {employees.some(e => e.isDuplicate) && (
              <div className="card" style={{ gridColumn: 'span 12', borderColor: 'var(--danger-red)', background: 'rgba(239, 68, 68, 0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <ShieldAlert size={24} style={{ color: 'var(--danger-red)' }} />
                    <div>
                      <h4 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '15px' }}>🚨 Payroll Anomaly Detected by PulseAI</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: '4px 0 0 0' }}>
                        Victor Nwachukwu (EMP-04) is listed twice with matching bank details (Nomba MFB - 1019948271) under Creative & Design. Bulk payout is blocked to avoid loss of funds.
                      </p>
                    </div>
                  </div>
                  <button className="btn btn-gold" onClick={handleRemoveDuplicate}>
                    Resolve duplicate entry
                  </button>
                </div>
              </div>
            )}

            <div className="card" style={{ gridColumn: 'span 12' }}>
              <div className="card-header-flex">
                <span className="card-title"><Users /> Employee Directory & Bulk Payout Console</span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="btn btn-secondary" onClick={() => {
                    setEmployees(prev => prev.map(e => ({ ...e, status: 'unpaid' })));
                    showToast("Payroll reset to unpaid state", "info");
                  }} disabled={isPayingSalaries}>
                    Reset Payroll
                  </button>
                  <button className="btn" onClick={runSalaryDay} disabled={isPayingSalaries}>
                    {isPayingSalaries ? "Disbursing..." : "One-Click Salary Day"}
                  </button>
                </div>
              </div>

              {isPayingSalaries && (
                <div style={{ background: 'var(--bg-darker)', padding: '16px', borderRadius: '8px', marginBottom: '16px', borderLeft: '3px solid var(--accent-gold)' }}>
                  <style>{`
                    @keyframes payoutProgress {
                      0% { transform: translateX(-100%); }
                      100% { transform: translateX(150%); }
                    }
                  `}</style>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)' }}>Executing Nomba Bulk Payout API ...</span>
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--accent-gold)', fontWeight: 700 }}>Processing</span>
                  </div>
                  <div style={{ height: '4px', background: 'var(--border-color)', borderRadius: '2px', overflow: 'hidden', position: 'relative' }}>
                    <div style={{ height: '100%', width: '40%', background: 'var(--accent-gold)', position: 'absolute', left: 0, top: 0, animation: 'payoutProgress 1.2s infinite ease-in-out' }}></div>
                  </div>
                </div>
              )}

              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Emp ID</th>
                      <th>Name</th>
                      <th>Department</th>
                      <th>Nomba Bank Details</th>
                      <th>Monthly Salary</th>
                      <th>Last Payout</th>
                      <th>Status</th>
                      <th>Payslip</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map(e => (
                      <tr key={e.id} style={e.isDuplicate ? { backgroundColor: 'rgba(239, 68, 68, 0.04)' } : {}}>
                        <td style={{ fontFamily: 'var(--font-mono)' }}>{e.id}</td>
                        <td style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                          {e.name}
                          {e.isDuplicate && <span className="badge high" style={{ fontSize: '8px', padding: '2px 4px' }}>DUPLICATE</span>}
                        </td>
                        <td>{e.department}</td>
                        <td>{e.bank} - {e.accountNumber}</td>
                        <td style={{ fontWeight: 700 }}>₦{e.salary.toLocaleString()}</td>
                        <td>{e.lastPaidDate || 'Not paid this cycle'}</td>
                        <td>
                          <span className={`badge ${e.status === 'paid' ? 'success' : 'pending'}`}>{e.status}</span>
                        </td>
                        <td>
                          {e.status === 'paid' ? (
                            <button className="btn btn-secondary" style={{ padding: '2px 8px', fontSize: '11px' }} onClick={() => setShowPayslipModal(e)}>
                              <FileText size={12} /> View Payslip
                            </button>
                          ) : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card" style={{ gridColumn: 'span 6' }}>
              <div className="card-header-flex">
                <span className="card-title"><TrendingUp /> Optimal Salary Payout Date Selector</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '16px' }}>
                AI analyzes payment clearance data from your Nomba links and virtual accounts to find the day with maximum cash flow liquid buffer.
              </p>
              
              <div style={{ background: 'var(--bg-darker)', padding: '16px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>AI Optimal Date</div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--electric-blue-bright)', margin: '4px 0' }}>July 28th</div>
                  <div style={{ fontSize: '11px', color: 'var(--success-green)' }}>Reconciles with 94% of tenant payments</div>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', maxWidth: '240px' }}>
                  "Paying salaries on the 28th decreases overdraft risk by 45%. Settle on this day because merchant card settle lag matches weekend cycle."
                </div>
              </div>
            </div>

            <div className="card" style={{ gridColumn: 'span 6' }}>
              <div className="card-header-flex">
                <span className="card-title"><Users /> Nomba Payout Integration Status</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '12px' }}>
                <div style={{ border: '1px solid var(--border-color)', padding: '10px', borderRadius: '6px' }}>
                  <div style={{ color: 'var(--text-muted)' }}>API Status</div>
                  <div style={{ fontWeight: 700, color: 'var(--success-green)' }}>OPERATIONAL</div>
                </div>
                <div style={{ border: '1px solid var(--border-color)', padding: '10px', borderRadius: '6px' }}>
                  <div style={{ color: 'var(--text-muted)' }}>Daily limit</div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>₦5,000,000 / ₦5m</div>
                </div>
                <div style={{ border: '1px solid var(--border-color)', padding: '10px', borderRadius: '6px' }}>
                  <div style={{ color: 'var(--text-muted)' }}>Bulk payout latency</div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>0.8 seconds / trx</div>
                </div>
                <div style={{ border: '1px solid var(--border-color)', padding: '10px', borderRadius: '6px' }}>
                  <div style={{ color: 'var(--text-muted)' }}>Webhook endpoint</div>
                  <div style={{ fontWeight: 700, color: 'var(--electric-blue-bright)' }}>ACTIVE</div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* VIEW 5: INVENTORY INTEL */}
        {activeTab === 'inventory' && (
          <div className="dashboard-grid">
            <div className="card" style={{ gridColumn: 'span 8' }}>
              <div className="card-header-flex">
                <span className="card-title"><Package /> Stock Ledger & Shop Performance</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '16px' }}>
                Inventory levels auto-deduct in real time as sales webhooks settle via Nomba checkout interfaces.
              </p>

              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Unit Price</th>
                      <th>Current Stock</th>
                      <th>Weekly Velocity</th>
                      <th>AI Stockout Predictor</th>
                      <th>Supplier</th>
                      <th>Total Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id}>
                        <td style={{ fontWeight: 700 }}>{p.name}</td>
                        <td>₦{p.price.toLocaleString()}</td>
                        <td style={{ fontWeight: 700, color: p.stock <= p.reorderPoint ? 'var(--danger-red)' : 'var(--text-primary)' }}>
                          {p.stock} units
                        </td>
                        <td>{p.velocity} units / wk</td>
                        <td>
                          {p.stock <= p.reorderPoint ? (
                            <span className="badge high" style={{ fontSize: '10px' }}>
                              Stockout in {Math.round((p.stock / p.velocity) * 7)} days!
                            </span>
                          ) : (
                            <span className="badge success" style={{ fontSize: '10px' }}>
                              Safe ({Math.round((p.stock / p.velocity) * 7)} days buffer)
                            </span>
                          )}
                        </td>
                        <td>{p.supplier}</td>
                        <td style={{ fontWeight: 800, fontFamily: 'var(--font-mono)' }}>₦{p.revenue.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card" style={{ gridColumn: 'span 4' }}>
              <div className="card-header-flex">
                <span className="card-title"><MessageSquare /> AI Reorder Engine</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '16px' }}>
                AI analyzes sales trends and automatically drafts order invoices to suppliers based on cash balance.
              </p>

              <div style={{ background: 'var(--bg-darker)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid var(--danger-red)', fontSize: '13px', marginBottom: '14px' }}>
                <div style={{ fontWeight: 700, color: 'var(--danger-red)', marginBottom: '4px' }}>Critical Action Required: Sleek Kaftan</div>
                <p style={{ color: 'var(--text-primary)' }}>
                  Velocity is high (5 units/wk), current stock: 3 units. Expected stockout date is tomorrow.
                </p>
                <div style={{ marginTop: '8px', fontWeight: 600, color: 'var(--accent-gold)' }}>
                  Recommended: Order 25 units from Kano Cotton Mills (₦1,625,000). Cash flow supports this spend.
                </div>
              </div>

              <button className="btn btn-gold" style={{ width: '100%' }} onClick={() => {
                showToast("Reorder order sent to Kano Cotton Mills via simulated API", "success");
                addLog('NOMBA_API', "Outgoing payout invoice created: ₦1,625,000 pending vendor payout confirmation");
              }}>
                Disburse Payout & Restock
              </button>
            </div>
          </div>
        )}

        {/* VIEW 6: EXPENSE INTEL */}
        {activeTab === 'expenses' && (
          <div className="dashboard-grid">
            
            {/* Log expense */}
            <div className="card" style={{ gridColumn: 'span 5' }}>
              <div className="card-header-flex">
                <span className="card-title"><Plus /> Log Outgoing Expense</span>
              </div>
              <form onSubmit={handleAddExpense}>
                <div className="form-group">
                  <label>Description (Plain English or Pidgin)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Bought Mikano diesel fuel N180,000"
                    value={newExpense.description}
                    onChange={e => setNewExpense(prev => ({ ...prev, description: e.target.value }))}
                    required
                  />
                  {newExpense.description && (
                    <div style={{ marginTop: '8px', fontSize: '12px', background: 'var(--bg-darker)', padding: '8px 12px', borderRadius: '6px', borderLeft: '3px solid var(--accent-gold)' }}>
                      🔮 <b>PulseAI Live Category Preview:</b> <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>{(() => {
                        const desc = newExpense.description.toLowerCase();
                        if (desc.includes('fuel') || desc.includes('diesel') || desc.includes('generator') || desc.includes('gas')) return 'Generator/Fuel';
                        if (desc.includes('uber') || desc.includes('transport') || desc.includes('dispatch') || desc.includes('fare')) return 'Transport';
                        if (desc.includes('market') || desc.includes('goods') || desc.includes('materials') || desc.includes('lace') || desc.includes('buttons')) return 'Market Run';
                        if (desc.includes('airtime') || desc.includes('data') || desc.includes('wifi') || desc.includes('internet') || desc.includes('mtn')) return 'Data/Airtime';
                        if (desc.includes('lunch') || desc.includes('food') || desc.includes('feeding') || desc.includes('catering')) return 'Staff Feeding';
                        if (desc.includes('shipping') || desc.includes('delivery') || desc.includes('logistics')) return 'Logistics';
                        return 'Uncategorized';
                      })()}</span>
                    </div>
                  )}
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginTop: '6px' }}>
                    AI will auto-categorize your categories based on keywords.
                  </span>
                </div>
                <div className="form-group">
                  <label>Amount (₦)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="e.g. 180000"
                    value={newExpense.amount}
                    onChange={e => setNewExpense(prev => ({ ...prev, amount: e.target.value }))}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-gold" style={{ width: '100%', marginTop: '8px' }}>
                  Log & Categorize Expense
                </button>
              </form>
            </div>

            {/* AI Wasteful Spending box */}
            <div className="card" style={{ gridColumn: 'span 7' }}>
              <div className="card-header-flex">
                <span className="card-title"><ShieldAlert /> AI Waste & Efficiency Alerts</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ background: 'var(--bg-darker)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid var(--danger-red)' }}>
                  <div style={{ fontWeight: 700, color: 'var(--danger-red)', fontSize: '14px', marginBottom: '4px' }}>
                    🚨 Heavy Fuel Inefficiency Detected
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                    You spent ₦{expenses.filter(e => e.category === 'Generator/Fuel').reduce((sum, e) => sum + e.amount, 0).toLocaleString()} on generator fuel this month. This represents over 35% of total operational costs.
                  </p>
                  <div style={{ fontSize: '12px', color: 'var(--accent-gold)', marginTop: '8px', fontWeight: 600 }}>
                    💡 PulseAI Recommendation: Cut fuel bills by installing a solar inverter hybrid array. Break-even achieved in 11 months based on NGN trends.
                  </div>
                </div>

                <div style={{ background: 'var(--bg-darker)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid var(--electric-blue)' }}>
                  <div style={{ fontWeight: 700, color: 'var(--electric-blue-bright)', fontSize: '14px', marginBottom: '4px' }}>
                    📈 Budget Clearance Indicator
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                    Overall monthly spend ratio: {Math.round((expenses.reduce((s, e) => s + e.amount, 0) / balance) * 100)}% of Nomba liquidity. Cash buffer remains solid.
                  </p>
                </div>
              </div>
            </div>

            {/* Expense table */}
            <div className="card" style={{ gridColumn: 'span 12' }}>
              <div className="card-header-flex">
                <span className="card-title"><PieChart /> Expense Ledger</span>
                <button className="btn btn-secondary" onClick={() => {
                  setExpenses([]);
                  showToast("Expenses cleared", "info");
                }}>
                  Clear All
                </button>
              </div>

              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Expense Description</th>
                      <th>Date Logged</th>
                      <th>Auto-Categorized Group</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map(e => (
                      <tr key={e.id}>
                        <td style={{ fontWeight: 600 }}>{e.description}</td>
                        <td>{e.date}</td>
                        <td>
                          <span className="badge success" style={{ textTransform: 'uppercase', fontSize: '11px', background: 'rgba(0,102,255,0.08)', color: 'var(--electric-blue-bright)' }}>
                            {e.category}
                          </span>
                        </td>
                        <td style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>₦{e.amount.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 7: AJO & CO-OP */}
        {activeTab === 'ajo' && (
          <div className="dashboard-grid">
            <div className="card" style={{ gridColumn: 'span 12' }}>
              <div className="card-header-flex">
                <span className="card-title"><TrendingUp /> Ajo & Cooperative Collections Dashboard</span>
                <span className="badge success">Active Pool</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '16px' }}>
                Create automated ajo contribution circles. Members pay via Nomba links; AI predicts defaults and triggers SMS nudges.
              </p>

              {ajoPools.map(pool => (
                <div key={pool.id} style={{ background: 'var(--bg-darker)', padding: '20px', borderRadius: '10px', border: '1px solid var(--border-color)', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div>
                      <h4 style={{ fontSize: '16px', fontWeight: 800 }}>{pool.name}</h4>
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Target: ₦{pool.targetAmount.toLocaleString()} • Current Recipient: <b>{pool.recipient}</b></span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--electric-blue-bright)' }}>
                        ₦{pool.currentContribution.toLocaleString()}
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}> of ₦{pool.targetAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div style={{ height: '8px', background: 'var(--bg-darkest)', borderRadius: '4px', overflow: 'hidden', marginBottom: '20px' }}>
                    <div style={{ height: '100%', background: 'linear-gradient(to right, var(--electric-blue), var(--electric-blue-bright))', width: `${(pool.currentContribution / pool.targetAmount) * 100}%` }}></div>
                  </div>

                  {/* Members contribution table */}
                  <div className="table-wrapper">
                    <table style={{ margin: 0 }}>
                      <thead>
                        <tr>
                          <th>Member</th>
                          <th>Allocation Amount</th>
                          <th>Status</th>
                          <th>AI Delinquency Predictor</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pool.members.map((m, idx) => (
                          <tr key={idx}>
                            <td style={{ fontWeight: 600 }}>{m.name}</td>
                            <td>₦{m.amount.toLocaleString()}</td>
                            <td>
                              <span className={`badge ${m.paid ? 'success' : 'pending'}`}>
                                {m.paid ? 'Paid' : 'Unpaid'}
                              </span>
                            </td>
                            <td>
                              <span className={`badge ${m.riskScore}`}>
                                {m.riskScore} Default Risk
                              </span>
                              <span style={{ fontSize: '11px', color: 'var(--text-secondary)', marginLeft: '10px' }}>
                                {m.riskAnalysis}
                              </span>
                            </td>
                            <td>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                {!m.paid && (
                                  <button className="btn btn-secondary" style={{ padding: '2px 8px', fontSize: '11px' }} onClick={() => {
                                    const memberObj = { name: m.name, property: pool.name, rentAmount: m.amount, dueDate: 'Today', id: pool.id, isAjo: true };
                                    const nudgeDraft = generateNudgeText(memberObj, 'pidgin');
                                    setShowNudgeModal({ open: true, tenant: memberObj, tone: 'pidgin', draft: nudgeDraft });
                                  }}>
                                    Nudge Member
                                  </button>
                                )}
                                {!m.paid && (
                                  <button className="btn btn-secondary" style={{ padding: '2px 8px', fontSize: '11px' }} onClick={() => {
                                    showToast(`Ajo webhook payment simulated for ${m.name}`, 'info');
                                    simulatePaymentWebhook('ajo');
                                  }}>
                                    Simulate Pay
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {pool.currentContribution >= pool.targetAmount && pool.status === 'active' && (
                    <div style={{ background: 'rgba(255, 184, 0, 0.05)', border: '1px solid var(--accent-gold)', borderRadius: '8px', padding: '16px', marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>🎉 Ajo Pool Fully Funded! (100% Capacity)</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                          All members have contributed. Total ₦{pool.currentContribution.toLocaleString()} is ready to be disbursed to <b>{pool.recipient}</b>.
                        </div>
                      </div>
                      <button className="btn btn-gold" onClick={() => handleAjoPayout(pool.id)}>
                        Payout Beneficiary Now
                      </button>
                    </div>
                  )}

                  {pool.status === 'completed' && (
                    <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid var(--success-green)', borderRadius: '8px', padding: '12px 16px', marginTop: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ color: 'var(--success-green)', fontWeight: 'bold' }}>✓</span>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                        Ajo cycle completed! ₦{pool.targetAmount.toLocaleString()} has been paid out to <b>{pool.recipient}</b> via Nomba Bulk Payout Rails.
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 8: DIASPORA REMITTANCE */}
        {activeTab === 'diaspora' && (
          <div className="dashboard-grid">
            <div className="card" style={{ gridColumn: 'span 5' }}>
              <div className="card-header-flex">
                <span className="card-title"><Globe /> Send USDT/USDC from Abroad</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '16px' }}>
                Diaspora sponsors can send crypto which instantly routes via NOWPayments, converts at live parallel rates, and delivers as Naira via Nomba payouts.
              </p>

              <form onSubmit={handleRemittanceSubmit}>
                <div className="form-group">
                  <label>Sender Name (e.g. UK/US Family Member)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Chidi Obi"
                    value={cryptoForm.sender}
                    onChange={e => setCryptoForm(prev => ({ ...prev, sender: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>USDT/USDC Amount ($)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={cryptoForm.amountUsd}
                    onChange={e => setCryptoForm(prev => ({ ...prev, amountUsd: e.target.value }))}
                    required
                  />
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    Equivalent: <b>₦{(Number(cryptoForm.amountUsd) * 1550).toLocaleString()} NGN</b>
                  </div>
                </div>
                <div className="form-group">
                  <label>Nomba Recipient Account Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={cryptoForm.recipientAccount}
                    onChange={e => setCryptoForm(prev => ({ ...prev, recipientAccount: e.target.value }))}
                    required
                  />
                </div>
                
                <button type="submit" className="btn btn-gold" style={{ width: '100%', marginTop: '10px' }}>
                  Simulate Crypto Remittance
                </button>
              </form>
            </div>

            <div className="card" style={{ gridColumn: 'span 7' }}>
              <div className="card-header-flex">
                <span className="card-title"><TrendingUp /> Rate Trends & Remittance AI Intelligence</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '16px' }}>
                AI analyzes volatility indices across Binance P2P and Nigerian Central Bank APIs to advise on conversion optimization.
              </p>

              <div style={{ background: 'var(--bg-darker)', padding: '16px', borderRadius: '10px', borderLeft: '3px solid var(--electric-blue)', marginBottom: '16px' }}>
                <div style={{ fontWeight: 700, color: 'var(--electric-blue-bright)', fontSize: '14px', marginBottom: '4px' }}>
                  💡 PulseAI Remittance Advisory
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                  Parallel rates are sitting at <b>₦1,550/$</b>. Rate charts display key resistance at ₦1,565. The market is projected to pull back slightly by 1.2% tomorrow due to capital inflows. 
                </p>
                <div style={{ marginTop: '10px', fontWeight: 600, color: 'var(--accent-gold)' }}>
                  Recommendation: SELL dollars today. Initiating remittance now increases Naira yield relative to weekend settlements.
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '12px', marginBottom: '20px' }}>
                <div style={{ border: '1px solid var(--border-color)', padding: '10px', borderRadius: '6px' }}>
                  <div style={{ color: 'var(--text-muted)' }}>Nomba FX Settler</div>
                  <div style={{ fontWeight: 700, color: 'var(--success-green)' }}>ACTIVE</div>
                </div>
                <div style={{ border: '1px solid var(--border-color)', padding: '10px', borderRadius: '6px' }}>
                  <div style={{ color: 'var(--text-muted)' }}>Liquidity Route</div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>NOWPayments API</div>
                </div>
              </div>

              {/* Corridor Fee & Yield Comparison */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' }}>
                  Corridor Comparison Widget ($500 Remittance Value)
                </div>
                <div className="table-wrapper">
                  <table style={{ margin: 0 }}>
                    <thead>
                      <tr>
                        <th>Remittance Method</th>
                        <th>FX Spread / Fees</th>
                        <th>Settlement speed</th>
                        <th>Recipient gets (Naira)</th>
                        <th>Efficiency</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ fontWeight: 600 }}>Traditional Bank Wire</td>
                        <td>$35 fee + 12% spread</td>
                        <td>3 - 5 Business Days</td>
                        <td>₦682,000</td>
                        <td><span className="badge flagged">Low (81%)</span></td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 600 }}>Standard Agent (WU/Ria)</td>
                        <td>$12 fee + 7% spread</td>
                        <td>1 - 2 Business Days</td>
                        <td>₦720,750</td>
                        <td><span className="badge pending">Med (92%)</span></td>
                      </tr>
                      <tr style={{ background: 'var(--electric-blue-glow)' }}>
                        <td style={{ fontWeight: 800, color: 'var(--accent-gold)' }}>PulseStack (Nomba)</td>
                        <td>$0 fee + 0.4% spread</td>
                        <td><b>0.8 seconds (Instant)</b></td>
                        <td style={{ fontWeight: 800, color: 'var(--accent-gold)' }}>₦771,900</td>
                        <td><span className="badge success" style={{ background: 'var(--success-green)', color: 'var(--bg-darkest)' }}>MAX (99.6%)</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* VIEW 9: ANALYTICS & REPORTS */}
        {activeTab === 'analytics' && (
          <div className="dashboard-grid">
            <div className="card" style={{ gridColumn: 'span 12' }}>
              <div className="card-header-flex">
                <span className="card-title"><BarChart3 /> Business Analytics Dashboard</span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="btn btn-secondary" style={{ padding: '4px 12px', fontSize: '12px' }}>
                    <Calendar size={14} /> Last 30 Days
                  </button>
                  <button className="btn btn-secondary" style={{ padding: '4px 12px', fontSize: '12px' }}>
                    <Download size={14} /> Export Report
                  </button>
                </div>
              </div>
            </div>

            {/* Revenue Overview */}
            <div className="card" style={{ gridColumn: 'span 4' }}>
              <div className="card-header-flex">
                <span className="card-title"><TrendingUp /> Total Revenue</span>
                <span className="badge success">This Month</span>
              </div>
              <div style={{ fontSize: '36px', fontWeight: 800, color: 'var(--success-green)', fontFamily: 'var(--font-mono)' }}>
                ₦4.85M
              </div>
              <div style={{ fontSize: '12px', color: 'var(--success-green)', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <TrendingUp size={14} /> +23.5% vs last month
              </div>
              <div style={{ marginTop: '16px', height: '80px' }}>
                <svg viewBox="0 0 200 50" style={{ width: '100%', height: '100%' }}>
                  <path d="M 0,40 L 30,35 L 60,38 L 90,25 L 120,20 L 150,15 L 180,10 L 200,5" fill="none" stroke="var(--success-green)" strokeWidth="2" />
                  <path d="M 0,40 L 30,35 L 60,38 L 90,25 L 120,20 L 150,15 L 180,10 L 200,5 L 200,50 L 0,50 Z" fill="url(#greenGrad)" opacity="0.2" />
                  <defs>
                    <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--success-green)" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Expenses Overview */}
            <div className="card" style={{ gridColumn: 'span 4' }}>
              <div className="card-header-flex">
                <span className="card-title"><PieChart /> Total Expenses</span>
              </div>
              <div style={{ fontSize: '36px', fontWeight: 800, color: 'var(--danger-red)', fontFamily: 'var(--font-mono)' }}>
                ₦1.12M
              </div>
              <div style={{ fontSize: '12px', color: 'var(--danger-red)', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <TrendingUp size={14} style={{ transform: 'rotate(180deg)' }} /> +8.2% vs last month
              </div>
              <div style={{ marginTop: '16px', height: '80px' }}>
                <svg viewBox="0 0 200 50" style={{ width: '100%', height: '100%' }}>
                  <path d="M 0,30 L 30,32 L 60,28 L 90,35 L 120,30 L 150,38 L 180,40 L 200,42" fill="none" stroke="var(--danger-red)" strokeWidth="2" />
                  <path d="M 0,30 L 30,32 L 60,28 L 90,35 L 120,30 L 150,38 L 180,40 L 200,42 L 200,50 L 0,50 Z" fill="url(#redGrad)" opacity="0.2" />
                  <defs>
                    <linearGradient id="redGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--danger-red)" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Net Profit */}
            <div className="card" style={{ gridColumn: 'span 4' }}>
              <div className="card-header-flex">
                <span className="card-title"><Activity /> Net Profit</span>
              </div>
              <div style={{ fontSize: '36px', fontWeight: 800, color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)' }}>
                ₦3.73M
              </div>
              <div style={{ fontSize: '12px', color: 'var(--success-green)', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <TrendingUp size={14} /> +31.2% margin
              </div>
              <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                <div style={{ flex: 1, background: 'var(--bg-darker)', padding: '8px', borderRadius: '6px', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Margin</div>
                  <div style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>77%</div>
                </div>
                <div style={{ flex: 1, background: 'var(--bg-darker)', padding: '8px', borderRadius: '6px', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Growth</div>
                  <div style={{ fontWeight: 700, color: 'var(--success-green)' }}>+18%</div>
                </div>
              </div>
            </div>

            {/* Payment Channels Breakdown */}
            <div className="card" style={{ gridColumn: 'span 6' }}>
              <div className="card-header-flex">
                <span className="card-title"><CreditCard /> Payment Channels</span>
                <button className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '11px' }}>
                  <Filter size={12} /> Filter
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
                {[
                  { name: 'Payment Links', amount: 1850000, percent: 38, color: 'var(--electric-blue)' },
                  { name: 'Virtual Accounts', amount: 1520000, percent: 31, color: 'var(--accent-gold)' },
                  { name: 'QR Code Payments', amount: 980000, percent: 20, color: 'var(--success-green)' },
                  { name: 'Crypto Remittance', amount: 500000, percent: 11, color: 'var(--warning-yellow)' }
                ].map((channel, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '100px', fontSize: '12px', color: 'var(--text-secondary)' }}>{channel.name}</div>
                    <div style={{ flex: 1, height: '8px', background: 'var(--bg-darker)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${channel.percent}%`, height: '100%', background: channel.color, borderRadius: '4px' }} />
                    </div>
                    <div style={{ width: '80px', textAlign: 'right', fontSize: '12px', fontWeight: 600 }}>₦{(channel.amount / 1000000).toFixed(2)}M</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Expense Categories */}
            <div className="card" style={{ gridColumn: 'span 6' }}>
              <div className="card-header-flex">
                <span className="card-title"><PieChart /> Expense Categories</span>
              </div>
              <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                <div style={{ width: '150px', height: '150px', position: 'relative' }}>
                  <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                    <circle cx="50" cy="50" r="40" fill="none" stroke="var(--bg-darker)" strokeWidth="20" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="var(--danger-red)" strokeWidth="20" strokeDasharray="75 251" strokeDashoffset="0" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="var(--warning-yellow)" strokeWidth="20" strokeDasharray="50 251" strokeDashoffset="-75" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="var(--electric-blue)" strokeWidth="20" strokeDasharray="40 251" strokeDashoffset="-125" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="var(--success-green)" strokeWidth="20" strokeDasharray="35 251" strokeDashoffset="-165" />
                  </svg>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                  {[
                    { name: 'Generator/Fuel', percent: 30, color: 'var(--danger-red)' },
                    { name: 'Staff Feeding', percent: 20, color: 'var(--warning-yellow)' },
                    { name: 'Transport', percent: 16, color: 'var(--electric-blue)' },
                    { name: 'Data/Airtime', percent: 14, color: 'var(--success-green)' },
                    { name: 'Others', percent: 20, color: 'var(--text-muted)' }
                  ].map((cat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: cat.color }} />
                      <span style={{ flex: 1 }}>{cat.name}</span>
                      <span style={{ fontWeight: 600 }}>{cat.percent}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Transaction Volume Trend */}
            <div className="card" style={{ gridColumn: 'span 12' }}>
              <div className="card-header-flex">
                <span className="card-title"><TrendingUp /> Transaction Volume Trend (Last 7 Days)</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn btn-secondary" style={{ padding: '4px 12px', fontSize: '11px' }}>Daily</button>
                  <button className="btn btn-gold" style={{ padding: '4px 12px', fontSize: '11px', color: 'var(--bg-darkest)' }}>Weekly</button>
                  <button className="btn btn-secondary" style={{ padding: '4px 12px', fontSize: '11px' }}>Monthly</button>
                </div>
              </div>
              <div style={{ height: '200px', marginTop: '16px' }}>
                <svg viewBox="0 0 700 150" style={{ width: '100%', height: '100%' }}>
                  {/* Grid lines */}
                  {[0, 1, 2, 3, 4].map(i => (
                    <line key={i} x1="50" y1={30 + i * 30} x2="680" y2={30 + i * 30} stroke="var(--border-color)" strokeWidth="1" strokeDasharray="4" />
                  ))}
                  {/* Bars */}
                  {[
                    { day: 'Mon', height: 80, amount: '₦420K' },
                    { day: 'Tue', height: 100, amount: '₦580K' },
                    { day: 'Wed', height: 60, amount: '₦320K' },
                    { day: 'Thu', height: 120, amount: '₦750K' },
                    { day: 'Fri', height: 90, amount: '₦510K' },
                    { day: 'Sat', height: 110, amount: '₦680K' },
                    { day: 'Sun', height: 70, amount: '₦380K' }
                  ].map((d, i) => (
                    <g key={i}>
                      <rect x={80 + i * 90} y={150 - d.height} width="50" height={d.height} fill="var(--electric-blue)" rx="4" opacity="0.8" />
                      <text x={105 + i * 90} y="148" fill="var(--text-muted)" fontSize="10" textAnchor="middle">{d.day}</text>
                      <text x={105 + i * 90} y={150 - d.height - 5} fill="var(--text-secondary)" fontSize="8" textAnchor="middle">{d.amount}</text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>

            {/* Top Performers */}
            <div className="card" style={{ gridColumn: 'span 6' }}>
              <div className="card-header-flex">
                <span className="card-title"><Users /> Top Performing Tenants</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                {tenants.filter(t => t.status === 'paid').map((tenant, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', background: 'var(--bg-darker)', borderRadius: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--electric-blue-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--electric-blue-bright)' }}>
                        {tenant.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '13px' }}>{tenant.name}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{tenant.property}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 700, color: 'var(--success-green)' }}>₦{tenant.rentAmount.toLocaleString()}</div>
                      <div style={{ fontSize: '10px', color: 'var(--success-green)' }}>Paid</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Metrics Summary */}
            <div className="card" style={{ gridColumn: 'span 6' }}>
              <div className="card-header-flex">
                <span className="card-title"><Activity /> Key Metrics Summary</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
                <div style={{ padding: '16px', background: 'var(--bg-darker)', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--electric-blue-bright)' }}>{transactions.length}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Total Transactions</div>
                </div>
                <div style={{ padding: '16px', background: 'var(--bg-darker)', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--success-green)' }}>{tenants.filter(t => t.status === 'paid').length}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Paid Tenants</div>
                </div>
                <div style={{ padding: '16px', background: 'var(--bg-darker)', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--accent-gold)' }}>{employees.filter(e => !e.isDuplicate).length}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Active Employees</div>
                </div>
                <div style={{ padding: '16px', background: 'var(--bg-darker)', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--warning-yellow)' }}>{products.length}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Product Lines</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 10: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="dashboard-grid">
            <div className="card" style={{ gridColumn: 'span 12' }}>
              <div className="card-header-flex">
                <span className="card-title"><Settings /> Application Settings</span>
                <button className="btn btn-gold" style={{ padding: '6px 16px', fontSize: '12px' }}>
                  <Save size={14} /> Save Changes
                </button>
              </div>
            </div>

            {/* Appearance Settings */}
            <div className="card" style={{ gridColumn: 'span 6' }}>
              <div className="card-header-flex">
                <span className="card-title"><Moon /> Appearance</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--bg-darker)', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {settings.darkMode ? <Moon size={18} style={{ color: 'var(--electric-blue-bright)' }} : <Sun size={18} style={{ color: 'var(--accent-gold)' }} />}
                    <div>
                      <div style={{ fontWeight: 600 }}>Dark Mode</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Use dark theme for better visibility</div>
                    </div>
                  </div>
                  <button
                    className={`btn ${settings.darkMode ? 'btn-gold' : 'btn-secondary'}`}
                    style={{ padding: '4px 12px', fontSize: '11px' }}
                    onClick={() => setSettings(prev => ({ ...prev, darkMode: !prev.darkMode }))}
                  >
                    {settings.darkMode ? 'On' : 'Off'}
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--bg-darker)', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {settings.soundEffects ? <Volume2 size={18} style={{ color: 'var(--electric-blue-bright)' }} : <VolumeX size={18} style={{ color: 'var(--text-muted)' }} />}
                    <div>
                      <div style={{ fontWeight: 600 }}>Sound Effects</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Play sounds for transactions</div>
                    </div>
                  </div>
                  <button
                    className={`btn ${settings.soundEffects ? 'btn-gold' : 'btn-secondary'}`}
                    style={{ padding: '4px 12px', fontSize: '11px' }}
                    onClick={() => setSettings(prev => ({ ...prev, soundEffects: !prev.soundEffects }))}
                  >
                    {settings.soundEffects ? 'On' : 'Off'}
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--bg-darker)', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Zap size={18} style={{ color: 'var(--accent-gold)' }} />
                    <div>
                      <div style={{ fontWeight: 600 }}>Compact Mode</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Reduce spacing for more content</div>
                    </div>
                  </div>
                  <button
                    className="btn btn-secondary"
                    style={{ padding: '4px 12px', fontSize: '11px' }}
                    onClick={() => showToast('Compact mode coming soon!', 'info')}
                  >
                    Coming Soon
                  </button>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="card" style={{ gridColumn: 'span 6' }}>
              <div className="card-header-flex">
                <span className="card-title"><Bell /> Notifications</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--bg-darker)', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Bell size={18} style={{ color: 'var(--electric-blue-bright)' }} />
                    <div>
                      <div style={{ fontWeight: 600 }}>Push Notifications</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Receive browser notifications</div>
                    </div>
                  </div>
                  <button
                    className={`btn ${settings.notifications ? 'btn-gold' : 'btn-secondary'}`}
                    style={{ padding: '4px 12px', fontSize: '11px' }}
                    onClick={() => setSettings(prev => ({ ...prev, notifications: !prev.notifications }))}
                  >
                    {settings.notifications ? 'On' : 'Off'}
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--bg-darker)', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Mail size={18} style={{ color: 'var(--electric-blue-bright)' }} />
                    <div>
                      <div style={{ fontWeight: 600 }}>Email Alerts</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Receive transaction summaries</div>
                    </div>
                  </div>
                  <button
                    className={`btn ${settings.emailAlerts ? 'btn-gold' : 'btn-secondary'}`}
                    style={{ padding: '4px 12px', fontSize: '11px' }}
                    onClick={() => setSettings(prev => ({ ...prev, emailAlerts: !prev.emailAlerts }))}
                  >
                    {settings.emailAlerts ? 'On' : 'Off'}
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--bg-darker)', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Phone size={18} style={{ color: 'var(--electric-blue-bright)' }} />
                    <div>
                      <div style={{ fontWeight: 600 }}>SMS Alerts</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Receive SMS for urgent events</div>
                    </div>
                  </div>
                  <button
                    className={`btn ${settings.smsAlerts ? 'btn-gold' : 'btn-secondary'}`}
                    style={{ padding: '4px 12px', fontSize: '11px' }}
                    onClick={() => setSettings(prev => ({ ...prev, smsAlerts: !prev.smsAlerts }))}
                  >
                    {settings.smsAlerts ? 'On' : 'Off'}
                  </button>
                </div>
              </div>
            </div>

            {/* Business Settings */}
            <div className="card" style={{ gridColumn: 'span 6' }}>
              <div className="card-header-flex">
                <span className="card-title"><Building /> Business Settings</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
                <div className="form-group">
                  <label>Language Preference</label>
                  <select
                    className="form-control"
                    value={settings.language}
                    onChange={e => setSettings(prev => ({ ...prev, language: e.target.value as 'en' | 'pidgin' }))}
                  >
                    <option value="en">English</option>
                    <option value="pidgin">Nigerian Pidgin</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Display Currency</label>
                  <select
                    className="form-control"
                    value={settings.currency}
                    onChange={e => setSettings(prev => ({ ...prev, currency: e.target.value as 'NGN' | 'USD' }))}
                  >
                    <option value="NGN">Nigerian Naira (₦)</option>
                    <option value="USD">US Dollar ($)</option>
                  </select>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--bg-darker)', borderRadius: '8px' }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>Auto Settlement</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Automatically settle payments</div>
                  </div>
                  <button
                    className={`btn ${settings.autoSettlement ? 'btn-gold' : 'btn-secondary'}`}
                    style={{ padding: '4px 12px', fontSize: '11px' }}
                    onClick={() => setSettings(prev => ({ ...prev, autoSettlement: !prev.autoSettlement }))}
                  >
                    {settings.autoSettlement ? 'On' : 'Off'}
                  </button>
                </div>
              </div>
            </div>

            {/* Account Info */}
            <div className="card" style={{ gridColumn: 'span 6' }}>
              <div className="card-header-flex">
                <span className="card-title"><Users /> Account Information</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
                <div style={{ padding: '16px', background: 'var(--bg-darker)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Business Name</div>
                  <div style={{ fontWeight: 600 }}>Z-Pulse Fashion House</div>
                </div>
                <div style={{ padding: '16px', background: 'var(--bg-darker)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Nomba Merchant ID</div>
                  <div style={{ fontWeight: 600, fontFamily: 'var(--font-mono)' }}>893427</div>
                </div>
                <div style={{ padding: '16px', background: 'var(--bg-darker)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Primary Account</div>
                  <div style={{ fontWeight: 600 }}>Nomba MFB - 1023948576</div>
                </div>
                <div style={{ padding: '16px', background: 'var(--bg-darker)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Account Status</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--success-green)', boxShadow: '0 0 6px var(--success-green)' }}></span>
                    <span style={{ fontWeight: 600, color: 'var(--success-green)' }}>Verified & Active</span>
                  </div>
                </div>
                <button className="btn btn-secondary" style={{ width: '100%' }} onClick={() => {
                  showToast('Syncing with Nomba API...', 'info');
                  setTimeout(() => showToast('Account synced successfully!', 'success'), 1500);
                }}>
                  <RefreshCw size={14} /> Sync with Nomba API
                </button>
              </div>
            </div>

            {/* Security Settings */}
            <div className="card" style={{ gridColumn: 'span 6' }}>
              <div className="card-header-flex">
                <span className="card-title"><ShieldAlert /> Security</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--bg-darker)', borderRadius: '8px' }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>Two-Factor Authentication</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Add extra security to your account</div>
                  </div>
                  <button className="btn btn-gold" style={{ padding: '4px 12px', fontSize: '11px', color: 'var(--bg-darkest)' }} onClick={() => showToast('2FA setup coming soon!', 'info')}>
                    Enable
                  </button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--bg-darker)', borderRadius: '8px' }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>API Keys</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Manage your API credentials</div>
                  </div>
                  <button className="btn btn-secondary" style={{ padding: '4px 12px', fontSize: '11px' }} onClick={() => showToast('API key management coming soon!', 'info')}>
                    Manage
                  </button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--bg-darker)', borderRadius: '8px' }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>Transaction PIN</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Required for sensitive operations</div>
                  </div>
                  <button className="btn btn-secondary" style={{ padding: '4px 12px', fontSize: '11px' }} onClick={() => showToast('PIN management coming soon!', 'info')}>
                    Change
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 11: HELP & SUPPORT */}
        {activeTab === 'help' && (
          <div className="dashboard-grid">
            <div className="card" style={{ gridColumn: 'span 12' }}>
              <div className="card-header-flex">
                <span className="card-title"><HelpCircle /> Help & Support Center</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '8px' }}>
                Get help with PulseStack features, troubleshooting, and best practices.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="card" style={{ gridColumn: 'span 4' }}>
              <div className="card-header-flex">
                <span className="card-title"><Zap /> Quick Actions</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
                <button className="btn btn-secondary" style={{ justifyContent: 'space-between', width: '100%' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><BookOpen size={16} /> View Documentation</span>
                  <ChevronRight size={16} />
                </button>
                <button className="btn btn-secondary" style={{ justifyContent: 'space-between', width: '100%' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MessageSquare size={16} /> Contact Support</span>
                  <ChevronRight size={16} />
                </button>
                <button className="btn btn-secondary" style={{ justifyContent: 'space-between', width: '100%' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FileText size={16} /> Submit Feedback</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="card" style={{ gridColumn: 'span 4' }}>
              <div className="card-header-flex">
                <span className="card-title"><Mail /> Contact Information</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'var(--bg-darker)', borderRadius: '8px' }}>
                  <Mail size={18} style={{ color: 'var(--electric-blue-bright)' }} />
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Email Support</div>
                    <div style={{ fontWeight: 600 }}>support@pulsestack.io</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'var(--bg-darker)', borderRadius: '8px' }}>
                  <Phone size={18} style={{ color: 'var(--electric-blue-bright)' }} />
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Phone Support</div>
                    <div style={{ fontWeight: 600 }}>+234 800 PULSE 00</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'var(--bg-darker)', borderRadius: '8px' }}>
                  <Clock size={18} style={{ color: 'var(--electric-blue-bright)' }} />
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Support Hours</div>
                    <div style={{ fontWeight: 600 }}>Mon-Fri, 8AM - 6PM WAT</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'var(--bg-darker)', borderRadius: '8px' }}>
                  <MessageSquare size={18} style={{ color: 'var(--electric-blue-bright)' }} />
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Live Chat</div>
                    <div style={{ fontWeight: 600, color: 'var(--success-green)' }}>Available Now</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Location */}
            <div className="card" style={{ gridColumn: 'span 4' }}>
              <div className="card-header-flex">
                <span className="card-title"><MapPin /> Office Location</span>
              </div>
              <div style={{ marginTop: '12px', padding: '16px', background: 'var(--bg-darker)', borderRadius: '8px' }}>
                <div style={{ fontWeight: 600, marginBottom: '8px' }}>PulseStack HQ</div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  14 Admiralty Way,<br />
                  Lekki Phase 1,<br />
                  Lagos, Nigeria
                </div>
                <button className="btn btn-secondary" style={{ width: '100%', marginTop: '12px' }}>
                  <ExternalLink size={14} /> Open in Maps
                </button>
              </div>
            </div>

            {/* FAQs */}
            <div className="card" style={{ gridColumn: 'span 12' }}>
              <div className="card-header-flex">
                <span className="card-title"><HelpCircle /> Frequently Asked Questions</span>
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  className="form-control"
                  style={{ width: '200px', padding: '6px 12px', fontSize: '12px' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
                {[
                  { q: 'How do I accept payments via Nomba?', a: 'Navigate to Smart Payments and create a payment link. Share the link with your customer to receive payments instantly.' },
                  { q: 'How does the AI predict rent defaults?', a: 'PulseAI analyzes tenant payment history, economic indicators, and behavioral patterns to predict payment reliability.' },
                  { q: 'Can I receive crypto payments?', a: 'Yes! Use the Diaspora Send feature to accept USDT/USDC which converts to Naira at live rates.' },
                  { q: 'How do I run payroll for my staff?', a: 'Go to Payroll & Staff, review employee details, and click "Pay all staff salaries" for instant bulk payout via Nomba.' },
                  { q: 'What is the settlement time for Nomba payments?', a: 'Nomba payments settle within T+1 (next business day) for most transactions. Crypto remittances settle instantly.' },
                  { q: 'How do I add a new tenant to my property?', a: 'Navigate to Rent & Properties, click "Add Property / Tenant" and fill in the tenant details. A virtual account will be auto-generated.' }
                ].map((faq, idx) => (
                  <div key={idx} style={{ padding: '16px', background: 'var(--bg-darker)', borderRadius: '8px', borderLeft: '3px solid var(--electric-blue)' }}>
                    <div style={{ fontWeight: 600, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <ChevronRight size={16} style={{ color: 'var(--electric-blue-bright)' }} />
                      {faq.q}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', paddingLeft: '24px' }}>{faq.a}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Status */}
            <div className="card" style={{ gridColumn: 'span 12' }}>
              <div className="card-header-flex">
                <span className="card-title"><Activity /> System Status</span>
                <span className="badge success" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--success-green)', display: 'inline-block' }}></span>
                  All Systems Operational
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginTop: '16px' }}>
                {[
                  { name: 'Nomba API', status: 'Operational', uptime: '99.99%' },
                  { name: 'PulseAI Engine', status: 'Operational', uptime: '99.95%' },
                  { name: 'Webhook Service', status: 'Operational', uptime: '99.98%' },
                  { name: 'Crypto Gateway', status: 'Operational', uptime: '99.90%' }
                ].map((service, idx) => (
                  <div key={idx} style={{ padding: '12px', background: 'var(--bg-darker)', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', fontWeight: 600 }}>{service.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--success-green)', marginTop: '4px' }}>● {service.status}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>Uptime: {service.uptime}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Version Info */}
            <div className="card" style={{ gridColumn: 'span 12' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'var(--bg-darker)', borderRadius: '8px' }}>
                <div>
                  <div style={{ fontWeight: 700 }}>PulseStack v1.0.0</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Built for DevCareer x Nomba Hackathon 2026</div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '11px' }}>View Changelog</button>
                  <button className="btn btn-gold" style={{ padding: '6px 12px', fontSize: '11px', color: 'var(--bg-darkest)' }}>Check for Updates</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* AI Assistant Chat Sidebar */}
      <aside className={`ai-sidebar ${isAiOpen ? 'open' : ''}`}>
        <div className="ai-header">
          <div className="ai-header-title">
            <MessageSquare size={18} style={{ color: 'var(--electric-blue-bright)' }} />
            <span style={{ fontWeight: 700 }}>PulseAI Assistant</span>
            <div className="ai-status-indicator" />
          </div>
          <button className="modal-close" onClick={() => setIsAiOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div className="ai-messages">
          {chatMessages.map((msg, idx) => (
            <div key={idx} className={`ai-message ${msg.sender}`}>
              <div style={{ fontSize: '13px' }}>{msg.text}</div>
              <div style={{ fontSize: '9px', textAlign: 'right', marginTop: '4px', opacity: 0.6 }}>{msg.time}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="ai-quick-prompts">
          <button className="prompt-btn" onClick={() => handleChatSend("Who never pay rent?")}>
            Who never pay rent?
          </button>
          <button className="prompt-btn" onClick={() => handleChatSend("Pay staff salaries now")}>
            Pay staff salaries
          </button>
          <button className="prompt-btn" onClick={() => handleChatSend("How much did I spend on fuel?")}>
            Fuel spending check
          </button>
          <button className="prompt-btn" onClick={() => handleChatSend("Generate invoice for Emeka - 250000")}>
            Invoice Emeka N250k
          </button>
          <button className="prompt-btn" onClick={() => handleChatSend("What is my business health score?")}>
            Check health score
          </button>
        </div>

        <div className="ai-input-container">
          <input
            type="text"
            className="ai-input"
            placeholder="Type command in Pidgin or English..."
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleChatSend();
            }}
          />
          <button className="ai-send-btn" onClick={() => handleChatSend()}>
            <Send size={16} />
          </button>
        </div>
      </aside>

      {/* Developer Webhook & Console Simulation Footer */}
      <footer className="dev-console" style={{
        height: isConsoleOpen ? '180px' : '40px',
        padding: isConsoleOpen ? '16px' : '10px 16px',
        overflow: 'hidden',
        transition: 'all 0.3s ease-in-out'
      }}>
        {!isConsoleOpen ? (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', cursor: 'pointer' }} onClick={() => setIsConsoleOpen(true)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)' }}>
              <Terminal size={14} style={{ color: 'var(--electric-blue-bright)' }} />
              <span>Sandbox Developer Webhook Console (Collapsed)</span>
            </div>
            <button className="btn" style={{ padding: '2px 8px', fontSize: '11px' }} onClick={(e) => { e.stopPropagation(); setIsConsoleOpen(true); }}>
              ▲ Expand Console
            </button>
          </div>
        ) : (
          <>
            <div className="console-controls">
              <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Terminal size={14} style={{ color: 'var(--electric-blue-bright)' }} /> Webhook Trigger Engine
                </div>
                <button className="btn btn-secondary" style={{ padding: '2px 8px', fontSize: '10px', height: '22px' }} onClick={() => setIsConsoleOpen(false)}>
                  ▼ Collapse
                </button>
              </div>
              <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                Simulate central Nomba webhook events routing payments to respective modules.
              </p>
              <button className="console-btn accent" onClick={() => simulatePaymentWebhook('card')}>
                Simulate Card Payment (Collections)
              </button>
              <button className="console-btn" onClick={() => simulatePaymentWebhook('rent')}>
                Simulate Rent Webhook (Properties)
              </button>
              <button className="console-btn" onClick={() => simulatePaymentWebhook('ajo')}>
                Simulate Mrs Ngozi (Ajo Pools)
              </button>
              <button className="console-btn" onClick={() => simulatePaymentWebhook('suspicious')}>
                Simulate Suspicious payment
              </button>
            </div>

            <div className="console-logs">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px', marginBottom: '6px', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  Unified Webhook Routing Terminal Logs
                </span>
                <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', maxWidth: '100%' }}>
                  {(['ALL', 'NOMBA_API', 'AI_AGENT', 'WEBHOOK', 'CRYPTO_SETTLE'] as const).map(tag => (
                    <button
                      key={tag}
                      type="button"
                      className="prompt-btn"
                      style={{
                        fontSize: '9px',
                        padding: '2px 6px',
                        height: '18px',
                        borderRadius: '3px',
                        background: activeLogFilter === tag ? 'var(--electric-blue-glow)' : 'var(--bg-card)',
                        borderColor: activeLogFilter === tag ? 'var(--electric-blue-bright)' : 'var(--border-color)',
                        color: activeLogFilter === tag ? 'var(--text-primary)' : 'var(--text-muted)'
                      }}
                      onClick={() => setActiveLogFilter(tag)}
                    >
                      {tag.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', overflowY: 'auto', flexGrow: 1 }}>
                {webhooksLogs
                  .filter(log => activeLogFilter === 'ALL' || log.tag === activeLogFilter)
                  .map(log => (
                    <div key={log.id} className="log-entry">
                      <span className="log-timestamp">[{log.timestamp}]</span>
                      <span className="log-tag">[{log.tag}]</span>
                      <span className="log-message">{log.message}</span>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </footer>

      {/* Floating Toggle for AI Chat on smaller screens */}
      {!isAiOpen && (
        <button className="ai-chat-floating-toggle" style={{ display: 'flex' }} onClick={() => setIsAiOpen(true)}>
          <MessageSquare size={24} />
        </button>
      )}

      {/* MODAL 1: ADD PROPERTY / TENANT */}
      {showAddTenantModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 style={{ fontSize: '16px', fontWeight: 800 }}>Add Tenant & Assign Virtual Account</h3>
              <button className="modal-close" onClick={() => setShowAddTenantModal(false)}>
                <X size={18} />
              </button>
            </div>
            
            <form onSubmit={handleAddTenant}>
              <div className="form-group">
                <label>Tenant Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Babajide Benson"
                  value={newTenant.name}
                  onChange={e => setNewTenant(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label>Property Description / Unit</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Flat 6, Lekki Phase 1"
                  value={newTenant.property}
                  onChange={e => setNewTenant(prev => ({ ...prev, property: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Monthly Rent Amount (₦)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="e.g. 200000"
                  value={newTenant.rentAmount}
                  onChange={e => setNewTenant(prev => ({ ...prev, rentAmount: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label>Rent Due Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={newTenant.dueDate}
                  onChange={e => setNewTenant(prev => ({ ...prev, dueDate: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. +234 802 345 6789"
                  value={newTenant.phone}
                  onChange={e => setNewTenant(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>

              <div style={{ marginTop: '16px', fontSize: '11px', color: 'var(--text-secondary)', background: 'var(--bg-darker)', padding: '10px', borderRadius: '4px', marginBottom: '14px' }}>
                ℹ️ Submitting this form automatically maps a new virtual account at Nomba partner banks (Wema/Providus) for immediate payment webhook listeners.
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddTenantModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-gold">
                  Create Profile & Map Virtual Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: CREATE QUICK PAYMENT LINK */}
      {showPaymentLinkModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 style={{ fontSize: '16px', fontWeight: 800 }}>Create Quick Payment Link</h3>
              <button className="modal-close" onClick={() => setShowPaymentLinkModal(false)}>
                <X size={18} />
              </button>
            </div>
            
            <form onSubmit={e => {
              e.preventDefault();
              triggerAiAction("CREATE_PAYMENT_LINK", newLink);
              setShowPaymentLinkModal(false);
              setNewLink({ sender: '', amount: '', description: '' });
            }}>
              <div className="form-group">
                <label>Customer Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Emeka Okoye"
                  value={newLink.sender}
                  onChange={e => setNewLink(prev => ({ ...prev, sender: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label>Invoice Description</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Branding work - PulseStack Invoice"
                  value={newLink.description}
                  onChange={e => setNewLink(prev => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label>Invoice Amount (₦)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="e.g. 250000"
                  value={newLink.amount}
                  onChange={e => setNewLink(prev => ({ ...prev, amount: e.target.value }))}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowPaymentLinkModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-gold">
                  Generate Link URL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: VIEW DRAFT NUDGE */}
      {showNudgeModal && showNudgeModal.open && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 style={{ fontSize: '16px', fontWeight: 800 }}>Draft AI Payment Nudge ({showNudgeModal.tenant.name})</h3>
              <button className="modal-close" onClick={() => setShowNudgeModal(null)}>
                <X size={18} />
              </button>
            </div>
            
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label>Select AI Nudge Tone</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {(['pidgin', 'formal', 'urgent'] as const).map(t => (
                  <button
                    key={t}
                    type="button"
                    className={`btn ${showNudgeModal.tone === t ? 'btn-gold' : 'btn-secondary'}`}
                    style={{ padding: '6px 12px', fontSize: '11px', flex: 1 }}
                    onClick={() => {
                      const newDraft = generateNudgeText(showNudgeModal.tenant, t);
                      setShowNudgeModal({ ...showNudgeModal, tone: t, draft: newDraft });
                    }}
                  >
                    {t === 'pidgin' ? 'Pidgin Friendly' : t === 'formal' ? 'Formal English' : 'Urgent & Firm'}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>AI Generated Reminder Draft (WhatsApp / SMS)</label>
              <textarea
                className="form-control"
                style={{ height: '120px', resize: 'none', lineHeight: '1.4' }}
                value={showNudgeModal.draft}
                onChange={e => setShowNudgeModal(prev => prev ? { ...prev, draft: e.target.value } : null)}
              />
            </div>

            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '14px' }}>
              Nudges encourage compliance without damaging customer relations. PulseAI uses friendly local expressions.
            </p>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setShowNudgeModal(null)}>
                Cancel
              </button>
              <button className="btn" onClick={() => {
                showToast(`Nudge successfully sent to ${showNudgeModal.tenant.name}!`, 'success');
                addLog('AI_AGENT', `Nudge message successfully dispatched via Twilio SMS to ${showNudgeModal.tenant.name}`);
                setShowNudgeModal(null);
              }}>
                Dispatch Nudge Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: AI RISK PROFILE ASSESSMENT */}
      {activeRiskTenant && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ borderTop: '4px solid var(--danger-red)', width: '520px' }}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldAlert style={{ color: activeRiskTenant.riskScore === 'high' ? 'var(--danger-red)' : activeRiskTenant.riskScore === 'medium' ? 'var(--warning-yellow)' : 'var(--success-green)' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 800 }}>AI Risk Profile: {activeRiskTenant.name}</h3>
              </div>
              <button className="modal-close" onClick={() => setActiveRiskTenant(null)}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
              <span className={`badge ${activeRiskTenant.riskScore}`}>
                {activeRiskTenant.riskScore} Risk Score
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Assigned to: <b>{activeRiskTenant.property}</b>
              </span>
            </div>

            <div style={{ background: 'var(--bg-darker)', padding: '14px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px' }}>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>AI Predictive Model Analysis</div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>{activeRiskTenant.riskAnalysis}</p>
            </div>

            {/* Payment History Timeline */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' }}>
                Payment History (Last 6 Months)
              </div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between' }}>
                {[
                  { month: 'Jan', status: 'on-time' },
                  { month: 'Feb', status: 'on-time' },
                  { month: 'Mar', status: activeRiskTenant.riskScore === 'high' ? 'late' : 'on-time' },
                  { month: 'Apr', status: activeRiskTenant.riskScore === 'high' ? 'late' : 'on-time' },
                  { month: 'May', status: activeRiskTenant.riskScore === 'low' ? 'on-time' : 'missed' },
                  { month: 'Jun', status: activeRiskTenant.status === 'paid' ? 'on-time' : 'overdue' }
                ].map((item, idx) => (
                  <div key={idx} style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ height: '8px', borderRadius: '4px', background: item.status === 'on-time' ? 'var(--success-green)' : item.status === 'late' ? 'var(--warning-yellow)' : 'var(--danger-red)', marginBottom: '4px' }} />
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{item.month}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stress Indicators */}
            <div style={{ marginBottom: '16px', fontSize: '12px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' }}>
                Socio-Economic Stress Indicators
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)' }}>
                  <span style={{ color: activeRiskTenant.riskScore === 'high' ? 'var(--danger-red)' : 'var(--success-green)' }}>●</span>
                  Inflation Sensitivity: {activeRiskTenant.riskScore === 'high' ? 'Critical' : 'Medium'}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)' }}>
                  <span style={{ color: activeRiskTenant.riskScore === 'high' ? 'var(--danger-red)' : 'var(--success-green)' }}>●</span>
                  Business Sector Risk: {activeRiskTenant.riskScore === 'high' ? 'High' : 'Low'}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <button className="btn btn-secondary" onClick={() => setActiveRiskTenant(null)}>
                Close Profile
              </button>
              {activeRiskTenant.status !== 'paid' && (
                <button className="btn" onClick={() => {
                  triggerRentNudge(activeRiskTenant);
                  setActiveRiskTenant(null);
                }}>
                  Draft Rent Nudge
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: VIEW DIGITAL PAYSLIP */}
      {showPayslipModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ borderTop: '4px solid var(--electric-blue)' }}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText style={{ color: 'var(--electric-blue-bright)' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 800 }}>Digital Payslip • Nomba Bulk Payout</h3>
              </div>
              <button className="modal-close" onClick={() => setShowPayslipModal(null)}>
                <X size={18} />
              </button>
            </div>

            <div style={{ background: 'var(--bg-darker)', padding: '16px', borderRadius: '8px', marginBottom: '16px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>EMPLOYEE NAME</span>
                <span style={{ fontWeight: 700 }}>{showPayslipModal.name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>DEPARTMENT</span>
                <span style={{ fontWeight: 700 }}>{showPayslipModal.department}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>BANK DESTINATION</span>
                <span style={{ fontWeight: 700 }}>{showPayslipModal.bank}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>ACCOUNT NUMBER</span>
                <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{showPayslipModal.accountNumber}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '4px' }}>
                <span style={{ color: 'var(--text-muted)', fontWeight: 700 }}>NET PAYOUT</span>
                <span style={{ fontWeight: 800, color: 'var(--accent-gold)', fontSize: '14px', fontFamily: 'var(--font-mono)' }}>₦{showPayslipModal.salary.toLocaleString()}</span>
              </div>
            </div>

            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '16px' }}>
              Status: <b>PAID VIA NOMBA PAYOUTS</b> • Settlement reference: <code>NMB-PAY-{Math.floor(100000+Math.random()*900000)}</code>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button className="btn btn-secondary" style={{ width: '100%' }} onClick={() => setShowPayslipModal(null)}>
                Close Payslip
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
