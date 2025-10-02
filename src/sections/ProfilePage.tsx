import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { LoginContext } from '../contexts/LoginContext'
import Navbar from '../components/Navbar'
import BottomNav from '../components/BottomNav'
import { 
  Mail, Phone, MapPin, Calendar, Star, Crown, Edit, Save, X, Shield, Settings, 
  CreditCard, History, LogOut 
} from 'lucide-react'
import NameAvatar from '../components/NameAvatar'

const ProfilePage = () => {
  const loginContext = useContext(LoginContext)
  const { user, logout } = loginContext || {}
  const userName = user?.name || 'vizitator'
  const userEmail = user?.email || 'email@exemplu.com'
  const userPhone = user?.phone || '+40 7xx xxx xxx'

  // Mock user profile data
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: userName,
    email: userEmail,
    phone: userPhone,
    address: user?.address || '',
    preferences: user?.preferences || 'Tuns clasic, Ion',
    loyaltyTier: 'Silver',
    points: 150,
    totalSpent: '1,250 RON',
    bookingsCount: 12,
    membershipActive: true
  })

  const [editedData, setEditedData] = useState(profileData)

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setProfileData(editedData)
      setIsEditing(false)
      alert('Profilul a fost actualizat cu succes!')
    } else {
      setIsEditing(true)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedData(prev => ({ ...prev, [name]: value }))
  }

  const handleLogout = () => {
    if (window.confirm('Ești sigur că vrei să te deconectezi?')) {
      logout?.()
    }
  }

  // Mock loyalty benefits
  const loyaltyBenefits = [
    { icon: Star, title: 'Reducere 10%', description: 'La toate serviciile' },
    { icon: Crown, title: 'Prioritate programări', description: 'Rezervări în avans' },
    { icon: Calendar, title: 'Reminder-uri SMS', description: 'Notificări automate' },
  ]

  // Mock payment methods
  const paymentMethods = [
    { id: 1, type: 'Card', last4: '1234', brand: 'Visa', active: true },
    { id: 2, type: 'Card', last4: '5678', brand: 'Mastercard', active: false },
  ]

  return (
    <div className="min-h-screen bg-[#1A2331] text-gray-800 pt-16 pb-20">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 pt-8">
        {/* Profile Header */}
        <section className="mb-12">
          <div className="dark-glass-card mb-6">
            <div className="relative">
              {/* Profile Avatar - positioned above the card */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-10">
                <NameAvatar name={profileData.name} size="large" />
              </div>
              
              {/* Profile Info - below avatar */}
              <div className="pt-16 pb-6 text-center">
                <div className="mb-4">
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {isEditing ? (
                      <input
                        name="name"
                        value={editedData.name}
                        onChange={handleInputChange}
                        className="bg-transparent text-3xl font-bold text-white border-b border-yellow-400 focus:outline-none focus:border-yellow-500 px-2 mx-auto text-center w-full max-w-md"
                        autoFocus
                      />
                    ) : (
                      profileData.name
                    )}
                  </h1>
                  <p className="text-yellow-400 text-lg">Cont {profileData.loyaltyTier}</p>
                </div>
                
                <button
                  onClick={handleEditToggle}
                  className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                    isEditing
                      ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg'
                      : 'bg-yellow-500 hover:bg-yellow-600 text-black shadow-lg'
                  }`}
                >
                  {isEditing ? 'Salvează' : 'Editează'}
                  {isEditing ? <Save className="w-4 h-4 ml-2 inline" /> : <Edit className="w-4 h-4 ml-2 inline" />}
                </button>
              </div>
            </div>

            {/* Profile Stats - two relevant cards stacked vertically */}
            <div className="space-y-4 mb-6">
              {/* Upcoming Bookings Card */}
              <div className="bg-[#51555a]/30 p-4 rounded-xl">
                <div className="flex items-center space-x-3 mb-3">
                  <Calendar className="w-5 h-5 text-yellow-400" />
                  <h3 className="text-lg font-semibold text-white">Rezervări viitoare</h3>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">1</div>
                  <p className="text-sm text-gray-300 mb-3">Programare activă pentru 18 Sept 2025</p>
                  <Link to="/historic" className="inline-block px-3 py-1.5 bg-yellow-500 text-black rounded-full text-xs font-semibold hover:bg-yellow-400 transition-colors">
                    Vezi detalii →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="mb-12">
          <div className="dark-glass-card">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-bold text-white">Informații de contact</h2>
            </div>
            
            <div className="space-y-4">

              <div className="flex items-center space-x-4 p-4 bg-[#51555a]/30 rounded-lg">
                <Phone className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Telefon</label>
                  {isEditing ? (
                    <input
                      name="phone"
                      value={editedData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-transparent text-white border-b border-gray-600 focus:border-yellow-400 focus:outline-none px-2"
                    />
                  ) : (
                    <p className="text-white">{profileData.phone}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-[#51555a]/30 rounded-lg">
                <Settings className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Preferințe</label>
                  {isEditing ? (
                    <textarea
                      name="preferences"
                      value={editedData.preferences}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full bg-transparent text-white border-b border-gray-600 focus:border-yellow-400 focus:outline-none px-2 resize-none"
                      placeholder="Servicii preferate, frizer preferat..."
                    />
                  ) : (
                    <p className="text-white">{profileData.preferences}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Loyalty Benefits 
        <section className="mb-12">
          <div className="dark-glass-card">
            <div className="flex items-center space-x-3 mb-6">
              <Star className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-bold text-white">Beneficii loialitate</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              {loyaltyBenefits.map((benefit, index) => {
                const IconComponent = benefit.icon
                return (
                  <div key={index} className="light-glass-card p-4 rounded-xl hover:shadow-xl transition-all">
                    <div className="flex items-start space-x-3">
                      <div className="light-glass-icon bg-yellow-500/20 mt-1">
                        <IconComponent className="w-5 h-5 text-yellow-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1">{benefit.title}</h3>
                        <p className="text-sm text-gray-300">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>*/}

        {/* Quick Actions */}
        <section className="mb-12">
          <div className="dark-glass-card">
            <div className="flex items-center space-x-3 mb-6">
              <CreditCard className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-bold text-white">Acțiuni rapide</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/booking" className="light-glass-card p-4 rounded-xl hover:shadow-xl transition-all flex items-center space-x-4">
                <Calendar className="w-6 h-6 text-yellow-400" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Rezervă o programare</h3>
                  <p className="text-sm text-gray-300">Planifică următoarea ta vizită</p>
                </div>
              </Link>

              <Link to="/historic" className="light-glass-card p-4 rounded-xl hover:shadow-xl transition-all flex items-center space-x-4">
                <History className="w-6 h-6 text-yellow-400" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Vezi istoricul</h3>
                  <p className="text-sm text-gray-300">Toate programările tale anterioare</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Account Actions */}
        <section>
          <div className="space-y-3">
            <button
              onClick={handleLogout}
              className="w-full dark-glass-card p-4 rounded-xl flex items-center justify-center space-x-3 hover:shadow-xl transition-all text-red-400 hover:text-red-300"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-semibold">Deconectare</span>
            </button>
            
            <div className="text-center text-sm text-gray-400 py-4">
              <p>© 2025 Barbershop. Toate drepturile rezervate.</p>
            </div>
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  )
}

export default ProfilePage
