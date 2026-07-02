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

