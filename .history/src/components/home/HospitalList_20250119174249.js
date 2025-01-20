import React, { useState, useRef, useMemo, useCallback } from "react";
import { MapPin, Search, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAsync } from "../../hooks/useAsync";
import { useDebounce } from "../../hooks/useDebounce";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";

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

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data: hospitals, loading, error } = useAsync(async () => {
    return await hospitalService.getHospitals(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  const filteredHospitals = useMemo(
    () =>
      hospitals.filter((hospital) =>
        hospital.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm]
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
