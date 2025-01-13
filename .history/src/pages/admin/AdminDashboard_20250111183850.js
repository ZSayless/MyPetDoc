import { useState } from "react";
import {
  Users,
  Hospital,
  FileText,
  Calendar,
  BarChart2,
  Search,
  Home,
  ArrowLeft,
  X,
  Menu,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import UsersManagement from "./tabs/UsersManagement";
import HospitalsManagement from "./tabs/HospitalsManagement";
import BlogsManagement from "./tabs/BlogsManagement";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);

  const mobileMenuSections = [
    {
      id: 'main',
      items: [
        { id: "home", label: "Home", path: "/" },
        { id: "about", label: "About Us", path: "/about" },
        { id: "contact", label: "Contact Us", path: "/contact" },
      ]
    },
    {
      id: 'services',
      label: 'Services',
      items: [
        { id: "find-hospitals", label: "Find Hospitals", path: "/find-hospital" },
        { id: "pet-care", label: "Pet Care", path: "/pet-care" },
        { id: "user-reviews", label: "User Reviews", path: "/reviews" },
        { id: "resources", label: "Resources", path: "/resources" },
      ]
    },
    {
      id: 'explore',
      label: 'Explore More',
      items: [
        { id: "faq", label: "FAQ", path: "/faq" },
        { id: "blog", label: "Blog", path: "/blog" },
        { id: "community", label: "Community", path: "/community" },
        { id: "testimonials", label: "Testimonials", path: "/testimonials" },
      ]
    },
    {
      id: 'connect',
      label: 'Stay Connected',
      items: [
        { id: "newsletter", label: "Newsletter", path: "/newsletter" },
        { id: "support", label: "Support", path: "/support" },
      ]
    },
    {
      id: 'legal',
      label: 'Legal',
      items: [
        { id: "privacy", label: "Privacy Policy", path: "/privacy" },
        { id: "terms", label: "Terms of Use", path: "/terms" },
      ]
    },
    {
      id: 'social',
      label: 'Follow Us',
      items: [
        { id: "facebook", label: "Facebook", path: "#" },
        { id: "instagram", label: "Instagram", path: "#" },
        { id: "twitter", label: "Twitter", path: "#" },
        { id: "linkedin", label: "LinkedIn", path: "#" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-20 bg-white border-b">
        <div className="flex items-center justify-between h-14 px-4">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-1.5 hover:bg-gray-100 rounded-lg"
          >
            <Menu size={24} />
          </button>
          <img src="/logo.png" alt="Logo" className="h-8" />
          <Link to="/" className="p-1.5 hover:bg-gray-100 rounded-lg">
            <Home size={24} />
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white">
          <div className="flex justify-between items-center p-4 border-b">
            <img src="/logo.png" alt="Logo" className="h-8" />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 hover:bg-gray-100 rounded-lg"
            >
              <X size={24} />
            </button>
          </div>

          <div className="overflow-y-auto h-[calc(100vh-60px)]">
            {mobileMenuSections.map((section) => (
              <div key={section.id} className="border-b">
                {section.label ? (
                  // Expandable section
                  <div>
                    <button
                      onClick={() => setExpandedSection(
                        expandedSection === section.id ? null : section.id
                      )}
                      className="flex items-center justify-between w-full p-4 text-left"
                    >
                      <span className="font-medium">{section.label}</span>
                      <ChevronRight
                        size={20}
                        className={`transition-transform ${
                          expandedSection === section.id ? 'rotate-90' : ''
                        }`}
                      />
                    </button>
                    {expandedSection === section.id && (
                      <div className="bg-gray-50 py-2">
                        {section.items.map((item) => (
                          <Link
                            key={item.id}
                            to={item.path}
                            className="block px-8 py-3 text-gray-600 hover:text-gray-900"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // Non-expandable section
                  <div className="py-2">
                    {section.items.map((item) => (
                      <Link
                        key={item.id}
                        to={item.path}
                        className="block px-4 py-3 text-gray-800 hover:bg-gray-50"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Bottom Actions */}
            <div className="p-4 bg-gray-50 mt-4">
              <div className="space-y-3">
                <Link
                  to="/search"
                  className="flex items-center justify-center w-full p-3 bg-white rounded-lg border hover:bg-gray-50"
                >
                  <Search size={20} className="mr-2" />
                  Search
                </Link>
                <Link
                  to="/login"
                  className="flex items-center justify-center w-full p-3 bg-white rounded-lg border hover:bg-gray-50"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 bottom-0 w-[280px] bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mt-4 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Website</span>
          </Link>
        </div>

        <nav className="mt-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-4 text-left transition-colors ${
                activeTab === item.id
                  ? "bg-[#98E9E9]/10 text-[#98E9E9] border-r-4 border-[#98E9E9]"
                  : "text-gray-600 hover:bg-gray-50/80"
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:ml-[280px] p-4 lg:p-8 mt-14 lg:mt-0">
        {/* Content header, cards and tables remain the same */}
        {/* ... */}
      </div>
    </div>
  );
}

export default AdminDashboard;
