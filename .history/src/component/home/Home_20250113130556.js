import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, MapPin, Clock, ArrowRight, ArrowLeft, Heart } from "lucide-react";
import HomeBanner from "./HomeBanner";

// Thêm import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

function Home() {
  const recommendedHospitals = [
    {
      id: 1,
      name: "PetCare Hospital",
      image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
      rating: 4.8,
      reviews: 128,
      address: "123 Nguyen Van Linh, District 7, HCMC",
      isOpen: true,
      specialties: ["Surgery", "Vaccination", "Grooming"],
    },
    {
      id: 2,
      name: "VetCare Clinic",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee",
      rating: 4.6,
      reviews: 96,
      address: "456 Le Van Viet, District 9, HCMC",
      isOpen: true,
      specialties: ["Emergency", "Dental Care", "Pet Hotel"],
    },
    {
      id: 3,
      name: "Pet Health Center",
      image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def",
      rating: 4.9,
      reviews: 156,
      address: "789 Nguyen Thi Minh Khai, District 1, HCMC",
      isOpen: false,
      specialties: ["Internal Medicine", "Laboratory", "Pharmacy"],
    },
    {
      id: 4,
      name: "Animal Care Hospital",
      image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97",
      rating: 4.7,
      reviews: 89,
      address: "321 Pham Van Dong, Binh Thanh District, HCMC",
      isOpen: true,
      specialties: ["Orthopedics", "Ultrasound", "Rehabilitation"],
    },
  ];

  const regions = [
    {
      name: "Ho Chi Minh City",
      count: 156,
      areas: ["District 1", "District 7", "Thu Duc", "Binh Thanh"]
    },
    {
      name: "Ha Noi",
      count: 124,
      areas: ["Hoan Kiem", "Ba Dinh", "Dong Da", "Cau Giay"]
    },
    {
      name: "Da Nang",
      count: 45,
      areas: ["Hai Chau", "Thanh Khe", "Son Tra", "Ngu Hanh Son"]
    },
  ];

  const newsAndEvents = [
    {
      id: 1,
      title: "Free Vaccination Campaign 2024",
      image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def",
      date: "Mar 15, 2024",
      category: "Event",
      description: "Get free vaccinations for your pets this March",
    },
    {
      id: 2,
      title: "New Pet Health Guidelines",
      image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97",
      date: "Mar 12, 2024",
      category: "News",
      description: "Updated health guidelines for pet owners",
    },
    {
      id: 3,
      title: "Pet Dental Care Month",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee",
      date: "Mar 10, 2024",
      category: "Event",
      description: "Special discounts on dental services",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section */}
      <HomeBanner />

      {/* Quick Access Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Hospitals by Region */}
            <div className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <MapPin className="mr-2 text-blue-600" />
                Find by Region
              </h3>
              <div className="space-y-4">
                {regions.map(region => (
                  <div key={region.name} className="border-b pb-4 last:border-0">
                    <Link 
                      to={`/find-hospital?region=${region.name}`}
                      className="flex items-center justify-between group"
                    >
                      <div>
                        <h4 className="font-medium group-hover:text-blue-600 transition-colors">
                          {region.name}
                        </h4>
                        <p className="text-sm text-gray-500">{region.count} hospitals</p>
                      </div>
                      <ArrowRight 
                        size={16} 
                        className="text-gray-400 group-hover:text-blue-600 transition-colors" 
                      />
                    </Link>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {region.areas.map(area => (
                        <span 
                          key={area} 
                          className="text-xs bg-white px-2 py-1 rounded-full text-gray-600"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recently Reviewed */}
            <div className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Star className="mr-2 text-yellow-500" />
                Recently Reviewed
              </h3>
              <div className="space-y-6">
                {recommendedHospitals.slice(0, 3).map(hospital => (
                  <Link 
                    key={hospital.id}
                    to={`/hospital/${hospital.id}`}
                    className="flex items-start gap-4 group"
                  >
                    <img 
                      src={hospital.image} 
                      alt={hospital.name}
                      className="w-20 h-20 rounded-lg object-cover group-hover:opacity-90 transition-opacity"
                    />
                    <div>
                      <h4 className="font-medium group-hover:text-blue-600 transition-colors">
                        {hospital.name}
                      </h4>
                      <div className="flex items-center mt-1">
                        <div className="flex items-center text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              fill={i < Math.floor(hospital.rating) ? "currentColor" : "none"}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">{hospital.rating}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                        {hospital.address}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* News Feed */}
            <div className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Clock className="mr-2 text-green-600" />
                Latest Updates
              </h3>
              <div className="space-y-6">
                {newsAndEvents.map(item => (
                  <Link 
                    key={item.id}
                    to={`/news/${item.id}`}
                    className="block group"
                  >
                    <div className="flex gap-4">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-20 h-20 rounded-lg object-cover group-hover:opacity-90 transition-opacity"
                      />
                      <div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.category === 'Event' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                        }`}>
                          {item.category}
                        </span>
                        <h4 className="font-medium mt-2 group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">
                          {item.date}
                        </p>
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Recommended Hospitals</h2>
            <div className="flex gap-4">
              <button className="prev-button p-2 rounded-full border hover:bg-gray-50">
                <ArrowLeft size={20} />
              </button>
              <button className="next-button p-2 rounded-full border hover:bg-gray-50">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: '.prev-button',
              nextEl: '.next-button',
            }}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
          >
            {recommendedHospitals.map(hospital => (
              <SwiperSlide key={hospital.id}>
                <div className="bg-white rounded-lg overflow-hidden border group">
                  <div className="relative">
                    <img
                      src={hospital.image}
                      alt={hospital.name}
                      className="w-full h-48 object-cover"
                    />
                    <button className="absolute top-4 right-4 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Heart size={16} />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg">{hospital.name}</h3>
                    <div className="flex items-center mt-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            fill={i < hospital.rating ? "currentColor" : "none"}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center mt-2 text-gray-600">
                      <MapPin size={16} className="mr-2" />
                      <span className="text-sm">{hospital.address}</span>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <span className={`text-sm ${hospital.isOpen ? 'text-green-600' : 'text-red-600'}`}>
                        {hospital.isOpen ? 'Open Now' : 'Closed'}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                      {hospital.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
}

export default Home;
