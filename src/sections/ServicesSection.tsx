import React from 'react'
import ServiceCard from '../components/ServiceCard'

const cardDetails = [
  {
    image: '/assets/images/foarfece.jpg',
    title: 'Haircut',
    description: 'Precision cuts tailored to your style',
    price: '$30',
  }, 
  {
    image: '/assets/images/barba.jpg',
    title: 'Beard Trim',
    description: 'Sharp and clean beard shaping',
    price: '$20',
  },
  {
    image: '/assets/images/prosop.jpg',
    title: 'Shave',
    description: 'Classic straight razor shave',
    price: '$25',
  },
]

const ServicesSection = () => {
  return (
    <section id="services" className="services-section">  
      <div className="services-content">
        <h2 className="text-5xl font-bold text-center mb-4">Our <span className='text-yellow-600'>Services</span></h2>
        <p className='text-lg md:text-xl mb-6 text-gray-600'>Professional grooming services tailored to your style</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cardDetails.map((card, index) => (
            <ServiceCard key={index} image={card.image} title={card.title} description={card.description} price={card.price}/>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection