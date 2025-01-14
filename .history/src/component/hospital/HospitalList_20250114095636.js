import React from "react";
import { MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HospitalList = ({ hospitals, loading }) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-full lg:w-1/2 overflow-y-auto"
      style={{ height: "calc(100vh - 200px)" }}
    >
      <div className="p-3 lg:p-4 space-y-3 lg:space-y-4">
        <div className="p-3">
          {hospitals.map((hospital) => (
            <div
              key={hospital.id}
              className="bg-white rounded-lg p-3 mb-3 hover:shadow-md transition-shadow"
            >
              <div className="flex gap-3">
                <img
                  src={hospital.image}
                  alt={hospital.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-base font-semibold text-gray-900 truncate">
                      {hospital.name}
                    </h3>
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 rounded text-sm">
                      <Star className="w-4 h-4 fill-current" />
                      {hospital.rating}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 mb-2 text-sm">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{hospital.address}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {hospital.services.slice(0, 3).map((service, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded"
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

        {loading && (
          <div className="text-center py-4">
            <div className="w-6 h-6 lg:w-8 lg:h-8 border-4 border-[#98E9E9] border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalList;
