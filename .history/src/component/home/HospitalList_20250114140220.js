import React, { useState } from "react";
import { MapPin, Search, Star } from "lucide-react";
import { Link } from "react-router-dom";

function HospitalList() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const hospitals = [
    {
      id: 1,
      name: "PawSome Pet Hospital",
      info: "Information of Hospital",
      address: "123 Nguyen Hue, District 1, HCMC",
      rating: 4.5,
      reviews: 5,
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7",
      services: ["Surgery", "Dentistry", "Vaccination"]
    },
    {
      id: 2,
      name: "Happy Tails Clinic",
      info: "Information of Hospital",
      address: "456 Le Loi, District 3, HCMC",
      rating: 4.8,
      reviews: 5,
      image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf",
      services: ["Surgery", "Grooming", "Emergency"]
    },
  ];

  const filteredHospitals = hospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-16 bg-gradient-to-b from-[#98E9E9]/10 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1A3C8E] mb-4">List of Pet Hospital</h2>
          <p className="text-gray-600">Find the best veterinary care for your beloved pets</p>
        </div>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search hospitals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 rounded-full focus:outline-none focus:border-[#98E9E9] transition-colors"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Hospital List */}
        <div className="max-w-5xl mx-auto space-y-6">
          {filteredHospitals.map((hospital, index) => (
            <div 
              key={hospital.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className="flex gap-8">
                {/* Left: Number + Image */}
                <div className="flex gap-6">
                  <span className="text-lg font-medium text-gray-400 w-8">{index + 1}</span>
                  <div className="w-48 h-36 rounded-lg overflow-hidden">
                    <img 
                      src={hospital.image}
                      alt={hospital.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Right: Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-[#1A3C8E] mb-2">{hospital.name}</h3>
                      <p className="text-gray-600 mb-1">{hospital.info}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-[#98E9E9]/10 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{hospital.rating}</span>
                      <span className="text-gray-500 text-sm">({hospital.reviews} reviews)</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{hospital.address}</span>
                  </div>

                  {/* Services Tags */}
                  <div className="flex gap-2 mb-4">
                    {hospital.services.map((service, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-4">
                    <button className="px-4 py-2 text-gray-600 hover:text-[#1A3C8E] transition-colors">
                      <MapPin className="w-5 h-5 inline-block mr-2" />
                      View Location
                    </button>
                    <Link
                      to={`/hospital/${hospital.id}`}
                      className="px-6 py-2 bg-[#1A3C8E] text-white rounded-full hover:bg-[#98E9E9] hover:text-[#1A3C8E] transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HospitalList; 