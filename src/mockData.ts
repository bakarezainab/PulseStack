export interface Transaction {
  id: string;
  amount: number;
  type: 'payment_link' | 'virtual_account' | 'qr' | 'crypto' | 'payout';
  status: 'success' | 'pending' | 'failed' | 'flagged';
  sender: string;
  recipient: string;
  date: string;
  description: string;
  paymentChannel: string;
  flagReason?: string;
}

export interface Tenant {
  id: string;
  name: string;
  property: string;
  rentAmount: number;
  dueDate: string;
  status: 'paid' | 'overdue' | 'pending';
  riskScore: 'low' | 'medium' | 'high';
  riskAnalysis: string;
  phone: string;
  lastPaymentDate?: string;
}

export interface Employee {
  id: string;
  name: string;
  department: string;
  salary: number;
  status: 'paid' | 'unpaid';
  lastPaidDate?: string;
  bank: string;
  accountNumber: string;
  isDuplicate?: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  velocity: number; // units sold per week
  reorderPoint: number;
  supplier: string;
  revenue: number;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: 'Generator/Fuel' | 'Transport' | 'Market Run' | 'Data/Airtime' | 'Staff Feeding' | 'Logistics' | 'Uncategorized';
}

export interface AjoPool {
  id: string;
  name: string;
  targetAmount: number;
  frequency: 'weekly' | 'monthly';
  currentContribution: number;
  recipient: string;
  status: 'active' | 'completed';
  membersCount: number;
  members: { name: string; amount: number; paid: boolean; riskScore: 'low' | 'medium' | 'high'; riskAnalysis: string }[];
}

export interface BusinessHealth {
  score: number;
  cashFlowScore: number;
  paymentConsistencyScore: number;
  expenseControlScore: number;
  revenueGrowthScore: number;
  actionPoints: string[];
}

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "TX-9023",
    amount: 250000,
    type: "payment_link",
    status: "success",
    sender: "Emeka Okoye",
    recipient: "Z-Pulse Fashion House",
    date: "2026-07-01T14:32:00Z",
    description: "Branding work - PulseStack Invoice",
    paymentChannel: "Nomba Checkout (Card)"
  },
  {
    id: "TX-9022",
    amount: 150000,
    type: "virtual_account",
    status: "success",
    sender: "Amina Yusuf",
    recipient: "Z-Pulse Fashion House",
    date: "2026-07-01T10:15:00Z",
    description: "Rent Payment - Flat 4",
    paymentChannel: "Nomba Virtual Account (Wema)"
  },
  {
    id: "TX-9021",
    amount: 75000,
    type: "qr",
    status: "success",
    sender: "Tunde Bakare",
    recipient: "Z-Pulse Fashion House",
    date: "2026-06-30T18:22:00Z",
    description: "In-Store Purchase - QR Code",
    paymentChannel: "Nomba QR Scan"
  },
  {
    id: "TX-9020",
    amount: 620000, // $400 at live rate N1550/$
    type: "crypto",
    status: "success",
    sender: "Chidi Obi (Diaspora)",
    recipient: "Z-Pulse Fashion House",
    date: "2026-06-29T09:05:00Z",
    description: "Diaspora Remittance - USDT Checkout",
    paymentChannel: "NOWPayments Crypto Portal (NGN Settled)"
  },
  {
    id: "TX-9019",
    amount: 320000,
    type: "payment_link",
    status: "flagged",
    sender: "Unknown Cardholder",
    recipient: "Z-Pulse Fashion House",
    date: "2026-06-28T23:45:00Z",
    description: "High Velocity Order - Checkout",
    paymentChannel: "Nomba Checkout (Card)",
    flagReason: "AI security flagged: Card BIN mismatch (IP: Lagos, Card: Brazil) - High Fraud Risk"
  },
  {
    id: "TX-9018",
    amount: 120000,
    type: "payout",
    status: "success",
    sender: "Z-Pulse Fashion House",
    recipient: "Victor Nwachukwu",
    date: "2026-06-28T12:00:00Z",
    description: "Staff Salary - Creative Dept",
    paymentChannel: "Nomba Payout API"
  }
];

