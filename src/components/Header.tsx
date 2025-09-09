import React from 'react';
import { User, 
  LayoutDashboard, 
  FileText,
  Users, 
  Package, 
  BarChart3, 
  Calculator,
  Vault,
  FileCheck,
  Receipt,
  Building2,
  Monitor,
  Settings,
  Database,
  ShoppingCart,
  User as UserIcon,
  CreditCard
} from 'lucide-react';
import { ModuleType } from '../types/common';

interface HeaderProps {
  activeModule: ModuleType;
  setActiveModule: (module: ModuleType) => void;
}

const Header: React.FC<HeaderProps> = ({ activeModule, setActiveModule }) => {
  const menuItems = [
    { id: 'customers', label: 'مشتریان', icon: Users },
    { id: 'accounts', label: 'حساب‌ها', icon: CreditCard },
    { id: 'financial-affairs', label: 'امور مالی', icon: BarChart3 },
    { id: 'invoices', label: 'فاکتورها', icon: FileText },
    { id: 'checks', label: 'چک‌ها', icon: Receipt },
    { id: 'banks', label: 'بانک‌ها', icon: Building2 },
    { id: 'goods', label: 'کالاها', icon: Package },
    { id: 'inventory', label: 'انبار', icon: Package },
    { id: 'documents', label: 'اسناد حسابداری', icon: FileCheck },
    { id: 'reports', label: 'گزارش‌ها', icon: BarChart3 },
    { id: 'settings', label: 'تنظیمات', icon: Settings },
    { id: 'backup', label: 'تهیه پشتیبان', icon: Database },
  ];

  return (
    <header className="fixed w-full top-0 z-40 bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* لوگو */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-900">آوان حسابان</h1>
              <p className="text-xs text-gray-500">سیستم حسابداری پیشرفته</p>
            </div>
          </div>

          {/* ماژول‌ها */}
          <nav className="flex-1 max-w-4xl mx-4">
            <div className="flex items-center justify-center gap-1 overflow-x-auto py-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeModule === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveModule(item.id as ModuleType)}
                    className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap min-w-[70px] ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-[10px] leading-tight">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* کادر سرچ، اعلان‌ها و نام کاربر */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="flex items-center gap-2 pr-3 border-r border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">آقای علی اسفندیاری</p>
                <p className="text-xs text-gray-500">مدیر مالی</p>
              </div>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;