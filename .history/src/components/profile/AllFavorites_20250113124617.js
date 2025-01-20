import React from "react";
import { Star, MapPin, ArrowLeft } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

function AllFavorites() {
  const navigate = useNavigate();
  const favorites = [
    // Thêm nhiều favorites hơn vào đây
    {
      id: 1,
      name: "PetCare Hospital",
      image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
      address: "123 Nguyen Van Linh, District 7, HCMC",
      rating: 4.8,
      reviews: 128,
    },
    // ... thêm favorites khác
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Profile
          </button>

          <h1 className="text-2xl font-bold mb-6">Favorite Hospitals</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {favorites.map((hospital) => (
              <Link
                key={hospital.id}
                to={`/hospital/${hospital.id}`}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <img
                  src={hospital.image}
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
                      {hospital.reviews} reviews
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
        </div>
      </div>
    </div>
  );
}

export default AllFavorites;
