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
import { Menu as HeadlessMenu, Transition } from '@headlessui/react'
import { useState, useEffect, useRef, Fragment } from "react";
import logo from "../../assets/img/logocustom.png";
import ButtonLink from "../../core/ButtonLink";
import Register from "../register/Register";
import Overlay from "../../core/Overlay";
import Login from "../login/Login";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const servicesDropdownRef = useRef(null);
  const dropdownRef = useRef(null);
  const languageRef = useRef(null);

  const handleLoginClick = () => {
    setIsOpenLogin(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
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
      // Xử lý click outside cho dropdown ngôn ngữ
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setIsLanguageOpen(false);
      }

      // Xử lý click outside cho các dropdown khác nếu cần
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(event.target)
      ) {
        setIsServicesOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
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

  const languages = [
    {
      code: 'en',
      name: 'English'
    },
    {
      code: 'vi',
      name: 'Tiếng Việt'
    }
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
    setIsServicesOpen(false);
    navigate(path);
  };

  const handleLoginSuccess = (userData) => {
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
    setIsServicesOpen(!isServicesOpen);
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLanguageOpen(false);
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
                      {t("nav.home")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/aboutus"
                      className="text-gray-700 hover:text-blue-600"
                    >
                      {t("nav.aboutUs")}
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      onClick={handleContactClick}
                      className="text-gray-700 hover:text-blue-600"
                    >
                      {t("nav.contactUs")}
                    </a>
                  </li>
                  <li className="relative" ref={servicesDropdownRef}>
                    <button
                      onClick={handleServicesClick}
                      className="flex items-center text-gray-700 hover:text-blue-600"
                    >
                      {t("nav.services.title")}
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                    {isServicesOpen && (
                      <div className="absolute left-0 mt-2 w-60 bg-white rounded-lg shadow-lg border py-1">
                        <Link
                          to="/find-hospital"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsServicesOpen(false)}
                        >
                          <div className="font-medium">
                            {t("nav.findHospital")}
                          </div>
                          <div className="text-sm text-gray-600">
                            {t("nav.services.findHospitalDesc")}
                          </div>
                        </Link>
                        <Link
                          to="/bloglist"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsServicesOpen(false)}
                        >
                          <div className="font-medium">{t("nav.blog")}</div>
                          <div className="text-sm text-gray-600">
                            {t("nav.services.blogDesc")}
                          </div>
                        </Link>
                        <Link
                          to="/community"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsServicesOpen(false)}
                        >
                          <div className="font-medium">
                            {t("nav.community")}
                          </div>
                          <div className="text-sm text-gray-600">
                            {t("nav.services.communityDesc")}
                          </div>
                        </Link>
                        <Link
                          to="/terms"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsServicesOpen(false)}
                        >
                          <div className="font-medium">
                            {t("nav.services.termsTitle")}
                          </div>
                          <div className="text-sm text-gray-600">
                            {t("nav.services.termsDesc")}
                          </div>
                        </Link>
                      </div>
                    )}
                  </li>
                </ul>
              </nav>
            </div>
            <div className="hidden lg:flex items-center space-x-6">
              <div className="hidden md:flex items-center gap-6">
                <HeadlessMenu as="div" className="relative inline-block text-left">
                  {({ open }) => (
                    <>
                      <HeadlessMenu.Button 
                        className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-gray-900"
                      >
                        <Globe className="w-5 h-5" />
                        <span>{t("language")}</span>
                      </HeadlessMenu.Button>
                      
                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <HeadlessMenu.Items
                          static
                          className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-lg shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          {languages.map((language) => (
                            <HeadlessMenu.Item key={language.code}>
                              {({ active }) => (
                                <button
                                  onClick={() => i18n.changeLanguage(language.code)}
                                  className={`${
                                    active ? 'bg-gray-50' : ''
                                  } flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50`}
                                >
                                  {language.name}
                                  {i18n.language === language.code && (
                                    <span className="ml-auto">✓</span>
                                  )}
                                </button>
                              )}
                            </HeadlessMenu.Item>
                          ))}
                        </HeadlessMenu.Items>
                      </Transition>
                    </>
                  )}
                </HeadlessMenu>

                {!user ? (
                  <>
                    <button
                      onClick={handleLoginClick}
                      className="text-gray-700 hover:text-gray-900"
                    >
                      {t("auth.loginButton")}
                    </button>
                    <button
                      onClick={handleOpenRegister}
                      className="bg-[#98E9E9] text-gray-700 px-4 py-2 rounded-lg hover:bg-[#7CD5D5]"
                    >
                      {t("auth.register")}
                    </button>
                  </>
                ) : (
                  <div ref={dropdownRef} className="relative">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center space-x-2"
                    >
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                        {user.name?.[0]}
                      </div>
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                        >
                          {t("auth.profile")}
                        </Link>
                        <Link
                          to="/my-blogs"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                        >
                          {t("auth.myBlogs")}
                        </Link>
                        {user.role === "admin" && (
                          <Link
                            to="/admin"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                          >
                            {t("auth.adminDashboard")}
                          </Link>
                        )}
                        <Link
                          to="/setting"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                        >
                          {t("auth.settings")}
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            setIsDropdownOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
                        >
                          {t("auth.signOut")}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
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
            <div className="fixed inset-y-0 right-0 w-[300px] bg-white z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <img src={logo} alt="Logo" className="h-8" />
                  <button
                    onClick={toggleMenu}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <select
                      value={i18n.language}
                      onChange={(e) => i18n.changeLanguage(e.target.value)}
                      className="w-full text-sm text-gray-600 bg-transparent focus:outline-none"
                    >
                      <option value="en">English</option>
                      <option value="vi">Tiếng Việt</option>
                    </select>
                  </div>
                </div>

                <div className="flex-1 py-6">
                  <nav className="space-y-8">
                    <div className="px-6 space-y-4">
                      <Link
                        to="/"
                        className="flex items-center space-x-3 text-gray-700 hover:text-[#27378C] transition-colors"
                        onClick={toggleMenu}
                      >
                        <Home className="w-6 h-6" />
                        <span className="text-lg">{t("nav.home")}</span>
                      </Link>
                      <Link
                        to="/aboutus"
                        className="flex items-center space-x-3 text-gray-700 hover:text-[#27378C] transition-colors"
                        onClick={toggleMenu}
                      >
                        <Info className="w-6 h-6" />
                        <span className="text-lg">{t("nav.aboutUs")}</span>
                      </Link>
                      <Link
                        to="#contact"
                        className="flex items-center space-x-3 text-gray-700 hover:text-[#27378C] transition-colors"
                        onClick={toggleMenu}
                      >
                        <Mail className="w-6 h-6" />
                        <span className="text-lg">{t("nav.contactUs")}</span>
                      </Link>
                    </div>

                    <div className="px-6">
                      <div className="mb-4">
                        <div className="text-[#27378C] font-semibold text-lg">
                          SERVICES
                        </div>
                        <div className="mt-1 text-sm text-gray-500">
                          {t("nav.services.title")}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <Link
                          to="/find-hospital"
                          className="flex items-center space-x-3 text-gray-700 hover:text-[#27378C] transition-colors"
                          onClick={toggleMenu}
                        >
                          <Search className="w-6 h-6" />
                          <span className="text-lg">
                            {t("nav.findHospital")}
                          </span>
                        </Link>
                        <Link
                          to="/bloglist"
                          className="flex items-center space-x-3 text-gray-700 hover:text-[#27378C] transition-colors"
                          onClick={toggleMenu}
                        >
                          <FileText className="w-6 h-6" />
                          <span className="text-lg">{t("nav.blog")}</span>
                        </Link>
                        <Link
                          to="/community"
                          className="flex items-center space-x-3 text-gray-700 hover:text-[#27378C] transition-colors"
                          onClick={toggleMenu}
                        >
                          <Users className="w-6 h-6" />
                          <span className="text-lg">{t("nav.community")}</span>
                        </Link>
                      </div>
                    </div>
                  </nav>
                </div>

                <div className="p-6 space-y-3 border-t border-gray-100 bg-gray-50">
                  <button
                    onClick={() => {
                      handleLoginClick();
                      toggleMenu();
                    }}
                    className="w-full py-3 text-center border border-gray-300 rounded-lg text-gray-700 hover:bg-white hover:border-[#27378C] transition-all duration-200"
                  >
                    {t("auth.loginButton")}
                  </button>
                  <button
                    onClick={() => {
                      handleOpenRegister();
                      toggleMenu();
                    }}
                    className="w-full py-3 text-center bg-[#27378C] text-white rounded-lg hover:bg-[#1e2b6e] transition-all duration-200 shadow-sm"
                  >
                    {t("auth.register")}
                  </button>
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
