import { Feather } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import Constants from 'expo-constants';
import { Link, Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { Card } from '@/components/Card';
import { Info } from '@/components/InfoCard';
import ItemList from '@/components/ItemList';
import { SelectPeriod } from '@/components/SelectPeriod';
import { colors } from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';
import { useGlucose } from '@/hooks/useGlucose';

export default function Home() {
  const { user } = useAuth();

  const isFocused = useIsFocused();

  const {
    glucoseRecords,
    lastGlucoseRecord,
    glycemicRanges,
    getLastGlucoseRecord,
    getMetrics,
    loading,
  } = useGlucose(user?.uid as string);
  const [period, setPeriod] = useState(['7 Dias', '14 Dias', '30 Dias', 'Personalizado']);
  const [selectedPeriod, setSelectedPeriod] = useState('7 Dias');
  const router = useRouter();

  useEffect(() => {
    if (!isFocused) return;
    getLastGlucoseRecord().catch((error) => {
      if (error instanceof Error && error.message === 'Nenhum registro encontrado') {
        router.replace('/(auth)/new');
        Toast.show({
          type: 'info',
          text1: 'Novo registro',
          text2: 'Insira seu 1º registro',
          text1Style: { fontFamily: 'Bold', fontSize: 18, color: colors.onSurface },
          text2Style: { fontFamily: 'Medium', fontSize: 16, color: colors.onBackground },
          position: 'bottom',
        });
      }
    });
  }, [isFocused]);

  const metrics = getMetrics();

  if (loading) {
    return (
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <ActivityIndicator size={35} color={colors.primary} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} horizontal={false}>
          <Stack.Screen options={{ navigationBarColor: colors.background }} />
          <View>
            <View style={{ gap: 4 }}>
              <View style={styles.headerArea}>
                <Text style={styles.title}>Página Inicial</Text>
                <Link href="/(auth)/new">
                  <Feather name="external-link" size={30} />
                </Link>
                <Link href="/(auth)/profile">
                  <Feather name="user" size={30} />
                </Link>
              </View>
              {lastGlucoseRecord && <Card data={lastGlucoseRecord} />}
            </View>
            <Link style={styles.link} href="/(auth)/new">
              Novo Registro
            </Link>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                height: 'auto',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: 'Medium',
                  color: colors.primary,
                  flex: 1,
                }}>
                Informações
              </Text>
              <View style={{ flex: 1 }}>
                <SelectPeriod options={period} label={selectedPeriod} />
              </View>
            </View>
            {metrics && glucoseRecords.length > 0 && (
              <View style={{ flexWrap: 'wrap', flexDirection: 'row', gap: 16, marginVertical: 8 }}>
                <Info.Container>
                  <Info.Title>Média</Info.Title>
                  <Info.Row>
                    <Info.Icon name="activity" />
                    <Info.Value unit="mg/dl">{metrics.average.toFixed(1)}</Info.Value>
                  </Info.Row>
                </Info.Container>

                <Info.Container>
                  <Info.Title>Total de Medições</Info.Title>
                  <Info.Row>
                    <Info.Icon name="bar-chart-2" />
                    <Info.Value>{metrics?.total}</Info.Value>
                  </Info.Row>
                </Info.Container>

                <Info.Container>
                  <Info.Title>Maior Valor</Info.Title>
                  <Info.Row>
                    <Info.Icon name="trending-up" />
                    <Info.Value unit="mg/dl">{metrics.max?.valueInMgDl || 0}</Info.Value>
                  </Info.Row>
                  <Info.Row>
                    <Info.Helper>
                      {
                        glycemicRanges.find((item) => item.id === metrics.max?.glycemicRangeId)
                          ?.description
                      }
                    </Info.Helper>
                  </Info.Row>
                </Info.Container>

                <Info.Container>
                  <Info.Title>Menor Valor</Info.Title>
                  <Info.Row>
                    <Info.Icon name="trending-down" />
                    <Info.Value unit="mg/dl">{metrics.min?.valueInMgDl || 0}</Info.Value>
                  </Info.Row>
                  <Info.Row>
                    <Info.Helper>
                      {
                        glycemicRanges.find((item) => item.id === metrics.min?.glycemicRangeId)
                          ?.description
                      }
                    </Info.Helper>
                  </Info.Row>
                </Info.Container>
              </View>
            )}
            <Link style={styles.link} href="/(auth)/new">
              Exportar Relatório
            </Link>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Medium',
                color: colors.primary,
              }}>
              Resultados
            </Text>
          </View>

          <ItemList data={glucoseRecords} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: '100%',
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
