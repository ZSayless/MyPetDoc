import React, { useState } from "react";
import { Check, X, MoreVertical, Building } from "lucide-react";

function PendingManagement() {
  const [pendingHospitals, setPendingHospitals] = useState([
    {
      id: 1,
      name: "PetCare Hospital",
      address: "123 Nguyen Van Linh, District 7, HCMC",
      email: "contact@petcare.com",
      phone: "0123456789",
      submitDate: "2024-03-15",
      status: "pending",
    },
    // More pending hospitals...
  ]);

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Pending Approvals</h2>
      </div>

      {/* Pending List */}
      <div className="space-y-4">
        {pendingHospitals.map((hospital) => (
          <div key={hospital.id} className="bg-white p-4 rounded-lg shadow-sm">
            {/* Hospital card content */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PendingManagement; 