import { Stack } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
  Keyboard,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

import onBoardingImage from '@/assets/onboarding.png';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Option } from '@/components/Option';
import { Title } from '@/components/Title';
import { colors } from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';

export default function Profile() {
  const { user, updateProfile } = useAuth();

  const [openModal, setOpenModal] = useState(false);

  const [firstName, setFirstName] = useState(user?.name);
  const [lastName, setLastName] = useState(user?.lastName || '');

  function toogleModal() {
    setOpenModal(!openModal);
  }
  async function handleSave() {
    if (!firstName || firstName?.trim() === '') return;
    if (firstName === user?.name && lastName === user?.lastName) return;
    const isUpdated = await updateProfile({ name: firstName.trim(), lastName: lastName.trim() });
    if (isUpdated) {
      toogleModal();
      Keyboard.dismiss();
      Toast.show({ type: 'success', text1: 'Dados pessoais atualizados com sucesso!' });
    } else {
      Toast.show({ type: 'error', text1: 'Erro ao atualizar seus dados!' });
    }
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Stack.Screen
            options={{
              navigationBarColor: colors.background,
              headerShown: true,
              headerStyle: { backgroundColor: colors.background },
              headerTitleStyle: { fontSize: 20, fontFamily: 'Bold', color: colors.primary },
              animation: 'slide_from_right',
              headerBackVisible: true,
              headerTintColor: colors.primary,
            }}
          />
          <View style={styles.card}>
            <Image source={onBoardingImage} style={styles.image} resizeMode="contain" />
          </View>

          <Title>Dados Pessoais</Title>

          <View style={styles.card}>
            <Pressable style={{ width: '100%' }} onPress={toogleModal}>
              <Input value={user?.name || ''} label="Nome" placeholder="Nome" editable={false} />
              <Input
                value={user?.lastName || ''}
                label="Sobrenome"
                placeholder="Sobrenome"
                editable={false}
                onPress={toogleModal}
              />
            </Pressable>
          </View>

          <Title>Configurações</Title>
          <View style={styles.card}>
            <Option
              onPress={() => {
                Alert.alert(
                  'Em desenvolvimento!',
                  'Esta funcionalidade ainda está sendo criada. 🚧',
                  [{ text: 'Ok', onPress: () => console.log('Usuário fechou o alerta') }]
                );
              }}>
              <Option.Icon name="water" color={colors.error} />
              <Option.Text>Níveis de açúcar recomendados</Option.Text>
              <Option.Icon name="chevron-right" />
            </Option>
          </View>
        </ScrollView>

        <Modal visible={openModal} transparent animationType="fade">
          <Pressable
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
            onPress={Keyboard.dismiss}
          />
          <View style={[styles.card, { backgroundColor: colors.background, padding: 16 }]}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Title>Editar dados pessoais</Title>
              <Button onPress={toogleModal} variant="outline">
                <Button.Icon name="close" color={colors.primary} size={20} />
              </Button>
            </View>
            <Input value={firstName} onChangeText={setFirstName} label="Nome" placeholder="Nome" />
            <Input
              value={lastName}
              onChangeText={setLastName}
              label="Sobrenome"
              placeholder="Sobrenome"
            />
            <Button onPress={handleSave}>
              <Button.Icon name="floppy" />
              <Button.Text>Salvar</Button.Text>
            </Button>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: colors.background,
    marginBottom: 50,
  },
  card: {
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontFamily: 'Medium',
    fontSize: 20,
    textTransform: 'uppercase',
    color: colors.primary,
  },
  inputValue: {
    marginBottom: 8,
    minWidth: 72,
    borderBottomWidth: 4,
    borderColor: colors.primary,
    textAlign: 'center',
    fontSize: 100,
    color: colors.onPrimary,
    fontFamily: 'Bold',
  },
  image: {
    maxWidth: '100%',
    height: 200,
  },
  legend: {
    fontFamily: 'Medium',
    color: colors.primary,
    fontSize: 20,
    marginVertical: 8,
  },
});
