import { useState, useEffect } from 'react';

const HomeBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const banners = [
    {
      title: "Discover the Ideal\nPet Hospital for You\nToday!",
      description: "Welcome to MyPetDoc, your trusted directory for pet hospitals in Vietnam. Explore our extensive listings to find the best care for your furry friends.",
      image: "/path/to/banner1.jpg"
    },
    {
      title: "Professional Care\nFor Your Beloved Pets",
      description: "Find certified veterinarians and modern facilities that provide the highest standard of care for your pets.",
      image: "/path/to/banner2.jpg"
    },
    {
      title: "24/7 Emergency\nVeterinary Services",
      description: "Access emergency pet care services anytime. Your pet's health is our top priority.",
      image: "/path/to/banner3.jpg"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen bg-gray-800 overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="container mx-auto h-full flex items-center px-4">
            <div className="w-1/2">
              <h1 className="text-5xl font-bold text-white mb-6 leading-tight whitespace-pre-line">
                {banner.title}
              </h1>
              <p className="text-lg text-white mb-8 max-w-xl">
                {banner.description}
              </p>
              <div className="flex gap-4">
                <button className="px-8 py-3 bg-white text-gray-900 font-medium rounded hover:bg-gray-100 transition-colors">
                  Search
                </button>
                <button className="px-8 py-3 border-2 border-white text-white font-medium rounded hover:bg-white/10 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            <div className="w-1/2 flex justify-center">
              <div className="w-[400px] h-[300px] bg-gray-700 rounded-lg"></div>
            </div>
          </div>
        </div>
      ))}

      {/* Dots navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeBanner; 