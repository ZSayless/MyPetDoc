import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Eye, Check, Trash2, Trash } from "lucide-react";
import { useToast } from "../../../context/ToastContext";
import { resolveReport, fetchReports, deleteReviewPermanently, deleteReportPermanently, deleteGalleryComment } from "../../../redux/slices/adminSlice";

function ReportsManagement() {
  const dispatch = useDispatch();
  const { addToast } = useToast();
  const { reports, isLoadingReports } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchReports(currentPage)).unwrap();
        setPagination(response.pagination);
      } catch (error) {
        addToast({
          type: "error",
          message: error.message || "An error occurred while loading the report list"
        });
      }
    };
    fetchData();
  }, [dispatch, currentPage]);

  const handleResolve = async (reportId) => {
    try {
      await dispatch(resolveReport(reportId)).unwrap();
      addToast({
        type: "success",
        message: "Report marked as resolved"
      });
    } catch (error) {
      addToast({
        type: "error",
        message: error.message || "An error occurred while resolving the report"
      });
    }
  };

  const handleView = (report) => {
    setSelectedReport(report);
  };

  const handleDeleteReview = async (report) => {
    if (window.confirm('Are you sure you want to delete this review permanently?')) {
      try {
        await dispatch(deleteReviewPermanently({
          reviewId: report.reported_content.id,
          reportId: report.id
        })).unwrap();
        addToast({
          type: "success",
          message: "Deleted review permanently"
        });
      } catch (error) {
        addToast({
          type: "error",
          message: error.message || "An error occurred while deleting the review"
        });
      }
    }
  };

  const handleDeleteReport = async (reportId) => {
    if (window.confirm('Are you sure you want to delete this report permanently?')) {
      try {
        await dispatch(deleteReportPermanently(reportId)).unwrap();
        addToast({
          type: "success",
          message: "Deleted report permanently"
        });
      } catch (error) {
        addToast({
          type: "error",
          message: error.message || "An error occurred while deleting the report"
        });
      }
    }
  };

  const handleDeleteGalleryComment = async (report) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await dispatch(deleteGalleryComment({
          commentId: report.reported_content.id,
          reportId: report.id
        })).unwrap();
        addToast({
          type: "success",
          message: "Deleted comment"
        });
      } catch (error) {
        addToast({
          type: "error",
          message: error.message || "An error occurred while deleting the comment"
        });
      }
    }
  };

  const getFilteredReports = () => {
    if (!searchTerm || !reports) return reports || [];

    const searchTermLower = searchTerm.toLowerCase().trim();
    return reports.filter(report => 
      report?.reason?.toLowerCase().includes(searchTermLower) ||
      report?.reporter?.full_name?.toLowerCase().includes(searchTermLower) ||
      report?.reported_content?.content?.toLowerCase().includes(searchTermLower)
    );
  };

  if (isLoadingReports) {
    return (
      <div className="p-4 md:p-6 flex justify-center">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

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
            placeholder="Search by reason, reporter, content..."
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
              {getFilteredReports()?.map((report) => (
                <tr key={report.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      report?.reported_content?.type === "review"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      {report?.reported_content?.type || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-gray-900 line-clamp-2">
                        {report?.reported_content?.content}
                      </p>
                      {report?.reported_content?.type === "review" && report?.reported_content?.details?.hospital && (
                        <p className="text-xs text-gray-500 mt-1">
                          Bệnh viện: {report.reported_content.details.hospital.name}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        Lý do: {report?.reason}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {report?.reporter?.avatar && (
                        <img 
                          src={report.reporter.avatar} 
                          alt={report.reporter.full_name}
                          className="w-8 h-8 rounded-full"
                        />
                      )}
                      <div>
                        <div className="text-sm font-medium">{report?.reporter?.full_name}</div>
                        <div className="text-xs text-gray-500">{report?.reporter?.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      report?.resolved 
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {report?.resolved ? "Resolved" : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleView(report)}
                        className="text-blue-600 hover:text-blue-900"
                        title="View details"
                      >
                        <Eye size={18} />
                      </button>
                      {report?.reported_content?.type === 'review' && (
                        <button
                          onClick={() => handleDeleteReview(report)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete review permanently"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                      {report?.reported_content?.type === 'gallery_comment' && (
                        <button
                          onClick={() => handleDeleteGalleryComment(report)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete comment"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteReport(report.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete report permanently"
                      >
                        <Trash size={18} />
                      </button>
                      {!report?.resolved && (
                        <button
                          onClick={() => handleResolve(report.id)}
                          className="text-green-600 hover:text-green-900"
                          title="Mark as resolved"
                        >
                          <Check size={18} />
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
        {getFilteredReports()?.map((report) => (
          <div key={report.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    report?.reported_content?.type === "review"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {report?.reported_content?.type || 'N/A'}
                </span>
                <p className="text-sm text-gray-500 mt-1">
                  By: {report?.reporter?.full_name}
                </p>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  report?.resolved
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {report?.resolved ? "Resolved" : "Pending"}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {report?.reported_content?.content}
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => handleView(report)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
              >
                <Eye size={18} />
              </button>
              {report?.reported_content?.type === 'review' && (
                <button
                  onClick={() => handleDeleteReview(report)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                >
                  <Trash2 size={18} />
                </button>
              )}
              {report?.reported_content?.type === 'gallery_comment' && (
                <button
                  onClick={() => handleDeleteGalleryComment(report)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                >
                  <Trash2 size={18} />
                </button>
              )}
              <button
                onClick={() => handleDeleteReport(report.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full"
              >
                <Trash size={18} />
              </button>
              {!report?.resolved && (
                <button
                  onClick={() => handleResolve(report.id)}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                >
                  <Check size={18} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing {currentPage} of {pagination.totalPages} pages
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 border'
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.totalPages))}
            disabled={currentPage === pagination.totalPages}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              currentPage === pagination.totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 border'
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal Overlay */}
      {selectedReport && <div className="fixed inset-0 bg-black/50 z-[100]" />}

      {/* Report Modal */}
      {selectedReport && (
        <div className="fixed inset-0 flex items-center justify-center z-[110]">
          <div className="bg-white rounded-lg w-full max-w-md mx-4">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Report details</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <input
                    type="text"
                    value={selectedReport.reported_content.type}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                  </label>
                  <textarea
                    value={selectedReport.reported_content.content}
                    readOnly
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reported content
                  </label>
                  <input
                    type="text"
                    value={
                      selectedReport.reported_content.type === 'review'
                        ? selectedReport.reported_content.details.hospital.name
                        : selectedReport.reported_content.details.gallery.caption
                    }
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reporter
                  </label>
                  <input
                    type="text"
                    value={selectedReport.reporter.full_name}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <input
                    type="text"
                    value={selectedReport.resolved ? "Resolved" : "Pending"}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={() => setSelectedReport(null)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Close
                </button>
                {!selectedReport.resolved && (
                  <button
                    onClick={() => {
                      handleResolve(selectedReport.id);
                      setSelectedReport(null);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Mark as resolved
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReportsManagement;
