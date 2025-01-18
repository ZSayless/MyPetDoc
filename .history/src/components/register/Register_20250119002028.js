import { X } from "lucide-react";
import { useState } from "react";
import SelectRoleModal from "./SelectRoleModal";
import { registerWithGoogle } from "../../services/authService";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Register({ onClose, onLoginClick }) {
  const { t } = useTranslation();
  const [userType, setUserType] = useState("general");
  const [googleUserData, setGoogleUserData] = useState(null);
  const [isGoogleSignup, setIsGoogleSignup] = useState(false);

  const handleLoginClick = () => {
    onClose();
    onLoginClick();
  };

  const handleGoogleSuccess = (response) => {
    setGoogleUserData(response);
    setIsGoogleSignup(true);
  };

  const handleRoleSelect = async (role) => {
    try {
      const response = await registerWithGoogle({
        ...googleUserData,
        role: role,
      });

      if (response.success) {
        onClose();
      } else {
        console.error("Registration failed:", response.error);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Call API to register
      alert("Đăng ký thành công!");
      onClose();
      onLoginClick(); // Chuyển sang form đăng nhập
    } catch (error) {
      alert("Đăng ký thất bại");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[30px] w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        <div className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">
              {isGoogleSignup
                ? t("auth.selectRole.title")
                : t("auth.registerTitle")}
            </h3>
            <p className="text-gray-600 mt-2">
              {isGoogleSignup
                ? t("auth.selectRole.subtitle")
                : t("auth.registerSubtitle")}
            </p>
          </div>

          {isGoogleSignup ? (
            <div className="space-y-4">
              <button
                onClick={() => handleRoleSelect("general")}
                className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-[#98E9E9] hover:bg-gray-50 transition-all group"
              >
                <div className="flex items-center">
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-[#98E9E9]">
                      {t("auth.selectRole.roles.petOwner.title")}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {t("auth.selectRole.roles.petOwner.description")}
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleRoleSelect("hospital")}
                className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-[#98E9E9] hover:bg-gray-50 transition-all group"
              >
                <div className="flex items-center">
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-[#98E9E9]">
                      {t("auth.selectRole.roles.veterinarian.title")}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {t("auth.selectRole.roles.veterinarian.description")}
                    </p>
                  </div>
                </div>
              </button>
            </div>
          ) : (
            <form className="space-y-6">
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                placeholder={t("auth.emailPlaceholder")}
              />
              <input
                type="password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                placeholder={t("auth.passwordPlaceholder")}
              />
              <input
                type="password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                placeholder={t("auth.confirmPasswordPlaceholder")}
              />

              <div className="flex items-center">
                <input type="checkbox" className="rounded text-blue-500" />
                <span className="ml-2 text-sm text-gray-600">
                  {t("auth.termsAgree")}{" "}
                  <Link
                    to="/terms"
                    className="text-blue-600 hover:underline"
                    onClick={onClose}
                  >
                    {t("auth.termsLink")}
                  </Link>
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-[#98E9E9] text-gray-700 py-3 rounded-lg font-medium hover:bg-[#7CD5D5] transition-colors"
              >
                {t("auth.register")}
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    {t("auth.orContinueWith")}
                  </span>
                </div>
              </div>

              <button
                onClick={handleGoogleSuccess}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  className="h-5 w-5 mr-2"
                  alt="Google"
                />
                <span>{t("auth.googleSignIn")}</span>
              </button>
            </form>
          )}

          <p className="text-center mt-8 text-gray-600">
            {t("auth.haveAccount")}{" "}
            <button
              onClick={handleLoginClick}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {t("auth.loginButton")}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
