import { Feather } from '@expo/vector-icons';
import { StyleProp, StyleSheet, Text, TextProps, TextStyle, View, ViewProps } from 'react-native';

import { colors } from '@/constants/colors';

interface IconProps {
  name: keyof typeof Feather.glyphMap;
  style?: StyleProp<TextStyle>;
}
interface ValueProps extends TextProps {
  unit?: 'mg/dl' | 'mmol/L';
}
interface ContainerProps extends ViewProps {}
interface RowProps extends ViewProps {}

function Title({ children, ...props }: TextProps) {
  return (
    <Text style={[styles.title]} {...props}>
      {children}
    </Text>
  );
}

function Icon({ name, style }: IconProps) {
  return <Feather name={name} style={[styles.icon, style]} />;
}

function Value({ unit, children, style, ...props }: ValueProps) {
  return (
    <View style={[styles.valueRow]}>
      <Text style={[styles.value, style]} {...props}>
        {children}
      </Text>
      {unit && <Text style={[styles.unit]}>mg/dl</Text>}
    </View>
  );
}
function Helper({ children, style, ...props }: ValueProps) {
  return (
    <Text style={[styles.helper, style]} {...props}>
      {children}
    </Text>
  );
}

function Container({ children, style, ...props }: ContainerProps) {
  return (
    <View style={[styles.container, style]} {...props}>
      {children}
    </View>
  );
}

function Row({ children, style, ...props }: RowProps) {
  return (
    <View style={[styles.row, style]} {...props}>
      {children}
    </View>
  );
}

export const Info = {
  Container,
  Title,
  Value,
  Icon,
  Row,
  Helper,
};

const styles = StyleSheet.create({
  container: {
    elevation: 1,
    flex: 1,
    minWidth: '40%',
    borderRadius: 8,
    padding: 8,
    backgroundColor: colors.surface,
  },
  title: {
    fontFamily: 'Medium',
    fontSize: 16,
    color: colors.onSurface,
    textAlign: 'center',
  },
  helper: {
    fontFamily: 'Medium',
    fontSize: 14,
    color: colors.onSurface,
    textAlign: 'center',
  },
  icon: {
    fontSize: 24,
    color: colors.primary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: 4,
  },
  value: {
    fontFamily: 'Bold',
    fontSize: 24,
    color: colors.onSurface,
    textAlign: 'center',
  },
  unit: {
    fontFamily: 'Medium',
    fontSize: 12,
    color: colors.onSurface,
    textAlign: 'center',
  },
});
