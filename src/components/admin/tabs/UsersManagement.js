import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Eye, Edit, Trash2, Plus, Lock, Unlock, ToggleLeft, ToggleRight, X, RefreshCw } from "lucide-react";
import {
  deleteUser,
  updateUserStatus,
  addUser,
  updateUser,
  fetchUsers,
  toggleLockUser,
  toggleActiveUser,
  toggleDeleteUser,
  fetchDeletedUsers,
} from "../../../redux/slices/adminSlice";
import { useToast } from "../../../context/ToastContext";

function UsersManagement() {
  const dispatch = useDispatch();
  const { users, deletedUsers, pagination, loading, error } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Pet Owner", // Default role
    password: "",
    confirmPassword: "",
  });
  const [modalMode, setModalMode] = useState("view"); // "view" hoặc "edit"
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { addToast } = useToast();
  const [showUserModal, setShowUserModal] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: 'view', // 'view' | 'edit' | 'add'
    user: null
  });
  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'trash'

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
    setModalState({
      isOpen: true,
      mode: 'edit',
      user
    });
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

  const filteredUsers = users ? users.filter(
    (user) =>
      (user?.full_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (user?.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  ) : [];

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
    });
  };

  const handleUpdateUser = (updatedUser) => {
    // Gọi API để cập nhật user
    dispatch(updateUser(updatedUser));
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      mode: 'view',
      user: null
    });
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
        Error loading users: {error}
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
          {activeTab === 'active' && users.length > 0 && (
            <span className="ml-2 px-2 py-1 text-xs bg-white text-blue-600 rounded-full">
              {users.length}
            </span>
          )}
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
          {activeTab === 'trash' && deletedUsers.length > 0 && (
            <span className="ml-2 px-2 py-1 text-xs bg-white text-blue-600 rounded-full">
              {deletedUsers.length}
            </span>
          )}
        </button>
      </div>

      {/* Empty State */}
      {displayedUsers.length === 0 && !loading && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            {activeTab === 'active' 
              ? 'Không có người dùng nào'
              : 'Thùng rác trống'
            }
          </p>
        </div>
      )}

      {/* Table */}
      {displayedUsers.length > 0 && (
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
              {displayedUsers.map((user) => (
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Showing {pagination.page} of {pagination.totalPages} pages
        </div>
        <div className="flex gap-2">
          <button
            disabled={pagination.page === 1}
            onClick={() => dispatch(fetchUsers({ page: pagination.page - 1, limit: pagination.limit, isDeleted: activeTab === 'trash' }))}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            disabled={pagination.page === pagination.totalPages}
            onClick={() => dispatch(fetchUsers({ page: pagination.page + 1, limit: pagination.limit, isDeleted: activeTab === 'trash' }))}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

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
    </div>
  );
}

export default UsersManagement;
