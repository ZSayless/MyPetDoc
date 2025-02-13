import { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Eye, Edit, Trash2, Plus, Lock, Unlock, ToggleLeft, ToggleRight, X, RefreshCw } from "lucide-react";
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
  const { 
    users, 
    deletedUsers, 
    pagination, 
    deletedPagination,
    loading, 
    error 
  } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUser, setNewUser] = useState({
    email: '',
    full_name: '',
    password: '',
    role: 'GENERAL_USER',
    avatar: null,
    phone_number: ''
  });
  const [modalMode, setModalMode] = useState("view"); // "view" hoặc "edit"
  const [errors, setErrors] = useState({});
  const { addToast } = useToast();
  const [showUserModal, setShowUserModal] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: 'view', // 'view' | 'edit' | 'add'
    user: null
  });
  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'trash'
  const [lockTab, setLockTab] = useState('active'); // 'active' | 'trash'
  const [showCreateModal, setShowCreateModal] = useState(false);
  const fileInputRef = useRef(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    email: '',
    full_name: '',
    password: '',
    role: '',
    phone_number: '',
    pet_type: '',
    pet_age: '',
    pet_notes: '',
    is_active: true,
    is_locked: false,
    avatar: null,
    pet_photo: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch users dựa theo tab đang active
    if (activeTab === 'active') {
      dispatch(fetchUsers({ page: pagination.page, limit: pagination.limit }));
    } else {
      dispatch(fetchDeletedUsers({ page: pagination.page, limit: pagination.limit }));
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
      mode: 'view',
      user
    });
  };

  const handleEdit = (user) => {
    setEditForm({
      ...user,
      password: '' // Không hiển thị mật khẩu cũ
    });
    // Reset errors
    setErrors({});
    setShowEditModal(true);
  };

  const handleToggleLock = async (userId, currentLockState) => {
    try {
      const message = currentLockState 
        ? "Bạn có chắc muốn mở khóa người dùng này?" 
        : "Bạn có chắc muốn khóa người dùng này?";
      
      if (window.confirm(message)) {
        await dispatch(toggleLockUser(userId)).unwrap();
        addToast({
          type: "success",
          message: `${currentLockState ? 'Mở khóa' : 'Khóa'} người dùng thành công!`
        });
        // Refresh cả 2 danh sách
        if (lockTab === 'active') {
          dispatch(fetchUsers({ page: pagination.page, limit: pagination.limit }));
        } else {
          dispatch(fetchDeletedUsers({ page: pagination.page, limit: pagination.limit }));
        }
      }
    } catch (error) {
      const errorMessage = error?.message || "Có lỗi xảy ra khi thực hiện thao tác!";
      addToast({
        type: "error",
        message: errorMessage
      });
    }
  };

  const handleToggleActive = async (userId, currentActiveState) => {
    try {
      if (!userId) {
        addToast({
          type: "error",
          message: "Không tìm thấy ID người dùng!"
        });
        return;
      }

      const message = currentActiveState 
        ? "Bạn có chắc muốn vô hiệu hóa người dùng này?" 
        : "Bạn có chắc muốn kích hoạt người dùng này?";
      
      if (window.confirm(message)) {
        await dispatch(toggleActiveUser(userId)).unwrap();
        addToast({
          type: "success",
          message: `${currentActiveState ? 'Vô hiệu hóa' : 'Kích hoạt'} người dùng thành công!`
        });
        // Refresh cả 2 danh sách
        if (activeTab === 'active') {
          dispatch(fetchUsers({ page: pagination.page, limit: pagination.limit }));
        } else {
          dispatch(fetchDeletedUsers({ page: pagination.page, limit: pagination.limit }));
        }
      }
    } catch (error) {
      // Lấy message từ error object được trả về từ BE
      const errorMessage = error?.message || "Có lỗi xảy ra khi thực hiện thao tác!";
      addToast({
        type: "error",
        message: errorMessage
      });
    }
  };

  const handleToggleDelete = async (userId, isDeleted) => {
    try {
      const message = isDeleted
        ? "Bạn có chắc muốn khôi phục người dùng này?"
        : "Bạn có chắc muốn xóa người dùng này?";

      if (window.confirm(message)) {
        await dispatch(toggleDeleteUser(userId)).unwrap();
        addToast({
          type: "success",
          message: `${isDeleted ? 'Khôi phục' : 'Xóa'} người dùng thành công!`
        });
        // Refresh cả 2 danh sách
        if (activeTab === 'active') {
          dispatch(fetchUsers({ page: pagination.page, limit: pagination.limit }));
        } else {
          dispatch(fetchDeletedUsers({ page: pagination.page, limit: pagination.limit }));
        }
      }
    } catch (error) {
      const errorMessage = error?.message || "Có lỗi xảy ra khi thực hiện thao tác!";
      addToast({
        type: "error",
        message: errorMessage
      });
    }
  };

  const handlePermanentDelete = async (userId) => {
    try {
      const confirmed = window.confirm(
        'Bạn có chắc chắn muốn xóa vĩnh viễn người dùng này? Hành động này không thể hoàn tác và sẽ xóa tất cả dữ liệu liên quan.'
      );

      if (!confirmed) return;

      const result = await dispatch(deleteUserPermanently(userId)).unwrap();
      
      addToast({
        type: 'success',
        message: result.message || 'Xóa người dùng thành công!'
      });
    } catch (error) {
      addToast({
        type: 'error',
        message: error.message || 'Có lỗi xảy ra khi xóa người dùng'
      });
    }
  };

  // Lọc users dựa trên searchTerm
  const filteredUsers = useMemo(() => {
    const currentUsers = activeTab === 'active' ? users : deletedUsers;
    if (!searchTerm.trim()) return currentUsers;

    const searchValue = searchTerm.toLowerCase().trim();
    return currentUsers.filter(user => 
      (user.full_name?.toLowerCase() || '').includes(searchValue) ||
      (user.email?.toLowerCase() || '').includes(searchValue) ||
      (user.phone_number || '').includes(searchValue)
    );
  }, [users, deletedUsers, searchTerm, activeTab]);

  const handleAddUser = () => {
    setErrors({
      name: "",
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
      setErrors((prev) => ({ ...prev, phone_number: 'Số điện thoại không hợp lệ (10 số)' }));
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
      phone_number: '',
    });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm(editForm, true);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Hiển thị thông báo lỗi đầu tiên
      const firstError = Object.values(validationErrors)[0];
      addToast({
        type: 'error',
        message: firstError
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(updateUserInfo({
        userId: editForm.id,
        userData: editForm
      })).unwrap();
      
      addToast({
        type: 'success',
        message: 'Cập nhật người dùng thành công!'
      });
      setShowEditModal(false);
    } catch (error) {
      addToast({
        type: 'error',
        message: error.message || 'Có lỗi xảy ra khi cập nhật người dùng'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB
        addToast({
          type: 'error',
          message: 'Kích thước file không được vượt quá 5MB'
        });
        return;
      }
      setEditForm(prev => ({ ...prev, [field]: file }));
    }
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      mode: 'view',
      user: null
    });
  };

  const validateForm = (formData, isEdit = false) => {
    const errors = {};
    
    // Validate email
    if (!formData.email) {
      errors.email = 'Email là bắt buộc';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email không hợp lệ';
    }

    // Validate họ tên
    if (!formData.full_name) {
      errors.full_name = 'Họ tên là bắt buộc';
    } else if (formData.full_name.length < 2) {
      errors.full_name = 'Họ tên phải có ít nhất 2 ký tự';
    } else if (formData.full_name.length > 50) {
      errors.full_name = 'Họ tên không được vượt quá 50 ký tự';
    }

    // Validate mật khẩu (chỉ bắt buộc khi tạo mới)
    if (!isEdit && !formData.password) {
      errors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password && formData.password.length < 6) {
      errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    } else if (formData.password && formData.password.length > 50) {
      errors.password = 'Mật khẩu không được vượt quá 50 ký tự';
    } else if (formData.password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = 'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số';
    }

    // Validate số điện thoại
    if (formData.phone_number) {
      if (!/^[0-9]{10}$/.test(formData.phone_number)) {
        errors.phone_number = 'Số điện thoại phải có 10 chữ số';
      } else if (!/^(0[3|5|7|8|9])/.test(formData.phone_number)) {
        errors.phone_number = 'Số điện thoại không hợp lệ';
      }
    }

    // Validate role
    if (!formData.role) {
      errors.role = 'Vai trò là bắt buộc';
    }

    // Validate file ảnh
    if (formData.avatar instanceof File) {
      if (formData.avatar.size > 5 * 1024 * 1024) {
        errors.avatar = 'Kích thước ảnh không được vượt quá 5MB';
      }
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(formData.avatar.type)) {
        errors.avatar = 'Chỉ chấp nhận file ảnh định dạng JPG, PNG hoặc GIF';
      }
    }

    // Validate thông tin thú cưng (nếu có)
    if (formData.pet_age && isNaN(formData.pet_age)) {
      errors.pet_age = 'Tuổi thú cưng phải là số';
    }

    if (formData.pet_type && !['DOG', 'CAT', 'OTHER'].includes(formData.pet_type)) {
      errors.pet_type = 'Loại thú cưng không hợp lệ';
    }

    if (formData.pet_notes && formData.pet_notes.length > 500) {
      errors.pet_notes = 'Ghi chú không được vượt quá 500 ký tự';
    }

    if (formData.pet_photo instanceof File) {
      if (formData.pet_photo.size > 5 * 1024 * 1024) {
        errors.pet_photo = 'Kích thước ảnh không được vượt quá 5MB';
      }
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(formData.pet_photo.type)) {
        errors.pet_photo = 'Chỉ chấp nhận file ảnh định dạng JPG, PNG hoặc GIF';
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
        type: 'error',
        message: firstError
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(createUser(newUser)).unwrap();
      addToast({
        type: 'success',
        message: 'Tạo người dùng thành công!'
      });
      setShowCreateModal(false);
      setNewUser({
        email: '',
        full_name: '',
        password: '',
        role: 'GENERAL_USER',
        avatar: null,
        phone_number: ''
      });
      dispatch(fetchUsers({ page: pagination.page, limit: pagination.limit }));
    } catch (error) {
      addToast({
        type: 'error',
        message: error.message || 'Có lỗi xảy ra khi tạo người dùng'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render data dựa theo tab
  const displayedUsers = activeTab === 'active' ? users : deletedUsers;

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
        Error loading users: {error?.message || "Có lỗi xảy ra khi tải dữ liệu"}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      {/* Tabs */}
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'active'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Danh sách người dùng
        </button>
        <button
          onClick={() => setActiveTab('trash')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'trash'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Thùng rác
        </button>
      </div>

      {/* Search and Add User Row */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        {/* Search Bar */}
        <div className="w-full md:w-96">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, email, số điện thoại..."
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
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 whitespace-nowrap"
        >
          <Plus size={18} className="mr-2" />
          Thêm người dùng
        </button>
      </div>

      {/* Empty State khi không có kết quả tìm kiếm */}
      {filteredUsers.length === 0 && searchTerm && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            Không tìm thấy người dùng nào phù hợp
          </p>
        </div>
      )}

      {/* Table */}
      {filteredUsers.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lock Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.full_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        user.role === "Admin"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        user.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.is_active ? 'Active' : 'Inactive'}
                      </span>
                      <button
                        onClick={() => handleToggleActive(user.id, user.is_active)}
                        className={`p-1 rounded hover:bg-gray-100 ${
                          user.is_active 
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}
                        title={user.is_active ? 'Deactivate user' : 'Activate user'}
                      >
                        {user.is_active ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        user.is_locked 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {user.is_locked ? 'Locked' : 'Unlocked'}
                      </span>
                      <button
                        onClick={() => handleToggleLock(user.id, user.is_locked)}
                        className={`p-1 rounded hover:bg-gray-100 ${
                          user.is_locked 
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}
                        title={user.is_locked ? 'Unlock user' : 'Lock user'}
                      >
                        {user.is_locked ? <Unlock size={18} /> : <Lock size={18} />}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-end space-x-2">
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
                        className={`text-red-600 hover:text-red-900 ${
                          user.is_deleted ? 'text-green-600' : ''
                        }`}
                        title={user.is_deleted ? 'Khôi phục' : 'Xóa'}
                      >
                        {user.is_deleted ? <RefreshCw size={18} /> : <Trash2 size={18} />}
                      </button>
                      {activeTab === 'trash' && (
                        <button
                          onClick={() => handlePermanentDelete(user.id)}
                          className="p-1 rounded hover:bg-gray-100 text-red-600"
                          title="Xóa vĩnh viễn"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {(activeTab === "active" ? users : deletedUsers)?.length > 0 && (
        <div className="flex items-center justify-between py-3">
          <div className="text-sm text-gray-500">
            Showing {activeTab === "active" ? pagination.page : deletedPagination.page} of{" "}
              {activeTab === "active" ? pagination.totalPages : deletedPagination.totalPages} pages
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                const action = activeTab === "active" ? fetchUsers : fetchDeletedUsers;
                const currentPage = activeTab === "active" ? pagination.page : deletedPagination.page;
                dispatch(action({ page: currentPage - 1, limit: 10 }));
              }}
              disabled={
                activeTab === "active" 
                  ? pagination.page === 1 || users.length === 0
                  : deletedPagination.page === 1 || deletedUsers.length === 0
              }
              className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => {
                const action = activeTab === "active" ? fetchUsers : fetchDeletedUsers;
                const currentPage = activeTab === "active" ? pagination.page : deletedPagination.page;
                const totalPages = activeTab === "active" ? pagination.totalPages : deletedPagination.totalPages;
                dispatch(action({ page: currentPage + 1, limit: 10 }));
              }}
              disabled={
                activeTab === "active"
                  ? pagination.page === pagination.totalPages || users.length === 0
                  : deletedPagination.page === deletedPagination.totalPages || deletedUsers.length === 0
              }
              className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && (activeTab === "active" ? users : deletedUsers)?.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          {activeTab === "active" ? "Không có người dùng nào" : "Thùng rác trống"}
        </div>
      )}

      {/* User Detail Modal */}
      {modalState.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            {/* Modal Header - Fixed */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                Thông tin người dùng
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
                <h4 className="text-sm font-medium text-gray-500 mb-4">Thông tin cơ bản</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ID</label>
                    <input
                      type="text"
                      value={modalState.user.id}
                      readOnly
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      value={modalState.user.full_name}
                      readOnly={modalState.mode === 'view'}
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
                      readOnly={modalState.mode === 'view'}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Số điện thoại
                    </label>
                    <input
                      type="text"
                      value={modalState.user.phone_number || 'Chưa cập nhật'}
                      readOnly={modalState.mode === 'view'}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Vai trò
                    </label>
                    <input
                      type="text"
                      value={modalState.user.role}
                      readOnly={modalState.mode === 'view'}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hospital ID
                    </label>
                    <input
                      type="text"
                      value={modalState.user.hospital_id || 'Chưa có'}
                      readOnly
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-4">Trạng thái tài khoản</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Trạng thái hoạt động
                    </label>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        modalState.user.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {modalState.user.is_active ? 'Đang hoạt động' : 'Đã vô hiệu hóa'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Trạng thái khóa
                    </label>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        modalState.user.is_locked 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {modalState.user.is_locked ? 'Đã khóa' : 'Không khóa'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Đã xóa
                    </label>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        modalState.user.is_deleted 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {modalState.user.is_deleted ? 'Đã xóa' : 'Chưa xóa'}
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
                <h4 className="text-sm font-medium text-gray-500 mb-4">Thông tin xác thực</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Google ID
                    </label>
                    <input
                      type="text"
                      value={modalState.user.google_id || 'Không có'}
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
                      <span className="text-gray-500">Chưa có avatar</span>
                    )}
                  </div>
                </div>
              </div>

              {(modalState.user.pet_type || modalState.user.pet_age || modalState.user.pet_photo || modalState.user.pet_notes) && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-4">Thông tin thú cưng</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Loại thú cưng
                      </label>
                      <input
                        type="text"
                        value={modalState.user.pet_type || 'Chưa cập nhật'}
                        readOnly
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tuổi thú cưng
                      </label>
                      <input
                        type="text"
                        value={modalState.user.pet_age ? `${modalState.user.pet_age} tuổi` : 'Chưa cập nhật'}
                        readOnly
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ghi chú
                      </label>
                      <input
                        type="text"
                        value={modalState.user.pet_notes || 'Không có ghi chú'}
                        readOnly
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                      />
                    </div>

                    {modalState.user.pet_photo && (
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Ảnh thú cưng
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
                <h4 className="text-sm font-medium text-gray-500 mb-4">Thời gian</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ngày tạo
                    </label>
                    <input
                      type="text"
                      value={new Date(modalState.user.created_at).toLocaleString()}
                      readOnly
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cập nhật lần cuối
                    </label>
                    <input
                      type="text"
                      value={new Date(modalState.user.updated_at).toLocaleString()}
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
                Đóng
              </button>
              {modalState.mode !== 'view' && (
                <button
                  onClick={() => {
                    modalState.mode === 'edit' ? handleUpdateUser(modalState.user) : handleAddUser();
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  {modalState.mode === 'edit' ? 'Lưu thay đổi' : 'Thêm người dùng'}
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
              <h3 className="text-lg font-semibold">Thêm người dùng mới</h3>
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
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Họ và tên
                </label>
                <input
                  type="text"
                  value={newUser.full_name}
                  onChange={(e) => setNewUser({ ...newUser, full_name: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                    errors.full_name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.full_name && (
                  <p className="mt-1 text-sm text-red-600">{errors.full_name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  value={newUser.phone_number}
                  onChange={(e) => setNewUser({ ...newUser, phone_number: e.target.value })}
                  placeholder="Nhập số điện thoại"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                    errors.phone_number ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.phone_number && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone_number}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vai trò
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                    errors.role ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="GENERAL_USER">Người dùng thường</option>
                  <option value="HOSPITAL_ADMIN">Quản lý bệnh viện</option>
                  <option value="ADMIN">Quản trị viên</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ảnh đại diện
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => handleFileChange(e, 'avatar')}
                  accept="image/*"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                    errors.avatar ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 text-sm font-medium text-white rounded-md 
                    ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang xử lý...
                    </div>
                  ) : 'Tạo người dùng'}
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
              <h3 className="text-lg font-semibold">Chỉnh sửa người dùng</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdateUser} className="p-6 grid grid-cols-2 gap-6">
              {/* Cột trái */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    value={editForm.full_name}
                    onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                      errors.full_name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mật khẩu mới
                  </label>
                  <input
                    type="password"
                    value={editForm.password}
                    onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                    placeholder="Để trống nếu không muốn thay đổi"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    value={editForm.phone_number}
                    onChange={(e) => setEditForm({ ...editForm, phone_number: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                      errors.phone_number ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vai trò
                  </label>
                  <select
                    value={editForm.role}
                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                      errors.role ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="GENERAL_USER">Người dùng thường</option>
                    <option value="HOSPITAL_ADMIN">Quản lý bệnh viện</option>
                    <option value="ADMIN">Quản trị viên</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ảnh đại diện
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, 'avatar')}
                    accept="image/*"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                      errors.avatar ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
              </div>

              {/* Cột phải */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Loại thú cưng
                  </label>
                  <select
                    value={editForm.pet_type || ''}
                    onChange={(e) => setEditForm({ ...editForm, pet_type: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                      errors.pet_type ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Chọn loại thú cưng</option>
                    <option value="DOG">Chó</option>
                    <option value="CAT">Mèo</option>
                    <option value="OTHER">Khác</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tuổi thú cưng
                  </label>
                  <input
                    type="number"
                    value={editForm.pet_age || ''}
                    onChange={(e) => setEditForm({ ...editForm, pet_age: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                      errors.pet_age ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ghi chú về thú cưng
                  </label>
                  <textarea
                    value={editForm.pet_notes || ''}
                    onChange={(e) => setEditForm({ ...editForm, pet_notes: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                      errors.pet_notes ? 'border-red-500' : 'border-gray-300'
                    }`}
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ảnh thú cưng
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, 'pet_photo')}
                    accept="image/*"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                      errors.pet_photo ? 'border-red-500' : 'border-gray-300'
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
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 text-sm font-medium text-white rounded-md 
                    ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang xử lý...
                    </div>
                  ) : 'Cập nhật'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersManagement;
