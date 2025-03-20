import { Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useMemo } from 'react';
import { StyleSheet, Text, TextStyle, View } from 'react-native';

import { GlucoseWithGlycemicRangeDTO } from '@/@types/Glucose';
import { colors } from '@/constants/colors';
import { calculateGlycemicRange } from '@/utils/calculateGlycemicRange';
import { formatDate } from '@/utils/date';
interface CardProps {
  data: GlucoseWithGlycemicRangeDTO;
}

export function Card({ data }: CardProps) {
  const glycemicRange = useMemo(() => {
    return calculateGlycemicRange({
      value: data.valueInMgDl,
      range: data.glycemicRange,
    });
  }, [data.valueInMgDl, data.glycemicRange]);
  return (
    <LinearGradient
      start={{ x: 0.1, y: 0.1 }}
      end={{ x: 0.8, y: 1 }}
      colors={[colors.gradient[0], colors.gradient[1]]}
      style={styles.card}>
      <View style={{ justifyContent: 'space-between' }}>
        <Text style={[styles.textBold, { fontSize: 22 }]}>Seu último registro</Text>
        <Text adjustsFontSizeToFit style={[styles.textMedium, { fontSize: 20 }]}>
          {data.glycemicRange?.description}
        </Text>
        <Text style={[styles.textMedium, { fontSize: 13 }]}>{formatDate(data.date)}</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
        <Text
          allowFontScaling={false}
          style={[
            styles.textBold,
            {
              fontSize: 45,
              lineHeight: 52,
              maxHeight: 40,
            },
          ]}>
          {data.valueInMgDl}
        </Text>
        <Text style={[styles.textMedium, { fontSize: 14 }]}>mg/dl</Text>
        <View
          style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 4 }}>
          <Text style={[styles.textMedium, { fontSize: 16 }]}>{glycemicRange.response}</Text>
          <View style={[styles.dot, { backgroundColor: glycemicRange.colorGradient[0] }]} />
        </View>
      </View>
    </LinearGradient>
  );
}
const defaultText: TextStyle = { color: colors.onPrimary };
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  dot: {
    width: 16,
    aspectRatio: 1,
    borderRadius: 40,
    borderColor: 'white',
    borderWidth: 2,
  },
});
