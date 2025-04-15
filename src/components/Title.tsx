import { StyleSheet, Text, TextProps } from 'react-native';

import { colors } from '@/constants/colors';
interface TitleProps extends TextProps {
  variant?: keyof typeof styles;
}

export function Title({ variant = 'title', children, style, ...rest }: TitleProps) {
  return (
    <Text style={[styles[variant], style]} {...rest}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: 'Medium',
    color: colors.primary,
  },
  header: {
    fontSize: 24,
    fontFamily: 'Bold',
    color: colors.primary,
  },
});
