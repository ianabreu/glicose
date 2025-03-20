import { GlycemicRangeDTO } from '@/@types/GlycemicRange';
import { colors } from '@/constants/colors';

interface Props {
  value: number;
  range?: Pick<GlycemicRangeDTO, 'glucose_max' | 'glucose_min' | 'glucose_normal'>;
}
export function calculateGlycemicRange({
  value,
  range = { glucose_min: 70, glucose_normal: 99, glucose_max: 140 },
}: Props): { response: string; colorGradient: string[] } {
  let response = '';
  let colorGradient: string[] = colors.level.normal;
  if (value <= range.glucose_min) {
    response = 'Baixa';
    colorGradient = colors.level.low;
  } else if (value > range.glucose_min && value <= range.glucose_normal) {
    response = 'Normal';
    colorGradient = colors.level.normal;
  } else if (value > range.glucose_normal && value <= range.glucose_max) {
    response = 'Pré-Diabetes';
    colorGradient = colors.level.preDiabetes;
  } else {
    response = 'Diabetes';
    colorGradient = colors.level.diabetes;
  }
  return { response, colorGradient };
}
