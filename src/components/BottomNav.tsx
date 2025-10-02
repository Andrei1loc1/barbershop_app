import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Calendar, History, User } from 'lucide-react';
import { useLogin } from '../contexts/LoginContext';

const BottomNav: React.FC = () => {
  const { isLoggedIn } = useLogin();
  const navigate = useNavigate();
  const location = useLocation();

  if (!isLoggedIn) return null;

  const navItems = [
    { 
      id: 'home', 
      label: 'Home', 
      icon: Home, 
      path: '/dashboard', 
      active: location.pathname === '/dashboard'
    },
    { 
      id: 'book', 
      label: 'Book', 
      icon: Calendar, 
      path: '/booking', 
      active: location.pathname === '/booking'
    },
    { 
      id: 'historic', 
      label: 'Historic', 
      icon: History, 
      path: '/historic', 
      active: location.pathname === '/historic'
    },
    { 
      id: 'profile', 
      label: 'Profile', 
      icon: User, 
      path: '/profile', 
      active: location.pathname === '/profile'
    },
  ];

  // Only show BottomNav on authenticated routes
  const isAuthenticatedRoute = ['/dashboard', '/booking', '/historic', '/profile'].includes(location.pathname);
  if (!isLoggedIn || !isAuthenticatedRoute) return null;

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#040506] backdrop-blur-md p-2 rounded-4xl mx-1 mb-1" style={{ boxShadow: '0 40px 45px 0 rgba(0, 0, 0, 0.9)' }}>
      <div className="max-w-sm mx-auto">
        <div className="flex items-center justify-center space-x-7">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.path)}
                className={`
                  flex flex-col items-center p-1 rounded-xl transition-all duration-200 group
                  ${item.active 
                    ? ' shadow-md scale-90' 
                    : 'hover:bg-white/10 hover:scale-95'
                  }
                `}
              >
                <Icon 
                  size={22} 
                  className={`
                    mb-1 transition-transform duration-200 mx-3
                    ${item.active ? 'text-yellow-400 scale-120' : 'text-gray-300 group-hover:text-gray-200'}
                  `}
                />
                <span className={`text-xs font-medium leading-tight mx-1 ${
                  item.active ? 'text-yellow-300' : 'text-gray-400 group-hover:text-gray-200'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
