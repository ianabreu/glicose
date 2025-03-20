import { StyleSheet, Text, View } from 'react-native';

import { GlucoseWithGlycemicRangeDTO } from '@/@types/Glucose';
import { colors } from '@/constants/colors';
import { calculateGlycemicRange } from '@/utils/calculateGlycemicRange';
import { formatDate } from '@/utils/date';

interface ItemProps {
  data: GlucoseWithGlycemicRangeDTO;
}
export function Item({ data }: ItemProps) {
  const dataRange = calculateGlycemicRange({ value: data.valueInMgDl, range: data.glycemicRange });
  return (
    <View key={data.id} style={[styles.container]}>
      <View
        style={[
          {
            borderRadius: 300,
            borderColor: dataRange.colorGradient[0],
            borderWidth: 4,
            padding: 8,
            aspectRatio: 1,
          },
        ]}>
        <Text style={styles.value}>{data.valueInMgDl}</Text>
        <Text style={styles.unit}>mg/dl</Text>
      </View>
      <View style={{ justifyContent: 'center', gap: 4 }}>
        <Text style={styles.range}>
          {dataRange.response} - {data.glycemicRange?.description}
        </Text>
        <Text style={styles.date}>{formatDate(data.date)}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    backgroundColor: colors.surface,
    margin: 8,
    padding: 8,
    elevation: 1,
  },
  value: {
    fontFamily: 'Bold',
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 21,
    color: colors.onBackground,
  },
  unit: {
    fontFamily: 'Normal',
    textAlign: 'center',
    fontSize: 10,
    lineHeight: 11,
    color: colors.onSurface,
  },
  range: {
    fontFamily: 'Bold',
    fontSize: 14,
    color: colors.onBackground,
  },
  date: {
    fontFamily: 'Normal',
    fontSize: 12,
    color: colors.onSurface,
  },
});
