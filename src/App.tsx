import React from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import HeroSection from './sections/HeroSection'
import ServicesSection from './sections/ServicesSection'
import Gallery from './sections/Gallery'
import Contact from './sections/Contact'
import HomePage from './sections/HomePage'
import OnboardingPage from './pages/OnboardingPage'
import HistoryPage from './sections/HistoryPage'
import ProfilePage from './sections/ProfilePage'
import AdminDashboard from './admin/Dashboard'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BottomNav from './components/BottomNav'
import BookingPage from './sections/BookingPage'
import ProtectedRoute from './components/ProtectedRoute'
import Users from './admin/Users'
import Bookings from './admin/Bookings'
import Services from './admin/Services'
import Finances from './admin/Finances'
import Analytics from './admin/Analytics'
import Settings from './admin/Settings'
import Dashboard from './admin/Dashboard'
import Particles from './components/Particles'


const App = () => {
  const location = useLocation()
  const isAuthenticatedRoute = ['/booking', '/historic', '/profile', '/dashboard', '/home'].includes(location.pathname)
  const isAdminRoute = location.pathname.startsWith('/admin')
  const isOnboarding = location.pathname === '/'
  const isHomepage = location.pathname === '/home'

  return (
    <main className="min-h-screen bg-[#1A2331]">
      {!isAdminRoute && !isOnboarding && <Navbar />}
      <Routes>
        
        <Route path="/" element={<OnboardingPage />} />
        <Route path="/home" element={
          <>
            <HeroSection />
            <ServicesSection />
            <Gallery />
            <Contact />
          </>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/bookings" element={<Bookings />} />
        <Route path="/admin/services" element={<Services />} />
        <Route path="/admin/analytics" element={<Analytics />} />
        <Route path="/admin/finances" element={<Finances />} />
        <Route path="/admin/settings" element={<Settings />} />
        <Route path="/booking" element={
          <ProtectedRoute>
            <BookingPage />
          </ProtectedRoute>
        } />
        <Route path="/historic" element={
          <ProtectedRoute>
            <HistoryPage />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="*" element={
          <div className="min-h-screen bg-[#1A2331] flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-3xl font-bold mb-4">Pagină negăsită</h1>
              <Link to="/" className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition-colors">
                Înapoi acasă
              </Link>
            </div>
          </div>
        } />
      </Routes>
      {!isAdminRoute && !isOnboarding && <BottomNav />}
      
    </main>
  )
}

export default App
