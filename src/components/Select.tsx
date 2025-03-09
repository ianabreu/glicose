import { Picker, PickerProps } from '@react-native-picker/picker';
import { StyleSheet, Text, View } from 'react-native';

import { GlycemicRangeDTO } from '@/@types/GlycemicRange';
import { colors } from '@/constants/colors';

export interface SelectProps extends PickerProps {
  label?: string;
  options: GlycemicRangeDTO[];
}
function Select({ label, selectedValue, options, ...props }: SelectProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.input}>
        <Picker
          selectedValue={selectedValue}
          dropdownIconColor={colors.onSurface}
          dropdownIconRippleColor={colors.primary}
          mode="dialog"
          {...props}>
          {options.map((option, index) => (
            <Picker.Item
              color={colors.onSurface}
              key={index}
              label={option.description}
              value={index}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}
export { Select };

const styles = StyleSheet.create({
  container: {
    minHeight: 48,
    width: '100%',
    flexDirection: 'column',
    gap: 4,
  },
  label: {
    fontFamily: 'Bold',
    fontSize: 14,
    marginLeft: 16,
    color: colors.onSurface,
  },
  input: {
    margin: 0,
    minHeight: 48,
    borderRadius: 48,
    backgroundColor: colors.surface,
    paddingHorizontal: 8,
  },
});
