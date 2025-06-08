import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, getCurrentUser, signIn, signUp, signOut } from '../utils/supabaseClient';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Get initial session
    getCurrentUser().then(({ user, error }) => {
      setAuthState({
        user,
        loading: false,
        error: error?.message || null,
      });
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setAuthState({
          user: session?.user || null,
          loading: false,
          error: null,
        });
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    const { data, error } = await signIn(email, password);
    
    if (error) {
      setAuthState(prev => ({ ...prev, loading: false, error: error.message }));
      return { success: false, error: error.message };
    }
    
    return { success: true, user: data.user };
  };

  const register = async (email: string, password: string, userData: any) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    const { data, error } = await signUp(email, password, userData);
    
    if (error) {
      setAuthState(prev => ({ ...prev, loading: false, error: error.message }));
      return { success: false, error: error.message };
    }
    
    return { success: true, user: data.user };
  };

  const logout = async () => {
    setAuthState(prev => ({ ...prev, loading: true }));
    
    const { error } = await signOut();
    
    if (error) {
      setAuthState(prev => ({ ...prev, loading: false, error: error.message }));
      return { success: false, error: error.message };
    }
    
    setAuthState({ user: null, loading: false, error: null });
    return { success: true };
  };

  return {
    ...authState,
    login,
    register,
    logout,
  };
};