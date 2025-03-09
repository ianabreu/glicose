import { Feather } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import Constants from 'expo-constants';
import { Link, Stack } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/Card';
import { Info } from '@/components/InfoCard';
import { colors } from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';
import { useGlucose } from '@/hooks/useGlucose';

export default function Home() {
  const { user } = useAuth();
  const isFocused = useIsFocused();

  const { glucoseRecords, lastGlucoseRecord, glycemicRanges, getLastRecord } = useGlucose(
    user?.uid as string
  );

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    getLastRecord();
  }, [isFocused]);

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ navigationBarColor: colors.background }} />
      <View style={{ gap: 4 }}>
        <View style={styles.headerArea}>
          <Text style={styles.title}>Página Inicial</Text>
          <Link href="/(auth)/new">
            <Feather name="external-link" size={30} />
          </Link>
          <Link href="/(auth)/new">
            <Feather name="user" size={30} />
          </Link>
        </View>
        {lastGlucoseRecord && (
          <Card
            data={lastGlucoseRecord}
            glycemicRange={glycemicRanges.find((el) => el.id === lastGlucoseRecord.glycemicRangeId)}
          />
        )}
      </View>
      <Link style={styles.link} href="/(auth)/new">
        Novo Registro
      </Link>
      <Text
        style={{
          fontSize: 20,
          fontFamily: 'Medium',
          color: colors.primary,
        }}>
        Informações
      </Text>
      <View style={{ flexWrap: 'wrap', flexDirection: 'row', gap: 16, marginVertical: 8 }}>
        <Info.Container>
          <Info.Title>Média (7 dias)</Info.Title>
          <Info.Row>
            <Info.Icon name="activity" />
            <Info.Value unit="mg/dl">124</Info.Value>
          </Info.Row>
        </Info.Container>

        <Info.Container>
          <Info.Title>Total de Medições</Info.Title>
          <Info.Row>
            <Info.Icon name="bar-chart-2" />
            <Info.Value>20</Info.Value>
          </Info.Row>
        </Info.Container>

        <Info.Container>
          <Info.Title>Maior Valor</Info.Title>
          <Info.Row>
            <Info.Icon name="trending-up" />
            <Info.Value unit="mg/dl">236</Info.Value>
          </Info.Row>
        </Info.Container>

        <Info.Container>
          <Info.Title>Menor Valor</Info.Title>
          <Info.Row>
            <Info.Icon name="trending-down" />
            <Info.Value unit="mg/dl">49</Info.Value>
          </Info.Row>
        </Info.Container>
      </View>
      {glucoseRecords.map((item) => (
        <View key={item.id}>
          <Text>{item.id}</Text>
          <Text>{item.userId}</Text>
          <Text>{item.date.toISOString()}</Text>
          <Text>{item.glycemicRangeId}</Text>
          <Text>{item.valueInMgDl}</Text>
        </View>
      ))}

      {/* <BarChart data={data} />
      <LineChart data={data} />
      <PieChart data={data} />
      <PopulationPyramid
        data={[
          { left: 10, right: 12 },
          { left: 9, right: 8 },
        ]}
      />
      <RadarChart data={[50, 80, 90, 70]} />
      <BarChart data={data} horizontal />
      <LineChart data={data} areaChart />
      <PieChart data={data} donut /> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingTop: Constants.statusBarHeight + 16,
  },
  link: {
    marginVertical: 8,
    borderRadius: 56,
    textAlign: 'center',
    paddingVertical: 12,
    fontFamily: 'Medium',
    fontSize: 16,
    backgroundColor: colors.secondary,
    color: colors.onSecondary,
  },
  headerArea: {
    minHeight: 56,
    width: '100%',
    alignItems: 'center',
    gap: 16,
    flexDirection: 'row',
    marginBottom: 8,
  },
  title: {
    fontFamily: 'Bold',
    fontSize: 24,
    color: colors.primary,
  },
});
