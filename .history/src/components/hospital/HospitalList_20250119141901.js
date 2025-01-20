import React from "react";
import { MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HospitalList = ({
  hospitals,
  loading,
  onHospitalClick,
  selectedHospital,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-lg shadow-sm overflow-y-auto"
      style={{ maxHeight: "calc(100vh - 140px)" }}
    >
      <div className="p-4 space-y-4">
        {hospitals.map((hospital) => (
          <div
            key={hospital.id}
            className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
              selectedHospital?.id === hospital.id ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => onHospitalClick(hospital)}
          >
            <div className="p-3 lg:p-4">
              <div className="flex gap-3 lg:gap-4">
                <img
                  src={hospital.image}
                  alt={hospital.name}
                  className="w-16 h-16 lg:w-28 lg:h-28 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1 lg:mb-2">
                    <h3 className="text-sm lg:text-lg font-semibold text-gray-900 truncate">
                      {hospital.name}
                    </h3>
                    <span className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded-lg text-xs lg:text-sm">
                      <Star className="w-3 h-3 lg:w-4 lg:h-4 fill-current" />
                      {hospital.rating}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 mb-2 lg:mb-3 text-xs lg:text-sm">
                    <MapPin className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
                    <span className="truncate">{hospital.address}</span>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1 lg:gap-2">
                      {hospital.services.map((service, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 text-xs lg:text-sm bg-gray-100 text-gray-600 rounded-lg"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                    <button
                      className="px-3 lg:px-6 py-1.5 text-xs lg:text-base bg-[#98E9E9] hover:bg-[#7CD5D5] text-gray-700 rounded-lg transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/hospital/${hospital.id}`);
                      }}
                    >
                      Get Directions
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

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
