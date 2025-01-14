import { ChevronDown, Menu, X, Globe, Settings } from "lucide-react";
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
  const navigate = useNavigate();
  const servicesDropdownRef = useRef(null);
  const dropdownRef = useRef(null);
  const [isAdmin, setIsAdmin] = useState(true);

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
    setUser(userData);
    setIsLoggedIn(true);
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
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
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
              <div className="ml-4">
                <Select
                  options={languageOptions}
                  defaultValue={languageOptions[0]}
                  isSearchable={false}
                  styles={customStyles}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                />
              </div>
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
                          to="/write-blog"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                        >
                          Write Blog
                        </Link>

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
            <div className="fixed inset-y-0 right-0 w-[280px] bg-[#1A1A37] z-50 transform transition-transform duration-300 ease-in-out">
              <button
                className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full"
                onClick={toggleMenu}
                aria-label="Close Menu"
              >
                <X size={24} />
              </button>

              <div className="p-6 pt-16">
                <nav className="mb-[18px]">
                  <ul className="space-y-4">
                    <li>
                      <ButtonLink
                        text="Home"
                        link="/"
                        className="block w-full"
                      />
                    </li>
                    <li>
                      <ButtonLink
                        text="Find a hospital"
                        link="/find-hospital"
                        className="block w-full"
                      />
                    </li>
                    <li>
                      <ButtonLink text="Service" className="block w-full" />
                    </li>
                    <li>
                      <ButtonLink
                        text="Blog"
                        link="/bloglist"
                        className="block w-full"
                      />
                    </li>
                    <li>
                      <ButtonLink
                        text="About us"
                        link="/aboutus"
                        className="block w-full"
                      />
                    </li>
                    <li>
                      <ButtonLink
                        text="Contact us"
                        link="/contactus"
                        className="block w-full"
                      />
                    </li>
                    <li>
                      <ButtonLink
                        text="Register"
                        onClick={handleOpenRegister}
                        className="block w-full"
                      />
                    </li>
                    <li>
                      <ButtonLink
                        text="Login"
                        onClick={handleOpenLogin}
                        className="block w-full"
                      />
                    </li>
                  </ul>
                </nav>
                <div className="space-y-4">
                  <div className="relative">
                    <button
                      className="flex text-[#fff] items-center uppercase w-full xl:text-[16px] md:text-[12px] "
                      onClick={() => setShowLanguage(!showLanguage)}
                    >
                      Language
                      <ChevronDown className="ml-1 w-4 h-4" />
                    </button>

                    {showLanguage && (
                      <div className="absolute top-full left-0 mt-2 bg-white text-gray-800 rounded-md shadow-lg py-2 w-full">
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                          English
                        </button>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                          Tiếng Việt
                        </button>
                      </div>
                    )}
                  </div>
                </div>
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
