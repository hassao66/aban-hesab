import React, { useState } from 'react';
import { Plus, Search, Eye, Edit, Trash2, Phone, Mail, MapPin } from 'lucide-react';
import { Customer } from '../types/common';

const CustomersModule: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: '1',
      name: 'شرکت آریان',
      phone: '021-88554433',
      email: 'info@aryan.co',
      address: 'تهران، خیابان ولیعصر، پلاک 123',
      nationalId: '1234567890',
      economicCode: '12345678901',
      balance: 15000000,
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'شرکت پارس',
      phone: '021-77889944',
      email: 'contact@pars.ir',
      address: 'تهران، خیابان انقلاب، پلاک 456',
      nationalId: '0987654321',
      economicCode: '10987654321',
      balance: -2500000,
      createdAt: new Date('2024-01-20')
    },
    {
      id: '3',
      name: 'شرکت ایده‌آل',
      phone: '021-66223311',
      email: 'hello@ideal.com',
      address: 'تهران، خیابان کریمخان، پلاک 789',
      nationalId: '5678901234',
      economicCode: '15678901234',
      balance: 8750000,
      createdAt: new Date('2024-01-10')
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalBalance = customers.reduce((sum, customer) => sum + customer.balance, 0);
  const positiveBalance = customers.filter(c => c.balance > 0).reduce((sum, c) => sum + c.balance, 0);
  const negativeBalance = customers.filter(c => c.balance < 0).reduce((sum, c) => sum + Math.abs(c.balance), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">مدیریت مشتریان</h1>
          <p className="text-gray-600 mt-1">اطلاعات مشتریان و موجودی حساب‌ها</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          مشتری جدید
        </button>
      </div>

      {/* آمار کلی */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-600">تعداد مشتریان</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">{customers.length}</p>
          <p className="text-sm text-gray-500 mt-1">مشتری فعال</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-600">کل موجودی</h3>
          <p className={`text-2xl font-bold mt-2 ${totalBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {totalBalance.toLocaleString('fa-IR')} ت
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-600">طلب از مشتریان</h3>
          <p className="text-2xl font-bold text-green-600 mt-2">
            {positiveBalance.toLocaleString('fa-IR')} ت
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-600">بدهی به مشتریان</h3>
          <p className="text-2xl font-bold text-red-600 mt-2">
            {negativeBalance.toLocaleString('fa-IR')} ت
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="جستجوی مشتری..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredCustomers.map((customer) => (
            <div key={customer.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{customer.name}</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            <span>{customer.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            <span>{customer.email}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div>
                            <span className="font-medium">کد ملی:</span> {customer.nationalId}
                          </div>
                          <div>
                            <span className="font-medium">کد اقتصادی:</span> {customer.economicCode}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{customer.address}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-6">
                      <div className="text-left">
                        <p className="text-sm text-gray-500 mb-1">موجودی حساب</p>
                        <p className={`text-xl font-bold ${
                          customer.balance >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {customer.balance.toLocaleString('fa-IR')} ت
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {customer.balance >= 0 ? 'طلب از مشتری' : 'بدهی به مشتری'}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
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

        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">هیچ مشتری‌ای یافت نشد</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomersModule;