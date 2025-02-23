import { Stack } from 'expo-router';

import { useAuth } from '@/contexts/AuthContext';

export default function AuthLayout() {
  const { isSignedIn } = useAuth();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="home"
        options={{
          headerTitle: 'Home',
        }}
        redirect={!isSignedIn}
      />
    </Stack>
  );
}
