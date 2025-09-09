import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, ArrowUpCircle, ArrowDownCircle, Vault, DollarSign } from 'lucide-react';
import { TreasuryTransaction } from '../types/common';

const TreasuryModule: React.FC = () => {
  const [transactions, setTransactions] = useState<TreasuryTransaction[]>([
    {
      id: '1',
      type: 'receipt',
      amount: 15000000,
      description: 'دریافت از مشتری - شرکت آریان',
      accountId: '1',
      accountName: 'صندوق',
      date: new Date('2024-01-15'),
      documentNumber: 'REC-001',
      reference: 'INV-2024-001',
      createdAt: new Date()
    },
    {
      id: '2',
      type: 'payment',
      amount: 8500000,
      description: 'پرداخت به تامین کننده',
      accountId: '2',
      accountName: 'بانک ملی',
      date: new Date('2024-01-16'),
      documentNumber: 'PAY-001',
      reference: 'PUR-2024-001',
      createdAt: new Date()
    },
    {
      id: '3',
      type: 'receipt',
      amount: 5000000,
      description: 'دریافت وجه نقد',
      accountId: '1',
      accountName: 'صندوق',
      date: new Date('2024-01-17'),
      documentNumber: 'REC-002',
      reference: '',
      createdAt: new Date()
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.documentNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const totalReceipts = transactions.filter(t => t.type === 'receipt').reduce((sum, t) => sum + t.amount, 0);
  const totalPayments = transactions.filter(t => t.type === 'payment').reduce((sum, t) => sum + t.amount, 0);
  const netCashFlow = totalReceipts - totalPayments;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">مدیریت خزانه‌داری</h1>
          <p className="text-gray-600 mt-1">مدیریت دریافت و پرداخت‌های نقدی</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <ArrowUpCircle className="w-4 h-4" />
            دریافت جدید
          </button>
          <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
            <ArrowDownCircle className="w-4 h-4" />
            پرداخت جدید
          </button>
        </div>
      </div>

      {/* آمار خزانه‌داری */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">کل دریافت‌ها</h3>
              <p className="text-2xl font-bold text-green-600 mt-2">
                {(totalReceipts / 1000000).toFixed(1)} میلیون
              </p>
            </div>
            <ArrowUpCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">کل پرداخت‌ها</h3>
              <p className="text-2xl font-bold text-red-600 mt-2">
                {(totalPayments / 1000000).toFixed(1)} میلیون
              </p>
            </div>
            <ArrowDownCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">جریان نقدی خالص</h3>
              <p className={`text-2xl font-bold mt-2 ${netCashFlow >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                {(netCashFlow / 1000000).toFixed(1)} میلیون
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">تعداد تراکنش‌ها</h3>
              <p className="text-2xl font-bold text-purple-600 mt-2">{transactions.length}</p>
            </div>
            <Vault className="w-8 h-8 text-purple-500" />
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
              <option value="all">همه تراکنش‌ها</option>
              <option value="receipt">دریافت‌ها</option>
              <option value="payment">پرداخت‌ها</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">شماره سند</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">تاریخ</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">نوع</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">حساب</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">شرح</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">مبلغ</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">مرجع</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <span className="font-mono text-sm">{transaction.documentNumber}</span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {transaction.date.toLocaleDateString('fa-IR')}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                      transaction.type === 'receipt' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.type === 'receipt' ? (
                        <ArrowUpCircle className="w-3 h-3" />
                      ) : (
                        <ArrowDownCircle className="w-3 h-3" />
                      )}
                      {transaction.type === 'receipt' ? 'دریافت' : 'پرداخت'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium text-gray-900">{transaction.accountName}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-600">{transaction.description}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`font-semibold ${
                      transaction.type === 'receipt' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'receipt' ? '+' : '-'}{transaction.amount.toLocaleString('fa-IR')} ت
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-500">{transaction.reference || '-'}</span>
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

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">هیچ تراکنشی یافت نشد</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TreasuryModule;