import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [isVerifying, setIsVerifying] = useState(true); // Thêm flag để tránh gọi API nhiều lần

  useEffect(() => {
    const verifyEmail = async () => {
      if (!isVerifying) return; // Nếu đã verify rồi thì không gọi nữa
      
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/verify-email/${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        setIsVerifying(false); // Đánh dấu đã verify xong

        if (response.ok && data.status === 'success') {
          setStatus('success');
          // Chuyển về trang chủ sau 3 giây
          setTimeout(() => {
            navigate('/');
          }, 3000);
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error('Lỗi xác thực email:', error);
        setStatus('error');
        setIsVerifying(false);
      }
    };

    if (token && isVerifying) {
      verifyEmail();
    }
  }, [token, navigate, isVerifying]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {status === 'verifying' && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Đang xác thực email...
            </h2>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Xác thực email thành công!
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Bạn sẽ được chuyển về trang chủ trong vài giây...
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Xác thực email thất bại
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Vui lòng thử lại hoặc liên hệ hỗ trợ
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Về trang chủ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;
