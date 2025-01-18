import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

function ChangePasswordModal({ onClose }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errors, setErrors] = useState({});

  // Kiểm tra độ mạnh của mật khẩu
  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (password.match(/[a-z]+/)) strength += 1;
    if (password.match(/[A-Z]+/)) strength += 1;
    if (password.match(/[0-9]+/)) strength += 1;
    if (password.match(/[$@#&!]+/)) strength += 1;
    return strength;
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-orange-500";
      case 3:
        return "bg-yellow-500";
      case 4:
        return "bg-blue-500";
      case 5:
        return "bg-green-500";
      default:
        return "bg-gray-200";
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return t("setting.modal.changePassword.strength.veryWeak");
      case 2:
        return t("setting.modal.changePassword.strength.weak");
      case 3:
        return t("setting.modal.changePassword.strength.medium");
      case 4:
        return t("setting.modal.changePassword.strength.strong");
      case 5:
        return t("setting.modal.changePassword.strength.veryStrong");
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "newPassword") {
      setPasswordStrength(checkPasswordStrength(value));
      // Xóa lỗi khi người dùng bắt đầu nhập lại
      setErrors((prev) => ({ ...prev, newPassword: "", confirmPassword: "" }));
    }

    if (name === "confirmPassword") {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = t(
        "setting.modal.changePassword.errors.currentPasswordRequired"
      );
    }

    if (!formData.newPassword) {
      newErrors.newPassword = t(
        "setting.modal.changePassword.errors.newPasswordRequired"
      );
    } else if (passwordStrength < 3) {
      newErrors.newPassword = t(
        "setting.modal.changePassword.errors.passwordTooWeak"
      );
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = t(
        "setting.modal.changePassword.errors.passwordsDoNotMatch"
      );
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // TODO: Gọi API để đổi mật khẩu
        console.log("Password changed successfully");
        onClose();
      } catch (error) {
        setErrors({
          submit: t("setting.modal.changePassword.errors.changeFailed"),
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md">
        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-2">
            {t("setting.modal.changePassword.title")}
          </h3>
          <p className="text-gray-600 mb-6">
            {t("setting.modal.changePassword.description")}
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("setting.modal.changePassword.currentPassword")}
              </label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${
                  errors.currentPassword
                    ? "border-red-500"
                    : "border-gray-200"
                } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400`}
                placeholder={t(
                  "setting.modal.changePassword.currentPasswordPlaceholder"
                )}
              />
              {errors.currentPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.currentPassword}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("setting.modal.changePassword.newPassword")}
              </label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${
                  errors.newPassword ? "border-red-500" : "border-gray-200"
                } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400`}
                placeholder={t(
                  "setting.modal.changePassword.newPasswordPlaceholder"
                )}
              />
              {formData.newPassword && (
                <div className="mt-2">
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                  <p
                    className={`mt-1 text-sm ${
                      passwordStrength >= 4
                        ? "text-green-600"
                        : passwordStrength >= 3
                        ? "text-yellow-600"
                        : "text-red-500"
                    }`}
                  >
                    {getPasswordStrengthText()}
                  </p>
                </div>
              )}
              {errors.newPassword && (
                <p className="mt-1 text-sm text-red-500">{errors.newPassword}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("setting.modal.changePassword.confirmPassword")}
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${
                  errors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-200"
                } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400`}
                placeholder={t(
                  "setting.modal.changePassword.confirmPasswordPlaceholder"
                )}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {errors.submit && (
              <p className="mb-4 text-sm text-red-500">{errors.submit}</p>
            )}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50"
              >
                {t("setting.modal.changePassword.cancel")}
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-[#98E9E9] text-gray-700 rounded-xl hover:bg-[#7CD5D5]"
              >
                {t("setting.modal.changePassword.save")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordModal;
