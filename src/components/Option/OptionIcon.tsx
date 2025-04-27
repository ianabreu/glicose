import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';

import { colors } from '@/constants/colors';

interface OptionIconProps {
  name: keyof typeof MaterialCommunityIcons.glyphMap;
  size?: number;
  color?: string;
}

export function OptionIcon({ name, size = 20, color }: OptionIconProps) {
  return <MaterialCommunityIcons name={name} size={size} color={color || colors.onBackground} />;
}
