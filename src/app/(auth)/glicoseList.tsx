import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Modal, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { Button } from '@/components/Button';
import { Filters } from '@/components/Filters';
import { Item } from '@/components/Item';
import { colors } from '@/constants/colors';
import { useGlucose } from '@/contexts/GlucoseContext';
import { GlucoseServices } from '@/database/services';
import { useConfirm } from '@/hooks/useConfirm';

export default function GlicoseList() {
  const { glucoseRecords, getGlucoseRecords } = useGlucose();
  const { Confirm, confirm } = useConfirm();
  const [openFiltersModal, setOpenFiltersModal] = useState(false);
  const router = useRouter();

  function handleCloseFilters() {
    setOpenFiltersModal(false);
  }
  function openFilters() {
    setOpenFiltersModal(true);
  }

  async function handleDelete(id: string) {
    const isConfirmed = await confirm({
      title: 'Excluir',
      message: 'Tem certeza que deseja excluir?',
    });
    if (isConfirmed) {
      const isDeleted = await GlucoseServices.delete(id);
      if (isDeleted) {
        Toast.show({
          type: 'success',
          text1: 'Sucesso ao deletar',
        });
      }
      getGlucoseRecords();
    }
  }
  async function handleEdit(id: string) {
    const isConfirmed = await confirm({
      title: 'Editar',
      message: 'Tem certeza que deseja editar esse resultado?',
      confirmText: 'Editar',
      cancelText: 'Voltar',
    });
    if (isConfirmed) {
      router.push({ pathname: '/(auth)/new', params: { id } });
    }
  }
  return (
    <View style={styles.container}>
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
      <Button
        label="Filtrar resultados"
        variant="stroke"
        onPress={openFilters}
        icon={<MaterialCommunityIcons name="filter" color={colors.secondary} size={20} />}
      />

      <Modal visible={openFiltersModal} transparent animationType="slide">
        <Filters closeModal={handleCloseFilters} />
      </Modal>

      <FlatList
        data={glucoseRecords}
        renderItem={({ item }) => (
          <Item data={item} deleteItem={handleDelete} editItem={handleEdit} />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
      />
      {Confirm}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
  },
});
