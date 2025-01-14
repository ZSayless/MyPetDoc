import React, { useState } from "react";
import { MapPin, Search, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

function HospitalList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const hospitalsPerPage = 5;
  
  const hospitals = [
    {
      id: 1,
      name: "PawSome Pet Hospital",
      info: "Information of Hospital",
      address: "123 Nguyen Hue, District 1, HCMC",
      rating: 4.5,
      reviews: 5,
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7",
      services: ["Surgery", "Dentistry"]
    },
    {
      id: 2,
      name: "Happy Tails Clinic",
      info: "Information of Hospital",
      address: "456 Le Loi, District 3, HCMC",
      rating: 4.8,
      reviews: 5,
      image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf",
      services: ["Surgery", "Emergency"]
    },
  ];

  const filteredHospitals = hospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastHospital = currentPage * hospitalsPerPage;
  const indexOfFirstHospital = indexOfLastHospital - hospitalsPerPage;
  const currentHospitals = filteredHospitals.slice(indexOfFirstHospital, indexOfLastHospital);
  const totalPages = Math.ceil(filteredHospitals.length / hospitalsPerPage);

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
        <div className="max-w-4xl mx-auto space-y-4">
          {currentHospitals.map((hospital, index) => (
            <div 
              key={hospital.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
            >
              <div className="flex gap-4">
                {/* Left: Number + Image */}
                <div className="flex gap-4 items-center">
                  <span className="text-base font-medium text-gray-400 w-6">
                    {indexOfFirstHospital + index + 1}
                  </span>
                  <div className="w-32 h-24 rounded-lg overflow-hidden">
                    <img 
                      src={hospital.image}
                      alt={hospital.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Right: Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-[#1A3C8E]">{hospital.name}</h3>
                      <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                        <MapPin className="w-4 h-4" />
                        <span>{hospital.address}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-[#98E9E9]/10 px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{hospital.rating}</span>
                    </div>
                  </div>

                  {/* Services Tags */}
                  <div className="flex gap-2 mt-2">
                    {hospital.services.map((service, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>

                  {/* Action Button */}
                  <div className="flex justify-end mt-2">
                    <Link
                      to={`/hospital/${hospital.id}`}
                      className="px-4 py-1.5 bg-[#1A3C8E] text-white text-sm rounded-full hover:bg-[#98E9E9] hover:text-[#1A3C8E] transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-full ${
                  currentPage === page 
                    ? 'bg-[#1A3C8E] text-white' 
                    : 'hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default HospitalList; 