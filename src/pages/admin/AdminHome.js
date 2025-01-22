import { BarChart2 } from "lucide-react";

function AdminHome() {
  return (
    <div className="p-4 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-sm text-gray-500 mb-2">Total Users</h3>
          <p className="text-2xl font-bold text-gray-800">1,234</p>
          <p className="text-xs text-green-600 mt-1">+12% from last month</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-sm text-gray-500 mb-2">Total Hospitals</h3>
          <p className="text-2xl font-bold text-gray-800">56</p>
          <p className="text-xs text-green-600 mt-1">+3 new this month</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-sm text-gray-500 mb-2">Total Reviews</h3>
          <p className="text-2xl font-bold text-gray-800">892</p>
          <p className="text-xs text-green-600 mt-1">+25% from last month</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-sm text-gray-500 mb-2">Total Blogs</h3>
          <p className="text-2xl font-bold text-gray-800">145</p>
          <p className="text-xs text-green-600 mt-1">+8 new this week</p>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
