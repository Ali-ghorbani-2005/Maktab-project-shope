import { useEffect, useState } from 'react'

export default function HeaderHome() {
  const images = [
    '/imgs/home-Slider/banner_SlideBann-1.webp' , 
    'imgs/home-Slider/banner_SlideBann-2.webp' , 
    'imgs/home-Slider/banner_SlideBann-3.gif' , 
    'imgs/home-Slider/banner_SlideBann-4.webp'
  ]
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval)
  }, [images.length])
  return (
    <>

     

<div className="relative  h-64 overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-transform duration-1000 ease-in-out 
          ${index === currentIndex ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <img
            src={image}
            alt={`Slide ${index}`}
            className="w-full h-64 object-cover"
          />
        </div>
      ))}
    </div>
  

    
    </>
  )
}
