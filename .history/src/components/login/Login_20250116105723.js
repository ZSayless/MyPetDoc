import { useState } from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

function Login({ onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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

  return (
    <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
      <button onClick={onClose} className="absolute right-4 top-4">
        <X className="w-6 h-6 text-gray-400" />
      </button>

      <h2 className="text-2xl font-bold mb-6">Login</h2>

      <form onSubmit={handleSubmit}>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#98E9E9] text-gray-700 p-2 rounded hover:bg-[#7CD5D5] disabled:opacity-50"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
