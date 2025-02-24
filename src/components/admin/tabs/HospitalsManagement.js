import { useState, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  Eye,
  Edit,
  Check,
  X,
  Star,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Plus,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import {
  approveHospital,
  rejectHospital,
  deleteHospital,
  updateHospital,
  fetchHospitals,
  toggleActiveHospital,
  fetchDeletedHospitals,
  toggleDeleteHospital,
  createHospital,
  deleteHospitalPermanently,
} from "../../../redux/slices/adminSlice";
import { useToast } from "../../../context/ToastContext";
import { HOSPITAL_SERVICES } from "../../../constants/services";

function HospitalsManagement() {
  const dispatch = useDispatch();
  const { addToast } = useToast();
  const {
    hospitals,
    deletedHospitals,
    loading,
    pagination,
    deletedPagination,
  } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [modalMode, setModalMode] = useState("view");
  const [activeTab, setActiveTab] = useState("list");
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageIdsToDelete, setImageIdsToDelete] = useState([]);
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newHospital, setNewHospital] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    description: "",
    link_website: "",
    map_location: "",
    department: "",
    operating_hours: "",
    specialties: "",
    staff_description: "",
    staff_credentials: "",
  });
  const [newImages, setNewImages] = useState([]);
  const [hospitalToDelete, setHospitalToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
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
    if (activeTab === "list") {
      dispatch(fetchHospitals({ page: 1, limit: 10 }));
    } else {
      dispatch(fetchDeletedHospitals({ page: 1, limit: 10 }));
    }
  }, [dispatch, activeTab]);

  useEffect(() => {
    if (selectedHospital?.operating_hours) {
      try {
        const times = selectedHospital.operating_hours.split(',').map(t => t.trim());
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
  }, [selectedHospital?.operating_hours]);

  const handleApprove = (hospitalId) => {
    dispatch(approveHospital(hospitalId));
  };

  const handleReject = (hospitalId) => {
    if (window.confirm("Are you sure you want to reject this hospital?")) {
      dispatch(rejectHospital(hospitalId));
    }
  };

  const handleDelete = (hospitalId) => {
    if (window.confirm("Are you sure you want to delete this hospital?")) {
      dispatch(deleteHospital(hospitalId));
    }
  };

  const handleView = (hospital) => {
    setSelectedHospital(hospital);
    setModalMode("view");
  };

  const handleEdit = (hospital) => {
    setSelectedHospital(hospital);
    setModalMode("edit");
  };

  const handleUpdateHospital = async (e) => {
    e.preventDefault();
    const errors = validateHospitalForm(selectedHospital);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();

      // Add basic information fields
      formData.append("name", selectedHospital.name);
      formData.append("address", selectedHospital.address);
      formData.append("phone", selectedHospital.phone);
      formData.append("email", selectedHospital.email);
      formData.append("link_website", selectedHospital.link_website);
      formData.append("map_location", selectedHospital.map_location);
      formData.append("description", selectedHospital.description);
      formData.append("department", selectedHospital.department);
      formData.append("operating_hours", selectedHospital.operating_hours);
      formData.append("specialties", selectedHospital.specialties);
      formData.append("staff_description", selectedHospital.staff_description);
      formData.append("staff_credentials", selectedHospital.staff_credentials);

      // Add new images
      selectedImages.forEach((file) => {
        formData.append("images", file);
      });

      // Add list of image IDs to delete with new name
      if (imageIdsToDelete.length > 0) {
        formData.append("imageIdsToDelete", JSON.stringify(imageIdsToDelete));
      }

      await dispatch(
        updateHospital({
          hospitalId: selectedHospital.id,
          formData,
        })
      ).unwrap();

      addToast({
        type: "success",
        message: "Update hospital information successfully!",
      });

      setModalMode("view");
      setSelectedImages([]);
      setImageIdsToDelete([]);
    } catch (error) {
      addToast({
        type: "error",
        message:
          error.message ||
          "An error occurred while updating hospital information",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (
      files.length + selectedHospital.images.length - imageIdsToDelete.length >
      5
    ) {
      addToast({
        type: "error",
        message: "Maximum 5 images allowed to upload",
      });
      return;
    }
    setSelectedImages((prev) => [...prev, ...files]);
  };

  const handleDeleteImage = (imageId) => {
    setImageIdsToDelete((prev) => [...prev, imageId]);
  };

  const handleRemoveSelectedImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleToggleActive = async (hospitalId, currentActiveState) => {
    try {
      const message = currentActiveState
        ? "Are you sure you want to disable this hospital?"
        : "Are you sure you want to activate this hospital?";

      if (window.confirm(message)) {
        await dispatch(toggleActiveHospital(hospitalId)).unwrap();
        addToast({
          type: "success",
          message: `${
            currentActiveState ? "Disable" : "Activate"
          } hospital successfully!`,
        });
      }
    } catch (error) {
      addToast({
        type: "error",
        message:
          error.message ||
          "An error occurred while updating the hospital status",
      });
    }
  };

  const handleToggleDelete = async (hospitalId) => {
    try {
      const message = "Are you sure you want to perform this action?";
      if (window.confirm(message)) {
        await dispatch(toggleDeleteHospital(hospitalId)).unwrap();
        addToast({
          type: "success",
          message: "Action performed successfully!",
        });
      }
    } catch (error) {
      addToast({
        type: "error",
        message: error.message || "An error occurred",
      });
    }
  };

  const handleCreateHospital = async (e) => {
    e.preventDefault();
    const errors = validateHospitalForm(newHospital);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsCreating(true);

    try {
      const formData = new FormData();

      // Add required fields
      formData.append("name", newHospital.name);
      formData.append("address", newHospital.address);
      formData.append("phone", newHospital.phone);
      formData.append("email", newHospital.email);

      // Add optional fields
      if (newHospital.description)
        formData.append("description", newHospital.description);
      if (newHospital.link_website)
        formData.append("link_website", newHospital.link_website);
      if (newHospital.map_location)
        formData.append("map_location", newHospital.map_location);
      if (newHospital.department)
        formData.append("department", newHospital.department);
      if (newHospital.operating_hours)
        formData.append("operating_hours", newHospital.operating_hours);
      if (newHospital.specialties)
        formData.append("specialties", newHospital.specialties);
      if (newHospital.staff_description)
        formData.append("staff_description", newHospital.staff_description);
      if (newHospital.staff_credentials)
        formData.append("staff_credentials", newHospital.staff_credentials);

      // Add images
      newImages.forEach((file) => {
        formData.append("images", file);
      });

      await dispatch(createHospital(formData)).unwrap();

      addToast({
        type: "success",
        message: "Add new hospital successfully!",
      });

      // Reset form
      setNewHospital({
        name: "",
        address: "",
        phone: "",
        email: "",
        description: "",
        link_website: "",
        map_location: "",
        department: "",
        operating_hours: "",
        specialties: "",
        staff_description: "",
        staff_credentials: "",
      });
      setNewImages([]);
      setModalMode("");
    } catch (error) {
      addToast({
        type: "error",
        message:
          error.message || "An error occurred while adding a new hospital",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleNewImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + newImages.length > 5) {
      addToast({
        type: "error",
        message: "Maximum 5 images allowed to upload",
      });
      return;
    }
    setNewImages((prev) => [...prev, ...files]);
  };

  const handleRemoveNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeletePermanently = async () => {
    if (!hospitalToDelete) return;

    setIsDeleting(true);
    try {
      await dispatch(deleteHospitalPermanently(hospitalToDelete.id)).unwrap();

      addToast({
        type: "success",
        message: "Delete hospital successfully!",
      });

      setHospitalToDelete(null);
    } catch (error) {
      addToast({
        type: "error",
        message:
          error.message || "An error occurred while deleting the hospital",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const getFilteredHospitals = () => {
    const currentHospitals =
      activeTab === "list" ? hospitals : deletedHospitals;
    if (!currentHospitals) return [];

    return currentHospitals.filter(
      (hospital) =>
        hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleCloseForm = () => {
    setModalMode("view");
    setSelectedHospital(null);
    setSelectedImages([]);
    setImageIdsToDelete([]);
  };

  const validateHospitalForm = (data) => {
    const errors = {};

    // Validate name
    if (!data.name?.trim()) {
      errors.name = "Hospital name is required";
    } else if (data.name.length > 255) {
      errors.name = "Hospital name cannot exceed 255 characters";
    }

    // Validate address
    if (!data.address?.trim()) {
      errors.address = "Address is required";
    } else if (data.address.length > 500) {
      errors.address = "Address cannot exceed 500 characters";
    }

    // Validate phone
    if (!data.phone?.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^[0-9]{10,11}$/.test(data.phone)) {
      errors.phone = "Phone number must be 10-11 digits";
    }

    // Validate email
    if (!data.email?.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "Invalid email format";
    }

    // Validate website (optional)
    if (data.link_website && !/^https?:\/\//.test(data.link_website)) {
      errors.link_website = "Link website must start with http:// or https://";
    }

    // Validate map location (optional)
    if (data.map_location && data.map_location.length > 500) {
      errors.map_location = "Map location cannot exceed 500 characters";
    }

    // Validate description
    if (!data.description?.trim()) {
      errors.description = "Description is required";
    } else if (data.description.length > 2000) {
      errors.description = "Description cannot exceed 2000 characters";
    }

    // Validate department
    if (!data.department?.trim()) {
      errors.department = "Department is required";
    } else if (data.department.length > 1000) {
      errors.department = "Department cannot exceed 1000 characters";
    }

    // Validate operating hours
    if (!data.operating_hours?.trim()) {
      errors.operating_hours = "Working hours are required";
    } else if (data.operating_hours.length > 255) {
      errors.operating_hours = "Operating hours cannot exceed 255 characters";
    }

    // Validate specialties
    if (!data.specialties?.trim()) {
      errors.specialties = "Specialties are required";
    } else if (data.specialties.length > 1000) {
      errors.specialties = "Specialties cannot exceed 1000 characters";
    }

    // Validate staff description (optional)
    if (data.staff_description && data.staff_description.length > 1000) {
      errors.staff_description =
        "Staff description cannot exceed 1000 characters";
    }

    // Validate staff credentials (optional)
    if (data.staff_credentials && data.staff_credentials.length > 1000) {
      errors.staff_credentials =
        "Staff credentials cannot exceed 1000 characters";
    }

    // Validate images
    if (modalMode === "create" && (!newImages || newImages.length === 0)) {
      errors.images = "Need to upload at least 1 image";
    }

    if (newImages && newImages.length > 5) {
      errors.images = "Cannot upload more than 5 images";
    }

    // Validate file size and type
    const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (newImages) {
      newImages.forEach((file, index) => {
        if (!validImageTypes.includes(file.type)) {
          errors[`image_${index}`] =
            "Only accept image files in JPG, JPEG, or PNG format";
        }
        if (file.size > maxSize) {
          errors[`image_${index}`] = "Image size cannot exceed 5MB";
        }
      });
    }

    return errors;
  };

  const handleServiceSelection = (service, isCreating = false) => {
    if (isCreating) {
      let newSpecialties = newHospital.specialties ? newHospital.specialties.split(',').map(s => s.trim()) : [];
      
      if (newSpecialties.includes(service)) {
        newSpecialties = newSpecialties.filter(s => s !== service);
      } else {
        newSpecialties.push(service);
      }

      setNewHospital(prev => ({
        ...prev,
        specialties: newSpecialties.join(', ')
      }));
    } else {
      let newSpecialties = selectedHospital.specialties ? selectedHospital.specialties.split(',').map(s => s.trim()) : [];
      
      if (newSpecialties.includes(service)) {
        newSpecialties = newSpecialties.filter(s => s !== service);
      } else {
        newSpecialties.push(service);
      }

      setSelectedHospital(prev => ({
        ...prev,
        specialties: newSpecialties.join(', ')
      }));
    }
  };

  const handleTimeChange = (period, type, time, isCreating = false) => {
    const newTime = {
      ...operatingHours,
      [period]: {
        ...operatingHours[period],
        [type]: time
      }
    };
    setOperatingHours(newTime);

    // Cập nhật giá trị cho form
    const timeString = `Weekdays: ${newTime.weekdays.start} - ${newTime.weekdays.end}, Weekends: ${newTime.weekends.start} - ${newTime.weekends.end}`;
    
    if (isCreating) {
      setNewHospital(prev => ({
        ...prev,
        operating_hours: timeString
      }));
    } else {
      setSelectedHospital(prev => ({
        ...prev,
        operating_hours: timeString
      }));
    }
  };

  return (
    <div className="p-4 md:p-6">
      {/* Header Tabs */}
      <div className="flex gap-2 mb-4 mt-12 md:mt-0">
        <button
          onClick={() => setActiveTab("list")}
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            activeTab === "list"
              ? "text-white bg-blue-600"
              : "text-gray-700 bg-gray-100 hover:bg-gray-200"
          }`}
        >
          List of hospitals
        </button>
        <button
          onClick={() => setActiveTab("trash")}
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            activeTab === "trash"
              ? "text-white bg-blue-600"
              : "text-gray-700 bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Trash
        </button>
      </div>

      {/* Search and Add Button */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-1 max-w-lg">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, phone number, address..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
        <button
          onClick={() => setModalMode("create")}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <Plus size={20} />
          Add hospital
        </button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Creator
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {getFilteredHospitals()?.map((hospital) => (
                <tr key={hospital.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {hospital.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {hospital.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {hospital.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          hospital.is_active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {hospital.is_active ? "Active" : "Inactive"}
                      </span>
                      <button
                        onClick={() =>
                          handleToggleActive(hospital.id, hospital.is_active)
                        }
                        className={`p-1 rounded hover:bg-gray-100 ${
                          hospital.is_active ? "text-green-600" : "text-red-600"
                        }`}
                        title={
                          hospital.is_active
                            ? "Deactivate hospital"
                            : "Activate hospital"
                        }
                      >
                        {hospital.is_active ? (
                          <ToggleRight size={18} />
                        ) : (
                          <ToggleLeft size={18} />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {hospital?.creator && (
                      <div className="flex items-center gap-2">
                        {hospital.creator.avatar && (
                          <img
                            src={hospital.creator.avatar}
                            alt={hospital.creator.full_name}
                            className="w-8 h-8 rounded-full"
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {hospital.creator.full_name || "N/A"}
                          </div>
                          <div className="text-xs text-gray-500">
                            {hospital.creator.email || "N/A"}
                          </div>
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleView(hospital)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye size={18} />
                      </button>
                      {activeTab === "list" ? (
                        <>
                          <button
                            onClick={() => handleEdit(hospital)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleToggleDelete(hospital.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Move to trash"
                          >
                            <Trash2 size={18} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleToggleDelete(hospital.id)}
                            className="text-green-600 hover:text-green-900"
                            title="Restore"
                          >
                            <RefreshCw size={18} />
                          </button>
                          <button
                            onClick={() => setHospitalToDelete(hospital)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete permanently"
                          >
                            <Trash2 size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {getFilteredHospitals()?.map((hospital) => (
          <div key={hospital.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium text-gray-900">{hospital.name}</h3>
                <p className="text-sm text-gray-500">{hospital.address}</p>
                <p className="text-sm text-gray-500">{hospital.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    hospital.is_active
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {hospital.is_active ? "Active" : "Inactive"}
                </span>
                <button
                  onClick={() =>
                    handleToggleActive(hospital.id, hospital.is_active)
                  }
                  className={`p-1 rounded hover:bg-gray-100 ${
                    hospital.is_active ? "text-green-600" : "text-red-600"
                  }`}
                  title={
                    hospital.is_active
                      ? "Deactivate hospital"
                      : "Activate hospital"
                  }
                >
                  {hospital.is_active ? (
                    <ToggleRight size={18} />
                  ) : (
                    <ToggleLeft size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-500 mb-3">
              <Star
                className="w-4 h-4 text-yellow-400 mr-1"
                fill="currentColor"
              />
              <span>{hospital.rating}</span>
            </div>

            {hospital?.creator && (
              <div className="mt-4 flex items-center gap-2">
                {hospital.creator.avatar && (
                  <img
                    src={hospital.creator.avatar}
                    alt={hospital.creator.full_name}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {hospital.creator.full_name || "N/A"}
                  </div>
                  <div className="text-xs text-gray-500">
                    {hospital.creator.email || "N/A"}
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => handleView(hospital)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
              >
                <Eye size={18} />
              </button>
              {activeTab === "list" ? (
                <>
                  <button
                    onClick={() => handleEdit(hospital)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleToggleDelete(hospital.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                    title="Move to trash"
                  >
                    <Trash2 size={18} />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleToggleDelete(hospital.id)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                    title="Restore"
                  >
                    <RefreshCw size={18} />
                  </button>
                  <button
                    onClick={() => setHospitalToDelete(hospital)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                    title="Delete permanently"
                  >
                    <Trash2 size={18} />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}

      {/* Empty State */}
      {!loading && getFilteredHospitals()?.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          {searchTerm
            ? "No matching results"
            : activeTab === "list"
            ? "No hospital found"
            : "Trash is empty"}
        </div>
      )}

      {/* Modal */}
      {selectedHospital && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
            onClick={handleCloseForm}
          />

          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center z-[110] p-4">
            <div
              className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()} // Ngăn việc click vào modal sẽ đóng nó
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  {modalMode === "view" ? "Hospital details" : "Edit hospital"}
                </h2>
                <button
                  onClick={handleCloseForm}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form content */}
              {modalMode === "edit" && (
                <form onSubmit={handleUpdateHospital} className="space-y-6 p-6">
                  {/* Basic information */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Hospital name
                      </label>
                      <input
                        type="text"
                        value={selectedHospital.name}
                        onChange={(e) =>
                          setSelectedHospital((prev) => ({
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
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        value={selectedHospital.email}
                        onChange={(e) =>
                          setSelectedHospital((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className={`w-full p-2 border rounded-lg ${
                          formErrors.email
                            ? "border-red-500"
                            : "border-gray-300"
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
                      <label className="block text-sm font-medium text-gray-700">
                        Phone number
                      </label>
                      <input
                        type="text"
                        value={selectedHospital.phone}
                        onChange={(e) =>
                          setSelectedHospital((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        className={`w-full p-2 border rounded-lg ${
                          formErrors.phone
                            ? "border-red-500"
                            : "border-gray-300"
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
                      <label className="block text-sm font-medium text-gray-700">
                        Website
                      </label>
                      <input
                        type="text"
                        value={selectedHospital.link_website}
                        onChange={(e) =>
                          setSelectedHospital((prev) => ({
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
                      <label className="block text-sm font-medium text-gray-700">
                        Address
                      </label>
                      <input
                        type="text"
                        value={selectedHospital.address}
                        onChange={(e) =>
                          setSelectedHospital((prev) => ({
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
                      <label className="block text-sm font-medium text-gray-700">
                        Map location
                      </label>
                      <input
                        type="text"
                        value={selectedHospital.map_location}
                        onChange={(e) =>
                          setSelectedHospital((prev) => ({
                            ...prev,
                            map_location: e.target.value,
                          }))
                        }
                        className={`w-full p-2 border rounded-lg ${
                          formErrors.map_location
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {formErrors.map_location && (
                        <p className="mt-1 text-sm text-red-500">
                          {formErrors.map_location}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Working hours <span className="text-red-500">*</span>
                      </label>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Weekdays</p>
                          <div className="flex items-center gap-2">
                            <input
                              type="time"
                              value={operatingHours.weekdays.start}
                              onChange={(e) => handleTimeChange('weekdays', 'start', e.target.value)}
                              className="p-2 border rounded-lg"
                            />
                            <span className="text-gray-500">to</span>
                            <input
                              type="time"
                              value={operatingHours.weekdays.end}
                              onChange={(e) => handleTimeChange('weekdays', 'end', e.target.value)}
                              className="p-2 border rounded-lg"
                            />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Weekends</p>
                          <div className="flex items-center gap-2">
                            <input
                              type="time"
                              value={operatingHours.weekends.start}
                              onChange={(e) => handleTimeChange('weekends', 'start', e.target.value)}
                              className="p-2 border rounded-lg"
                            />
                            <span className="text-gray-500">to</span>
                            <input
                              type="time"
                              value={operatingHours.weekends.end}
                              onChange={(e) => handleTimeChange('weekends', 'end', e.target.value)}
                              className="p-2 border rounded-lg"
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Department
                      </label>
                      <input
                        type="text"
                        value={selectedHospital.department}
                        onChange={(e) =>
                          setSelectedHospital((prev) => ({
                            ...prev,
                            department: e.target.value,
                          }))
                        }
                        className={`w-full p-2 border rounded-lg ${
                          formErrors.department
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        required
                      />
                      {formErrors.department && (
                        <p className="mt-1 text-sm text-red-500">
                          {formErrors.department}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Textarea fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Specialties <span className="text-red-500">*</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {HOSPITAL_SERVICES.filter(service => service !== "All Hospitals").map((service) => (
                          <button
                            key={service}
                            type="button"
                            onClick={() => handleServiceSelection(service)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                              selectedHospital.specialties?.includes(service)
                                ? "bg-blue-100 text-blue-700 border-2 border-blue-200"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent"
                            }`}
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        value={selectedHospital.description}
                        onChange={(e) =>
                          setSelectedHospital((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        rows={4}
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Staff description
                      </label>
                      <textarea
                        value={selectedHospital.staff_description}
                        onChange={(e) =>
                          setSelectedHospital((prev) => ({
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
                        required
                      />
                      {formErrors.staff_description && (
                        <p className="mt-1 text-sm text-red-500">
                          {formErrors.staff_description}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Staff credentials
                      </label>
                      <textarea
                        value={selectedHospital.staff_credentials}
                        onChange={(e) =>
                          setSelectedHospital((prev) => ({
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
                        required
                      />
                      {formErrors.staff_credentials && (
                        <p className="mt-1 text-sm text-red-500">
                          {formErrors.staff_credentials}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Image upload section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Images
                    </label>
                    <div className="mt-2 grid grid-cols-3 gap-4">
                      {selectedHospital.images
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
                              onClick={() => handleDeleteImage(image.id)}
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

                      {selectedHospital.images.length -
                        imageIdsToDelete.length +
                        selectedImages.length <
                        5 && (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="h-24 w-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400"
                        >
                          <Plus size={24} className="text-gray-400" />
                        </button>
                      )}
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      multiple
                      accept="image/*"
                      className="hidden"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleCloseForm}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 min-w-[100px]"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Saving...</span>
                        </>
                      ) : (
                        "Save changes"
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* View mode content */}
              {modalMode === "view" && (
                <div className="p-6 space-y-6">
                  {/* Basic information */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Hospital name
                      </h3>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedHospital.name}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Email
                      </h3>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedHospital.email}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Phone number
                      </h3>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedHospital.phone}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Website
                      </h3>
                      <a
                        href={selectedHospital.link_website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 text-sm text-blue-600 hover:underline"
                      >
                        {selectedHospital.link_website}
                      </a>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Address
                      </h3>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedHospital.address}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Working hours
                      </h3>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedHospital.operating_hours}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Department
                      </h3>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedHospital.department}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Specialties
                      </h3>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedHospital.specialties}
                      </p>
                    </div>
                  </div>

                  {/* Additional information */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Description
                    </h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedHospital.description}
                    </p>
                  </div>

                  {/* Staff information */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Staff information
                    </h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedHospital.staff_description}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Staff credentials
                    </h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedHospital.staff_credentials}
                    </p>
                  </div>

                  {/* Images */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                      Images
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      {selectedHospital.images?.map((image) => (
                        <div key={image.id} className="relative">
                          <img
                            src={image.url}
                            alt="Hospital"
                            className="h-24 w-full object-cover rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Trạng thái */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500">
                      Status:
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        selectedHospital.is_active
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {selectedHospital.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={handleCloseForm}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => setModalMode("edit")}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Create Modal */}
      {modalMode === "create" && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
            onClick={() => setModalMode("")}
          />
          <div className="fixed inset-0 flex items-center justify-center z-[110] p-4">
            <div
              className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Add new hospital</h2>
                <button
                  onClick={() => setModalMode("")}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateHospital} className="space-y-6 p-6">
                {/* Required Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Hospital name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newHospital.name}
                      onChange={(e) =>
                        setNewHospital((prev) => ({
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
                    <label className="block text-sm font-medium text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={newHospital.email}
                      onChange={(e) =>
                        setNewHospital((prev) => ({
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
                    <label className="block text-sm font-medium text-gray-700">
                      Phone number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newHospital.phone}
                      onChange={(e) =>
                        setNewHospital((prev) => ({
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
                    <label className="block text-sm font-medium text-gray-700">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newHospital.address}
                      onChange={(e) =>
                        setNewHospital((prev) => ({
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
                </div>

                {/* Optional Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Website
                    </label>
                    <input
                      type="text"
                      value={newHospital.link_website}
                      onChange={(e) =>
                        setNewHospital((prev) => ({
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
                    <label className="block text-sm font-medium text-gray-700">
                      Map location
                    </label>
                    <input
                      type="text"
                      value={newHospital.map_location}
                      onChange={(e) =>
                        setNewHospital((prev) => ({
                          ...prev,
                          map_location: e.target.value,
                        }))
                      }
                      className={`w-full p-2 border rounded-lg ${
                        formErrors.map_location
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {formErrors.map_location && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.map_location}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Working hours <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Weekdays</p>
                        <div className="flex items-center gap-2">
                          <input
                            type="time"
                            value={operatingHours.weekdays.start}
                            onChange={(e) => handleTimeChange('weekdays', 'start', e.target.value, true)}
                            className="p-2 border rounded-lg"
                          />
                          <span className="text-gray-500">to</span>
                          <input
                            type="time"
                            value={operatingHours.weekdays.end}
                            onChange={(e) => handleTimeChange('weekdays', 'end', e.target.value, true)}
                            className="p-2 border rounded-lg"
                          />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Weekends</p>
                        <div className="flex items-center gap-2">
                          <input
                            type="time"
                            value={operatingHours.weekends.start}
                            onChange={(e) => handleTimeChange('weekends', 'start', e.target.value, true)}
                            className="p-2 border rounded-lg"
                          />
                          <span className="text-gray-500">to</span>
                          <input
                            type="time"
                            value={operatingHours.weekends.end}
                            onChange={(e) => handleTimeChange('weekends', 'end', e.target.value, true)}
                            className="p-2 border rounded-lg"
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Department
                    </label>
                    <input
                      type="text"
                      value={newHospital.department}
                      onChange={(e) =>
                        setNewHospital((prev) => ({
                          ...prev,
                          department: e.target.value,
                        }))
                      }
                      className={`w-full p-2 border rounded-lg ${
                        formErrors.department
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {formErrors.department && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.department}
                      </p>
                    )}
                  </div>
                </div>

                {/* Textarea Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Specialties <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {HOSPITAL_SERVICES.filter(service => service !== "All Hospitals").map((service) => (
                        <button
                          key={service}
                          type="button"
                          onClick={() => handleServiceSelection(service, true)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            newHospital.specialties?.includes(service)
                              ? "bg-blue-100 text-blue-700 border-2 border-blue-200"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent"
                          }`}
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      value={newHospital.description}
                      onChange={(e) =>
                        setNewHospital((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      rows={4}
                      className={`w-full p-2 border rounded-lg ${
                        formErrors.description
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {formErrors.description && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.description}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Staff description
                    </label>
                    <textarea
                      value={newHospital.staff_description}
                      onChange={(e) =>
                        setNewHospital((prev) => ({
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
                    <label className="block text-sm font-medium text-gray-700">
                      Staff credentials
                    </label>
                    <textarea
                      value={newHospital.staff_credentials}
                      onChange={(e) =>
                        setNewHospital((prev) => ({
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

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Images
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {newImages.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt="Preview"
                          className="h-24 w-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveNewImage(index)}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}

                    {newImages.length < 5 && (
                      <label className="h-24 w-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 cursor-pointer">
                        <Plus size={24} className="text-gray-400" />
                        <input
                          type="file"
                          onChange={handleNewImageChange}
                          multiple
                          accept="image/*"
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    disabled={isCreating}
                    onClick={() => setModalMode("")}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isCreating}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 min-w-[100px]"
                  >
                    {isCreating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Creating...</span>
                      </>
                    ) : (
                      "Create"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Pagination */}
      {getFilteredHospitals()?.length > 0 && (
        <div className="flex items-center justify-between py-3">
          <div className="text-sm text-gray-500">
            Showing{" "}
            {activeTab === "list" ? pagination.page : deletedPagination.page} of{" "}
            {activeTab === "list"
              ? pagination.totalPages
              : deletedPagination.totalPages}{" "}
            pages
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                const action =
                  activeTab === "list" ? fetchHospitals : fetchDeletedHospitals;
                const currentPage =
                  activeTab === "list"
                    ? pagination.page
                    : deletedPagination.page;
                dispatch(action({ page: currentPage - 1, limit: 10 }));
              }}
              disabled={
                activeTab === "list"
                  ? pagination.page === 1 || hospitals.length === 0
                  : deletedPagination.page === 1 ||
                    deletedHospitals.length === 0
              }
              className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => {
                const action =
                  activeTab === "list" ? fetchHospitals : fetchDeletedHospitals;
                const currentPage =
                  activeTab === "list"
                    ? pagination.page
                    : deletedPagination.page;
                const totalPages =
                  activeTab === "list"
                    ? pagination.totalPages
                    : deletedPagination.totalPages;
                dispatch(action({ page: currentPage + 1, limit: 10 }));
              }}
              disabled={
                activeTab === "list"
                  ? pagination.page === pagination.totalPages ||
                    hospitals.length === 0
                  : deletedPagination.page === deletedPagination.totalPages ||
                    deletedHospitals.length === 0
              }
              className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {hospitalToDelete && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
            onClick={() => setHospitalToDelete(null)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-[110] p-4">
            <div
              className="bg-white rounded-lg w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-center text-gray-900">
                  Delete hospital permanently
                </h3>
                <p className="text-sm text-center text-gray-500">
                  Are you sure you want to delete the hospital "
                  {hospitalToDelete.name}"? This action cannot be undone.
                </p>
                <div className="flex justify-center gap-3 mt-6">
                  <button
                    type="button"
                    disabled={isDeleting}
                    onClick={() => setHospitalToDelete(null)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={isDeleting}
                    onClick={handleDeletePermanently}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 min-w-[100px]"
                  >
                    {isDeleting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Deleting...</span>
                      </>
                    ) : (
                      "Delete permanently"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default HospitalsManagement;
