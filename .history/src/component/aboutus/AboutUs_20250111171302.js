import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

function AboutUs() {
  const teamMembers = [
    {
      name: "Dr. Nguyen Van A",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      bio: "With over 15 years of veterinary experience, Dr. Nguyen leads our mission to transform pet healthcare.",
      social: {
        facebook: "https://facebook.com/drnguyen",
        twitter: "https://twitter.com/drnguyen",
        linkedin: "https://linkedin.com/in/drnguyen"
      }
    },
    {
      name: "Dr. Tran Thi B",
      role: "Chief Medical Officer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      bio: "Specializing in small animal medicine, Dr. Tran ensures the highest quality of care across our network.",
      social: {
        facebook: "https://facebook.com/drtran",
        twitter: "https://twitter.com/drtran",
        linkedin: "https://linkedin.com/in/drtran"
      }
    },
    {
      name: "Le Van C",
      role: "Technical Director",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      bio: "Leading our tech team in developing innovative solutions for pet healthcare accessibility.",
      social: {
        facebook: "https://facebook.com/levanc",
        twitter: "https://twitter.com/levanc",
        linkedin: "https://linkedin.com/in/levanc"
      }
    },
  ];

  const testimonials = [
    {
      name: "Mai Anh",
      role: "Pet Owner",
      content: "MyPetDoc made finding the right vet for my cat so easy. Excellent service!",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    },
    {
      name: "Dr. Hoang",
      role: "Veterinarian",
      content: "The platform helps us connect with pet owners efficiently. Great technology!",
      image: "https://images.unsplash.com/photo-1556157382-97eda2f9e2bf",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-[#1A3C8E] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">About MyPetDoc</h1>
            <p className="text-xl text-white/80">
              Connecting pet owners with quality veterinary care across Vietnam
            </p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Our Story</h2>
            <div className="prose prose-lg text-gray-600">
              <p>
                Founded in 2024, MyPetDoc emerged from a vision to revolutionize pet healthcare in Vietnam. We recognized the challenges pet owners face in finding reliable veterinary care and set out to create a solution.
              </p>
              <p className="mt-4">
                Our platform connects pet owners with verified veterinary hospitals, making quality pet care accessible to all. We're committed to supporting both pet owners and veterinary professionals in providing the best possible care for our furry friends.
              </p>
              <p className="mt-4">
                Today, we're proud to partner with leading veterinary hospitals across Vietnam, serving thousands of pet owners and their beloved companions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold text-center mb-2">{member.name}</h3>
                  <p className="text-blue-600 text-center mb-4">{member.role}</p>
                  <p className="text-gray-600 text-center mb-6">{member.bio}</p>
                  <div className="flex justify-center items-center gap-4">
                    <a
                      href={member.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Facebook size={20} />
                    </a>
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      <Twitter size={20} />
                    </a>
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-700 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">What People Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gray-50 p-8 rounded-lg">
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
            <h2 className="text-3xl font-bold mb-6">Start Your Search Today</h2>
            <p className="text-lg text-white/80 mb-8">
              Find the perfect veterinary hospital for your pet
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
