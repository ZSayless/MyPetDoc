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
      <header className="bg-white w-full relative z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-8">
              <img src={logo} alt="Logo" className="h-10" />
              
              <nav className="hidden lg:block">
                <ul className="flex items-center space-x-6">
                  <li>
                    <Link to="/" className="text-gray-700 hover:text-blue-600">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/aboutus" className="text-gray-700 hover:text-blue-600">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/contactus" className="text-gray-700 hover:text-blue-600">
                      Contact Us
                    </Link>
                  </li>
                  <li className="relative">
                    <button 
                      className="flex items-center text-gray-700 hover:text-blue-600"
                      onClick={() => setShowServices(!showServices)}
                    >
                      <span>Services</span>
                      <ChevronDown className="ml-1 w-4 h-4" />
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <button className="text-gray-700 hover:text-blue-600">
                Help
              </button>
              <button className="bg-black text-white px-4 py-2 rounded">
                Contact
              </button>
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
            />
          }
        />
      )}
    </div>
  );
}

export default Header;
