import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Building2, CreditCard, TrendingUp, TrendingDown } from 'lucide-react';
import { Bank } from '../types/common';

const BanksModule: React.FC = () => {
  const [banks, setBanks] = useState<Bank[]>([
    {
      id: '1',
      name: 'بانک ملی',
      accountNumber: '0123456789',
      branch: 'شعبه مرکزی تهران',
      balance: 250000000,
      type: 'current',
      description: 'حساب جاری اصلی شرکت',
      createdAt: new Date()
    },
    {
      id: '2',
      name: 'بانک پارسیان',
      accountNumber: '9876543210',
      branch: 'شعبه ولیعصر',
      balance: 150000000,
      type: 'current',
      description: 'حساب جاری فرعی',
      createdAt: new Date()
    },
    {
      id: '3',
      name: 'بانک پاسارگاد',
      accountNumber: '5555666677',
      branch: 'شعبه انقلاب',
      balance: 75000000,
      type: 'savings',
      description: 'حساب پس‌انداز',
      createdAt: new Date()
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const bankTypes = {
    current: { label: 'جاری', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    savings: { label: 'پس‌انداز', color: 'text-green-600', bgColor: 'bg-green-50' },
    loan: { label: 'تسهیلات', color: 'text-red-600', bgColor: 'bg-red-50' }
  };

  const filteredBanks = banks.filter(bank => {
    const matchesSearch = bank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bank.accountNumber.includes(searchTerm) ||
                         bank.branch.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || bank.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const totalBalance = banks.reduce((sum, bank) => sum + bank.balance, 0);
  const currentAccounts = banks.filter(b => b.type === 'current');
  const savingsAccounts = banks.filter(b => b.type === 'savings');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">مدیریت بانک‌ها</h1>
          <p className="text-gray-600 mt-1">مدیریت حساب‌های بانکی و موجودی‌ها</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          حساب بانکی جدید
        </button>
      </div>

      {/* آمار بانک‌ها */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">کل موجودی</h3>
              <p className="text-2xl font-bold text-blue-600 mt-2">
                {(totalBalance / 1000000).toFixed(1)} میلیون
              </p>
              <p className="text-sm text-gray-500 mt-1">تومان</p>
            </div>
            <Building2 className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">تعداد بانک‌ها</h3>
              <p className="text-2xl font-bold text-gray-900 mt-2">{banks.length}</p>
              <p className="text-sm text-gray-500 mt-1">حساب فعال</p>
            </div>
            <CreditCard className="w-8 h-8 text-gray-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">حساب‌های جاری</h3>
              <p className="text-2xl font-bold text-green-600 mt-2">{currentAccounts.length}</p>
              <p className="text-sm text-gray-500 mt-1">
                {(currentAccounts.reduce((sum, acc) => sum + acc.balance, 0) / 1000000).toFixed(1)} میلیون
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">حساب‌های پس‌انداز</h3>
              <p className="text-2xl font-bold text-purple-600 mt-2">{savingsAccounts.length}</p>
              <p className="text-sm text-gray-500 mt-1">
                {(savingsAccounts.reduce((sum, acc) => sum + acc.balance, 0) / 1000000).toFixed(1)} میلیون
              </p>
            </div>
            <TrendingDown className="w-8 h-8 text-purple-500" />
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
                placeholder="جستجوی بانک..."
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
              <option value="current">جاری</option>
              <option value="savings">پس‌انداز</option>
              <option value="loan">تسهیلات</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredBanks.map((bank) => (
            <div key={bank.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{bank.name}</h3>
                          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bankTypes[bank.type].bgColor} ${bankTypes[bank.type].color}`}>
                            {bankTypes[bank.type].label}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="space-y-2">
                          <div>
                            <span className="font-medium">شماره حساب:</span>
                            <span className="font-mono mr-2">{bank.accountNumber}</span>
                          </div>
                          <div>
                            <span className="font-medium">شعبه:</span>
                            <span className="mr-2">{bank.branch}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div>
                            <span className="font-medium">توضیحات:</span>
                            <span className="mr-2">{bank.description}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-6">
                      <div className="text-left">
                        <p className="text-sm text-gray-500 mb-1">موجودی حساب</p>
                        <p className={`text-2xl font-bold ${
                          bank.balance >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {bank.balance.toLocaleString('fa-IR')} ت
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {(bank.balance / 1000000).toFixed(2)} میلیون تومان
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBanks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">هیچ حساب بانکی یافت نشد</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BanksModule;