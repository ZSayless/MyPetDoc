import { ChevronDown, Menu, X, Globe, Settings, User, Building2, LogOut } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/img/logocustom.png";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);
  const { auth, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const userMenuItems = [
    { label: "Profile", path: "/profile", icon: User },
    { label: "Settings", path: "/settings", icon: Settings },
    auth?.user?.role === "Veterinarian" && {
      label: "Register Hospital",
      path: "/veterinarian/add-hospital",
      icon: Building2
    },
    { label: "Logout", onClick: handleLogout, icon: LogOut },
  ].filter(Boolean);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowLanguageMenu(false);
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center h-[72px]">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-12" />
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-[#98E9E9]">
              Home
            </Link>
            <Link
              to="/find-hospital"
              className="text-gray-700 hover:text-[#98E9E9]"
            >
              Find Hospital
            </Link>
            <Link to="/bloglist" className="text-gray-700 hover:text-[#98E9E9]">
              Blog
            </Link>
            <Link
              to="/community"
              className="text-gray-700 hover:text-[#98E9E9]"
            >
              Community
            </Link>
            <Link
              to="/contact-us"
              className="text-gray-700 hover:text-[#98E9E9]"
            >
              Contact Us
            </Link>
            <Link
              to="/about-us"
              className="text-gray-700 hover:text-[#98E9E9]"
            >
              About Us
            </Link>

            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center text-gray-700 hover:text-[#98E9E9]"
              >
                <Globe className="w-5 h-5 mr-1" />
                <span>EN</span>
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>

              {showLanguageMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50">
                      English
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50">
                      Tiếng Việt
                    </button>
                  </div>
                </div>
              )}
            </div>

            {auth?.user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center text-gray-700 hover:text-[#98E9E9]"
                >
                  <img
                    src={auth.user.avatar || "/default-avatar.png"}
                    alt="User"
                    className="w-8 h-8 rounded-full"
                  />
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      {userMenuItems.map((item, index) => (
                        <div key={index}>
                          {item.onClick ? (
                            <button
                              onClick={item.onClick}
                              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <item.icon className="w-4 h-4" />
                              {item.label}
                            </button>
                          ) : (
                            <Link
                              to={item.path}
                              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <item.icon className="w-4 h-4" />
                              {item.label}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="text-gray-700 hover:text-[#98E9E9]"
              >
                Login
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4">
            <Link
              to="/"
              className="block py-2 text-gray-700 hover:text-[#98E9E9]"
            >
              Home
            </Link>
            <Link
              to="/find-hospital"
              className="block py-2 text-gray-700 hover:text-[#98E9E9]"
            >
              Find Hospital
            </Link>
            <Link
              to="/bloglist"
              className="block py-2 text-gray-700 hover:text-[#98E9E9]"
            >
              Blog
            </Link>
            <Link
              to="/community"
              className="block py-2 text-gray-700 hover:text-[#98E9E9]"
            >
              Community
            </Link>
            <Link
              to="/contact-us"
              className="block py-2 text-gray-700 hover:text-[#98E9E9]"
            >
              Contact Us
            </Link>
            <Link
              to="/about-us"
              className="block py-2 text-gray-700 hover:text-[#98E9E9]"
            >
              About Us
            </Link>
            {!auth?.user && (
              <Link
                to="/login"
                className="block py-2 text-gray-700 hover:text-[#98E9E9]"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
