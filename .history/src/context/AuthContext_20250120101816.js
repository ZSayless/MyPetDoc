import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import i18n from "../i18n";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    avatar: "",
    role: "user",
    social: {},
    stats: {
      reviews: 0,
      favorites: 0,
      blogs: 0,
    },
  });
  const [loading, setLoading] = useState(true);
  const [currentLang, setCurrentLang] = useState(() => {
    // Lấy ngôn ngữ từ localStorage, nếu không có thì lấy từ i18n hoặc mặc định là 'vi'
    return localStorage.getItem("language") || i18n.language || "vi";
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Khôi phục ngôn ngữ khi component mount
    const savedLang = localStorage.getItem("language");
    if (savedLang) {
      i18n.changeLanguage(savedLang);
      setCurrentLang(savedLang);
    }

    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser({
        ...user,
        ...JSON.parse(savedUser),
      });
    }
    setLoading(false);
  }, []); // Chỉ chạy một lần khi component mount

  const login = async (userData) => {
    try {
      // BE sẽ trả về userData đã bao gồm role
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const changeLang = (lang) => {
    // Cập nhật ngôn ngữ trong i18n và localStorage
    i18n.changeLanguage(lang);
    setCurrentLang(lang);
    localStorage.setItem("language", lang);
    // Đảm bảo language detector cũng được cập nhật
    window.localStorage.setItem('i18nextLng', lang);
  };

  const updateUser = async (userData) => {
    try {
      // Cập nhật thông tin user trong localStorage
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const updatedUser = {
        ...currentUser,
        ...userData,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      return true;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      // userData đã bao gồm role được chọn khi đăng ký
      const newUser = {
        ...userData,
        createdAt: new Date().toISOString(),
        stats: {
          reviews: 0,
          favorites: 0,
          blogs: 0,
        },
        social: {},
      };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      return newUser;
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  };

  const value = {
    user,
    setUser,
    loading,
    currentLang,
    changeLang,
    login,
    logout,
    isAuthenticated: !!user,
    updateUser,
    register,
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
