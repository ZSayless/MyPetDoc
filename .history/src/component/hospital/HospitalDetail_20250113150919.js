import React from "react";
import { MapPin, Star, Clock, Phone, Mail, Globe, Heart } from "lucide-react";
import Logo from "../../assets/images/logo.png";

const HospitalDetail = () => {
  const hospital = {
    id: 1,
    name: "Pet Care Hospital & Wellness Center",
    subtitle: "Full Service Veterinary Hospital",
    address: "123 Nguyen Van Linh, District 7, HCMC",
    rating: 4.8,
    reviews: 234,
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <img src={Logo} alt="myPetDoc" className="h-12" />
          <div>
            <h3 className="font-bold text-xl">myPetDoc</h3>
            <p className="text-sm text-gray-500">HAPPY PES, NEARBY VETS</p>
          </div>
        </div>

        {/* Hospital Info */}
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {hospital.name}
          </h1>
          <p className="text-lg text-gray-600">{hospital.subtitle}</p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <Heart className="w-5 h-5" />
              <span>Add Favorite</span>
            </button>
            <button className="flex-1 md:flex-none px-8 py-3 bg-[#67009B] text-white rounded-lg hover:bg-[#53007c] transition-colors">
              Call Now
            </button>
            <button className="flex-1 md:flex-none px-8 py-3 bg-[#98E9E9] text-gray-700 rounded-lg hover:bg-[#7CD5D5] transition-colors">
              Get Directions
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
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
  );
};

export default HospitalDetail;
