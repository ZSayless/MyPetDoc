import React from "react";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

function HospitalList() {
  const hospitals = [
    {
      id: 1,
      name: "PawSome Pet Hospital",
      info: "Information of Hospital",
      address: "123 Nguyen Hue, District 1, HCMC",
      rating: 4.5,
      reviews: 5,
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7"
    },
    {
      id: 2,
      name: "Happy Tails Clinic",
      info: "Information of Hospital",
      address: "456 Le Loi, District 3, HCMC",
      rating: 4.8,
      reviews: 5,
      image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf"
    },
    // Thêm các bệnh viện khác...
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">List of Pet Hospital</h2>
        
        {/* Date Filter */}
        <div className="flex gap-4 mb-8">
          <button className="px-4 py-2 border rounded hover:bg-gray-50">
            Fri 09 Feb
          </button>
          <button className="px-4 py-2 border rounded hover:bg-gray-50">
            Sat 10 Feb
          </button>
          <button className="px-4 py-2 border rounded hover:bg-gray-50">
            Sun 11 Feb
          </button>
        </div>

        {/* Hospital List */}
        <div className="space-y-6">
          {hospitals.map((hospital, index) => (
            <div 
              key={hospital.id}
              className="flex items-center gap-6 p-4 border-b last:border-b-0"
            >
              <span className="text-lg font-medium w-8">{index + 1}</span>
              
              <div className="w-48 h-32 bg-gray-200">
                <img 
                  src={hospital.image}
                  alt={hospital.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{hospital.name}</h3>
                <p className="text-gray-600 mb-1">{hospital.info}</p>
                <p className="text-gray-600">Address: {hospital.address}</p>
                <div className="mt-2">
                  <span className="text-sm">
                    {"★".repeat(Math.floor(hospital.rating))}
                    {" "}({hospital.rating}) Review {hospital.reviews}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-1" />
                  <span>Location</span>
                </div>
                <Link
                  to={`/hospital/${hospital.id}`}
                  className="px-4 py-2 border rounded hover:bg-gray-50"
                >
                  View details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HospitalList; 