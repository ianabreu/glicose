import { FlatList, ScrollView, Text, View } from 'react-native';

import { Item } from './Item';

import { GlucoseWithGlycemicRangeDTO } from '@/@types/Glucose';
interface ItemListProps {
  data: GlucoseWithGlycemicRangeDTO[];
}
export default function ItemList(props: ItemListProps) {
  return (
    <ScrollView>
      {props.data.map((item) => (
        <Item key={item.id} data={item} />
      ))}
    </ScrollView>
    // <FlatList
    //   keyExtractor={(item) => item.id}
    //   data={props.data}
    //   renderItem={({ item }) => <Item data={item} />}
    //   nestedScrollEnabled
    //   showsVerticalScrollIndicator={false}
    //   ListFooterComponent={() => (
    //     <View>
    //       <Text>Buscar mais</Text>
    //     </View>
    //   )}
    // />
  );
}
