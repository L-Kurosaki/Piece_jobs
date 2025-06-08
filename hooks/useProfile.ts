import { useState, useEffect } from 'react';
import { getProfile, createProfile, updateProfile } from '../utils/supabaseClient';
import { useAuth } from './useAuth';

export interface Profile {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'provider' | 'both';
  avatar_url?: string;
  bio?: string;
  location: any;
  rating: any;
  skills: any[];
  verification_status: any;
  member_since: string;
  completed_jobs: number;
  active_jobs: number;
}

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadProfile();
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await getProfile(user.id);
      
      if (error) {
        setError(error.message);
      } else {
        setProfile(data);
      }
    } catch (err) {
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const createUserProfile = async (profileData: Partial<Profile>) => {
    if (!user) return { success: false, error: 'No user found' };

    try {
      setLoading(true);
      const { data, error } = await createProfile({
        user_id: user.id,
        ...profileData,
      });
      
      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }
      
      setProfile(data);
      return { success: true, data };
    } catch (err) {
      const errorMessage = 'Failed to create profile';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (updates: Partial<Profile>) => {
    if (!user) return { success: false, error: 'No user found' };

    try {
      setLoading(true);
      const { data, error } = await updateProfile(user.id, updates);
      
      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }
      
      setProfile(data);
      return { success: true, data };
    } catch (err) {
      const errorMessage = 'Failed to update profile';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    loading,
    error,
    createProfile: createUserProfile,
    updateProfile: updateUserProfile,
    refreshProfile: loadProfile,
  };
};