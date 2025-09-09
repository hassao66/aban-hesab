import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Monitor, AlertTriangle, CheckCircle, Wrench } from 'lucide-react';
import { Asset } from '../types/common';

const AssetsModule: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([
    {
      id: '1',
      name: 'سرور اصلی',
      code: 'SRV-001',
      category: 'تجهیزات IT',
      purchaseDate: new Date('2023-01-15'),
      purchasePrice: 45000000,
      currentValue: 36000000,
      depreciationRate: 20,
      location: 'اتاق سرور',
      status: 'active',
      description: 'سرور Dell PowerEdge',
      createdAt: new Date()
    },
    {
      id: '2',
      name: 'خودروی پژو 206',
      code: 'CAR-001',
      category: 'وسایل نقلیه',
      purchaseDate: new Date('2022-06-10'),
      purchasePrice: 180000000,
      currentValue: 144000000,
      depreciationRate: 20,
      location: 'پارکینگ شرکت',
      status: 'active',
      description: 'خودروی اداری شرکت',
      createdAt: new Date()
    },
    {
      id: '3',
      name: 'دستگاه کپی کانن',
      code: 'CPY-001',
      category: 'تجهیزات اداری',
      purchaseDate: new Date('2023-03-20'),
      purchasePrice: 15000000,
      currentValue: 10500000,
      depreciationRate: 30,
      location: 'طبقه دوم',
      status: 'maintenance',
      description: 'دستگاه کپی رنگی',
      createdAt: new Date()
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const categories = [...new Set(assets.map(a => a.category))];

  const statusConfig = {
    active: { label: 'فعال', color: 'bg-green-100 text-green-800', dot: 'bg-green-500', icon: CheckCircle },
    maintenance: { label: 'تعمیر', color: 'bg-orange-100 text-orange-800', dot: 'bg-orange-500', icon: Wrench },
    disposed: { label: 'اسقاط', color: 'bg-red-100 text-red-800', dot: 'bg-red-500', icon: AlertTriangle }
  };

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || asset.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || asset.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalPurchaseValue = assets.reduce((sum, asset) => sum + asset.purchasePrice, 0);
  const totalCurrentValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);
  const totalDepreciation = totalPurchaseValue - totalCurrentValue;
  const activeAssets = assets.filter(a => a.status === 'active').length;

  const calculateAge = (purchaseDate: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - purchaseDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    return `${years} سال و ${months} ماه`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">مدیریت اموال و دارایی</h1>
          <p className="text-gray-600 mt-1">مدیریت دارایی‌های ثابت و استهلاک</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          دارایی جدید
        </button>
      </div>

      {/* آمار دارایی‌ها */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">ارزش خرید</h3>
              <p className="text-2xl font-bold text-blue-600 mt-2">
                {(totalPurchaseValue / 1000000).toFixed(1)} میلیون
              </p>
            </div>
            <Monitor className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">ارزش فعلی</h3>
              <p className="text-2xl font-bold text-green-600 mt-2">
                {(totalCurrentValue / 1000000).toFixed(1)} میلیون
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">استهلاک</h3>
              <p className="text-2xl font-bold text-red-600 mt-2">
                {(totalDepreciation / 1000000).toFixed(1)} میلیون
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">دارایی فعال</h3>
              <p className="text-2xl font-bold text-purple-600 mt-2">{activeAssets}</p>
              <p className="text-sm text-gray-500 mt-1">از {assets.length} دارایی</p>
            </div>
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 font-bold text-lg">#</span>
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
                placeholder="جستجوی دارایی..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">همه دسته‌ها</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">همه وضعیت‌ها</option>
                <option value="active">فعال</option>
                <option value="maintenance">تعمیر</option>
                <option value="disposed">اسقاط</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">کد دارایی</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">نام دارایی</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">دسته‌بندی</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">ارزش خرید</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">ارزش فعلی</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">سن دارایی</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">محل قرارگیری</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">وضعیت</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAssets.map((asset) => {
                const StatusIcon = statusConfig[asset.status].icon;
                return (
                  <tr key={asset.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                        {asset.code}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <span className="font-semibold text-gray-900">{asset.name}</span>
                        <p className="text-sm text-gray-600">{asset.description}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600">{asset.category}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-gray-900">
                        {asset.purchasePrice.toLocaleString('fa-IR')} ت
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-green-600">
                        {asset.currentValue.toLocaleString('fa-IR')} ت
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600">
                        {calculateAge(asset.purchaseDate)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600">{asset.location}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                        statusConfig[asset.status].color
                      }`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusConfig[asset.status].label}
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

        {filteredAssets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">هیچ داراییی یافت نشد</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetsModule;