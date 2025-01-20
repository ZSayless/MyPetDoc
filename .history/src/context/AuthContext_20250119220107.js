import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import i18n from "../i18n";
import { useUser } from '../hooks/useUser';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const {
    user,
    loading,
    updateProfile,
    updateAvatar,
    updatePassword,
    updateSocialMedia
  } = useUser(null);
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
      // This is handled by useUser now
    }
  }, []); // Chỉ chạy một lần khi component mount

  const login = async (userData) => {
    try {
      // BE sẽ trả về userData đã bao gồm role
      // This is handled by useUser now
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    // This is handled by useUser now
  };

  const changeLang = (lang) => {
    // Cập nhật ngôn ngữ trong i18n và localStorage
    i18n.changeLanguage(lang);
    setCurrentLang(lang);
    localStorage.setItem("language", lang);
  };

  const updateUser = async (userData) => {
    try {
      // Cập nhật thông tin user trong localStorage
      // This is handled by useUser now
      return true;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      // userData đã bao gồm role được chọn khi đăng ký
      // This is handled by useUser now
      return userData;
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    updateProfile,
    updateAvatar,
    updatePassword,
    updateSocialMedia,
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
