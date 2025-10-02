import React from 'react';
import AdminSidebar from './AdminSidebar';
import { BarChart3, Users, Calendar, DollarSign, Clock, TrendingUp, Bell, Percent, Send, Tag } from 'lucide-react';

const AdminDashboard = () => {
  const stats = {
    totalUsers: 12,
    totalBookings: 156,
    monthlyRevenue: '650 RON',
    activeAppointments: 23
  };

  return (
    <div className="flex min-h-screen bg-[#1A2331] text-white">
      <AdminSidebar />
      <div className="admin-content flex-1 pt-4 pb-20">
        <div className="p-2 md:p-6">
          <div className="flex items-center justify-between mb-4 md:mb-8">
            <div>
              <h1 className="text-xl md:text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-sm text-gray-300 hidden md:block">Vizualizează și gestionează afacerea ta</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 mb-4 md:mb-8">
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              <div className="dark-glass-card p-3 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-white mb-3">Următoarele Programări</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-[#51555a]/20 rounded-lg">
                    <div>
                      <p className="text-sm text-white">Alexandru Popescu</p>
                      <p className="text-xs text-gray-400">Tuns + Barbă</p>
                    </div>
                    <span className="text-sm font-bold text-yellow-400">14:30</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-[#51555a]/20 rounded-lg">
                    <div>
                      <p className="text-sm text-white">Mihai Ionescu</p>
                      <p className="text-xs text-gray-400">Tuns Clasic</p>
                    </div>
                    <span className="text-sm font-bold text-yellow-400">15:00</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-[#51555a]/20 rounded-lg">
                    <div>
                      <p className="text-sm text-white">Radu Marinescu</p>
                      <p className="text-xs text-gray-400">Bărbierit</p>
                    </div>
                    <span className="text-sm font-bold text-yellow-400">16:15</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="dark-glass-card p-3 rounded-xl text-left flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-500/10 text-blue-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-white">Notificare</h3>
                    <p className="text-xs text-gray-400 hidden sm:block">Clienți</p>
                  </div>
                </button>

                <button className="dark-glass-card p-3 rounded-xl text-left flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-500/10 text-green-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Tag className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-white">Ofertă</h3>
                    <p className="text-xs text-gray-400 hidden sm:block">Reduceri</p>
                  </div>
                </button>

                <button className="dark-glass-card p-3 rounded-xl text-left flex items-center space-x-2">
                  <div className="w-8 h-8 bg-yellow-500/10 text-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Send className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-white">Reminder</h3>
                     <p className="text-xs text-gray-400 hidden sm:block">Mâine</p>
                  </div>
                </button>

                <button className="dark-glass-card p-3 rounded-xl text-left flex items-center space-x-2">
                  <div className="w-8 h-8 bg-purple-500/10 text-purple-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Percent className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-white">Discount</h3>
                     <p className="text-xs text-gray-400 hidden sm:block">Fideli</p>
                  </div>
                </button>
              </div>
            </div>
            <div>
              <div className="dark-glass-card p-3 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center">
                  <span className="mr-2">AI Assistant</span>
                  <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">Online</span>
                </h3>
                <div className="space-y-3">
                  <div className="h-[240px] md:h-[280px] overflow-y-auto space-y-3 mb-3 pr-2">
                    <div className="flex items-start space-x-2">
                      <div className="w-7 h-7 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-black font-bold text-xs">AI</span>
                      </div>
                      <div className="bg-[#51555a]/20 rounded-lg p-2 text-xs text-white max-w-[80%]">
                        Bună! Sunt asistentul tău AI. Cum te pot ajuta astăzi?
                      </div>
                    </div>
                    <div className="flex items-start space-x-2 justify-end">
                      <div className="bg-yellow-500/20 rounded-lg p-2 text-xs text-yellow-400 max-w-[80%]">
                        Vreau să modific programul pentru mâine.
                      </div>
                      <div className="w-7 h-7 rounded-full bg-blue-500/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-400 font-bold text-xs">Tu</span>
                      </div>
                    </div>
                     <div className="flex items-start space-x-2">
                      <div className="w-7 h-7 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-black font-bold text-xs">AI</span>
                      </div>
                      <div className="bg-[#51555a]/20 rounded-lg p-2 text-xs text-white max-w-[80%]">
                        Sigur! Programul pentru mâine este 9:00 - 18:00. Ce modificări dorești?
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input 
                      type="text" 
                      placeholder="Scrie un mesaj..."
                      className="flex-1 bg-[#51555a]/20 border border-gray-700 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-yellow-500"
                    />
                    <button className="p-1.5 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition-colors">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <button className="dark-glass-card p-3 rounded-xl text-left flex items-center space-x-3 w-full mt-4">
                <div className="w-8 h-8 bg-emerald-500/10 text-emerald-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-white">Sincronizare</h3>
                      <p className="text-xs text-gray-400">Google Calendar</p>
                    </div>
                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs">Nou</span>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <section className="mb-8">
            <h2 className="text-lg md:text-xl font-semibold text-white mb-4 md:mb-6 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-yellow-400" />
              Statistici generale
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {[
                { icon: Users, label: 'Programări azi', value: stats.totalUsers, color: 'text-blue-400' },
                { icon: Calendar, label: 'Total rezervări', value: stats.totalBookings, color: 'text-green-400' },
                { icon: DollarSign, label: 'Venit Azi', value: stats.monthlyRevenue, color: 'text-yellow-400' },
                { icon: Clock, label: 'Active', value: stats.activeAppointments, color: 'text-purple-400' },
              ].map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="dark-glass-card p-3 md:p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-10 h-10 ${stat.color} bg-opacity-10 bg-current rounded-lg flex items-center justify-center`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <TrendingUp className={`w-4 h-4 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
                      <p className={`text-lg md:text-2xl font-bold ${stat.color}`}>
                        {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}

export default AdminDashboard