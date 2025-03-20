import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { colors } from '@/constants/colors';

export interface ButtonProps extends React.ComponentPropsWithoutRef<typeof TouchableOpacity> {
  label: string;
  disabled?: boolean;
}
function Button({ label, disabled = false, ...props }: ButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.button} {...props}>
      {disabled ? (
        <ActivityIndicator color={colors.onSecondary} size={22} />
      ) : (
        <Text style={styles.text}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

export { Button };

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 56,
    width: '100%',
    minHeight: 48,
    backgroundColor: colors.secondary,
  },
  text: {
    fontFamily: 'Medium',
    textAlign: 'center',
    fontSize: 16,
    color: colors.onSecondary,
  },
});
