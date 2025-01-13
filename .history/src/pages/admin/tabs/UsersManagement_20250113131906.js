import { useState, useEffect } from "react";
import { Trash2, Edit, MoreVertical, UserPlus, Check, X, Search } from "lucide-react";
import AddEditUserModal from "../modals/AddEditUserModal";

function UsersManagement() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "general",
      status: "active",
      joinDate: "2024-03-15",
      lastLogin: "2024-03-20",
    },
    {
      id: 2,
      name: "Dr. Sarah Wilson",
      email: "sarah@hospital.com",
      role: "hospital",
      status: "active",
      joinDate: "2024-03-10",
      lastLogin: "2024-03-19",
    },
    // More users...
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [showActions, setShowActions] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

  // Handle search
  useEffect(() => {
    const results = users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm]);

  const handleStatusChange = (userId, newStatus) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
      try {
        // TODO: Call API to delete user
        setUsers(users.filter((user) => user.id !== userId));
        alert("Xóa người dùng thành công!");
      } catch (error) {
        alert("Có lỗi xảy ra khi xóa người dùng");
      }
    }
  };

  const handleUpdateStatus = async (userId, newStatus) => {
    try {
      // TODO: Call API to update user status
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, status: newStatus } : user
        )
      );
    } catch (error) {
      alert("Có lỗi xảy ra khi cập nhật trạng thái");
    }
  };

  const handleAddUser = async (userData) => {
    try {
      // TODO: Call API to add user
      const newUser = {
        id: Date.now(),
        ...userData,
        joinDate: new Date().toISOString().split("T")[0],
        lastLogin: "-",
      };
      setUsers([...users, newUser]);
      setShowModal(false);
      alert("Thêm người dùng thành công!");
    } catch (error) {
      alert("Có lỗi xảy ra khi thêm người dùng");
    }
  };

  const handleEditUser = async (userData) => {
    try {
      // TODO: Call API to update user
      setUsers(
        users.map((user) =>
          user.id === editingUser.id ? { ...user, ...userData } : user
        )
      );
      setShowModal(false);
      setEditingUser(null);
      alert("Cập nhật thông tin thành công!");
    } catch (error) {
      alert("Có lỗi xảy ra khi cập nhật thông tin");
    }
  };

  return (
    <div>
      {/* Actions Bar */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Users Management</h2>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Bar */}
            <div className="relative min-w-[240px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select className="min-w-[140px] px-4 py-2 bg-white border border-gray-200 rounded-full focus:outline-none">
              <option value="">All Roles</option>
              <option value="general">General Users</option>
              <option value="hospital">Hospital Users</option>
            </select>
            <select className="min-w-[140px] px-4 py-2 bg-white border border-gray-200 rounded-full focus:outline-none">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <button
            onClick={() => {
              setEditingUser(null);
              setShowModal(true);
            }}
            className="whitespace-nowrap px-4 py-2 bg-[#98E9E9] text-gray-700 rounded-full hover:bg-[#7CD5D5] transition-colors"
          >
            <UserPlus size={20} className="inline-block mr-2" />
            Add New User
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
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
                Last Login
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                        {user.name[0]}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.role === "hospital"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {user.role === "hospital"
                      ? "Hospital User"
                      : "General User"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === "active"
                        ? "bg-green-100 text-green-800"
                        : user.status === "inactive"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.joinDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.lastLogin}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="relative">
                    <button
                      onClick={() =>
                        setShowActions(showActions === user.id ? null : user.id)
                      }
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <MoreVertical size={20} />
                    </button>

                    {showActions === user.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-10">
                        <button
                          onClick={() => {
                            setEditingUser(user);
                            setShowModal(true);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Edit size={16} className="inline mr-2" />
                          Edit User
                        </button>
                        {user.status === "active" ? (
                          <button
                            onClick={() =>
                              handleStatusChange(user.id, "inactive")
                            }
                            className="block w-full text-left px-4 py-2 text-sm text-yellow-600 hover:bg-gray-50"
                          >
                            <X size={16} className="inline mr-2" />
                            Deactivate
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleStatusChange(user.id, "active")
                            }
                            className="block w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-gray-50"
                          >
                            <Check size={16} className="inline mr-2" />
                            Activate
                          </button>
                        )}
                        <button
                          onClick={() => {
                            /* Handle delete */
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                        >
                          <Trash2 size={16} className="inline mr-2" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
        <div className="text-sm text-gray-500">
          Showing 1 to 10 of 50 results
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            Previous
          </button>
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>

      {/* Add/Edit User Modal */}
      {showModal && (
        <AddEditUserModal
          user={editingUser}
          onClose={() => {
            setShowModal(false);
            setEditingUser(null);
          }}
          onSubmit={editingUser ? handleEditUser : handleAddUser}
        />
      )}
    </div>
  );
}

export default UsersManagement;
