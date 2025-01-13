import React, { useState } from "react";
import {
  Facebook,
  Mail,
  MapPin,
  Phone,
  Instagram,
  Twitter,
  Linkedin,
  Chrome,
} from "lucide-react";
import logo from "../../assets/img/logo.png";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    
    if (!email) {
      setError("Email is required");
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setSuccess(true);
      setEmail("");
    } catch (err) {
      setError("Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    { icon: <Facebook size={18} />, url: "https://facebook.com/yourpage" },
    { icon: <Chrome size={18} />, url: "https://yourwebsite.com" },
    { icon: <Linkedin size={18} />, url: "https://linkedin.com/company/yourcompany" },
    { icon: <Instagram size={18} />, url: "https://instagram.com/yourhandle" },
    { icon: <Twitter size={18} />, url: "https://twitter.com/yourhandle" },
  ];

  const navigationLinks = {
    column1: [
      { text: "Hotel", url: "/categories/hotel" },
      { text: "Apartment", url: "/categories/apartment" },
      { text: "Automation", url: "/services/automation" },
      { text: "How It Works", url: "/how-it-works" },
      { text: "Underwriting", url: "/services/underwriting" },
      { text: "Lending Licenses", url: "/licenses" },
    ],
    column2: [
      { text: "Restaurant", url: "/categories/restaurant" },
      { text: "SPA & Beauty", url: "/categories/spa-beauty" },
      { text: "Travel", url: "/categories/travel" },
      { text: "For Employers", url: "/employers" },
      { text: "Contact Us", url: "/contact" },
      { text: "Support", url: "/support" },
    ],
  };

  return (
    <footer className="bg-[#0c0e1a] text-white py-16 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <div className="flex items-center mb-6">
              <img src={logo} alt="bizMap" className="h-8" />
            </div>
            <p className="text-gray-400 mb-8">
              Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting
              Industry Has Been The Industry.
            </p>
            <div className="flex items-center space-x-3 mb-8">
              <form onSubmit={handleSubscribe} className="relative w-full">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="w-full bg-transparent border border-gray-700 rounded px-4 py-3 pr-32 focus:outline-none focus:border-[#4611a7]"
                />
                <button 
                  type="submit"
                  disabled={loading}
                  className="absolute right-0 top-0 h-full bg-[#4611a7] text-white px-6 rounded-r hover:bg-[#3a0d8c] transition-colors disabled:bg-gray-600"
                >
                  {loading ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            {success && (
              <p className="text-green-500 text-sm mb-4">
                Successfully subscribed!
              </p>
            )}
            <div className="flex space-x-2">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#4611a7] flex items-center justify-center hover:bg-[#3a0d8c] transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-xl font-bold mb-6">
              Frequently Asked Questions
            </h3>
            <div className="grid grid-cols-2 gap-8">
              <ul className="space-y-4">
                {navigationLinks.column1.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.url}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="space-y-4">
                {navigationLinks.column2.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.url}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-xl font-bold mb-6">Contact us</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="mt-1">
                  <MapPin className="text-[#4611a7]" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Address</h4>
                  <p className="text-gray-400">
                    Demo Address #8901 Marmora Road Chi Minh City, Vietnam
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="mt-1">
                  <Phone className="text-[#4611a7]" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Phone</h4>
                  <p className="text-gray-400">0800-123456 (24/7 Support)</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="mt-1">
                  <Mail className="text-[#4611a7]" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Email</h4>
                  <p className="text-gray-400">Info@Example.Com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>
            Design With <span className="text-[#4611a7]">❤</span> By DexignZone
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
