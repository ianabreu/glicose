import { useState } from 'react';
import { Text, View, Image } from 'react-native';

import onBoardingImage from '@/assets/onboarding.png';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useAuth } from '@/contexts/AuthContext';
import { createUser } from '@/services/database';

export default function LoginPage() {
  const { updateUser } = useAuth();
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  function onChangeText(text: string) {
    setName(text);
    if (text !== '' && error !== '') {
      setError('');
    }
  }

  async function addUser() {
    try {
      if (!name || name === '') {
        setError('Digite seu nome.');
        return;
      }
      setLoading(true);
      const user = await createUser({ name });
      updateUser(user);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="flex-1 items-center justify-center gap-4 bg-background px-4">
      <View className="h-full max-h-64 w-full max-w-64">
        <Image source={onBoardingImage} className="h-full w-full" resizeMode="contain" />
      </View>
      <Text className="text-center text-4xl font-bold">Bem vindo!</Text>
      <Text className="text-center text-xl">Insira seu nome para iniciar</Text>
      <Input value={name} onChangeText={onChangeText} error={error} />
      <Button size="lg" label="Entrar" onPress={addUser} disabled={loading} />
    </View>
  );
}
