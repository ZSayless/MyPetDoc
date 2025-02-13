import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Kiểm tra localStorage khi khởi tạo
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    return savedUser
      ? { user: JSON.parse(savedUser), token: savedToken }
      : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  const login = (data) => {
    console.log("Login data received:", data);

    // Xử lý cấu trúc dữ liệu từ cả login thường và Google login
    let userData, token;

    if (data.status === "success") {
      // Login thường
      userData = data.data.user;
      token = data.data.token;
    } else {
      // Google login
      userData = data.user;
      token = data.token;
    }

    // Kiểm tra và làm sạch dữ liệu trước khi lưu
    if (userData && token) {
      // Loại bỏ các trường không cần thiết hoặc nhạy cảm
      const cleanedUser = {
        id: userData.id,
        email: userData.email,
        full_name: userData.full_name,
        role: userData.role,
        phone_number: userData.phone_number,
        avatar: userData.avatar,
        hospital_id: userData.hospital_id,
      };

      // Lưu vào localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(cleanedUser));

      // Cập nhật state
      setUser({
        user: cleanedUser,
        token: token,
      });

      console.log("Data saved to localStorage and context:", {
        user: cleanedUser,
        token: token,
      });

      setIsAuthenticated(true);
    } else {
      console.error("Invalid login data structure:", data);
    }
  };

  const logout = () => {
    // Xóa dữ liệu khỏi localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Reset state
    setUser(null);
    setIsAuthenticated(false);

    console.log("Logged out - data cleared");
  };

  // Thêm hàm updateUser
  const updateUser = (updates) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updates,
    }));
  };

  const value = {
    user: user?.user,
    token: user?.token,
    isAuthenticated,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
