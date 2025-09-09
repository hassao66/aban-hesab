import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, ChevronDown, ChevronLeft } from 'lucide-react';
import { Account } from '../types/common';

const AccountsModule: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: '1',
      name: 'صندوق',
      code: '1001',
      type: 'asset',
      balance: 50000000,
      description: 'موجودی نقد صندوق',
      createdAt: new Date()
    },
    {
      id: '2',
      name: 'بانک ملی',
      code: '1002',
      type: 'asset',
      balance: 250000000,
      description: 'حساب جاری بانک ملی',
      createdAt: new Date()
    },
    {
      id: '3',
      name: 'حساب‌های دریافتنی',
      code: '1003',
      type: 'asset',
      balance: 125000000,
      description: 'طلب از مشتریان',
      createdAt: new Date()
    },
    {
      id: '4',
      name: 'حساب‌های پرداختنی',
      code: '2001',
      type: 'liability',
      balance: 85000000,
      description: 'بدهی به تامین کنندگان',
      createdAt: new Date()
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['asset', 'liability']);

  const accountTypes = {
    asset: { label: 'دارایی‌ها', color: 'text-green-600' },
    liability: { label: 'بدهی‌ها', color: 'text-red-600' },
    equity: { label: 'حقوق صاحبان سهام', color: 'text-blue-600' },
    revenue: { label: 'درآمدها', color: 'text-purple-600' },
    expense: { label: 'هزینه‌ها', color: 'text-orange-600' }
  };

  const filteredAccounts = accounts.filter(account =>
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.code.includes(searchTerm)
  );

  const groupedAccounts = Object.entries(accountTypes).map(([type, config]) => ({
    type,
    ...config,
    accounts: filteredAccounts.filter(account => account.type === type)
  }));

  const toggleGroup = (type: string) => {
    setExpandedGroups(prev => 
      prev.includes(type) 
        ? prev.filter(g => g !== type)
        : [...prev, type]
    );
  };

  const totalBalance = (type: string) => {
    return filteredAccounts
      .filter(account => account.type === type)
      .reduce((sum, account) => sum + account.balance, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">مدیریت حساب‌ها</h1>
          <p className="text-gray-600 mt-1">مدیریت چارت حساب‌ها و موجودی‌ها</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          حساب جدید
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="جستجوی حساب..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {groupedAccounts.map(({ type, label, color, accounts: typeAccounts }) => (
            <div key={type} className="p-6">
              <button
                onClick={() => toggleGroup(type)}
                className="flex items-center justify-between w-full text-right hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  {expandedGroups.includes(type) ? (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronLeft className="w-5 h-5 text-gray-500" />
                  )}
                  <h3 className={`text-lg font-semibold ${color}`}>{label}</h3>
                  <span className="text-sm text-gray-500">({typeAccounts.length} حساب)</span>
                </div>
                <div className={`text-lg font-bold ${color}`}>
                  {totalBalance(type).toLocaleString('fa-IR')} تومان
                </div>
              </button>

              {expandedGroups.includes(type) && (
                <div className="mt-4 space-y-2">
                  {typeAccounts.map((account) => (
                    <div key={account.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm text-gray-500 bg-white px-2 py-1 rounded">
                            {account.code}
                          </span>
                          <h4 className="font-semibold text-gray-900">{account.name}</h4>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{account.description}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-left">
                          <div className={`text-lg font-bold ${color}`}>
                            {account.balance.toLocaleString('fa-IR')} ت
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {typeAccounts.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      هیچ حسابی در این دسته یافت نشد
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountsModule;