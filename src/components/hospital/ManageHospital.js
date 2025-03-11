import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Building,
  Phone,
  MapPin,
  Plus,
  Globe,
  Clock,
  Star,
  X,
  Mail,
  ToggleLeft,
  ToggleRight,
  AlertCircle,
} from "lucide-react";
import { getHospitalsByCreator } from "../../services/hospitalService";
import { adminService } from "../../services/adminService";
import { useToast } from "../../context/ToastContext";
import { SERVICES_ROW_3 } from "../../constants/services";

function ManageHospital() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalMode, setModalMode] = useState("view");
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageIdsToDelete, setImageIdsToDelete] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTogglingActive, setIsTogglingActive] = useState(false);
  const [operatingHours, setOperatingHours] = useState({
    weekdays: {
      start: "08:00",
      end: "17:00",
    },
    weekends: {
      start: "08:00",
      end: "12:00",
    },
  });
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    fetchHospital();
  }, []);

  useEffect(() => {
    if (hospital?.operating_hours) {
      try {
        const times = hospital.operating_hours.split(",").map((t) => t.trim());
        const weekdayTimes = times[0]
          .replace("Weekdays:", "")
          .trim()
          .split("-")
          .map((t) => t.trim());
        const weekendTimes = times[1]
          .replace("Weekends:", "")
          .trim()
          .split("-")
          .map((t) => t.trim());

        setOperatingHours({
          weekdays: {
            start: weekdayTimes[0],
            end: weekdayTimes[1],
          },
          weekends: {
            start: weekendTimes[0],
            end: weekendTimes[1],
          },
        });
      } catch (error) {
        console.error("Error parsing operating hours:", error);
      }
    }
  }, [hospital?.operating_hours]);

  useEffect(() => {
    if (hospital?.specialties) {
      setSelectedServices(hospital.specialties.split(",").map((s) => s.trim()));
    }
  }, [hospital]);

  const fetchHospital = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await getHospitalsByCreator(user.id);
      setHospital(response.data[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateHospital = async (e) => {
    e.preventDefault();
    const errors = validateHospitalForm(hospital);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);

      addToast({
        type: "error",
        message: "Vui lòng kiểm tra lại thông tin đã nhập",
      });

      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      const operatingHoursString = `Weekdays: ${operatingHours.weekdays.start}-${operatingHours.weekdays.end}, Weekends: ${operatingHours.weekends.start}-${operatingHours.weekends.end}`;

      formData.append("name", hospital.name);
      formData.append("address", hospital.address);
      formData.append("phone", hospital.phone);
      formData.append("email", hospital.email);
      formData.append("link_website", hospital.link_website);
      formData.append("map_location", hospital.map_location);
      formData.append("description", hospital.description);
      formData.append("department", hospital.department);
      formData.append("operating_hours", operatingHoursString);
      formData.append("specialties", selectedServices.join(", "));
      formData.append("staff_description", hospital.staff_description);
      formData.append("staff_credentials", hospital.staff_credentials);
      formData.append("is_active", "false");

      selectedImages.forEach((file) => {
        formData.append("images", file);
      });

      if (imageIdsToDelete.length > 0) {
        formData.append("imageIdsToDelete", JSON.stringify(imageIdsToDelete));
      }

      await adminService.updateHospital(hospital.id, formData);
      await fetchHospital();

      setModalMode("view");
      setSelectedImages([]);
      setImageIdsToDelete([]);
      setFormErrors({});

      addToast({
        type: "success",
        message: t("manageHospital.notification.updateSuccess"),
      });
    } catch (error) {
      setFormErrors({
        submit: error.message || t("manageHospital.notification.updateError"),
      });

      addToast({
        type: "error",
        message: `Lỗi: ${
          error.message || t("manageHospital.notification.updateError")
        }`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    const existingImagesCount = hospital.images.filter(
      (img) => !imageIdsToDelete.includes(img.id)
    ).length;

    if (files.length + existingImagesCount > 5) {
      addToast({
        type: "error",
        message: t("manageHospital.notification.imageLimit"),
      });
      return;
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    const invalidFiles = files.filter(
      (file) => file.size > maxSize || !allowedTypes.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      addToast({
        type: "error",
        message: t("manageHospital.notification.imageInvalid"),
      });
      return;
    }

    setSelectedImages((prev) => [...prev, ...files]);
  };

  const handleRemoveSelectedImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveExistingImage = (imageId) => {
    setImageIdsToDelete((prev) => [...prev, imageId]);
  };

  const validateHospitalForm = (data) => {
    const errors = {};

    // Tên bệnh viện
    if (!data.name || data.name.trim() === "")
      errors.name = t("manageHospital.notification.nameRequired");
    else if (data.name.length < 3)
      errors.name = t("manageHospital.notification.nameMinLength");
    else if (data.name.length > 100)
      errors.name = t("manageHospital.notification.nameMaxLength");

    // Địa chỉ
    if (!data.address || data.address.trim() === "")
      errors.address = t("manageHospital.notification.addressRequired");
    else if (data.address.length < 5)
      errors.address = t("manageHospital.notification.addressMinLength");
    else if (data.address.length > 200)
      errors.address = t("manageHospital.notification.addressMaxLength");

    // Số điện thoại
    if (!data.phone || data.phone.trim() === "")
      errors.phone = t("manageHospital.notification.phoneRequired");
    else if (!/^[0-9]{10,11}$/.test(data.phone.replace(/\s/g, "")))
      errors.phone = t("manageHospital.notification.phoneInvalid");

    // Email
    if (!data.email || data.email.trim() === "")
      errors.email = t("manageHospital.notification.emailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      errors.email = t("manageHospital.notification.emailInvalid");

    // Website
    if (data.link_website) {
      const urlPattern =
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
      if (!urlPattern.test(data.link_website)) {
        errors.link_website = t("manageHospital.notification.websiteInvalid");
      }
    }

    // Map location
    if (!data.map_location || data.map_location.trim() === "")
      errors.map_location = t(
        "manageHospital.notification.mapLocationRequired"
      );

    // Mô tả
    if (!data.description || data.description.trim() === "")
      errors.description = t("manageHospital.notification.descriptionRequired");
    else if (data.description.length < 20)
      errors.description = t(
        "manageHospital.notification.descriptionMinLength"
      );
    else if (data.description.length > 2000)
      errors.description = t(
        "manageHospital.notification.descriptionMaxLength"
      );

    // Chuyên khoa
    // if (!data.department || data.department.trim() === '')
    //     errors.department = "Chuyên khoa không được để trống";

    // Specialties
    if (!selectedServices || selectedServices.length === 0) {
      errors.specialties = t("manageHospital.notification.servicesRequired");
    }

    // Giờ làm việc
    if (
      !operatingHours.weekdays.start ||
      !operatingHours.weekdays.end ||
      !operatingHours.weekends.start ||
      !operatingHours.weekends.end
    )
      errors.operating_hours = t(
        "manageHospital.notification.operatingHoursRequired"
      );

    // Staff Description (optional)
    if (data.staff_description && data.staff_description.length > 1000)
      errors.staff_description = t(
        "manageHospital.notification.staffDescriptionMaxLength"
      );

    // Staff Credentials (optional)
    if (data.staff_credentials && data.staff_credentials.length > 1000)
      errors.staff_credentials = t(
        "manageHospital.notification.staffCredentialsMaxLength"
      );

    // Validate số lượng ảnh
    const existingImagesCount = hospital.images.filter(
      (img) => !imageIdsToDelete.includes(img.id)
    ).length;
    const newImagesCount = selectedImages.length;
    const totalImages = existingImagesCount + newImagesCount;

    if (totalImages === 0) {
      errors.images = t("manageHospital.notification.imageRequired");
    } else if (totalImages > 5) {
      errors.images = t("manageHospital.notification.imageLimit");
    }

    // Validate kích thước và định dạng ảnh mới
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    for (let file of selectedImages) {
      if (file.size > maxSize) {
        errors.images = t("manageHospital.notification.imageSizeLimit");
        break;
      }
      if (!allowedTypes.includes(file.type)) {
        errors.images = t("manageHospital.notification.imageTypeInvalid");
        break;
      }
    }

    return errors;
  };

  const handleToggleActive = async () => {
    if (isTogglingActive) return;

    setIsTogglingActive(true);
    try {
      await adminService.toggleActiveHospital(hospital.id);
      await fetchHospital();
      addToast({
        type: "success",
        message: hospital.is_active
          ? t("manageHospital.notification.stopActive")
          : t("manageHospital.notification.startActive"),
      });
    } catch (error) {
      addToast({
        type: "error",
        message: t("manageHospital.notification.toggleActiveError"),
      });
    } finally {
      setIsTogglingActive(false);
    }
  };

  const handleServiceToggle = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
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
            {t("addHospital.back")}
          </button>

          {!hospital && (
            <button
              onClick={() => navigate("/add-hospital")}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              {t("addHospital.title")}
            </button>
          )}
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">
                {t("profile.manageHospital")}
              </h1>
              {hospital && modalMode === "view" && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setModalMode("edit")}
                    className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    {t("manageHospital.edit")}
                  </button>
                </div>
              )}
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center py-8">{error}</div>
            ) : !hospital ? (
              <div className="text-center py-8">
                <div className="text-gray-500 mb-4">
                  {t("manageHospital.noHospital")}
                </div>
                <div className="text-sm text-gray-400">
                  {t("manageHospital.oneHospitalLimit")}
                </div>
              </div>
            ) : modalMode === "edit" ? (
              <form onSubmit={handleUpdateHospital} className="space-y-6">
                {/* Thông báo về quy trình duyệt */}
                <div className="p-4 bg-blue-50 text-blue-700 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">
                      {t("manageHospital.noteTitle")}
                    </p>
                    <p className="text-sm">
                      {t("manageHospital.noteDescription")}
                    </p>
                  </div>
                </div>

                {/* Basic Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("manageHospital.name")}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={hospital.name}
                      onChange={(e) =>
                        setHospital((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className={`w-full p-2 border rounded-lg ${
                        formErrors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      required
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("manageHospital.email")}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={hospital.email}
                      onChange={(e) =>
                        setHospital((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className={`w-full p-2 border rounded-lg ${
                        formErrors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      required
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("manageHospital.phone")}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={hospital.phone}
                      onChange={(e) =>
                        setHospital((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      className={`w-full p-2 border rounded-lg ${
                        formErrors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                      required
                    />
                    {formErrors.phone && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("manageHospital.website")}
                    </label>
                    <input
                      type="text"
                      value={hospital.link_website}
                      onChange={(e) =>
                        setHospital((prev) => ({
                          ...prev,
                          link_website: e.target.value,
                        }))
                      }
                      className={`w-full p-2 border rounded-lg ${
                        formErrors.link_website
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {formErrors.link_website && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.link_website}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("manageHospital.address")}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={hospital.address}
                      onChange={(e) =>
                        setHospital((prev) => ({
                          ...prev,
                          address: e.target.value,
                        }))
                      }
                      className={`w-full p-2 border rounded-lg ${
                        formErrors.address
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      required
                    />
                    {formErrors.address && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.address}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("manageHospital.mapLocation")}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={hospital.map_location}
                      onChange={(e) =>
                        setHospital((prev) => ({
                          ...prev,
                          map_location: e.target.value,
                        }))
                      }
                      rows={3}
                      placeholder={t("manageHospital.mapLocationPlaceholder")}
                      className={`w-full p-2 border rounded-lg ${
                        formErrors.map_location
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      required
                    />
                    {formErrors.map_location && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.map_location}
                      </p>
                    )}
                    <p className="mt-1 text-sm text-gray-500">
                      {t("manageHospital.mapLocationGuide")}
                    </p>
                  </div>
                </div>

                {/* Operating Hours */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("manageHospital.operatingHours")}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div
                    className={`grid grid-cols-2 gap-4 p-3 border rounded-lg ${
                      formErrors.operating_hours
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-medium mb-2">
                        {t("manageHospital.weekdays")}
                      </p>
                      <div className="flex items-center gap-2">
                        <input
                          type="time"
                          value={operatingHours.weekdays.start}
                          onChange={(e) =>
                            setOperatingHours((prev) => ({
                              ...prev,
                              weekdays: {
                                ...prev.weekdays,
                                start: e.target.value,
                              },
                            }))
                          }
                          className="p-2 border rounded-lg border-gray-300"
                          required
                        />
                        <span>-</span>
                        <input
                          type="time"
                          value={operatingHours.weekdays.end}
                          onChange={(e) =>
                            setOperatingHours((prev) => ({
                              ...prev,
                              weekdays: {
                                ...prev.weekdays,
                                end: e.target.value,
                              },
                            }))
                          }
                          className="p-2 border rounded-lg border-gray-300"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">
                        {t("manageHospital.weekends")}
                      </p>
                      <div className="flex items-center gap-2">
                        <input
                          type="time"
                          value={operatingHours.weekends.start}
                          onChange={(e) =>
                            setOperatingHours((prev) => ({
                              ...prev,
                              weekends: {
                                ...prev.weekends,
                                start: e.target.value,
                              },
                            }))
                          }
                          className="p-2 border rounded-lg border-gray-300"
                          required
                        />
                        <span>-</span>
                        <input
                          type="time"
                          value={operatingHours.weekends.end}
                          onChange={(e) =>
                            setOperatingHours((prev) => ({
                              ...prev,
                              weekends: {
                                ...prev.weekends,
                                end: e.target.value,
                              },
                            }))
                          }
                          className="p-2 border rounded-lg border-gray-300"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  {formErrors.operating_hours && (
                    <p className="mt-1 text-sm text-red-500">
                      {formErrors.operating_hours}
                    </p>
                  )}
                </div>

                {/* Department and Specialties */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("manageHospital.services")}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES_ROW_3.map((service) => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => handleServiceToggle(service)}
                        className={`px-4 py-2 rounded-full text-sm ${
                          selectedServices.includes(service)
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-700"
                        } hover:bg-blue-50 transition-colors duration-200`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                  {formErrors.specialties && (
                    <p className="mt-1 text-sm text-red-500">
                      {formErrors.specialties}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("manageHospital.description")}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={hospital.description}
                    onChange={(e) =>
                      setHospital((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    rows={5}
                    className={`w-full p-2 border rounded-lg ${
                      formErrors.description
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    required
                  />
                  {formErrors.description && (
                    <p className="mt-1 text-sm text-red-500">
                      {formErrors.description}
                    </p>
                  )}
                </div>

                {/* Staff Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("manageHospital.staffDescription")}
                    </label>
                    <textarea
                      value={hospital.staff_description}
                      onChange={(e) =>
                        setHospital((prev) => ({
                          ...prev,
                          staff_description: e.target.value,
                        }))
                      }
                      rows={3}
                      className={`w-full p-2 border rounded-lg ${
                        formErrors.staff_description
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {formErrors.staff_description && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.staff_description}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("manageHospital.staffCredentials")}
                    </label>
                    <textarea
                      value={hospital.staff_credentials}
                      onChange={(e) =>
                        setHospital((prev) => ({
                          ...prev,
                          staff_credentials: e.target.value,
                        }))
                      }
                      rows={3}
                      className={`w-full p-2 border rounded-lg ${
                        formErrors.staff_credentials
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {formErrors.staff_credentials && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.staff_credentials}
                      </p>
                    )}
                  </div>
                </div>

                {/* Images */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("manageHospital.images")}{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  {/* Hiển thị thông tin về giới hạn */}
                  <p className="text-sm text-gray-500 mb-2">
                    {t("manageHospital.imageLimit")}
                  </p>

                  {/* Hiển thị ảnh hiện tại và mới */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {hospital.images
                      .filter((img) => !imageIdsToDelete.includes(img.id))
                      .map((image) => (
                        <div key={image.id} className="relative">
                          <img
                            src={image.url}
                            alt="Hospital"
                            className="h-24 w-full object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveExistingImage(image.id)}
                            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}

                    {selectedImages.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt="Preview"
                          className="h-24 w-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveSelectedImage(index)}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Input file và error message */}
                  <input
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/jpg"
                    onChange={handleImageSelect}
                    className="hidden"
                    id="hospital-images"
                  />
                  <label
                    htmlFor="hospital-images"
                    className="inline-block px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    {t("manageHospital.addImage")}
                  </label>

                  {formErrors.images && (
                    <p className="mt-1 text-sm text-red-500">
                      {formErrors.images}
                    </p>
                  )}
                </div>

                {/* Map Location */}
                {hospital.map_location && (
                  <div className="w-full h-[400px] rounded-lg overflow-hidden">
                    <iframe
                      src={hospital.map_location}
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

                {/* General form error */}
                {formErrors.submit && (
                  <div className="p-3 bg-red-50 text-red-700 rounded-lg">
                    {formErrors.submit}
                  </div>
                )}

                {/* Submit Buttons */}
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setModalMode("view");
                      setSelectedImages([]);
                      setImageIdsToDelete([]);
                      setFormErrors({});
                    }}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    {t("manageHospital.cancel")}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isSubmitting
                      ? t("manageHospital.saving")
                      : t("manageHospital.saveChanges")}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-8">
                {/* Trạng thái phê duyệt */}
                <div
                  className={`p-4 rounded-lg ${
                    hospital.is_active
                      ? "bg-green-50 text-green-700"
                      : "bg-yellow-50 text-yellow-700"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">
                        {t("hospitalDetail.status")}{" "}
                        {hospital.is_active
                          ? t("hospitalDetail.approved")
                          : t("hospitalDetail.pending")}
                      </p>
                      <p className="text-sm">
                        {hospital.is_active
                          ? t("hospitalDetail.approvedNote")
                          : t("hospitalDetail.pendingNote")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Thông tin cơ bản */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    {hospital.name}
                  </h2>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="font-medium">
                            {t("hospitalDetail.information.address")}
                          </p>
                          <p className="text-gray-600">{hospital.address}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone className="w-5 h-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="font-medium">
                            {t("hospitalDetail.information.phone")}
                          </p>
                          <p className="text-gray-600">{hospital.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Globe className="w-5 h-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="font-medium">
                            {t("hospitalDetail.information.website")}
                          </p>
                          <a
                            href={hospital.link_website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {hospital.link_website}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-2">
                        <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="font-medium">
                            {t("hospitalDetail.information.workingHours")}
                          </p>
                          <p className="text-gray-600">
                            {hospital.operating_hours}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Star className="w-5 h-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="font-medium">
                            {t("hospitalDetail.information.rating")}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-yellow-400">
                              {hospital.average_rating}/5
                            </span>
                            <span className="text-gray-500">
                              ({hospital.review_count}{" "}
                              {t("hospitalDetail.information.reviews")})
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Mail className="w-5 h-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Email</p>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">
                              {hospital.email}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chuyên khoa và Dịch vụ */}
                <div>
                  <h3 className="font-semibold mb-3">
                    {t("hospitalDetail.services.title")}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {hospital.specialties.split(",").map((dept, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                      >
                        {dept.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Mô tả */}
                <div>
                  <h3 className="font-semibold mb-3">
                    {t("hospitalDetail.description.title")}
                  </h3>
                  <p className="text-gray-600 whitespace-pre-line">
                    {hospital.description}
                  </p>
                </div>

                {/* Thông tin nhân viên */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">
                      {t("hospitalDetail.staff.title")}
                    </h3>
                    <p className="text-gray-600 whitespace-pre-line">
                      {hospital.staff_description}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">
                      {t("hospitalDetail.staff.credentials")}
                    </h3>
                    <p className="text-gray-600 whitespace-pre-line">
                      {hospital.staff_credentials}
                    </p>
                  </div>
                </div>

                {/* Vị trí trên bản đồ */}
                {hospital.map_location && (
                  <div>
                    <h3 className="font-semibold mb-3">
                      {t("hospitalDetail.mapLocation.title")}
                    </h3>
                    <div className="w-full h-[400px] rounded-lg overflow-hidden">
                      <iframe
                        src={hospital.map_location}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full"
                      ></iframe>
                    </div>
                  </div>
                )}

                {/* Thư viện ảnh */}
                <div>
                  <h3 className="font-semibold mb-3">
                    {t("hospitalDetail.images.title")}
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {hospital.images.map((image) => (
                      <div
                        key={image.id}
                        className="relative aspect-video rounded-lg overflow-hidden group"
                      >
                        <img
                          src={image.url}
                          alt={hospital.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                          {image.likesCount}{" "}
                          {t("hospitalDetail.gallery.reviewCount")}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageHospital;
