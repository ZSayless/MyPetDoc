import { X } from "lucide-react";
import { useState } from "react";
import SelectRoleModal from "./SelectRoleModal";
import { registerWithGoogle } from "../../services/authService";

function Register({ onClose, onLoginClick }) {
  const [userType, setUserType] = useState("general");
  const [googleUserData, setGoogleUserData] = useState(null);
  const [isGoogleSignup, setIsGoogleSignup] = useState(false);

  const handleLoginClick = () => {
    onClose();
    onLoginClick();
  };

  const handleGoogleSuccess = (response) => {
    setGoogleUserData(response);
    setIsGoogleSignup(true);
  };

  const handleRoleSelect = async (role) => {
    try {
      const response = await registerWithGoogle({
        ...googleUserData,
        role: role,
      });

      if (response.success) {
        onClose();
      } else {
        console.error("Registration failed:", response.error);
      }
    } catch (error) {
      console.error("Registration failed:", error);
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
              {isGoogleSignup ? "Choose Account Type" : "Create Account"}
            </h3>
            <p className="text-gray-600 mt-2">
              {isGoogleSignup
                ? "Select the type of account you want to create"
                : "Sign up to get started"}
            </p>
          </div>

          {isGoogleSignup ? (
            <div className="space-y-4">
              <button
                onClick={() => handleRoleSelect("general")}
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
                onClick={() => handleRoleSelect("hospital")}
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
          ) : (
            <form className="space-y-3">
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
                  General User
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
                  Hospital User
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                  placeholder="Create a password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                  placeholder="Confirm your password"
                />
              </div>

              <div className="flex items-start">
                <input type="checkbox" className="mt-1 rounded text-blue-500" />
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

              <button
                type="submit"
                className="w-full bg-[#98E9E9] text-gray-700 py-3 rounded-lg font-medium hover:bg-[#7CD5D5] transition-colors"
              >
                Create Account
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
                onClick={handleGoogleSuccess}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  className="h-5 w-5 mr-2"
                  alt="Google"
                />
                <span>Sign up with Google</span>
              </button>
            </form>
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
