import { Picker } from '@react-native-picker/picker';
import { subDays, compareDesc, format } from 'date-fns';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Button } from '@/components/Button/index';
import { DatePickerUI } from '@/components/DatePicker';
import { Title } from '@/components/Title';
import { colors } from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';
import { useGlucose } from '@/contexts/GlucoseContext';
import { GlucoseServices } from '@/database/services';
import { exportToFile } from '@/utils/exportToFile';
export interface PeriodProps {
  startDate: Date;
  endDate: Date;
}
type OptionType = 'Últimos 7 Dias' | 'Últimos 14 Dias' | 'Últimos 30 Dias' | 'Personalizado';
interface Period {
  label: OptionType;
  value: number;
}
const options: Period[] = [
  { label: 'Últimos 7 Dias', value: 7 },
  { label: 'Últimos 14 Dias', value: 14 },
  { label: 'Últimos 30 Dias', value: 30 },
  { label: 'Personalizado', value: -1 },
] as const;
export default function ExportToFile() {
  const today = new Date();
  const { user } = useAuth();
  const { glycemicRanges } = useGlucose();
  const [initialDateModal, setInitialDateModal] = useState<boolean>(false);
  const [finalDateModal, setFinalDateModal] = useState<boolean>(false);
  const [activePeriod, setActivePeriod] = useState<Period>({ label: 'Últimos 7 Dias', value: 7 });
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodProps>({
    startDate: subDays(today, activePeriod.value),
    endDate: today,
  });
  const [loading, setLoading] = useState<boolean>(false);

  function handleSelectInterval(period: Period) {
    if (period.label === 'Personalizado') {
      setInitialDateModal(true);
    } else {
      setSelectedPeriod({ startDate: subDays(today, period.value), endDate: today });
      setActivePeriod(period);
    }
  }
  function setPeriod(date: Date, type: 'start' | 'end') {
    switch (type) {
      case 'start':
        setSelectedPeriod((prev) => ({ ...prev, startDate: date }));
        break;
      case 'end':
        setSelectedPeriod((prev) => ({ ...prev, endDate: date }));
        break;
      default:
        break;
    }
  }

  async function getResults() {
    setLoading(true);
    if (!user) {
      setLoading(false);
      return;
    }
    if (compareDesc(selectedPeriod.startDate, selectedPeriod.endDate) === -1) {
      Alert.alert('Datas inválidas', 'A data final deve ser maior que data inicial.', [
        { style: 'cancel', text: 'Voltar' },
      ]);
      setLoading(false);
      return;
    }

    const data = await GlucoseServices.getGlucoseRecordsByPeriodAndGlycemicRange({
      userId: user.uid,
      startDate: selectedPeriod.startDate,
      endDate: selectedPeriod.endDate,
    });
    if (!data || data.length === 0) {
      Alert.alert('Erro', 'Nenhum registro encontrado no período', [
        { style: 'cancel', text: 'Voltar' },
      ]);
      setLoading(false);
      return;
    }
    await exportToFile.toPDF(data, user, glycemicRanges, {
      start: format(selectedPeriod.startDate, 'dd/MM/yyyy'),
      end: format(selectedPeriod.endDate, 'dd/MM/yyyy'),
    });

    setLoading(false);
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
      <Title style={{ marginTop: 16 }}>Período de Análise</Title>

      <View style={styles.select}>
        <View style={styles.input}>
          <Picker
            selectedValue={activePeriod}
            onValueChange={handleSelectInterval}
            dropdownIconColor={colors.onSurface}
            dropdownIconRippleColor={colors.primary}
            mode="dropdown">
            {options.map((option, index) => (
              <Picker.Item
                color={colors.onSurface}
                key={index}
                label={option.label}
                value={option}
              />
            ))}
          </Picker>
        </View>
      </View>
      <Title>Data Inicial</Title>
      <DatePickerUI
        date={selectedPeriod.startDate}
        isOpen={initialDateModal}
        onCloseModal={setInitialDateModal}
        onDateChange={(date) => {
          setPeriod(date, 'start');
          setFinalDateModal(true);
        }}
        title="Data Inicial"
      />

      <Title>Data Final</Title>

      <DatePickerUI
        date={selectedPeriod.endDate}
        isOpen={finalDateModal}
        onCloseModal={setFinalDateModal}
        onDateChange={(date) => {
          setPeriod(date, 'end');
        }}
        title="Data Final"
      />

      <Button onPress={getResults} disabled={loading}>
        <Button.Icon name="file-outline" />
        <Button.Text>Gerar Relatório</Button.Text>
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    gap: 8,
  },
  select: {
    minHeight: 48,
    width: '100%',
    flexDirection: 'column',
    gap: 4,
  },
  input: {
    margin: 0,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
  },
});
