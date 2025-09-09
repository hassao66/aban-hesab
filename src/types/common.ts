export type ModuleType = 
  | 'dashboard' 
  | 'accounts' 
  | 'invoices' 
  | 'customers' 
  | 'inventory' 
  | 'reports' 
  | 'tax'
  | 'treasury'
  | 'documents'
  | 'checks'
  | 'banks'
  | 'assets'
  | 'financial'
  | 'settings'
  | 'backup'
  | 'financial-affairs'
  | 'sales-reports'
  | 'purchase-reports'
  | 'purchase-invoices'
  | 'fast-sales'
  | 'fast-purchase'
  | 'pre-invoice'
  | 'purchase-pre-invoice'
  | 'goods'
  | 'persons';

export interface Account {
  id: string;
  name: string;
  code: string;
  type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
  balance: number;
  description: string;
  parentId?: string;
  createdAt: Date;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  nationalId: string;
  economicCode: string;
  balance: number;
  createdAt: Date;
}

export interface Invoice {
  id: string;
  number: string;
  customerId: string;
  customerName: string;
  date: Date;
  dueDate: Date;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  notes: string;
}

export interface InvoiceItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  code: string;
  category: string;
  unitPrice: number;
  stock: number;
  minStock: number;
  unit: string;
  description: string;
  createdAt: Date;
}

export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  salary: number;
  bonus: number;
  deductions: number;
  nationalId: string;
  phone: string;
  email: string;
  hireDate: Date;
}

export interface TaxRecord {
  id: string;
  type: 'vat' | 'income' | 'payroll';
  amount: number;
  rate: number;
  period: string;
  description: string;
  paid: boolean;
  dueDate: Date;
  createdAt: Date;
}

export interface TreasuryTransaction {
  id: string;
  type: 'receipt' | 'payment';
  amount: number;
  description: string;
  accountId: string;
  accountName: string;
  date: Date;
  documentNumber: string;
  reference: string;
  createdAt: Date;
}

export interface Document {
  id: string;
  number: string;
  type: 'journal' | 'receipt' | 'payment' | 'transfer';
  date: Date;
  description: string;
  entries: DocumentEntry[];
  totalDebit: number;
  totalCredit: number;
  status: 'draft' | 'posted' | 'cancelled';
  createdAt: Date;
}

export interface DocumentEntry {
  id: string;
  accountId: string;
  accountName: string;
  debit: number;
  credit: number;
  description: string;
}

export interface Check {
  id: string;
  number: string;
  bankId: string;
  bankName: string;
  amount: number;
  date: Date;
  dueDate: Date;
  payee: string;
  status: 'issued' | 'cashed' | 'bounced' | 'cancelled';
  description: string;
  createdAt: Date;
}

export interface Bank {
  id: string;
  name: string;
  accountNumber: string;
  branch: string;
  balance: number;
  type: 'current' | 'savings' | 'loan';
  description: string;
  createdAt: Date;
}

export interface Asset {
  id: string;
  name: string;
  code: string;
  category: string;
  purchaseDate: Date;
  purchasePrice: number;
  currentValue: number;
  depreciationRate: number;
  location: string;
  status: 'active' | 'disposed' | 'maintenance';
  description: string;
  createdAt: Date;
}
export interface FinancialTransaction {
  id: string;
  type: 'income' | 'expense' | 'transfer';
  category: string;
  amount: number;
  description: string;
  date: Date;
  accountFrom?: string;
  accountTo?: string;
  reference: string;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
}

export interface Budget {
  id: string;
  name: string;
  category: string;
  budgetAmount: number;
  spentAmount: number;
  period: 'monthly' | 'quarterly' | 'yearly';
  startDate: Date;
  endDate: Date;
  status: 'active' | 'completed' | 'exceeded';
  createdAt: Date;
}

export interface CashFlow {
  id: string;
  date: Date;
  description: string;
  inflow: number;
  outflow: number;
  balance: number;
  category: string;
  reference: string;
}