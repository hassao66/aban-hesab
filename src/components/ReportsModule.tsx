import React, { useState } from 'react';
import { Download, Calendar, Filter, TrendingUp, TrendingDown, FileText, BarChart3 } from 'lucide-react';
import Chart from './common/Chart';

const ReportsModule: React.FC = () => {
  const [dateRange, setDateRange] = useState({ from: '1403/06/01', to: '1403/06/30' });
  const [reportType, setReportType] = useState('financial');

  // داده‌های نمونه برای گزارش‌ها
  const financialData = {
    totalRevenue: 450000000,
    totalExpenses: 320000000,
    netProfit: 130000000,
    profitMargin: 28.9
  };

  const monthlyData = [
    { month: 'فروردین', revenue: 45000000, expense: 32000000 },
    { month: 'اردیبهشت', revenue: 52000000, expense: 35000000 },
    { month: 'خرداد', revenue: 48000000, expense: 31000000 },
    { month: 'تیر', revenue: 61000000, expense: 42000000 },
    { month: 'مرداد', revenue: 55000000, expense: 38000000 },
    { month: 'شهریور', revenue: 67000000, expense: 45000000 },
  ];

  const topCustomers = [
    { name: 'شرکت آریان', amount: 75000000, percentage: 16.7 },
    { name: 'شرکت پارس', amount: 62000000, percentage: 13.8 },
    { name: 'شرکت ایده‌آل', amount: 48000000, percentage: 10.7 },
    { name: 'شرکت نوین', amount: 38000000, percentage: 8.4 },
  ];

  const profitLossData = monthlyData.map(item => ({
    month: item.month,
    amount: item.revenue - item.expense
  }));

  const handleExportReport = (format: string) => {
    console.log(`Exporting report in ${format} format`);
    // در اینجا کد صدور گزارش به فرمت‌های مختلف قرار می‌گیرد
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">گزارش‌های مدیریتی</h1>
          <p className="text-gray-600 mt-1">تحلیل داده‌ها و گزارش‌های تفصیلی</p>
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
          <div className="relative">
            <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              <Download className="w-4 h-4" />
              صدور گزارش
            </button>
            <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
              <button
                onClick={() => handleExportReport('pdf')}
                className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                صدور PDF
              </button>
              <button
                onClick={() => handleExportReport('excel')}
                className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                صدور Excel
              </button>
              <button
                onClick={() => handleExportReport('word')}
                className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                صدور Word
              </button>
            </div>
          </div>
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
            onClick={() => setReportType('financial')}
            className={`p-4 rounded-lg border text-center transition-colors ${
              reportType === 'financial'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <BarChart3 className="w-6 h-6 mx-auto mb-2" />
            <span className="font-medium">گزارش مالی</span>
          </button>
          <button
            onClick={() => setReportType('sales')}
            className={`p-4 rounded-lg border text-center transition-colors ${
              reportType === 'sales'
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <TrendingUp className="w-6 h-6 mx-auto mb-2" />
            <span className="font-medium">گزارش فروش</span>
          </button>
          <button
            onClick={() => setReportType('customers')}
            className={`p-4 rounded-lg border text-center transition-colors ${
              reportType === 'customers'
                ? 'border-purple-500 bg-purple-50 text-purple-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <FileText className="w-6 h-6 mx-auto mb-2" />
            <span className="font-medium">گزارش مشتریان</span>
          </button>
          <button
            onClick={() => setReportType('inventory')}
            className={`p-4 rounded-lg border text-center transition-colors ${
              reportType === 'inventory'
                ? 'border-orange-500 bg-orange-50 text-orange-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="w-6 h-6 mx-auto mb-2 bg-gray-400 rounded"></div>
            <span className="font-medium">گزارش انبار</span>
          </button>
        </div>
      </div>

      {/* آمار کلیدی */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">کل درآمد</h3>
              <p className="text-2xl font-bold text-green-600 mt-2">
                {(financialData.totalRevenue / 1000000).toFixed(0)} میلیون
              </p>
              <p className="text-sm text-gray-500 mt-1">تومان</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">کل هزینه‌ها</h3>
              <p className="text-2xl font-bold text-red-600 mt-2">
                {(financialData.totalExpenses / 1000000).toFixed(0)} میلیون
              </p>
              <p className="text-sm text-gray-500 mt-1">تومان</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">سود خالص</h3>
              <p className="text-2xl font-bold text-blue-600 mt-2">
                {(financialData.netProfit / 1000000).toFixed(0)} میلیون
              </p>
              <p className="text-sm text-gray-500 mt-1">تومان</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <span className="text-blue-600 font-bold text-lg">₿</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">حاشیه سود</h3>
              <p className="text-2xl font-bold text-purple-600 mt-2">
                {financialData.profitMargin}%
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <span className="text-purple-600 font-bold text-lg">%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* نمودار سود و زیان */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">نمودار سود و زیان ماهانه</h2>
          <Chart data={profitLossData} />
        </div>

        {/* بهترین مشتریان */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">بهترین مشتریان</h2>
          <div className="space-y-4">
            {topCustomers.map((customer, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{customer.name}</p>
                    <p className="text-sm text-gray-500">{customer.percentage}% از کل فروش</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">
                    {(customer.amount / 1000000).toFixed(1)} میلیون
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* جدول تحلیل ماهانه */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">تحلیل عملکرد ماهانه</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">ماه</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">درآمد</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">هزینه</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">سود خالص</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">حاشیه سود</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">رشد</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {monthlyData.map((data, index) => {
                const profit = data.revenue - data.expense;
                const margin = (profit / data.revenue) * 100;
                const prevProfit = index > 0 ? monthlyData[index - 1].revenue - monthlyData[index - 1].expense : profit;
                const growth = index > 0 ? ((profit - prevProfit) / prevProfit) * 100 : 0;
                
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-900">{data.month}</td>
                    <td className="py-4 px-4 text-green-600 font-semibold">
                      {(data.revenue / 1000000).toFixed(1)} میلیون
                    </td>
                    <td className="py-4 px-4 text-red-600 font-semibold">
                      {(data.expense / 1000000).toFixed(1)} میلیون
                    </td>
                    <td className="py-4 px-4 text-blue-600 font-semibold">
                      {(profit / 1000000).toFixed(1)} میلیون
                    </td>
                    <td className="py-4 px-4 font-semibold">
                      {margin.toFixed(1)}%
                    </td>
                    <td className="py-4 px-4">
                      <span className={`font-semibold ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsModule;