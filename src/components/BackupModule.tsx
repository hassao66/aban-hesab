import React, { useState } from 'react';
import { Database, Download, Upload, Calendar, CheckCircle, AlertCircle, Clock, HardDrive } from 'lucide-react';

const BackupModule: React.FC = () => {
  const [backups, setBackups] = useState([
    {
      id: '1',
      name: 'بکاپ خودکار روزانه',
      date: new Date('2024-01-15'),
      size: '45.2 MB',
      type: 'auto',
      status: 'completed',
      description: 'بکاپ کامل سیستم'
    },
    {
      id: '2',
      name: 'بکاپ دستی - پایان ماه',
      date: new Date('2024-01-10'),
      size: '38.7 MB',
      type: 'manual',
      status: 'completed',
      description: 'بکاپ اطلاعات مالی'
    },
    {
      id: '3',
      name: 'بکاپ هفتگی',
      date: new Date('2024-01-08'),
      size: '42.1 MB',
      type: 'scheduled',
      status: 'completed',
      description: 'بکاپ برنامه‌ریزی شده'
    }
  ]);

  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupFrequency: 'daily',
    backupTime: '02:00',
    retentionDays: 30,
    includeFiles: true,
    includeDatabase: true,
    compression: true
  });

  const backupTypes = {
    auto: { label: 'خودکار', color: 'bg-blue-100 text-blue-800', icon: Clock },
    manual: { label: 'دستی', color: 'bg-green-100 text-green-800', icon: Database },
    scheduled: { label: 'برنامه‌ریزی شده', color: 'bg-purple-100 text-purple-800', icon: Calendar }
  };

  const statusConfig = {
    completed: { label: 'تکمیل شده', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    running: { label: 'در حال اجرا', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    failed: { label: 'ناموفق', color: 'bg-red-100 text-red-800', icon: AlertCircle }
  };

  const handleCreateBackup = () => {
    const newBackup = {
      id: Date.now().toString(),
      name: `بکاپ دستی - ${new Date().toLocaleDateString('fa-IR')}`,
      date: new Date(),
      size: '0 MB',
      type: 'manual' as const,
      status: 'running' as const,
      description: 'بکاپ دستی در حال ایجاد'
    };
    setBackups([newBackup, ...backups]);
    
    // شبیه‌سازی تکمیل بکاپ
    setTimeout(() => {
      setBackups(prev => prev.map(backup => 
        backup.id === newBackup.id 
          ? { ...backup, status: 'completed' as const, size: '41.3 MB' }
          : backup
      ));
    }, 3000);
  };

  const handleDownloadBackup = (backupId: string) => {
    console.log('Downloading backup:', backupId);
    // در اینجا کد دانلود بکاپ قرار می‌گیرد
  };

  const handleRestoreBackup = (backupId: string) => {
    console.log('Restoring backup:', backupId);
    // در اینجا کد بازیابی بکاپ قرار می‌گیرد
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">تهیه پشتیبان</h1>
          <p className="text-gray-600 mt-1">مدیریت بکاپ و بازیابی اطلاعات</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleCreateBackup}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Database className="w-4 h-4" />
            ایجاد بکاپ جدید
          </button>
          <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <Upload className="w-4 h-4" />
            بازیابی از فایل
          </button>
        </div>
      </div>

      {/* آمار بکاپ */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">کل بکاپ‌ها</h3>
              <p className="text-2xl font-bold text-gray-900 mt-2">{backups.length}</p>
            </div>
            <Database className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">حجم کل</h3>
              <p className="text-2xl font-bold text-green-600 mt-2">126 MB</p>
            </div>
            <HardDrive className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">آخرین بکاپ</h3>
              <p className="text-2xl font-bold text-purple-600 mt-2">امروز</p>
            </div>
            <Calendar className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">وضعیت</h3>
              <div className="flex items-center gap-2 mt-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-green-600">فعال</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* تنظیمات بکاپ */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">تنظیمات بکاپ خودکار</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">بکاپ خودکار</label>
              <input
                type="checkbox"
                checked={backupSettings.autoBackup}
                onChange={(e) => setBackupSettings(prev => ({ ...prev, autoBackup: e.target.checked }))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">فرکانس بکاپ</label>
              <select
                value={backupSettings.backupFrequency}
                onChange={(e) => setBackupSettings(prev => ({ ...prev, backupFrequency: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="daily">روزانه</option>
                <option value="weekly">هفتگی</option>
                <option value="monthly">ماهانه</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">زمان بکاپ</label>
              <input
                type="time"
                value={backupSettings.backupTime}
                onChange={(e) => setBackupSettings(prev => ({ ...prev, backupTime: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">مدت نگهداری (روز)</label>
              <input
                type="number"
                value={backupSettings.retentionDays}
                onChange={(e) => setBackupSettings(prev => ({ ...prev, retentionDays: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includeDatabase"
                  checked={backupSettings.includeDatabase}
                  onChange={(e) => setBackupSettings(prev => ({ ...prev, includeDatabase: e.target.checked }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="includeDatabase" className="mr-2 text-sm text-gray-700">
                  شامل پایگاه داده
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includeFiles"
                  checked={backupSettings.includeFiles}
                  onChange={(e) => setBackupSettings(prev => ({ ...prev, includeFiles: e.target.checked }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="includeFiles" className="mr-2 text-sm text-gray-700">
                  شامل فایل‌ها
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="compression"
                  checked={backupSettings.compression}
                  onChange={(e) => setBackupSettings(prev => ({ ...prev, compression: e.target.checked }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="compression" className="mr-2 text-sm text-gray-700">
                  فشرده‌سازی
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* لیست بکاپ‌ها */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">تاریخچه بکاپ‌ها</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">نام بکاپ</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">تاریخ</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">حجم</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">نوع</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">وضعیت</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {backups.map((backup) => {
                const TypeIcon = backupTypes[backup.type].icon;
                const StatusIcon = statusConfig[backup.status].icon;
                
                return (
                  <tr key={backup.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <span className="font-medium text-gray-900">{backup.name}</span>
                        <p className="text-sm text-gray-600">{backup.description}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {backup.date.toLocaleDateString('fa-IR')}
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-gray-900">{backup.size}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                        backupTypes[backup.type].color
                      }`}>
                        <TypeIcon className="w-3 h-3" />
                        {backupTypes[backup.type].label}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                        statusConfig[backup.status].color
                      }`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusConfig[backup.status].label}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDownloadBackup(backup.id)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          disabled={backup.status !== 'completed'}
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleRestoreBackup(backup.id)}
                          className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          disabled={backup.status !== 'completed'}
                        >
                          <Upload className="w-4 h-4" />
                        </button>
                      </div>
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

export default BackupModule;