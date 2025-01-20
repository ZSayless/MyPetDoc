import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Star } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function AllReviews() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lấy tất cả reviews từ localStorage
    const allReviews = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("reviews_")) {
        const hospitalReviews = JSON.parse(localStorage.getItem(key));
        const hospitalId = key.split("_")[1];
        
        // Lọc reviews của user hiện tại và thêm hospitalId
        const userReviews = hospitalReviews
          .filter(review => review.user.name === user.name)
          .map(review => ({
            ...review,
            hospitalId
          }));
          
        allReviews.push(...userReviews);
      }
    }

    // Sắp xếp theo thời gian mới nhất
    allReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setReviews(allReviews);
    setLoading(false);
  }, [user.name]);

  if (loading) {
    return <div className="text-center py-8">{t("common.loading")}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{t("profile.allReviews.title")}</h1>
      
      {reviews.length === 0 ? (
        <p className="text-gray-500 text-center">
          {t("profile.allReviews.noReviews")}
        </p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <Link 
                    to={`/hospital/${review.hospitalId}`}
                    className="text-lg font-medium hover:text-blue-600"
                  >
                    {review.hospitalName}
                  </Link>
                  <div className="flex items-center gap-1 text-yellow-400 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < review.rating ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                </div>
                <time className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </time>
              </div>
              <p className="mt-4 text-gray-600">{review.content}</p>
              {review.images && review.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {review.images.map((image, idx) => (
                    <div key={idx} className="relative aspect-square">
                      <img
                        src={image}
                        alt={`Review image ${idx + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllReviews;
