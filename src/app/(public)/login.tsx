import Constanst from 'expo-constants';
import { Stack } from 'expo-router';
import { useState } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';

import onBoardingImage from '@/assets/onboarding.png';
import { Button } from '@/components/Button/index';
import { Input } from '@/components/Input';
import { Title } from '@/components/Title';
import { colors } from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';
import { UserServices } from '@/database/services';

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
      if (!name || name.trim() === '') {
        setError('Nome é obrigatório.');
        return;
      }
      setLoading(true);
      const user = await UserServices.create({ name });
      updateUser(user);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <Stack.Screen options={{ navigationBarColor: colors.background }} />

        <KeyboardAvoidingView style={styles.container}>
          <Image source={onBoardingImage} style={styles.image} resizeMode="contain" />
          <Title variant="header">Bem vindo!</Title>
          <Text style={styles.label}>Insira seu nome para iniciar</Text>
          <Input
            placeholder="Digite seu nome"
            value={name}
            onChangeText={onChangeText}
            error={error}
            label="Digite seu nome"
          />
          <View style={{ width: '100%' }}>
            <Button disabled={loading} onPress={addUser}>
              <Button.Text>Entrar</Button.Text>
            </Button>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: Constanst.statusBarHeight + 16,
    backgroundColor: colors.background,
    gap: 8,
  },

  image: {
    maxWidth: '80%',
  },
  label: {
    fontFamily: 'Medium',
    textAlign: 'center',
    fontSize: 16,
    color: colors.onBackground,
  },
});
