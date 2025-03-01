import { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  Eye,
  Edit,
  Trash2,
  Plus,
  Lock,
  Unlock,
  ToggleLeft,
  ToggleRight,
  X,
  RefreshCw,
  Trash,
} from "lucide-react";
import {
  deleteUser,
  updateUserStatus,
  addUser,
  updateUserInfo,
  fetchUsers,
  toggleLockUser,
  toggleActiveUser,
  toggleDeleteUser,
  fetchDeletedUsers,
  createUser,
  deleteUserPermanently,
} from "../../../redux/slices/adminSlice";
import { useToast } from "../../../context/ToastContext";

function UsersManagement() {
  const dispatch = useDispatch();
  const { users, deletedUsers, pagination, deletedPagination, loading, error } =
    useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUser, setNewUser] = useState({
    email: "",
    full_name: "",
    password: "",
    role: "GENERAL_USER",
    avatar: null,
    phone_number: "",
  });
  const [modalMode, setModalMode] = useState("view"); // "view" or "edit"
  const [errors, setErrors] = useState({});
  const { addToast } = useToast();
  const [showUserModal, setShowUserModal] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: "view", // 'view' | 'edit' | 'add'
    user: null,
  });
  const [activeTab, setActiveTab] = useState("active"); // 'active' | 'trash'
  const [lockTab, setLockTab] = useState("active"); // 'active' | 'trash'
  const [showCreateModal, setShowCreateModal] = useState(false);
  const fileInputRef = useRef(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    email: "",
    full_name: "",
    password: "",
    role: "",
    phone_number: "",
    pet_type: "",
    pet_age: "",
    pet_notes: "",
    is_active: true,
    is_locked: false,
    avatar: null,
    pet_photo: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    // Fetch users based on the active tab
    if (activeTab === "active") {
      dispatch(fetchUsers({ page: pagination.page, limit: pagination.limit }));
    } else {
      dispatch(
        fetchDeletedUsers({ page: pagination.page, limit: pagination.limit })
      );
    }
  }, [dispatch, pagination.page, pagination.limit, activeTab]);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId));
    }
  };

  const handleView = (user) => {
    setModalState({
      isOpen: true,
      mode: "view",
      user,
    });
  };

  const handleEdit = (user) => {
    setEditForm({
      ...user,
      password: "",
    });
    // Reset errors
    setErrors({});
    setShowEditModal(true);
  };

  const handleToggleLock = async (userId, currentLockState) => {
    try {
      const message = currentLockState
        ? "Are you sure you want to unlock this user?"
        : "Are you sure you want to lock this user?";

      if (window.confirm(message)) {
        await dispatch(toggleLockUser(userId)).unwrap();
        addToast({
          type: "success",
          message: `${currentLockState ? "Unlock" : "Lock"} user successfully!`,
        });
        // Refresh both lists
        if (lockTab === "active") {
          dispatch(
            fetchUsers({ page: pagination.page, limit: pagination.limit })
          );
        } else {
          dispatch(
            fetchDeletedUsers({
              page: pagination.page,
              limit: pagination.limit,
            })
          );
        }
      }
    } catch (error) {
      const errorMessage =
        error?.message || "An error occurred while performing the operation!";
      addToast({
        type: "error",
        message: errorMessage,
      });
    }
  };

  const handleToggleActive = async (userId, currentActiveState) => {
    try {
      if (!userId) {
        addToast({
          type: "error",
          message: "User ID not found!",
        });
        return;
      }

      const message = currentActiveState
        ? "Are you sure you want to disable this user?"
        : "Are you sure you want to activate this user?";

      if (window.confirm(message)) {
        await dispatch(toggleActiveUser(userId)).unwrap();
        addToast({
          type: "success",
          message: `${
            currentActiveState ? "Disable" : "Activate"
          } user successfully!`,
        });
        // Refresh both lists
        if (activeTab === "active") {
          dispatch(
            fetchUsers({ page: pagination.page, limit: pagination.limit })
          );
        } else {
          dispatch(
            fetchDeletedUsers({
              page: pagination.page,
              limit: pagination.limit,
            })
          );
        }
      }
    } catch (error) {
      const errorMessage =
        error?.message || "An error occurred while performing the operation!";
      addToast({
        type: "error",
        message: errorMessage,
      });
    }
  };

  const handleToggleDelete = async (userId, isDeleted) => {
    try {
      const message = isDeleted
        ? "Are you sure you want to restore this user?"
        : "Are you sure you want to delete this user?";

      if (window.confirm(message)) {
        await dispatch(toggleDeleteUser(userId)).unwrap();
        addToast({
          type: "success",
          message: `${isDeleted ? "Restore" : "Delete"} user successfully!`,
        });
        // Refresh both lists
        if (activeTab === "active") {
          dispatch(
            fetchUsers({ page: pagination.page, limit: pagination.limit })
          );
        } else {
          dispatch(
            fetchDeletedUsers({
              page: pagination.page,
              limit: pagination.limit,
            })
          );
        }
      }
    } catch (error) {
      const errorMessage =
        error?.message || "An error occurred while performing the operation!";
      addToast({
        type: "error",
        message: errorMessage,
      });
    }
  };

  const handleShowDeleteConfirm = (user) => {
    setUserToDelete(user);
    setShowDeleteConfirmModal(true);
  };

  const handlePermanentDelete = async () => {
    try {
      await dispatch(deleteUserPermanently(userToDelete.id)).unwrap();
      
      addToast({
        type: "success",
        message: "Delete user successfully!"
      });
      
      setShowDeleteConfirmModal(false);
      setUserToDelete(null);
    } catch (error) {
      addToast({
        type: "error",
        message: error.message || "An error occurred while deleting the user"
      });
    }
  };

  // Filter users based on searchTerm
  const filteredUsers = useMemo(() => {
    const currentUsers = activeTab === "active" ? users : deletedUsers;
    if (!searchTerm.trim()) return currentUsers;

    const searchValue = searchTerm.toLowerCase().trim();
    return currentUsers.filter(
      (user) =>
        (user.full_name?.toLowerCase() || "").includes(searchValue) ||
        (user.email?.toLowerCase() || "").includes(searchValue) ||
        (user.phone_number || "").includes(searchValue)
    );
  }, [users, deletedUsers, searchTerm, activeTab]);

  const handleAddUser = () => {
    setErrors({
      full_name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    let hasError = false;

    if (!newUser.name.trim()) {
      setErrors((prev) => ({ ...prev, name: "Name is required" }));
      hasError = true;
    }

    if (!newUser.email.trim()) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      hasError = true;
    } else if (!isValidEmail(newUser.email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
      hasError = true;
    }

    if (!newUser.password) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      hasError = true;
    } else if (newUser.password.length < 6) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters",
      }));
      hasError = true;
    }

    if (!newUser.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Please confirm your password",
      }));
      hasError = true;
    } else if (newUser.password !== newUser.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
      hasError = true;
    }

    if (newUser.phone_number && !/^[0-9]{10}$/.test(newUser.phone_number)) {
      setErrors((prev) => ({
        ...prev,
        phone_number: "Invalid phone number (10 digits)",
      }));
      hasError = true;
    }

    if (hasError) return;

    dispatch(
      addUser({
        ...newUser,
        id: Date.now(),
        status: "active",
        joinDate: new Date().toISOString().split("T")[0],
      })
    );

    setIsAddingUser(false);
    setNewUser({
      name: "",
      email: "",
      role: "Pet Owner",
      password: "",
      confirmPassword: "",
      phone_number: "",
    });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(editForm, true);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Display the first error message
      const firstError = Object.values(validationErrors)[0];
      addToast({
        type: "error",
        message: firstError,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(
        updateUserInfo({
          userId: editForm.id,
          userData: editForm,
        })
      ).unwrap();

      addToast({
        type: "success",
        message: "Update user successfully!",
      });
      setShowEditModal(false);
    } catch (error) {
      addToast({
        type: "error",
        message: error.message || "An error occurred while updating the user",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        // 10MB
        addToast({
          type: "error",
          message: "File size must not exceed 10MB",
        });
        return;
      }
      setEditForm((prev) => ({ ...prev, [field]: file }));
    }
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      mode: "view",
      user: null,
    });
  };

  const validateForm = (formData, isEdit = false) => {
    const errors = {};

    // Validate email
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email address";
    }

    // Validate họ tên
    if (!formData.full_name) {
      errors.full_name = "Full name is required";
    } else if (formData.full_name.length < 2) {
      errors.full_name = "Full name must be at least 2 characters";
    } else if (formData.full_name.length > 50) {
      errors.full_name = "Full name must not exceed 50 characters";
    }

    // Validate password (only required when creating a new user)
    if (!isEdit && !formData.password) {
      errors.password = "Password is required";
    } else if (formData.password && formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    } else if (formData.password && formData.password.length > 50) {
      errors.password = "Password must not exceed 50 characters";
    } else if (
      formData.password &&
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)
    ) {
      errors.password =
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number";
    }

    // Validate số điện thoại
    if (formData.phone_number) {
      if (!/^[0-9]{10}$/.test(formData.phone_number)) {
        errors.phone_number = "Phone number must be 10 digits";
      } else if (!/^(0[3|5|7|8|9])/.test(formData.phone_number)) {
        errors.phone_number = "Invalid phone number";
      }
    }

    // Validate role
    if (!formData.role) {
      errors.role = "Role is required";
    }

    // Validate file ảnh
    if (formData.avatar instanceof File) {
      if (formData.avatar.size > 10 * 1024 * 1024) {
        errors.avatar = "Image size must not exceed 10MB";
      }
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(formData.avatar.type)) {
        errors.avatar = "Only JPG, PNG, and GIF images are supported";
      }
    }

    // Validate thông tin thú cưng (nếu có)
    if (formData.pet_age && isNaN(formData.pet_age)) {
      errors.pet_age = "Pet age must be a number";
    }

    if (
      formData.pet_type &&
      !["DOG", "CAT", "OTHER"].includes(formData.pet_type)
    ) {
      errors.pet_type = "Invalid pet type";
    }

    if (formData.pet_notes && formData.pet_notes.length > 500) {
      errors.pet_notes = "Notes must not exceed 500 characters";
    }

    if (formData.pet_photo instanceof File) {
      if (formData.pet_photo.size > 10 * 1024 * 1024) {
        errors.pet_photo = "Image size must not exceed 10MB";
      }
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(formData.pet_photo.type)) {
        errors.pet_photo = "Only JPG, PNG, and GIF images are supported";
      }
    }

    return errors;
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(newUser);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Hiển thị thông báo lỗi đầu tiên
      const firstError = Object.values(validationErrors)[0];
      addToast({
        type: "error",
        message: firstError,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(createUser(newUser)).unwrap();
      addToast({
        type: "success",
        message: "Create user successfully!",
      });
      setShowCreateModal(false);
      setNewUser({
        email: "",
        full_name: "",
        password: "",
        role: "GENERAL_USER",
        avatar: null,
        phone_number: "",
      });
      dispatch(fetchUsers({ page: pagination.page, limit: pagination.limit }));
    } catch (error) {
      addToast({
        type: "error",
        message: error.message || "An error occurred while creating the user",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render data dựa theo tab
  const displayedUsers = activeTab === "active" ? users : deletedUsers;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        Error loading users:{" "}
        {error?.message || "An error occurred while loading data"}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      {/* Tabs */}
      <div className="flex space-x-4 mb-4 mt-12 md:mt-0">
        <button
          onClick={() => setActiveTab("active")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "active"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          User List
        </button>
        <button
          onClick={() => setActiveTab("trash")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "trash"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Trash
        </button>
      </div>

      {/* Search and Add User Row */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-6">
        {/* Search Bar */}
        <div className="w-full sm:w-96">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        {/* Add User Button */}
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 whitespace-nowrap"
        >
          <Plus size={18} className="mr-2" />
          Add User
        </button>
      </div>

      {/* Table/Card Container */}
      <div className="bg-white rounded-lg">
        {/* Desktop Table View */}
        <div className="hidden md:block">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Role
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Lock Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 flex-shrink-0">
                        {user.avatar ? (
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={user.avatar}
                            alt={`${user.full_name}'s avatar`}
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center">
                            <span className="text-white font-medium">
                              {user.full_name?.charAt(0)?.toUpperCase() || "?"}
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {user.full_name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        user.role === "ADMIN"
                          ? "bg-purple-100 text-purple-800"
                          : user.role === "HOSPITAL_ADMIN"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          user.is_active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.is_active ? "Active" : "Inactive"}
                      </span>
                      <button
                        onClick={() =>
                          handleToggleActive(user.id, user.is_active)
                        }
                        className={`p-1 rounded-full hover:bg-gray-100 ${
                          user.is_active ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {user.is_active ? (
                          <ToggleRight size={18} />
                        ) : (
                          <ToggleLeft size={18} />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          user.is_locked
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.is_locked ? "Locked" : "Unlocked"}
                      </span>
                      <button
                        onClick={() =>
                          handleToggleLock(user.id, user.is_locked)
                        }
                        className={`p-1 rounded-full hover:bg-gray-100 ${
                          user.is_locked ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {user.is_locked ? (
                          <Unlock size={18} />
                        ) : (
                          <Lock size={18} />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => handleView(user)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleToggleDelete(user.id, user.is_deleted)}
                        className={
                          user.is_deleted
                            ? "text-green-600 hover:text-green-900"
                            : "text-red-600 hover:text-red-900"
                        }
                      >
                        {user.is_deleted ? (
                          <RefreshCw size={18} />
                        ) : (
                          <Trash2 size={18} />
                        )}
                      </button>
                      {user.is_deleted && (
                        <button
                          onClick={() => handleShowDeleteConfirm(user)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden">
          <div className="flex justify-between items-center p-3 border-b">
            <div className="text-sm font-medium text-gray-500">NAME</div>
            <div className="text-sm font-medium text-gray-500">STATUS</div>
          </div>
          <div className="divide-y divide-gray-100">
            {filteredUsers.map((user) => (
              <div key={user.id} className="p-3">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 flex-shrink-0">
                    {user.avatar ? (
                      <img
                        className="h-full w-full rounded-full object-cover"
                        src={user.avatar}
                        alt={`${user.full_name}'s avatar`}
                      />
                    ) : (
                      <div className="h-full w-full rounded-full bg-purple-600 flex items-center justify-center">
                        <span className="text-white font-medium">
                          {user.full_name?.charAt(0)?.toUpperCase() || "?"}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {user.full_name}
                    </div>
                    <div className="text-sm text-gray-500 truncate">
                      {user.email}
                    </div>
                    <div className="mt-1">
                      <span
                        className={`inline-block px-2 py-0.5 text-xs rounded-full ${
                          user.role === "ADMIN"
                            ? "bg-purple-100 text-purple-800"
                            : user.role === "HOSPITAL_ADMIN"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {user.role === "HOSPITAL_ADMIN"
                          ? "HOSPITAL_ADMIN"
                          : user.role}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">Status:</div>
                    <div className="flex items-center gap-1">
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          user.is_active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.is_active ? "Active" : "Inactive"}
                      </span>
                      <button
                        onClick={() =>
                          handleToggleActive(user.id, user.is_active)
                        }
                        className={`p-1 rounded-full hover:bg-gray-100 ${
                          user.is_active ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {user.is_active ? (
                          <ToggleRight size={18} />
                        ) : (
                          <ToggleLeft size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">Lock Status:</div>
                    <div className="flex items-center gap-1">
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          user.is_locked
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.is_locked ? "Locked" : "Unlocked"}
                      </span>
                      <button
                        onClick={() =>
                          handleToggleLock(user.id, user.is_locked)
                        }
                        className={`p-1 rounded-full hover:bg-gray-100 ${
                          user.is_locked ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {user.is_locked ? (
                          <Unlock size={18} />
                        ) : (
                          <Lock size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      onClick={() => handleView(user)}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                    >
                      <Eye size={16} />
                      <span className="text-sm">View</span>
                    </button>
                    <button
                      onClick={() => handleEdit(user)}
                      className="flex items-center gap-1 text-green-600 hover:text-green-800"
                    >
                      <Edit size={16} />
                      <span className="text-sm">Edit</span>
                    </button>
                    <button
                      onClick={() =>
                        handleToggleDelete(user.id, user.is_deleted)
                      }
                      className={`flex items-center gap-1 ${
                        user.is_deleted
                          ? "text-green-600 hover:text-green-800"
                          : "text-red-600 hover:text-red-800"
                      }`}
                    >
                      {user.is_deleted ? (
                        <>
                          <RefreshCw size={16} />
                          <span className="text-sm">Restore</span>
                        </>
                      ) : (
                        <>
                          <Trash2 size={16} />
                          <span className="text-sm">Delete</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination - Responsive */}
      {(activeTab === "active" ? users : deletedUsers)?.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-3">
          <div className="text-sm text-gray-500 order-2 sm:order-1">
            Showing{" "}
            {activeTab === "active" ? pagination.page : deletedPagination.page}{" "}
            of{" "}
            {activeTab === "active"
              ? pagination.totalPages
              : deletedPagination.totalPages}{" "}
            pages
          </div>
          <div className="flex gap-2 order-1 sm:order-2">
            <button
              onClick={() => {
                const action =
                  activeTab === "active" ? fetchUsers : fetchDeletedUsers;
                const currentPage =
                  activeTab === "active"
                    ? pagination.page
                    : deletedPagination.page;
                dispatch(action({ page: currentPage - 1, limit: 10 }));
              }}
              disabled={
                activeTab === "active"
                  ? pagination.page === 1 || users.length === 0
                  : deletedPagination.page === 1 || deletedUsers.length === 0
              }
              className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed min-w-[80px]"
            >
              Previous
            </button>
            <button
              onClick={() => {
                const action =
                  activeTab === "active" ? fetchUsers : fetchDeletedUsers;
                const currentPage =
                  activeTab === "active"
                    ? pagination.page
                    : deletedPagination.page;
                const totalPages =
                  activeTab === "active"
                    ? pagination.totalPages
                    : deletedPagination.totalPages;
                dispatch(action({ page: currentPage + 1, limit: 10 }));
              }}
              disabled={
                activeTab === "active"
                  ? pagination.page === pagination.totalPages ||
                    users.length === 0
                  : deletedPagination.page === deletedPagination.totalPages ||
                    deletedUsers.length === 0
              }
              className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed min-w-[80px]"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading &&
        (activeTab === "active" ? users : deletedUsers)?.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {activeTab === "active" ? "No users found" : "Trash is empty"}
          </div>
        )}

      {/* User Detail Modal */}
      {modalState.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            {/* Modal Header - Fixed */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                User Information
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Content sections */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-4">
                  Basic Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ID
                    </label>
                    <input
                      type="text"
                      value={modalState.user.id}
                      readOnly
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={modalState.user.full_name}
                      readOnly={modalState.mode === "view"}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={modalState.user.email}
                      readOnly={modalState.mode === "view"}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={modalState.user.phone_number || "Chưa cập nhật"}
                      readOnly={modalState.mode === "view"}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <input
                      type="text"
                      value={modalState.user.role}
                      readOnly={modalState.mode === "view"}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hospital ID
                    </label>
                    <input
                      type="text"
                      value={modalState.user.hospital_id || "Chưa có"}
                      readOnly
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-4">
                  Account Status
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Active Status
                    </label>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          modalState.user.is_active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {modalState.user.is_active
                          ? "Đang hoạt động"
                          : "Đã vô hiệu hóa"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Lock Status
                    </label>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          modalState.user.is_locked
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {modalState.user.is_locked ? "Locked" : "Unlocked"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Deleted
                    </label>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          modalState.user.is_deleted
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {modalState.user.is_deleted ? "Deleted" : "Not Deleted"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Version
                    </label>
                    <input
                      type="text"
                      value={modalState.user.version}
                      readOnly
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-4">
                  Authentication Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Google ID
                    </label>
                    <input
                      type="text"
                      value={modalState.user.google_id || "Không có"}
                      readOnly
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Avatar
                    </label>
                    {modalState.user.avatar ? (
                      <img
                        src={modalState.user.avatar}
                        alt="Avatar"
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500">No avatar</span>
                    )}
                  </div>
                </div>
              </div>

              {(modalState.user.pet_type ||
                modalState.user.pet_age ||
                modalState.user.pet_photo ||
                modalState.user.pet_notes) && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-4">
                    Pet Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pet Type
                      </label>
                      <input
                        type="text"
                        value={modalState.user.pet_type || "Not updated"}
                        readOnly
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pet Age
                      </label>
                      <input
                        type="text"
                        value={
                          modalState.user.pet_age
                            ? `${modalState.user.pet_age} years old`
                            : "Not updated"
                        }
                        readOnly
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Notes
                      </label>
                      <input
                        type="text"
                        value={modalState.user.pet_notes || "No notes"}
                        readOnly
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                      />
                    </div>

                    {modalState.user.pet_photo && (
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Pet Image
                        </label>
                        <img
                          src={modalState.user.pet_photo}
                          alt="Pet"
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-4">Time</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Created Date
                    </label>
                    <input
                      type="text"
                      value={new Date(
                        modalState.user.created_at
                      ).toLocaleString()}
                      readOnly
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Updated
                    </label>
                    <input
                      type="text"
                      value={new Date(
                        modalState.user.updated_at
                      ).toLocaleString()}
                      readOnly
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer - Fixed */}
            <div className="flex items-center justify-end gap-3 p-4 border-t bg-gray-50">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Close
              </button>
              {modalState.mode !== "view" && (
                <button
                  onClick={() => {
                    modalState.mode === "edit"
                      ? handleUpdateUser(modalState.user)
                      : handleAddUser();
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  {modalState.mode === "edit" ? "Save changes" : "Add user"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Add new user</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={newUser.full_name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, full_name: e.target.value })
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                    errors.full_name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.full_name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.full_name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={newUser.phone_number}
                  onChange={(e) =>
                    setNewUser({ ...newUser, phone_number: e.target.value })
                  }
                  placeholder="Enter phone number"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                    errors.phone_number ? "border-red-500" : "border-gray-300"
                  }`}
                  required
                />
                {errors.phone_number && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.phone_number}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                    errors.role ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="GENERAL_USER">General User</option>
                  <option value="HOSPITAL_ADMIN">Hospital Admin</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Avatar
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => handleFileChange(e, "avatar")}
                  accept="image/*"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                    errors.avatar ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 text-sm font-medium text-white rounded-md 
                    ${
                      isSubmitting
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    "Create user"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Edit user</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleUpdateUser}
              className="p-6 grid grid-cols-2 gap-6"
            >
              {/* Cột trái */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm({ ...editForm, email: e.target.value })
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={editForm.full_name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, full_name: e.target.value })
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                      errors.full_name ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={editForm.password}
                    onChange={(e) =>
                      setEditForm({ ...editForm, password: e.target.value })
                    }
                    placeholder="Leave blank if you don't want to change"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={editForm.phone_number}
                    onChange={(e) =>
                      setEditForm({ ...editForm, phone_number: e.target.value })
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                      errors.phone_number ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    value={editForm.role}
                    onChange={(e) =>
                      setEditForm({ ...editForm, role: e.target.value })
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                      errors.role ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="GENERAL_USER">General User</option>
                    <option value="HOSPITAL_ADMIN">Hospital Admin</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Avatar
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "avatar")}
                    accept="image/*"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                      errors.avatar ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pet Type
                  </label>
                  <select
                    value={editForm.pet_type || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, pet_type: e.target.value })
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                      errors.pet_type ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select pet type</option>
                    <option value="DOG">Dog</option>
                    <option value="CAT">Cat</option>
                    <option value="BIRD">Bird</option>
                    <option value="FISH">Fish</option>
                    <option value="REPTILE">Reptile</option>
                    <option value="RABBIT">Rabbit</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pet Age
                  </label>
                  <input
                    type="number"
                    value={editForm.pet_age || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, pet_age: e.target.value })
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                      errors.pet_age ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pet Notes
                  </label>
                  <textarea
                    value={editForm.pet_notes || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, pet_notes: e.target.value })
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                      errors.pet_notes ? "border-red-500" : "border-gray-300"
                    }`}
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pet Photo
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "pet_photo")}
                    accept="image/*"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                      errors.pet_photo ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
              </div>

              {/* Footer buttons */}
              <div className="col-span-2 flex justify-end gap-3 mt-6 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 text-sm font-medium text-white rounded-md 
                    ${
                      isSubmitting
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    "Update"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Thêm Delete Confirmation Modal */}
      {showDeleteConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to permanently delete user{" "}
              <span className="font-medium">{userToDelete?.full_name}</span>? This
              action cannot be undone and will delete all related data.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteConfirmModal(false);
                  setUserToDelete(null);
                }}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handlePermanentDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersManagement;
