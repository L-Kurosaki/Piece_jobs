import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useLoadFonts } from './fonts';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { router } from 'expo-router';

export default function RootLayout() {
  useFrameworkReady();
  const { fontsLoaded, error } = useLoadFonts();
  const { user, loading } = useAuth();
  
  // Don't render anything until fonts are loaded
  if (!fontsLoaded && !error) {
    return null;
  }

  // Handle authentication routing
  useEffect(() => {
    if (!loading) {
      if (user) {
        // User is authenticated, redirect to main app
        router.replace('/(tabs)');
      } else {
        // User is not authenticated, redirect to login
        router.replace('/(auth)/login');
      }
    }
  }, [user, loading]);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}