import { X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logocustom.png";

function Login({ onClose, onRegisterClick, onLoginSuccess }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Call API to login
      onLoginSuccess({
        name: "John Doe",
        email: "john@example.com",
        avatar: "J",
      });
      onClose();
    } catch (error) {
      alert("Đăng nhập thất bại");
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
            <h3 className="text-2xl font-bold text-gray-800">Welcome Back!</h3>
            <p className="text-gray-600 mt-2">Please sign in to continue</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
              placeholder="Username or email"
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
              Sign In
            </button>
          </form>

          <p className="text-center mt-8 text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={onRegisterClick}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
