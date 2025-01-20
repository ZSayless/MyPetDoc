import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import i18n from "../i18n";
import { defaultAdmin } from '../config/defaultAdmin';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentLang, setCurrentLang] = useState(() => {
    // Lấy ngôn ngữ từ localStorage, nếu không có thì lấy từ i18n hoặc mặc định là 'vi'
    return localStorage.getItem("language") || i18n.language || "vi";
  });
  const [error, setError] = useState(null);

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
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []); // Chỉ chạy một lần khi component mount

  const login = async (email, password) => {
    try {
      // Reset error
      setError(null);
      
      // Kiểm tra định dạng email
      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        throw new Error('Invalid email format');
      }

      // So sánh với thông tin admin mặc định
      if (email === defaultAdmin.email && password === defaultAdmin.password) {
        setUser(defaultAdmin);
        // Lưu session
        localStorage.setItem('user', JSON.stringify(defaultAdmin));
        return true;
      }

      // Nếu không phải admin mặc định, kiểm tra với API
      const response = await authService.login(email, password);
      if (response.success) {
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
        return true;
      }

      throw new Error('Invalid credentials');
    } catch (err) {
      setError(err.message);
      return false;
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
    error,
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
