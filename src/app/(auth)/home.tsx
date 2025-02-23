import { Text, View } from 'react-native';

export default function HomePage() {
  return (
    <View className="flex-1 bg-background px-4 pt-4 ">
      <Text className="text-2xl font-extrabold uppercase">Meu açúcar no sangue</Text>
      <View className="flex-row justify-between rounded-lg bg-primary px-4 py-8">
        <View className="justify-between">
          <Text className="text-xl text-white">Seu último registro</Text>
          <Text className="text-2xl font-bold text-white">Em Jejum</Text>
          <Text className="text-white">23/02/2025 às 06:32hs</Text>
        </View>
        <View className="items-center justify-between gap-2">
          <Text className="font-bold leading-none text-white">Normal</Text>
          <Text className="text-5xl font-extrabold leading-tight text-white">124</Text>
          <Text className="text-lg leading-none text-white">mg/dl</Text>
        </View>
      </View>
    </View>
  );
}
