import React, { useState } from "react";
import { Search, Star, MapPin, Phone, Clock } from "lucide-react";
import { Link } from "react-router-dom";

function FindHospital() {
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data cho hospitals
  const hospitals = [
    {
      id: 1,
      name: "PetCare Hospital",
      address: "123 Main St, District 1, HCMC",
      phone: "+84 123 456 789",
      hours: "8:00 AM - 8:00 PM",
      rating: 4.8,
      reviews: 128,
      image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
      services: ["Vaccination", "Surgery", "Grooming", "Emergency"],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6696584237106!2d106.66488007465357!3d10.759920059446151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f9023a3a85d%3A0x9259bad475336d5c!2zQuG7h25oIHZp4buHbiBUaMO6IHkgUGV0UHJv!5e0!3m2!1svi!2s!4v1710338305071!5m2!1svi!2s"
    },
    // Thêm các hospital khác...
  ];

  // Filter hospitals based on search term
  const filteredHospitals = hospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Find a Hospital</h1>

        {/* Search Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search hospitals by name or location..."
              className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Hospital List */}
          <div className="lg:col-span-2 space-y-6">
            {filteredHospitals.map((hospital) => (
              <div
                key={hospital.id}
                className={`bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transition-all ${
                  selectedHospital?.id === hospital.id
                    ? "ring-2 ring-blue-500"
                    : "hover:shadow-md"
                }`}
                onClick={() => setSelectedHospital(hospital)}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img
                      src={hospital.image}
                      alt={hospital.name}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          {hospital.name}
                        </h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 mr-2" />
                          {hospital.address}
                        </div>
                        <div className="flex items-center text-gray-600 mb-2">
                          <Phone className="w-4 h-4 mr-2" />
                          {hospital.phone}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          {hospital.hours}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-400 mr-1" />
                        <span className="font-semibold">{hospital.rating}</span>
                        <span className="text-gray-500 ml-1">
                          ({hospital.reviews})
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {hospital.services.map((service, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={`/hospital/${hospital.id}`}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Map Section */}
          <div className="lg:col-span-1">
            <div className="bg-white p-4 rounded-lg shadow-sm sticky top-8">
              <div className="h-[600px] rounded-lg overflow-hidden bg-gray-100">
                {selectedHospital ? (
                  <iframe
                    src={selectedHospital.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  ></iframe>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    Select a hospital to view its location
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindHospital;
