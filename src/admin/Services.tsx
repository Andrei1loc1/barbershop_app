import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { 
  Scissors, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Tag,
  MoreVertical
} from 'lucide-react';

// Define types
interface Service {
  id: number;
  name: string;
  category: 'Tuns' | 'Barba' | 'Coafor';
  price: string;
  duration: string;
  description: string;
}

const categoryColors: Record<Service['category'], string> = {
  'Tuns': 'text-blue-400',
  'Barba': 'text-indigo-400',
  'Coafor': 'text-purple-400'
};

// Mobile Service Card Component
const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  return (
    <div className="bg-[#333B46]/70 backdrop-blur-sm p-3 rounded-lg mb-2">
      <div className="flex items-start justify-between space-x-3">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Scissors className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-white truncate">{service.name}</h3>
            <p className={`text-xs font-medium ${categoryColors[service.category]}`}>{service.category}</p>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-1">
          <p className="text-sm font-bold text-green-400 whitespace-nowrap">{service.price}</p>
          <p className="text-xs text-gray-400 whitespace-nowrap">{service.duration}</p>
        </div>
      </div>
    </div>
  );
};

const AdminServices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const services: Service[] = [
    { id: 1, name: 'Tuns clasic', category: 'Tuns', price: '80 RON', duration: '30 min', description: 'Tuns clasic pentru toate tipurile de păr' },
    { id: 2, name: 'Tuns + barba', category: 'Tuns', price: '120 RON', duration: '45 min', description: 'Tuns complet cu conturare barbă inclusă' },
    { id: 3, name: 'Ras clasic', category: 'Barba', price: '50 RON', duration: '20 min', description: 'Ras tradițional cu pensulă și lamă' },
    { id: 4, name: 'Vopsit păr', category: 'Coafor', price: '250 RON', duration: '90 min', description: 'Vopsire profesională cu produse premium' },
  ];

  const filteredServices = services.filter(service => 
    (service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterCategory === 'all' || service.category === filterCategory)
  );

  const categories = ['all', 'Tuns', 'Barba', 'Coafor'];

  return (
    <div className="flex min-h-screen bg-[#1A2331] text-white">
      <AdminSidebar />
      <div className="admin-content flex-1 pt-4 pb-20">
        <div className="p-2 md:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl md:text-3xl font-bold text-white">Servicii</h1>
              <p className="text-sm text-gray-300 hidden md:block">Gestionează serviciile oferite și prețurile</p>
            </div>
            <button className="flex-shrink-0 flex items-center space-x-2 px-3 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 rounded-lg text-yellow-400 transition-colors">
              <Plus className="w-4 h-4" />
              <span className="inline text-sm">Serviciu nou</span>
            </button>
          </div>

          {/* Filters and Search */}
          <div className="bg-[#333B46]/70 backdrop-blur-sm p-2 mb-3 rounded-xl">
            <div className="flex flex-col md:flex-row gap-2 items-center">
              <div className="relative flex-1 w-full md:w-auto">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Caută serviciu..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-7 pr-4 py-1 bg-[#2a3441]/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors text-sm"
                />
              </div>
              <div className="flex space-x-1.5 overflow-x-auto pb-1 w-full md:w-auto">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-2.5 py-1 text-xs rounded-lg transition-colors whitespace-nowrap ${
                      filterCategory === cat
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile View */}
          <div className="md:hidden">
            {filteredServices.map(service => <ServiceCard key={service.id} service={service} />)}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block table-card">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="p-3 text-left font-semibold text-gray-300">Serviciu</th>
                    <th className="p-3 text-left font-semibold text-gray-300">Categorie</th>
                    <th className="p-3 text-left font-semibold text-gray-300">Preț</th>
                    <th className="p-3 text-left font-semibold text-gray-300">Durată</th>
                    <th className="p-3 text-right font-semibold text-gray-300">Acțiuni</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filteredServices.map((service) => (
                    <tr key={service.id} className="hover:bg-gray-700/30">
                      <td className="p-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Scissors className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-white whitespace-nowrap">{service.name}</div>
                            <div className="text-gray-400 text-xs truncate max-w-xs">{service.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[service.category]}`}>{service.category}</span>
                      </td>
                      <td className="p-3 font-medium text-green-400 whitespace-nowrap">{service.price}</td>
                      <td className="p-3 text-gray-300 whitespace-nowrap">{service.duration}</td>
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

          {filteredServices.length === 0 && (
            <div className="text-center py-12 dark-glass-card">
              <Scissors className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Niciun serviciu găsit</h3>
              <p className="text-gray-400">Încearcă să modifici criteriile de căutare.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminServices;