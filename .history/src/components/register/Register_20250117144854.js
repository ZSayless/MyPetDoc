import { X } from "lucide-react";
import { useState } from "react";
import SelectRoleModal from "./SelectRoleModal";
import { registerWithGoogle } from "../../services/authService";
import { useTranslation } from "react-i18next";

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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800">
              {t("auth.register.title")}
            </h3>
            <p className="text-gray-600 mt-2">
              {t("auth.register.subtitle")}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder={t("auth.register.form.email.placeholder")}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
            />
            {/* ... other form fields ... */}
            <button type="submit" className="w-full bg-[#98E9E9] text-gray-700 py-3 rounded-lg font-medium hover:bg-[#7CD5D5] transition-colors">
              {t("auth.register.buttons.continue")}
            </button>
          </form>

          <p className="text-center mt-8 text-gray-600">
            {t("auth.register.buttons.haveAccount")}{" "}
            <button onClick={onLoginClick} className="text-blue-600 hover:text-blue-800 font-medium">
              {t("auth.register.buttons.login")}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
