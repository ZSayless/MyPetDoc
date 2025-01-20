import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Star,
  MapPin,
  Calendar,
  Mail,
  Phone,
  Linkedin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import AllReviews from "./AllReviews";
import AllFavorites from "./AllFavorites";

const socialIcons = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
};

function Profile() {
  const { user, updateUser } = useAuth();
  const { t } = useTranslation();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState("profile"); // profile, reviews, favorites

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        avatar: user.avatar || "",
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(formData);
      showToast({
        type: "success",
        message: t("profile.updateSuccess"),
      });
    } catch (error) {
      showToast({
        type: "error",
        message: t("profile.updateError"),
      });
    }
  };

  const reviews = [
    {
      id: 1,
      hospitalName: "PetCare Hospital",
      rating: 4.5,
      comment:
        "Great service and friendly staff! The doctors were very professional and caring with my cat.",
      date: "2024-03-15",
      image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
    },
    {
      id: 2,
      hospitalName: "VetCare Clinic",
      rating: 5,
      comment:
        "Excellent facilities and professional doctors. They have the latest equipment and very clean environment.",
      date: "2024-03-10",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee",
    },
  ];

  const favoriteHospitals = [
    {
      id: 1,
      name: "PetCare Hospital",
      image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
      address: "123 Nguyen Van Linh, District 7, HCMC",
      rating: 4.8,
      reviews: 128,
    },
    {
      id: 2,
      name: "VetCare Clinic",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee",
      address: "456 Le Van Viet, District 9, HCMC",
      rating: 4.6,
      reviews: 96,
    },
  ];

  const [favorites, setFavorites] = useState(favoriteHospitals);

  const handleRemoveFavorite = (hospitalId) => {
    setFavorites(favorites.filter((hospital) => hospital.id !== hospitalId));
  };

  const SocialMediaLinks = () => (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Social Media</h2>
      <div className="space-y-4">
        {user.social.linkedin && (
          <a
            href={user.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-gray-600 hover:text-blue-600"
          >
            <Linkedin size={20} />
            <span>LinkedIn</span>
          </a>
        )}

        {user.social.facebook && (
          <a
            href={user.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-gray-600 hover:text-blue-600"
          >
            <Facebook size={20} />
            <span>Facebook</span>
          </a>
        )}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-600">
            {user?.avatar || user?.name?.[0] || "U"}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {user?.name || "User Name"}
            </h1>
            <div className="flex flex-wrap gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <Mail size={18} />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{t("profile.joined")}: March 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reviews */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{t("profile.recentReviews")}</h2>
          <Link
            to="/profile/reviews"
            className="text-blue-600 hover:text-blue-700"
          >
            {t("profile.viewAllReviews")}
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <img
                  src={review.image}
                  alt={review.hospitalName}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{review.hospitalName}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">
                      {review.rating}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {review.comment}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Favorite Hospitals */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{t("profile.favoriteHospitals")}</h2>
          <Link
            to="/profile/favorites"
            className="text-blue-600 hover:text-blue-700"
          >
            {t("profile.viewAllFavorites")}
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {favoriteHospitals.map((hospital) => (
            <Link
              key={hospital.id}
              to={`/hospital/${hospital.id}`}
              className="flex gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              <img
                src={hospital.image}
                alt={hospital.name}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-semibold mb-1">{hospital.name}</h3>
                <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                  <MapPin size={14} />
                  <span>{hospital.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">
                      {hospital.rating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({hospital.reviews} {t("hospital.reviews")})
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
