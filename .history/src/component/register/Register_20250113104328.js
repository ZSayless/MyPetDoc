import { X } from "lucide-react";
import { useState } from "react";
import SelectRoleModal from "./SelectRoleModal";
import { registerWithGoogle } from "../../services/authService";

function Register({ onClose, onLoginClick }) {
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800">Create Account</h3>
            <p className="text-gray-600 mt-2">Sign up to get started</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
              placeholder="Username"
            />
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
              placeholder="Email"
            />
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
              placeholder="Password"
            />

            <button
              type="submit"
              className="w-full bg-[#98E9E9] text-gray-700 py-3 rounded-lg font-medium hover:bg-[#7CD5D5] transition-colors"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center mt-8 text-gray-600">
            Already have an account?{" "}
            <button
              onClick={onLoginClick}
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
