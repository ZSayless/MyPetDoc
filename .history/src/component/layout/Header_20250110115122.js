import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../../assets/img/logocustom.png";
import ButtonLink from "../../core/ButtonLink";
import Register from "../register/Register";
import Overlay from "../../core/Overlay";
import Login from "../login/Login";
import { Link } from "react-router-dom";

function Header() {
  const [showLanguage, setShowLanguage] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);

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

  return (
    <div>
      <header className="bg-[#1A1A37] w-full relative z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-8">
              <div>
                <img src={logo} alt="Logo" className="h-10" />
              </div>

              <nav className="hidden lg:block">
                <ul className="flex items-center space-x-6">
                  <li>
                    <Link to="/" className="text-white hover:text-[#98E9E9] transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/aboutus" className="text-white hover:text-[#98E9E9] transition-colors">
                      About us
                    </Link>
                  </li>
                  <li>
                    <Link to="/contactus" className="text-white hover:text-[#98E9E9] transition-colors">
                      Contact Us
                    </Link>
                  </li>
                  <li className="relative">
                    <button
                      className="flex items-center text-white hover:text-[#98E9E9] transition-colors"
                      onClick={() => setShowServices(!showServices)}
                      onMouseEnter={() => setShowServices(true)}
                      onMouseLeave={() => setShowServices(false)}
                    >
                      <span>Services</span>
                      <ChevronDown className="ml-1 w-4 h-4" />
                    </button>

                    {showServices && (
                      <div 
                        className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg py-2 min-w-[200px]"
                        onMouseEnter={() => setShowServices(true)}
                        onMouseLeave={() => setShowServices(false)}
                      >
                        <Link 
                          to="/service" 
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Services
                        </Link>
                        <Link 
                          to="/bloglist" 
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Blog
                        </Link>
                        <Link 
                          to="/community" 
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Community
                        </Link>
                        <Link 
                          to="/setting" 
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Settings
                        </Link>
                      </div>
                    )}
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden lg:block">
                <button
                  className="flex items-center text-white hover:text-[#98E9E9] transition-colors"
                  onClick={() => setShowLanguage(!showLanguage)}
                >
                  <span>Language</span>
                  <ChevronDown className="ml-1 w-4 h-4" />
                </button>

                {showLanguage && (
                  <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg py-2 min-w-[120px]">
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700">
                      English
                    </button>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700">
                      Tiếng Việt
                    </button>
                  </div>
                )}
              </div>

              <button
                className="lg:hidden text-white p-2"
                onClick={toggleMenu}
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={toggleMenu}
            />
            <div className="fixed inset-y-0 right-0 w-[280px] bg-[#1A1A37] z-50">
              <button
                className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full"
                onClick={toggleMenu}
              >
                <X size={24} />
              </button>

              <nav className="p-6 pt-16">
                <ul className="space-y-4">
                  <li>
                    <Link 
                      to="/" 
                      className="text-white hover:text-[#98E9E9] transition-colors block"
                      onClick={toggleMenu}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/aboutus" 
                      className="text-white hover:text-[#98E9E9] transition-colors block"
                      onClick={toggleMenu}
                    >
                      About us
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/contactus" 
                      className="text-white hover:text-[#98E9E9] transition-colors block"
                      onClick={toggleMenu}
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li className="space-y-2">
                    <span className="text-white block">Services</span>
                    <ul className="pl-4 space-y-2">
                      <li>
                        <Link 
                          to="/service" 
                          className="text-gray-300 hover:text-[#98E9E9] transition-colors block"
                          onClick={toggleMenu}
                        >
                          Services
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/bloglist" 
                          className="text-gray-300 hover:text-[#98E9E9] transition-colors block"
                          onClick={toggleMenu}
                        >
                          Blog
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/community" 
                          className="text-gray-300 hover:text-[#98E9E9] transition-colors block"
                          onClick={toggleMenu}
                        >
                          Community
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/setting" 
                          className="text-gray-300 hover:text-[#98E9E9] transition-colors block"
                          onClick={toggleMenu}
                        >
                          Settings
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
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
