import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Button } from './Button';

import { GlucoseWithGlycemicRangeDTO } from '@/@types/Glucose';
import { colors } from '@/constants/colors';
import { calculateGlycemicRange } from '@/utils/calculateGlycemicRange';
import { formatDate } from '@/utils/date';

interface ItemProps {
  data: GlucoseWithGlycemicRangeDTO;
  deleteItem: (id: string) => void;
  editItem: (id: string) => void;
}
export function Item({ data, deleteItem, editItem }: ItemProps) {
  const dataRange = calculateGlycemicRange({ value: data.valueInMgDl, range: data.glycemicRange });
  function handleDeleteItem() {
    deleteItem(data.id);
  }
  function handleEditItem() {
    editItem(data.id);
  }
  return (
    <Pressable onLongPress={handleDeleteItem}>
      <View key={data.id} style={[styles.container, { borderLeftColor: dataRange.color }]}>
        <View style={[{ width: '20%' }]}>
          <Text style={styles.value}>{data.valueInMgDl}</Text>
          <Text style={styles.unit}>mg/dl</Text>
        </View>
        <View style={{ justifyContent: 'center', gap: 4, width: '70%' }}>
          <Text style={styles.range}>
            {dataRange.response} - {data.glycemicRange?.description}
          </Text>
          <Text style={styles.date}>{formatDate(data.date)}</Text>
        </View>
        <View style={[{ width: '10%' }]}>
          <Button
            onPress={handleEditItem}
            variant="link"
            icon={<Feather name="edit" size={20} color={colors.secondary} />}
          />
        </View>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 8,
    marginVertical: 8,
    borderLeftWidth: 8,
    borderRadius: 8,
  },
  value: {
    fontFamily: 'Bold',
    textAlign: 'center',
    fontSize: 22,
    color: colors.onBackground,
  },
  unit: {
    fontFamily: 'Normal',
    textAlign: 'center',
    fontSize: 10,
    opacity: 0.9,
    color: colors.onSurface,
  },
  range: {
    fontFamily: 'Medium',
    fontSize: 14,
    color: colors.onBackground,
  },
  date: {
    fontFamily: 'Normal',
    fontSize: 12,
    color: colors.onBackground,
    opacity: 0.7,
  },
});
