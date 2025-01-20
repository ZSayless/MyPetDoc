import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import i18n from "../i18n";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const navigate = useNavigate();

  useEffect(() => {
    // Chỉ cần xử lý user data trong useEffect
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      // Đảm bảo user có đầy đủ thông tin cần thiết
      setUser({
        name: parsedUser.name || "User",
        email: parsedUser.email || "",
        avatar: parsedUser.avatar || "",
        role: parsedUser.role || "user",
        bio: parsedUser.bio || "",
        phone: parsedUser.phone || "",
        location: parsedUser.location || "",
        socialMedia: parsedUser.socialMedia || {},
        createdAt: parsedUser.createdAt || new Date().toISOString(),
        ...parsedUser
      });
    }
    setLoading(false);
  }, []);

  const login = async (userData) => {
    try {
      // Đảm bảo userData có đầy đủ thông tin
      const fullUserData = {
        name: userData.name || "User",
        email: userData.email || "",
        avatar: userData.avatar || "",
        role: userData.role || "user",
        bio: userData.bio || "",
        phone: userData.phone || "",
        location: userData.location || "",
        socialMedia: userData.socialMedia || {},
        createdAt: userData.createdAt || new Date().toISOString(),
        ...userData
      };
      setUser(fullUserData);
      localStorage.setItem("user", JSON.stringify(fullUserData));
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
    setCurrentLang(lang);
    localStorage.setItem("language", lang);
    i18n.changeLanguage(lang);
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
