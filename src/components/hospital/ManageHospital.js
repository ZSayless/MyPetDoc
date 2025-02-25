import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building, Phone, MapPin, Plus, Globe, Clock, Star, X, Mail, ToggleLeft, ToggleRight, AlertCircle } from 'lucide-react';
import { getHospitalsByCreator } from '../../services/hospitalService';
import { adminService } from '../../services/adminService';
import { useToast } from '../../context/ToastContext';

function ManageHospital() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { addToast } = useToast();
    const [hospital, setHospital] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalMode, setModalMode] = useState('view');
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageIdsToDelete, setImageIdsToDelete] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isTogglingActive, setIsTogglingActive] = useState(false);
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

    useEffect(() => {
        fetchHospital();
    }, []);

    useEffect(() => {
        if (hospital?.operating_hours) {
            try {
                const times = hospital.operating_hours.split(',').map(t => t.trim());
                const weekdayTimes = times[0].replace('Weekdays:', '').trim().split('-').map(t => t.trim());
                const weekendTimes = times[1].replace('Weekends:', '').trim().split('-').map(t => t.trim());

                setOperatingHours({
                    weekdays: {
                        start: weekdayTimes[0],
                        end: weekdayTimes[1]
                    },
                    weekends: {
                        start: weekendTimes[0],
                        end: weekendTimes[1]
                    }
                });
            } catch (error) {
                console.error('Error parsing operating hours:', error);
            }
        }
    }, [hospital?.operating_hours]);

    const fetchHospital = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
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
                type: 'error',
                message: 'Vui lòng kiểm tra lại thông tin đã nhập'
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
            formData.append("specialties", hospital.specialties);
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
                type: 'success',
                message: 'Cập nhật thông tin bệnh viện thành công. Thông tin sẽ được hiển thị sau khi được quản trị viên phê duyệt.'
            });
            
        } catch (error) {
            setFormErrors({
                submit: error.message || "Đã xảy ra lỗi khi cập nhật thông tin bệnh viện"
            });
            
            addToast({
                type: 'error',
                message: `Lỗi: ${error.message || "Không thể cập nhật thông tin bệnh viện"}`
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleImageSelect = (e) => {
        const files = Array.from(e.target.files);
        setSelectedImages(prev => [...prev, ...files]);
    };

    const handleRemoveSelectedImage = (index) => {
        setSelectedImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleRemoveExistingImage = (imageId) => {
        setImageIdsToDelete(prev => [...prev, imageId]);
    };

    const validateHospitalForm = (data) => {
        const errors = {};
        
        // Tên bệnh viện
        if (!data.name || data.name.trim() === '') 
            errors.name = "Tên bệnh viện không được để trống";
        else if (data.name.length < 3)
            errors.name = "Tên bệnh viện phải có ít nhất 3 ký tự";
        else if (data.name.length > 100)
            errors.name = "Tên bệnh viện không được vượt quá 100 ký tự";
        
        // Địa chỉ
        if (!data.address || data.address.trim() === '') 
            errors.address = "Địa chỉ không được để trống";
        else if (data.address.length < 5)
            errors.address = "Địa chỉ phải có ít nhất 5 ký tự";
        else if (data.address.length > 200)
            errors.address = "Địa chỉ không được vượt quá 200 ký tự";
        
        // Số điện thoại
        if (!data.phone || data.phone.trim() === '') 
            errors.phone = "Số điện thoại không được để trống";
        else if (!/^[0-9]{10,11}$/.test(data.phone.replace(/\s/g, '')))
            errors.phone = "Số điện thoại không hợp lệ (cần 10-11 số)";
        
        // Email
        if (!data.email || data.email.trim() === '') 
            errors.email = "Email không được để trống";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
            errors.email = "Email không đúng định dạng";
        
        // Website
        if (!data.link_website || data.link_website.trim() === '') 
            errors.link_website = "Website không được để trống";
        else if (data.link_website.length < 4)
            errors.link_website = "Website phải có ít nhất 4 ký tự";
        
        // Map location
        if (!data.map_location || data.map_location.trim() === '')
            errors.map_location = "Vị trí bản đồ không được để trống";
        
        // Mô tả
        if (!data.description || data.description.trim() === '')
            errors.description = "Mô tả không được để trống";
        else if (data.description.length < 20)
            errors.description = "Mô tả phải có ít nhất 20 ký tự";
        else if (data.description.length > 2000)
            errors.description = "Mô tả không được vượt quá 2000 ký tự";
        
        // Chuyên khoa
        if (!data.department || data.department.trim() === '')
            errors.department = "Chuyên khoa không được để trống";
        
        // Specialties
        if (!data.specialties || data.specialties.trim() === '')
            errors.specialties = "Dịch vụ không được để trống";
        
        // Giờ làm việc
        if (!operatingHours.weekdays.start || !operatingHours.weekdays.end || 
            !operatingHours.weekends.start || !operatingHours.weekends.end)
            errors.operating_hours = "Giờ làm việc không được để trống";
        
        // Staff Description (optional)
        if (data.staff_description && data.staff_description.length > 1000)
            errors.staff_description = "Mô tả nhân viên không được vượt quá 1000 ký tự";
        
        // Staff Credentials (optional)
        if (data.staff_credentials && data.staff_credentials.length > 1000)
            errors.staff_credentials = "Chứng chỉ nhân viên không được vượt quá 1000 ký tự";
        
        return errors;
    };

    const handleToggleActive = async () => {
        if (isTogglingActive) return;
        
        setIsTogglingActive(true);
        try {
            await adminService.toggleActiveHospital(hospital.id);
            await fetchHospital();
            addToast({
                type: 'success',
                message: hospital.is_active 
                    ? 'Bệnh viện đã được tạm ngưng hoạt động' 
                    : 'Bệnh viện đã được kích hoạt'
            });
        } catch (error) {
            addToast({
                type: 'error',
                message: `Không thể thay đổi trạng thái: ${error.message}`
            });
        } finally {
            setIsTogglingActive(false);
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
                        {t("addHospital.back")}
                    </button>

                    {!hospital && (
                        <button
                            onClick={() => navigate('/add-hospital')}
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
                            {hospital && modalMode === 'view' && (
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setModalMode('edit')}
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
                                <div className="text-gray-500 mb-4">{t("manageHospital.noHospitals")}</div>
                                <div className="text-sm text-gray-400">{t("manageHospital.oneHospitalLimit")}</div>
                            </div>
                        ) : modalMode === 'edit' ? (
                            <form onSubmit={handleUpdateHospital} className="space-y-6">
                                {/* Thông báo về quy trình duyệt */}
                                <div className="p-4 bg-blue-50 text-blue-700 rounded-lg flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium">Lưu ý về quy trình duyệt</p>
                                        <p className="text-sm">Sau khi cập nhật thông tin, bệnh viện của bạn sẽ cần được quản trị viên phê duyệt lại trước khi hiển thị công khai.</p>
                                    </div>
                                </div>

                                {/* Basic Information */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Tên bệnh viện <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={hospital.name}
                                            onChange={(e) => setHospital(prev => ({ ...prev, name: e.target.value }))}
                                            className={`w-full p-2 border rounded-lg ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`}
                                            required
                                        />
                                        {formErrors.name && (
                                            <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            value={hospital.email}
                                            onChange={(e) => setHospital(prev => ({ ...prev, email: e.target.value }))}
                                            className={`w-full p-2 border rounded-lg ${formErrors.email ? "border-red-500" : "border-gray-300"}`}
                                            required
                                        />
                                        {formErrors.email && <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Số điện thoại <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={hospital.phone}
                                            onChange={(e) => setHospital(prev => ({ ...prev, phone: e.target.value }))}
                                            className={`w-full p-2 border rounded-lg ${formErrors.phone ? "border-red-500" : "border-gray-300"}`}
                                            required
                                        />
                                        {formErrors.phone && <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Website <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={hospital.link_website}
                                            onChange={(e) => setHospital(prev => ({ ...prev, link_website: e.target.value }))}
                                            className={`w-full p-2 border rounded-lg ${formErrors.link_website ? "border-red-500" : "border-gray-300"}`}
                                            required
                                        />
                                        {formErrors.link_website && <p className="mt-1 text-sm text-red-500">{formErrors.link_website}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Địa chỉ <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={hospital.address}
                                            onChange={(e) => setHospital(prev => ({ ...prev, address: e.target.value }))}
                                            className={`w-full p-2 border rounded-lg ${formErrors.address ? "border-red-500" : "border-gray-300"}`}
                                            required
                                        />
                                        {formErrors.address && <p className="mt-1 text-sm text-red-500">{formErrors.address}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Vị trí trên bản đồ <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            value={hospital.map_location}
                                            onChange={(e) => setHospital(prev => ({ ...prev, map_location: e.target.value }))}
                                            rows={3}
                                            placeholder="Nhập mã nhúng Google Maps (iframe)"
                                            className={`w-full p-2 border rounded-lg ${formErrors.map_location ? "border-red-500" : "border-gray-300"}`}
                                            required
                                        />
                                        {formErrors.map_location && <p className="mt-1 text-sm text-red-500">{formErrors.map_location}</p>}
                                        <p className="mt-1 text-sm text-gray-500">
                                            Hướng dẫn: Truy cập Google Maps, tìm địa điểm của bạn, nhấn "Chia sẻ", chọn "Nhúng bản đồ" và sao chép mã iframe.
                                        </p>
                                    </div>
                                </div>

                                {/* Operating Hours */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Giờ làm việc <span className="text-red-500">*</span>
                                    </label>
                                    <div className={`grid grid-cols-2 gap-4 p-3 border rounded-lg ${formErrors.operating_hours ? "border-red-500" : "border-gray-300"}`}>
                                        <div>
                                            <p className="text-sm font-medium mb-2">Ngày thường</p>
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
                                                <span>-</span>
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
                                            <p className="text-sm font-medium mb-2">Cuối tuần</p>
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
                                                <span>-</span>
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

                                {/* Department and Specialties */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Chuyên khoa <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={hospital.department}
                                            onChange={(e) => setHospital(prev => ({ ...prev, department: e.target.value }))}
                                            className={`w-full p-2 border rounded-lg ${formErrors.department ? "border-red-500" : "border-gray-300"}`}
                                            placeholder="Ví dụ: Khoa Nội, Khoa Ngoại"
                                            required
                                        />
                                        {formErrors.department && <p className="mt-1 text-sm text-red-500">{formErrors.department}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Dịch vụ <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={hospital.specialties}
                                            onChange={(e) => setHospital(prev => ({ ...prev, specialties: e.target.value }))}
                                            className={`w-full p-2 border rounded-lg ${formErrors.specialties ? "border-red-500" : "border-gray-300"}`}
                                            placeholder="Ví dụ: Khám tổng quát, Siêu âm"
                                            required
                                        />
                                        {formErrors.specialties && <p className="mt-1 text-sm text-red-500">{formErrors.specialties}</p>}
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Mô tả <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        value={hospital.description}
                                        onChange={(e) => setHospital(prev => ({ ...prev, description: e.target.value }))}
                                        rows={5}
                                        className={`w-full p-2 border rounded-lg ${formErrors.description ? "border-red-500" : "border-gray-300"}`}
                                        required
                                    />
                                    {formErrors.description && <p className="mt-1 text-sm text-red-500">{formErrors.description}</p>}
                                </div>

                                {/* Staff Information */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Mô tả nhân viên
                                        </label>
                                        <textarea
                                            value={hospital.staff_description}
                                            onChange={(e) => setHospital(prev => ({ ...prev, staff_description: e.target.value }))}
                                            rows={3}
                                            className={`w-full p-2 border rounded-lg ${formErrors.staff_description ? "border-red-500" : "border-gray-300"}`}
                                        />
                                        {formErrors.staff_description && <p className="mt-1 text-sm text-red-500">{formErrors.staff_description}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Chứng chỉ nhân viên
                                        </label>
                                        <textarea
                                            value={hospital.staff_credentials}
                                            onChange={(e) => setHospital(prev => ({ ...prev, staff_credentials: e.target.value }))}
                                            rows={3}
                                            className={`w-full p-2 border rounded-lg ${formErrors.staff_credentials ? "border-red-500" : "border-gray-300"}`}
                                        />
                                        {formErrors.staff_credentials && <p className="mt-1 text-sm text-red-500">{formErrors.staff_credentials}</p>}
                                    </div>
                                </div>

                                {/* Images */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
                                    <div className="grid grid-cols-3 gap-4 mb-4">
                                        {hospital.images
                                            .filter(img => !imageIdsToDelete.includes(img.id))
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
                                    </div>

                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageSelect}
                                        className="hidden"
                                        id="hospital-images"
                                    />
                                    <label
                                        htmlFor="hospital-images"
                                        className="inline-block px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                                    >
                                        Add Images
                                    </label>

                                    {selectedImages.length > 0 && (
                                        <div className="grid grid-cols-3 gap-4 mt-4">
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
                                            setModalMode('view');
                                            setSelectedImages([]);
                                            setImageIdsToDelete([]);
                                            setFormErrors({});
                                        }}
                                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Đang lưu...' : 'Lưu thay đổi'}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-8">
                                {/* Trạng thái phê duyệt */}
                                <div className={`p-4 rounded-lg ${
                                    hospital.is_active 
                                        ? 'bg-green-50 text-green-700' 
                                        : 'bg-yellow-50 text-yellow-700'
                                }`}>
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium">
                                                Trạng thái: {hospital.is_active ? 'Đã được phê duyệt' : 'Đang chờ phê duyệt'}
                                            </p>
                                            <p className="text-sm">
                                                {hospital.is_active 
                                                    ? 'Bệnh viện của bạn đã được phê duyệt và hiển thị công khai.' 
                                                    : 'Bệnh viện của bạn đang chờ quản trị viên phê duyệt. Bạn sẽ nhận được thông báo khi quá trình phê duyệt hoàn tất.'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Thông tin cơ bản */}
                                <div>
                                    <h2 className="text-xl font-semibold mb-4">{hospital.name}</h2>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-2">
                                                <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                                                <div>
                                                    <p className="font-medium">Địa chỉ</p>
                                                    <p className="text-gray-600">{hospital.address}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <Phone className="w-5 h-5 text-gray-500 mt-0.5" />
                                                <div>
                                                    <p className="font-medium">Điện thoại</p>
                                                    <p className="text-gray-600">{hospital.phone}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <Globe className="w-5 h-5 text-gray-500 mt-0.5" />
                                                <div>
                                                    <p className="font-medium">Website</p>
                                                    <a href={hospital.link_website} target="_blank" rel="noopener noreferrer"
                                                        className="text-blue-600 hover:underline">
                                                        {hospital.link_website}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-2">
                                                <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
                                                <div>
                                                    <p className="font-medium">Giờ làm việc</p>
                                                    <p className="text-gray-600">{hospital.operating_hours}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <Star className="w-5 h-5 text-gray-500 mt-0.5" />
                                                <div>
                                                    <p className="font-medium">Đánh giá</p>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-yellow-400">{hospital.average_rating}/5</span>
                                                        <span className="text-gray-500">({hospital.review_count} đánh giá)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <Mail className="w-5 h-5 text-gray-500 mt-0.5" />
                                                <div>
                                                    <p className="font-medium">Email</p>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-gray-500">{hospital.email}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Chuyên khoa và Dịch vụ */}
                                <div>
                                    <h3 className="font-semibold mb-3">Chuyên khoa & Dịch vụ</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {hospital.department.split(',').map((dept, index) => (
                                            <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                                                {dept.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Mô tả */}
                                <div>
                                    <h3 className="font-semibold mb-3">Giới thiệu</h3>
                                    <p className="text-gray-600 whitespace-pre-line">{hospital.description}</p>
                                </div>

                                {/* Thông tin nhân viên */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="font-semibold mb-3">Đội ngũ nhân viên</h3>
                                        <p className="text-gray-600 whitespace-pre-line">{hospital.staff_description}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-3">Chứng chỉ & Giấy phép</h3>
                                        <p className="text-gray-600 whitespace-pre-line">{hospital.staff_credentials}</p>
                                    </div>
                                </div>

                                {/* Vị trí trên bản đồ */}
                                {hospital.map_location && (
                                    <div>
                                        <h3 className="font-semibold mb-3">Vị trí trên bản đồ</h3>
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
                                    <h3 className="font-semibold mb-3">Hình ảnh</h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        {hospital.images.map((image) => (
                                            <div key={image.id} className="relative aspect-video rounded-lg overflow-hidden group">
                                                <img
                                                    src={image.url}
                                                    alt={hospital.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                                                    {image.likesCount} likes
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
