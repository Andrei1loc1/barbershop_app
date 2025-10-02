import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { 
  Users, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Search, 
  Plus, 
  Edit, 
  Trash2,
  TrendingUp,
  MoreVertical
} from 'lucide-react';

// Define types
interface UserType {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'Client' | 'Admin' | 'Barber';
  status: 'Active' | 'Inactive' | 'Pending';
  lastLogin: string;
  bookings: number;
}

const statusColors: Record<UserType['status'], string> = {
  Active: 'text-green-400',
  Inactive: 'text-red-400',
  Pending: 'text-yellow-400'
};

const roleColors: Record<UserType['role'], string> = {
  Client: 'text-blue-400',
  Admin: 'text-purple-400',
  Barber: 'text-indigo-400'
};

// Mobile User Card Component
const UserCard: React.FC<{ user: UserType }> = ({ user }) => {
  return (
    <div className="bg-[#333B46]/70 backdrop-blur-sm p-3 rounded-lg mb-2">
      <div className="flex items-start justify-between space-x-3">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-sm">
              {user.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-white truncate">{user.name}</h3>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-1">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${roleColors[user.role]}`}>{user.role}</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[user.status]}`}>{user.status}</span>
        </div>
      </div>
    </div>
  );
};

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const users: UserType[] = [
    { id: 1, name: 'Ion Popescu', email: 'ion.popescu@email.com', phone: '+40 721 123 456', role: 'Client', status: 'Active', lastLogin: '2025-09-15', bookings: 12 },
    { id: 2, name: 'Maria Ionescu', email: 'maria.ionescu@email.com', phone: '+40 722 234 567', role: 'Client', status: 'Active', lastLogin: '2025-09-14', bookings: 8 },
    { id: 3, name: 'Andrei Georgescu', email: 'andrei.georgescu@email.com', phone: '+40 723 345 678', role: 'Admin', status: 'Active', lastLogin: '2025-09-16', bookings: 0 },
    { id: 4, name: 'Elena Dumitrescu', email: 'elena.dumitrescu@email.com', phone: '+40 724 456 789', role: 'Client', status: 'Inactive', lastLogin: '2025-08-20', bookings: 3 },
    { id: 5, name: 'Mihai Radu', email: 'mihai.radu@email.com', phone: '+40 725 567 890', role: 'Client', status: 'Active', lastLogin: '2025-09-13', bookings: 15 },
  ];

  const filteredUsers = users.filter(user => 
    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (activeTab === 'all' || user.role.toLowerCase() === activeTab || user.status.toLowerCase() === activeTab)
  );

  const stats = {
    totalUsers: 247,
    activeUsers: 189,
    adminUsers: 12,
    newUsersThisMonth: 34
  };

  return (
    <div className="flex min-h-screen bg-[#1A2331] text-white">
      <AdminSidebar />
      <div className="admin-content flex-1 pt-4 pb-20">
        <div className="p-2 md:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl md:text-3xl font-bold text-white">Utilizatori</h1>
              <p className="text-sm text-gray-300 hidden md:block">Gestionează conturile și permisiunile</p>
            </div>
            <button className="flex-shrink-0 flex items-center space-x-2 px-3 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 rounded-lg text-yellow-400 transition-colors">
              <Plus className="w-4 h-4" />
              <span className="inline text-sm">Adaugă</span>
            </button>
          </div>

          {/* Stats Cards */}
          <section className="mb-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {[
                { icon: Users, label: 'Total', value: stats.totalUsers, color: 'text-blue-400' },
                { icon: TrendingUp, label: 'Activi', value: stats.activeUsers, color: 'text-green-400' },
                { icon: User, label: 'Admini', value: stats.adminUsers, color: 'text-purple-400' },
                { icon: Calendar, label: 'Noi luna asta', value: stats.newUsersThisMonth, color: 'text-yellow-400' },
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
                      <p className={`text-lg md:text-2xl font-bold ${stat.color}`}>
                        {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Filters and Search */}
          <div className="bg-[#333B46]/70 backdrop-blur-sm p-2 mb-3 rounded-xl">
            <div className="flex flex-col md:flex-row gap-2 items-center">
              <div className="relative flex-1 w-full md:w-auto">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Caută..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-7 pr-4 py-1 bg-[#2a3441]/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors text-sm"
                />
              </div>
              <div className="flex space-x-1.5 overflow-x-auto pb-1 w-full md:w-auto">
                {['all', 'active', 'inactive', 'admin', 'client'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-2.5 py-1 text-xs rounded-lg transition-colors whitespace-nowrap ${
                      activeTab === tab
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile View */}
          <div className="md:hidden">
            {filteredUsers.map(user => <UserCard key={user.id} user={user} />)}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block table-card">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="p-3 text-left font-semibold text-gray-300">Nume</th>
                    <th className="p-3 text-left font-semibold text-gray-300">Contact</th>
                    <th className="p-3 text-left font-semibold text-gray-300">Rol</th>
                    <th className="p-3 text-left font-semibold text-gray-300">Status</th>
                    <th className="p-3 text-left font-semibold text-gray-300">Acțiuni</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-700/30">
                      <td className="p-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-semibold text-sm">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="font-medium text-white whitespace-nowrap">{user.name}</div>
                        </div>
                      </td>
                      <td className="p-3 text-gray-300">{user.email}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColors[user.role]}`}>{user.role}</span>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[user.status]}`}>{user.status}</span>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <button className="p-2 text-gray-400 hover:text-blue-400 rounded-lg"><Edit className="w-4 h-4" /></button>
                          <button className="p-2 text-gray-400 hover:text-red-400 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12 dark-glass-card">
              <Users className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Niciun utilizator găsit</h3>
              <p className="text-gray-400">Încearcă să modifici criteriile de căutare.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;