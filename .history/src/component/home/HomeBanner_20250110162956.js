import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HomeBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const banners = [
    {
      title: "Discover the Ideal\nPet Hospital for You\nToday!",
      description: "Welcome to MyPetDoc, your trusted directory for pet hospitals in Vietnam. Explore our extensive listings to find the best care for your furry friends.",
      image: "https://example.com/path/to/pet-hospital-image1.jpg"
    },
    {
      title: "Professional Care\nFor Your Beloved Pets",
      description: "Find certified veterinarians and modern facilities that provide the highest standard of care for your pets.",
      image: "https://example.com/path/to/pet-care-image2.jpg"
    },
    {
      title: "24/7 Emergency\nVeterinary Services",
      description: "Access emergency pet care services anytime. Your pet's health is our top priority.",
      image: "https://example.com/path/to/emergency-vet-image3.jpg"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[600px] bg-gray-800 overflow-hidden">
      <div className="max-w-[1200px] mx-auto h-full px-4">
      {/* Arrow Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {banners.map((banner, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="h-full flex items-center px-16">
            <div className="w-1/2">
              <h1 className="text-5xl font-bold text-white mb-6 leading-tight whitespace-pre-line ml-8">
                {banner.title}
              </h1>
              <p className="text-base text-white mb-8 max-w-lg ml-8">
                {banner.description}
              </p>
              <div className="flex gap-4 ml-8">
                <button className="px-8 py-3 bg-white text-gray-900 font-medium rounded hover:bg-gray-100 transition-colors">
                  Search
                </button>
                <button className="px-8 py-3 border-2 border-white text-white font-medium rounded hover:bg-white/10 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            <div className="w-1/2 flex justify-center">
              <img 
                src={banner.image} 
                alt="Banner illustration"
                className="w-[450px] h-[350px] object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      ))}

      {/* Dots navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              currentSlide === index ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
      </div>
    </div>
  );
};

export default HomeBanner; 