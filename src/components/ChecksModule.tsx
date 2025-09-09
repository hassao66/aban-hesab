import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Receipt, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Check } from '../types/common';

const ChecksModule: React.FC = () => {
  const [checks, setChecks] = useState<Check[]>([
    {
      id: '1',
      number: '1234567',
      bankId: '1',
      bankName: 'بانک ملی',
      amount: 15000000,
      date: new Date('2024-01-15'),
      dueDate: new Date('2024-02-15'),
      payee: 'شرکت آریان',
      status: 'issued',
      description: 'پرداخت فاکتور شماره 001',
      createdAt: new Date()
    },
    {
      id: '2',
      number: '2345678',
      bankId: '2',
      bankName: 'بانک پارسیان',
      amount: 8500000,
      date: new Date('2024-01-10'),
      dueDate: new Date('2024-02-10'),
      payee: 'شرکت پارس',
      status: 'cashed',
      description: 'پرداخت حقوق کارمندان',
      createdAt: new Date()
    },
    {
      id: '3',
      number: '3456789',
      bankId: '1',
      bankName: 'بانک ملی',
      amount: 5000000,
      date: new Date('2024-01-05'),
      dueDate: new Date('2024-01-20'),
      payee: 'تامین کننده ABC',
      status: 'bounced',
      description: 'خرید مواد اولیه',
      createdAt: new Date()
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [bankFilter, setBankFilter] = useState<string>('all');

  const statusConfig = {
    issued: { label: 'صادر شده', color: 'bg-blue-100 text-blue-800', dot: 'bg-blue-500', icon: Clock },
    cashed: { label: 'نقد شده', color: 'bg-green-100 text-green-800', dot: 'bg-green-500', icon: CheckCircle },
    bounced: { label: 'برگشتی', color: 'bg-red-100 text-red-800', dot: 'bg-red-500', icon: AlertCircle },
    cancelled: { label: 'لغو شده', color: 'bg-gray-100 text-gray-800', dot: 'bg-gray-500', icon: AlertCircle }
  };

  const banks = [...new Set(checks.map(c => c.bankName))];

  const filteredChecks = checks.filter(check => {
    const matchesSearch = check.number.includes(searchTerm) ||
                         check.payee.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || check.status === statusFilter;
    const matchesBank = bankFilter === 'all' || check.bankName === bankFilter;
    return matchesSearch && matchesStatus && matchesBank;
  });

  const totalAmount = checks.reduce((sum, check) => sum + check.amount, 0);
  const cashedAmount = checks.filter(c => c.status === 'cashed').reduce((sum, c) => sum + c.amount, 0);
  const bouncedAmount = checks.filter(c => c.status === 'bounced').reduce((sum, c) => sum + c.amount, 0);
  const pendingAmount = checks.filter(c => c.status === 'issued').reduce((sum, c) => sum + c.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">مدیریت چک‌ها</h1>
          <p className="text-gray-600 mt-1">مدیریت چک‌های صادره و دریافتی</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            چک جدید
          </button>
        </div>
      </div>

      {/* آمار چک‌ها */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">کل مبلغ چک‌ها</h3>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {(totalAmount / 1000000).toFixed(1)} میلیون
              </p>
            </div>
            <Receipt className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">نقد شده</h3>
              <p className="text-2xl font-bold text-green-600 mt-2">
                {(cashedAmount / 1000000).toFixed(1)} میلیون
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">در انتظار</h3>
              <p className="text-2xl font-bold text-blue-600 mt-2">
                {(pendingAmount / 1000000).toFixed(1)} میلیون
              </p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">برگشتی</h3>
              <p className="text-2xl font-bold text-red-600 mt-2">
                {(bouncedAmount / 1000000).toFixed(1)} میلیون
              </p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="جستجوی چک..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">همه وضعیت‌ها</option>
                <option value="issued">صادر شده</option>
                <option value="cashed">نقد شده</option>
                <option value="bounced">برگشتی</option>
                <option value="cancelled">لغو شده</option>
              </select>
              <select
                value={bankFilter}
                onChange={(e) => setBankFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">همه بانک‌ها</option>
                {banks.map(bank => (
                  <option key={bank} value={bank}>{bank}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">شماره چک</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">بانک</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">ذینفع</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">مبلغ</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">تاریخ صدور</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">سررسید</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">وضعیت</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredChecks.map((check) => {
                const StatusIcon = statusConfig[check.status].icon;
                return (
                  <tr key={check.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <span className="font-mono text-sm">{check.number}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-gray-900">{check.bankName}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <span className="font-medium text-gray-900">{check.payee}</span>
                        <p className="text-sm text-gray-500">{check.description}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-gray-900">
                        {check.amount.toLocaleString('fa-IR')} ت
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {check.date.toLocaleDateString('fa-IR')}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {check.dueDate.toLocaleDateString('fa-IR')}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                        statusConfig[check.status].color
                      }`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusConfig[check.status].label}
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
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredChecks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">هیچ چکی یافت نشد</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChecksModule;