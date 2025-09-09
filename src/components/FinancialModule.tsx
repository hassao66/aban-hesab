import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3, Calendar, Filter } from 'lucide-react';
import { FinancialTransaction, Budget, CashFlow } from '../types/common';

const FinancialModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('transactions');
  
  const [transactions, setTransactions] = useState<FinancialTransaction[]>([
    {
      id: '1',
      type: 'income',
      category: 'فروش',
      amount: 25000000,
      description: 'فروش محصولات به مشتری',
      date: new Date('2024-01-15'),
      reference: 'INV-001',
      status: 'completed',
      createdAt: new Date()
    },
    {
      id: '2',
      type: 'expense',
      category: 'خرید',
      amount: 15000000,
      description: 'خرید مواد اولیه',
      date: new Date('2024-01-16'),
      reference: 'PUR-001',
      status: 'completed',
      createdAt: new Date()
    },
    {
      id: '3',
      type: 'expense',
      category: 'اداری',
      amount: 5000000,
      description: 'هزینه‌های اداری',
      date: new Date('2024-01-17'),
      reference: 'EXP-001',
      status: 'pending',
      createdAt: new Date()
    }
  ]);

  const [budgets, setBudgets] = useState<Budget[]>([
    {
      id: '1',
      name: 'بودجه فروش',
      category: 'درآمد',
      budgetAmount: 100000000,
      spentAmount: 75000000,
      period: 'monthly',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-31'),
      status: 'active',
      createdAt: new Date()
    },
    {
      id: '2',
      name: 'بودجه بازاریابی',
      category: 'هزینه',
      budgetAmount: 20000000,
      spentAmount: 25000000,
      period: 'monthly',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-31'),
      status: 'exceeded',
      createdAt: new Date()
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const tabs = [
    { id: 'transactions', label: 'تراکنش‌های مالی', icon: DollarSign },
    { id: 'budgets', label: 'بودجه‌بندی', icon: PieChart },
    { id: 'cashflow', label: 'جریان نقدی', icon: TrendingUp },
    { id: 'analysis', label: 'تحلیل مالی', icon: BarChart3 }
  ];

  const transactionTypes = {
    income: { label: 'درآمد', color: 'text-green-600', bgColor: 'bg-green-50' },
    expense: { label: 'هزینه', color: 'text-red-600', bgColor: 'bg-red-50' },
    transfer: { label: 'انتقال', color: 'text-blue-600', bgColor: 'bg-blue-50' }
  };

  const statusConfig = {
    pending: { label: 'در انتظار', color: 'bg-yellow-100 text-yellow-800', dot: 'bg-yellow-500' },
    completed: { label: 'تکمیل شده', color: 'bg-green-100 text-green-800', dot: 'bg-green-500' },
    cancelled: { label: 'لغو شده', color: 'bg-red-100 text-red-800', dot: 'bg-red-500' }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const totalIncome = transactions.filter(t => t.type === 'income' && t.status === 'completed').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense' && t.status === 'completed').reduce((sum, t) => sum + t.amount, 0);
  const netProfit = totalIncome - totalExpense;
  const profitMargin = totalIncome > 0 ? (netProfit / totalIncome) * 100 : 0;

  const renderTransactions = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">تراکنش‌های مالی</h2>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          تراکنش جدید
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">کل درآمد</h3>
              <p className="text-2xl font-bold text-green-600 mt-2">
                {(totalIncome / 1000000).toFixed(1)} میلیون
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">کل هزینه</h3>
              <p className="text-2xl font-bold text-red-600 mt-2">
                {(totalExpense / 1000000).toFixed(1)} میلیون
              </p>
            </div>
            <TrendingDown className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">سود خالص</h3>
              <p className={`text-2xl font-bold mt-2 ${netProfit >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                {(netProfit / 1000000).toFixed(1)} میلیون
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">حاشیه سود</h3>
              <p className="text-2xl font-bold text-purple-600 mt-2">
                {profitMargin.toFixed(1)}%
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="جستجوی تراکنش..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">همه انواع</option>
              <option value="income">درآمد</option>
              <option value="expense">هزینه</option>
              <option value="transfer">انتقال</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">تاریخ</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">نوع</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">دسته‌بندی</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">شرح</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">مبلغ</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">مرجع</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">وضعیت</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {transaction.date.toLocaleDateString('fa-IR')}
                  </td>
                  <td className="py-4 px-4">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${transactionTypes[transaction.type].bgColor} ${transactionTypes[transaction.type].color}`}>
                      {transactionTypes[transaction.type].label}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-900">{transaction.category}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-600">{transaction.description}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`font-semibold ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}{transaction.amount.toLocaleString('fa-IR')} ت
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-500">{transaction.reference}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                      statusConfig[transaction.status].color
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${statusConfig[transaction.status].dot}`}></div>
                      {statusConfig[transaction.status].label}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderBudgets = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">بودجه‌بندی</h2>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          بودجه جدید
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {budgets.map((budget) => {
          const percentage = (budget.spentAmount / budget.budgetAmount) * 100;
          const isExceeded = percentage > 100;
          
          return (
            <div key={budget.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{budget.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  isExceeded ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                  {budget.status === 'exceeded' ? 'تجاوز از بودجه' : 'در حد بودجه'}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">بودجه تخصیص یافته:</span>
                  <span className="font-semibold">{budget.budgetAmount.toLocaleString('fa-IR')} ت</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">مصرف شده:</span>
                  <span className={`font-semibold ${isExceeded ? 'text-red-600' : 'text-green-600'}`}>
                    {budget.spentAmount.toLocaleString('fa-IR')} ت
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">باقی‌مانده:</span>
                  <span className={`font-semibold ${isExceeded ? 'text-red-600' : 'text-blue-600'}`}>
                    {(budget.budgetAmount - budget.spentAmount).toLocaleString('fa-IR')} ت
                  </span>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>درصد مصرف</span>
                    <span className={`font-semibold ${isExceeded ? 'text-red-600' : 'text-blue-600'}`}>
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        isExceeded ? 'bg-red-500' : percentage > 80 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mt-4">
                <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'transactions':
        return renderTransactions();
      case 'budgets':
        return renderBudgets();
      case 'cashflow':
        return <div className="text-center py-12 text-gray-500">ماژول جریان نقدی در حال توسعه است</div>;
      case 'analysis':
        return <div className="text-center py-12 text-gray-500">ماژول تحلیل مالی در حال توسعه است</div>;
      default:
        return renderTransactions();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">امور مالی</h1>
          <p className="text-gray-600 mt-1">مدیریت جامع امور مالی و بودجه‌بندی</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-500">دوره مالی: 1403</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" dir="ltr">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default FinancialModule;