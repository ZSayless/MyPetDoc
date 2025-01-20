import api from './api';

export const authService = {
  login: async (credentials) => {
    try {
      // Khi có API thật, uncomment đoạn này
      // const response = await api.post('/auth/login', credentials);
      // return response.data;

      // Mock login logic
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Mock users database
          const mockUsers = {
            "admin@mypetdoc.com": {
              password: "admin123",
              user: {
                id: 1,
                name: "Admin User",
                email: "admin@mypetdoc.com",
                role: "admin"
              }
            },
            "user@mypetdoc.com": {
              password: "user123",
              user: {
                id: 2,
                name: "Normal User",
                email: "user@mypetdoc.com",
                role: "user"
              }
            }
          };

          const mockUser = mockUsers[credentials.email];
          if (mockUser && mockUser.password === credentials.password) {
            resolve({
              user: mockUser.user,
              token: "mock_token_123"
            });
          } else {
            reject(new Error("Invalid credentials"));
          }
        }, 500);
      });
    } catch (error) {
      console.error("Login error:", error);
      throw error;
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
              role: userData.role || "user"
            },
            token: "mock_token_" + Date.now()
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
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  }
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
