import { X } from "lucide-react";
import { useState } from "react";
import {
  initiateGoogleLogin,
  completeGoogleSignup,
} from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { register } from "../../services/authService";
import { useTranslation } from "react-i18next";

function Register({ onClose, onLoginClick }) {
  const { login: authLogin } = useAuth();
  const { t } = useTranslation();
  const [userType, setUserType] = useState("general");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [pendingUserData, setPendingUserData] = useState(null);

  // Cập nhật state formData
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    petType: "",
    petAge: "",
    petPhoto: null,
    petNotes: "",
  });

  // Xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLoginClick = () => {
    onClose();
    onLoginClick();
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await initiateGoogleLogin();

      if (result.isNewUser) {
        // Lưu thông tin người dùng và hiển thị modal chọn role
        setPendingUserData(result.profile);
        setShowRoleSelection(true);
      } else {
        // Nếu người dùng đã tồn tại, chuyển họ sang form đăng nhập
        onClose();
        onLoginClick();
      }
    } catch (error) {
      setError(error.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelect = async (role) => {
    setLoading(true);
    setError("");

    try {
      const userData = {
        ...pendingUserData,
        role,
      };

      const signupResult = await completeGoogleSignup(userData);
      if (signupResult.success) {
        authLogin(signupResult.data);
        setShowRoleSelection(false);
        onClose();
      } else {
        setError(signupResult.error);
      }
    } catch (error) {
      setError(error.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Email không hợp lệ");
      return false;
    }

    // Validate phone number (Vietnam format)
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!phoneRegex.test(formData.phone)) {
      setError(t("auth.register.errors.phoneInvalid"));
      return false;
    }

    // Validate password với ít nhất 1 chữ hoa HOẶC 1 ký tự đặc biệt
    const passwordRegex = /^(?=.*([A-Z]|[!@#$%^&*]))[A-Za-z\d!@#$%^&*]{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError(t("auth.register.errors.passwordInvalid"));
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(t("auth.register.errors.passwordMismatch"));
      return false;
    }

    // Validate name fields
    if (formData.firstName.trim().length < 2 || formData.lastName.trim().length < 2) {
      setError(t("auth.register.errors.nameRequired"));
      return false;
    }

    // Validate pet information if pet type is selected
    // if (userType === "general" && formData.petType) {
    //   if (!formData.petAge) {
    //     setError("Vui lòng nhập tuổi thú cưng");
    //     return false;
    //   }
    //   if (!formData.petPhoto) {
    //     setError("Vui lòng tải lên ảnh thú cưng");
    //     return false;
    //   }
    //   if (!formData.petNotes || formData.petNotes.trim().length < 10) {
    //     setError("Vui lòng nhập mô tả về thú cưng (ít nhất 10 ký tự)");
    //     return false;
    //   }
    // }

    // Validate terms agreement
    if (!formData.agreeToTerms) {
      setError(t("auth.register.errors.termsRequired"));
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate form before submitting
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const role = userType === "general" ? "GENERAL_USER" : "HOSPITAL_ADMIN";

      let registerData = {
        email: formData.email,
        password: formData.password,
        full_name: `${formData.firstName} ${formData.lastName}`,
        phone_number: formData.phone,
        role: role,
      };

      // Chỉ thêm thông tin thú cưng nếu userType là general và có chọn petType
      if (userType === "general" && formData.petType) {

        if (formData.petPhoto) {
          const formDataWithFile = new FormData();

          // Thêm các trường cơ bản
          Object.keys(registerData).forEach(key => {
            formDataWithFile.append(key, registerData[key]);
          });

          // Thêm thông tin về thú cưng
          formDataWithFile.append('pet_type', formData.petType);
          formDataWithFile.append('pet_age', formData.petAge);
          formDataWithFile.append('pet_notes', formData.petNotes);
          formDataWithFile.append('pet_photo', formData.petPhoto);

          registerData = formDataWithFile;
        } else {
          // Nếu không có ảnh, thêm thông tin pet vào object
          registerData.pet_type = formData.petType;
          registerData.pet_age = formData.petAge;
          registerData.pet_notes = formData.petNotes;
        }
      }

      // Log dữ liệu cuối cùng trước khi gửi request
      // console.log("Final register data:", 
      //   registerData instanceof FormData 
      //     ? Object.fromEntries(registerData.entries()) 
      //     : registerData
      // );

      const result = await register(registerData);

      if (result.success) {
        setSuccess(result.message || t("auth.register.success"));
        setTimeout(() => {
          onClose();
          onLoginClick();
        }, 5000);
      } else {
        setError(result.error || t("auth.errors.registrationFailed"));
        console.error("Registration error details:", result.details);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.message || t("auth.errors.registrationFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-[30px] w-full max-w-md relative my-8 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 right-0 pt-4 pr-4 bg-white rounded-t-[30px] z-10 flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <div className="px-6 pb-6 overflow-y-auto">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">
              {showRoleSelection
                ? t("auth.register.chooseAccountType")
                : t("auth.register.title")}
            </h3>
            <p className="text-gray-600 mt-2">
              {showRoleSelection
                ? t("auth.register.selectAccountType")
                : t("auth.register.subtitle")}
            </p>
          </div>

          {!showRoleSelection ? (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex space-x-4 p-1 bg-gray-100 rounded-[20px]">
                <button
                  type="button"
                  className={`flex-1 py-2 px-4 rounded-[15px] text-sm font-medium transition-colors ${userType === "general"
                    ? "bg-white text-gray-800 shadow"
                    : "text-gray-600 hover:text-gray-800"
                    }`}
                  onClick={() => setUserType("general")}
                >
                  {t("auth.register.roles.petOwnerButton")}
                </button>
                <button
                  type="button"
                  className={`flex-1 py-2 px-4 rounded-[15px] text-sm font-medium transition-colors ${userType === "hospital"
                    ? "bg-white text-gray-800 shadow"
                    : "text-gray-600 hover:text-gray-800"
                    }`}
                  onClick={() => setUserType("hospital")}
                >
                  {t("auth.register.roles.veterinarianButton")}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("auth.register.firstName")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                    placeholder={t("auth.register.firstName")}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("auth.register.lastName")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                    placeholder={t("auth.register.lastName")}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("auth.register.email")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                  placeholder={t("auth.register.email")}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("auth.register.phone")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                  placeholder={t("auth.register.phonePlaceholder")}
                  required
                />
              </div>

              {userType === "general" && (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {t("auth.register.petType.label")}
                    </label>
                    <select
                      name="petType"
                      value={formData.petType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                    >
                      <option value="">{t("auth.register.petType.placeholder")}</option>
                      <option value="DOG">{t("auth.register.petType.dog")}</option>
                      <option value="CAT">{t("auth.register.petType.cat")}</option>
                      <option value="RABBIT">{t("auth.register.petType.rabbit")}</option>
                      <option value="HAMSTER">{t("auth.register.petType.hamster")}</option>
                      <option value="BIRD">{t("auth.register.petType.bird")}</option>
                      <option value="FISH">{t("auth.register.petType.fish")}</option>
                      <option value="REPTILE">{t("auth.register.petType.reptile")}</option>
                      <option value="OTHER">{t("auth.register.petType.other")}</option>
                    </select>
                  </div>

                  {formData.petType && (
                    <>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          {t("auth.register.petAge")}
                        </label>
                        <input
                          type="text"
                          name="petAge"
                          value={formData.petAge}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                          placeholder={t("auth.register.petAgePlaceholder")}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          {t("auth.register.petPhoto")}
                        </label>
                        <input
                          type="file"
                          name="petPhoto"
                          onChange={(e) => handleInputChange({
                            target: {
                              name: 'petPhoto',
                              value: e.target.files[0]
                            }
                          })}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                          accept="image/*"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          {t("auth.register.petNotes")}
                        </label>
                        <textarea
                          name="petNotes"
                          value={formData.petNotes}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                          placeholder={t("auth.register.petNotesPlaceholder")}
                          rows="3"
                        />
                      </div>
                    </>
                  )}
                </div>
              )}

              <div className="text-sm text-gray-600 mt-1">
                <p>{t("auth.register.passwordRequirements.title")}</p>
                <ul className="list-disc pl-5">
                  <li>{t("auth.register.passwordRequirements.atLeast6Characters")}</li>
                  <li>{t("auth.register.passwordRequirements.atLeast1UpperCaseOrSpecialCharacter")}</li>
                </ul>
                <p className="mt-1">{t("auth.register.passwordRequirements.example")}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("auth.register.password")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                  placeholder={t("auth.register.password")}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("auth.register.confirmPassword")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                  placeholder={t("auth.register.confirmPassword")}
                  required
                />
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="mt-1 rounded text-blue-500"
                  required
                />
                <label className="ml-2 text-sm text-gray-600">
                  {t("auth.register.termsAgree")}{" "}
                  <a href="#" className="text-blue-600 hover:text-blue-800">
                    {t("auth.register.termsLink")}
                  </a>{" "}
                  {t("auth.register.and")}{" "}
                  <a href="#" className="text-blue-600 hover:text-blue-800">
                    {t("auth.register.privacyLink")}
                  </a>
                </label>
              </div>

              {error && (
                <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
                  {error}
                </div>
              )}

              {success && (
                <div className="text-green-500 text-sm p-2 bg-green-50 rounded">
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#98E9E9] text-gray-700 py-3 rounded-lg font-medium hover:bg-[#7CD5D5] transition-colors disabled:opacity-50"
              >
                {loading
                  ? t("auth.register.processing")
                  : t("auth.register.createAccount")}
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    {t("auth.register.orSignUpWith")}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignup}
                disabled={loading}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  className="h-5 w-5 mr-2"
                  alt="Google"
                />
                <span>
                  {loading
                    ? t("auth.register.processing")
                    : t("auth.register.googleSignUp")}
                </span>
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <button
                onClick={() => handleRoleSelect("GENERAL_USER")}
                className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-[#98E9E9] hover:bg-gray-50 transition-all group"
              >
                <div className="flex items-center">
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-[#98E9E9]">
                      Pet Owner
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {t("auth.register.roles.petOwnerDesc")}
                    </p>
                  </div>
                </div>
              </button>
              <button
                onClick={() => handleRoleSelect("HOSPITAL_ADMIN")}
                className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-[#98E9E9] hover:bg-gray-50 transition-all group"
              >
                <div className="flex items-center">
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-[#98E9E9]">
                      Veterinarian
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {t("auth.register.roles.veterinarianDesc")}
                    </p>
                  </div>
                </div>
              </button>
            </div>
          )}

          <p className="text-center mt-4 text-gray-600">
            {t("auth.register.haveAccount")}{" "}
            <button
              onClick={handleLoginClick}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {t("auth.register.signIn")}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
