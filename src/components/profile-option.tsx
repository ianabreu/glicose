import { MaterialIcons } from '@expo/vector-icons';
import { ColorValue, Text, TextProps, View, ViewProps } from 'react-native';

import { colors } from '@/constants/colors';
interface IconProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  size?: number;
  color?: ColorValue;
}
function Option({ children, style, ...props }: ViewProps) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          gap: 4,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomColor: colors.border,
          borderBottomWidth: 1,
          paddingVertical: 16,
        },
        style,
      ]}
      {...props}>
      {children}
    </View>
  );
}

function Icon({ icon, size = 20, color = colors.onBackground }: IconProps) {
  return <MaterialIcons name={icon} size={size} color={color} style={{ padding: 4 }} />;
}

function Title({ children, style, ...props }: TextProps) {
  return (
    <Text
      style={[{ fontFamily: 'Normal', fontSize: 16, flex: 1, textAlign: 'left' }, style]}
      {...props}>
      {children}
    </Text>
  );
}

Option.Title = Title;
Option.Icon = Icon;

export { Option };
