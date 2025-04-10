import { ReactNode } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextStyle, TouchableOpacity } from 'react-native';

import { colors } from '@/constants/colors';

export interface ButtonProps extends React.ComponentPropsWithoutRef<typeof TouchableOpacity> {
  label?: string;
  disabled?: boolean;
  icon?: ReactNode;
  variant?: 'fill' | 'stroke' | 'link';
  textStyles?: TextStyle;
}
function Button({
  label,
  disabled = false,
  variant = 'fill',
  style,
  textStyles,
  icon,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.button,
        {
          backgroundColor:
            variant === 'fill'
              ? colors.secondary
              : variant === 'link'
                ? 'transparent'
                : 'transparent',
          borderColor:
            variant === 'fill'
              ? colors.secondary
              : variant === 'stroke'
                ? colors.secondary
                : 'transparent',
        },
        style,
      ]}
      {...props}>
      {disabled ? (
        <ActivityIndicator
          color={
            variant === 'fill'
              ? colors.onSecondary
              : variant === 'stroke'
                ? colors.secondary
                : colors.secondary
          }
          size={22}
        />
      ) : (
        <>
          {icon && <>{icon}</>}
          {label && (
            <Text
              style={[
                styles.text,
                {
                  color:
                    variant === 'fill'
                      ? colors.onSecondary
                      : variant === 'stroke'
                        ? colors.secondary
                        : colors.secondary,
                },
                textStyles,
              ]}>
              {label}
            </Text>
          )}
        </>
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
    borderRadius: 8,
    width: 'auto',
    paddingHorizontal: 8,
    minHeight: 40,
    minWidth: 40,
    borderWidth: 1,
    gap: 4,
  },
  text: {
    fontFamily: 'Medium',
    textAlign: 'center',
    fontSize: 16,
    color: colors.onSecondary,
  },
  fill: {},
  stroke: {
    backgroundColor: 'trasparent',
  },
});
