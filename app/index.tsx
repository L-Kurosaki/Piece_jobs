import { useEffect } from 'react';
import { router } from 'expo-router';

export default function Index() {
  useEffect(() => {
    // Check if user is logged in (in a real app, check auth state)
    const isLoggedIn = false; // This would come from your auth state
    
    if (isLoggedIn) {
      router.replace('/(tabs)');
    } else {
      router.replace('/(auth)/login');
    }
  }, []);

  return null; // This component just redirects
}