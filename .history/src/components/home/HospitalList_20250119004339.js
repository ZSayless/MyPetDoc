import React, { useState, useRef, useMemo, useCallback } from "react";
import { MapPin, Search, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import debounce from "lodash/debounce";

function HospitalList() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const hospitalsPerPage = 5;

  const searchRef = useRef(null);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    searchRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const hospitals = [
    {
      id: 1,
      name: "PawSome Pet Hospital",
      info: "Information of Hospital",
      address: "123 Nguyen Hue, District 1, HCMC",
      rating: 4.5,
      reviews: 5,
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7",
      services: ["Surgery", "Dentistry"],
    },
    {
      id: 2,
      name: "Happy Tails Clinic",
      info: "Information of Hospital",
      address: "456 Le Loi, District 3, HCMC",
      rating: 4.8,
      reviews: 5,
      image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf",
      services: ["Surgery", "Emergency"],
    },
    {
      id: 3,
      name: "Pet Care Center",
      info: "Information of Hospital",
      address: "789 Vo Van Tan, District 3, HCMC",
      rating: 4.6,
      reviews: 8,
      image: "https://images.unsplash.com/photo-1606425271394-c3ca9aa1fc06",
      services: ["Vaccination", "Grooming"],
    },
    {
      id: 4,
      name: "VetCare Hospital",
      info: "Information of Hospital",
      address: "321 Nguyen Thi Minh Khai, District 1, HCMC",
      rating: 4.7,
      reviews: 12,
      image: "https://images.unsplash.com/photo-1629909615184-74f495363b67",
      services: ["Surgery", "Dentistry", "Emergency"],
    },
    {
      id: 5,
      name: "Loving Paws Clinic",
      info: "Information of Hospital",
      address: "159 Nam Ky Khoi Nghia, District 3, HCMC",
      rating: 4.9,
      reviews: 15,
      image: "https://images.unsplash.com/photo-1599443015574-f61d7c2f1095",
      services: ["Grooming", "Boarding"],
    },
    {
      id: 6,
      name: "Animal Health Center",
      info: "Information of Hospital",
      address: "753 Dien Bien Phu, District 3, HCMC",
      rating: 4.4,
      reviews: 7,
      image: "https://images.unsplash.com/photo-1596272875729-ed2ff7d6d9c5",
      services: ["Surgery", "Vaccination"],
    },
    {
      id: 7,
      name: "Pet Plus Hospital",
      info: "Information of Hospital",
      address: "852 Cach Mang Thang 8, District 10, HCMC",
      rating: 4.3,
      reviews: 9,
      image: "https://images.unsplash.com/photo-1601001815894-4bb6c81416d7",
      services: ["Emergency", "Pharmacy"],
    },
    {
      id: 8,
      name: "City Pets Clinic",
      info: "Information of Hospital",
      address: "147 Ly Tu Trong, District 1, HCMC",
      rating: 4.7,
      reviews: 11,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee",
      services: ["Surgery", "Dentistry"],
    },
    {
      id: 9,
      name: "Furry Friends Hospital",
      info: "Information of Hospital",
      address: "369 Le Van Sy, District 3, HCMC",
      rating: 4.6,
      reviews: 6,
      image: "https://images.unsplash.com/photo-1598791318878-10e76d178023",
      services: ["Vaccination", "Grooming"],
    },
    {
      id: 10,
      name: "PetWell Medical",
      info: "Information of Hospital",
      address: "951 Nguyen Trai, District 5, HCMC",
      rating: 4.8,
      reviews: 14,
      image: "https://images.unsplash.com/photo-1596272875729-ed2ff7d6d9c5",
      services: ["Surgery", "Emergency"],
    },
  ];

  const filteredHospitals = useMemo(
    () =>
      hospitals.filter((hospital) =>
        hospital.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm]
  );

  const debouncedSearch = useCallback(
    debounce((value) => setSearchTerm(value), 300),
    []
  );

  const indexOfLastHospital = currentPage * hospitalsPerPage;
  const indexOfFirstHospital = indexOfLastHospital - hospitalsPerPage;
  const currentHospitals = filteredHospitals.slice(
    indexOfFirstHospital,
    indexOfLastHospital
  );
  const totalPages = Math.ceil(filteredHospitals.length / hospitalsPerPage);

  return (
    <section className="py-8 md:py-16 bg-gradient-to-b from-[#98E9E9]/10 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1A3C8E] mb-2 md:mb-4">
            {t("home.hospitalList.title")}
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            {t("home.hospitalList.subtitle")}
          </p>
        </div>

        <div ref={searchRef} className="max-w-2xl mx-auto mb-8 md:mb-12 px-4">
          <div className="relative">
            <input
              type="text"
              placeholder={t("home.hospitalList.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 md:pl-12 pr-4 py-2 md:py-3 border-2 rounded-full text-sm md:text-base focus:outline-none focus:border-[#98E9E9] transition-colors"
            />
            <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {currentHospitals.map((hospital, index) => (
            <div
              key={hospital.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-3 md:p-4"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex gap-3 md:gap-4 items-start">
                  <span className="text-base font-medium text-gray-400 w-6 hidden md:block">
                    {indexOfFirstHospital + index + 1}
                  </span>
                  <div className="w-full md:w-48 h-48 md:h-32 rounded-lg overflow-hidden">
                    <img
                      src={hospital.image}
                      alt={hospital.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-2 md:gap-0">
                    <div>
                      <h3 className="text-lg font-bold text-[#1A3C8E]">
                        {hospital.name}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="line-clamp-1">{hospital.address}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-[#98E9E9]/10 px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">
                        {hospital.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {hospital.services.map((service, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 text-sm text-gray-500">
                    {hospital.reviews} {t("home.hospitalList.verifiedReviews")}
                  </div>

                  <div className="flex justify-end mt-3">
                    <Link
                      to={`/hospital/${hospital.id}`}
                      className="w-full md:w-auto px-4 py-2 md:py-1.5 bg-[#1A3C8E] text-white text-center text-sm rounded-full hover:bg-[#98E9E9] hover:text-[#1A3C8E] transition-colors"
                    >
                      {t("home.hospitalList.viewDetails")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-1 md:gap-2 mt-6 md:mt-8">
            <button
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 md:p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-7 h-7 md:w-8 md:h-8 text-sm rounded-full ${
                  currentPage === page
                    ? "bg-[#1A3C8E] text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                handlePageChange(Math.min(currentPage + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-1.5 md:p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default HospitalList;
