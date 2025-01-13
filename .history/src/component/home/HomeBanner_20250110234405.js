import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HomeBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      title: "Discover the Ideal\nPet Hospital for You\nToday!",
      description:
        "Welcome to MyPetDoc, your trusted directory for pet hospitals in Vietnam. Explore our extensive listings to find the best care for your furry friends.",
      image: "https://example.com/path/to/pet-hospital-image1.jpg",
    },
    {
      title: "Professional Care\nFor Your Beloved Pets",
      description:
        "Find certified veterinarians and modern facilities that provide the highest standard of care for your pets.",
      image: "https://example.com/path/to/pet-care-image2.jpg",
    },
    {
      title: "24/7 Emergency\nVeterinary Services",
      description:
        "Access emergency pet care services anytime. Your pet's health is our top priority.",
      image: "https://example.com/path/to/emergency-vet-image3.jpg",
    },
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
    <div className="relative h-[400px] md:h-[500px] lg:h-[600px] bg-gray-800 overflow-hidden">
      <div className="max-w-[1200px] mx-auto h-full px-4">
        {/* Arrow Navigation */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft size={16} className="md:w-5 md:h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight size={16} className="md:w-5 md:h-5" />
        </button>

        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={banner.image}
                alt="Banner background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50"></div>
            </div>

            <div className="relative h-full flex items-center px-4 md:px-8 lg:px-16">
              <div className="w-full max-w-xl md:max-w-2xl">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight whitespace-pre-line ml-0 md:ml-8">
                  {banner.title}
                </h1>
                <p className="text-sm md:text-base text-white mb-6 md:mb-8 max-w-lg ml-0 md:ml-8">
                  {banner.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 ml-0 md:ml-8">
                  <button className="px-5 py-2 bg-white text-gray-900 text-sm font-medium rounded w-[120px] sm:w-[140px] hover:bg-gray-100 transition-colors">
                    Search
                  </button>
                  <button className="px-5 py-2 border border-white text-white text-sm font-medium rounded w-[120px] sm:w-[140px] hover:bg-white/10 transition-colors">
                    Learn More
                  </button>
                </div>
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
                currentSlide === index ? "bg-white" : "bg-white/50"
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