export const INITIAL_TENANTS: Tenant[] = [
  {
    id: "TEN-01",
    name: "Amina Yusuf",
    property: "Flat 4, Lekki Phase 1",
    rentAmount: 150000,
    dueDate: "2026-07-05",
    status: "paid",
    riskScore: "low",
    riskAnalysis: "Always pays 3-5 days before due date. Excellent profile.",
    phone: "+234 812 345 6789",
    lastPaymentDate: "2026-07-01"
  },
  {
    id: "TEN-02",
    name: "Chinedu Okafor",
    property: "Flat 2, Lekki Phase 1",
    rentAmount: 200000,
    dueDate: "2026-07-04",
    status: "pending",
    riskScore: "medium",
    riskAnalysis: "Salary cycles suggest payment between 5th and 8th of each month.",
    phone: "+234 809 876 5432"
  },
  {
    id: "TEN-03",
    name: "Segun Arinze",
    property: "Office Suite 3B, Yaba",
    rentAmount: 350000,
    dueDate: "2026-06-25",
    status: "overdue",
    riskScore: "high",
    riskAnalysis: "High risk of default. Retail store revenue hit by recent inflation. Payments lagged by 15+ days in the last 2 cycles.",
    phone: "+234 703 111 2222"
  }
];

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: "EMP-01",
    name: "Victor Nwachukwu",
    department: "Creative & Design",
    salary: 120000,
    status: "unpaid",
    bank: "Nomba MFB",
    accountNumber: "1019948271"
  },
  {
    id: "EMP-02",
    name: "Halima Bello",
    department: "Sales & Shop Operations",
    salary: 95000,
    status: "unpaid",
    bank: "GTBank",
    accountNumber: "0128849503"
  },
  {
    id: "EMP-03",
    name: "Temitope Adebayo",
    department: "Logistics",
    salary: 110000,
    status: "unpaid",
    bank: "Access Bank",
    accountNumber: "0049928374"
  },
  {
    id: "EMP-04",
    name: "Victor Nwachukwu", // Intentional duplicate to test AI anomaly detection!
    department: "Creative & Design",
    salary: 120000,
    status: "unpaid",
    bank: "Nomba MFB",
    accountNumber: "1019948271",
    isDuplicate: true
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "PROD-01",
    name: "Classic Agbada - Electric Blue Edition",
    price: 85000,
    stock: 12,
    velocity: 4, // 4 sold per week
    reorderPoint: 5,
    supplier: "Abeokuta Fabrics Co.",
    revenue: 340000
  },
  {
    id: "PROD-02",
    name: "Sleek Kaftan - Onyx Black",
    price: 65000,
    stock: 3, // Low stock!
    velocity: 5, // 5 sold per week
    reorderPoint: 6,
    supplier: "Kano Cotton Mills",
    revenue: 325000
  },
  {
    id: "PROD-03",
    name: "Silk Aso-Oke - Gold Accent",
    price: 110000,
    stock: 15,
    velocity: 2, // 2 sold per week
    reorderPoint: 4,
    supplier: "Ibadan Heritage Weavers",
    revenue: 220000
  }
];

export const INITIAL_EXPENSES: Expense[] = [
  {
    id: "EXP-01",
    description: "Mikano Generator Fueling (200 Litres)",
    amount: 145000,
    date: "2026-06-28",
    category: "Generator/Fuel"
  },
  {
    id: "EXP-02",
    description: "Bike dispatcher dispatch run to Ikeja",
    amount: 15000,
    date: "2026-06-29",
    category: "Transport"
  },
  {
    id: "EXP-03",
    description: "Office Lunch Catering - Staff Meeting",
    amount: 35000,
    date: "2026-06-30",
    category: "Staff Feeding"
  },
  {
    id: "EXP-04",
    description: "Internet Subscription - MTN Fiber",
    amount: 25000,
    date: "2026-07-01",
    category: "Data/Airtime"
  },
  {
    id: "EXP-05",
    description: "Emergency Market Run (Replacement buttons & lace)",
    amount: 40000,
    date: "2026-07-01",
    category: "Market Run"
  }
];

