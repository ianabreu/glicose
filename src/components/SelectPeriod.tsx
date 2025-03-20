import { useState } from 'react';
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { colors } from '@/constants/colors';

export interface SelectPeriodProps {
  label: string;
  options: string[];
}
function SelectPeriod({ label, options }: SelectPeriodProps) {
  const [openModal, setOpenModal] = useState(false);
  function handleToggleModal() {
    setOpenModal(!openModal);
  }
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handleToggleModal()}
        style={styles.button}>
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>

      <Modal visible={openModal} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => handleToggleModal()}>
          <View style={styles.overlay}>
            <View style={styles.content}>
              <Text style={styles.header}>Escolha um período</Text>
              {options &&
                options.map((option, index) => (
                  <TouchableOpacity key={index}>
                    <Text>{option}</Text>
                  </TouchableOpacity>
                ))}
              <TextInput value="12/02/2025" />
              <TextInput value="12/03/2025" />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
export { SelectPeriod };

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.border,
    borderRadius: 50,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: 'Medium',
    fontSize: 12,
    color: colors.onSurface,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
    width: '80%',
    borderRadius: 8,
    gap: 16,
    backgroundColor: colors.background,
  },
  header: {
    fontFamily: 'Medium',
    fontSize: 18,
    textAlign: 'center',
    color: colors.onBackground,
    borderBottomColor: colors.border,
    paddingBottom: 8,
    borderBottomWidth: 1,
  },
});
