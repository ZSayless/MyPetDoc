import { useState } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const Login = ({ isOpenLogin, onClose, onRegisterClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [view, setView] = useState("login");
  const [generatedOTP, setGeneratedOTP] = useState(null);

  const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    setGeneratedOTP(otp);
    console.log("OTP đã tạo:", otp);
    return otp;
  };

  const validateLoginForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Vui lòng nhập email hoặc tên đăng nhập.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email không hợp lệ.";
    }

    if (!password) {
      newErrors.password = "Vui lòng nhập mật khẩu.";
    } else if (password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateForgotPasswordForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Vui lòng nhập email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email không hợp lệ.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateResetPasswordForm = () => {
    const newErrors = {};
    if (!newPassword) {
      newErrors.newPassword = "Vui lòng nhập mật khẩu mới.";
    } else if (newPassword.length < 6) {
      newErrors.newPassword = "Mật khẩu phải có ít nhất 6 ký tự.";
    }
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (validateLoginForm()) {
      console.log("Form submitted:", { email, password });
      // Thêm logic đăng nhập ở đây
    }
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();

    if (validateForgotPasswordForm()) {
      generateOTP();
      setView("otp");
    }
  };

  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();
    if (validateResetPasswordForm()) {
      console.log("Đặt lại mật khẩu thành công! Mật khẩu mới:", newPassword);
      // Thêm logic xử lý đặt lại mật khẩu ở đây, ví dụ: gọi API.
      setView("login");
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp == generatedOTP) {
      setView("resetPassword");
      setErrors({});
    } else {
      setErrors({ ...errors, otp: "Mã OTP không đúng." });
    }
  };

  const handleForgotPasswordClick = () => {
    setView("forgotPassword");
    setErrors({});
  };

  const handleBackToLoginClick = () => {
    setView("login");
    setErrors({});
    setEmail("");
    setPassword("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setGeneratedOTP(null);
  };

  if (isOpenLogin) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-6 md:p-8">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 relative z-10 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute w-10 h-10 rounded-full right-4 top-4 bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X color="#000" />
          </button>

          {view === "login" && (
            <>
              <div className="text-center mb-6">
                <h2 className="text-[28px] text-gray-900 font-bold mb-2">
                  Đăng nhập tài khoản
                </h2>
              </div>
              <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên đăng nhập
              </label>
              <input
                type="email"
                placeholder="Email hoặc Username"
                className={`w-full border rounded-lg p-3 focus:ring-2 focus:outline-none ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[#f05123]"
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mật khẩu
              </label>
              <input
                type="password"
                placeholder="Password"
                className={`w-full border rounded-lg p-3 focus:ring-2 focus:outline-none ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[#f05123]"
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password}</p>
              )}
            </div>
            <div className="flex items-center">
              <input type="checkbox" />
              <span className="ms-2 text-sm font-medium text-gray-700">
                Ghi nhớ đăng nhập
              </span>
            </div>
            <button
              type="submit"
              className="w-full bg-[#f05123] p-3 rounded-lg font-semibold hover:bg-[#d63f11] transition-colors duration-200 text-[#fff]"
            >
              Đăng nhập
            </button>
              <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Bạn chưa có tài khoản?
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  onRegisterClick();
                }}
                to=""
                className="text-[#f05123] font-semibold underline ml-1"
              >
                Đăng ký
              </Link>
            </p>
                <Link onClick={handleForgotPasswordClick} to="" className="text-[#f05123] font-semibold underline block mt-2">
                Quên mật khẩu?
                </Link>
              </div>

              <div className="mt-6 text-center text-sm text-[#666]">
                <p>
                  Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý
                  với
                  <Link to="" className="text-[#666] underline ml-1">
                    điều khoản sử dụng
                  </Link>{" "}
                  của chúng tôi.
                </p>
              </div>

              </form>
            </>
          )}

          {view === "forgotPassword" && (
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-[28px] text-gray-900 font-bold mb-2">
                  Quên mật khẩu
                </h2>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email:
                </label>
                <input
                  type="email"
                  className={`w-full border rounded-lg p-3 focus:ring-2 focus:outline-none ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-[#f05123]"
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-[#f05123] p-3 rounded-lg font-semibold hover:bg-[#d63f11] transition-colors duration-200 text-[#fff]"
              >
                Gửi OTP
              </button>
              <button
                type="button"
                onClick={handleBackToLoginClick}
                className="w-full bg-gray-300 p-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors duration-200 text-[#000] mt-4"
              >
                Quay lại đăng nhập
              </button>
            </form>
          )}


          {view === "otp" && (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-[28px] text-gray-900 font-bold mb-2">
                  Nhập mã OTP
                </h2>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  OTP:
                </label>
                <input
                  type="text"
                  className={`w-full border rounded-lg p-3 focus:ring-2 focus:outline-none ${
                    errors.otp
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-[#f05123]"
                  }`}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                {errors.otp && (
                  <p className="text-red-500 text-sm">{errors.otp}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-[#f05123] p-3 rounded-lg font-semibold hover:bg-[#d63f11] transition-colors duration-200 text-[#fff]"
              >
                Xác nhận OTP
              </button>
              <button
                type="button"
                onClick={handleBackToLoginClick}
                className="w-full bg-gray-300 p-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors duration-200 text-[#000] mt-4"
              >
                Quay lại đăng nhập
              </button>
            </form>
          )}

          {view === "resetPassword" && (
            <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-[28px] text-gray-900 font-bold mb-2">
                  Đặt lại mật khẩu
                </h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu mới:
                </label>
                <input
                  type="password"
                  className={`w-full border rounded-lg p-3 focus:ring-2 focus:outline-none ${
                    errors.newPassword
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-[#f05123]"
                  }`}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-sm">{errors.newPassword}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Xác nhận mật khẩu mới:
                </label>
                <input
                  type="password"
                  className={`w-full border rounded-lg p-3 focus:ring-2 focus:outline-none ${
                    errors.confirmPassword
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-[#f05123]"
                  }`}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-[#f05123] p-3 rounded-lg font-semibold hover:bg-[#d63f11] transition-colors duration-200 text-[#fff]"
              >
                Đặt lại mật khẩu
              </button>
              <button
                type="button"
                onClick={handleBackToLoginClick}
                className="w-full bg-gray-300 p-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors duration-200 text-[#000] mt-4"
              >
                Quay lại đăng nhập
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default Login;