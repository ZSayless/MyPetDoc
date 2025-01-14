import { Star, MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";

function HomePlace() {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      sliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const topHospitals = [
    {
      id: 1,
      name: "Pet Care International",
      location: "District 1, HCMC",
      rating: 4.8,
      reviews: 234,
      specialties: ["Surgery", "Vaccination", "Emergency"],
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3",
    },
    {
      name: "Saigon Pet Hospital",
      location: "District 7, HCMC",
      rating: 4.7,
      reviews: 189,
      specialties: ["Dentistry", "Internal Medicine"],
      image:
        "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?ixlib=rb-4.0.3",
    },
    {
      name: "Pet Health Center",
      location: "District 3, HCMC",
      rating: 4.9,
      reviews: 156,
      specialties: ["Cardiology", "Neurology"],
      image:
        "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?ixlib=rb-4.0.3",
    },
    {
      name: "Animal Care Hospital",
      location: "District 2, HCMC",
      rating: 4.6,
      reviews: 145,
      specialties: ["Orthopedics", "Rehabilitation"],
      image:
        "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?ixlib=rb-4.0.3",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Featured Hospitals</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => scroll('left')}
              className="p-2 rounded-full border border-gray-200 hover:bg-gray-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-2 rounded-full border border-gray-200 hover:bg-gray-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div 
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {topHospitals.map((hospital) => (
            <div
              key={hospital.id}
              className="flex-none w-[300px] bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <img
                  src={hospital.image}
                  alt={hospital.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-3 right-3 px-2 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current" />
                  {hospital.rating}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{hospital.name}</h3>
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{hospital.location}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {hospital.specialties.map((specialty, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
                <div className="text-gray-500 text-sm">
                  {hospital.reviews} verified reviews
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomePlace;