export const INITIAL_AJO_POOLS: AjoPool[] = [
  {
    id: "AJO-01",
    name: "Balogun Market Association Contribution",
    targetAmount: 1000000,
    frequency: "monthly",
    currentContribution: 600000,
    recipient: "Zainab Alao", // Next up to receive
    status: "active",
    membersCount: 5,
    members: [
      { name: "Zainab Alao", amount: 200000, paid: true, riskScore: "low", riskAnalysis: "Organizer, automatic contribution deduction" },
      { name: "Iyaloja Bisi", amount: 200000, paid: true, riskScore: "low", riskAnalysis: "Always pays on day 1. Zero risk." },
      { name: "Alhaji Nuhu", amount: 200000, paid: true, riskScore: "medium", riskAnalysis: "Tends to pay in parts, but always clears before cycle end." },
      { name: "Mrs. Ngozi", amount: 200000, paid: false, riskScore: "high", riskAnalysis: "Delayed payments for 2 previous collections. Cash flow issues flagged from market sales." },
      { name: "Tayo Tailor", amount: 200000, paid: false, riskScore: "low", riskAnalysis: "Consistent, scheduled for tomorrow. High confidence." }
    ]
  }
];

export const getBusinessHealth = (expenses: Expense[], transactions: Transaction[], tenants: Tenant[]): BusinessHealth => {
  const totalRevenue = transactions
    .filter(t => t.status === 'success')
    .reduce((sum, t) => sum + (t.type === 'payout' ? -t.amount : t.amount), 0);
  
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const expenseRatio = totalRevenue > 0 ? (totalExpenses / totalRevenue) : 0.4;
  
  let expenseControlScore = Math.max(10, Math.min(100, Math.round(100 - (expenseRatio * 100))));
  let cashFlowScore = 88;
  let paymentConsistencyScore = 75;
  let revenueGrowthScore = 82;

  const overdueTenantsCount = tenants.filter(t => t.status === 'overdue').length;
  paymentConsistencyScore -= (overdueTenantsCount * 15);

  const totalFuelSpend = expenses.filter(e => e.category === 'Generator/Fuel').reduce((sum, e) => sum + e.amount, 0);
  if (totalFuelSpend > 120000) {
    expenseControlScore = Math.max(20, expenseControlScore - 12);
  }

  const score = Math.round((cashFlowScore + paymentConsistencyScore + expenseControlScore + revenueGrowthScore) / 4);

  const actionPoints = [
    `Your expense ratio is high (${Math.round(expenseRatio * 100)}%). Consider optimizing logistical operations.`,
    totalFuelSpend > 100000 ? `You spent ₦${(totalFuelSpend / 1000).toFixed(0)}k on fuel recently. Consider solar backup alternatives for the Lekki office.` : "Fuel expenses are within normal boundaries.",
    overdueTenantsCount > 0 ? `Follow up on the ${overdueTenantsCount} overdue tenant payments immediately. AI generated nudges are ready in Rent Manager.` : "Tenant payments are stable this cycle.",
    "Optimal salary date predicted to be the 28th based on payment cycle arrivals (Nomba payment links settle on T+1)."
  ];

  return {
    score,
    cashFlowScore,
    paymentConsistencyScore,
    expenseControlScore,
    revenueGrowthScore,
    actionPoints
  };
};

