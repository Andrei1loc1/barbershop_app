import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../contexts/LoginContext';
import { getBookings } from '../services/supabaseService';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import ReservationCard from '../components/ReservationCard';
import { Calendar, Clock } from 'lucide-react';

interface Booking {
  id: number;
  service_name: string;
  date: string;
  time: string;
  service_price: number;
}

const HistoryPage = () => {
  const { user } = useLogin();
  const [currentBookings, setCurrentBookings] = useState<Booking[]>([]);
  const [pastBookings, setPastBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (user) {
        try {
          const bookings = await getBookings(user.id);
          if (bookings) {
            const now = new Date();
            const current = bookings.filter(b => new Date(b.date) >= now);
            const past = bookings.filter(b => new Date(b.date) < now);
            setCurrentBookings(current as Booking[]);
            setPastBookings(past as Booking[]);
          }
        } catch (error) {
          console.error('Error fetching bookings:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchBookings();
  }, [user]);

  const handleCancelBooking = (bookingId: number) => {
    if (window.confirm('Ești sigur că vrei să anulezi această programare?')) {
      // Here you would add the logic to cancel the booking in the database
      // For now, we just remove it from the local state
      setCurrentBookings(prev => prev.filter(booking => booking.id !== bookingId));
      alert('Programarea a fost anulată cu succes!');
    }
  };

  const getStatusClass = (status: string) => {
    if (status === 'Confirmat') return 'bg-green-100 text-green-700';
    if (status === 'Programat') return 'bg-blue-100 text-blue-700';
    if (status === 'Completat') return 'bg-gray-100 text-gray-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  return (
    <div className="min-h-screen bg-[#1A2331] text-gray-800 pt-16 pb-20">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <div className="mb-8 flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Istoric <span className='text-yellow-500'>Programări</span></h1>
          <p className="text-gray-300 mx-12">Gestionează rezervările tale actuale și vezi istoricul</p>
        </div>

        {isLoading ? (
          <div className="text-center text-white">Loading bookings...</div>
        ) : (
          <>
            <section className="mb-12">
              <div className="dark-glass-card mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Calendar className="w-6 h-6 text-yellow-400" />
                  <h2 className="text-2xl font-bold text-white">Programări Actuale</h2>
                </div>
                {currentBookings.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-400 mb-4">Nu ai programări active momentan.</p>
                    <Link to="/booking" className="book-btn px-6 py-3">
                      Rezervă acum
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {currentBookings.map((booking) => (
                      <ReservationCard
                        key={booking.id}
                        booking={{
                          id: booking.id,
                          service: booking.service_name,
                          date: `${new Date(booking.date).toLocaleDateString()}, ${booking.time}`,
                          barber: 'N/A', // You might want to add barber to your bookings table
                          status: 'Confirmat',
                          price: `${booking.service_price} RON`
                        }}
                        type="current"
                        onCancel={handleCancelBooking}
                        getStatusClass={getStatusClass}
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>

            <section>
              <div className="dark-glass-card">
                <div className="flex items-center space-x-3 mb-6">
                  <Clock className="w-6 h-6 text-yellow-400" />
                  <h2 className="text-2xl font-bold text-white">Programări Trecute</h2>
                </div>
                <div className="space-y-4">
                  {pastBookings.map((booking) => (
                    <ReservationCard
                      key={booking.id}
                      booking={{
                        id: booking.id,
                        service: booking.service_name,
                        date: `${new Date(booking.date).toLocaleDateString()}, ${booking.time}`,
                        barber: 'N/A', // You might want to add barber to your bookings table
                        status: 'Completat',
                        price: `${booking.service_price} RON`
                      }}
                      type="past"
                      getStatusClass={getStatusClass}
                    />
                  ))}
                </div>
                {pastBookings.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    Nu ai programări trecute.
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default HistoryPage;