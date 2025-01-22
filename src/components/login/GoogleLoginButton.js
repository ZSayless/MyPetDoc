import { useState } from 'react';
import { initiateGoogleLogin } from '../../services/authService';

function GoogleLoginButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      // Chuyển hướng đến trang đăng nhập Google
      await initiateGoogleLogin();
    } catch (error) {
      setError(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && (
        <div className="mb-4 text-sm text-red-600 text-center">
          {error}
        </div>
      )}
      
      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <img 
          src="https://www.svgrepo.com/show/475656/google-color.svg" 
          alt="Google" 
          className="w-6 h-6"
        />
        {loading ? 'Processing...' : 'Login with Google'}
      </button>
    </div>
  );
}

export default GoogleLoginButton; 