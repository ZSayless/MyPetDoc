import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Star, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AllFavorites() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lấy danh sách favorites từ localStorage
    const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    
    // Lấy thông tin chi tiết của từng hospital
    const favoriteHospitals = savedFavorites.map(id => {
      // Trong thực tế sẽ fetch từ API
      // Tạm thời dùng mock data
      return {
        id,
        name: "Pet Care International",
        location: "District 1, HCMC",
        rating: 4.8,
        reviews: 234,
        image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3",
        isActive: true
      };
    });

    setFavorites(favoriteHospitals);
    setLoading(false);
  }, []);

  const handleHospitalClick = (hospital) => {
    navigate(`/hospital/${hospital.id}`);
  };

  if (loading) {
    return <div className="text-center py-8">{t("common.loading")}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{t("profile.allFavorites.title")}</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-500 text-center">
          {t("profile.allFavorites.noFavorites")}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((hospital) => (
            <div
              key={hospital.id}
              onClick={() => handleHospitalClick(hospital)}
              className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            >
              <img
                src={hospital.image}
                alt={hospital.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-medium text-lg mb-2">{hospital.name}</h3>
                <div className="flex items-center gap-1 text-gray-500 mb-2">
                  <MapPin size={16} />
                  <span className="text-sm">{hospital.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-yellow-400">
                    <Star size={16} fill="currentColor" />
                    <span className="ml-1 text-sm font-medium">
                      {hospital.rating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({hospital.reviews} {t("common.reviews")})
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllFavorites;
