import React from "react";
import { MapPin, Phone } from "lucide-react";

const HospitalDetail = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar đã có sẵn */}

      {/* Feature Section - Call Now & Get Directions */}
      <section className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">Pet Care Hospital</h1>
              <p className="text-gray-600 mt-1">Specialized in small animal care</p>
            </div>
            <div className="flex gap-4">
              <button className="bg-[#4611a7] text-white px-6 py-2 rounded-lg hover:bg-[#3a0d8c] transition-colors flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Call Now
              </button>
              <button className="bg-[#98E9E9] text-gray-700 px-6 py-2 rounded-lg hover:bg-[#7CD5D5] transition-colors flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section - Map & Info */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map */}
            <div className="bg-white rounded-lg shadow-sm p-4 h-[400px]">
              <div className="w-full h-full bg-gray-200 rounded-lg">
                {/* Integrate Google Maps here */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=..." 
                  width="100%" 
                  height="100%" 
                  style={{border: 0}}
                  allowFullScreen="" 
                  loading="lazy"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>

            {/* Hospital Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Hospital Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-600 mt-1" />
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p className="text-gray-600">123 Nguyen Van Linh, District 7, Ho Chi Minh City</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-600 mt-1" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-gray-600">+84 123 456 789</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Working Hours</h3>
                    <div className="grid grid-cols-2 gap-4 text-gray-600">
                      <div>
                        <p>Monday - Friday</p>
                        <p>8:00 AM - 8:00 PM</p>
                      </div>
                      <div>
                        <p>Saturday - Sunday</p>
                        <p>9:00 AM - 6:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Services</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>General Checkup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Vaccination</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Surgery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Pet Grooming</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Photo Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 8].map((item) => (
                <div key={item} className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src={`https://source.unsplash.com/random/400x400?pet-hospital&${item}`}
                    alt="Hospital"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">What Our Customers Say</h2>
              <div className="flex items-center justify-center mt-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">4.9 out of 5</span>
              </div>
            </div>

            <div className="grid gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-gray-50 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-medium shadow-md">
                      {['A', 'M', 'J'][item - 1]}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {['Alex Johnson', 'Maria Garcia', 'James Wilson'][item - 1]}
                      </h3>
                      <p className="text-gray-500 text-sm">Verified Customer</p>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className="w-4 h-4 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {[
                      "Exceptional care for my dog! The staff was incredibly professional and caring. The facilities are modern and clean. I particularly appreciated how they took time to explain everything in detail.",
                      "Best veterinary experience ever! Dr. Garcia was amazing with my anxious cat. The entire team made us feel comfortable and well-cared for. Highly recommend their services!",
                      "Outstanding service from start to finish. The online booking was easy, wait times were minimal, and the treatment was excellent. My pet's health improved significantly after the visit."
                    ][item - 1]}
                  </p>
                  <p className="text-gray-500 text-sm mt-4">Posted on {['March 15, 2024', 'March 12, 2024', 'March 10, 2024'][item - 1]}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <button className="bg-white text-blue-600 border border-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                View All Reviews
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HospitalDetail; 