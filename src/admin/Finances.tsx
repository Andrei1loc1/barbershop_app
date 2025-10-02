import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  FileText, 
  Calendar, 
  Search, 
  Plus, 
  Edit, 
  Trash2,
  CreditCard,
  Receipt,
  PieChart
} from 'lucide-react';

// Types
interface Expense {
  id: number; 
  description: string; 
  amount: number; 
  category: string; 
  date: string; 
  status: 'paid' | 'pending';
}

interface Invoice {
  id: number; 
  client: string; 
  amount: number; 
  services: string; 
  date: string; 
  status: 'paid' | 'pending';
}

// Mobile Cards
const ExpenseCard: React.FC<{ expense: Expense, catColors: any, statColors: any }> = ({ expense, catColors, statColors }) => (
  <div className="bg-[#333B46]/70 backdrop-blur-sm p-3 rounded-lg mb-2 text-sm">
    <div className="flex justify-between items-start">
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium truncate">{expense.description}</p>
        <p className={`text-xs font-medium ${catColors[expense.category]}`}>{expense.category}</p>
      </div>
      <p className="text-base font-bold text-red-400 whitespace-nowrap ml-2">-{expense.amount.toLocaleString()} RON</p>
    </div>
    <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
      <span>{expense.date}</span>
      <span className={`px-2 py-0.5 rounded-full text-xs ${statColors[expense.status]}`}>{expense.status === 'paid' ? 'Plătită' : 'În așteptare'}</span>
    </div>
  </div>
);

const InvoiceCard: React.FC<{ invoice: Invoice, statColors: any }> = ({ invoice, statColors }) => (
  <div className="bg-[#333B46]/70 backdrop-blur-sm p-3 rounded-lg mb-2 text-sm">
    <div className="flex justify-between items-start">
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium truncate">{invoice.client}</p>
        <p className="text-xs text-gray-400 truncate">{invoice.services}</p>
      </div>
      <p className="text-base font-bold text-green-400 whitespace-nowrap ml-2">{invoice.amount.toLocaleString()} RON</p>
    </div>
    <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
      <span>{invoice.date}</span>
      <span className={`px-2 py-0.5 rounded-full text-xs ${statColors[invoice.status]}`}>{invoice.status === 'paid' ? 'Plătită' : 'De încasat'}</span>
    </div>
  </div>
);

const AdminFinances = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPeriod, setFilterPeriod] = useState('month');

  const financialData = {
    expenses: [
      { id: 1, description: 'Produse cosmetice', amount: 1250, category: 'Materiale', date: '2025-09-01', status: 'paid' },
      { id: 2, description: 'Chirie spațiu', amount: 3200, category: 'Fixe', date: '2025-09-01', status: 'paid' },
      { id: 3, description: 'Salarii angajați', amount: 4500, category: 'Salarii', date: '2025-09-05', status: 'paid' },
    ],
    invoices: [
      { id: 1, client: 'Ion Popescu', amount: 180, services: 'Tuns + barba', date: '2025-09-17', status: 'paid' },
      { id: 2, client: 'Maria Ionescu', amount: 250, services: 'Vopsit păr', date: '2025-09-17', status: 'paid' },
    ]
  };

  const stats = {
    totalRevenue: '45,230 RON',
    totalExpenses: '13,800 RON',
    netProfit: '31,430 RON',
    profitMargin: '69.5%'
  };

  const statusColors = {
    paid: 'text-green-400',
    pending: 'text-yellow-400',
    overdue: 'text-red-400'
  };

  const expenseCategories = {
    Materiale: 'text-blue-400',
    Fixe: 'text-purple-400',
    Salarii: 'text-green-400',
    Utilități: 'text-indigo-400',
    Marketing: 'text-orange-400',
    Investiții: 'text-pink-400'
  };

  return (
    <div className="flex min-h-screen bg-[#1A2331] text-white">
      <AdminSidebar />
      <div className="admin-content flex-1 pt-4 pb-20">
        <div className="p-2 md:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl md:text-3xl font-bold text-white">Finanțe</h1>
              <p className="text-sm text-gray-300 hidden md:block">Monitorizează veniturile și cheltuielile</p>
            </div>
            <button className="flex-shrink-0 flex items-center space-x-2 px-3 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 rounded-lg text-yellow-400 transition-colors">
              <Plus className="w-4 h-4" />
              <span className="hidden md:inline text-sm">Factură</span>
            </button>
          </div>

          {/* Stats Cards */}
          <section className="mb-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {[
                { icon: DollarSign, label: 'Venit total', value: stats.totalRevenue, color: 'text-green-400' },
                { icon: TrendingDown, label: 'Cheltuieli', value: stats.totalExpenses, color: 'text-red-400' },
                { icon: TrendingUp, label: 'Profit net', value: stats.netProfit, color: 'text-blue-400' },
                { icon: PieChart, label: 'Marjă profit', value: stats.profitMargin, color: 'text-purple-400' },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="dark-glass-card p-3 md:p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-8 h-8 ${stat.color} bg-opacity-10 bg-current rounded-lg flex items-center justify-center`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
                      <p className={`text-lg md:text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Financial Overview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
            {/* Expenses */}
            <div className="table-card">
              <h3 className="text-lg font-semibold text-white mb-3">Cheltuieli</h3>
              {/* Mobile View */}
              <div className="md:hidden space-y-2">
                {financialData.expenses.map(e => <ExpenseCard key={e.id} expense={e} catColors={expenseCategories} statColors={statusColors} />)}
              </div>
              {/* Desktop View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  {/* ... desktop table ... */}
                </table>
              </div>
            </div>

            {/* Invoices */}
            <div className="table-card">
              <h3 className="text-lg font-semibold text-white mb-3">Facturi emise</h3>
              {/* Mobile View */}
              <div className="md:hidden space-y-2">
                {financialData.invoices.map(i => <InvoiceCard key={i.id} invoice={i} statColors={statusColors} />)}
              </div>
              {/* Desktop View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  {/* ... desktop table ... */}
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminFinances;