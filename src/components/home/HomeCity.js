import React from "react";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CITIES = [
  {
    id: "hcm",
    name: "Ho Chi Minh City",
    description: "Vietnam's largest healthcare hub",
    hospitalCount: "50+ Hospitals",
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482",
  },
  {
    id: "hanoi",
    name: "Hanoi",
    description: "Leading veterinary facilities",
    hospitalCount: "40+ Hospitals",
    image: "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a",
  },
  {
    id: "danang",
    name: "Da Nang",
    description: "Modern pet care centers",
    hospitalCount: "20+ Hospitals",
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b",
  },
];

const HomeCity = () => {
  const navigate = useNavigate();

  const handleCityClick = (cityId) => {
    navigate(`/find-hospital`, { state: { selectedCity: cityId } });
  };

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Top Locations</h2>
          <p className="text-gray-600">
            Discover top-rated veterinary hospitals in major cities across
            Vietnam
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CITIES.map((city) => (
            <div
              key={city.id}
              className="relative rounded-lg overflow-hidden cursor-pointer group transform transition-transform group-hover:scale-105 will-change-transform"
              onClick={() => handleCityClick(city.id)}
            >
              <img
                src={city.image}
                alt={city.name}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5" />
                  <h3 className="text-2xl font-bold">{city.name}</h3>
                </div>
                <p className="text-sm mb-3 opacity-90">{city.description}</p>
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm">
                  {city.hospitalCount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeCity;
