import { MapPin } from "lucide-react";

function HomeCity() {
  const topCities = [
    {
      name: "Ho Chi Minh City",
      count: "50+ Hospitals",
      image:
        "https://images.unsplash.com/photo-1583417319070-4a69db38a482?ixlib=rb-4.0.3",
      description: "Vietnam's largest healthcare hub",
    },
    {
      name: "Hanoi",
      count: "40+ Hospitals",
      image:
        "https://images.unsplash.com/photo-1599708153386-62bf3f6c49a6?ixlib=rb-4.0.3",
      description: "Leading veterinary facilities",
    },
    {
      name: "Da Nang",
      count: "20+ Hospitals",
      image:
        "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?ixlib=rb-4.0.3",
      description: "Modern pet care centers",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Top Locations</h2>
          <div className="w-20 h-1 bg-[#98E9E9] mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover top-rated veterinary hospitals in major cities across
            Vietnam
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topCities.map((city, index) => (
            <div
              key={index}
              className="group relative rounded-xl overflow-hidden shadow-lg h-[300px] transform hover:-translate-y-1 transition-all duration-300"
            >
              <img
                src={city.image}
                alt={city.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center mb-2">
                  <MapPin className="w-5 h-5 mr-2" />
                  <h3 className="text-2xl font-bold">{city.name}</h3>
                </div>
                <p className="text-white/80 mb-2">{city.description}</p>
                <div className="flex items-center">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                    {city.count}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeCity;
