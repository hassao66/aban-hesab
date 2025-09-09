import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Phone, Mail, MapPin, Users, Building, User } from 'lucide-react';

interface Person {
  id: string;
  name: string;
  type: 'customer' | 'supplier' | 'employee' | 'other';
  phone: string;
  email: string;
  address: string;
  nationalId?: string;
  economicCode?: string;
  balance: number;
  notes: string;
  createdAt: Date;
}

const PersonsModule: React.FC = () => {
  const [persons, setPersons] = useState<Person[]>([
    {
      id: '1',
      name: 'شرکت آریان',
      type: 'customer',
      phone: '021-88554433',
      email: 'info@aryan.co',
      address: 'تهران، خیابان ولیعصر، پلاک 123',
      nationalId: '1234567890',
      economicCode: '12345678901',
      balance: 15000000,
      notes: 'مشتری VIP',
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'تامین کننده الف',
      type: 'supplier',
      phone: '021-77889944',
      email: 'supplier@alpha.ir',
      address: 'تهران، خیابان انقلاب، پلاک 456',
      nationalId: '0987654321',
      economicCode: '10987654321',
      balance: -5000000,
      notes: 'تامین کننده اصلی مواد اولیه',
      createdAt: new Date('2024-01-20')
    },
    {
      id: '3',
      name: 'احمد محمدی',
      type: 'employee',
      phone: '0912-3456789',
      email: 'ahmad@company.com',
      address: 'تهران، خیابان کریمخان، پلاک 789',
      nationalId: '5678901234',
      balance: 0,
      notes: 'مدیر مالی',
      createdAt: new Date('2024-01-10')
    },
    {
      id: '4',
      name: 'شرکت پارس',
      type: 'customer',
      phone: '021-55667788',
      email: 'info@pars.com',
      address: 'اصفهان، خیابان چهارباغ، پلاک 321',
      nationalId: '9876543210',
      economicCode: '19876543210',
      balance: 8500000,
      notes: 'مشتری جدید',
      createdAt: new Date('2024-01-25')
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const personTypes = {
    customer: { label: 'مشتری', color: 'text-blue-600', bgColor: 'bg-blue-50', icon: User },
    supplier: { label: 'تامین کننده', color: 'text-green-600', bgColor: 'bg-green-50', icon: Building },
    employee: { label: 'کارمند', color: 'text-purple-600', bgColor: 'bg-purple-50', icon: Users },
    other: { label: 'سایر', color: 'text-gray-600', bgColor: 'bg-gray-50', icon: User }
  };

  const filteredPersons = persons.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.phone.includes(searchTerm) ||
                         person.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || person.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const stats = {
    total: persons.length,
    customers: persons.filter(p => p.type === 'customer').length,
    suppliers: persons.filter(p => p.type === 'supplier').length,
    employees: persons.filter(p => p.type === 'employee').length,
    totalBalance: persons.reduce((sum, p) => sum + p.balance, 0)
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">مدیریت اشخاص</h1>
          <p className="text-gray-600 mt-1">مدیریت اطلاعات مشتریان، تامین کنندگان و کارمندان</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          شخص جدید
        </button>
      </div>

      {/* آمار کلی */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">کل اشخاص</h3>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.total}</p>
            </div>
            <Users className="w-8 h-8 text-gray-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">مشتریان</h3>
              <p className="text-2xl font-bold text-blue-600 mt-2">{stats.customers}</p>
            </div>
            <User className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">تامین کنندگان</h3>
              <p className="text-2xl font-bold text-green-600 mt-2">{stats.suppliers}</p>
            </div>
            <Building className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">کارمندان</h3>
              <p className="text-2xl font-bold text-purple-600 mt-2">{stats.employees}</p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">کل موجودی</h3>
              <p className={`text-2xl font-bold mt-2 ${stats.totalBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {(Math.abs(stats.totalBalance) / 1000000).toFixed(1)} میلیون
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {stats.totalBalance >= 0 ? 'طلب' : 'بدهی'}
              </p>
            </div>
            <div className={`w-8 h-8 ${stats.totalBalance >= 0 ? 'bg-green-100' : 'bg-red-100'} rounded-lg flex items-center justify-center`}>
              <span className={`${stats.totalBalance >= 0 ? 'text-green-600' : 'text-red-600'} font-bold text-lg`}>₿</span>
            </div>
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
                placeholder="جستجوی شخص..."
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
              <option value="customer">مشتریان</option>
              <option value="supplier">تامین کنندگان</option>
              <option value="employee">کارمندان</option>
              <option value="other">سایر</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredPersons.map((person) => {
            const TypeIcon = personTypes[person.type].icon;
            return (
              <div key={person.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-12 h-12 ${personTypes[person.type].bgColor} rounded-lg flex items-center justify-center`}>
                            <TypeIcon className={`w-6 h-6 ${personTypes[person.type].color}`} />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{person.name}</h3>
                            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${personTypes[person.type].bgColor} ${personTypes[person.type].color}`}>
                              {personTypes[person.type].label}
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4" />
                              <span>{person.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              <span>{person.email}</span>
                            </div>
                            {person.nationalId && (
                              <div>
                                <span className="font-medium">کد ملی:</span> {person.nationalId}
                              </div>
                            )}
                          </div>
                          
                          <div className="space-y-2">
                            {person.economicCode && (
                              <div>
                                <span className="font-medium">کد اقتصادی:</span> {person.economicCode}
                              </div>
                            )}
                            {person.notes && (
                              <div>
                                <span className="font-medium">یادداشت:</span> {person.notes}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="mt-3 flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{person.address}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-6">
                        {person.balance !== 0 && (
                          <div className="text-left">
                            <p className="text-sm text-gray-500 mb-1">موجودی حساب</p>
                            <p className={`text-xl font-bold ${
                              person.balance >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {person.balance.toLocaleString('fa-IR')} ت
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {person.balance >= 0 ? 'طلب' : 'بدهی'}
                            </p>
                          </div>
                        )}

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
            );
          })}
        </div>

        {filteredPersons.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">هیچ شخصی یافت نشد</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonsModule;