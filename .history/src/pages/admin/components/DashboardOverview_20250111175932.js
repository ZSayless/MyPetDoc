function DashboardOverview() {
  const stats = [
    {
      label: "Total Users",
      value: "1,234",
      change: "+12%",
      changeType: "increase",
    },
    {
      label: "Active Hospitals",
      value: "56",
      change: "+3",
      changeType: "increase",
    },
    {
      label: "Appointments",
      value: "892",
      change: "+23%",
      changeType: "increase",
    },
    {
      label: "Blog Posts",
      value: "45",
      change: "+5",
      changeType: "increase",
    },
  ];

  return (
    <div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <h3 className="text-sm font-medium text-gray-500">
              {stat.label}
            </h3>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
              <p
                className={`ml-2 text-sm font-medium ${
                  stat.changeType === "increase"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {stat.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h2>
        {/* Add activity list */}
      </div>
    </div>
  );
}

export default DashboardOverview; 