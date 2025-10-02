import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../contexts/LoginContext';
import { getUserStats, getBookings } from '../services/supabaseService';
import ServiceCard from '../components/ServiceCard';
import ReservationCard from '../components/ReservationCard';
import { Scissors, Crown, Palette, Clock } from 'lucide-react';

const HomePage = () => {
  const { user } = useLogin();
  const userName = user?.name || 'vizitator';

  const [userStats, setUserStats] = useState({
    totalBookings: 0,
    totalSpent: 0,
    preferredService: 'N/A',
    lastVisit: 'N/A',
  });

  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchStatsAndBookings = async () => {
        try {
          const bookings = await getBookings(user.id);
          if (bookings) {
            const totalBookings = bookings.length;
            const totalSpent = bookings.reduce((acc, booking) => acc + booking.service_price, 0);

            let preferredService = 'N/A';
            if (totalBookings > 0) {
              const serviceCounts = bookings.reduce((acc, booking) => {
                acc[booking.service_name] = (acc[booking.service_name] || 0) + 1;
                return acc;
              }, {} as Record<string, number>);
              preferredService = Object.keys(serviceCounts).reduce((a, b) => serviceCounts[a] > serviceCounts[b] ? a : b);
            }

            let lastVisit = 'N/A';
            if (totalBookings > 0) {
              const visitDate = new Date(bookings[0].date);
              const today = new Date();
              
              // Set time to 0 to compare dates only
              visitDate.setHours(0, 0, 0, 0);
              today.setHours(0, 0, 0, 0);

              const diffTime = Math.abs(today.getTime() - visitDate.getTime());
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

              if (diffDays === 0) {
                lastVisit = 'Astăzi';
              } else if (diffDays === 1) {
                lastVisit = 'Ieri';
              } else {
                lastVisit = `Acum ${diffDays} zile`;
              }
            }

            setUserStats({ totalBookings, totalSpent, preferredService, lastVisit });
            setRecentBookings(bookings.slice(0, 1));
          }
        } catch (error) {
          console.error('Error fetching user stats and bookings:', error);
        }
      };

      fetchStatsAndBookings();
    }
  }, [user]);

  const getStatusClass = (status: string) => {
    if (status === 'Confirmat') return 'bg-green-100 text-green-700';
    if (status === 'Programat') return 'bg-blue-100 text-blue-700';
    if (status === 'Completat') return 'bg-gray-100 text-gray-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  const handleCancelBooking = async (bookingId: number) => {
    // This function would need to be implemented to actually cancel the booking
    console.log('Cancel booking:', bookingId);
  };

  const popularServices = [
    { 
      icon: Scissors, 
      title: 'Tuns Clasic', 
      description: 'Tuns modern cu foarfeca și mașina de tuns', 
      price: '50 RON', 
      duration: '30 min' 
    },
    { 
      icon: Crown, 
      title: 'Pachet Premium', 
      description: 'Tuns + barbierit + styling complet', 
      price: '120 RON', 
      duration: '60 min' 
    },
    { 
      icon: Palette, 
      title: 'Colorare Par', 
      description: 'Colorare profesională cu produse de calitate', 
      price: '80 RON', 
      duration: '45 min' 
    },
  ];

  return (
    <div className="min-h-screen bg-[#1A2331] text-gray-800 pt-18 pb-20">
      <section className="py-6">
        <div className="dark-glass-card mx-md h-70 max-w-4xl p-6 flex flex-col justify-center">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Bună, <br/><span className='text-yellow-500'> {userName}! </span>
              </h1>
              <p className="text-gray-200 mt-4">Pregătit pentru următoarea programare?</p>
            </div>
            <Link
              to="/booking"
              className="px-6 py-3 text-base book-btn"
            >
              Rezervă acum
            </Link>
          </div>
        </div>
      </section>

      <section className="py-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 mx-md sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="dark-glass-card2 text-center hover:shadow-xl transition-shadow items-center justify-center flex flex-col">
              <h1 className="text-lg font-bold text-gold">{userStats.totalBookings}</h1>
              <div className="light-glass-icon2 mt-2">
                <h3 className="text-[12px] font-semibold text-gray-200 ">Total Rezervări</h3>
              </div>
            </div>
            <div className="dark-glass-card2 text-center hover:shadow-xl transition-shadow items-center justify-center flex flex-col">
              <h1 className="text-lg font-bold text-green-600">{userStats.totalSpent} RON</h1>
              <div className="light-glass-icon2 mt-2">
                <h3 className="text-[12px] font-semibold text-gray-200 ">Cheltuit</h3>
              </div>
            </div>
            <div className="dark-glass-card2 text-center hover:shadow-xl transition-shadow items-center justify-center flex flex-col">
              <h1 className="text-lg font-bold text-yellow-400">{userStats.preferredService}</h1>
              <div className="light-glass-icon2 mt-2">
                <h3 className="text-[12px] font-semibold text-gray-200">Serviciu preferat</h3>
              </div>
            </div>
            <div className="dark-glass-card2 text-center hover:shadow-xl transition-shadow items-center justify-center flex flex-col">
              <h1 className="text-lg font-bold text-gray-300">{userStats.lastVisit}</h1>
              <div className="light-glass-icon2 mt-2">
                <h3 className="text-[12px] font-semibold text-gray-200">Ultima Vizită</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-6xl mx-auto">
          <div className="dark-glass-card mx-md">
            <h2 className="text-2xl font-bold text-white mb-6 text-left ml-2">Servicii Populare</h2>
            <div className="grid grid-cols-1 gap-4">
              {popularServices.map((service, index) => {
                const IconComponent = service.icon
                return (
                  <div key={index} className="light-glass-card flex rounded-xl hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center mb-2">
                      <div className="light-glass-icon bg-yellow-500/20 rounded-full mr-3">
                        <IconComponent className="w-5 h-5 text-yellow-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-white mb-1">{service.title}</h3>
                        <p className="text-lg font-bold text-yellow-400">{service.price}</p>
                        <p className="text-xs text-gray-400">{service.duration}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-4xl mx-auto">
          <div className="dark-glass-card mx-md rounded-xl overflow-hidden flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold text-white mb-4 text-center">📅 Rezervările Tale</h2>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <ReservationCard
                  key={booking.id}
                  booking={{
                    id: booking.id,
                    service: booking.service_name,
                    date: `${new Date(booking.date).toLocaleDateString()}, ${booking.time}`,
                    barber: 'N/A',
                    status: 'Confirmat',
                    price: `${booking.service_price} RON`
                  }}
                  type="current"
                  onCancel={handleCancelBooking}
                  getStatusClass={getStatusClass}
                />
              ))}
            </div>
              <div className=" mt-6">
                <Link
                  to="/historic"
                  className="px-6 py-3 text-base book-btn-inverse"
                >
                  <button>Programări recente 🕦</button>
                </Link>
              </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;