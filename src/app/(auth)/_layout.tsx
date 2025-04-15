import { Stack } from 'expo-router';

import { useAuth } from '@/contexts/AuthContext';

export default function AuthLayout() {
  const { isSignedIn } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="home"
        options={{
          headerTitle: 'Página Inicial',
        }}
        redirect={!isSignedIn}
      />
      <Stack.Screen
        name="new"
        options={{
          headerTitle: 'Nova Medição',
        }}
        redirect={!isSignedIn}
      />
      <Stack.Screen
        name="glicoseList"
        options={{
          headerTitle: 'Todos os registros',
        }}
        redirect={!isSignedIn}
      />
      <Stack.Screen
        name="profile"
        options={{
          headerTitle: 'Perfil',
        }}
        redirect={!isSignedIn}
      />
    </Stack>
  );
}
