import { useIsFocused } from '@react-navigation/native';
import Constants from 'expo-constants';
import { Link, Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { Button } from '@/components/Button/index';
import { Card } from '@/components/Card';
import { Chart } from '@/components/Chart';
import { Empty } from '@/components/Empty';
import { Filters } from '@/components/Filters';
import { Header } from '@/components/Header';
import { Info } from '@/components/InfoCard';
import { Section } from '@/components/Section';
import { Title } from '@/components/Title';
import { colors } from '@/constants/colors';
import { useGlucose } from '@/contexts/GlucoseContext';

export default function Home() {
  const isFocused = useIsFocused();
  const router = useRouter();
  const {
    glucoseRecords,
    metrics,
    lastGlucoseRecord,
    loadingLastGlucoseRecord,
    selectedPeriodType,
    glycemicRanges,
  } = useGlucose();

  const [openFiltersModal, setOpenFiltersModal] = useState(false);

  useEffect(() => {
    if (!isFocused) return;

    if (!loadingLastGlucoseRecord && lastGlucoseRecord === null) {
      router.replace('/(auth)/new');

      Toast.show({
        type: 'info',
        text1: 'Novo registro',
        text2: 'Insira seu 1º registro',
      });
    }
  }, [isFocused]);

  function openFilters() {
    setOpenFiltersModal(true);
  }
  function handleCloseFilters() {
    setOpenFiltersModal(false);
  }
  if (loadingLastGlucoseRecord) {
    return (
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <ActivityIndicator size={35} color={colors.primary} />
        <Text>Loading</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} horizontal={false}>
          <Stack.Screen options={{ navigationBarColor: colors.background }} />
          <View>
            <View style={{ gap: 4 }}>
              <Header />
              {lastGlucoseRecord !== null && <Card data={lastGlucoseRecord} />}
            </View>
            <Link style={styles.link} href="/(auth)/new">
              Novo Registro
            </Link>

            <Section>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Title>Informações</Title>
                <View>
                  <Button onPress={openFilters} variant="outline">
                    <Button.Text>Filtrar</Button.Text>
                    <Button.Icon name="filter" />
                  </Button>
                </View>

                <Modal visible={openFiltersModal} transparent animationType="slide">
                  <Filters closeModal={handleCloseFilters} />
                </Modal>
              </View>

              <Text
                style={{
                  fontFamily: 'Bold',
                  opacity: 0.8,
                  color: colors.onSurface,
                  fontSize: 12,
                }}>
                {selectedPeriodType || 'Últimos 100 resultados'}
              </Text>
              {glucoseRecords.length > 0 && <Chart data={glucoseRecords} />}
            </Section>

            {metrics && metrics.total > 0 ? (
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
            ) : (
              <Empty />
            )}
          </View>
          <Link style={styles.link} href="/(auth)/glicoseList">
            Listar resultados
          </Link>
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
    borderRadius: 8,
    textAlign: 'center',
    paddingVertical: 12,
    fontFamily: 'Medium',
    fontSize: 16,
    backgroundColor: colors.secondary,
    color: colors.onSecondary,
  },
  filterArea: {
    height: 'auto',
    maxHeight: 56,
    flexDirection: 'row',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 8,
    width: '90%',
    borderRadius: 8,
    gap: 16,
    backgroundColor: colors.background,
  },
  header: {
    fontFamily: 'Medium',
    fontSize: 18,
    textAlign: 'center',
    color: colors.onBackground,
    borderBottomColor: colors.border,
    paddingBottom: 8,
    borderBottomWidth: 1,
  },
});
