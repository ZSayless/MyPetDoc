import { useState } from "react";
import { Check, X, FileText, Building } from "lucide-react";
import ViewPendingBlogModal from "../modals/ViewPendingBlogModal";
import ViewPendingHospitalModal from "../modals/ViewPendingHospitalModal";

function PendingApprovals() {
  const [pendingBlogs, setPendingBlogs] = useState([
    {
      id: 1,
      title: "Common Pet Health Issues in Summer",
      author: "Dr. John Smith",
      category: "Pet Health",
      submittedAt: "2024-03-20",
      type: "blog",
    },
    {
      id: 2,
      title: "Nutrition Guide for Puppies",
      author: "Dr. Sarah Wilson",
      category: "Pet Care",
      submittedAt: "2024-03-19",
      type: "blog",
    },
  ]);

  const [pendingHospitals, setPendingHospitals] = useState([
    {
      id: 1,
      name: "PetCare Plus Hospital",
      address: "123 Le Loi, District 1, HCMC",
      submittedBy: "Dr. Michael Lee",
      submittedAt: "2024-03-20",
      type: "hospital",
    },
    {
      id: 2,
      name: "Animal Care Center",
      address: "456 Nguyen Hue, District 1, HCMC",
      submittedBy: "Dr. Emily Chen",
      submittedAt: "2024-03-19",
      type: "hospital",
    },
  ]);

  const [selectedItem, setSelectedItem] = useState(null);

  const handleApprove = async (item) => {
    try {
      // TODO: Call API to approve item
      if (item.type === "blog") {
        setPendingBlogs(pendingBlogs.filter((blog) => blog.id !== item.id));
        alert("Blog đã được phê duyệt!");
      } else {
        setPendingHospitals(
          pendingHospitals.filter((hospital) => hospital.id !== item.id)
        );
        alert("Bệnh viện đã được phê duyệt!");
      }
    } catch (error) {
      alert("Có lỗi xảy ra khi phê duyệt");
    }
  };

  const handleReject = async (item) => {
    try {
      // TODO: Call API to reject item
      if (item.type === "blog") {
        setPendingBlogs(pendingBlogs.filter((blog) => blog.id !== item.id));
        alert("Đã từ chối blog!");
      } else {
        setPendingHospitals(
          pendingHospitals.filter((hospital) => hospital.id !== item.id)
        );
        alert("Đã từ chối bệnh viện!");
      }
    } catch (error) {
      alert("Có lỗi xảy ra khi từ chối");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Pending Approvals</h2>

      {/* Pending Blogs Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Pending Blogs</h3>
        <div className="space-y-4">
          {pendingBlogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between">
                <div 
                  className="flex items-center gap-3 flex-1 cursor-pointer"
                  onClick={() => setSelectedItem(blog)}
                >
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{blog.title}</h4>
                    <p className="text-sm text-gray-500">
                      By {blog.author} • {blog.category} • Submitted on{" "}
                      {blog.submittedAt}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(blog)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleReject(blog)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {pendingBlogs.length === 0 && (
            <p className="text-gray-500 text-center py-4">No pending blogs</p>
          )}
        </div>
      </div>

      {/* Pending Hospitals Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Pending Hospitals</h3>
        <div className="space-y-4">
          {pendingHospitals.map((hospital) => (
            <div
              key={hospital.id}
              className="bg-white rounded-lg shadow-sm p-4"
            >
              <div className="flex items-center justify-between">
                <div 
                  className="flex items-center gap-3 flex-1 cursor-pointer"
                  onClick={() => setSelectedItem(hospital)}
                >
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Building className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {hospital.name}
                    </h4>
                    <p className="text-sm text-gray-500">{hospital.address}</p>
                    <p className="text-sm text-gray-500">
                      By {hospital.submittedBy} • Submitted on{" "}
                      {hospital.submittedAt}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(hospital)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleReject(hospital)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {pendingHospitals.length === 0 && (
            <p className="text-gray-500 text-center py-4">
              No pending hospitals
            </p>
          )}
        </div>
      </div>

      {/* View Modals */}
      {selectedItem?.type === "blog" && (
        <ViewPendingBlogModal
          blog={selectedItem}
          onClose={() => setSelectedItem(null)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
      {selectedItem?.type === "hospital" && (
        <ViewPendingHospitalModal
          hospital={selectedItem}
          onClose={() => setSelectedItem(null)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
}

export default PendingApprovals;
