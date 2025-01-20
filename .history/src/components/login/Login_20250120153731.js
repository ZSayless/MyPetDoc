import { X } from "lucide-react";
import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logocustom.png";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import { authService } from "../../../services/authService";
import { useToast } from "../../context/ToastContext";

function Login({ onClose, onRegisterClick, onLoginSuccess }) {
  const { t } = useTranslation();
  const { login } = useAuth();
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleRegisterClick = () => {
    onClose();
    onRegisterClick();
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    setShowForgotPassword(true);
  };

  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value);
    setError(null);
  }, []);

  const handlePasswordChange = useCallback((e) => {
    setPassword(e.target.value);
    setError(null);
  }, []);

  const handleRememberMeChange = useCallback((e) => {
    setRememberMe(e.target.checked);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await authService.login({
        email,
        password,
        rememberMe,
      });
      await login(response.user, response.token);
      onLoginSuccess(response.user);
      onClose();
    } catch (error) {
      setError(t("auth.errors.invalidCredentials"));
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md relative">
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
