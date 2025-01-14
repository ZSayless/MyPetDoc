import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

function AboutUs() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#98E9E9] to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1A3C8E] mb-4">
              About MyPetDoc
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Connecting pet owners with quality veterinary care across Vietnam
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#1A3C8E] mb-6">Our Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              We strive to make quality veterinary care accessible to all pet owners by connecting them with trusted veterinary professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gradient-to-b from-white to-[#98E9E9]/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1A3C8E] text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value Cards */}
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-[#1A3C8E] mb-4">Quality Care</h3>
              <p className="text-gray-600">We partner with only the most qualified and trusted veterinary facilities.</p>
            </div>
            {/* More value cards... */}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1A3C8E] text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Team Member Cards */}
            <div className="text-center">
              <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#98E9E9]">
                <img src="team-member-1.jpg" alt="Team Member" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-semibold text-[#1A3C8E]">Dr. Sarah Johnson</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>
            {/* More team members... */}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-t from-[#98E9E9] to-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#1A3C8E] mb-6">Join Our Network</h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Are you a veterinary professional? Partner with us to reach more pet owners.
          </p>
          <button className="bg-[#1A3C8E] text-white px-8 py-3 rounded-full hover:bg-[#98E9E9] hover:text-[#1A3C8E] transition-colors">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
