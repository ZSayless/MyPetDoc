import React, { useEffect, useState } from "react";
import { Star, MapPin, ArrowLeft } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getHospitalFavorites } from "../../services/favoriteService";

function AllFavorites() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [favoriteError, setFavoriteError] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [pagination, setPagination] = useState({})

  const fetchAllFavorites = async (page) => {
    try {
      const data = await getHospitalFavorites(page);
      const favoritesRes = Array.isArray(data.data.favorites) ? data.data.favorites : []
      setPagination(data.data.pagination)

      setFavorites(favoritesRes);
    } catch (error) {
      console.error("Error fetching banners:", error);
      setFavoriteError(true);
    }
  };

  const handleChangePage = (isIncrease = false) => {

    fetchAllFavorites(isIncrease ? pagination.page + 1 : pagination.page - 1)
  }

  useEffect(() => {
    fetchAllFavorites();
  }, []);


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft size={20} className="mr-2" />
            {t("profile.backToProfile")}
          </button>

          <h1 className="text-2xl font-bold mb-6">
            {t("profile.allFavorites.title")}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {favorites.map((hospital) => (
              <Link
                key={hospital.id}
                to={`/hospital/${hospital.id}`}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <img
                  src={hospital.thumbnail}
                  alt={hospital.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium">{hospital.name}</h3>
                  <div className="flex items-center mt-1">
                    <Star className="text-yellow-400" size={16} />
                    <span className="ml-1 text-sm">{hospital.rating}</span>
                    <span className="mx-1 text-gray-500">·</span>
                    <span className="text-sm text-gray-500">
                      {hospital.favorites} {t("common.favorites")}
                    </span>
                  </div>
                  <div className="flex items-center mt-2 text-gray-600">
                    <MapPin size={16} className="mr-1" />
                    <p className="text-sm">{hospital.address}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              disabled={pagination.page === 1}
              onClick={() => handleChangePage()}
            >
              Trước
            </button>
            <button
              className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              disabled={pagination.page === pagination.totalPages}
              onClick={() => handleChangePage(true)}
            >
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllFavorites;
