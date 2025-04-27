import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';

import { useButtonContext } from './ButtonContext';

import { colors } from '@/constants/colors';

interface ButtonIconProps {
  name: keyof typeof MaterialCommunityIcons.glyphMap;
  size?: number;
  color?: string;
}

export function ButtonIcon({ name, size = 20, color }: ButtonIconProps) {
  const { variant } = useButtonContext();

  return (
    <MaterialCommunityIcons
      name={name}
      size={size}
      color={color ? color : variant === 'outline' ? colors.secondary : colors.onPrimary}
    />
  );
}
