import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AuthError() {
  const location = useLocation();
  const navigate = useNavigate();
  const error =
    location.state?.error || "Đã xảy ra lỗi trong quá trình xác thực";
  const errorCode = location.state?.errorCode;

  const getErrorMessage = (error, code) => {
    switch (code) {
      case "ACCOUNT_LOCKED":
        return "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ admin để được hỗ trợ.";
      case "ACCOUNT_INACTIVE":
        return "Tài khoản chưa được kích hoạt. Vui lòng kiểm tra email để kích hoạt tài khoản.";
      case "INVALID_CREDENTIALS":
        return "Thông tin đăng nhập không hợp lệ.";
      case "AUTH_ERROR":
        return error;
      default:
        return (
          error ||
          "Đã xảy ra lỗi trong quá trình xác thực. Vui lòng thử lại sau."
        );
    }
  };

  const getErrorAction = (code) => {
    switch (code) {
      case "ACCOUNT_INACTIVE":
        return {
          primary: {
            text: "Gửi lại email kích hoạt",
            action: () => {
              // TODO: Implement resend activation email
              alert("Chức năng đang được phát triển");
            },
          },
        };
      case "ACCOUNT_LOCKED":
        return {
          primary: {
            text: "Liên hệ hỗ trợ",
            action: () => (window.location.href = "mailto:support@mypetdoc.vn"),
          },
        };
      default:
        return {
          primary: {
            text: "Thử đăng nhập lại",
            action: () => navigate("/auth/login"),
          },
        };
    }
  };

  const errorAction = getErrorAction(errorCode);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Lỗi xác thực
          </h2>
          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-center text-sm text-red-600">
              {getErrorMessage(error, errorCode)}
            </p>
          </div>
        </div>

        <div className="mt-5 text-center space-y-4">
          {errorAction.primary && (
            <button
              onClick={errorAction.primary.action}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              {errorAction.primary.text}
            </button>
          )}

          <button
            onClick={() => navigate("/")}
            className="block w-full text-sm text-gray-600 hover:text-gray-900"
          >
            Quay về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthError;
