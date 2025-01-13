import { Link } from "react-router-dom";

function AboutUs() {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      content: "MyPetDoc helped me find the perfect care for my pet. Amazing platform!",
      role: "Pet Owner",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    },
    {
      id: 2,
      name: "Jane Smith",
      content: "The platform is easy to use, and the recommendations were spot on!",
      image: "data:image/jpeg;base64,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",
      image: "data:image/jpeg;base64,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",
      image: "data:image/jpeg;base64,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",
    },
  ];

  const teamMembers = [
    {
      name: "Alice Nguyen",
      role: "Founder",
      description: "Alice is passionate about pets and dedicated to connecting pet owners with quality care.",
      image: "https://images.unsplash.com/photo-1612531386530-97286d97c2d2",
    },
    {
      name: "David Tran",
      role: "Technical Lead",
      description: "David ensures the platform runs smoothly and stays updated with the latest technology.",
      image: "https://images.unsplash.com/photo-1612531386530-97286d97c2d2",
    },
    {
      name: "Sarah Le",
      role: "Marketing Specialist",
      description: "Sarah helps spread the word about MyPetDoc's mission to help pets across Vietnam.",
      image: "https://images.unsplash.com/photo-1612531386530-97286d97c2d2",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-[#1A3C8E] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">About MyPetDoc</h1>
            <p className="text-xl text-white/80">
              Connecting pet owners with quality veterinary care since 2024
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col items-start">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                To provide accessible, high-quality veterinary care by connecting pet owners with trusted veterinary professionals through our innovative platform.
              </p>
            </div>
            <div className="flex flex-col items-start">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                To create a world where every pet has access to quality healthcare, and every pet owner has peace of mind knowing their beloved companions are well cared for.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Pet-First Approach</h3>
                <p className="text-gray-600">
                  We prioritize the well-being and health of pets in everything we do.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Trust & Reliability</h3>
                <p className="text-gray-600">
                  Building trust through transparent and reliable veterinary services.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Innovation</h3>
                <p className="text-gray-600">
                  Continuously improving our platform to enhance pet healthcare accessibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-gray-50 p-8 rounded-lg">
                  <div className="flex items-center mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.content}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#1A3C8E] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-white/80 mb-8">
              Join our network of trusted veterinary hospitals and provide the best care for your pets.
            </p>
            <Link
              to="/find-hospital"
              className="inline-block bg-white text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Find a Hospital
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
