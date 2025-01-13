import React from "react";
import { MapPin, Star, Clock, Phone, Mail, Globe } from "lucide-react";

const HospitalDetail = () => {
  const hospital = {
    id: 1,
    name: "PetCare Hospital",
    address: "123 Nguyen Van Linh, District 7, HCMC",
    rating: 4.8,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
    description: "PetCare Hospital is a modern veterinary facility providing comprehensive care for your pets. Our team of experienced veterinarians and staff are dedicated to delivering the highest quality medical care.",
    services: [
      "Emergency Care",
      "Surgery",
      "Vaccination",
      "Dental Care",
      "Laboratory",
      "X-Ray & Ultrasound"
    ],
    openHours: {
      weekday: "7:00 AM - 8:00 PM",
      weekend: "8:00 AM - 5:00 PM"
    },
    contact: {
      phone: "+84 28 1234 5678",
      email: "info@petcare.com",
      website: "www.petcare.com"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[200px] md:h-[300px] lg:h-[400px]">
        <img
          src={hospital.image}
          alt={hospital.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {hospital.name}
                </h1>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm md:text-base">{hospital.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold">{hospital.rating}</span>
                  </div>
                  <span className="text-gray-500">({hospital.reviews} reviews)</span>
                </div>
              </div>
              <button className="bg-[#98E9E9] text-gray-700 px-6 py-2.5 rounded-lg hover:bg-[#7CD5D5] transition-colors font-medium">
                Book Appointment
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 md:p-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <section>
                <h2 className="text-xl font-bold mb-4">About</h2>
                <p className="text-gray-600">{hospital.description}</p>
              </section>

              {/* Services */}
              <section>
                <h2 className="text-xl font-bold mb-4">Services</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {hospital.services.map((service, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 px-4 py-3 rounded-lg text-gray-700"
                    >
                      {service}
                    </div>
                  ))}
                </div>
              </section>

              {/* Map */}
              <section>
                <h2 className="text-xl font-bold mb-4">Location</h2>
                <div className="h-[300px] rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15677.977147902919!2d106.69842159999999!3d10.787312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1710900646899!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </section>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Opening Hours */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Opening Hours
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weekdays</span>
                    <span>{hospital.openHours.weekday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weekend</span>
                    <span>{hospital.openHours.weekend}</span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span>{hospital.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span>{hospital.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <span>{hospital.contact.website}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetail;
