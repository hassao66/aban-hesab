import React, { useState } from 'react';
import { Plus, Search, Eye, Edit, Trash2, Download, Filter, ShoppingCart } from 'lucide-react';

interface PurchaseInvoice {
  id: string;
  number: string;
  supplierId: string;
  supplierName: string;
  date: Date;
  dueDate: Date;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: 'draft' | 'sent' | 'received' | 'paid';
  notes: string;
}

const PurchaseInvoicesModule: React.FC = () => {
  const [invoices, setInvoices] = useState<PurchaseInvoice[]>([
    {
      id: '1',
      number: 'PUR-2024-001',
      supplierId: '1',
      supplierName: 'تامین کننده الف',
      date: new Date('2024-01-15'),
      dueDate: new Date('2024-02-15'),
      subtotal: 12000000,
      tax: 1080000,
      discount: 200000,
      total: 12880000,
      status: 'received',
      notes: 'خرید مواد اولیه'
    },
    {
      id: '2',
      number: 'PUR-2024-002',
      supplierId: '2',
      supplierName: 'تامین کننده ب',
      date: new Date('2024-01-20'),
      dueDate: new Date('2024-02-20'),
      subtotal: 8500000,
      tax: 765000,
      discount: 0,
      total: 9265000,
      status: 'sent',
      notes: 'خرید تجهیزات'
    },
    {
      id: '3',
      number: 'PUR-2024-003',
      supplierId: '3',
      supplierName: 'تامین کننده ج',
      date: new Date('2024-01-10'),
      dueDate: new Date('2024-02-10'),
      subtotal: 15000000,
      tax: 1350000,
      discount: 500000,
      total: 15850000,
      status: 'paid',
      notes: 'خرید ماشین آلات'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const statusConfig = {
    draft: { label: 'پیش‌نویس', color: 'bg-gray-100 text-gray-800', dot: 'bg-gray-500' },
    sent: { label: 'ارسال شده', color: 'bg-blue-100 text-blue-800', dot: 'bg-blue-500' },
    received: { label: 'دریافت شده', color: 'bg-orange-100 text-orange-800', dot: 'bg-orange-500' },
    paid: { label: 'پرداخت شده', color: 'bg-green-100 text-green-800', dot: 'bg-green-500' }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.supplierName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalStats = {
    total: invoices.reduce((sum, inv) => sum + inv.total, 0),
    paid: invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.total, 0),
    pending: invoices.filter(inv => inv.status !== 'paid').reduce((sum, inv) => sum + inv.total, 0)
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">فاکتور خرید</h1>
          <p className="text-gray-600 mt-1">مدیریت فاکتورهای خرید از تامین کنندگان</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          فاکتور خرید جدید
        </button>
      </div>

      {/* آمار کلی */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">کل فاکتورهای خرید</h3>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {totalStats.total.toLocaleString('fa-IR')} تومان
              </p>
              <p className="text-sm text-gray-500 mt-1">{invoices.length} فاکتور</p>
            </div>
            <ShoppingCart className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-600">پرداخت شده</h3>
          <p className="text-2xl font-bold text-green-600 mt-2">
            {totalStats.paid.toLocaleString('fa-IR')} تومان
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-600">در انتظار پرداخت</h3>
          <p className="text-2xl font-bold text-orange-600 mt-2">
            {totalStats.pending.toLocaleString('fa-IR')} تومان
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="جستجوی فاکتور خرید..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">همه وضعیت‌ها</option>
                <option value="draft">پیش‌نویس</option>
                <option value="sent">ارسال شده</option>
                <option value="received">دریافت شده</option>
                <option value="paid">پرداخت شده</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">شماره فاکتور</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">تامین کننده</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">تاریخ صدور</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">سررسید</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">مبلغ کل</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">وضعیت</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <span className="font-mono text-sm">{invoice.number}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium text-gray-900">{invoice.supplierName}</span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {invoice.date.toLocaleDateString('fa-IR')}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {invoice.dueDate.toLocaleDateString('fa-IR')}
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-gray-900">
                      {invoice.total.toLocaleString('fa-IR')} ت
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                      statusConfig[invoice.status].color
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${statusConfig[invoice.status].dot}`}></div>
                      {statusConfig[invoice.status].label}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
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

        {filteredInvoices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">هیچ فاکتور خریدی یافت نشد</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseInvoicesModule;