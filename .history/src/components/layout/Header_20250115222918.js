import {
  ChevronDown,
  Menu,
  X,
  Globe,
  Settings,
  Home,
  Info,
  Mail,
  Search,
  FileText,
  Users,
  User,
  FileEdit,
  LogOut,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import logo from "../../assets/img/logocustom.png";
import ButtonLink from "../../core/ButtonLink";
import Register from "../register/Register";
import Overlay from "../../core/Overlay";
import Login from "../login/Login";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";

function Header() {
  const [showLanguage, setShowLanguage] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true);
  const navigate = useNavigate();
  const servicesDropdownRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(event.target)
      ) {
        setShowServices(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? "hidden" : "unset";
  };

  const handleOpenRegister = () => {
    setIsOpenRegister(!isOpenRegister);
  };

  const handleOpenLogin = () => {
    setIsOpenLogin(!isOpenLogin);
  };

  const languageOptions = [
    {
      value: "en",
      label: (
        <div className="flex items-center">
          <Globe className="w-5 h-5 text-gray-600 mr-2" />
          <span>English</span>
        </div>
      ),
    },
    {
      value: "vi",
      label: (
        <div className="flex items-center">
          <Globe className="w-5 h-5 text-gray-600 mr-2" />
          <span>Tiếng Việt</span>
        </div>
      ),
    },
  ];

  const customStyles = {
    control: (base) => ({
      ...base,
      border: 0,
      boxShadow: "none",
      backgroundColor: "transparent",
      cursor: "pointer",
      minHeight: "40px",
      "&:hover": {
        border: 0,
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#f3f4f6" : "white",
      color: "#374151",
      cursor: "pointer",
      "&:active": {
        backgroundColor: "#e5e7eb",
      },
    }),
    menu: (base) => ({
      ...base,
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      borderRadius: "0.5rem",
      marginTop: "0.5rem",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "#374151",
      "&:hover": {
        color: "#1d4ed8",
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: "#374151",
    }),
  };

  const handleNavigate = (path) => {
    setShowServices(false);
    navigate(path);
  };

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setIsAdmin(userData.role === 'admin');
    setIsOpenLogin(false);
  };

  const servicesDropdown = [
    {
      name: "Find Hospital",
      link: "/find-hospital",
      description: "Search for nearby veterinary hospitals",
    },
    {
      name: "Book Appointment",
      link: "/appointment",
      description: "Schedule a visit with our veterinarians",
    },
    {
      name: "Blog",
      link: "/bloglist",
      description: "Read latest news and articles",
    },
    {
      name: "Community",
      link: "/community",
      description: "Join our pet lovers community",
    },
    {
      name: "Terms & Conditions",
      link: "/terms",
      description: "Read our terms of service",
    },
  ];

  const handleServicesClick = () => {
    setShowServices(!showServices);
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <header
        className={`fixed top-0 left-0 right-0 bg-white z-50 ${
          isSticky ? "shadow-md" : ""
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-6">
              <Link to="/">
                <img src={logo} alt="Logo" className="h-10" />
              </Link>
              <nav className="hidden lg:block">
                <ul className="flex items-center space-x-4">
                  <li>
                    <Link to="/" className="text-gray-700 hover:text-blue-600">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/aboutus"
                      className="text-gray-700 hover:text-blue-600"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      onClick={handleContactClick}
                      className="text-gray-700 hover:text-blue-600"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li className="relative" ref={servicesDropdownRef}>
                    <button
                      onClick={handleServicesClick}
                      className="flex items-center text-gray-700 hover:text-blue-600"
                    >
                      Services
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                    {showServices && (
                      <div className="absolute left-0 mt-2 w-60 bg-white rounded-lg shadow-lg border py-1">
                        <Link
                          to="/find-hospital"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                          onClick={() => setShowServices(false)}
                        >
                          <div className="font-medium">Find Hospital</div>
                          <div className="text-sm text-gray-600">
                            Search for nearby veterinary hospitals
                          </div>
                        </Link>
                        <Link
                          to="/bloglist"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                          onClick={() => setShowServices(false)}
                        >
                          <div className="font-medium">Blog</div>
                          <div className="text-sm text-gray-600">
                            Read latest news and articles
                          </div>
                        </Link>
                        <Link
                          to="/community"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                          onClick={() => setShowServices(false)}
                        >
                          <div className="font-medium">Community</div>
                          <div className="text-sm text-gray-600">
                            Join our pet lovers community
                          </div>
                        </Link>
                        <Link
                          to="/terms"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                          onClick={() => setShowServices(false)}
                        >
                          <div className="font-medium">Terms & Conditions</div>
                          <div className="text-sm text-gray-600">
                            Read our terms of service
                          </div>
                        </Link>
                      </div>
                    )}
                  </li>
                </ul>
              </nav>
            </div>
            <div className="hidden lg:flex items-center space-x-6">
              {isAdmin && (
                <Link
                  to="/admin"
                  className="hidden lg:flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Settings size={20} />
                  <span>Admin Dashboard</span>
                </Link>
              )}

              {!isLoggedIn ? (
                <>
                  <button
                    onClick={handleOpenLogin}
                    className="text-gray-700 hover:text-blue-600 font-medium"
                  >
                    Login
                  </button>
                  <button
                    onClick={handleOpenRegister}
                    className="bg-[#98E9E9] text-gray-700 px-4 py-2 rounded-lg hover:bg-[#7CD5D5]"
                  >
                    Register
                  </button>
                </>
              ) : (
                <div ref={dropdownRef} className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                      {user?.avatar}
                    </div>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                      <div className="px-4 py-2 border-b">
                        <div className="font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>

                      <div className="py-1">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                        >
                          Profile
                        </Link>

                        <Link
                          to="/my-blogs"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                        >
                          My Blogs
                        </Link>

                        {isAdmin && (
                          <Link
                            to="/admin"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                          >
                            Admin Dashboard
                          </Link>
                        )}

                        <Link
                          to="/setting"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                        >
                          Settings
                        </Link>

                        <button
                          onClick={() => {
                            setIsLoggedIn(false);
                            setUser(null);
                            setShowUserMenu(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <button
              className="lg:hidden text-gray-700 p-2"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={toggleMenu}
            />
            <div className="fixed inset-y-0 right-0 w-[280px] bg-white z-50 transform transition-transform duration-300 ease-in-out">
              <button
                onClick={toggleMenu}
                className="absolute top-4 right-4 text-gray-600 p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </button>

              {isLoggedIn && (
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#98E9E9] flex items-center justify-center">
                      <span className="text-xl font-semibold text-gray-700">
                        {user?.name?.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="text-gray-800 font-medium">
                        {user?.name}
                      </div>
                      <div className="text-gray-600 text-sm">{user?.email}</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-6">
                <nav className="space-y-6">
                  <div className="space-y-2">
                    <Link
                      to="/"
                      className="flex items-center gap-3 text-gray-700 hover:bg-[#98E9E9]/20 px-3 py-2 rounded-lg"
                      onClick={toggleMenu}
                    >
                      <Home className="w-5 h-5" />
                      Home
                    </Link>
                    <Link
                      to="/aboutus"
                      className="flex items-center gap-3 text-gray-700 hover:bg-[#98E9E9]/20 px-3 py-2 rounded-lg"
                      onClick={toggleMenu}
                    >
                      <Info className="w-5 h-5" />
                      About Us
                    </Link>
                    <Link
                      to="/contactus"
                      className="flex items-center gap-3 text-gray-700 hover:bg-[#98E9E9]/20 px-3 py-2 rounded-lg"
                      onClick={toggleMenu}
                    >
                      <Mail className="w-5 h-5" />
                      Contact Us
                    </Link>
                  </div>

                  <div>
                    <div className="text-[#1A3C8E] uppercase text-sm font-medium px-3 mb-2">
                      Services
                    </div>
                    <div className="space-y-2">
                      <Link
                        to="/find-hospital"
                        className="flex items-center gap-3 text-gray-700 hover:bg-[#98E9E9]/20 px-3 py-2 rounded-lg"
                        onClick={toggleMenu}
                      >
                        <Search className="w-5 h-5" />
                        Find Hospital
                      </Link>
                      <Link
                        to="/bloglist"
                        className="flex items-center gap-3 text-gray-700 hover:bg-[#98E9E9]/20 px-3 py-2 rounded-lg"
                        onClick={toggleMenu}
                      >
                        <FileText className="w-5 h-5" />
                        Blog
                      </Link>
                      <Link
                        to="/community"
                        className="flex items-center gap-3 text-gray-700 hover:bg-[#98E9E9]/20 px-3 py-2 rounded-lg"
                        onClick={toggleMenu}
                      >
                        <Users className="w-5 h-5" />
                        Community
                      </Link>
                    </div>
                  </div>

                  {isLoggedIn ? (
                    <div className="space-y-2">
                      <div className="text-[#1A3C8E] uppercase text-sm font-medium px-3 mb-2">
                        Account
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 text-gray-700 hover:bg-[#98E9E9]/20 px-3 py-2 rounded-lg"
                        onClick={toggleMenu}
                      >
                        <User className="w-5 h-5" />
                        Profile
                      </Link>
                      <Link
                        to="/my-blogs"
                        className="flex items-center gap-3 text-gray-700 hover:bg-[#98E9E9]/20 px-3 py-2 rounded-lg"
                        onClick={toggleMenu}
                      >
                        <FileEdit className="w-5 h-5" />
                        My Blogs
                      </Link>

                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-3 text-gray-700 hover:bg-[#98E9E9]/20 px-3 py-2 rounded-lg"
                          onClick={toggleMenu}
                        >
                          <Settings className="w-5 h-5" />
                          Admin Dashboard
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          setIsLoggedIn(false);
                          setUser(null);
                          toggleMenu();
                        }}
                        className="flex items-center gap-3 text-gray-700 hover:bg-[#98E9E9]/20 px-3 py-2 rounded-lg w-full"
                      >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          toggleMenu();
                          handleOpenLogin();
                        }}
                        className="w-full px-4 py-2 text-[#1A3C8E] border border-[#1A3C8E] rounded-lg hover:bg-[#98E9E9]/20"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => {
                          toggleMenu();
                          handleOpenRegister();
                        }}
                        className="w-full px-4 py-2 bg-[#1A3C8E] text-white rounded-lg hover:bg-[#1A3C8E]/90"
                      >
                        Register
                      </button>
                    </div>
                  )}
                </nav>
              </div>
            </div>
          </>
        )}
      </header>

      {isOpenRegister && (
        <Overlay
          children={
            <Register
              isOpenRegister={isOpenRegister}
              onLoginClick={handleOpenLogin}
              onClose={() => setIsOpenRegister(false)}
            />
          }
        />
      )}

      {isOpenLogin && (
        <Overlay
          children={
            <Login
              isOpenLogin={isOpenLogin}
              onRegisterClick={handleOpenRegister}
              onClose={() => setIsOpenLogin(false)}
              onLoginSuccess={handleLoginSuccess}
            />
          }
        />
      )}
    </div>
  );
}

export default Header;
