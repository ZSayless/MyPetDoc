import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-4">Admin Profile</h1>
          
          <div className="space-y-4">
            <div>
              <label className="text-gray-600">Email</label>
              <p className="text-gray-900">{currentUser.email}</p>
            </div>
            
            <div>
              <label className="text-gray-600">Role</label>
              <p className="text-gray-900 capitalize">{currentUser.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
