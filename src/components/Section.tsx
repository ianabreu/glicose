import { StyleSheet, View, ViewProps } from 'react-native';

interface SectionProps extends ViewProps {}
export function Section({ children, style, ...rest }: SectionProps) {
  return (
    <View style={[styles.section, style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'flex-start',
    height: 'auto',
  },
});
