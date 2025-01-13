import { X, MapPin, Phone, Star } from "lucide-react";

function ViewPendingHospitalModal({ hospital, onClose, onApprove, onReject }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white">
          <h2 className="text-xl font-semibold">Review Hospital</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Hospital Details */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{hospital.name}</h1>
            <div className="space-y-2 text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{hospital.address}</span>
              </div>
              {hospital.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{hospital.phone}</span>
                </div>
              )}
              {hospital.rating && (
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>{hospital.rating} / 5.0</span>
                </div>
              )}
            </div>
          </div>

          {/* Hospital Description */}
          <div className="prose max-w-none mb-8">
            <h3 className="text-lg font-semibold mb-2">About</h3>
            <p>{hospital.description || "No description provided."}</p>
          </div>

          {/* Submitted Info */}
          <div className="bg-gray-50 p-4 rounded-lg mb-8">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Submission Details</h3>
            <div className="text-sm text-gray-600">
              <p>Submitted by: {hospital.submittedBy}</p>
              <p>Submitted on: {hospital.submittedAt}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 border-t pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Close
            </button>
            <button
              onClick={() => onReject(hospital)}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
            >
              Reject
            </button>
            <button
              onClick={() => onApprove(hospital)}
              className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100"
            >
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPendingHospitalModal; 