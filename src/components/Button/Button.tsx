import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
  ActivityIndicator,
} from 'react-native';

import { ButtonContext } from './ButtonContext';

import { colors } from '@/constants/colors';

type ButtonProps = {
  children: React.ReactNode;
  loading?: boolean;
  variant?: 'filled' | 'outline';
} & TouchableOpacityProps;

export function Button({
  children,
  loading = false,
  variant = 'filled',
  style,
  ...touchableOpacityProps
}: ButtonProps) {
  return (
    <ButtonContext.Provider value={{ loading, variant }}>
      <TouchableOpacity
        style={[styles.base, variant === 'outline' ? styles.outline : styles.filled, style]}
        disabled={loading}
        {...touchableOpacityProps}>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={variant === 'outline' ? colors.secondary : colors.onPrimary}
          />
        ) : (
          children
        )}
      </TouchableOpacity>
    </ButtonContext.Provider>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
    minHeight: 45,
  },
  filled: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: colors.secondary,
  },
});
