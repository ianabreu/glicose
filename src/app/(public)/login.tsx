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
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
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
      if (!name || name === '') {
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
          <View>
            <Image source={onBoardingImage} style={styles.image} resizeMode="contain" />
          </View>
          <Text style={styles.wellcome}>Bem vindo!</Text>
          <Text style={styles.label}>Insira seu nome para iniciar</Text>
          <Input
            placeholder="Digite seu nome"
            value={name}
            onChangeText={onChangeText}
            error={error}
          />
          <Button label="Entrar" disabled={loading} onPress={addUser} />
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
  wellcome: {
    fontFamily: 'Bold',
    textAlign: 'center',
    fontSize: 22,
    color: colors.onBackground,
  },
  label: {
    fontFamily: 'Medium',
    textAlign: 'center',
    fontSize: 16,
    color: colors.onBackground,
  },
});
