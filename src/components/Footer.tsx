import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-[#111827] text-white py-12 px-4 ">
      <div className="max-w-[80rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Us Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-pacifico text-yellow-400">BarberShop</h3>
            <p className="text-gray-400">
              Premium barbershop experience with master barbers.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="text-gray-400 hover:text-yellow-400 block">Home</Link>
              <Link to="/" className="text-gray-400 hover:text-yellow-400 block">Services</Link>
              <Link to="/booking" className="text-gray-400 hover:text-yellow-400 block">Book Now</Link>
            </div>
          </div>

          {/* Contact Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Contact</h3>
            <div className="space-y-2">
              <p className="text-gray-400">📍 123 Main St, City</p>
              <p className="text-gray-400">📞 (123) 456-7890</p>
              <p className="text-gray-400">📧 info@barberpro.com</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold mb-2">Hours</h4>
              <p className="text-gray-400 mb-2">Mon-Fri: 9:00 AM - 8:00 PM</p>
              <p className="text-gray-400 mb-2">Saturday: 10:00 AM - 6:00 PM</p>
              <p className="text-gray-400">Sunday: 10:00 AM - 4:00 PM</p>
            </div>
          </div>
        </div>
        
        {/* Linia de border corectată */}
        <div className="mt-8 pt-4" style={{ borderTop: '1px solid rgb(107 114 128 / 0.5)' }}>
          <div className="text-center">
              <p className="text-gray-500 text-sm">© 2025 BarberPro. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
