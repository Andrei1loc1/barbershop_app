import React, { useState, useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Users, Calendar, Scissors, BarChart3, Settings, LogOut, Home, Menu, X
} from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  path: string;
}

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    if (isCollapsed) {
      document.body.classList.add('sidebar-collapsed');
    } else {
      document.body.classList.remove('sidebar-collapsed');
    }
    // Cleanup function to remove the class when the component unmounts
    return () => {
      document.body.classList.remove('sidebar-collapsed');
    };
  }, [isCollapsed]);

  const sidebarItems: SidebarItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { id: 'users', label: 'Utilizatori', icon: Users, path: '/admin/users' },
    { id: 'bookings', label: 'Rezervări', icon: Calendar, path: '/admin/bookings' },
    { id: 'services', label: 'Servicii', icon: Scissors, path: '/admin/services' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
    { id: 'settings', label: 'Setări', icon: Settings, path: '/admin/settings' },
  ];

  const getActiveSection = () => {
    const currentPath = location.pathname;
    const item = sidebarItems.find(item => item.path === currentPath);
    return item ? item.id : 'dashboard';
  };

  const activeSection = getActiveSection();

  return (
    <div className={`fixed left-0 top-0 h-full bg-gradient-to-b from-[#1A2331] to-[#0f1419] z-50 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-12' : 'w-64'}`}>
      {/* Header and Toggle */}
      <div className={`p-4 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        {!isCollapsed && (
          <div className="flex items-center space-x-3 flex-1">
            <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-black" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Admin</h2>
            </div>
          </div>
        )}
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2 text-gray-400 hover:text-white">
          {isCollapsed ? <Menu /> : <X />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="p-2 pt-4">
        <ul className="space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={`group flex items-center p-2 rounded-lg transition-all duration-200 ${isActive ? 'bg-yellow-500/10 text-yellow-400' : 'text-gray-300 hover:bg-gray-700/50'} ${isCollapsed ? 'justify-center' : 'space-x-3'}`}
                title={item.label} // Show label on hover when collapsed
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-yellow-400' : 'text-gray-400 group-hover:text-gray-200'}`} />
                {!isCollapsed && <span className="font-medium whitespace-nowrap text-sm">{item.label}</span>}
              </NavLink>
            );
          })}
        </ul>
      </nav>

      {/* Footer Actions */}
      <div className="absolute bottom-0 left-0 right-0 p-2">
        <button className={`w-full flex items-center p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="font-medium whitespace-nowrap text-sm">Deconectare</span>}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
