import { useState, useCallback } from 'react';
import { userService } from '../services/userService';
import { useToast } from '../context/ToastContext';
import { useTranslation } from 'react-i18next';

export const useUser = (initialUser) => {
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const { t } = useTranslation();

  const updateProfile = useCallback(async (userData) => {
    setLoading(true);
    try {
      const updatedUser = await userService.updateProfile(userData);
      setUser(updatedUser);
      showToast({
        type: 'success',
        message: t('profile.updateSuccess')
      });
      return updatedUser;
    } catch (error) {
      showToast({
        type: 'error',
        message: error.message
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [showToast, t]);

  const updateAvatar = useCallback(async (file) => {
    setLoading(true);
    try {
      const updatedUser = await userService.updateAvatar(file);
      setUser(updatedUser);
      showToast({
        type: 'success',
        message: t('profile.avatarUpdateSuccess')
      });
      return updatedUser;
    } catch (error) {
      showToast({
        type: 'error',
        message: error.message
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [showToast, t]);

  const updatePassword = useCallback(async (passwordData) => {
    setLoading(true);
    try {
      await userService.updatePassword(passwordData);
      showToast({
        type: 'success',
        message: t('profile.passwordUpdateSuccess')
      });
    } catch (error) {
      showToast({
        type: 'error',
        message: error.message
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [showToast, t]);

  const updateSocialMedia = useCallback(async (socialData) => {
    setLoading(true);
    try {
      const updatedUser = await userService.updateSocialMedia(socialData);
      setUser(updatedUser);
      showToast({
        type: 'success',
        message: t('profile.socialUpdateSuccess')
      });
      return updatedUser;
    } catch (error) {
      showToast({
        type: 'error',
        message: error.message
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [showToast, t]);

  return {
    user,
    loading,
    updateProfile,
    updateAvatar,
    updatePassword,
    updateSocialMedia
  };
}; 