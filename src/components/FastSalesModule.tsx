import React, { useState } from 'react';
import { Plus, Search, ShoppingCart, Minus, Calculator, CreditCard } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

const FastSalesModule: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const products = [
    { id: '1', name: 'لپ‌تاپ ASUS', price: 25000000, stock: 15 },
    { id: '2', name: 'چاپگر HP', price: 8500000, stock: 8 },
    { id: '3', name: 'کیبورد', price: 1500000, stock: 25 },
    { id: '4', name: 'ماوس', price: 750000, stock: 30 },
    { id: '5', name: 'مانیتور', price: 12000000, stock: 12 },
    { id: '6', name: 'هدفون', price: 2500000, stock: 20 }
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product: typeof products[0]) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
          : item
      ));
    } else {
      setCart([...cart, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        total: product.price
      }]);
    }
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item =>
        item.id === id
          ? { ...item, quantity: newQuantity, total: newQuantity * item.price }
          : item
      ));
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.09; // 9% مالیات
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('سبد خرید خالی است!');
      return;
    }

    // شبیه‌سازی فروش
    alert(`فروش با موفقیت انجام شد!\nمبلغ کل: ${total.toLocaleString('fa-IR')} تومان`);
    
    // پاک کردن سبد خرید
    setCart([]);
    setCustomerName('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">فروش سریع</h1>
          <p className="text-gray-600 mt-1">فروش سریع و آسان محصولات</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* لیست محصولات */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">محصولات</h2>
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="جستجوی محصول..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      موجودی: {product.stock}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">
                      {product.price.toLocaleString('fa-IR')} ت
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      افزودن
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* سبد خرید */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">سبد خرید</h2>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                {cart.length}
              </span>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>سبد خرید خالی است</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                      <p className="text-xs text-gray-600">
                        {item.price.toLocaleString('fa-IR')} ت × {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* اطلاعات مشتری و پرداخت */}
          {cart.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">اطلاعات فروش</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">نام مشتری (اختیاری)</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="نام مشتری..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">روش پرداخت</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="cash">نقدی</option>
                    <option value="card">کارت</option>
                    <option value="check">چک</option>
                    <option value="credit">نسیه</option>
                  </select>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">جمع کل:</span>
                    <span className="font-medium">{subtotal.toLocaleString('fa-IR')} ت</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">مالیات (9%):</span>
                    <span className="font-medium">{tax.toLocaleString('fa-IR')} ت</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>مبلغ نهایی:</span>
                    <span className="text-green-600">{total.toLocaleString('fa-IR')} ت</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  <CreditCard className="w-5 h-5" />
                  تکمیل فروش
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FastSalesModule;