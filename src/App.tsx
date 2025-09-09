import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AccountsModule from './components/AccountsModule';
import InvoicesModule from './components/InvoicesModule';
import CustomersModule from './components/CustomersModule';
import InventoryModule from './components/InventoryModule';
import ReportsModule from './components/ReportsModule';
import TaxModule from './components/TaxModule';
import TreasuryModule from './components/TreasuryModule';
import DocumentsModule from './components/DocumentsModule';
import ChecksModule from './components/ChecksModule';
import BanksModule from './components/BanksModule';
import AssetsModule from './components/AssetsModule';
import SettingsModule from './components/SettingsModule';
import FinancialModule from './components/FinancialModule';
import BackupModule from './components/BackupModule';
import SalesReportsModule from './components/SalesReportsModule';
import PurchaseReportsModule from './components/PurchaseReportsModule';
import PurchaseInvoicesModule from './components/PurchaseInvoicesModule';
import FastSalesModule from './components/FastSalesModule';
import FastPurchaseModule from './components/FastPurchaseModule';
import PreInvoiceModule from './components/PreInvoiceModule';
import PurchasePreInvoiceModule from './components/PurchasePreInvoiceModule';
import GoodsModule from './components/GoodsModule';
import PersonsModule from './components/PersonsModule';
import { ModuleType } from './types/common';

function App() {
  const [activeModule, setActiveModule] = useState<ModuleType>('dashboard');

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'accounts':
        return <AccountsModule />;
      case 'invoices':
        return <InvoicesModule />;
      case 'customers':
        return <CustomersModule />;
      case 'inventory':
        return <InventoryModule />;
      case 'reports':
        return <ReportsModule />;
      case 'tax':
        return <TaxModule />;
      case 'treasury':
        return <TreasuryModule />;
      case 'documents':
        return <DocumentsModule />;
      case 'checks':
        return <ChecksModule />;
      case 'banks':
        return <BanksModule />;
      case 'assets':
        return <AssetsModule />;
      case 'settings':
        return <SettingsModule />;
      case 'financial-affairs':
        return <FinancialModule />;
      case 'backup':
        return <BackupModule />;
      case 'sales-reports':
        return <SalesReportsModule />;
      case 'purchase-reports':
        return <PurchaseReportsModule />;
      case 'purchase-invoices':
        return <PurchaseInvoicesModule />;
      case 'fast-sales':
        return <FastSalesModule />;
      case 'fast-purchase':
        return <FastPurchaseModule />;
      case 'pre-invoice':
        return <PreInvoiceModule />;
      case 'purchase-pre-invoice':
        return <PurchasePreInvoiceModule />;
      case 'goods':
        return <GoodsModule />;
      case 'persons':
        return <PersonsModule />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans" dir="rtl">
      <Header 
        activeModule={activeModule}
        setActiveModule={setActiveModule}
      />
      <main className="pt-20">
        <div className="p-6">
          {renderModule()}
        </div>
      </main>
    </div>
  );
}

export default App;