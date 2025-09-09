import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Calculator, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { TaxRecord } from '../types/common';

const TaxModule: React.FC = () => {
  const [taxRecords, setTaxRecords] = useState<TaxRecord[]>([
    {
      id: '1',
      type: 'vat',
      amount: 2500000,
      rate: 9,
      period: '1403/06',
      description: 'مالیات بر ارزش افزوده فروش',
      paid: true,
      dueDate: new Date('2024-09-20'),
      createdAt: new Date('2024-08-15')
    },
    {
      id: '2',
      type: 'income',
      amount: 15000000,
      rate: 25,
      period: '1403/06',
      description: 'مالیات بر درآمد شرکت',
      paid: false,
      dueDate: new Date('2024-10-15'),
      createdAt: new Date('2024-08-20')
    },
    {
      id: '3',
      type: 'payroll',
      amount: 5000000,
      rate: 20,
      period: '1403/06',
      description: 'مالیات حقوق و دستمزد',
      paid: false,
      dueDate: new Date('2024-09-25'),
      createdAt: new Date('2024-08-25')
    },
    {
      id: '4',
      type: 'vat',
      amount: 1800000,
      rate: 9,
      period: '1403/05',
      description: 'مالیات بر ارزش افزوده خرید',
      paid: true,
      dueDate: new Date('2024-08-20'),
      createdAt: new Date('2024-07-15')
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const taxTypes = {
    vat: { label: 'مالیات بر ارزش افزوده', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    income: { label: 'مالیات بر درآمد', color: 'text-green-600', bgColor: 'bg-green-50' },
    payroll: { label: 'مالیات حقوق و دستمزد', color: 'text-purple-600', bgColor: 'bg-purple-50' }
  };

  const filteredTaxRecords = taxRecords.filter(record => {
    const matchesSearch = record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.period.includes(searchTerm);
    const matchesType = typeFilter === 'all' || record.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'paid' && record.paid) || 
                         (statusFilter === 'unpaid' && !record.paid);
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalTaxes = taxRecords.reduce((sum, record) => sum + record.amount, 0);
  const paidTaxes = taxRecords.filter(r => r.paid).reduce((sum, r) => sum + r.amount, 0);
  const unpaidTaxes = taxRecords.filter(r => !r.paid).reduce((sum, r) => sum + r.amount, 0);
  const overdueTaxes = taxRecords.filter(r => !r.paid && new Date(r.dueDate) < new Date()).length;

  const calculateTax = (baseAmount: number, rate: number) => {
    return (baseAmount * rate) / 100;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">مدیریت مالیات</h1>
          <p className="text-gray-600 mt-1">محاسبات مالیاتی و پیگیری تعهدات مالیاتی</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          رکورد مالیاتی جدید
        </button>
      </div>

      {/* آمار کلی مالیات */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">کل مالیات‌ها</h3>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {(totalTaxes / 1000000).toFixed(1)} میلیون
              </p>
              <p className="text-sm text-gray-500 mt-1">تومان</p>
            </div>
            <Calculator className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">پرداخت شده</h3>
              <p className="text-2xl font-bold text-green-600 mt-2">
                {(paidTaxes / 1000000).toFixed(1)} میلیون
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">معوقه</h3>
              <p className="text-2xl font-bold text-orange-600 mt-2">
                {(unpaidTaxes / 1000000).toFixed(1)} میلیون
              </p>
            </div>
            <FileText className="w-8 h-8 text-orange-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">سررسید گذشته</h3>
              <p className="text-2xl font-bold text-red-600 mt-2">{overdueTaxes}</p>
              <p className="text-sm text-gray-500 mt-1">مورد</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* ماشین حساب مالیات */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">ماشین حساب مالیات</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">مالیات بر ارزش افزوده (9%)</h3>
            <div className="space-y-2">
              <input
                type="number"
                placeholder="مبلغ پایه"
                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  const base = parseFloat(e.target.value) || 0;
                  const tax = calculateTax(base, 9);
                  const nextInput = e.target.parentElement?.querySelector('.tax-result');
                  if (nextInput) nextInput.textContent = tax.toLocaleString('fa-IR') + ' تومان';
                }}
              />
              <div className="text-lg font-bold text-blue-700 tax-result">0 تومان</div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">مالیات بر درآمد (25%)</h3>
            <div className="space-y-2">
              <input
                type="number"
                placeholder="درآمد مشمول"
                className="w-full px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500"
                onChange={(e) => {
                  const base = parseFloat(e.target.value) || 0;
                  const tax = calculateTax(base, 25);
                  const nextInput = e.target.parentElement?.querySelector('.tax-result');
                  if (nextInput) nextInput.textContent = tax.toLocaleString('fa-IR') + ' تومان';
                }}
              />
              <div className="text-lg font-bold text-green-700 tax-result">0 تومان</div>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-800 mb-2">مالیات حقوق (20%)</h3>
            <div className="space-y-2">
              <input
                type="number"
                placeholder="حقوق مشمول"
                className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                onChange={(e) => {
                  const base = parseFloat(e.target.value) || 0;
                  const tax = calculateTax(base, 20);
                  const nextInput = e.target.parentElement?.querySelector('.tax-result');
                  if (nextInput) nextInput.textContent = tax.toLocaleString('fa-IR') + ' تومان';
                }}
              />
              <div className="text-lg font-bold text-purple-700 tax-result">0 تومان</div>
            </div>
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
                placeholder="جستجوی رکورد مالیاتی..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">همه انواع</option>
                <option value="vat">مالیات بر ارزش افزوده</option>
                <option value="income">مالیات بر درآمد</option>
                <option value="payroll">مالیات حقوق</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">همه وضعیت‌ها</option>
                <option value="paid">پرداخت شده</option>
                <option value="unpaid">پرداخت نشده</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">نوع مالیات</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">دوره</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">شرح</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">نرخ</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">مبلغ</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">سررسید</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">وضعیت</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTaxRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${taxTypes[record.type].bgColor} ${taxTypes[record.type].color}`}>
                      {taxTypes[record.type].label}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium text-gray-900">{record.period}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-600">{record.description}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-gray-900">{record.rate}%</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-gray-900">
                      {record.amount.toLocaleString('fa-IR')} ت
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`text-sm ${
                      new Date(record.dueDate) < new Date() && !record.paid 
                        ? 'text-red-600 font-semibold' 
                        : 'text-gray-600'
                    }`}>
                      {record.dueDate.toLocaleDateString('fa-IR')}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {record.paid ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3" />
                        پرداخت شده
                      </span>
                    ) : (
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                        new Date(record.dueDate) < new Date() 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        <AlertCircle className="w-3 h-3" />
                        {new Date(record.dueDate) < new Date() ? 'سررسید گذشته' : 'در انتظار پرداخت'}
                      </span>
                    )}
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

        {filteredTaxRecords.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">هیچ رکورد مالیاتی یافت نشد</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaxModule;