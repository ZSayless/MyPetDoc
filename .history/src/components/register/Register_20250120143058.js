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
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold">
                Create Account
              </h2>
              <p className="text-gray-600 mt-1">
                Join our community today
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

          {/* Rest of the form */}
        </div>
      </div>
    </div>
  );
}

export default Register;
