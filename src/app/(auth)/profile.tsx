import { Feather, Entypo as Icon } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useNavigation } from 'expo-router';
import { useState } from 'react';
import {
  Keyboard,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { colors } from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';

export default function Profile() {
  const navigation = useNavigation();
  const { user } = useAuth();

  const [openModal, setOpenModal] = useState(false);

  const [firstName, setFirstName] = useState(user?.name);
  const [lastName, setLastName] = useState('');

  function handleBack() {
    navigation.goBack();
  }
  function toogleModal() {
    setOpenModal(!openModal);
  }
  function handleSave() {}
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <LinearGradient
        style={styles.container}
        colors={[colors.gradient[0], colors.gradient[1], colors.gradient[2]]}>
        <Stack.Screen options={{ navigationBarColor: colors.gradient[2] }} />
        <StatusBar barStyle="light-content" />

        {/**************************Header*********************/}
        <View style={styles.headerArea}>
          <TouchableOpacity style={styles.iconButton} onPress={handleBack}>
            <Feather name="arrow-left" size={30} color={colors.onPrimary} />
          </TouchableOpacity>
          <Text style={styles.title}>Perfil</Text>
        </View>
        {/**************************Fim*Header*********************/}

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.legend}>Dados Pessoais</Text>

          <View style={styles.card}>
            <Pressable style={{ width: '100%' }} onPress={toogleModal}>
              <Input
                value={firstName}
                onChangeText={setFirstName}
                label="Nome"
                placeholder="Nome"
                editable={false}
              />
              <Input
                value={lastName}
                onChangeText={setLastName}
                label="Sobrenome"
                placeholder="Sobrenome"
                editable={false}
                onPress={toogleModal}
              />
            </Pressable>
          </View>

          <Text style={styles.legend}>Configurações</Text>

          <View style={styles.card}>
            <View
              style={{
                flexDirection: 'row',
                gap: 8,
                width: '100%',
                alignItems: 'center',
                marginVertical: 2,
              }}>
              <Icon
                name="drop"
                style={{
                  backgroundColor: colors.level.diabetes[0],
                  padding: 8,
                  borderRadius: 100,
                  color: colors.onSecondary,
                  fontSize: 18,
                }}
              />
              <Text style={{ fontFamily: 'Normal', fontSize: 16 }}>
                Níveis de açúcar recomendados
              </Text>
            </View>
          </View>
        </ScrollView>
        <Modal visible={openModal} transparent animationType="fade">
          <Pressable
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
            onPress={Keyboard.dismiss}
          />
          <View style={[styles.card, { padding: 16 }]}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{ fontFamily: 'Bold', fontSize: 18, textAlign: 'center', flex: 1 }}>
                Dados Pessoais
              </Text>
              <Pressable
                onPress={toogleModal}
                style={{
                  padding: 8,
                  backgroundColor: colors.surface,
                  borderRadius: 50,
                }}>
                <Feather name="x" color={colors.onSurface} size={20} />
              </Pressable>
            </View>
            <Input value={firstName} onChangeText={setFirstName} label="Nome" placeholder="Nome" />
            <Input
              value={lastName}
              onChangeText={setLastName}
              label="Sobrenome"
              placeholder="Sobrenome"
            />
            <Button label="Salvar" onPress={handleSave} />
          </View>
        </Modal>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 16,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: colors.background,
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    gap: 8,
  },
  headerArea: {
    minHeight: 56,
    width: '100%',
    alignItems: 'center',
    gap: 16,
    flexDirection: 'row',
    marginBottom: 8,
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
  },
  title: {
    fontFamily: 'Medium',
    fontSize: 20,
    textTransform: 'uppercase',
    color: colors.onPrimary,
  },
  inputValue: {
    marginBottom: 8,
    minWidth: 72,
    borderBottomWidth: 4,
    borderColor: colors.onPrimary,
    textAlign: 'center',
    fontSize: 100,
    color: colors.onPrimary,
    fontFamily: 'Bold',
  },

  legend: {
    fontFamily: 'Medium',
    color: colors.onPrimary,
    fontSize: 20,
    marginVertical: 8,
  },
});
