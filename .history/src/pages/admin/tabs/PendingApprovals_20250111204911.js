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
      content: `
        <h2>Keeping Your Pets Safe and Healthy During Summer</h2>
        <p>As temperatures rise during summer months, pet owners need to be extra vigilant about their furry friends' health and well-being. Here are some common issues to watch out for:</p>
        
        <h3>1. Heat Exhaustion and Heatstroke</h3>
        <p>Dogs and cats can quickly develop heat exhaustion in hot weather. Signs include:</p>
        <ul>
          <li>Excessive panting</li>
          <li>Drooling</li>
          <li>Lethargy</li>
          <li>Vomiting</li>
        </ul>
        
        <h3>2. Dehydration</h3>
        <p>Always ensure your pets have access to fresh, clean water. Consider adding ice cubes to their water bowl to keep it cool longer.</p>
        
        <h3>3. Sunburn</h3>
        <p>Yes, pets can get sunburned too! Short-haired and light-colored pets are particularly susceptible. Consider pet-safe sunscreen for extended outdoor time.</p>
        
        <h3>Prevention Tips</h3>
        <ol>
          <li>Never leave pets in parked cars</li>
          <li>Provide plenty of shade and water</li>
          <li>Exercise during cooler hours</li>
          <li>Watch for signs of distress</li>
        </ol>
        
        <p>If you notice any concerning symptoms, don't hesitate to contact your veterinarian.</p>
      `,
    },
    {
      id: 2,
      title: "Nutrition Guide for Puppies",
      author: "Dr. Sarah Wilson",
      category: "Pet Care",
      submittedAt: "2024-03-19",
      type: "blog",
      content: `
        <h2>Essential Nutrition Guide for Growing Puppies</h2>
        <p>Proper nutrition is crucial for your puppy's growth and development. This guide will help you make informed decisions about your puppy's diet.</p>
        
        <h3>The Basics of Puppy Nutrition</h3>
        <p>Puppies need a balanced diet rich in:</p>
        <ul>
          <li>Proteins for muscle development</li>
          <li>Fats for energy</li>
          <li>Calcium for bone growth</li>
          <li>Vitamins and minerals for overall health</li>
        </ul>
        
        <h3>Feeding Schedule</h3>
        <p>Young puppies should be fed 3-4 times daily. A general schedule might look like:</p>
        <ul>
          <li>Morning: 7:00 AM</li>
          <li>Lunch: 12:00 PM</li>
          <li>Dinner: 5:00 PM</li>
          <li>Evening snack (optional): 8:00 PM</li>
        </ul>
        
        <h3>Common Nutrition Mistakes</h3>
        <ol>
          <li>Feeding adult dog food too early</li>
          <li>Overfeeding</li>
          <li>Insufficient water</li>
          <li>Too many treats</li>
        </ol>
        
        <p>Remember, every puppy is unique. Consult with your veterinarian for personalized nutrition advice.</p>
      `,
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
      phone: "+84 123 456 789",
      rating: 4.8,
      description: `PetCare Plus Hospital is a state-of-the-art veterinary facility dedicated to providing exceptional care for your beloved pets. Our modern facility is equipped with the latest medical technology and staffed by experienced veterinary professionals.

      Our Services:
      - 24/7 Emergency Care
      - Routine Check-ups and Vaccinations
      - Surgery and Dental Services
      - Pet Grooming and Boarding
      - Advanced Diagnostic Services
      
      Our team of veterinarians has over 20 years of combined experience in treating both common and complex pet health issues. We pride ourselves on our compassionate approach to pet care and our commitment to keeping your pets healthy and happy.
      
      We also offer specialized services for exotic pets and provide comprehensive rehabilitation programs for pets recovering from surgery or injury.`,
      facilities: [
        "Modern Surgery Rooms",
        "In-house Laboratory",
        "Digital X-ray Equipment",
        "Pet Pharmacy",
        "Comfortable Recovery Kennels",
      ],
      specialties: [
        "Emergency Medicine",
        "Orthopedic Surgery",
        "Dental Care",
        "Preventive Care",
      ],
    },
    {
      id: 2,
      name: "Animal Care Center",
      address: "456 Nguyen Hue, District 1, HCMC",
      submittedBy: "Dr. Emily Chen",
      submittedAt: "2024-03-19",
      type: "hospital",
      phone: "+84 987 654 321",
      rating: 4.7,
      description: `Animal Care Center is a full-service veterinary hospital committed to providing comprehensive medical care for pets in Ho Chi Minh City. We understand that your pets are valued family members, and we treat them with the same care and attention we would give our own.

      Our Commitment:
      - Personalized care for each patient
      - Clear communication with pet owners
      - Affordable treatment options
      - Stress-free environment for pets
      
      We specialize in preventive care and early detection of pet health issues. Our facility features modern equipment and a comfortable environment designed to minimize stress for both pets and their owners.
      
      Our team regularly participates in continuing education to stay current with the latest developments in veterinary medicine.`,
      facilities: [
        "Consultation Rooms",
        "Surgery Suite",
        "Isolation Ward",
        "Grooming Station",
        "Pet Hotel",
      ],
      specialties: [
        "Internal Medicine",
        "Soft Tissue Surgery",
        "Dermatology",
        "Behavioral Consultation",
      ],
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
