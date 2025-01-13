import React, { useState } from 'react';
import { MapPin, Search, Sliders } from 'lucide-react';

const MOCK_HOSPITALS = [
  {
    id: 1,
    name: "PetCare Hospital",
    address: "123 Nguyen Van Linh, District 7, HCMC",
    distance: "0.5 km",
    rating: 4.8,
    services: ["Emergency", "Surgery", "Vaccination"],
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7"
  },
  // Thêm mock data cho các bệnh viện khác
];

const FindHospital = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    distance: 'all',
    specialty: 'all',
    rating: 'all'
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header Section */}
      <section className="bg-white py-8 shadow-sm">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Find a Hospital Near Me
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Locate the nearest veterinary hospitals in your area. Use the map or browse the list below to find the perfect care for your pets.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by hospital name or location..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Sliders className="w-5 h-5" />
            Filters
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Distance
                </label>
                <select
                  className="w-full rounded-lg border-gray-300"
                  value={selectedFilters.distance}
                  onChange={(e) => setSelectedFilters({...selectedFilters, distance: e.target.value})}
                >
                  <option value="all">All Distances</option>
                  <option value="1">Within 1 km</option>
                  <option value="5">Within 5 km</option>
                  <option value="10">Within 10 km</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Specialty
                </label>
                <select
                  className="w-full rounded-lg border-gray-300"
                  value={selectedFilters.specialty}
                  onChange={(e) => setSelectedFilters({...selectedFilters, specialty: e.target.value})}
                >
                  <option value="all">All Specialties</option>
                  <option value="emergency">Emergency Care</option>
                  <option value="surgery">Surgery</option>
                  <option value="dental">Dental Care</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <select
                  className="w-full rounded-lg border-gray-300"
                  value={selectedFilters.rating}
                  onChange={(e) => setSelectedFilters({...selectedFilters, rating: e.target.value})}
                >
                  <option value="all">All Ratings</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Map and List Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map */}
          <div className="bg-white rounded-lg shadow-sm p-4 h-[600px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6696584237116!2d106.66488007465357!3d10.75992005944615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f9023a3a85d%3A0x9259bad475336d5c!2zQuG7h25oIHZp4buHbiBUaMO6IHkgUGV0UHJv!5e0!3m2!1svi!2s!4v1710338305071!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{border: 0}}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            />
          </div>

          {/* Hospital List */}
          <div className="space-y-4">
            {MOCK_HOSPITALS.map((hospital) => (
              <div key={hospital.id} className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex gap-4">
                  <img
                    src={hospital.image}
                    alt={hospital.name}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{hospital.name}</h3>
                    <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
                      <MapPin className="w-4 h-4" />
                      <span>{hospital.address}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-sm text-gray-600">{hospital.distance}</span>
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded">
                        {hospital.rating} ★
                      </span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {hospital.services.map((service, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button className="bg-[#98E9E9] text-gray-700 px-4 py-2 rounded-lg hover:bg-[#7CD5D5] self-center">
                    Get Directions
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindHospital; 