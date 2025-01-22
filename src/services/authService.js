const API_URL = process.env.REACT_APP_API_URL;

export const registerWithGoogle = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/auth/complete-google-signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Đăng ký thất bại");
    }

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error("Lỗi khi đăng ký với Google:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Đăng nhập thất bại");
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const register = async (userData) => {
  try {
    console.log("Sending registration data:", userData);

    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
        full_name: userData.fullName,
        role: userData.role || "USER",
      }),
    });

    const data = await response.json();
    console.log("Registration response:", data);

    if (!response.ok) {
      throw new Error(data.message || "Đăng ký thất bại");
    }

    return {
      success: true,
      data,
      message: data.message || "Đăng ký thành công",
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      error: error.message || "Có lỗi xảy ra khi đăng ký",
      details: error,
    };
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Gửi yêu cầu thất bại");
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await fetch(`${API_URL}/auth/reset-password/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: newPassword }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Đặt lại mật khẩu thất bại");
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const initiateGoogleLogin = () => {
  localStorage.setItem("returnTo", window.location.pathname);
  window.location.href = `${API_URL}/auth/google`;
};

export const handleAuthCallback = async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get("data");

    if (!encodedData) {
      throw new Error("Không tìm thấy dữ liệu trong URL callback");
    }

    const data = JSON.parse(decodeURIComponent(encodedData));
    console.log("Dữ liệu callback:", data);

    if (data.status === "pending_role") {
      return {
        isNewUser: true,
        profile: data.data.profile,
      };
    }

    if (data.status === "success") {
      return {
        isNewUser: false,
        user: data.data.user,
        token: data.data.token,
      };
    }

    if (data.status === "error") {
      throw {
        message: data.message,
        code: data.code || "AUTH_ERROR",
      };
    }

    throw new Error("Định dạng dữ liệu không hợp lệ");
  } catch (error) {
    console.error("Lỗi xử lý callback:", error);
    throw error;
  }
};

export const completeGoogleSignup = async (userData) => {
  try {
    if (!userData.email || !userData.full_name || !userData.role) {
      throw new Error("Missing required user data");
    }

    console.log("Sending complete signup request:", userData);

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/auth/complete-google-signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
      }
    );

    const data = await response.json();
    console.log("Complete signup response:", data);

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    console.error("Complete signup error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};
