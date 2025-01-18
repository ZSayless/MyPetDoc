import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Eye, Check, X } from "lucide-react";
import { resolveReport, dismissReport } from "../../../redux/slices/adminSlice";
import { useTranslation } from "react-i18next";

function ReportsManagement() {
  const { t } = useTranslation();
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
      <input
        type="text"
        placeholder={t("admin.actions.search")}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="..."
      />

      <table>
        <thead>
          <tr>
            <th>{t("admin.table.type")}</th>
            <th>{t("admin.table.content")}</th>
            <th>{t("admin.table.reportedBy")}</th>
            <th>{t("admin.table.status")}</th>
            <th>{t("admin.table.actions")}</th>
          </tr>
        </thead>
        {/* ... table body */}
      </table>
    </div>
  );
}

export default ReportsManagement;
