import React, { useState } from 'react';
import { Save, Settings, User, Building, Database, Shield, Bell, Palette } from 'lucide-react';

const SettingsModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('company');
  const [settings, setSettings] = useState({
    company: {
      name: 'شرکت آوان حسابان',
      economicCode: '12345678901',
      nationalId: '1234567890',
      registrationNumber: 'REG-123456',
      address: 'تهران، خیابان ولیعصر، پلاک 123',
      phone: '021-88554433',
      email: 'info@avanhesaban.com',
      website: 'www.avanhesaban.com',
      logo: ''
    },
    user: {
      name: 'محمد احمدی',
      email: 'admin@avanhesaban.com',
      phone: '0912-3456789',
      role: 'مدیر سیستم',
      language: 'fa',
      timezone: 'Asia/Tehran'
    },
    system: {
      currency: 'IRR',
      dateFormat: 'persian',
      fiscalYearStart: '1403/01/01',
      backupFrequency: 'daily',
      autoSave: true,
      theme: 'light'
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
      loginAttempts: 5,
      auditLog: true
    },
    notifications: {
      email: true,
      sms: false,
      desktop: true,
      lowStock: true,
      overdueInvoices: true,
      systemUpdates: true
    }
  });

  const tabs = [
    { id: 'company', label: 'اطلاعات شرکت', icon: Building },
    { id: 'user', label: 'پروفایل کاربری', icon: User },
    { id: 'system', label: 'تنظیمات سیستم', icon: Database },
    { id: 'security', label: 'امنیت', icon: Shield },
    { id: 'notifications', label: 'اعلان‌ها', icon: Bell },
    { id: 'appearance', label: 'ظاهر', icon: Palette }
  ];

  const handleSave = () => {
    console.log('Settings saved:', settings);
    // در اینجا کد ذخیره تنظیمات قرار می‌گیرد
  };

  const renderCompanySettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">اطلاعات شرکت</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">نام شرکت</label>
          <input
            type="text"
            value={settings.company.name}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              company: { ...prev.company, name: e.target.value }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">کد اقتصادی</label>
          <input
            type="text"
            value={settings.company.economicCode}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              company: { ...prev.company, economicCode: e.target.value }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">شناسه ملی</label>
          <input
            type="text"
            value={settings.company.nationalId}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              company: { ...prev.company, nationalId: e.target.value }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">شماره ثبت</label>
          <input
            type="text"
            value={settings.company.registrationNumber}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              company: { ...prev.company, registrationNumber: e.target.value }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">آدرس</label>
          <textarea
            value={settings.company.address}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              company: { ...prev.company, address: e.target.value }
            }))}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">تلفن</label>
          <input
            type="text"
            value={settings.company.phone}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              company: { ...prev.company, phone: e.target.value }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ایمیل</label>
          <input
            type="email"
            value={settings.company.email}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              company: { ...prev.company, email: e.target.value }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">تنظیمات سیستم</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">واحد پول</label>
          <select
            value={settings.system.currency}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              system: { ...prev.system, currency: e.target.value }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="IRR">ریال ایران (IRR)</option>
            <option value="USD">دلار آمریکا (USD)</option>
            <option value="EUR">یورو (EUR)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">فرمت تاریخ</label>
          <select
            value={settings.system.dateFormat}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              system: { ...prev.system, dateFormat: e.target.value }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="persian">شمسی</option>
            <option value="gregorian">میلادی</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">شروع سال مالی</label>
          <input
            type="text"
            value={settings.system.fiscalYearStart}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              system: { ...prev.system, fiscalYearStart: e.target.value }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">فرکانس بکاپ</label>
          <select
            value={settings.system.backupFrequency}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              system: { ...prev.system, backupFrequency: e.target.value }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="daily">روزانه</option>
            <option value="weekly">هفتگی</option>
            <option value="monthly">ماهانه</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="autoSave"
              checked={settings.system.autoSave}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                system: { ...prev.system, autoSave: e.target.checked }
              }))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="autoSave" className="mr-2 block text-sm text-gray-900">
              ذخیره خودکار
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">تنظیمات امنیتی</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">احراز هویت دو مرحله‌ای</h4>
            <p className="text-sm text-gray-600">افزایش امنیت حساب کاربری</p>
          </div>
          <input
            type="checkbox"
            checked={settings.security.twoFactorAuth}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              security: { ...prev.security, twoFactorAuth: e.target.checked }
            }))}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">مهلت نشست (دقیقه)</label>
            <input
              type="number"
              value={settings.security.sessionTimeout}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                security: { ...prev.security, sessionTimeout: parseInt(e.target.value) }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">انقضای رمز عبور (روز)</label>
            <input
              type="number"
              value={settings.security.passwordExpiry}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                security: { ...prev.security, passwordExpiry: parseInt(e.target.value) }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'company':
        return renderCompanySettings();
      case 'system':
        return renderSystemSettings();
      case 'security':
        return renderSecuritySettings();
      default:
        return <div className="text-center py-12 text-gray-500">این بخش در حال توسعه است</div>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">تنظیمات سیستم</h1>
          <p className="text-gray-600 mt-1">پیکربندی و تنظیمات عمومی سیستم</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save className="w-4 h-4" />
          ذخیره تغییرات
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" dir="ltr">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SettingsModule;