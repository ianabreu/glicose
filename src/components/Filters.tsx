import { subDays, compareAsc } from 'date-fns';
import { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, View } from 'react-native';

import { Badge } from './Badge';
import { Button } from './Button';
import { DatePickerUI } from './DatePicker';

import { colors } from '@/constants/colors';
import { PeriodProps, PeriodType, useGlucose } from '@/contexts/GlucoseContext';

interface FiltersProps {
  closeModal: () => void;
}

export function Filters({ closeModal }: FiltersProps) {
  const { glycemicRanges, setFilters, selectedGlycemicRange, periodTypes } = useGlucose();

  const [selectedPeriod, setSelectedPeriod] = useState<PeriodProps | undefined>();

  const [selectedConditions, setSelectedConditions] = useState<string[]>(
    selectedGlycemicRange.length === 0 ? glycemicRanges.map((g) => g.id) : selectedGlycemicRange
  );
  const [selectedPeriodType, setSelectedPeriodType] = useState<PeriodType | undefined>();

  const [openCalendarModal, setOpenCalendarModal] = useState<boolean>(false);
  const [initialDateModal, setInitialDateModal] = useState<boolean>(false);
  const [finalDateModal, setFinalDateModal] = useState<boolean>(false);
  const [initialDate, setInitialDate] = useState<Date | undefined>();
  const [finalDate, setFinalDate] = useState<Date | undefined>();

  function handleChangePeriod(periodType: PeriodType) {
    const today = new Date();
    switch (periodType) {
      case 'Últimos 3 Dias':
        setSelectedPeriod({ startDate: subDays(today, 3), endDate: today });
        setSelectedPeriodType(periodType);
        break;
      case 'Últimos 7 Dias':
        setSelectedPeriod({ startDate: subDays(today, 7), endDate: today });
        setSelectedPeriodType(periodType);
        break;
      case 'Últimos 14 Dias':
        setSelectedPeriod({ startDate: subDays(today, 14), endDate: today });
        setSelectedPeriodType(periodType);
        break;
      case 'Últimos 30 Dias':
        setSelectedPeriod({ startDate: subDays(today, 30), endDate: today });
        setSelectedPeriodType(periodType);
        break;
      case 'Personalizado':
        toggleCalendarModal();
        break;
      default:
        break;
    }
  }
  function handleSelectCondition(conditionId: string) {
    const conditionIndex = selectedConditions.findIndex((condition) => condition === conditionId);
    if (conditionIndex > -1) {
      setSelectedConditions((prev) => prev.filter((condition) => condition !== conditionId));
      return;
    }
    setSelectedConditions((prev) => [...prev, conditionId]);
  }

  function handleClose() {
    closeModal();
  }
  function toggleCalendarModal() {
    setInitialDate(undefined);
    setFinalDate(undefined);
    setOpenCalendarModal(!openCalendarModal);
  }

  function handleConfirmCustomDate() {
    if (!initialDate || !finalDate) {
      Alert.alert('Data inválida', 'Selecione as datas para continuar', [
        { style: 'cancel', text: 'Continuar' },
      ]);
      return;
    }
    if (compareAsc(initialDate, finalDate) === 1) {
      Alert.alert('Data inválida', 'Data final precisa ser maior que Data Inicial', [
        { style: 'cancel', text: 'Continuar' },
      ]);
    }
    setSelectedPeriod({ startDate: initialDate, endDate: finalDate });
    setSelectedPeriodType('Personalizado');
    toggleCalendarModal();
  }
  return (
    <View style={styles.overlay}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Filtros</Text>
          <Button variant="outline" onPress={handleClose}>
            <Button.Icon name="close" />
          </Button>
        </View>
        <View style={{ gap: 16 }}>
          <Text style={styles.subtitle}>Período</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
            {periodTypes &&
              periodTypes.map((period) => (
                <Badge
                  key={period}
                  onPress={() => handleChangePeriod(period)}
                  active={period === selectedPeriodType}>
                  {period}
                </Badge>
              ))}
          </View>
        </View>
        <View style={{ gap: 16 }}>
          <Text style={styles.subtitle}>Condição</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {glycemicRanges &&
              glycemicRanges.map((condition) => (
                <Badge
                  active={selectedConditions.includes(condition.id)}
                  key={condition.id}
                  onPress={() => handleSelectCondition(condition.id)}>
                  {condition.description}
                </Badge>
              ))}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 32,
            gap: 16,
          }}>
          <Button
            variant="outline"
            onPress={() => {
              handleClose();
            }}>
            <Button.Text>Cancelar</Button.Text>
          </Button>
          <Button
            variant="filled"
            onPress={() => {
              setFilters({ selectedPeriod, selectedPeriodType, glycemicRange: selectedConditions });
              handleClose();
            }}>
            <Button.Icon name="filter" />
            <Button.Text>Filtrar</Button.Text>
          </Button>
        </View>
        <Modal visible={openCalendarModal} transparent animationType="fade">
          <View style={styles.overlay}>
            <View style={styles.contentArea}>
              <Text style={styles.title}>Filtrar por data:</Text>
              <Text style={[styles.subtitle, { marginVertical: 2 }]}>Data Inicial</Text>
              <DatePickerUI
                date={initialDate}
                isOpen={initialDateModal}
                onCloseModal={setInitialDateModal}
                onDateChange={setInitialDate}
              />

              <Text style={[styles.subtitle, { marginVertical: 2 }]}>Data Final</Text>

              <DatePickerUI
                date={finalDate}
                isOpen={finalDateModal}
                onCloseModal={setFinalDateModal}
                onDateChange={setFinalDate}
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Button
                  variant="outline"
                  onPress={() => {
                    setInitialDate(undefined);
                    setFinalDate(undefined);
                    toggleCalendarModal();
                  }}>
                  <Button.Icon name="close" />
                  <Button.Text>Cancelar</Button.Text>
                </Button>

                <Button onPress={handleConfirmCustomDate}>
                  <Button.Icon name="check" />
                  <Button.Text>Confirmar</Button.Text>
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: colors.background,
    padding: 16,
    margin: 16,
    borderRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  title: {
    fontFamily: 'Medium',
    fontSize: 20,
    color: colors.primary,
  },
  subtitle: {
    fontFamily: 'Bold',
    fontSize: 18,
    color: colors.onBackground,
    opacity: 0.8,
    marginVertical: 12,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentArea: {
    padding: 16,
    width: '90%',
    borderRadius: 8,
    gap: 16,
    backgroundColor: colors.background,
  },
});
