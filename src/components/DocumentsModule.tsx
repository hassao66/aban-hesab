import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, FileCheck, Eye, CheckCircle } from 'lucide-react';
import { Document } from '../types/common';

const DocumentsModule: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      number: 'JV-001',
      type: 'journal',
      date: new Date('2024-01-15'),
      description: 'ثبت فروش کالا',
      entries: [
        { id: '1', accountId: '1', accountName: 'حساب‌های دریافتنی', debit: 15000000, credit: 0, description: 'فروش به مشتری' },
        { id: '2', accountId: '2', accountName: 'فروش', debit: 0, credit: 15000000, description: 'درآمد فروش' }
      ],
      totalDebit: 15000000,
      totalCredit: 15000000,
      status: 'posted',
      createdAt: new Date()
    },
    {
      id: '2',
      number: 'RV-001',
      type: 'receipt',
      date: new Date('2024-01-16'),
      description: 'دریافت وجه از مشتری',
      entries: [
        { id: '3', accountId: '3', accountName: 'صندوق', debit: 12000000, credit: 0, description: 'دریافت نقدی' },
        { id: '4', accountId: '1', accountName: 'حساب‌های دریافتنی', debit: 0, credit: 12000000, description: 'کاهش طلب' }
      ],
      totalDebit: 12000000,
      totalCredit: 12000000,
      status: 'posted',
      createdAt: new Date()
    },
    {
      id: '3',
      number: 'PV-001',
      type: 'payment',
      date: new Date('2024-01-17'),
      description: 'پرداخت به تامین کننده',
      entries: [
        { id: '5', accountId: '4', accountName: 'حساب‌های پرداختنی', debit: 8000000, credit: 0, description: 'کاهش بدهی' },
        { id: '6', accountId: '5', accountName: 'بانک ملی', debit: 0, credit: 8000000, description: 'پرداخت از بانک' }
      ],
      totalDebit: 8000000,
      totalCredit: 8000000,
      status: 'draft',
      createdAt: new Date()
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const documentTypes = {
    journal: { label: 'سند عمومی', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    receipt: { label: 'سند دریافت', color: 'text-green-600', bgColor: 'bg-green-50' },
    payment: { label: 'سند پرداخت', color: 'text-red-600', bgColor: 'bg-red-50' },
    transfer: { label: 'سند انتقال', color: 'text-purple-600', bgColor: 'bg-purple-50' }
  };

  const statusConfig = {
    draft: { label: 'پیش‌نویس', color: 'bg-gray-100 text-gray-800', dot: 'bg-gray-500' },
    posted: { label: 'ثبت شده', color: 'bg-green-100 text-green-800', dot: 'bg-green-500' },
    cancelled: { label: 'لغو شده', color: 'bg-red-100 text-red-800', dot: 'bg-red-500' }
  };

  const filteredDocuments = documents.filter(document => {
    const matchesSearch = document.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         document.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || document.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || document.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalDocuments = documents.length;
  const postedDocuments = documents.filter(d => d.status === 'posted').length;
  const draftDocuments = documents.filter(d => d.status === 'draft').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">مدیریت اسناد حسابداری</h1>
          <p className="text-gray-600 mt-1">ثبت و مدیریت اسناد حسابداری</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            سند جدید
          </button>
        </div>
      </div>

      {/* آمار اسناد */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">کل اسناد</h3>
              <p className="text-2xl font-bold text-gray-900 mt-2">{totalDocuments}</p>
            </div>
            <FileCheck className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">ثبت شده</h3>
              <p className="text-2xl font-bold text-green-600 mt-2">{postedDocuments}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">پیش‌نویس</h3>
              <p className="text-2xl font-bold text-orange-600 mt-2">{draftDocuments}</p>
            </div>
            <Edit className="w-8 h-8 text-orange-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">درصد ثبت</h3>
              <p className="text-2xl font-bold text-purple-600 mt-2">
                {totalDocuments > 0 ? Math.round((postedDocuments / totalDocuments) * 100) : 0}%
              </p>
            </div>
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 font-bold text-lg">%</span>
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
                placeholder="جستجوی سند..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">همه انواع</option>
                <option value="journal">سند عمومی</option>
                <option value="receipt">سند دریافت</option>
                <option value="payment">سند پرداخت</option>
                <option value="transfer">سند انتقال</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">همه وضعیت‌ها</option>
                <option value="draft">پیش‌نویس</option>
                <option value="posted">ثبت شده</option>
                <option value="cancelled">لغو شده</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">شماره سند</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">نوع</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">تاریخ</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">شرح</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">مبلغ</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">وضعیت</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDocuments.map((document) => (
                <tr key={document.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <span className="font-mono text-sm">{document.number}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${documentTypes[document.type].bgColor} ${documentTypes[document.type].color}`}>
                      {documentTypes[document.type].label}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {document.date.toLocaleDateString('fa-IR')}
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-900">{document.description}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-gray-900">
                      {document.totalDebit.toLocaleString('fa-IR')} ت
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                      statusConfig[document.status].color
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${statusConfig[document.status].dot}`}></div>
                      {statusConfig[document.status].label}
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

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">هیچ سندی یافت نشد</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentsModule;