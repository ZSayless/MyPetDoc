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
  });

  const roles = [
    {
      value: "user",
      label: t("auth.roles.user"),
      description: t("auth.roles.userDesc"),
    },
    {
      value: "veterinarian",
      label: t("auth.roles.veterinarian"),
      description: t("auth.roles.veterinarianDesc"),
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
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md">
        <div className="p-6">
          {!showRoleModal ? (
            <form onSubmit={handleSubmit}>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-semibold">
                    {t("auth.registerTitle")}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {t("auth.registerSubtitle")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Form fields */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("auth.firstNamePlaceholder")}
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#98E9E9]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("auth.lastNamePlaceholder")}
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#98E9E9]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("auth.email")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#98E9E9]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("auth.password")}
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#98E9E9]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("auth.confirmPassword")}
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#98E9E9]"
                    required
                  />
                </div>
              </div>

              {/* Role selection buttons */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleRoleSelect("general")}
                  className={`p-4 rounded-xl border-2 text-center hover:border-[#98E9E9] transition-colors
                    ${userType === "general" ? "border-[#98E9E9] bg-[#F0FDFD]" : "border-gray-200"}`}
                >
                  Pet Owner
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleSelect("hospital")}
                  className={`p-4 rounded-xl border-2 text-center hover:border-[#98E9E9] transition-colors
                    ${userType === "hospital" ? "border-[#98E9E9] bg-[#F0FDFD]" : "border-gray-200"}`}
                >
                  Veterinarian
                </button>
              </div>

              {/* Terms and conditions */}
              <div className="mt-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-[#98E9E9] focus:ring-[#98E9E9]"
                    required
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    {t("auth.termsAgree")}{" "}
                    <Link
                      to="/terms"
                      className="text-[#1A3C8E] hover:underline"
                      target="_blank"
                    >
                      {t("auth.termsLink")}
                    </Link>
                  </span>
                </label>
              </div>

              {error && (
                <div className="mt-4 text-red-500 text-sm text-center">
                  {error}
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 bg-[#98E9E9] text-gray-700 py-3 rounded-xl hover:bg-[#7CD5D5] disabled:opacity-50"
              >
                {loading ? t("auth.registering") : t("auth.register")}
              </button>

              {/* Social login buttons */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      {t("auth.orContinueWith")}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <img
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      className="h-5 w-5 mr-2"
                      alt="Google"
                    />
                    <span>{t("auth.googleSignIn")}</span>
                  </button>
                </div>
              </div>

              {/* Login link */}
              <p className="text-center mt-4 text-gray-600">
                {t("auth.haveAccount")}{" "}
                <button
                  onClick={handleLoginClick}
                  className="text-[#1A3C8E] hover:underline font-medium"
                >
                  {t("auth.loginButton")}
                </button>
              </p>
            </form>
          ) : (
            <SelectRoleModal
              onClose={() => setShowRoleModal(false)}
              onSelect={handleRoleSelect}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
