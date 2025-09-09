import React, { useState } from 'react';
import { BarChart3, TrendingUp, Calendar, Download, Filter, DollarSign, Users, Package } from 'lucide-react';
import Chart from './common/Chart';

const SalesReportsModule: React.FC = () => {
  const [dateRange, setDateRange] = useState({ from: '1403/06/01', to: '1403/06/30' });
  const [reportType, setReportType] = useState('summary');

  const salesData = [
    { month: 'فروردین', amount: 45000000 },
    { month: 'اردیبهشت', amount: 52000000 },
    { month: 'خرداد', amount: 48000000 },
    { month: 'تیر', amount: 61000000 },
    { month: 'مرداد', amount: 55000000 },
    { month: 'شهریور', amount: 67000000 },
  ];

  const topProducts = [
    { name: 'لپ‌تاپ ASUS', sales: 25, revenue: 625000000 },
    { name: 'چاپگر HP', sales: 18, revenue: 153000000 },
    { name: 'کیبورد', sales: 45, revenue: 67500000 },
    { name: 'ماوس', sales: 32, revenue: 48000000 },
  ];

  const topCustomers = [
    { name: 'شرکت آریان', orders: 12, revenue: 180000000 },
    { name: 'شرکت پارس', orders: 8, revenue: 120000000 },
    { name: 'شرکت ایده‌آل', orders: 6, revenue: 90000000 },
    { name: 'شرکت نوین', orders: 5, revenue: 75000000 },
  ];

  const salesStats = {
    totalRevenue: 328000000,
    totalOrders: 156,
    averageOrderValue: 2102564,
    growthRate: 15.3
  };

  const handleExportReport = (format: string) => {
    console.log(`Exporting sales report in ${format} format`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">گزارش امور فروش</h1>
          <p className="text-gray-600 mt-1">تحلیل و گزارش‌های تفصیلی فروش</p>
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
            <BarChart3 className="w-6 h-6 mx-auto mb-2" />
            <span className="font-medium">خلاصه فروش</span>
          </button>
          <button
            onClick={() => setReportType('products')}
            className={`p-4 rounded-lg border text-center transition-colors ${
              reportType === 'products'
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Package className="w-6 h-6 mx-auto mb-2" />
            <span className="font-medium">فروش محصولات</span>
          </button>
          <button
            onClick={() => setReportType('customers')}
            className={`p-4 rounded-lg border text-center transition-colors ${
              reportType === 'customers'
                ? 'border-purple-500 bg-purple-50 text-purple-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Users className="w-6 h-6 mx-auto mb-2" />
            <span className="font-medium">فروش مشتریان</span>
          </button>
          <button
            onClick={() => setReportType('trends')}
            className={`p-4 rounded-lg border text-center transition-colors ${
              reportType === 'trends'
                ? 'border-orange-500 bg-orange-50 text-orange-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <TrendingUp className="w-6 h-6 mx-auto mb-2" />
            <span className="font-medium">روند فروش</span>
          </button>
        </div>
      </div>

      {/* آمار کلیدی فروش */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">کل فروش</h3>
              <p className="text-2xl font-bold text-green-600 mt-2">
                {(salesStats.totalRevenue / 1000000).toFixed(0)} میلیون
              </p>
              <p className="text-sm text-gray-500 mt-1">تومان</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">تعداد سفارشات</h3>
              <p className="text-2xl font-bold text-blue-600 mt-2">{salesStats.totalOrders}</p>
              <p className="text-sm text-gray-500 mt-1">سفارش</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">میانگین سفارش</h3>
              <p className="text-2xl font-bold text-purple-600 mt-2">
                {(salesStats.averageOrderValue / 1000).toFixed(0)}K
              </p>
              <p className="text-sm text-gray-500 mt-1">تومان</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">رشد فروش</h3>
              <p className="text-2xl font-bold text-orange-600 mt-2">
                +{salesStats.growthRate}%
              </p>
              <p className="text-sm text-gray-500 mt-1">نسبت به ماه قبل</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* نمودار فروش ماهانه */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">نمودار فروش ماهانه</h2>
          <Chart data={salesData} />
        </div>

        {/* پرفروش‌ترین محصولات */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">پرفروش‌ترین محصولات</h2>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.sales} فروش</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">
                    {(product.revenue / 1000000).toFixed(1)} میلیون
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* جدول بهترین مشتریان */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">بهترین مشتریان</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">رتبه</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">نام مشتری</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">تعداد سفارش</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">کل خرید</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">میانگین سفارش</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topCustomers.map((customer, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                  </td>
                  <td className="py-4 px-4 font-medium text-gray-900">{customer.name}</td>
                  <td className="py-4 px-4 text-gray-600">{customer.orders} سفارش</td>
                  <td className="py-4 px-4 font-semibold text-green-600">
                    {(customer.revenue / 1000000).toFixed(1)} میلیون ت
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    {(customer.revenue / customer.orders / 1000).toFixed(0)}K ت
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

export default SalesReportsModule;