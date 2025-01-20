import api from "./api";

const defaultAccounts = [
  {
    email: "admin@mypetdoc.com",
    password: "admin123",
    role: "admin",
    firstName: "Admin",
    lastName: "User"
  },
  {
    email: "user@mypetdoc.com", 
    password: "user123",
    role: "user",
    firstName: "Normal",
    lastName: "User"
  }
];

export const authService = {
  login: async (credentials) => {
    // Kiểm tra với tài khoản mặc định
    const account = defaultAccounts.find(
      acc => 
        acc.email === credentials.email && 
        acc.password === credentials.password
    );

    if (account) {
      // Trả về thông tin user và token nếu đăng nhập thành công
      return {
        user: {
          id: account.email,
          email: account.email,
          firstName: account.firstName,
          lastName: account.lastName,
          role: account.role
        },
        token: "fake-jwt-token" // Token giả lập
      };
    }

    // Nếu không tìm thấy tài khoản, ném lỗi
    throw new Error("Invalid email or password");
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
