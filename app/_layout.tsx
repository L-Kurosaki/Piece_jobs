import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useLoadFonts } from './fonts';
import { useEffect } from 'react';
import { SplashScreen } from 'expo-router';

export default function RootLayout() {
  useFrameworkReady();
  
  // Keep the splash screen visible until fonts are loaded
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);
  
  const { fontsLoaded, error } = useLoadFonts();
  
  // Don't render anything until fonts are loaded
  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}