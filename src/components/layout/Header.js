import {
  ChevronDown,
  MenuIcon,
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
  Check,
} from "lucide-react";
import { useState, useEffect, useRef, Fragment } from "react";
import logo from "../../assets/img/logocustom.png";
import ButtonLink from "../../core/ButtonLink";
import Register from "../register/Register";
import Overlay from "../../core/Overlay";
import Login from "../login/Login";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { useAuth } from "../../context/AuthContext";
import AvatarImage from "../common/AvatarImage";
import { Menu, Transition } from "@headlessui/react";
import { VN, GB } from "country-flag-icons/react/3x2";
import { useTranslation } from "react-i18next";

function Header() {
  const [showLanguage, setShowLanguage] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const servicesDropdownRef = useRef(null);
  const dropdownRef = useRef(null);
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem("language") || "en"
  );

  const { isAuthenticated, user, logout } = useAuth();
  const { t, i18n } = useTranslation();

  // console.log('Header auth state:', { isAuthenticated, user }); // Để debug

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

  const languages = [
    {
      code: "en",
      name: "English",
      shortName: "EN",
      flag: GB,
    },
    {
      code: "vi",
      name: "Tiếng Việt",
      shortName: "VN",
      flag: VN,
    },
  ];

  const handleLanguageChange = (code) => {
    setCurrentLanguage(code);
    i18n.changeLanguage(code);
  };

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

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate("/");
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
                      {t("header.menu.home")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/aboutus"
                      className="text-gray-700 hover:text-blue-600"
                    >
                      {t("header.menu.aboutUs")}
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      onClick={handleContactClick}
                      className="text-gray-700 hover:text-blue-600"
                    >
                      {t("header.menu.contactUs")}
                    </a>
                  </li>
                  <li>
                    <Link
                      to="/find-hospital"
                      className="text-gray-700 hover:text-blue-600"
                    >
                      {t("header.menu.findHospital")}
                    </Link>
                  </li>
                  <li className="relative" ref={servicesDropdownRef}>
                    <button
                      onClick={handleServicesClick}
                      className="flex items-center text-gray-700 hover:text-blue-600"
                    >
                      {t("header.menu.exploreMore")}
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                    {showServices && (
                      <div className="absolute left-0 mt-2 w-60 bg-white rounded-lg shadow-lg border py-1">
                        <Link
                          to="/bloglist"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                          onClick={() => setShowServices(false)}
                        >
                          <div className="font-medium">
                            {t("header.menu.blog")}
                          </div>
                          <div className="text-sm text-gray-600">
                            {t("header.menu.blogDesc")}
                          </div>
                        </Link>
                        <Link
                          to="/community"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                          onClick={() => setShowServices(false)}
                        >
                          <div className="font-medium">
                            {t("header.menu.community")}
                          </div>
                          <div className="text-sm text-gray-600">
                            {t("header.menu.communityDesc")}
                          </div>
                        </Link>
                        <Link
                          to="/terms"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                          onClick={() => setShowServices(false)}
                        >
                          <div className="font-medium">
                            {t("header.menu.terms")}
                          </div>
                          <div className="text-sm text-gray-600">
                            {t("header.menu.termsDesc")}
                          </div>
                        </Link>
                      </div>
                    )}
                  </li>
                </ul>
              </nav>
            </div>
            <div className="hidden lg:flex items-center space-x-6">
              <Menu as="div" className="relative">
                <Menu.Button className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50">
                  {(() => {
                    const Flag = languages.find(
                      (lang) => lang.code === currentLanguage
                    )?.flag;
                    return Flag && <Flag className="h-4 w-5" />;
                  })()}
                  <span>
                    {
                      languages.find((lang) => lang.code === currentLanguage)
                        ?.shortName
                    }
                  </span>
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {languages.map((language) => {
                        const Flag = language.flag;
                        return (
                          <Menu.Item key={language.code}>
                            {({ active }) => (
                              <button
                                onClick={() =>
                                  handleLanguageChange(language.code)
                                }
                                className={`
                                  ${active ? "bg-gray-50" : ""}
                                  ${
                                    currentLanguage === language.code
                                      ? "text-blue-600"
                                      : "text-gray-700"
                                  }
                                  group flex w-full items-center justify-between px-4 py-2 text-sm
                                `}
                              >
                                <div className="flex items-center gap-3">
                                  <Flag className="h-4 w-5" />
                                  <span className="font-medium">
                                    {language.shortName}
                                  </span>
                                  <span className="text-gray-500">
                                    {language.name}
                                  </span>
                                </div>
                                {currentLanguage === language.code && (
                                  <Check className="h-4 w-4" />
                                )}
                              </button>
                            )}
                          </Menu.Item>
                        );
                      })}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              {!isAuthenticated ? (
                <>
                  <button
                    onClick={handleOpenLogin}
                    className="text-gray-700 hover:text-blue-600 font-medium"
                  >
                    {t("header.auth.login")}
                  </button>
                  <button
                    onClick={handleOpenRegister}
                    className="bg-[#98E9E9] text-gray-700 px-4 py-2 rounded-lg hover:bg-[#7CD5D5]"
                  >
                    {t("header.auth.register")}
                  </button>
                </>
              ) : (
                <div ref={dropdownRef} className="relative flex items-center">
                  <span className="mr-3 text-gray-700">
                    {t("header.auth.welcome")}
                    <span className="font-medium">{user?.full_name}</span>
                  </span>

                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center space-x-2"
                    >
                      <AvatarImage
                        src={user?.avatar}
                        alt={user?.full_name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </button>

                    {showUserMenu && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                        <div className="px-4 py-2 border-b">
                          <div className="font-medium text-gray-900">
                            {user.full_name}
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
                            {t("header.auth.profile")}
                          </Link>

                          <Link
                            to="/my-blogs"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                          >
                            {t("header.auth.myBlogs")}
                          </Link>

                          {user.role === "ADMIN" && (
                            <Link
                              to="/admin"
                              className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                            >
                              {t("header.auth.admin")}
                            </Link>
                          )}

                          <Link
                            to="/setting"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                          >
                            {t("header.auth.settings")}
                          </Link>

                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
                          >
                            {t("header.auth.signOut")}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <button
              className="lg:hidden text-gray-700 p-2"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
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

              {isAuthenticated && (
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#98E9E9] flex items-center justify-center">
                      <span className="text-xl font-semibold text-gray-700">
                        {user?.full_name?.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="text-gray-800 font-medium">
                        {user?.full_name}
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
                      {t("header.menu.home")}
                    </Link>
                    <Link
                      to="/aboutus"
                      className="flex items-center gap-3 text-gray-700 hover:bg-[#98E9E9]/20 px-3 py-2 rounded-lg"
                      onClick={toggleMenu}
                    >
                      <Info className="w-5 h-5" />
                      {t("header.menu.aboutUs")}
                    </Link>
                    <Link
                      to="/contactus"
                      className="flex items-center gap-3 text-gray-700 hover:bg-[#98E9E9]/20 px-3 py-2 rounded-lg"
                      onClick={toggleMenu}
                    >
                      <Mail className="w-5 h-5" />
                      {t("header.menu.contactUs")}
                    </Link>
                  </div>

                  <div>
                    <div className="text-[#1A3C8E] uppercase text-sm font-medium px-3 mb-2">
                      {t("header.menu.exploreMore")}
                    </div>
                    <div className="space-y-2">
                      <Link
                        to="/find-hospital"
                        className="flex items-center gap-3 text-gray-700 hover:bg-[#98E9E9]/20 px-3 py-2 rounded-lg"
                        onClick={toggleMenu}
                      >
                        <Search className="w-5 h-5" />
                        {t("header.menu.findHospital")}
                      </Link>
                      <Link
                        to="/bloglist"
                        className="flex items-center gap-3 text-gray-700 hover:bg-[#98E9E9]/20 px-3 py-2 rounded-lg"
                        onClick={toggleMenu}
                      >
                        <FileText className="w-5 h-5" />
                        {t("header.menu.blog")}
                      </Link>
                      <Link
                        to="/community"
                        className="flex items-center gap-3 text-gray-700 hover:bg-[#98E9E9]/20 px-3 py-2 rounded-lg"
                        onClick={toggleMenu}
                      >
                        <Users className="w-5 h-5" />
                        {t("header.menu.community")}
                      </Link>
                    </div>
                  </div>

                  {isAuthenticated ? (
                    <div className="space-y-2">
                      <div className="text-[#1A3C8E] uppercase text-sm font-medium px-3 mb-2">
                        {t("header.auth.account")}
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 text-gray-700 hover:bg-[#98E9E9]/20 px-3 py-2 rounded-lg"
                        onClick={toggleMenu}
                      >
                        <User className="w-5 h-5" />
                        {t("header.auth.profile")}
                      </Link>
                      <Link
                        to="/my-blogs"
                        className="flex items-center gap-3 text-gray-700 hover:bg-[#98E9E9]/20 px-3 py-2 rounded-lg"
                        onClick={toggleMenu}
                      >
                        <FileEdit className="w-5 h-5" />
                        {t("header.auth.myBlogs")}
                      </Link>

                      {user.role === "ADMIN" && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-3 text-gray-700 hover:bg-[#98E9E9]/20 px-3 py-2 rounded-lg"
                          onClick={toggleMenu}
                        >
                          <Settings className="w-5 h-5" />
                          {t("header.auth.admin")}
                        </Link>
                      )}

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 text-gray-700 hover:bg-[#98E9E9]/20 px-3 py-2 rounded-lg w-full"
                      >
                        <LogOut className="w-5 h-5" />
                        {t("header.auth.signOut")}
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
                        {t("header.auth.login")}
                      </button>
                      <button
                        onClick={() => {
                          toggleMenu();
                          handleOpenRegister();
                        }}
                        className="w-full px-4 py-2 bg-[#1A3C8E] text-white rounded-lg hover:bg-[#1A3C8E]/90"
                      >
                        {t("header.auth.register")}
                      </button>
                    </div>
                  )}
                </nav>
              </div>

              <div className="px-6 py-4 border-t border-gray-200">
                <div className="py-4 px-3">
                  <div className="text-[#1A3C8E] uppercase text-sm font-medium mb-3">
                    {t("header.menu.language")}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => i18n.changeLanguage("vi")}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                        i18n.language === "vi"
                          ? "bg-[#1A3C8E] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <VN className="w-5 h-5" title="Tiếng Việt" />
                      <span className="text-sm font-medium">Tiếng Việt</span>
                    </button>
                    <button
                      onClick={() => i18n.changeLanguage("en")}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                        i18n.language === "en"
                          ? "bg-[#1A3C8E] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <GB className="w-5 h-5" title="English" />
                      <span className="text-sm font-medium">English</span>
                    </button>
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
            />
          }
        />
      )}
    </div>
  );
}

export default Header;
