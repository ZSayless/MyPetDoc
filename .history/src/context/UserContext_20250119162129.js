import { createContext, useContext, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';

const UserContext = createContext();

export function UserProvider({ children }) {
  const { user: authUser } = useAuth();
  const [userData, setUserData] = useState(() => {
    const savedData = localStorage.getItem('userData');
    return savedData ? JSON.parse(savedData) : authUser;
  });

  const updateUserData = useCallback((newData) => {
    const updatedData = { ...userData, ...newData };
    setUserData(updatedData);
    localStorage.setItem('userData', JSON.stringify(updatedData));
  }, [userData]);

  const updateProfile = useCallback(async (data) => {
    try {
      // Khi có API thật, gọi API update profile ở đây
      // const response = await api.put('/user/profile', data);
      
      // Mock update
      updateUserData(data);
      return { success: true };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { success: false, error: error.message };
    }
  }, [updateUserData]);

  return (
    <UserContext.Provider value={{ userData, updateUserData, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext); 