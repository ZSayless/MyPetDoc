import { Star, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function HomePlace() {
  const topHospitals = [
    {
      name: "Pet Care International",
      location: "District 1, HCMC",
      rating: 4.8,
      reviews: 234,
      specialties: ["Surgery", "Vaccination", "Emergency"],
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3"
    },
    {
      name: "Saigon Pet Hospital",
      location: "District 7, HCMC",
      rating: 4.7,
      reviews: 189,
      specialties: ["Dentistry", "Internal Medicine"],
      image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?ixlib=rb-4.0.3"
    },
    {
      name: "Pet Health Center",
      location: "District 3, HCMC",
      rating: 4.9,
      reviews: 156,
      specialties: ["Cardiology", "Neurology"],
      image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?ixlib=rb-4.0.3"
    },
    {
      name: "Animal Care Hospital",
      location: "District 2, HCMC",
      rating: 4.6,
      reviews: 145,
      specialties: ["Orthopedics", "Rehabilitation"],
      image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?ixlib=rb-4.0.3"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Featured Hospitals</h2>
            <p className="text-gray-600">Discover top-rated veterinary care facilities</p>
          </div>
          <Link 
            to="/find-hospital"
            className="flex items-center text-[#98E9E9] hover:text-[#7CD5D5] font-medium group"
          >
            View All
            <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {topHospitals.map((hospital, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative">
                <img src={hospital.image} alt={hospital.name} className="w-full h-48 object-cover" />
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 rounded-full backdrop-blur-sm">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 text-sm font-medium">{hospital.rating}</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
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
