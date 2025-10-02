import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { 
  Settings as SettingsIcon, 
  User as UserIcon, 
  Bell, 
  Clock, 
  Save, 
  Edit, 
  Trash2, 
  Plus, 
  Mail, 
  Lock
} from 'lucide-react';

// Types
interface UserType {
  id: number;
  name: string;
  email: string;
  role: 'Client' | 'Admin' | 'Barber' | 'Receptionist';
  status: 'active' | 'inactive';
  lastLogin: string;
}
interface BusinessSettingsType {
  general: {
    businessName: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    taxId: string;
  };
  workingHours: {
    monday: { open: string; close: string; enabled: boolean };
    tuesday: { open: string; close: string; enabled: boolean };
    wednesday: { open: string; close: string; enabled: boolean };
    thursday: { open: string; close: string; enabled: boolean };
    friday: { open: string; close: string; enabled: boolean };
    saturday: { open: string; close: string; enabled: boolean };
    sunday: { open: string; close: string; enabled: boolean };
  };
  users: UserType[];
}

const roleColors: Record<UserType['role'], string> = {
  Admin: 'text-purple-400',
  Barber: 'text-blue-400',
  Receptionist: 'text-green-400',
  Client: 'text-gray-400'
};

const statusColors: Record<UserType['status'], string> = {
  active: 'text-green-400',
  inactive: 'text-red-400',
};

// Re-usable component for a single setting item
const SettingItem: React.FC<{ label: string; children: React.ReactNode; }> = ({ label, children }) => (
  <div>
    <label className="block text-xs font-medium text-gray-400 mb-0.5">{label}</label>
    {children}
  </div>
);

