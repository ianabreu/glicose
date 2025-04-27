import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { colors } from '@/constants/colors';

type OptionProps = {
  children: React.ReactNode;
  loading?: boolean;
  variant?: 'filled' | 'outline';
} & TouchableOpacityProps;

export function Option({ children, style, ...props }: OptionProps) {
  return (
    <TouchableOpacity
      style={[
        {
          flexDirection: 'row',
          gap: 4,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'flex-start',
          borderColor: colors.border,
          borderWidth: 1,
          paddingVertical: 16,
          paddingHorizontal: 8,
          backgroundColor: colors.surface,
          borderRadius: 8,
        },
        style,
      ]}
      {...props}>
      {children}
    </TouchableOpacity>
  );
}
