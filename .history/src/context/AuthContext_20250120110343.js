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
    const savedLang = localStorage.getItem("language");
    // Nếu có ngôn ngữ đã lưu, sử dụng nó ngay lập tức
    if (savedLang) {
      i18n.changeLanguage(savedLang);
      return savedLang;
    }
    // Nếu không, sử dụng ngôn ngữ mặc định
    return i18n.language || "vi";
  });
  const navigate = useNavigate();

  useEffect(() => {
    const initializeApp = async () => {
      // Khôi phục ngôn ngữ
      const savedLang = localStorage.getItem("language");
      if (savedLang) {
        await i18n.changeLanguage(savedLang);
        setCurrentLang(savedLang);
      }

      // Khôi phục thông tin user
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(prevUser => ({
          ...prevUser,
          ...JSON.parse(savedUser),
        }));
      }
      setLoading(false);
    };

    initializeApp();
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

  const changeLang = async (lang) => {
    try {
      await i18n.changeLanguage(lang);
      setCurrentLang(lang);
      localStorage.setItem("language", lang);
    } catch (error) {
      console.error("Error changing language:", error);
    }
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
