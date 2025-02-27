import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { completeGoogleSignup } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function SelectRole() {
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
      console.log("No profile data, redirecting to home");
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
      setPhoneError("Số điện thoại không được để trống");
      return false;
    }
    
    if (!phoneRegex.test(cleanPhone)) {
      setPhoneError("Số điện thoại không đúng định dạng");
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

      console.log("Sending complete signup data:", userData);

      const result = await completeGoogleSignup(userData);
      console.log("Complete signup result:", result);

      if (result.success) {
        login(result.data);
        const returnTo = localStorage.getItem("returnTo") || "/";
        localStorage.removeItem("returnTo");
        navigate(returnTo);
      } else {
        throw new Error(result.error || "Đăng ký thất bại");
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
              Nhập số điện thoại
            </h2>
            <p className="text-gray-600 mb-8">
              Vui lòng nhập số điện thoại của bạn để hoàn tất đăng ký
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
                placeholder="Nhập số điện thoại"
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
              Hoàn tất đăng ký
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
              Quay lại
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
            Chọn loại tài khoản
          </h2>
          <p className="text-gray-600 mb-8">
            Vui lòng chọn loại tài khoản bạn muốn đăng ký
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
                  Người dùng thông thường
                </h3>
                <p className="text-gray-600 text-sm">
                  Dành cho người dùng muốn tìm kiếm thông tin y tế
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
                  Quản lý bệnh viện
                </h3>
                <p className="text-gray-600 text-sm">
                  Dành cho người quản lý thông tin bệnh viện
                </p>
              </div>
            </div>
          </button>
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-8 w-full p-3 text-gray-600 hover:text-gray-800"
        >
          Hủy
        </button>
      </div>
    </div>
  );
}

export default SelectRole;
