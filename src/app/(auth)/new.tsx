import { Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  BackHandler,
  Keyboard,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

import { CreateGlucoseDTO } from '@/@types/Glucose';
import { Button } from '@/components/Button';
import { DateTimeModal } from '@/components/DatePicker';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { colors } from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';
import { useGlucose } from '@/contexts/GlucoseContext';
import { GlucoseServices } from '@/database/services';

export default function New() {
  const { id }: { id: string } = useLocalSearchParams();
  const router = useRouter();

  const { updateGlucoseRecord, addGlucoseRecord, glycemicRanges } = useGlucose();

  useEffect(() => {
    const backAction = () => {
      if (router.canGoBack()) {
        router.back();
        return true;
      }

      Alert.alert('Sair', 'Deseja fechar o aplicativo?', [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', onPress: () => BackHandler.exitApp() },
      ]);

      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  const { user } = useAuth();
  const [selectedGlycemicRangeIndex, setSelectedGlycemicRangeIndex] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState(new Date());
  const [openDateModal, setOpenDateModal] = useState(false);

  const [value, setValue] = useState('');
  const [notes, setNotes] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (id) {
      GlucoseServices.getById(id).then((value) => {
        setSelectedGlycemicRangeIndex(() =>
          glycemicRanges.findIndex(({ id }) => id === value.glycemicRangeId)
        );
        setDate(value.date);
        setValue(String(value.valueInMgDl));
        setNotes(value.notes || '');
        setIsEdit(true);
      });
    }
  }, [id]);
  const handleChangeText = (text: string) => {
    if (text.length > 3) {
      return;
    }
    const onlyNumbers = text.replace(/\D/g, '');
    setValue(onlyNumbers);
  };

  async function onSave() {
    setLoading(true);
    if (!value || isNaN(parseFloat(value)) || parseFloat(value) < 18 || parseFloat(value) > 630) {
      Toast.show({
        type: 'error',
        text1: 'Valor inválido',
        text2: `Min. 18 mg/dl Máx. 630 mg/dl`,
        text1Style: { fontFamily: 'Bold', fontSize: 18, color: colors.error },
        text2Style: { fontFamily: 'Medium', fontSize: 16, color: colors.error },
      });
      setLoading(false);
      return;
    }
    const data: CreateGlucoseDTO = {
      date,
      glycemicRangeId: glycemicRanges[selectedGlycemicRangeIndex].id,
      valueInMgDl: parseFloat(value),
      notes: notes.trim(),
      userId: user?.uid as string,
    };

    try {
      if (isEdit) {
        await updateGlucoseRecord({ id, ...data });
        setLoading(false);
        router.back();
      } else {
        await addGlucoseRecord(data);
        setLoading(false);
        router.push('/(auth)/home');
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  function handleBack() {
    if (router.canGoBack()) {
      router.back();
    } else {
      Alert.alert('Atenção', 'Você já está na primeira tela!');
    }
  }

  function handleSelectChange(valueIndex: number) {
    setSelectedGlycemicRangeIndex(valueIndex);
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <LinearGradient
        style={styles.container}
        colors={[colors.gradient[0], colors.gradient[1], colors.gradient[2]]}>
        <Stack.Screen options={{ navigationBarColor: colors.gradient[2] }} />
        <StatusBar barStyle="light-content" />

        {/**************************Header*********************/}
        <View style={styles.headerArea}>
          {router.canGoBack() && (
            <TouchableOpacity style={styles.iconButton} onPress={handleBack}>
              <Feather name="arrow-left" size={30} color={colors.onPrimary} />
            </TouchableOpacity>
          )}
          <Text style={styles.title}>
            {isEdit ? 'EDITAR' : router.canGoBack() ? 'Nova Medição' : 'Primeira Medição'}
          </Text>
        </View>
        {/**************************Fim*Header*********************/}

        {/**************************Valor Glicose*********************/}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: 'center', marginBottom: 16 }}>
            <TextInput
              value={value}
              keyboardType="numeric"
              onChangeText={handleChangeText}
              placeholder="80"
              placeholderTextColor={colors.placeholderOnPrimary}
              style={styles.inputValue}
            />
            <Text style={styles.unit}>mg/dl</Text>
          </View>
          {/**************************Fim*Valor Glicose*********************/}

          {/**************************Form Glicose*********************/}
          <View
            style={{
              backgroundColor: colors.background,
              padding: 16,
              borderRadius: 8,
              alignItems: 'center',
              gap: 16,
            }}>
            <Pressable style={{ width: '100%' }} onPress={() => setOpenDateModal(true)}>
              <Input label="Data" value={date.toLocaleString()} editable={false} />
            </Pressable>
            <Select
              selectedValue={selectedGlycemicRangeIndex}
              onValueChange={(itemValue, itemIndex) => handleSelectChange(itemIndex)}
              label="Condição"
              options={glycemicRanges}
            />
            <Input
              value={notes}
              onChangeText={setNotes}
              label="Observações"
              placeholder="(opcional)"
              multiline
              maxLength={100}
            />

            <View style={{ flex: 1, width: '100%' }}>
              <Button onPress={onSave} activeOpacity={0.8} loading={loading}>
                <Button.Text>{isEdit ? 'Editar' : 'Salvar'}</Button.Text>
                <Button.Icon name="floppy" />
              </Button>
            </View>
          </View>
        </ScrollView>
        <DateTimeModal
          date={date}
          isOpen={openDateModal}
          onDateChange={setDate}
          onCloseModal={setOpenDateModal}
        />
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
  unit: {
    textAlign: 'right',
    width: '30%',
    fontFamily: 'Medium',
    color: colors.onPrimary,
    fontSize: 18,
  },
});
