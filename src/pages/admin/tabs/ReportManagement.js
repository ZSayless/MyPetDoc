import SearchBar from "../../../components/common/SearchBar";

function ReportManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredReports, setFilteredReports] = useState(reports);

  useEffect(() => {
    const results = reports.filter(
      (report) =>
        report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.reportedBy.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredReports(results);
  }, [searchTerm, reports]);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Reports Management</h2>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <SearchBar
              placeholder="Search reports..."
              value={searchTerm}
              onChange={setSearchTerm}
            />
            {/* ... other filters ... */}
          </div>
        </div>
      </div>
      {/* ... list with filteredReports ... */}
    </div>
  );
}
