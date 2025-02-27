import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, X, AlertCircle, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useToast } from "../../context/ToastContext";
import { adminService } from "../../services/adminService";
import { getHospitalsByCreator } from "../../services/hospitalService";
import { SERVICES_ROW_3 } from "../../constants/services";

function AddHospital() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [checkingExistingHospital, setCheckingExistingHospital] = useState(true);
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [selectedServices, setSelectedServices] = useState([]);
  const [operatingHours, setOperatingHours] = useState({
    weekdays: {
      start: "08:00",
      end: "17:00"
    },
    weekends: {
      start: "08:00",
      end: "12:00"
    }
  });

  // Form data state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    link_website: "",
    map_location: "",
    department: "",
    description: "",
    staff_description: "",
    staff_credentials: "",
  });

  // Kiểm tra xem người dùng đã có bệnh viện chưa
  useEffect(() => {
    const checkExistingHospital = async () => {
      try {
        setCheckingExistingHospital(true);
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await getHospitalsByCreator(user.id);
        
        // Nếu đã có bệnh viện, chuyển hướng về trang quản lý
        if (response.data && response.data.length > 0) {
          addToast({
            type: 'info',
            message: 'Bạn đã đăng ký bệnh viện. Đang chuyển hướng đến trang quản lý bệnh viện.'
          });
          navigate('/manage-hospital');
        }
      } catch (error) {
        console.error("Error checking existing hospital:", error);
      } finally {
        setCheckingExistingHospital(false);
      }
    };

    checkExistingHospital();
  }, [navigate, addToast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceToggle = (service) => {
    setSelectedServices(prev => {
      if (prev.includes(service)) {
        return prev.filter(s => s !== service);
      } else {
        return [...prev, service];
      }
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 5) {
      addToast({
        type: 'error',
        message: 'Bạn chỉ có thể tải lên tối đa 5 ảnh'
      });
      return;
    }

    setImages([...images, ...files]);

    // Create preview URLs
    const newPreviewImages = files.map((file) => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...newPreviewImages]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    const newPreviews = [...previewImages];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setImages(newImages);
    setPreviewImages(newPreviews);
  };

  const validateHospitalForm = (data) => {
    const errors = {};
    
    // Tên bệnh viện
    if (!data.name || data.name.trim() === '') 
      errors.name = t("addHospital.errors.nameRequired");
    else if (data.name.length < 3)
      errors.name = t("addHospital.errors.nameMinLength");
    else if (data.name.length > 100)
      errors.name = t("addHospital.errors.nameMaxLength");
    
    // Địa chỉ
    if (!data.address || data.address.trim() === '') 
      errors.address = t("addHospital.errors.addressRequired");
    else if (data.address.length < 5)
      errors.address = t("addHospital.errors.addressMinLength");
    else if (data.address.length > 200)
      errors.address = t("addHospital.errors.addressMaxLength");
    
    // Số điện thoại
    if (!data.phone || data.phone.trim() === '') 
      errors.phone = t("addHospital.errors.phoneRequired");
    else if (!/^[0-9]{10,11}$/.test(data.phone.replace(/\s/g, '')))
      errors.phone = t("addHospital.errors.phoneInvalid");
    
    // Email
    if (!data.email || data.email.trim() === '') 
      errors.email = t("addHospital.errors.emailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      errors.email = t("addHospital.errors.emailInvalid");
    
    // Website
    if (!data.link_website || data.link_website.trim() === '') 
      errors.link_website = t("addHospital.errors.linkWebsiteRequired");
    else if (data.link_website.length < 4)
      errors.link_website = t("addHospital.errors.linkWebsiteMinLength");
    
    // Map location
    if (!data.map_location || data.map_location.trim() === '')
      errors.map_location = t("addHospital.errors.mapLocationRequired");
    
    // Mô tả
    if (!data.description || data.description.trim() === '')
      errors.description = t("addHospital.errors.descriptionRequired");
    else if (data.description.length < 20)
      errors.description = t("addHospital.errors.descriptionMinLength");
    else if (data.description.length > 2000)
      errors.description = t("addHospital.errors.descriptionMaxLength");
    
    // Chuyên khoa
    if (!data.department || data.department.trim() === '')
      errors.department = t("addHospital.errors.departmentRequired");
    
    // Dịch vụ
    if (selectedServices.length === 0)
      errors.specialties = t("addHospital.errors.specialtiesRequired");
    
    // Giờ làm việc
    if (!operatingHours.weekdays.start || !operatingHours.weekdays.end || 
        !operatingHours.weekends.start || !operatingHours.weekends.end)
      errors.operating_hours = t("addHospital.errors.operatingHoursRequired");
    
    // Staff Description (optional)
    if (data.staff_description && data.staff_description.length > 1000)
      errors.staff_description = t("addHospital.errors.staffDescriptionMaxLength");
    
    // Staff Credentials (optional)
    if (data.staff_credentials && data.staff_credentials.length > 1000)
      errors.staff_credentials = t("addHospital.errors.staffCredentialsMaxLength");
    
    // Kiểm tra ảnh
    if (images.length === 0)
      errors.images = t("addHospital.errors.imagesRequired");
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateHospitalForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      
      addToast({
        type: 'error',
        message: t("addHospital.errors.validationFailed")
      });
      
      return;
    }
    
    setLoading(true);

    try {
      const submitFormData = new FormData();
      const operatingHoursString = `Weekdays: ${operatingHours.weekdays.start}-${operatingHours.weekdays.end}, Weekends: ${operatingHours.weekends.start}-${operatingHours.weekends.end}`;
      
      // Thêm tất cả các trường vào formData
      submitFormData.append("name", formData.name);
      submitFormData.append("address", formData.address);
      submitFormData.append("phone", formData.phone);
      submitFormData.append("email", formData.email);
      submitFormData.append("link_website", formData.link_website);
      submitFormData.append("map_location", formData.map_location);
      submitFormData.append("description", formData.description);
      submitFormData.append("department", formData.department);
      submitFormData.append("operating_hours", operatingHoursString);
      submitFormData.append("specialties", selectedServices.join(", "));
      submitFormData.append("staff_description", formData.staff_description || "");
      submitFormData.append("staff_credentials", formData.staff_credentials || "");
      submitFormData.append("is_active", "false");

      // Thêm ảnh
      images.forEach((image) => {
        submitFormData.append("images", image);
      });

      await adminService.createHospital(submitFormData);
      
      addToast({
        type: 'success',
        message: t("addHospital.success.registerSuccess")
      });
      
      navigate("/profile");
    } catch (error) {
      addToast({
        type: 'error',
        message: `Lỗi: ${error.message || t("addHospital.errors.registerFailed")}`
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            {t("common.back")}
          </button>
        </div>

        <div className="max-w-5xl mx-auto">
          {checkingExistingHospital ? (
            // Hiển thị loading khi đang kiểm tra
            <div className="bg-white rounded-lg shadow-sm p-6 flex justify-center items-center py-12">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold mb-6">{t("addHospital.title")}</h1>
              
              {/* Thông báo về quy trình duyệt */}
              <div className="p-4 bg-blue-50 text-blue-700 rounded-lg flex items-start gap-3 mb-6">
                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">{t("addHospital.notice.title")}</p>
                  <p className="text-sm">{t("addHospital.notice.description")}</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">
                    {t("addHospital.basicInfo")}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("addHospital.name")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t("addHospital.namePlaceholder")}
                        required
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          formErrors.name ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {formErrors.name && <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("addHospital.address")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder={t("addHospital.addressPlaceholder")}
                        required
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          formErrors.address ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {formErrors.address && <p className="mt-1 text-sm text-red-500">{formErrors.address}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("addHospital.phone")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t("addHospital.phonePlaceholder")}
                        required
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          formErrors.phone ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {formErrors.phone && <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@hospital.com"
                        required
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          formErrors.email ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {formErrors.email && <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Website <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="link_website"
                        value={formData.link_website}
                        onChange={handleChange}
                        placeholder="https://www.example.com"
                        required
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          formErrors.link_website ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {formErrors.link_website && <p className="mt-1 text-sm text-red-500">{formErrors.link_website}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Chuyên khoa <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        placeholder={t("addHospital.departmentPlaceholder")}
                        required
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          formErrors.department ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {formErrors.department && <p className="mt-1 text-sm text-red-500">{formErrors.department}</p>}
                    </div>
                  </div>
                </div>

                {/* Operating Hours */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">
                    {t("addHospital.workingHours")} <span className="text-red-500">*</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("addHospital.weekdays")}
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="time"
                          value={operatingHours.weekdays.start}
                          onChange={(e) => setOperatingHours(prev => ({
                            ...prev,
                            weekdays: { ...prev.weekdays, start: e.target.value }
                          }))}
                          className="p-2 border rounded-lg border-gray-300"
                          required
                        />
                        <span>{t("addHospital.to")}</span>
                        <input
                          type="time"
                          value={operatingHours.weekdays.end}
                          onChange={(e) => setOperatingHours(prev => ({
                            ...prev,
                            weekdays: { ...prev.weekdays, end: e.target.value }
                          }))}
                          className="p-2 border rounded-lg border-gray-300"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("addHospital.weekends")}
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="time"
                          value={operatingHours.weekends.start}
                          onChange={(e) => setOperatingHours(prev => ({
                            ...prev,
                            weekends: { ...prev.weekends, start: e.target.value }
                          }))}
                          className="p-2 border rounded-lg border-gray-300"
                          required
                        />
                        <span>{t("addHospital.to")}</span>
                        <input
                          type="time"
                          value={operatingHours.weekends.end}
                          onChange={(e) => setOperatingHours(prev => ({
                            ...prev,
                            weekends: { ...prev.weekends, end: e.target.value }
                          }))}
                          className="p-2 border rounded-lg border-gray-300"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  {formErrors.operating_hours && <p className="mt-1 text-sm text-red-500">{formErrors.operating_hours}</p>}
                </div>

                {/* Services */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">
                    {t("addHospital.services")} <span className="text-red-500">*</span>
                  </h2>
                  <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 ${
                    formErrors.specialties ? "border border-red-500 p-3 rounded-lg" : ""
                  }`}>
                    {SERVICES_ROW_3.map((service) => (
                      <div 
                        key={service}
                        onClick={() => handleServiceToggle(service)}
                        className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer border ${
                          selectedServices.includes(service) 
                            ? 'bg-blue-50 border-blue-500 text-blue-700' 
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        {selectedServices.includes(service) && (
                          <Check className="w-4 h-4 text-blue-500" />
                        )}
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>
                  {formErrors.specialties && <p className="mt-1 text-sm text-red-500">{formErrors.specialties}</p>}
                </div>

                {/* Map Location */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">
                    {t("addHospital.mapLocation")} <span className="text-red-500">*</span>
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("addHospital.mapEmbed.title")} <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="map_location"
                        value={formData.map_location}
                        onChange={handleChange}
                        rows={3}
                        placeholder={t("addHospital.mapEmbed.placeholder")}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          formErrors.map_location ? "border-red-500" : "border-gray-300"
                        }`}
                        required
                      />
                      {formErrors.map_location && <p className="mt-1 text-sm text-red-500">{formErrors.map_location}</p>}
                      <p className="mt-1 text-sm text-gray-500">
                        {t("addHospital.mapEmbed.howToGet")}
                        <ol className="list-decimal list-inside pl-4">
                          <li>{t("addHospital.mapEmbed.steps.1")}</li>
                          <li>{t("addHospital.mapEmbed.steps.2")}</li>
                          <li>{t("addHospital.mapEmbed.steps.3")}</li>
                          <li>{t("addHospital.mapEmbed.steps.4")}</li>
                        </ol>
                      </p>
                    </div>

                    {formData.map_location && (
                      <div className="w-full h-[400px] rounded-lg overflow-hidden">
                        <iframe
                          src={formData.map_location}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="w-full h-full"
                        ></iframe>
                      </div>
                    )}
                  </div>
                </div>

                {/* Images */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">
                    {t("addHospital.images")} <span className="text-red-500">*</span>
                  </h2>
                  <div className={`border-2 border-dashed rounded-lg p-6 ${
                    formErrors.images ? "border-red-500" : "border-gray-300"
                  }`}>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                      id="hospital-images"
                    />
                    <label
                      htmlFor="hospital-images"
                      className="flex flex-col items-center cursor-pointer"
                    >
                      <Upload className="w-8 h-8 text-gray-400" />
                      <span className="mt-2 text-sm text-gray-600">
                        {t("addHospital.imageUploadNote")}
                      </span>
                    </label>
                  </div>
                  {formErrors.images && <p className="mt-1 text-sm text-red-500">{formErrors.images}</p>}

                  {/* Image Previews */}
                  {previewImages.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                      {previewImages.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("addHospital.description")} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder={t("addHospital.descriptionPlaceholder")}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      formErrors.description ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                  />
                  {formErrors.description && <p className="mt-1 text-sm text-red-500">{formErrors.description}</p>}
                </div>

                {/* Staff Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("addHospital.staffDescription")}
                    </label>
                    <textarea
                      name="staff_description"
                      value={formData.staff_description}
                      onChange={handleChange}
                      rows={3}
                      placeholder={t("addHospital.staffDescriptionPlaceholder")}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        formErrors.staff_description ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {formErrors.staff_description && <p className="mt-1 text-sm text-red-500">{formErrors.staff_description}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("addHospital.staffCredentials")}
                    </label>
                    <textarea
                      name="staff_credentials"
                      value={formData.staff_credentials}
                      onChange={handleChange}
                      rows={3}
                      placeholder={t("addHospital.staffCredentialsPlaceholder")}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        formErrors.staff_credentials ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {formErrors.staff_credentials && <p className="mt-1 text-sm text-red-500">{formErrors.staff_credentials}</p>}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        {t("addHospital.processing")}
                      </div>
                    ) : (
                      t("addHospital.submit")
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddHospital;
