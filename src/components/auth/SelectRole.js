import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { completeGoogleSignup } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function SelectRole() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const profile = location.state?.profile;

  console.log("Profile data in SelectRole:", profile);

  useEffect(() => {
    if (!profile) {
      console.log("No profile data, redirecting to home");
      navigate("/");
      return;
    }
  }, [profile, navigate]);

  const handleRoleSelect = async (role) => {
    try {
      const userData = {
        email: profile.email,
        full_name: profile.full_name,
        google_id: profile.google_id,
        avatar: profile.avatar,
        role: role,
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
