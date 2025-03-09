import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { completeGoogleSignup } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

function SelectRole() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const profile = location.state?.profile;
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [phone, setPhone] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    if (!profile) {
      navigate("/");
      return;
    }
  }, [profile, navigate]);

  const handleRoleSelect = async (role) => {
    setSelectedRole(role);
    setShowPhoneInput(true);
  };

  const validatePhone = (phoneNumber) => {
    const cleanPhone = phoneNumber.replace(/[\s-]/g, '');
    
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    
    if (!cleanPhone) {
      setPhoneError(t("auth.selectRole.phoneError.empty"));
      return false;
    }
    
    if (!phoneRegex.test(cleanPhone)) {
      setPhoneError(t("auth.selectRole.phoneError.invalid"));
      return false;
    }
    
    setPhoneError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePhone(phone)) {
      return;
    }

    try {
      const userData = {
        email: profile.email,
        full_name: profile.full_name,
        google_id: profile.google_id,
        phone_number: phone.replace(/[\s-]/g, ''),
        avatar: profile.avatar,
        role: selectedRole,
      };

      const result = await completeGoogleSignup(userData);

      if (result.success) {
        login(result.data);
        const returnTo = localStorage.getItem("returnTo") || "/";
        localStorage.removeItem("returnTo");
        navigate(returnTo);
      } else {
        throw new Error(result.error || t("auth.selectRole.error.signup"));
      }
    } catch (error) {
      console.error("Role selection error:", error);
      navigate("/auth/error", {
        state: {
          error: error.message,
          errorCode: error.code || "SIGNUP_ERROR",
        },
      });
    }
  };

  if (!profile) {
    return null;
  }

  if (showPhoneInput) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              {t("auth.selectRole.phoneInput.title")}
            </h2>
            <p className="text-gray-600 mb-8">
              {t("auth.selectRole.phoneInput.subtitle")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (phoneError) validatePhone(e.target.value);
                }}
                onBlur={(e) => validatePhone(e.target.value)}
                placeholder={t("auth.selectRole.phoneInput.placeholder")}
                className={`w-full p-3 border rounded-lg focus:ring-[#98E9E9] focus:border-[#98E9E9] 
                  ${phoneError ? 'border-red-500' : 'border-gray-300'}`}
              />
              {phoneError && (
                <p className="mt-1 text-sm text-red-500">{phoneError}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-[#98E9E9] text-white rounded-lg hover:bg-opacity-90 disabled:opacity-50"
              disabled={!!phoneError || !phone}
            >
              {t("auth.selectRole.phoneInput.submit")}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowPhoneInput(false);
                setPhone("");
                setPhoneError("");
              }}
              className="w-full p-3 text-gray-600 hover:text-gray-800"
            >
              {t("auth.selectRole.phoneInput.cancel")}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            {t("auth.selectRole.title")}
          </h2>
          <p className="text-gray-600 mb-8">
            {t("auth.selectRole.subtitle")}
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleRoleSelect("GENERAL_USER")}
            className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-[#98E9E9] hover:bg-gray-50 transition-all group"
          >
            <div className="flex items-center">
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-lg mb-1 group-hover:text-[#98E9E9]">
                  {t("auth.selectRole.role.generalUser.title")}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t("auth.selectRole.role.generalUser.description")}
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => handleRoleSelect("HOSPITAL_ADMIN")}
            className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-[#98E9E9] hover:bg-gray-50 transition-all group"
          >
            <div className="flex items-center">
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-lg mb-1 group-hover:text-[#98E9E9]">
                  {t("auth.selectRole.role.hospitalAdmin.title")}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t("auth.selectRole.role.hospitalAdmin.description")}
                </p>
              </div>
            </div>
          </button>
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-8 w-full p-3 text-gray-600 hover:text-gray-800"
        >
          {t("auth.selectRole.cancel")}
        </button>
      </div>
    </div>
  );
}

export default SelectRole;
