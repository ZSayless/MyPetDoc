import React, { useState } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const Register = ({ isOpenRegister, onClose, onLoginClick }) => {
  const [formData, setFormData] = useState({
    name: "",
    userType: "Hospital User",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  if (!isOpenRegister) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Vui lòng nhập tên.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email không hợp lệ.";
    if (!formData.password.trim() || formData.password.length < 6)
      newErrors.password = "Mật khẩu phải chứa ít nhất 6 ký tự.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      // Xử lý đăng ký người dùng tại đây (gọi API hoặc logic khác)
      console.log("Form Data:", formData);
    }
  };

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
            Đăng ký tài khoản
          </h2>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Họ và tên
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              className={`w-full border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-lg p-3 focus:ring-2 focus:ring-[#dce0e3] focus:outline-none text-[#000]`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select User
            </label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#dce0e3] focus:outline-none text-[#000]"
            >
              <option>Hospital User</option>
              <option>General User</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên đăng nhập
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email or username"
              className={`w-full border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg p-3 focus:ring-2 focus:ring-[#dce0e3] focus:outline-none text-[#000]`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className={`w-full border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg p-3 focus:ring-2 focus:ring-[#dce0e3] focus:outline-none text-[#000]`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <button className="w-full bg-[#f05123] p-3 rounded-lg font-semibold hover:bg-[#d63f11] transition-colors duration-200 text-[#fff]">
            Đăng ký
          </button>
        </form>
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Bạn chưa có tài khoản?
            <Link
              onClick={(e) => {
                e.preventDefault();
                onClose();
                onLoginClick();
              }}
              to=""
              className="text-[#f05123] font-semibold underline ml-1"
            >
              Đăng nhập
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
};

export default Register;
