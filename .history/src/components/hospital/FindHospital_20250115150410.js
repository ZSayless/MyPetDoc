import React, { useState } from "react";
import { Search } from "lucide-react";

function FindHospital() {
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data cho hospitals
  const hospitals = [
    {
      id: 1,
      name: "PetCare Hospital",
      address: "123 Main St, District 1, HCMC",
      rating: 4.8,
      reviews: 128,
      image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6696584237106!2d106.66488007465357!3d10.759920059446151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f9023a3a85d%3A0x9259bad475336d5c!2zQuG7h25oIHZp4buHbiBUaMO6IHkgUGV0UHJv!5e0!3m2!1svi!2s!4v1710338305071!5m2!1svi!2s"
    },
    {
      id: 2,
      name: "VetCare Clinic",
      address: "456 Le Van Viet, District 9, HCMC",
      rating: 4.5,
      reviews: 96,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.9559408496366!2d106.77556907465394!3d10.823529459229378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175276398969f7b%3A0x9672b7efd0893fc4!2zQuG7h25oIHZp4buHbiBUaMO6IFkgU2FpZ29u!5e0!3m2!1svi!2s!4v1710338407655!5m2!1svi!2s"
    },
    // Thêm các hospital khác...
  ];

  // Filter hospitals based on search term
  const filteredHospitals = hospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find a Hospital</h1>

      {/* Search Bar */}
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search by name or location..."
          className="w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Hospital List */}
        <div className="space-y-4">
          {filteredHospitals.map((hospital) => (
            <div
              key={hospital.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedHospital?.id === hospital.id
                  ? "border-blue-500 bg-blue-50"
                  : "hover:border-gray-300"
              }`}
              onClick={() => setSelectedHospital(hospital)}
            >
              <div className="flex gap-4">
                <img
                  src={hospital.image}
                  alt={hospital.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-lg">{hospital.name}</h3>
                  <p className="text-gray-600">{hospital.address}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-yellow-500">★</span>
                    <span className="font-medium">{hospital.rating}</span>
                    <span className="text-gray-500">
                      ({hospital.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map Display */}
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
  );
}

export default FindHospital;
