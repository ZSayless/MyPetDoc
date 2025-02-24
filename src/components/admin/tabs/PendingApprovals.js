import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Eye, Check, X, Trash2 } from "lucide-react";
import {
  approvePending,
  rejectPending,
  deletePending,
} from "../../../redux/slices/adminSlice";

function PendingApprovals() {
  const dispatch = useDispatch();
  const { pendingApprovals } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const handleApprove = (id) => {
    dispatch(approvePending(id));
  };

  const handleReject = (id) => {
    if (window.confirm("Are you sure you want to reject this application?")) {
      dispatch(rejectPending(id));
    }
  };

  const handleView = (item) => {
    setSelectedItem(item);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      dispatch(deletePending(id));
      if (selectedItem?.id === id) {
        setSelectedItem(null);
      }
    }
  };

  const filteredItems = pendingApprovals.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 mt-12 md:mt-0">
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search pending approvals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#98E9E9]"
          />
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
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
                  <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        item.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : item.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.submittedAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleView(item)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye size={18} />
                      </button>
                      {item.status === "pending" ? (
                        <>
                          <button
                            onClick={() => handleApprove(item.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Check size={18} />
                          </button>
                          <button
                            onClick={() => handleReject(item.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <X size={18} />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-900"
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
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.type}</p>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  item.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : item.status === "approved"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {item.status}
              </span>
            </div>

            <div className="text-sm text-gray-500 mb-3">
              <p>Email: {item.email}</p>
              <p>Submitted: {item.submittedAt}</p>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => handleView(item)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
              >
                <Eye size={18} />
              </button>
              {item.status === "pending" ? (
                <>
                  <button
                    onClick={() => handleApprove(item.id)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                  >
                    <Check size={18} />
                  </button>
                  <button
                    onClick={() => handleReject(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <X size={18} />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Overlay */}
      {selectedItem && <div className="fixed inset-0 bg-black/50 z-[100]" />}

      {/* Pending Modal */}
      {selectedItem && (
        <div className="fixed inset-0 flex items-start justify-center overflow-y-auto z-[110] p-4">
          <div className="bg-white rounded-lg w-full max-w-md my-4">
            <div className="flex items-center justify-between p-3 border-b sticky top-0 bg-white">
              <h2 className="text-base font-semibold">Pending Details</h2>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                  {selectedItem.type}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 break-words">
                  {selectedItem.name}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 break-all">
                  {selectedItem.email}
                </div>
              </div>

              {selectedItem.type === "hospital_registration" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 break-words">
                      {selectedItem.details?.address || ""}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                      {selectedItem.details?.phone || ""}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Working Hours
                    </label>
                    <div className="text-sm space-y-1">
                      {selectedItem.details?.workingHours && (
                        <>
                          <div className="bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                            <span className="font-medium">Weekdays:</span>{" "}
                            {selectedItem.details.workingHours.weekdays}
                          </div>
                          <div className="bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                            <span className="font-medium">Weekends:</span>{" "}
                            {selectedItem.details.workingHours.weekends}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Services
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.details?.services?.map((service, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-50 text-sm rounded-lg border border-gray-200"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                  {selectedItem.status}
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-4 border-t mt-4">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-full sm:w-auto px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm font-medium"
                >
                  Close
                </button>
                {selectedItem.status === "pending" && (
                  <>
                    <button
                      onClick={() => {
                        handleApprove(selectedItem.id);
                        setSelectedItem(null);
                      }}
                      className="w-full sm:w-auto px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 text-sm font-medium"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        handleReject(selectedItem.id);
                        setSelectedItem(null);
                      }}
                      className="w-full sm:w-auto px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 text-sm font-medium"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PendingApprovals;
