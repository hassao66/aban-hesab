import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, AlertTriangle, Package } from 'lucide-react';
import { Product } from '../types/common';

const InventoryModule: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'لپ‌تاپ ASUS',
      code: 'ASUS-001',
      category: 'کامپیوتر',
      unitPrice: 25000000,
      stock: 15,
      minStock: 5,
      unit: 'دستگاه',
      description: 'لپ‌تاپ ASUS مدل X515',
      createdAt: new Date()
    },
    {
      id: '2',
      name: 'چاپگر HP',
      code: 'HP-002',
      category: 'تجهیزات اداری',
      unitPrice: 8500000,
      stock: 3,
      minStock: 10,
      unit: 'دستگاه',
      description: 'چاپگر لیزری HP LaserJet',
      createdAt: new Date()
    },
    {
      id: '3',
      name: 'کاغذ A4',
      code: 'PPR-003',
      category: 'لوازم اداری',
      unitPrice: 150000,
      stock: 50,
      minStock: 20,
      unit: 'بسته',
      description: 'کاغذ A4 سفید 80 گرمی',
      createdAt: new Date()
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = [...new Set(products.map(p => p.category))];
  const lowStockProducts = products.filter(p => p.stock <= p.minStock);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalValue = products.reduce((sum, product) => sum + (product.unitPrice * product.stock), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">مدیریت انبار</h1>
          <p className="text-gray-600 mt-1">مدیریت موجودی کالاها و محصولات</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          کالای جدید
        </button>
      </div>

      {/* آمار کلی */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">تعداد کل کالاها</h3>
              <p className="text-2xl font-bold text-gray-900 mt-2">{products.length}</p>
            </div>
            <Package className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">ارزش کل انبار</h3>
              <p className="text-2xl font-bold text-green-600 mt-2">
                {(totalValue / 1000000).toFixed(1)} میلیون
              </p>
              <p className="text-sm text-gray-500 mt-1">تومان</p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 font-bold text-lg">₿</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">دسته‌بندی‌ها</h3>
              <p className="text-2xl font-bold text-purple-600 mt-2">{categories.length}</p>
            </div>
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <div className="grid grid-cols-2 gap-1 w-4 h-4">
                <div className="bg-purple-600 rounded-sm"></div>
                <div className="bg-purple-400 rounded-sm"></div>
                <div className="bg-purple-400 rounded-sm"></div>
                <div className="bg-purple-600 rounded-sm"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">کالاهای کم موجود</h3>
              <p className="text-2xl font-bold text-red-600 mt-2">{lowStockProducts.length}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* هشدار کالاهای کم موجود */}
      {lowStockProducts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h3 className="text-lg font-semibold text-red-800">هشدار: کالاهای کم موجود</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lowStockProducts.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded-lg border border-red-200">
                <h4 className="font-semibold text-gray-900">{product.name}</h4>
                <p className="text-sm text-gray-600">کد: {product.code}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-red-600">
                    موجودی: {product.stock} {product.unit}
                  </span>
                  <span className="text-xs text-gray-500">
                    حداقل: {product.minStock}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="جستجوی کالا..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">همه دسته‌بندی‌ها</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">کد کالا</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">نام کالا</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">دسته‌بندی</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">قیمت واحد</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">موجودی</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">ارزش کل</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">وضعیت</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                      {product.code}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <span className="font-semibold text-gray-900">{product.name}</span>
                      <p className="text-sm text-gray-600">{product.description}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-600">{product.category}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-gray-900">
                      {product.unitPrice.toLocaleString('fa-IR')} ت
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-gray-900">
                      {product.stock} {product.unit}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-green-600">
                      {(product.unitPrice * product.stock).toLocaleString('fa-IR')} ت
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {product.stock <= product.minStock ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                        کم موجود
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        موجود
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

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">هیچ کالایی یافت نشد</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryModule;