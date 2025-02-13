import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { handleAuthCallback } from "../../services/authService";

function AuthCallback() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const processedRef = useRef(false);

  useEffect(() => {
    const processCallback = async () => {
      if (processedRef.current) return;
      processedRef.current = true;

      try {
        console.log("Processing callback URL:", window.location.href);
        const result = await handleAuthCallback();
        console.log("Callback result:", result);

        if (result.isNewUser) {
          // Đảm bảo profile có đầy đủ thông tin
          const profileData = {
            email: result.profile.email,
            full_name: result.profile.full_name,
            phone_number: result.profile.phone_number,
            google_id: result.profile.google_id,
            avatar: result.profile.avatar,
          };

          console.log(
            "Redirecting to role selection with profile:",
            profileData
          );
          navigate("/auth/select-role", {
            state: { profile: profileData },
            replace: true,
          });
        } else {
          await login({
            user: result.user,
            token: result.token,
          });
          const returnTo = localStorage.getItem("returnTo") || "/";
          navigate(returnTo, { replace: true });
        }
      } catch (error) {
        console.error("Callback processing error:", error);
        navigate("/auth/error", {
          state: {
            error: error.message,
            errorCode: error.code || "AUTH_ERROR",
          },
          replace: true,
        });
      }
    };

    processCallback();
  }, [navigate, login]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">Đang xử lý đăng nhập...</p>
      </div>
    </div>
  );
}

export default AuthCallback;
