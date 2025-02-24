import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { Edit, Plus, X, Trash2 } from "lucide-react";
import {
  fetchContactInfoHistory,
  fetchCurrentContactInfo,
  createContactInfo,
  updateContactInfo,
  deleteContactInfo,
} from "../../../redux/slices/adminSlice";
import { useToast } from "../../../context/ToastContext";

function ContactInfoManagement() {
  const dispatch = useDispatch();
  const { addToast } = useToast();
  const {
    contactInfoList,
    currentContactInfo,
    contactInfoPagination,
    isLoadingContactInfo,
    isSubmittingContactInfo,
  } = useSelector((state) => state.admin);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingInfo, setEditingInfo] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    address: "",
    support_hours: "",
    support_description: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isDeletingId, setIsDeletingId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    dispatch(fetchContactInfoHistory());
    dispatch(fetchCurrentContactInfo());
  }, [dispatch]);

  const validateForm = (data) => {
    const errors = {};

    // Email validation
    if (!data.email?.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "Email is not valid";
    }

    // Phone validation
    if (!data.phone?.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^[0-9]{10,11}$/.test(data.phone)) {
      errors.phone = "Phone number must be 10-11 digits";
    }

    // Address validation
    if (!data.address?.trim()) {
      errors.address = "Address is required";
    } else if (data.address.length <= 5) {
      errors.address = "Address cannot be less than 5 characters";
    } else if (data.address.length > 255) {
      errors.address = "Address cannot be more than 255 characters";
    }

    // Support hours validation
    if (!data.support_hours?.trim()) {
      errors.support_hours = "Support hours is required";
    } else if (data.support_hours.length <= 5) {
      errors.support_hours = "Support hours cannot be less than 5 characters";
    } else if (data.support_hours.length > 100) {
      errors.support_hours = "Support hours cannot be more than 100 characters";
    }

    // Support description validation
    if (!data.support_description?.trim()) {
      errors.support_description = "Description is required";
    } else if (data.support_description.length <= 5) {
      errors.support_description =
        "Description cannot be less than 5 characters";
    } else if (data.support_description.length > 100) {
      errors.support_description =
        "Description cannot be more than 100 characters";
    }

    return errors;
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!validateForm(formData)) {
      return;
    }

    try {
      await dispatch(createContactInfo(formData)).unwrap();
      addToast({
        type: "success",
        message: "Add contact information successfully!",
      });
      setIsCreating(false);
      setFormData({
        email: "",
        phone: "",
        address: "",
        support_hours: "",
        support_description: "",
      });
    } catch (error) {
      addToast({
        type: "error",
        message:
          error.message || "An error occurred while adding contact information",
      });
    }
  };

  const handleEditClick = (info) => {
    setEditingInfo(info);
    setFormData({
      email: info.email,
      phone: info.phone,
      address: info.address,
      support_hours: info.support_hours,
      support_description: info.support_description,
    });
    setFormErrors({});
    setIsEditing(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await dispatch(
        updateContactInfo({
          id: editingInfo.id,
          data: formData,
        })
      ).unwrap();

      addToast({
        type: "success",
        message: "Update contact information successfully!",
      });
      setIsEditing(false);
      setEditingInfo(null);
      dispatch(fetchContactInfoHistory());
      dispatch(fetchCurrentContactInfo());
    } catch (error) {
      addToast({
        type: "error",
        message:
          error.message ||
          "An error occurred while updating contact information",
      });
    }
  };

  const handleDeleteClick = (info) => {
    if (contactInfoList.length <= 1) {
      addToast({
        type: "error",
        message: "Cannot delete the only contact information",
      });
      return;
    }

    if (currentContactInfo?.id === info.id) {
      addToast({
        type: "error",
        message: "Cannot delete the active contact information",
      });
      return;
    }

    setIsDeletingId(info.id);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteContactInfo(isDeletingId)).unwrap();
      addToast({
        type: "success",
        message: "Delete contact information successfully!",
      });
      setShowDeleteConfirm(false);
      setIsDeletingId(null);
    } catch (error) {
      addToast({
        type: "error",
        message:
          error.message ||
          "An error occurred while deleting contact information",
      });
    }
  };

  if (isLoadingContactInfo) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 mt-12 md:mt-0">
      <div className="flex justify-end mb-6">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-[#98E9E9] text-gray-700 rounded-lg hover:bg-[#7CD5D5] w-full sm:w-auto justify-center"
          onClick={() => setIsCreating(true)}
        >
          <Plus size={20} />
          Add new contact information
        </button>
      </div>

      <div className="space-y-4">
        {contactInfoList?.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No contact information. Please add new!
          </div>
        ) : (
          contactInfoList?.map((info) => (
            <div
              key={info.id}
              className={`bg-white p-4 rounded-lg shadow-sm ${
                currentContactInfo?.id === info.id
                  ? "border-2 border-[#98E9E9]"
                  : ""
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2 min-w-0">
                  {currentContactInfo?.id === info.id && (
                    <span className="inline-block px-2 py-1 text-xs font-medium text-teal-700 bg-teal-50 rounded-full mb-2">
                      Active
                    </span>
                  )}
                  <h3 className="font-medium break-all">Email: {info.email}</h3>
                  <p className="text-gray-600 break-all">
                    Phone number: {info.phone}
                  </p>
                  <p className="text-gray-600 break-words">
                    Address: {info.address}
                  </p>
                  <p className="text-gray-600 break-words">
                    Support hours: {info.support_hours}
                  </p>
                  <p className="text-gray-600 break-words">
                    Description: {info.support_description}
                  </p>
                  <p className="text-sm text-gray-500">
                    Last updated:{" "}
                    {format(new Date(info.updated_at), "dd/MM/yyyy HH:mm")} by{" "}
                    {info.last_updated_by_name}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0 justify-end sm:flex-col">
                  <button
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                    title="Edit"
                    onClick={() => handleEditClick(info)}
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    className={`p-2 rounded-full ${
                      currentContactInfo?.id === info.id ||
                      contactInfoList.length <= 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-red-600 hover:bg-red-50"
                    }`}
                    title={
                      currentContactInfo?.id === info.id
                        ? "Cannot delete the active contact information"
                        : contactInfoList.length <= 1
                        ? "Cannot delete the only contact information"
                        : "Delete"
                    }
                    onClick={() => handleDeleteClick(info)}
                    disabled={
                      currentContactInfo?.id === info.id ||
                      contactInfoList.length <= 1
                    }
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="text-center text-gray-500 mt-4">
        Display {contactInfoList?.length} on total {contactInfoPagination.total}{" "}
        contact information
      </div>

      {/* Modal tạo mới */}
      {isCreating && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
            onClick={() => setIsCreating(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-[110] p-4">
            <div
              className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center px-6 py-4 border-b">
                <h2 className="text-xl font-semibold">
                  Add new contact information
                </h2>
                <button
                  onClick={() => setIsCreating(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreate} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    className={`w-full p-2 border rounded-lg ${
                      formErrors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value,
                      })
                    }
                    className={`w-full p-2 border rounded-lg ${
                      formErrors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {formErrors.phone && (
                    <p className="mt-1 text-sm text-red-500">
                      {formErrors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        address: e.target.value,
                      })
                    }
                    className={`w-full p-2 border rounded-lg ${
                      formErrors.address ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {formErrors.address && (
                    <p className="mt-1 text-sm text-red-500">
                      {formErrors.address}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Support hours
                  </label>
                  <input
                    type="text"
                    value={formData.support_hours}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        support_hours: e.target.value,
                      })
                    }
                    className={`w-full p-2 border rounded-lg ${
                      formErrors.support_hours
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {formErrors.support_hours && (
                    <p className="mt-1 text-sm text-red-500">
                      {formErrors.support_hours}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.support_description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        support_description: e.target.value,
                      })
                    }
                    rows={4}
                    className={`w-full p-2 border rounded-lg ${
                      formErrors.support_description
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {formErrors.support_description && (
                    <p className="mt-1 text-sm text-red-500">
                      {formErrors.support_description}
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    disabled={isSubmittingContactInfo}
                  >
                    {isSubmittingContactInfo ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Modal chỉnh sửa */}
      {isEditing && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
            onClick={() => setIsEditing(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-[110] p-4">
            <div
              className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center px-6 py-4 border-b">
                <h2 className="text-xl font-semibold">
                  Edit contact information
                </h2>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleUpdate} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    className={`w-full p-2 border rounded-lg ${
                      formErrors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value,
                      })
                    }
                    className={`w-full p-2 border rounded-lg ${
                      formErrors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {formErrors.phone && (
                    <p className="mt-1 text-sm text-red-500">
                      {formErrors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        address: e.target.value,
                      })
                    }
                    className={`w-full p-2 border rounded-lg ${
                      formErrors.address ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {formErrors.address && (
                    <p className="mt-1 text-sm text-red-500">
                      {formErrors.address}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Support hours
                  </label>
                  <input
                    type="text"
                    value={formData.support_hours}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        support_hours: e.target.value,
                      })
                    }
                    className={`w-full p-2 border rounded-lg ${
                      formErrors.support_hours
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {formErrors.support_hours && (
                    <p className="mt-1 text-sm text-red-500">
                      {formErrors.support_hours}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.support_description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        support_description: e.target.value,
                      })
                    }
                    rows={4}
                    className={`w-full p-2 border rounded-lg ${
                      formErrors.support_description
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {formErrors.support_description && (
                    <p className="mt-1 text-sm text-red-500">
                      {formErrors.support_description}
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    disabled={isSubmittingContactInfo}
                  >
                    {isSubmittingContactInfo ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Modal xác nhận xóa */}
      {showDeleteConfirm && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
            onClick={() => {
              setShowDeleteConfirm(false);
              setIsDeletingId(null);
            }}
          />
          <div className="fixed inset-0 flex items-center justify-center z-[110] p-4">
            <div
              className="bg-white rounded-lg w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Confirm delete
                </h3>
                <p className="text-gray-500">
                  Are you sure you want to delete this contact information? This
                  action cannot be undone.
                </p>
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setIsDeletingId(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                    disabled={isSubmittingContactInfo}
                  >
                    {isSubmittingContactInfo ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Deleting...</span>
                      </>
                    ) : (
                      "Delete"
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

export default ContactInfoManagement;
