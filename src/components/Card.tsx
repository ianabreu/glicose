import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

import { GlucoseDTO } from '@/@types/Glucose';
import { GlycemicRangeDTO } from '@/@types/GlycemicRange';
import { colors, defaultColors } from '@/constants/colors';
interface CardProps {
  data: GlucoseDTO;
  glycemicRange: GlycemicRangeDTO | undefined;
}

export function Card({ data, glycemicRange }: CardProps) {
  return (
    <LinearGradient
      start={{ x: 0.1, y: 0.1 }}
      end={{ x: 0.8, y: 1 }}
      colors={[defaultColors.blue[500], defaultColors.blue[600], defaultColors.blue[700]]}
      style={styles.card}>
      <View style={{ justifyContent: 'space-between' }}>
        <Text style={[styles.textBold, { fontSize: 22 }]}>Seu último registro</Text>
        <Text adjustsFontSizeToFit style={[styles.textMedium, { fontSize: 20 }]}>
          {glycemicRange?.description}
        </Text>
        <Text style={[styles.textMedium, { fontSize: 13 }]}>{data.date.toLocaleString()}</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={[styles.textMedium, { fontSize: 16 }]}>Normal</Text>
        <Text style={[styles.textBold, { fontSize: 56 }]}>{data.valueInMgDl}</Text>
        <Text style={[styles.textMedium, { fontSize: 14 }]}>mg/dl</Text>
      </View>
    </LinearGradient>
  );
}
const defaultText = { color: colors.onPrimary };
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
  textMedium: {
    ...defaultText,
    fontFamily: 'Medium',
  },
  textBold: {
    ...defaultText,
    fontFamily: 'Bold',
  },
});
