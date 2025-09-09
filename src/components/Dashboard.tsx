import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  FileText, 
  Package,
  DollarSign,
  Calendar,
  AlertCircle
} from 'lucide-react';
import StatCard from './common/StatCard';
import Chart from './common/Chart';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'کل درآمد امروز',
      value: '۲۵,۰۰۰,۰۰۰',
      unit: 'تومان',
      change: '+۱۲%',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'فاکتورهای معلق',
      value: '۱۸',
      unit: 'فاکتور',
      change: '-۵%',
      changeType: 'negative' as const,
      icon: FileText,
      color: 'orange'
    },
    {
      title: 'تعداد مشتریان',
      value: '۱,۲۳۴',
      unit: 'مشتری',
      change: '+۸%',
      changeType: 'positive' as const,
      icon: Users,
      color: 'blue'
    },
    {
      title: 'موجودی انبار',
      value: '۵,۶۷۸',
      unit: 'قلم',
      change: '+۳%',
      changeType: 'positive' as const,
      icon: Package,
      color: 'purple'
    },
  ];

  const salesData = [
    { month: 'فروردین', amount: 45000000 },
    { month: 'اردیبهشت', amount: 52000000 },
    { month: 'خرداد', amount: 48000000 },
    { month: 'تیر', amount: 61000000 },
    { month: 'مرداد', amount: 55000000 },
    { month: 'شهریور', amount: 67000000 },
  ];

  const recentTransactions = [
    { id: 1, type: 'income', description: 'فروش به شرکت آریان', amount: 15000000, date: '۱۴۰۳/۰۶/۱۵' },
    { id: 2, type: 'expense', description: 'خرید مواد اولیه', amount: -8000000, date: '۱۴۰۳/۰۶/۱۴' },
    { id: 3, type: 'income', description: 'دریافتی از مشتری قدیمی', amount: 5000000, date: '۱۴۰۳/۰۶/۱۳' },
    { id: 4, type: 'expense', description: 'پرداخت حقوق کارمندان', amount: -25000000, date: '۱۴۰۳/۰۶/۱۲' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">داشبورد</h1>
          <p className="text-gray-600 mt-1">نمای کلی وضعیت مالی شرکت</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>آخرین بروزرسانی: ۱۴۰۳/۰۶/۱۵ - ۱۴:۳۰</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">نمودار فروش ماهانه</h2>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600">رشد ۱۵% نسبت به ماه قبل</span>
              </div>
            </div>
            <Chart data={salesData} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">تراکنش‌های اخیر</h2>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{transaction.date}</p>
                  </div>
                  <div className={`text-sm font-semibold ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount.toLocaleString('fa-IR')} ت
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-semibold text-gray-900">هشدارهای سیستم</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-amber-800">موجودی پایین انبار</p>
                  <p className="text-xs text-amber-600 mt-1">۵ کالا کمتر از حد مجاز موجودی دارند</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-red-800">فاکتورهای سررسید</p>
                  <p className="text-xs text-red-600 mt-1">۳ فاکتور سررسید شده نیاز به پیگیری دارند</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;