// User Card for mobile view in User Management tab
const UserSettingCard: React.FC<{ user: UserType }> = ({ user }) => (
  <div className="bg-[#333B46]/70 backdrop-blur-sm p-2 rounded-lg mb-1.5 text-xs">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-1.5 flex-1 min-w-0">
        <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xs font-semibold">{user.name.split(' ').map(n => n[0]).join('')}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-white truncate">{user.name}</p>
          <p className="text-xxs text-gray-400 truncate">{user.email}</p>
        </div>
      </div>
      <div className="flex flex-col items-end space-y-0.5">
        <span className={`px-1.5 py-0.5 rounded-full text-xxs font-medium ${roleColors[user.role]}`}>{user.role}</span>
        <span className={`px-1.5 py-0.5 rounded-full text-xxs font-medium ${statusColors[user.status]}`}>{user.status === 'active' ? 'Activ' : 'Inactiv'}</span>
      </div>
    </div>
  </div>
);

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');

  const businessSettings: BusinessSettingsType = {
    general: {
      businessName: 'Barbershop Elite',
      address: 'Str. Principală 123, București, România',
      phone: '+40 721 123 456',
      email: 'contact@barbershopelite.ro',
      website: 'www.barbershopelite.ro',
      taxId: 'RO12345678'
    },
    workingHours: {
      monday: { open: '09:00', close: '19:00', enabled: true },
      tuesday: { open: '09:00', close: '19:00', enabled: true },
      wednesday: { open: '09:00', close: '19:00', enabled: true },
      thursday: { open: '09:00', close: '19:00', enabled: true },
      friday: { open: '09:00', close: '20:00', enabled: true },
      saturday: { open: '10:00', close: '18:00', enabled: true },
      sunday: { open: 'closed', close: 'closed', enabled: false }
    },
    users: [
      { id: 1, name: 'Andrei Georgescu', role: 'Admin', email: 'admin@barbershop.ro', status: 'active', lastLogin: '2025-09-16' },
      { id: 2, name: 'Mihai Popescu', role: 'Barber', email: 'mihai@barbershop.ro', status: 'active', lastLogin: '2025-09-15' },
      { id: 3, name: 'Elena Ionescu', role: 'Barber', email: 'elena@barbershop.ro', status: 'active', lastLogin: '2025-09-14' },
      { id: 4, name: 'Ioana Marin', role: 'Receptionist', email: 'ioana@barbershop.ro', status: 'inactive', lastLogin: '2025-09-10' }
    ],
  };

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'hours', label: 'Program', icon: Clock },
    { id: 'notifications', label: 'Notificări', icon: Bell },
    { id: 'users', label: 'Utilizatori', icon: UserIcon },
    { id: 'system', label: 'Sistem', icon: SettingsIcon }
  ];

  const renderGeneralSettings = () => (
    <div className="space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <SettingItem label="Nume afacere">
          <div className="flex items-center justify-between p-1.5 bg-gray-700/30 rounded-lg">
            <span className="text-xs text-white">{businessSettings.general.businessName}</span>
            <button className="p-0.5 text-yellow-400 hover:text-yellow-300"><Edit className="w-3 h-3" /></button>
          </div>
        </SettingItem>
        <SettingItem label="Telefon">
          <div className="flex items-center justify-between p-1.5 bg-gray-700/30 rounded-lg">
            <span className="text-xs text-white">{businessSettings.general.phone}</span>
            <button className="p-0.5 text-yellow-400 hover:text-yellow-300"><Edit className="w-3 h-3" /></button>
          </div>
        </SettingItem>
        <SettingItem label="Email">
          <div className="flex items-center justify-between p-1.5 bg-gray-700/30 rounded-lg">
            <span className="text-xs text-white">{businessSettings.general.email}</span>
            <button className="p-0.5 text-yellow-400 hover:text-yellow-300"><Edit className="w-3 h-3" /></button>
          </div>
        </SettingItem>
        <SettingItem label="Adresă">
          <div className="flex items-center justify-between p-1.5 bg-gray-700/30 rounded-lg">
            <span className="text-xs text-white">{businessSettings.general.address}</span>
            <button className="p-0.5 text-yellow-400 hover:text-yellow-300"><Edit className="w-3 h-3" /></button>
          </div>
        </SettingItem>
      </div>
    </div>
  );

  const renderWorkingHours = () => (
    <div className="space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {Object.entries(businessSettings.workingHours).map(([day, hours]) => (
          <div key={day} className="p-1.5 border border-gray-700 rounded-lg">
            <h4 className="font-semibold text-white text-xs mb-0.5 capitalize">{day}</h4>
            <div className="flex items-center space-x-1.5">
                <select className="w-full px-1.5 py-0.5 bg-[#2a3441]/50 border border-gray-600 rounded-lg text-white text-xs focus:outline-none focus:border-yellow-400">
                  <option value="yes">Deschis</option>
                  <option value="no">Închis</option>
                </select>
                <input type="time" defaultValue="09:00" className="w-full px-1.5 py-0.5 bg-[#2a3441]/50 border border-gray-600 rounded text-white text-xs" />
                <input type="time" defaultValue="19:00" className="w-full px-1.5 py-0.5 bg-[#2a3441]/50 border border-gray-600 rounded text-white text-xs" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-gray-400 mb-1">Canale</h4>
          <label className="flex items-center space-x-1.5 p-1.5 bg-gray-700/30 rounded-lg">
            <input type="checkbox" checked className="rounded text-blue-500 w-3.5 h-3.5" />
            <div>
              <div className="font-medium text-white text-xs">Email automat</div>
              <div className="text-xxs text-gray-400">Confirmări, remindere</div>
            </div>
          </label>
          <label className="flex items-center space-x-1.5 p-1.5 bg-gray-700/30 rounded-lg">
            <input type="checkbox" className="rounded text-blue-500 w-3.5 h-3.5" />
            <div>
              <div className="font-medium text-white text-xs">SMS (Twilio)</div>
              <div className="text-xxs text-gray-400">Notificări importante</div>
            </div>
          </label>
        </div>
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-gray-400 mb-1">Timing</h4>
          <SettingItem label="Reminder programări (ore înainte)">
            <select className="w-full px-1.5 py-0.5 bg-[#2a3441]/50 border border-gray-600 rounded-lg text-white text-xs focus:outline-none focus:border-yellow-400">
              <option>24 ore</option>
              <option>12 ore</option>
            </select>
          </SettingItem>
          <label className="flex items-center space-x-1.5">
            <input type="checkbox" checked className="rounded text-blue-500 w-3.5 h-3.5" />
            <span className="text-xs text-gray-300">Confirmare automată</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-semibold text-white">Utilizatori</h3>
        <button className="flex items-center space-x-1 px-2 py-1 bg-yellow-500/20 hover:bg-yellow-500/30 rounded-lg text-yellow-400 transition-colors">
          <Plus className="w-3.5 h-3.5" />
          <span className="text-xs">Adaugă</span>
        </button>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        {businessSettings.users.map(user => <UserSettingCard key={user.id} user={user} />)}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block table-card">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="p-2 text-left font-semibold text-gray-300">Nume</th>
                <th className="p-2 text-left font-semibold text-gray-300">Rol</th>
                <th className="p-2 text-left font-semibold text-gray-300">Email</th>
                <th className="p-2 text-left font-semibold text-gray-300">Status</th>
                <th className="p-2 text-right font-semibold text-gray-300">Acțiuni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {businessSettings.users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-700/30">
                  <td className="p-2">
                    <div className="flex items-center space-x-1.5">
                      <div className="w-7 h-7 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-semibold">{user.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <div className="font-medium text-white text-xs whitespace-nowrap">{user.name}</div>
                    </div>
                  </td>
                  <td className="p-2">
                    <span className={`px-1.5 py-0.5 rounded-full text-xxs font-medium ${roleColors[user.role]}`}>{user.role}</span>
                  </td>
                  <td className="p-2 text-gray-300 text-xs">{user.email}</td>
                  <td className="p-2">
                    <span className={`px-1.5 py-0.5 rounded-full text-xxs font-medium ${statusColors[user.status]}`}>{user.status === 'active' ? 'Activ' : 'Inactiv'}</span>
                  </td>
                  <td className="p-2 text-right">
                    <div className="flex items-center justify-end space-x-0.5">
                      <button className="p-1 text-gray-400 hover:text-blue-400 rounded-lg"><Edit className="w-3.5 h-3.5" /></button>
                      <button className="p-1 text-gray-400 hover:text-red-400 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-gray-400 mb-1">Localizare</h4>
          <SettingItem label="Limba interfață">
            <select className="w-full px-1.5 py-0.5 bg-[#2a3441]/50 border border-gray-600 rounded-lg text-white text-xs focus:outline-none focus:border-yellow-400">
              <option>Română</option>
              <option>English</option>
            </select>
          </SettingItem>
          <SettingItem label="Fus orar">
            <select className="w-full px-1.5 py-0.5 bg-[#2a3441]/50 border border-gray-600 rounded-lg text-white text-xs focus:outline-none focus:border-yellow-400">
              <option>Europe/Bucharest</option>
              <option>Europe/London</option>
            </select>
          </SettingItem>
        </div>
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-gray-400 mb-1">Format date</h4>
          <SettingItem label="Format dată">
            <select className="w-full px-1.5 py-0.5 bg-[#2a3441]/50 border border-gray-600 rounded-lg text-white text-xs focus:outline-none focus:border-yellow-400">
              <option>DD.MM.YYYY</option>
              <option>MM/DD/YYYY</option>
            </select>
          </SettingItem>
          <SettingItem label="Format oră">
            <select className="w-full px-1.5 py-0.5 bg-[#2a3441]/50 border border-gray-600 rounded-lg text-white text-xs focus:outline-none focus:border-yellow-400">
              <option>24h (14:30)</option>
              <option>12h (2:30 PM)</option>
            </select>
          </SettingItem>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#1A2331] text-white">
      <AdminSidebar />
      <div className="admin-content flex-1 pt-4 pb-20">
        <div className="p-1 md:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-lg md:text-3xl font-bold text-white">Setări</h1>
              <p className="text-xs text-gray-300 hidden md:block">Configurează afacerea și preferințele</p>
            </div>
            <button className="flex-shrink-0 flex items-center space-x-0.5 px-2 py-1 bg-yellow-500/20 hover:bg-yellow-500/30 rounded-lg text-yellow-400 transition-colors">
              <Save className="w-3.5 h-3.5" />
              <span className="hidden md:inline text-xs">Salvează</span>
            </button>
          </div>

          {/* Tabs Navigation */}
          <div className="mb-3">
            <div className="flex space-x-0.5 overflow-x-auto pb-0.5">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-0.5 px-2 py-1 rounded-lg transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="dark-glass-card p-2 md:p-6">
            {activeTab === 'general' && renderGeneralSettings()}
            {activeTab === 'hours' && renderWorkingHours()}
            {activeTab === 'notifications' && renderNotificationSettings()}
            {activeTab === 'users' && renderUserManagement()}
            {activeTab === 'system' && renderSystemSettings()}
            {/* Payment and Security tabs are omitted for brevity in this example */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;