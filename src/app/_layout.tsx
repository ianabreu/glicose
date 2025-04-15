import 'react-native-get-random-values';
import { useFonts } from 'expo-font';
import { Slot, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';

import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { GlucoseProvider } from '@/contexts/GlucoseContext';

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (isSignedIn && !inAuthGroup) {
      router.replace('/home');
    } else if (!isSignedIn) {
      router.replace('/login');
    }
  }, [isLoaded, isSignedIn]);

  return (
    <GlucoseProvider>
      <Slot />
    </GlucoseProvider>
  );
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Normal: require('@/assets/fonts/NunitoSans_10pt-Regular.ttf'),
    Bold: require('@/assets/fonts/NunitoSans_10pt-Bold.ttf'),
    Medium: require('@/assets/fonts/NunitoSans_10pt-Medium.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <AuthProvider>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent />
      <InitialLayout />
      <Toast position="bottom" />
    </AuthProvider>
  );
}
