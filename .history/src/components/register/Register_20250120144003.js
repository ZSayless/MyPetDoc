import { X, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/authService";
import SelectRoleModal from "./SelectRoleModal";
import { registerWithGoogle } from "../../services/authService";
import { Link } from "react-router-dom";
import { useToast } from "../../context/ToastContext";

function Register({ isOpenRegister, onLoginClick, onClose }) {
  const { t } = useTranslation();
  const { register } = useAuth();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [userType, setUserType] = useState("general");
  const [googleUserData, setGoogleUserData] = useState(null);
  const [isGoogleSignup, setIsGoogleSignup] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const roles = [
    {
      value: "user",
      label: "Pet Owner",
    },
    {
      value: "veterinarian",
      label: "Veterinarian",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName) {
      setError(t("auth.errors.nameRequired"));
      return false;
    }
    if (!formData.email) {
      setError(t("auth.errors.emailRequired"));
      return false;
    }
    if (!formData.password) {
      setError(t("auth.errors.passwordRequired"));
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError(t("auth.errors.passwordMismatch"));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setError(null);

    try {
      const response = await authService.register(formData);
      await register(response.user, response.token);
      onClose();
    } catch (error) {
      setError(t("auth.errors.registrationFailed"));
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[30px] w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <div className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">
              {isGoogleSignup
                ? t("auth.selectRole.title")
                : t("auth.registerSubtitle")}
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("auth.selectRole.title")}
                </label>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {roles.map((role) => (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() => handleRoleSelect(role.value)}
                      className={`p-4 rounded-xl border-2 text-center hover:border-[#98E9E9] transition-colors
                        ${userType === role.value ? "border-[#98E9E9] bg-[#F0FDFD]" : "border-gray-200 bg-white"}
                        font-medium text-gray-900`}
                    >
                      {role.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                  placeholder={t("auth.firstNamePlaceholder")}
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                  placeholder={t("auth.lastNamePlaceholder")}
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                placeholder={t("auth.emailPlaceholder")}
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                placeholder={t("auth.passwordPlaceholder")}
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <input
                type="password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                placeholder={t("auth.confirmPasswordPlaceholder")}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              <div className="flex items-start">
                <input type="checkbox" className="mt-1 rounded text-blue-500" />
                <label className="ml-2 text-sm text-gray-600">
                  {t("auth.termsAgree")}{" "}
                  <a href="#" className="text-blue-600 hover:text-blue-800">
                    {t("auth.termsLink")}
                  </a>
                </label>
              </div>

              {error && (
                <div className="mb-4 text-sm text-red-500 text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className={`w-full py-3 bg-[#98E9E9] text-gray-700 rounded-xl hover:bg-[#7CD5D5] ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? t("auth.signingIn") : t("auth.register")}
              </button>

              <div className="relative my-4">
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

          <p className="text-center mt-4 text-gray-600">
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
