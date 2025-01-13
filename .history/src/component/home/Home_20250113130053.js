import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, MapPin, Clock, ArrowRight } from "lucide-react";
import HomeBanner from "./HomeBanner";

function Home() {
  // Mock data cho các bệnh viện được đề xuất
  const recommendedHospitals = [
    {
      id: 1,
      name: "PetCare Hospital",
      image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
      rating: 4.8,
      reviews: 128,
      address: "123 Nguyen Van Linh, District 7, HCMC",
      isOpen: true,
    },
    // Thêm các bệnh viện khác...
  ];

  // Mock data cho tin tức và sự kiện
  const newsAndEvents = [
    {
      id: 1,
      title: "Vaccination Campaign 2024",
      image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def",
      date: "Mar 15, 2024",
      category: "Event",
    },
    // Thêm tin tức khác...
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section */}
      <HomeBanner />

      {/* Quick Access Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Hospitals by Region */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Find by Region</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/find-hospital?region=hcmc" className="text-gray-600 hover:text-blue-600 flex items-center">
                    <ArrowRight size={16} className="mr-2" />
                    Ho Chi Minh City
                  </Link>
                </li>
                <li>
                  <Link to="/find-hospital?region=hanoi" className="text-gray-600 hover:text-blue-600 flex items-center">
                    <ArrowRight size={16} className="mr-2" />
                    Ha Noi
                  </Link>
                </li>
                {/* Thêm các khu vực khác */}
              </ul>
            </div>

            {/* Recently Reviewed */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Recently Reviewed</h3>
              <div className="space-y-4">
                {recommendedHospitals.slice(0, 3).map(hospital => (
                  <Link 
                    key={hospital.id}
                    to={`/hospital/${hospital.id}`}
                    className="flex items-start gap-3 hover:bg-gray-100 p-2 rounded-lg"
                  >
                    <img 
                      src={hospital.image} 
                      alt={hospital.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="font-medium">{hospital.name}</h4>
                      <div className="flex items-center text-sm text-gray-600">
                        <Star size={14} className="text-yellow-400" />
                        <span className="ml-1">{hospital.rating}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* News Feed */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Latest News & Events</h3>
              <div className="space-y-4">
                {newsAndEvents.map(item => (
                  <Link 
                    key={item.id}
                    to={`/news/${item.id}`}
                    className="block hover:bg-gray-100 p-2 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock size={14} className="mr-1" />
                          {item.date}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Hospitals Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Recommended Hospitals</h2>
            <Link 
              to="/find-hospital"
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              View All
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recommendedHospitals.map(hospital => (
              <Link
                key={hospital.id}
                to={`/hospital/${hospital.id}`}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={hospital.image}
                  alt={hospital.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{hospital.name}</h3>
                  <div className="flex items-center mb-2">
                    <Star className="text-yellow-400" size={16} />
                    <span className="ml-1 text-sm">{hospital.rating}</span>
                    <span className="mx-1 text-gray-500">·</span>
                    <span className="text-sm text-gray-500">
                      {hospital.reviews} reviews
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-1" />
                    <p className="text-sm truncate">{hospital.address}</p>
                  </div>
                  <div className={`mt-2 text-sm ${hospital.isOpen ? 'text-green-600' : 'text-red-600'}`}>
                    {hospital.isOpen ? 'Open Now' : 'Closed'}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
