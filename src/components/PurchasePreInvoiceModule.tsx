import React, { useState } from 'react';
import { Plus, Search, Eye, Edit, Trash2, FileCheck, ShoppingCart } from 'lucide-react';

interface PurchasePreInvoice {
  id: string;
  number: string;
  supplierId: string;
  supplierName: string;
  date: Date;
  validUntil: Date;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: 'draft' | 'sent' | 'approved' | 'converted' | 'expired';
  notes: string;
}

const PurchasePreInvoiceModule: React.FC = () => {
  const [preInvoices, setPreInvoices] = useState<PurchasePreInvoice[]>([
    {
      id: '1',
      number: 'PPRE-2024-001',
      supplierId: '1',
      supplierName: 'تامین کننده الف',
      date: new Date('2024-01-15'),
      validUntil: new Date('2024-02-15'),
      subtotal: 12000000,
      tax: 1080000,
      discount: 200000,
      total: 12880000,
      status: 'sent',
      notes: 'پیش فاکتور خرید مواد اولیه'
    },
    {
      id: '2',
      number: 'PPRE-2024-002',
      supplierId: '2',
      supplierName: 'تامین کننده ب',
      date: new Date('2024-01-20'),
      validUntil: new Date('2024-02-20'),
      subtotal: 8500000,
      tax: 765000,
      discount: 0,
      total: 9265000,
      status: 'approved',
      notes: 'پیش فاکتور خرید تجهیزات'
    },
    {
      id: '3',
      number: 'PPRE-2024-003',
      supplierId: '3',
      supplierName: 'تامین کننده ج',
      date: new Date('2024-01-10'),
      validUntil: new Date('2024-01-25'),
      subtotal: 15000000,
      tax: 1350000,
      discount: 500000,
      total: 15850000,
      status: 'expired',
      notes: 'پیش فاکتور منقضی شده'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const statusConfig = {
    draft: { label: 'پیش‌نویس', color: 'bg-gray-100 text-gray-800', dot: 'bg-gray-500' },
    sent: { label: 'ارسال شده', color: 'bg-blue-100 text-blue-800', dot: 'bg-blue-500' },
    approved: { label: 'تایید شده', color: 'bg-green-100 text-green-800', dot: 'bg-green-500' },
    converted: { label: 'تبدیل شده', color: 'bg-purple-100 text-purple-800', dot: 'bg-purple-500' },
    expired: { label: 'منقضی شده', color: 'bg-red-100 text-red-800', dot: 'bg-red-500' }
  };

  const filteredPreInvoices = preInvoices.filter(preInvoice => {
    const matchesSearch = preInvoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         preInvoice.supplierName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || preInvoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalStats = {
    total: preInvoices.reduce((sum, inv) => sum + inv.total, 0),
    approved: preInvoices.filter(inv => inv.status === 'approved').reduce((sum, inv) => sum + inv.total, 0),
    pending: preInvoices.filter(inv => inv.status === 'sent').reduce((sum, inv) => sum + inv.total, 0)
  };

  const handleConvertToPurchaseInvoice = (preInvoiceId: string) => {
    setPreInvoices(preInvoices.map(inv => 
      inv.id === preInvoiceId 
        ? { ...inv, status: 'converted' as const }
        : inv
    ));
    alert('پیش فاکتور خرید با موفقیت به فاکتور خرید تبدیل شد');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">فاکتور خرید</h1>
          <p className="text-gray-600 mt-1">مدیریت پیش فاکتورهای خرید از تامین کنندگان</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          پیش فاکتور خرید جدید
        </button>
      </div>

      {/* آمار کلی */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">کل پیش فاکتورهای خرید</h3>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {totalStats.total.toLocaleString('fa-IR')} تومان
              </p>
              <p className="text-sm text-gray-500 mt-1">{preInvoices.length} پیش فاکتور</p>
            </div>
            <ShoppingCart className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-600">تایید شده</h3>
          <p className="text-2xl font-bold text-green-600 mt-2">
            {totalStats.approved.toLocaleString('fa-IR')} تومان
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-600">در انتظار تایید</h3>
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
                placeholder="جستجوی پیش فاکتور خرید..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">همه وضعیت‌ها</option>
              <option value="draft">پیش‌نویس</option>
              <option value="sent">ارسال شده</option>
              <option value="approved">تایید شده</option>
              <option value="converted">تبدیل شده</option>
              <option value="expired">منقضی شده</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">شماره پیش فاکتور</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">تامین کننده</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">تاریخ صدور</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">اعتبار تا</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">مبلغ کل</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">وضعیت</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPreInvoices.map((preInvoice) => (
                <tr key={preInvoice.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <span className="font-mono text-sm">{preInvoice.number}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium text-gray-900">{preInvoice.supplierName}</span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {preInvoice.date.toLocaleDateString('fa-IR')}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {preInvoice.validUntil.toLocaleDateString('fa-IR')}
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-gray-900">
                      {preInvoice.total.toLocaleString('fa-IR')} ت
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                      statusConfig[preInvoice.status].color
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${statusConfig[preInvoice.status].dot}`}></div>
                      {statusConfig[preInvoice.status].label}
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
                      {preInvoice.status === 'approved' && (
                        <button
                          onClick={() => handleConvertToPurchaseInvoice(preInvoice.id)}
                          className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          title="تبدیل به فاکتور خرید"
                        >
                          <FileCheck className="w-4 h-4" />
                        </button>
                      )}
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

        {filteredPreInvoices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">هیچ پیش فاکتور خریدی یافت نشد</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchasePreInvoiceModule;