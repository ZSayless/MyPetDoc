import { ChevronDown, Menu, X, Globe } from "lucide-react";
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
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' }
  ];

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
      link: "/hospital/1",
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

  return (
    <div>
      <header className="bg-white w-full fixed top-0 left-0 right-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-8 flex-1">
              <img src={logo} alt="Logo" className="h-14" />

              <nav className="hidden lg:block">
                <ul className="flex items-center space-x-6">
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
                    <Link
                      to="/contactus"
                      className="text-gray-700 hover:text-blue-600"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li className="relative" ref={servicesDropdownRef}>
                    <button
                      className="flex items-center text-gray-700 hover:text-blue-600"
                      onClick={() => setShowServices(!showServices)}
                    >
                      <span>Services</span>
                      <ChevronDown className="ml-1 w-4 h-4" />
                    </button>

                    {showServices && (
                      <div
                        ref={servicesDropdownRef}
                        className="absolute top-full left-0 w-[280px] bg-white rounded-lg shadow-lg py-3 z-50"
                      >
                        {servicesDropdown.map((service, index) => (
                          <Link
                            key={index}
                            to={service.link}
                            className="flex flex-col px-4 py-3 hover:bg-gray-50"
                            onClick={() => setShowServices(false)}
                          >
                            <span className="text-gray-900 font-medium">
                              {service.name}
                            </span>
                            <span className="text-sm text-gray-500">
                              {service.description}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                </ul>
              </nav>
            </div>

            <div className="hidden lg:flex items-center space-x-6">
              <div className="relative">
                <button
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                  onClick={() => setShowLanguage(!showLanguage)}
                >
                  <Globe className="w-5 h-5" />
                  <span>{languages.find(lang => lang.code === selectedLanguage)?.flag}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {showLanguage && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setSelectedLanguage(language.code);
                          setShowLanguage(false);
                        }}
                      >
                        <span className="mr-2">{language.flag}</span>
                        <span>{language.name}</span>
                      </button>
                    ))}
                  </div>
                )}
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
                <div className="relative user-menu">
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
                        <p className="font-medium text-gray-800">
                          {user?.name}
                        </p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          handleNavigate("/setting");
                          setShowUserMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Settings
                      </button>
                      <button
                        onClick={() => {
                          setIsLoggedIn(false);
                          setUser(null);
                          setShowUserMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
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
            </div>

            <button
              className="lg:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40">
            <div className="bg-white w-64 h-full">
              <div className="p-4">
                <nav>
                  <div className="mt-4 border-t pt-4">
                    <p className="text-sm font-medium text-gray-600 mb-2">Language</p>
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                        onClick={() => {
                          setSelectedLanguage(language.code);
                          setIsMenuOpen(false);
                        }}
                      >
                        <span className="mr-2">{language.flag}</span>
                        <span>{language.name}</span>
                      </button>
                    ))}
                  </div>
                </nav>
              </div>
            </div>
          </div>
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
