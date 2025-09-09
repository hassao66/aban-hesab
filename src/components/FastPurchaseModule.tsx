import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, FileText, Calculator } from 'lucide-react';

interface InvoiceItem {
  id: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

const FastPurchaseModule: React.FC = () => {
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [discount, setDiscount] = useState(0);

  const [newItem, setNewItem] = useState({
    productName: '',
    quantity: 1,
    unitPrice: 0
  });

  const addItem = () => {
    if (!newItem.productName || newItem.unitPrice <= 0) {
      alert('لطفاً نام محصول و قیمت را وارد کنید');
      return;
    }

    const item: InvoiceItem = {
      id: Date.now().toString(),
      productName: newItem.productName,
      quantity: newItem.quantity,
      unitPrice: newItem.unitPrice,
      total: newItem.quantity * newItem.unitPrice
    };

    setItems([...items, item]);
    setNewItem({ productName: '', quantity: 1, unitPrice: 0 });
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'unitPrice') {
          updatedItem.total = updatedItem.quantity * updatedItem.unitPrice;
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.09; // 9% مالیات
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal + tax - discountAmount;

  const handleSaveInvoice = () => {
    if (!customerName || items.length === 0) {
      alert('لطفاً نام مشتری و حداقل یک قلم کالا را وارد کنید');
      return;
    }

    // شبیه‌سازی ذخیره فاکتور
    alert('فاکتور با موفقیت ذخیره شد!');
    
    // پاک کردن فرم
    setItems([]);
    setCustomerName('');
    setCustomerPhone('');
    setNotes('');
    setDiscount(0);
  };

  const handlePrintInvoice = () => {
    if (items.length === 0) {
      alert('فاکتور خالی است!');
      return;
    }
    
    // شبیه‌سازی چاپ
    alert('فاکتور آماده چاپ است');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">فاکتور فروش</h1>
          <p className="text-gray-600 mt-1">صدور سریع فاکتور فروش</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrintInvoice}
            className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <FileText className="w-4 h-4" />
            چاپ فاکتور
          </button>
          <button
            onClick={handleSaveInvoice}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            ذخیره فاکتور
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* اطلاعات مشتری */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">اطلاعات مشتری</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">نام مشتری *</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="نام مشتری..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">شماره تماس</label>
              <input
                type="text"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="شماره تماس..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">تاریخ فاکتور</label>
              <input
                type="date"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">توضیحات</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="توضیحات اضافی..."
              />
            </div>
          </div>
        </div>

        {/* اقلام فاکتور */}
        <div className="lg:col-span-2 space-y-6">
          {/* افزودن قلم جدید */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">افزودن قلم جدید</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نام محصول</label>
                <input
                  type="text"
                  value={newItem.productName}
                  onChange={(e) => setNewItem(prev => ({ ...prev, productName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="نام محصول..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">تعداد</label>
                <input
                  type="number"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">قیمت واحد</label>
                <input
                  type="number"
                  value={newItem.unitPrice}
                  onChange={(e) => setNewItem(prev => ({ ...prev, unitPrice: parseInt(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="قیمت..."
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={addItem}
                  className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  افزودن
                </button>
              </div>
            </div>
          </div>

          {/* لیست اقلام */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">اقلام فاکتور</h2>
            </div>
            
            {items.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>هیچ قلمی اضافه نشده است</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">نام محصول</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">تعداد</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">قیمت واحد</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">مبلغ کل</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">عملیات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {items.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <input
                            type="text"
                            value={item.productName}
                            onChange={(e) => updateItem(item.id, 'productName', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </td>
                        <td className="py-4 px-4">
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                            className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            min="1"
                          />
                        </td>
                        <td className="py-4 px-4">
                          <input
                            type="number"
                            value={item.unitPrice}
                            onChange={(e) => updateItem(item.id, 'unitPrice', parseInt(e.target.value) || 0)}
                            className="w-32 px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-semibold text-gray-900">
                            {item.total.toLocaleString('fa-IR')} ت
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* محاسبات */}
            {items.length > 0 && (
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="max-w-md mr-auto space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">جمع کل:</span>
                    <span className="font-medium">{subtotal.toLocaleString('fa-IR')} تومان</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">تخفیف (%):</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={discount}
                        onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                        className="w-16 px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        min="0"
                        max="100"
                      />
                      <span className="font-medium">
                        -{discountAmount.toLocaleString('fa-IR')} تومان
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">مالیات (9%):</span>
                    <span className="font-medium">{tax.toLocaleString('fa-IR')} تومان</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-3">
                    <span>مبلغ نهایی:</span>
                    <span className="text-green-600">{total.toLocaleString('fa-IR')} تومان</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FastPurchaseModule;