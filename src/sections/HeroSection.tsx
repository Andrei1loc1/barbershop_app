import React, { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLogin } from '../contexts/LoginContext'

const HeroSection = () => {
  const [showScroll, setShowScroll] = useState(false)
  const { handleBookClick } = useLogin()

  useEffect(() => {
    const handleScroll = () => {
      // Arată săgeata după ce s-a scrollat puțin (100px)
      setShowScroll(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="home" className='hero-section relative'>
      <div className='bg-[#0000009a] w-full h-full flex items-center justify-center'>
        <div className='hero-content'>
          <h1 className='text-4xl md:text-7xl font-bold mb-4'>Style That <span className='text-yellow-400'>Defines</span> You</h1>      
          <p className='text-gray-300 text-lg md:text-2xl mb-6 mx-12 md:mx-0'>Experience premium grooming with master barbers in a luxurious setting</p>
          <button onClick={handleBookClick} className='book-btn py-4 text-xl inline-block'>Book Appointment</button>
        </div>
      </div>
      
      {/* Săgeată animată */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-300 ${
        showScroll ? 'opacity-0' : 'opacity-100'
      }`}>
        <ChevronDown 
          size={26} 
          className='text-yellow-500 animate-bounce'
        />
      </div>
    </section>
  )
}

export default HeroSection
