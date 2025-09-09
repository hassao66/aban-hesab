import React, { useState } from 'react';
import { ShoppingCart, TrendingDown, Calendar, Download, Filter, DollarSign, Users, Package } from 'lucide-react';
import Chart from './common/Chart';

const PurchaseReportsModule: React.FC = () => {
  const [dateRange, setDateRange] = useState({ from: '1403/06/01', to: '1403/06/30' });
  const [reportType, setReportType] = useState('summary');

  const purchaseData = [
    { month: 'فروردین', amount: 32000000 },
    { month: 'اردیبهشت', amount: 38000000 },
    { month: 'خرداد', amount: 35000000 },
    { month: 'تیر', amount: 42000000 },
    { month: 'مرداد', amount: 39000000 },
    { month: 'شهریور', amount: 45000000 },
  ];

  const topSuppliers = [
    { name: 'تامین کننده الف', orders: 15, amount: 120000000 },
    { name: 'تامین کننده ب', orders: 12, amount: 95000000 },
    { name: 'تامین کننده ج', orders: 8, amount: 68000000 },
    { name: 'تامین کننده د', orders: 6, amount: 48000000 },
  ];

  const topPurchasedItems = [
    { name: 'مواد اولیه A', quantity: 150, amount: 75000000 },
    { name: 'قطعات B', quantity: 120, amount: 60000000 },
    { name: 'لوازم C', quantity: 200, amount: 40000000 },
    { name: 'تجهیزات D', quantity: 80, amount: 32000000 },
  ];

  const purchaseStats = {
    totalPurchase: 231000000,
    totalOrders: 89,
    averageOrderValue: 2595506,
    savingsRate: 8.5
  };

  const handleExportReport = (format: string) => {
    console.log(`Exporting purchase report in ${format} format`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">گزارش خرید</h1>
          <p className="text-gray-600 mt-1">تحلیل و گزارش‌های تفصیلی خرید</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={dateRange.from}
              onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
              className="w-24 px-2 py-1 text-sm border border-gray-300 rounded"
              placeholder="از تاریخ"
            />
            <span className="text-gray-500">تا</span>
            <input
              type="text"
              value={dateRange.to}
              onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
              className="w-24 px-2 py-1 text-sm border border-gray-300 rounded"
              placeholder="تا تاریخ"
            />
          </div>
          <button
            onClick={() => handleExportReport('excel')}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            صدور گزارش
          </button>
        </div>
      </div>

      {/* انتخاب نوع گزارش */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-900">انتخاب نوع گزارش</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            onClick={() => setReportType('summary')}
            className={`p-4 rounded-lg border text-center transition-colors ${
              reportType === 'summary'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <ShoppingCart className="w-6 h-6 mx-auto mb-2" />
            <span className="font-medium">خلاصه خرید</span>
          </button>
          <button
            onClick={() => setReportType('suppliers')}
            className={`p-4 rounded-lg border text-center transition-colors ${
              reportType === 'suppliers'
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Users className="w-6 h-6 mx-auto mb-2" />
            <span className="font-medium">تامین کنندگان</span>
          </button>
          <button
            onClick={() => setReportType('items')}
            className={`p-4 rounded-lg border text-center transition-colors ${
              reportType === 'items'
                ? 'border-purple-500 bg-purple-50 text-purple-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Package className="w-6 h-6 mx-auto mb-2" />
            <span className="font-medium">اقلام خریداری</span>
          </button>
          <button
            onClick={() => setReportType('trends')}
            className={`p-4 rounded-lg border text-center transition-colors ${
              reportType === 'trends'
                ? 'border-orange-500 bg-orange-50 text-orange-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <TrendingDown className="w-6 h-6 mx-auto mb-2" />
            <span className="font-medium">روند خرید</span>
          </button>
        </div>
      </div>

      {/* آمار کلیدی خرید */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">کل خرید</h3>
              <p className="text-2xl font-bold text-red-600 mt-2">
                {(purchaseStats.totalPurchase / 1000000).toFixed(0)} میلیون
              </p>
              <p className="text-sm text-gray-500 mt-1">تومان</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">تعداد سفارشات</h3>
              <p className="text-2xl font-bold text-blue-600 mt-2">{purchaseStats.totalOrders}</p>
              <p className="text-sm text-gray-500 mt-1">سفارش</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">میانگین سفارش</h3>
              <p className="text-2xl font-bold text-purple-600 mt-2">
                {(purchaseStats.averageOrderValue / 1000).toFixed(0)}K
              </p>
              <p className="text-sm text-gray-500 mt-1">تومان</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingDown className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">صرفه‌جویی</h3>
              <p className="text-2xl font-bold text-green-600 mt-2">
                {purchaseStats.savingsRate}%
              </p>
              <p className="text-sm text-gray-500 mt-1">نسبت به قیمت بازار</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingDown className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* نمودار خرید ماهانه */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">نمودار خرید ماهانه</h2>
          <Chart data={purchaseData} />
        </div>

        {/* بهترین تامین کنندگان */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">بهترین تامین کنندگان</h2>
          <div className="space-y-4">
            {topSuppliers.map((supplier, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{supplier.name}</p>
                    <p className="text-sm text-gray-500">{supplier.orders} سفارش</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">
                    {(supplier.amount / 1000000).toFixed(1)} میلیون
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* جدول پرخرید‌ترین اقلام */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">پرخرید‌ترین اقلام</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">رتبه</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">نام قلم</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">تعداد</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">کل مبلغ</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">قیمت واحد</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topPurchasedItems.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                  </td>
                  <td className="py-4 px-4 font-medium text-gray-900">{item.name}</td>
                  <td className="py-4 px-4 text-gray-600">{item.quantity} عدد</td>
                  <td className="py-4 px-4 font-semibold text-red-600">
                    {(item.amount / 1000000).toFixed(1)} میلیون ت
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    {(item.amount / item.quantity / 1000).toFixed(0)}K ت
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PurchaseReportsModule;