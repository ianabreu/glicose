import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';

import { colors } from '@/constants/colors';

type OptionTextProps = {
  children: React.ReactNode;
} & TextProps;

export function OptionText({ children, style, ...textProps }: OptionTextProps) {
  return (
    <Text style={[styles.text, style]} {...textProps}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Medium',
    textAlign: 'left',
    fontSize: 14,
    color: colors.onBackground,
    flex: 1,
  },
});
