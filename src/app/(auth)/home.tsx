import { useIsFocused } from '@react-navigation/native';
import Constants from 'expo-constants';
import { Link, Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Modal, ScrollView, StyleSheet, View } from 'react-native';
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
    loadingGlucoseRecords,
    metrics,
    lastGlucoseRecord,
    loadingLastGlucoseRecord,
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

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} horizontal={false}>
        <Stack.Screen options={{ navigationBarColor: colors.background }} />
        <View style={{ gap: 8 }}>
          <View style={{ gap: 4 }}>
            <Header />
            {loadingLastGlucoseRecord && (
              <View
                style={{
                  borderRadius: 8,
                  height: 130,
                  backgroundColor: colors.border,
                }}
              />
            )}
            {!loadingLastGlucoseRecord && lastGlucoseRecord === null && (
              <View
                style={{
                  borderRadius: 8,
                  height: 130,
                  backgroundColor: colors.border,
                }}
              />
            )}
            {!loadingLastGlucoseRecord && lastGlucoseRecord !== null && (
              <Card data={lastGlucoseRecord} />
            )}
          </View>
          <Link href="/(auth)/new" asChild>
            <Button>
              <Button.Icon name="plus" />
              <Button.Text>Novo Registro</Button.Text>
            </Button>
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

            {loadingGlucoseRecords && (
              <View
                style={{
                  borderRadius: 8,
                  height: 200,
                  backgroundColor: colors.border,
                }}
              />
            )}

            {!loadingGlucoseRecords && <Chart data={glucoseRecords} />}
          </Section>
          {loadingGlucoseRecords && (
            <View style={{ flexWrap: 'wrap', flexDirection: 'row', gap: 16, marginVertical: 8 }}>
              <View
                style={{
                  flex: 1,
                  minWidth: '40%',
                  borderRadius: 8,
                  height: 80,
                  backgroundColor: colors.border,
                }}
              />
              <View
                style={{
                  flex: 1,
                  minWidth: '40%',
                  borderRadius: 8,
                  height: 80,
                  backgroundColor: colors.border,
                }}
              />
              <View
                style={{
                  flex: 1,
                  minWidth: '40%',
                  borderRadius: 8,
                  height: 80,
                  backgroundColor: colors.border,
                }}
              />
              <View
                style={{
                  flex: 1,
                  minWidth: '40%',
                  borderRadius: 8,
                  height: 80,
                  backgroundColor: colors.border,
                }}
              />
            </View>
          )}
          {!loadingGlucoseRecords && glucoseRecords.length === 0 && <Empty />}

          {metrics && metrics.total > 0 && (
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
        </View>
        <Link href="/(auth)/glicoseList" asChild>
          <Button>
            <Button.Icon name="format-list-bulleted" />
            <Button.Text>Listar resultados</Button.Text>
          </Button>
        </Link>
      </ScrollView>
    </View>
  );
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
    width: '100%',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    // marginVertical: 8,
    // borderRadius: 8,
    // textAlign: 'center',
    // paddingVertical: 12,
    // fontFamily: 'Medium',
    // fontSize: 16,
    // backgroundColor: colors.primary,
    // borderColor: colors.primary,
    // color: colors.onPrimary,
    // borderWidth: 1,
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
