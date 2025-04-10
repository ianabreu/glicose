import { Text, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { colors } from '@/constants/colors';

export interface BadgeProps extends TouchableOpacityProps {
  active?: boolean;
}
function Badge({ children, active = false, ...props }: BadgeProps) {
  return (
    <TouchableOpacity
      style={[
        styles.badgeDefault,
        active
          ? {
              backgroundColor: colors.secondary,
              borderColor: colors.secondary,
            }
          : { backgroundColor: colors.background, borderColor: colors.secondary },
      ]}
      {...props}>
      <Text
        style={[styles.text, active ? { color: colors.onSecondary } : { color: colors.secondary }]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

export { Badge };

const styles = StyleSheet.create({
  badgeDefault: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
  },
  text: {
    fontFamily: 'Medium',
    textAlign: 'center',
    fontSize: 14,
    padding: 8,
  },
});
