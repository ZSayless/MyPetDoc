import { useState } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logocustom.png";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

function Login({ onClose, onRegisterClick }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.user);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleRegisterClick = () => {
    onClose();
    onRegisterClick();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(formData)).unwrap();
      onClose();
      navigate("/admin");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const LoginForm = () => (
    <div className="p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800">Welcome Back!</h3>
        <p className="text-gray-600 mt-2">Please sign in to continue</p>
      </div>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-600 rounded text-sm text-center">
          {error}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
          placeholder="Enter your email"
          required
        />
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
          placeholder="Password"
          required
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="rounded text-blue-500" />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <button
            type="button"
            onClick={() => setShowForgotPassword(true)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#98E9E9] text-gray-700 py-3 rounded-lg font-medium hover:bg-[#7CD5D5] transition-colors disabled:opacity-50"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <button 
          type="button"
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="h-5 w-5 mr-2"
            alt="Google"
          />
          <span>Sign in with Google</span>
        </button>
      </form>

      <p className="text-center mt-8 text-gray-600">
        Don't have an account?{" "}
        <button
          onClick={handleRegisterClick}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Sign up
        </button>
      </p>

      <p className="text-center mt-6 text-sm text-gray-600">
        By continuing, you agree to our{" "}
        <Link
          to="/terms"
          className="text-blue-600 hover:underline"
          onClick={onClose}
        >
          Terms of Service
        </Link>
      </p>
    </div>
  );

  const ForgotPasswordForm = () => (
    <div className="p-8">
      <div className="flex items-center mb-6">
        <button
          onClick={() => setShowForgotPassword(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <span className="text-xl font-medium ml-4">Back</span>
        <button
          onClick={onClose}
          className="ml-auto text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>
      </div>

      <div className="text-center mb-8">
        <img src={logo} alt="Logo" className="w-48 h-auto mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-800">Forgot Password?</h3>
        <p className="text-gray-600 mt-2">
          Enter your email and we will send you a recovery code.
        </p>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
            placeholder="Email or Username"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Verification Code
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
              placeholder="Enter verification code"
            />
            <button
              type="button"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
            >
              Send Code
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#98E9E9] text-gray-700 py-3 rounded-lg font-medium hover:bg-[#7CD5D5] transition-colors"
        >
          Reset Password
        </button>
      </form>

      <p className="text-center mt-6 text-sm text-gray-600">
        By continuing, you agree to our{" "}
        <Link
          to="/terms"
          className="text-blue-600 hover:underline"
          onClick={onClose}
        >
          Terms of Service
        </Link>
      </p>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md relative">
        {!showForgotPassword && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        )}
        {showForgotPassword ? <ForgotPasswordForm /> : <LoginForm />}
      </div>
    </div>
  );
}

export default Login;
