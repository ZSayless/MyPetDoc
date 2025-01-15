import { useState } from "react";
import { Search, Check, X, Eye } from "lucide-react";
import ViewPendingHospitalModal from "../modals/ViewPendingHospitalModal";
import ViewPendingBlogModal from "../modals/ViewPendingBlogModal";

function PendingApprovals() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [showHospitalModal, setShowHospitalModal] = useState(false);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Mock data
  const pendingItems = [
    {
      id: 1,
      type: "hospital",
      name: "PetCare Hospital",
      submittedBy: "Dr. John Smith",
      submittedAt: "2024-03-15",
      status: "pending",
    },
    {
      id: 2,
      type: "blog",
      title: "Pet Nutrition Guide",
      author: "Dr. Sarah Johnson",
      submittedAt: "2024-03-14",
      status: "pending",
    },
  ];

  const handleView = (item) => {
    setSelectedItem(item);
    if (item.type === "hospital") {
      setShowHospitalModal(true);
    } else {
      setShowBlogModal(true);
    }
  };

  const handleApprove = (item) => {
    console.log("Approve:", item);
  };

  const handleReject = (item) => {
    console.log("Reject:", item);
  };

  const filteredItems = pendingItems.filter((item) => {
    if (selectedType !== "all" && item.type !== selectedType) return false;
    return true;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Pending Approvals</h1>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#98E9E9]"
        >
          <option value="all">All Types</option>
          <option value="hospital">Hospitals</option>
          <option value="blog">Blogs</option>
        </select>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search pending items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#98E9E9]"
          />
        </div>
      </div>

      {/* Pending Items Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name/Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submitted By
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submitted At
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      item.type === "hospital"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {item.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.type === "hospital" ? item.name : item.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.type === "hospital" ? item.submittedBy : item.author}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.submittedAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => handleView(item)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => handleApprove(item)}
                    className="text-green-600 hover:text-green-900 mr-3"
                  >
                    <Check size={18} />
                  </button>
                  <button
                    onClick={() => handleReject(item)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <X size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Modals */}
      {showHospitalModal && (
        <ViewPendingHospitalModal
          hospital={selectedItem}
          onClose={() => {
            setShowHospitalModal(false);
            setSelectedItem(null);
          }}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
      {showBlogModal && (
        <ViewPendingBlogModal
          blog={selectedItem}
          onClose={() => {
            setShowBlogModal(false);
            setSelectedItem(null);
          }}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
}

export default PendingApprovals;
