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
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-medium">
                {user.avatar}
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-500">{user.role}</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{t("profile.info.joinDate")}: {user.joinDate}</span>
                  </div>
                </div>
              </div>
              <Link
                to="/setting"
                className="md:ml-auto bg-[#98E9E9] text-gray-700 px-4 py-2 rounded-lg hover:bg-[#7CD5D5]"
              >
                {t("profile.actions.editProfile")}
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{user.stats.reviews}</div>
                <div className="text-gray-500">{t("profile.stats.reviews")}</div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{user.stats.favorites}</div>
                <div className="text-gray-500">{t("profile.stats.favorites")}</div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{user.stats.blogs}</div>
                <div className="text-gray-500">{t("profile.stats.blogs")}</div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-lg shadow-sm">
            {/* Tabs */}
            <div className="border-b">
              <div className="flex">
                <button
                  onClick={() => setActiveTab("about")}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === "about"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {t("profile.info.about")}
                </button>
                <button
                  onClick={() => setActiveTab("contact")}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === "contact"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {t("profile.info.contact")}
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "about" && (
                <div>
                  <p className="text-gray-600">{user.about}</p>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t("profile.social.title")}
                    </h3>
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
                </div>
              )}

              {activeTab === "contact" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">{t("profile.info.email")}</div>
                      <div className="text-gray-900">{user.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">{t("profile.info.phone")}</div>
                      <div className="text-gray-900">{user.phone}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">{t("profile.info.address")}</div>
                      <div className="text-gray-900">{user.address}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
