import 'react-native-get-random-values';
import '@/styles/global.css';

import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar, View } from 'react-native';

import { AuthProvider, useAuth } from '@/contexts/AuthContext';

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    console.log('User: ', isSignedIn);
    const inAuthGroup = segments[0] === '(auth)';

    if (isSignedIn && !inAuthGroup) {
      router.replace('/home');
    } else if (!isSignedIn) {
      router.replace('/login');
    }
  }, [isSignedIn]);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar backgroundColor="#FFFCFF" barStyle="dark-content" />
      <InitialLayout />
    </AuthProvider>
  );
}
