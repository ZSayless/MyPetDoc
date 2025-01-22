import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Eye, Check, X } from "lucide-react";
import { resolveReport, dismissReport } from "../../../redux/slices/adminSlice";

function ReportsManagement() {
  const dispatch = useDispatch();
  const { reports } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);

  const handleResolve = (reportId) => {
    dispatch(resolveReport(reportId));
  };

  const handleDismiss = (reportId) => {
    if (window.confirm("Are you sure you want to dismiss this report?")) {
      dispatch(dismissReport(reportId));
    }
  };

  const handleView = (report) => {
    setSelectedReport(report);
  };

  const filteredReports = reports.filter(
    (report) =>
      report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reportedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6">
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search reports..."
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
                  Content
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reported By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <tr key={report.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        report.type === "comment"
                          ? "bg-blue-100 text-blue-800"
                          : report.type === "review"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {report.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900 line-clamp-2">
                      {report.content}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {report.reportedBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        report.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : report.status === "resolved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleView(report)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye size={18} />
                      </button>
                      {report.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleResolve(report.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Check size={18} />
                          </button>
                          <button
                            onClick={() => handleDismiss(report.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <X size={18} />
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
        {filteredReports.map((report) => (
          <div key={report.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    report.type === "comment"
                      ? "bg-blue-100 text-blue-800"
                      : report.type === "review"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-orange-100 text-orange-800"
                  }`}
                >
                  {report.type}
                </span>
                <p className="text-sm text-gray-500 mt-1">
                  By: {report.reportedBy}
                </p>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  report.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : report.status === "resolved"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {report.status}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {report.content}
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => handleView(report)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
              >
                <Eye size={18} />
              </button>
              {report.status === "pending" && (
                <>
                  <button
                    onClick={() => handleResolve(report.id)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                  >
                    <Check size={18} />
                  </button>
                  <button
                    onClick={() => handleDismiss(report.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <X size={18} />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* View Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Report Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <input
                  type="text"
                  value={selectedReport.type}
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Content
                </label>
                <textarea
                  value={selectedReport.content}
                  readOnly
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Reported Item
                </label>
                <input
                  type="text"
                  value={selectedReport.reportedItem}
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Reported By
                </label>
                <input
                  type="text"
                  value={selectedReport.reportedBy}
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <input
                  type="text"
                  value={selectedReport.status}
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setSelectedReport(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Close
              </button>
              {selectedReport.status === "pending" && (
                <>
                  <button
                    onClick={() => {
                      handleResolve(selectedReport.id);
                      setSelectedReport(null);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Resolve
                  </button>
                  <button
                    onClick={() => {
                      handleDismiss(selectedReport.id);
                      setSelectedReport(null);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Dismiss
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReportsManagement;
