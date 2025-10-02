import React from 'react'
import { MapPin, Phone, Clock, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

const Contact = () => {
  return (
    <section id="contact" className='contact-section py-16 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='services-content mb-26'>
          <h2 className="text-5xl font-bold text-center mb-4">Visit Our <span className='text-yellow-600'>Location</span></h2>
          <p className='text-lg md:text-xl mb-6 text-gray-600'>Find us in the heart of the city for your premium grooming experience</p>
        </div>
        <div className='grid md:grid-cols-2 gap-8 items-start'>
          {/* Contact Card */}
          <div className='flex flex-col -mt-12 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300'>
            <h2 className='text-2xl font-bold text-black mb-6'>Contact Information</h2>
            
            <div className='space-y-6'>
              <div className='flex items-start space-x-4'>
                <div className='w-12 h-12 bg-yellow-300/30 rounded-full flex items-center justify-center flex-shrink-0'>
                  <MapPin className='w-5 h-5 text-yellow-600' />
                </div>
                <div>
                  <p className='text-base font-medium text-black'>Address</p>
                  <p className='text-sm text-gray-500 font-medium'>123 Main StreetDowntown City, NY 10001</p>
                </div>
              </div>

              <div className='flex items-start space-x-4'>
                <div className='w-12 h-12 bg-yellow-300/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                  <Phone className='w-5 h-5 text-yellow-600' />
                </div>
                <div>
                  <p className='text-base font-medium text-black'>Phone</p>
                  <p className='text-sm text-gray-500 font-medium'>(555) 234-567</p>
                </div>
              </div>

              <div className='flex items-start space-x-4'>
                <div className='w-12 h-12 bg-yellow-300/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                  <Mail className='w-5 h-5 text-yellow-600' />
                </div>
                <div>
                  <p className='text-base font-medium text-black'>Email</p>
                  <p className='text-sm text-gray-500 font-medium'>info@barberpro.com</p>
                </div>
              </div>

              <div className='flex items-start space-x-4'>
                <div className='w-12 h-12 bg-yellow-300/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                  <Clock className='w-5 h-5 text-yellow-600' />
                </div>
                <div>
                  <p className='text-base font-medium text-black'>Hours</p>
                  <p className='text-gray-500'>
                    <span className='block text-sm font-medium'>Mon-Fri: 9:00am - 8:00pm</span>
                    <span className='block text-sm font-medium'>Saturday: 10:00am - 6:00pm</span>
                    <span className='block text-sm font-medium'>Sunday: 10:00 AM - 4:00 PM</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Map */}
          <div className='rounded-3xl shadow-xl overflow-hidden'>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.142293135246!2d-73.98640368459211!3d40.748447979328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2s123%20Main%20St%2C%20New%20York%2C%20NY%2010001!5e0!3m2!1sen!2sus!4v1635789200000"
              width="100%"
              height="400"
              style={{border:0}}
              allowFullScreen={true}
              loading="lazy"
              className='w-full h-100'
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      {/* Book Appointment Button */}
        <div className='text-center md:text-left mt-8 md:mt-2 px-4 max-w-5xl mx-auto'>
          <Link to="/login" className='book-btn py-4 text-lg inline-block'>Book Your Appointment Now</Link>
        </div>
    </section>
  )
}

export default Contact
