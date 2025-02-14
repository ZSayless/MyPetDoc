import { Mail, MapPin, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { contactMessageService } from "../../services/contactMessageService";
import { useToast } from "../../context/ToastContext";

const ContactUs = () => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Kiểm tra đăng nhập và điền thông tin một lần khi component mount
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setIsLoggedIn(true);
      try {
        const user = JSON.parse(userStr);
        setFormData(prev => ({
          ...prev,
          name: user.fullName || user.name || "",
          email: user.email || "",
          phone: user.phone || "",
        }));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      };
      await contactMessageService.sendMessage(payload);
      
      addToast({
        type: "success",
        message: t("contact.form.success"),
      });

      setFormData(prev => ({
        ...prev,
        message: "", // Chỉ reset trường message
      }));
    } catch (error) {
      addToast({
        type: "error",
        message: t("contact.errors.sendFailed"),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-[#1A3C8E] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">{t("contact.title")}</h1>
            <p className="text-lg text-white/80">{t("contact.subtitle")}</p>
          </div>
        </div>
      </div>

      {/* Contact Information Cards */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {t("contact.info.visit.title")}
            </h3>
            <p className="text-gray-600">
              123 Nguyen Van Linh Street
              <br />
              District 7, Ho Chi Minh City
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {t("contact.info.call.title")}
            </h3>
            <p className="text-gray-600">
              Phone: +84 123 456 789
              <br />
              Hotline: +84 987 654 321
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {t("contact.info.email.title")}
            </h3>
            <p className="text-gray-600">
              support@mypetdoc.com
              <br />
              info@mypetdoc.com
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form & Map Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6">
                {t("contact.form.title")}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("contact.form.name")}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("contact.form.phone")}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      disabled
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-gray-50"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("contact.form.email")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-gray-50"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("contact.form.message")}
                  </label>
                  <textarea
                    rows="4"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  ></textarea>
                </div>
                {isLoggedIn ? (
                  <button
                    type="submit"
                    className={`w-full bg-[#98E9E9] text-gray-700 py-3 rounded-lg font-medium hover:bg-[#7CD5D5] transition-colors ${
                      loading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                    disabled={loading}
                  >
                    {loading ? t("contact.form.sending") : t("contact.form.send")}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="w-full bg-[#98E9E9] text-gray-700 py-3 rounded-lg font-medium hover:bg-[#7CD5D5] transition-colors"
                  >
                    {t("contact.form.loginToSend")}
                  </button>
                )}
              </form>
            </div>

            {/* Map */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.669658423711!2d106.66488007465357!3d10.75992005944615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f9023a3a85d%3A0x9259bad475336d5c!2zQuG7h25oIHZp4buHbiBUaMO6IHkgUGV0UHJv!5e0!3m2!1svi!2s!4v1710338305071!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
