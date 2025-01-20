import { createContext, useContext, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const { user: authUser } = useAuth();
  const [profileData, setProfileData] = useState(() => {
    const savedProfile = localStorage.getItem('profileData');
    return savedProfile ? JSON.parse(savedProfile) : {
      name: authUser?.name || '',
      avatar: authUser?.avatar || '',
      email: authUser?.email || '',
      phone: '',
      location: '',
      joinDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
      bio: '',
      stats: {
        reviews: 0,
        favorites: 0,
        blogs: 0
      },
      social: {
        linkedin: '',
        facebook: '',
        twitter: '',
        instagram: ''
      },
      role: authUser?.role || 'user'
    };
  });

  const updateProfile = useCallback(async (newData) => {
    try {
      // Khi có API thật sẽ gọi API ở đây
      // const response = await api.put('/profile', newData);
      
      const updatedData = { ...profileData, ...newData };
      setProfileData(updatedData);
      localStorage.setItem('profileData', JSON.stringify(updatedData));
      
      return { success: true };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { success: false, error: error.message };
    }
  }, [profileData]);

  const value = {
    profileData,
    updateProfile
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext); 