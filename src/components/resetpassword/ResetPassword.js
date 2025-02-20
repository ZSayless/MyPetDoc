import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/authService";
import { useTranslation } from "react-i18next";

function ResetPassword() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra token hợp lệ
    if (!token || token.length < 32) {
      setError("Token không hợp lệ hoặc đã hết hạn");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const passwordRegex = /^(?=.*([A-Z]|[!@#$%^&*]))[A-Za-z\d!@#$%^&*]{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError(t("auth.validation.passwordRequirements"));
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(t("auth.validation.passwordMismatch"));
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const result = await resetPassword(token, formData.password);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        setError(result.error || "Đặt lại mật khẩu thất bại");
      }
    } catch (error) {
      setError("Có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Token không hợp lệ</p>
          <p>Đang chuyển hướng về trang chủ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t("auth.resetPassword.title")}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t("auth.resetPassword.subtitle")}
          </p>
        </div>

        {success ? (
          <div className="text-center space-y-4">
            <div className="text-green-600 font-medium">
              {t("auth.resetPassword.success")}
            </div>
            <p className="text-gray-500">
              {t("auth.resetPassword.redirecting")}
            </p>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm text-center">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  {t("auth.resetPassword.newPassword")}
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                  placeholder={t("auth.resetPassword.newPasswordPlaceholder")}
                  required
                />
              </div>

              <div className="text-sm text-gray-600">
                <p>{t("auth.validation.passwordRequirementsTitle")}:</p>
                <ul className="list-disc pl-5">
                  <li>{t("auth.validation.minLength")}</li>
                  <li>{t("auth.validation.specialChar")}</li>
                </ul>
                <p className="mt-1">{t("auth.validation.examples")}: Password123, password@123</p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  {t("auth.resetPassword.confirmPassword")}
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                  placeholder={t("auth.resetPassword.confirmPasswordPlaceholder")}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#98E9E9] text-gray-700 py-3 rounded-lg font-medium hover:bg-[#7CD5D5] transition-colors disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t("auth.resetPassword.processing")}
                </span>
              ) : (
                t("auth.resetPassword.submit")
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;