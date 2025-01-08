import { useState } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const Login = ({ isOpenLogin, onClose, onRegisterClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted:", { email, password });
      // Thực hiện logic đăng nhập ở đây
    }
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
          <div className="text-center mb-6">
            <h2 className="text-[28px] text-gray-900 font-bold mb-2">
              Đăng nhập tài khoản
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
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
          </form>

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
            <Link
              to=""
              className="text-[#f05123] font-semibold underline block mt-2"
            >
              Quên mật khẩu?
            </Link>
          </div>

          <div className="mt-6 text-center text-sm text-[#666]">
            <p>
              Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với
              <Link to="" className="text-[#666] underline ml-1">
                điều khoản sử dụng
              </Link>{" "}
              của chúng tôi.
            </p>
          </div>
        </div>
      </div>
    );
  }
};
export default Login;
