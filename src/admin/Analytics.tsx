import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { 
  BarChart3, 
  Activity, 
  Users, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  Search, 
  Filter, 
  Download,
  Clock,
  DollarSign,
  Scissors,
  FileText,
  Eye,
  User,
  Bell
} from 'lucide-react';

const AdminAnalytics = () => {
  const [filterPeriod, setFilterPeriod] = useState('month');

  const analyticsData = {
    performance: [
      { metric: 'Vizitatori', value: 1247, trend: 'up' },
      { metric: 'Rezervări', value: 156, trend: 'up' },
      { metric: 'Timp mediu', value: '3m 45s', trend: 'up' },
      { metric: 'Retenție', value: '78%', trend: 'up' }
    ],
    customerInsights: [
      { ageGroup: '18-24 ani', percentage: 35, count: 89 },
      { ageGroup: '25-34 ani', percentage: 42, count: 107 },
      { ageGroup: '35-44 ani', percentage: 18, count: 46 },
      { ageGroup: '45+ ani', percentage: 5, count: 13 }
    ],
    servicePerformance: [
      { service: 'Tuns clasic', bookings: 45, revenue: '3, 600 RON', popularity: 92 },
      { service: 'Tuns + barba', bookings: 32, revenue: '3, 840 RON', popularity: 88 },
      { service: 'Ras clasic', bookings: 28, revenue: '1, 400 RON', popularity: 82 },
      { service: 'Vopsit păr', bookings: 15, revenue: '3, 750 RON', popularity: 85 },
      { service: 'Coafor complet', bookings: 18, revenue: '3, 240 RON', popularity: 78 }
    ],
    dailyBookings: [
      { day: 'Lun', bookings: 12 },
      { day: 'Mar', bookings: 18 },
      { day: 'Mie', bookings: 15 },
      { day: 'Joi', bookings: 22 },
      { day: 'Vin', bookings: 28 },
      { day: 'Sâm', bookings: 35 },
      { day: 'Dum', bookings: 8 }
    ],
    hourlyPerformance: [
      { hour: '09:00', bookings: 5 },
      { hour: '10:00', bookings: 8 },
      { hour: '11:00', bookings: 12 },
      { hour: '12:00', bookings: 6 },
      { hour: '13:00', bookings: 4 },
      { hour: '14:00', bookings: 9 },
      { hour: '15:00', bookings: 11 },
      { hour: '16:00', bookings: 7 },
      { hour: '17:00', bookings: 5 },
      { hour: '18:00', bookings: 3 }
    ]
  };

  const bookingsStats = {
    totalBookings: 156,
    todayBookings: 12,
    upcomingBookings: 45,
    revenueToday: '1,250 RON'
  };

  const servicesStats = {
    totalServices: 12,
    activeServices: 7,
    monthlyRevenue: '8,450 RON',
    mostPopular: 'Tuns clasic'
  };

  const periods = ['week', 'month', 'quarter', 'year'];

  const trendColors = {
    up: 'text-green-400',
    down: 'text-red-400',
    stable: 'text-yellow-400'
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3" />;
      case 'down': return <TrendingDown className="w-3 h-3" />;
      default: return <Activity className="w-3 h-3" />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#1A2331] text-white">
      <AdminSidebar />
      <div className="admin-content flex-1 pt-4 pb-20">
        <div className="p-2 md:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-xl md:text-3xl font-bold text-white">Analize</h1>
            </div>
            <button className="flex-shrink-0 flex items-center space-x-2 px-3 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 rounded-lg text-yellow-400 transition-colors">
              <Download className="w-4 h-4" />
              <span className="inline text-sm">Export</span>
            </button>
          </div>

          {/* Period Filter */}
          <div className="bg-[#333B46]/70 backdrop-blur-sm p-2 mb-3 rounded-xl">
            <div className="flex flex-col md:flex-row gap-2 items-center">
              <div className="flex items-center space-x-1">
                <h3 className="text-xs font-semibold text-gray-300">Perioadă:</h3>
              </div>
              <div className="flex space-x-1 overflow-x-auto pb-0.5">
                {periods.map(period => (
                  <button
                    key={period}
                    onClick={() => setFilterPeriod(period)}
                    className={`px-2 py-1 text-xs rounded-lg transition-colors whitespace-nowrap ${
                      filterPeriod === period
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* KPI Section */}
          <section className="mb-3">
            <h2 className="text-base md:text-xl font-semibold text-white mb-2 flex items-center">
              <BarChart3 className="w-4 h-4 mr-1 text-yellow-400" />
              Indicatori Cheie
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {analyticsData.performance.map((metric, index) => (
                <div key={index} className="dark-glass-card p-2 rounded-xl">
                  <p className="text-xxs text-gray-400 mb-0.5">{metric.metric}</p>
                  <p className={`text-base md:text-xl font-bold text-white`}>{metric.value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Bookings Stats */}
          <section className="mb-3">
            <h2 className="text-base md:text-xl font-semibold text-white mb-2 flex items-center">
              <Calendar className="w-4 h-4 mr-1 text-yellow-400" />
              Statistici Rezervări
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { icon: Calendar, label: 'Total', value: bookingsStats.totalBookings, color: 'text-blue-400' },
                { icon: Clock, label: 'Azi', value: bookingsStats.todayBookings, color: 'text-green-400' },
                { icon: TrendingUp, label: 'Viitoare', value: bookingsStats.upcomingBookings, color: 'text-purple-400' },
                { icon: User, label: 'Venit azi', value: bookingsStats.revenueToday, color: 'text-yellow-400' },
              ].map((stat, index) => (
                <div key={index} className="dark-glass-card p-2 rounded-xl">
                  <p className="text-xxs text-gray-400 mb-0.5">{stat.label}</p>
                  <p className={`text-base md:text-xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Services Stats */}
          <section className="mb-3">
            <h2 className="text-base md:text-xl font-semibold text-white mb-2 flex items-center">
              <Scissors className="w-4 h-4 mr-1 text-yellow-400" />
              Statistici Servicii
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { icon: Scissors, label: 'Total', value: servicesStats.totalServices, color: 'text-blue-400' },
                { icon: Eye, label: 'Active', value: servicesStats.activeServices, color: 'text-green-400' },
                { icon: DollarSign, label: 'Venit lunar', value: servicesStats.monthlyRevenue, color: 'text-yellow-400' },
                { icon: TrendingUp, label: 'Popular', value: servicesStats.mostPopular, color: 'text-purple-400' },
              ].map((stat, index) => (
                <div key={index} className="dark-glass-card p-2 rounded-xl">
                  <p className="text-xxs text-gray-400 mb-0.5">{stat.label}</p>
                  <p className={`text-base md:text-xl font-bold ${stat.color} truncate`}>{stat.value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Service Performance List */}
          <section className="mb-3">
            <h2 className="text-base md:text-xl font-semibold text-white mb-2 flex items-center">
              <Scissors className="w-4 h-4 mr-1 text-purple-400" />
              Performanța Serviciilor
            </h2>
            <div className="dark-glass-card p-2">
              {analyticsData.servicePerformance.slice(0, 5).map((service, index) => (
                <div key={index} className="flex items-center justify-between py-1.5">
                  <div className="flex items-center space-x-1.5 flex-1 min-w-0">
                    <span className="text-xs text-yellow-400 font-bold w-4 flex-shrink-0">{index + 1}.</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white text-xs truncate">{service.service}</div>
                      <div className="text-gray-400 text-xxs truncate">{service.bookings} rezervări</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-medium text-green-400 whitespace-nowrap">{service.revenue}</div>
                    <div className="text-xxs text-gray-400 whitespace-nowrap">{service.popularity}% popularitate</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;