import React, { useState } from 'react'

const images = [
    {
        img: "/assets/tunsori/1.jpg",
    },
    {
        img: "/assets/tunsori/2.jpg",
    },
    {
        img: "/assets/tunsori/3.jpg",
    },
    {
        img: "/assets/tunsori/4.jpg",
    },
    {
        img: "/assets/tunsori/5.jpg",
    },
    {
        img: "/assets/tunsori/6.jpg",
    }
]

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (img: string) => {
    setSelectedImage(img);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section id="gallery" className='gallery-section'>
        <div className='gallery-content'>
            <h2 className='text-5xl font-bold text-center mb-4'>Our<span className="text-yellow-400"> Gallery</span></h2>
            <p className='text-lg md:text-xl mb-6 text-gray-400 text-center'>Witness the transformations that define our craftsmanship</p>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                {images.map((imageSet, index) => (
                    <div className='gallery-item relative group' key={index}>
                        <img 
                            src={imageSet.img} 
                            alt={`Gallery Image ${index + 1}`} 
                            className='gallery-image w-full h-auto rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer block'
                            onClick={() => openModal(imageSet.img)}
                        />
                        <div className='absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg pointer-events-none'>
                            <svg className='w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>

            {selectedImage && (
                <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50' onClick={closeModal}>
                    <div className='relative max-w-4xl max-h-full p-4'>
                        <img 
                            src={selectedImage} 
                            alt='Full size gallery image' 
                            className='max-w-full max-h-[90vh] object-contain rounded-lg'
                        />
                        <button 
                            className='absolute top-6 right-6 bg-white/10 hover:bg-white/20 backdrop-blur-[10px] border border-white/10 text-white px-4 py-2 rounded-full text-lg font-semibold'
                            onClick={closeModal}
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}
        </div>
    </section>
  )
}

export default Gallery