export const parseAiCommand = (
  command: string, 
  state: {
    tenants: Tenant[];
    employees: Employee[];
    expenses: Expense[];
    products: Product[];
    transactions: Transaction[];
    ajoPools: AjoPool[];
  },
  triggerAction: (action: string, payload?: any) => void
): { text: string; actionTriggered?: string } => {
  const normalized = command.toLowerCase();
  
  if (normalized.includes('rent') || normalized.includes('tenant') || normalized.includes('who never pay')) {
    const unpaid = state.tenants.filter(t => t.status === 'overdue' || t.status === 'pending');
    if (unpaid.length === 0) {
      return { text: "No unpaid rent! All your tenants don pay completely. Business pulse is clean! 📈" };
    }
    return {
      text: `Zainab, Segun Arinze never pay rent (overdue since June 25). Chinedu Okafor dey pending (due July 4). AI predicts Chinedu will pay, but Segun profile get high risk. You want make I draft auto-reminders for them? 📝`,
      actionTriggered: "NAVIGATE_RENT"
    };
  }

  if (normalized.includes('salary') || normalized.includes('salaries') || normalized.includes('pay staff') || normalized.includes('payroll')) {
    const duplicate = state.employees.some(e => e.isDuplicate);
    if (duplicate) {
      return {
        text: "🚨 Hold on, Zainab! PulseAI detect anomaly. Victor Nwachukwu dey enter twice inside payroll (Duplicate Name & Account Number). If I pay now, double transfer go fire. Clear the duplicate first. Let's fix this in the Payroll manager. 🛑",
        actionTriggered: "NAVIGATE_PAYROLL"
      };
    }
    return {
      text: "All staff payroll is clean, no duplicates found. Total salary payout: ₦325,000. Click 'Pay all staff salaries' in the Payroll section to disburse immediately via Nomba Payouts. 💸",
      actionTriggered: "NAVIGATE_PAYROLL"
    };
  }

  if (normalized.includes('fuel') || normalized.includes('spend on fuel') || normalized.includes('generator')) {
    const fuelSpend = state.expenses
      .filter(e => e.category === 'Generator/Fuel')
      .reduce((sum, e) => sum + e.amount, 0);
    return {
      text: `You spent ₦${(fuelSpend/1000).toFixed(0)}k on fuel this month, Zainab. That's about ${Math.round((fuelSpend / state.expenses.reduce((s, e) => s + e.amount, 0)) * 100)}% of your total logged expenses. With fuel prices rising, moving to a solar inverter system of ₦1.8M will break even in 12 months. ☀️`,
      actionTriggered: "NAVIGATE_EXPENSES"
    };
  }

  if (normalized.includes('invoice') || normalized.includes('emeka') || normalized.includes('generate')) {
    const match = normalized.match(/(\d+[\d,]*)/);
    const amount = match ? parseInt(match[0].replace(/,/g, '')) : 250000;
    
    triggerAction("CREATE_PAYMENT_LINK", { sender: "Emeka Okoye", amount, description: "Branding work - PulseStack Invoice" });

    return {
      text: `Done! I don generate Nomba payment link of ₦${amount.toLocaleString()} for Emeka Okoye for "Branding work". Payment link don ready and transaction is pending checkout. 🔗`,
      actionTriggered: "CREATE_PAYMENT_LINK_SUCCESS"
    };
  }

  if (normalized.includes('health') || normalized.includes('score') || normalized.includes('pulse')) {
    const health = getBusinessHealth(state.expenses, state.transactions, state.tenants);
    return {
      text: `Your current Business Health Score is ${health.score}/100. Cash flow is strong (${health.cashFlowScore}), but expense control is low (${health.expenseControlScore}) due to fuel. Check the Health panel for complete recommendations. 📈`,
      actionTriggered: "NAVIGATE_HEALTH"
    };
  }

  if (normalized.includes('dollar') || normalized.includes('send dollars') || normalized.includes('remittance') || normalized.includes('diaspora') || normalized.includes('usdt')) {
    return {
      text: "Yes, today is a good time! Current rate is ₦1,550/$. Rate trends show slight appreciation of Naira tomorrow. If you send USDC/USDT now, you get high value conversion before the market settles. Click Diaspora Send to proceed. 🌍",
      actionTriggered: "NAVIGATE_DIASPORA"
    };
  }

  return {
    text: "I hear you, Zainab. I understand Pidgin & plain English. You can ask me: 'Who never pay rent?', 'How much did I spend on fuel?', 'Pay staff salaries', 'Generate invoice for Emeka of N250k', or 'What is my business health score?'"
  };
};
