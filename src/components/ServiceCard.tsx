import React from 'react'

const ServiceCard = ({title, description, price, image} : {title: string, description: string, price: string, image: any}) => {
  return (
    <div className='flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300'>
      <img src={image} alt={title} className='w-40 h-40 mb-4 rounded' />
      <h3 className='text-2xl font-semibold mb-2'>{title}</h3>
      <p className='text-gray-600 mb-4'>{description}</p>
      <p className='text-3xl font-bold text-yellow-600'>{price}</p>
    </div>
  )
}

export default ServiceCard