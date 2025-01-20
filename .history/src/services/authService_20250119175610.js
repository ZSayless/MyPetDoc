import api from "./api";

export const authService = {
  login: async (email, password) => {
    try {
      // Kiểm tra thông tin đăng nhập
      if ((email === "admin@mypetdoc.com" && password === "admin123") || 
          (email === "user@mypetdoc.com" && password === "user123")) {
        // Xác định role dựa trên email
        const isAdmin = email === "admin@mypetdoc.com";
        const userData = {
          id: 1,
          email: email,
          name: isAdmin ? "Admin User" : "Normal User",
          role: isAdmin ? "admin" : "user",
          avatar: isAdmin ? "A" : "U",
        };

        // Save to localStorage
        localStorage.setItem("user", JSON.stringify(userData));

        return {
          success: true,
          data: userData,
          message: "Login successful",
        };
      }

      return {
        success: false,
        message: "Email hoặc mật khẩu không chính xác",
      };
    } catch (error) {
      return {
        success: false,
        message: "Đã có lỗi xảy ra khi đăng nhập",
      };
    }
  },

  register: async (userData) => {
    try {
      // const response = await api.post('/auth/register', userData);
      // return response.data;

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            user: {
              id: Date.now(),
              name: userData.firstName + " " + userData.lastName,
              email: userData.email,
              role: userData.role || "user",
            },
            token: "mock_token_" + Date.now(),
          });
        }, 500);
      });
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  },

  logout: async () => {
    try {
      // await api.post('/auth/logout');
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  },
};

export const registerWithGoogle = async (userData) => {
  try {
    // Gọi API đăng ký với Google
    const response = await fetch("/api/auth/google-register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error("Error registering with Google:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};
