import { Scissors, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLogin } from '../contexts/LoginContext'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navHeight = 64 // height of navbar (4rem/16px = 64px)
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - navHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    setMobileMenuOpen(false)
  }

  const { handleBookClick } = useLogin()

  const handleBookingClick = () => {
    handleBookClick()
    setMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 h-16 ${
        scrolled 
          ? 'bg-black/70 backdrop-blur-md shadow-lg' 
          : 'bg-black'
      }`}>
        <div className='max-w-6xl mx-auto px-4 py-4 h-full'>
          <div className='flex items-center justify-between h-full'>
            <div className='flex items-center gap-2'>
              <div className='bg-gold p-2 rounded-lg'><Scissors size={20} /></div>
              <h1 className='font-pacifico text-xl font-bold text-white'>Barbershop</h1>
            </div>
            
            {/* Desktop Navigation */}
            <ul className='hidden md:flex items-center gap-8 text-white'>
              <li onClick={() => scrollToSection('home')} className='cursor-pointer hover:text-gold transition-colors'>Home</li>
              <li onClick={() => scrollToSection('services')} className='cursor-pointer hover:text-gold transition-colors'>Services</li>
              <li onClick={() => scrollToSection('gallery')} className='cursor-pointer hover:text-gold transition-colors'>Gallery</li>
              <li onClick={() => scrollToSection('contact')} className='cursor-pointer hover:text-gold transition-colors'>Contact</li>
            </ul>

            {/* Desktop Book Button */}
            <button 
              className='hidden md:block book-btn py-2'
              onClick={handleBookingClick}
            >
              Book Now
            </button>

            {/*{/* Mobile Hamburger *
            <button 
              className='block md:hidden text-white p-2 relative z-50 rounded-full transition-colors'
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>*/}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Fade-in */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-md md:hidden transition-opacity duration-300 ease-in-out z-40 ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div className='h-full flex flex-col items-center justify-center px-4' onClick={e => e.stopPropagation()}>
          <ul className='flex flex-col items-center space-y-6 w-full mx-auto'>
            <li className='w-full'>
              <button onClick={() => scrollToSection('home')} 
                className='w-full text-xl font-medium text-white hover:text-gold transition-colors py-3'>
                Home
              </button>
            </li>
            <li className='w-full'>
              <button onClick={() => scrollToSection('services')} 
                className='w-full text-xl font-medium text-white hover:text-gold transition-colors py-3'>
                Services
              </button>
            </li>
            <li className='w-full'>
              <button onClick={() => scrollToSection('gallery')} 
                className='w-full text-xl font-medium text-white hover:text-gold transition-colors py-3'>
                Gallery
              </button>
            </li>
            <li className='w-full'>
              <button onClick={() => scrollToSection('contact')} 
                className='w-full text-xl font-medium text-white hover:text-gold transition-colors py-3'>
                Contact
              </button>
            </li>
            <li className='w-full text-center'>
              <button 
                className='book-btn py-3 text-lg block w-full'
                onClick={handleBookingClick}
              >
                Book Now
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Navbar
