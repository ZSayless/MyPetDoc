import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Eye, Check, X } from "lucide-react";
import { 
  fetchReports, 
  resolveReport, 
  dismissReport 
} from "../../../redux/slices/adminSlice";

function ReportsManagement() {
  const dispatch = useDispatch();
  const { reports, loading } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  const handleView = (report) => {
    // TODO: Open view modal
    console.log("View report:", report);
  };

  const handleResolve = async (reportId) => {
    try {
      await dispatch(resolveReport(reportId)).unwrap();
    } catch (error) {
      alert("Failed to resolve report");
    }
  };

  const handleDismiss = async (reportId) => {
    if (window.confirm("Are you sure you want to dismiss this report?")) {
      try {
        await dispatch(dismissReport(reportId)).unwrap();
      } catch (error) {
        alert("Failed to dismiss report");
      }
    }
  };

  const filteredReports = reports.filter(report => 
    report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.reportedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#98E9E9]"
          />
        </div>
      </div>

      {/* Table */}
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
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
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    report.type === "Review"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-purple-100 text-purple-800"
                  }`}>
                    {report.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{report.content}</td>
                <td className="px-6 py-4 whitespace-nowrap">{report.reportedBy}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    report.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : report.status === "resolved"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {report.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{report.createdAt}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center justify-end space-x-3">
                    <button
                      onClick={() => handleView(report)}
                      className="text-blue-600 hover:text-blue-900"
                      title="View"
                    >
                      <Eye size={18} />
                    </button>
                    {report.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleResolve(report.id)}
                          className="text-green-600 hover:text-green-900"
                          title="Resolve"
                        >
                          <Check size={18} />
                        </button>
                        <button
                          onClick={() => handleDismiss(report.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Dismiss"
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
  );
}

export default ReportsManagement;
