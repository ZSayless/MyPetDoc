import { X } from "lucide-react";
import { useState } from "react";
import { initiateGoogleLogin, completeGoogleSignup } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { register } from "../../services/authService";

function Register({ onClose, onLoginClick }) {
  const { login: authLogin } = useAuth();
  const [userType, setUserType] = useState("general");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [pendingUserData, setPendingUserData] = useState(null);
  
  // Thêm state cho form
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  // Xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLoginClick = () => {
    onClose();
    onLoginClick();
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await initiateGoogleLogin();
      
      if (result.isNewUser) {
        // Lưu thông tin người dùng và hiển thị modal chọn role
        setPendingUserData(result.profile);
        setShowRoleSelection(true);
      } else {
        // Nếu người dùng đã tồn tại, chuyển họ sang form đăng nhập
        onClose();
        onLoginClick();
      }
    } catch (error) {
      setError(error.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelect = async (role) => {
    setLoading(true);
    setError("");

    try {
      const userData = {
        ...pendingUserData,
        role
      };

      const signupResult = await completeGoogleSignup(userData);
      if (signupResult.success) {
        authLogin(signupResult.data);
        setShowRoleSelection(false);
        onClose();
      } else {
        setError(signupResult.error);
      }
    } catch (error) {
      setError(error.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if (!formData.agreeToTerms) {
      setError("Vui lòng đồng ý với điều khoản sử dụng");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    setLoading(true);
    try {
      const role = userType === 'general' ? 'GENERAL_USER' : 'HOSPITAL_ADMIN';
      
      const result = await register({
        email: formData.email,
        password: formData.password,
        fullName: `${formData.firstName} ${formData.lastName}`,
        role: role
      });
      
      if (result.success) {
        console.log("Đăng ký thành công:", result);
        setSuccess(result.message);
        setTimeout(() => {
          onClose();
          onLoginClick();
        }, 3000);
      } else {
        setError(result.error || "Đăng ký thất bại");
      }
    } catch (error) {
      setError(error.message || "Có lỗi xảy ra khi đăng ký");
    } finally {
      setLoading(false);
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
              {showRoleSelection ? "Choose Account Type" : "Create Account"}
            </h3>
            <p className="text-gray-600 mt-2">
              {showRoleSelection
                ? "Select the type of account you want to create"
                : "Sign up to get started"}
            </p>
          </div>

          {!showRoleSelection ? (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex space-x-4 p-1 bg-gray-100 rounded-[20px]">
                <button
                  type="button"
                  className={`flex-1 py-2 px-4 rounded-[15px] text-sm font-medium transition-colors ${
                    userType === "general"
                      ? "bg-white text-gray-800 shadow"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  onClick={() => setUserType("general")}
                >
                  Pet Owner
                </button>
                <button
                  type="button"
                  className={`flex-1 py-2 px-4 rounded-[15px] text-sm font-medium transition-colors ${
                    userType === "hospital"
                      ? "bg-white text-gray-800 shadow"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  onClick={() => setUserType("hospital")}
                >
                  Veterinarian
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                  placeholder="First name"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                  placeholder="Last name"
                  required
                />
              </div>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                placeholder="Enter your email"
                required
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                placeholder="Create a password"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                placeholder="Confirm your password"
                required
              />

              <div className="flex items-start">
                <input 
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="mt-1 rounded text-blue-500"
                  required
                />
                <label className="ml-2 text-sm text-gray-600">
                  I agree to the{" "}
                  <a href="#" className="text-blue-600 hover:text-blue-800">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-600 hover:text-blue-800">
                    Privacy Policy
                  </a>
                </label>
              </div>

              {error && (
                <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
                  {error}
                </div>
              )}

              {success && (
                <div className="text-green-500 text-sm p-2 bg-green-50 rounded">
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#98E9E9] text-gray-700 py-3 rounded-lg font-medium hover:bg-[#7CD5D5] transition-colors disabled:opacity-50"
              >
                {loading ? "Đang xử lý..." : "Create Account"}
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or sign up with
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignup}
                disabled={loading}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  className="h-5 w-5 mr-2"
                  alt="Google"
                />
                <span>{loading ? "Đang xử lý..." : "Sign up with Google"}</span>
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <button
                onClick={() => handleRoleSelect("GENERAL_USER")}
                className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-[#98E9E9] hover:bg-gray-50 transition-all group"
              >
                <div className="flex items-center">
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-[#98E9E9]">
                      Pet Owner
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Find and book appointments with veterinary hospitals
                    </p>
                  </div>
                </div>
              </button>
              <button
                onClick={() => handleRoleSelect("HOSPITAL_ADMIN")}
                className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-[#98E9E9] hover:bg-gray-50 transition-all group"
              >
                <div className="flex items-center">
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-[#98E9E9]">
                      Hospital Representative
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Manage your veterinary hospital profile and appointments
                    </p>
                  </div>
                </div>
              </button>
            </div>
          )}

          <p className="text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <button
              onClick={handleLoginClick}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
