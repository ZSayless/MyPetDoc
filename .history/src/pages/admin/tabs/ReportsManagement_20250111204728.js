import { useState, useEffect, useRef } from "react";
import { Flag, MoreVertical, Check, X, MessageSquare, User } from "lucide-react";

function ReportsManagement() {
  const [reports, setReports] = useState([
    {
      id: 1,
      blogTitle: "Common Pet Health Issues",
      commentId: "cmt123",
      commentContent: "This is spam content promoting fake medicine!",
      reportedUser: "john_doe",
      reportedBy: "sarah_wilson",
      reason: "spam",
      status: "pending",
      reportedAt: "2024-03-20",
      additionalNotes: "This user has been posting similar comments on multiple blogs"
    },
    {
      id: 2,
      blogTitle: "Nutrition Guide for Puppies",
      commentId: "cmt456",
      commentContent: "Your advice is completely wrong and dangerous!",
      reportedUser: "angry_user",
      reportedBy: "dr_smith",
      reason: "harassment",
      status: "pending",
      reportedAt: "2024-03-19",
      additionalNotes: "User has a history of aggressive comments"
    }
  ]);

  const [showActions, setShowActions] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowActions(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleResolve = async (reportId) => {
    try {
      // TODO: Call API to resolve report
      setReports(reports.map(report => 
        report.id === reportId ? { ...report, status: 'resolved' } : report
      ));
      alert("Báo cáo đã được xử lý!");
    } catch (error) {
      alert("Có lỗi xảy ra khi xử lý báo cáo");
    }
  };

  const handleDismiss = async (reportId) => {
    try {
      // TODO: Call API to dismiss report
      setReports(reports.map(report => 
        report.id === reportId ? { ...report, status: 'dismissed' } : report
      ));
      alert("Báo cáo đã được bỏ qua!");
    } catch (error) {
      alert("Có lỗi xảy ra khi bỏ qua báo cáo");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Reports Management</h2>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <select className="min-w-[140px] px-4 py-2 bg-white border border-gray-200 rounded-full focus:outline-none">
          <option value="">All Types</option>
          <option value="spam">Spam</option>
          <option value="harassment">Harassment</option>
          <option value="inappropriate">Inappropriate Content</option>
        </select>
        <select className="min-w-[140px] px-4 py-2 bg-white border border-gray-200 rounded-full focus:outline-none">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="resolved">Resolved</option>
          <option value="dismissed">Dismissed</option>
        </select>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {reports.map((report) => (
          <div key={report.id} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Flag className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Report on comment in "{report.blogTitle}"
                  </h4>
                  <p className="text-sm text-gray-500">
                    Reported {report.reportedAt} • By {report.reportedBy}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    report.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : report.status === 'resolved'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                </span>
                <div className="relative">
                  <button
                    onClick={() => setShowActions(showActions === report.id ? null : report.id)}
                    className="p-1 hover:bg-gray-100 rounded-lg"
                  >
                    <MoreVertical size={20} className="text-gray-400" />
                  </button>

                  {/* Dropdown Menu */}
                  {showActions === report.id && (
                    <div 
                      ref={dropdownRef}
                      className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border py-1 z-10"
                    >
                      <button
                        onClick={() => handleResolve(report.id)}
                        className="flex items-center w-full px-4 py-2 text-sm text-green-600 hover:bg-gray-50"
                      >
                        <Check size={16} className="mr-2" />
                        Resolve Report
                      </button>
                      <button
                        onClick={() => handleDismiss(report.id)}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                      >
                        <X size={16} className="mr-2" />
                        Dismiss Report
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Report Details */}
            <div className="pl-12">
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-4 h-4 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">{report.commentContent}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Comment by {report.reportedUser}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  <span>Reported User: </span>
                  <span className="font-medium">{report.reportedUser}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Flag className="w-4 h-4" />
                  <span>Reason: </span>
                  <span className="font-medium">{report.reason}</span>
                </div>
                {report.additionalNotes && (
                  <p className="text-sm text-gray-600 mt-2">
                    Note: {report.additionalNotes}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}

            {/* Actions Dropdown */}
            {showActions === report.id && (
              <div className="absolute right-4 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-10">
                <button
                  onClick={() => handleResolve(report.id)}
                  className="flex items-center w-full px-4 py-2 text-sm text-green-600 hover:bg-gray-50"
                >
                  <Check size={16} className="mr-2" />
                  Resolve Report
                </button>
                <button
                  onClick={() => handleDismiss(report.id)}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                >
                  <X size={16} className="mr-2" />
                  Dismiss Report
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {reports.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-red-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
            <Flag className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Reports Found</h3>
          <p className="text-gray-500">There are no reports to review at this time.</p>
        </div>
      )}
    </div>
  );
}

export default ReportsManagement; 