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
  const navigate = useNavigate();

  useEffect(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    // Load saved language preference
    const savedLanguage = localStorage.getItem("language") || "vi";
    i18n.changeLanguage(savedLanguage);
    setLoading(false);
  }, []);

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

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
    // Force reload translations
    window.location.reload();
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
    changeLanguage,
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
