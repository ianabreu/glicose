import { Circle, useFont } from '@shopify/react-native-skia';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import Animated, { SharedValue, useAnimatedProps } from 'react-native-reanimated';
import { CartesianChart, Line, useChartPressState, useChartTransformState } from 'victory-native';

import { GlucoseWithGlycemicRangeDTO } from '@/@types/Glucose';
import { colors } from '@/constants/colors';

interface ChartProps {
  data: GlucoseWithGlycemicRangeDTO[];
}

Animated.addWhitelistedNativeProps({ text: true });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return <Circle cx={x} cy={y} r={8} color={colors.secondary} />;
}

export function Chart({ data }: ChartProps) {
  const { state, isActive } = useChartPressState({ x: 0, y: { value: 0 } });
  const transformState = useChartTransformState();
  const font = useFont(require('../assets/fonts/NunitoSans_10pt-Regular.ttf'), 10);

  const [chartData, setChartData] = useState<{ day: number; value: number }[]>([]);
  useEffect(() => {
    if (data.length === 0 || !data) {
      return;
    }
    const a: { day: number; value: number }[] = data.map((item) => ({
      day: item.date.getTime(),
      value: item.valueInMgDl,
    }));
    setChartData(a);
  }, [data]);

  const animatedText = useAnimatedProps(() => {
    return {
      text: `${state.y.value.value.value} mg/dl`,
      defaultValue: '',
    };
  });
  const animatedDateText = useAnimatedProps(() => {
    const date = new Date(state.x.value.value);

    return {
      text: `${date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}`,
      defaultValue: '',
    };
  });

  return (
    <View style={styles.containerArea}>
      {isActive && (
        <View>
          <AnimatedTextInput
            editable={false}
            underlineColorAndroid="transparent"
            style={{
              fontFamily: 'Bold',
              fontSize: 14,
              textAlign: 'right',
              color: colors.onBackground,
            }}
            animatedProps={animatedText}
          />
          <AnimatedTextInput
            editable={false}
            underlineColorAndroid="transparent"
            style={{
              fontFamily: 'Normal',
              fontSize: 12,
              textAlign: 'right',
              color: colors.onBackground,
            }}
            animatedProps={animatedDateText}
          />
        </View>
      )}
      {!isActive && chartData.length > 0 && (
        <View>
          <Text style={{ fontFamily: 'Bold', fontSize: 14, textAlign: 'right' }}>
            {chartData[0].value} mg/dl
          </Text>
          <Text style={{ fontFamily: 'Normal', fontSize: 12, textAlign: 'right' }}>
            Último resultado
          </Text>
        </View>
      )}
      <CartesianChart
        padding={{ bottom: 10, left: 10, right: 10, top: 0 }}
        domainPadding={{ top: 10, bottom: 10, left: 10, right: 10 }}
        data={chartData}
        xKey="day"
        yKeys={['value']}
        chartPressState={state}
        transformState={transformState.state}
        transformConfig={{
          pan: { dimensions: 'x', enabled: true },
          pinch: { dimensions: 'x', enabled: true },
        }}
        axisOptions={{
          tickCount: 5,
          font,
          labelOffset: { x: 3, y: 2 },
          labelPosition: 'inset',
          labelColor: 'black',
          formatXLabel: (label) => format(label, 'dd/MM'),
        }}>
        {({ points }) => (
          <>
            <Line
              points={points.value}
              color={colors.primary}
              strokeWidth={4}
              curveType="catmullRom"
              animate={{ type: 'timing', duration: 300 }}
            />
            {isActive ? <ToolTip x={state.x.position} y={state.y.value.position} /> : null}
          </>
        )}
      </CartesianChart>
    </View>
  );
}

const styles = StyleSheet.create({
  containerArea: {
    height: 250,
  },
});
