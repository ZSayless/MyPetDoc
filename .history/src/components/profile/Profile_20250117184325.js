import React, { useState } from "react";
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
} from "lucide-react";
import { useTranslation } from "react-i18next";

function Profile() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("about");

  const user = {
    name: "John Doe",
    avatar: "J",
    role: "Pet Owner",
    location: "Ho Chi Minh City, Vietnam",
    joinDate: "March 2024",
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    email: "john.doe@example.com",
    phone: "+84 123 456 789",
    address: "123 Pet Street, District 1, HCMC",
    social: {
      linkedin: "https://linkedin.com/in/johndoe",
      facebook: "https://facebook.com/johndoe",
      twitter: "https://twitter.com/johndoe",
    },
    stats: {
      reviews: 15,
      favorites: 8,
      blogs: 5,
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Header Section */}
            <div className="p-6 sm:p-8 border-b">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-medium">
                  {user.avatar}
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                  <p className="text-gray-500">{user.role}</p>
                </div>
                <Link
                  to="/setting"
                  className="ml-auto bg-[#98E9E9] text-gray-700 px-4 py-2 rounded-lg hover:bg-[#7CD5D5]"
                >
                  {t("profile.actions.editProfile")}
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-6 flex justify-center sm:justify-start gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {user.stats.reviews}
                  </div>
                  <div className="text-sm text-gray-500">
                    {t("profile.stats.reviews")}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {user.stats.favorites}
                  </div>
                  <div className="text-sm text-gray-500">
                    {t("profile.stats.favorites")}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {user.stats.blogs}
                  </div>
                  <div className="text-sm text-gray-500">
                    {t("profile.stats.blogs")}
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 sm:p-8">
              <div className="space-y-6">
                {/* About */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">
                    {t("profile.info.about")}
                  </h2>
                  <p className="text-gray-600">{user.about}</p>
                </div>

                {/* Contact Information */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">
                    {t("profile.info.contact")}
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-5 h-5" />
                      <span>{user.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-5 h-5" />
                      <span>
                        {t("profile.info.joinDate")}: {user.joinDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-5 h-5" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-5 h-5" />
                      <span>{user.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">
                    {t("profile.social.title")}
                  </h2>
                  <div className="flex gap-4">
                    <a
                      href={user.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={user.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a
                      href={user.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/all-reviews"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                  >
                    <Star className="w-5 h-5" />
                    <span>
                      {t("profile.actions.viewAll")} {t("profile.stats.reviews")}
                    </span>
                  </Link>
                  <Link
                    to="/all-favorites"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                  >
                    <Star className="w-5 h-5" />
                    <span>
                      {t("profile.actions.viewAll")} {t("profile.stats.favorites")}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
