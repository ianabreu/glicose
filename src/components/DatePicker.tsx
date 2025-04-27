import { Pressable, Text, View } from 'react-native';
import DatePicker from 'react-native-date-picker';

import { colors } from '@/constants/colors';

interface DateTimeModalProps {
  date?: Date;
  isOpen: boolean;
  onCloseModal: (isOpen: boolean) => void;
  onDateChange: (date: Date) => void;
  error?: string;
  title?: string;
}
export function DateTimeModal({
  date = new Date(),
  isOpen,
  onDateChange,
  onCloseModal,
}: DateTimeModalProps) {
  function handleDateChange(date: Date) {
    onDateChange(date);
  }
  return (
    <DatePicker
      modal
      mode="datetime"
      open={isOpen}
      date={date}
      onConfirm={(date) => {
        onCloseModal(false);
        handleDateChange(date);
      }}
      onCancel={() => {
        onCloseModal(false);
      }}
      title="Selecione data e hora"
      confirmText="Confirmar"
      cancelText="Cancelar"
      dividerColor={colors.border}
      maximumDate={new Date()}
    />
  );
}
export function DatePickerUI({
  date,
  isOpen,
  onDateChange,
  onCloseModal,
  error,
  title = 'Selecione a data',
}: DateTimeModalProps) {
  function handleDateChange(date: Date) {
    onDateChange(date);
  }
  return (
    <View>
      <Pressable
        onPress={() => onCloseModal(true)}
        style={{
          backgroundColor: colors.surface,
          padding: 12,
          borderWidth: 1,
          borderColor: error ? colors.error : colors.border,
          borderRadius: 8,
        }}>
        {date ? (
          <Text style={{ fontFamily: 'Normal' }}>{date.toLocaleDateString('pt-BR')}</Text>
        ) : (
          <Text style={{ fontFamily: 'Normal', color: colors.placeholderOnSurface }}>
            DD//MM//YYYY
          </Text>
        )}
      </Pressable>

      <DatePicker
        modal
        mode="date"
        open={isOpen}
        date={date || new Date()}
        onConfirm={(date) => {
          onCloseModal(false);
          handleDateChange(date);
        }}
        onCancel={() => {
          onCloseModal(false);
        }}
        title={title}
        confirmText="Confirmar"
        cancelText="Cancelar"
      />
    </View>
  );
}
