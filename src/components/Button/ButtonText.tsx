import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';

import { useButtonContext } from './ButtonContext';

import { colors } from '@/constants/colors';

type ButtonTextProps = {
  children: React.ReactNode;
} & TextProps;

export function ButtonText({ children, style, ...textProps }: ButtonTextProps) {
  const { loading, variant } = useButtonContext();

  return (
    <Text
      style={[
        styles.text,
        loading && { opacity: 0.8 },
        variant === 'outline' ? styles.outline : styles.filled,
        style,
      ]}
      {...textProps}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Medium',
    textAlign: 'center',
    fontSize: 16,
  },
  filled: {
    color: colors.onSecondary,
  },
  outline: {
    color: colors.secondary,
  },
});
