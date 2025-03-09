import DatePicker from 'react-native-date-picker';

import { colors } from '@/constants/colors';
interface DateTimeModalProps {
  date: Date;
  isOpen: boolean;
  onCloseModal: (isOpen: boolean) => void;
  onDateChange: (date: Date) => void;
}
export function DateTimeModal({ date, isOpen, onDateChange, onCloseModal }: DateTimeModalProps) {
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
