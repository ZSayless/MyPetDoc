import React from "react";
import { MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HospitalList = ({ hospitals, loading, onHospitalClick, selectedHospital }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      {hospitals.map((hospital) => (
        <div
          key={hospital.id}
          onClick={() => onHospitalClick(hospital)}
          className={`bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transition-all ${
            selectedHospital?.id === hospital.id
              ? "ring-2 ring-blue-500"
              : "hover:shadow-md"
          }`}
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
                  <h3 className="text-xl font-semibold mb-2">{hospital.name}</h3>
                  <p className="text-gray-600 mb-2">{hospital.address}</p>
                  <p className="text-gray-600">{hospital.distance}</p>
                </div>
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span className="font-semibold">{hospital.rating}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {hospital.services.map((service, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HospitalList;
