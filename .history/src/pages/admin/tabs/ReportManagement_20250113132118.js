import React, { useState } from "react";
import { AlertCircle, MoreVertical, Check, X } from "lucide-react";

function ReportManagement() {
  const [reports, setReports] = useState([
    {
      id: 1,
      type: "Review",
      content: "Inappropriate content in review",
      reportedItem: "Review #12345",
      reportedBy: "John Doe",
      date: "2024-03-15",
      status: "pending",
    },
    // More reports...
  ]);

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Reports Management</h2>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {reports.map((report) => (
          <div key={report.id} className="bg-white p-4 rounded-lg shadow-sm">
            {/* Report card content */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReportManagement; 