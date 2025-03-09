import { forwardRef } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { colors } from '@/constants/colors';

export interface InputProps extends React.ComponentPropsWithoutRef<typeof TextInput> {
  label?: string;
  error?: string;
}
const Input = forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ label, error, ...props }, ref) => (
    <View style={styles.view}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        ref={ref}
        style={[
          styles.input,
          {
            color: error ? colors.error : colors.onSurface,
            borderColor: error ? colors.error : colors.surface,
          },
        ]}
        placeholderTextColor={colors.border}
        {...props}
      />
      {error && <Text style={[styles.helper, { color: error && colors.error }]}>{error}</Text>}
    </View>
  )
);

export { Input };

const styles = StyleSheet.create({
  view: {
    minHeight: 56,
    width: '100%',
    flexDirection: 'column',
    gap: 4,
  },
  input: {
    minHeight: 48,
    padding: 16,
    borderWidth: 1,
    borderRadius: 56,
    backgroundColor: colors.surface,
    fontFamily: 'Normal',
    fontSize: 16,
  },
  label: {
    fontFamily: 'Bold',
    paddingLeft: 16,
    fontSize: 14,
    color: colors.onSurface,
  },
  helper: {
    fontFamily: 'Medium',
    paddingLeft: 16,
    fontSize: 14,
  },
});
