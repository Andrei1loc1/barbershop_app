import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { 
  Calendar, 
  Clock, 
  User, 
  Scissors, 
  CheckCircle, 
  XCircle, 
  Search, 
  Plus, 
  Edit, 
  Trash2,
  MoreVertical
} from 'lucide-react';

// Define the type for a single booking
interface Booking {
  id: number;
  customer: string;
  service: string;
  barber: string;
  date: string;
  time: string;
  duration: string;
  price: string;
  status: 'confirmed' | 'completed' | 'cancelled' | 'pending';
}

// Mobile Booking Card Component (Ultra-Compact Version)
const BookingCard: React.FC<{ booking: Booking; statusConfig: any; getStatusIcon: any }> = ({ booking, statusConfig, getStatusIcon }) => {
  const StatusIcon = getStatusIcon(booking.status);
  const status = statusConfig[booking.status];

  return (
    <div className="bg-[#333B46]/70 backdrop-blur-sm p-2.5 rounded-lg mb-2">
      <div className="flex items-start justify-between space-x-2">
        <div className="flex items-center space-x-2.5 flex-1 min-w-0">
          <div className="flex flex-col items-center justify-center w-11 h-11 bg-yellow-500/10 rounded-md flex-shrink-0">
            <span className="text-lg font-bold text-yellow-400">{booking.time.split(':')[0]}</span>
            <span className="text-xs text-yellow-500 -mt-1">{booking.time.split(':')[1]}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-white truncate">{booking.customer}</h3>
            <p className="text-xs text-gray-300 truncate">{booking.service}</p>
            <div className={`flex items-center space-x-1.5 text-xs mt-1 ${status?.color}`}>
                <StatusIcon className="w-3 h-3" />
                <span>{status?.label}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end justify-start h-full space-y-1">
            <p className="text-sm font-bold text-green-400 whitespace-nowrap">{booking.price}</p>
            <button className="p-1 text-gray-400 hover:text-white">
                <MoreVertical className="w-4 h-4" />
            </button>
        </div>
      </div>
    </div>
  );
};


const AdminBookings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const bookings: Booking[] = [
    {
      id: 1,
      customer: 'Ion Popescu',
      service: 'Tuns clasic',
      barber: 'Mihai',
      date: '2025-09-17',
      time: '10:00',
      duration: '30 min',
      price: '80 RON',
      status: 'confirmed'
    },
    {
      id: 2,
      customer: 'Maria Ionescu',
      service: 'Tuns + barba',
      barber: 'Andrei',
      date: '2025-09-17',
      time: '11:00',
      duration: '45 min',
      price: '120 RON',
      status: 'confirmed'
    },
    {
      id: 3,
      customer: 'Elena Dumitrescu',
      service: 'Vopsit păr',
      barber: 'Elena',
      date: '2025-09-17',
      time: '14:00',
      duration: '90 min',
      price: '250 RON',
      status: 'pending'
    },
    {
      id: 4,
      customer: 'Mihai Radu',
      service: 'Ras clasic',
      barber: 'Mihai',
      date: '2025-09-18',
      time: '09:30',
      duration: '20 min',
      price: '50 RON',
      status: 'completed'
    },
    {
      id: 5,
      customer: 'Andrei Georgescu',
      service: 'Tuns sport',
      barber: 'Andrei',
      date: '2025-09-18',
      time: '15:30',
      duration: '25 min',
      price: '70 RON',
      status: 'cancelled'
    },
  ];

  const filteredBookings = bookings.filter(booking => 
    (booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.service.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterStatus === 'all' || booking.status === filterStatus)
  );

  const statusConfig = {
    confirmed: { color: 'text-green-400', label: 'Programat' },
    completed: { color: 'text-blue-400', label: 'Finalizat' },
    cancelled: { color: 'text-red-400', label: 'Anulat' },
    pending: { color: 'text-yellow-400', label: 'Așteptare' },
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return CheckCircle;
      case 'pending': return Clock;
      case 'completed': return CheckCircle;
      case 'cancelled': return XCircle;
      default: return Clock;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#1A2331] text-white">
      <AdminSidebar />
      <div className="admin-content flex-1 pt-4 pb-20">
        <div className="p-2 md:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl md:text-3xl font-bold text-white">Rezervări</h1>
              <p className="text-sm text-gray-300 hidden md:block">Gestionează programările clienților și programul</p>
            </div>
            <button className="flex-shrink-0 flex items-center space-x-2 px-3 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 rounded-lg text-yellow-400 transition-colors">
              <Plus className="w-5 h-5" />
              <span className="inline text-xs">Programare nouă</span>
            </button>
          </div>

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
                      {['all', 'confirmed', 'pending', 'completed', 'cancelled'].map(tab => (
                          <button
                              key={tab}
                              onClick={() => setFilterStatus(tab)}
                              className={`px-1 py-1 text-xs rounded-lg transition-colors whitespace-nowrap ${
                                  filterStatus === tab
                                  ? 'bg-yellow-500/20 text-yellow-400'
                                  : 'text-gray-300 hover:bg-gray-700/50'
                              }`}
                          >
                              {statusConfig[tab as keyof typeof statusConfig]?.label || 'Toate'}
                          </button>
                      ))}
                  </div>
              </div>
          </div>

          {/* Bookings Mobile View */}
          <div className="md:hidden">
            {filteredBookings.map(booking => (
              <BookingCard key={booking.id} booking={booking} statusConfig={statusConfig} getStatusIcon={getStatusIcon} />
            ))}
          </div>

          {/* Bookings Table Desktop View */}
          <div className="hidden md:block table-card">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-300">Client</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-300">Serviciu</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-300">Frizer</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-300">Dată & Oră</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-300">Status</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-300">Acțiuni</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => {
                    const StatusIcon = getStatusIcon(booking.status);
                    const status = statusConfig[booking.status];
                    return (
                      <tr key={booking.id} className="border-b border-gray-700 hover:bg-gray-700/30 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {booking.customer.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium text-white">{booking.customer}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-white font-medium">{booking.service}</div>
                          <div className="text-gray-400 text-xs">{booking.duration}</div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-xs">
                            {booking.barber}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-gray-300">{booking.date}</div>
                          <div className="text-white font-medium">{booking.time}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className={`flex items-center space-x-2 text-xs font-medium ${status?.color}`}>
                            <StatusIcon className="w-4 h-4" />
                            <span>{status?.label}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <button className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                            <button className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {filteredBookings.length === 0 && (
              <div className="text-center py-12 dark-glass-card">
                <Calendar className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Nicio rezervare găsită</h3>
                <p className="text-gray-400">Încearcă să modifici criteriile de căutare.</p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;
