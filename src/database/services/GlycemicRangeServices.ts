import { v4 as uuidv4 } from 'uuid';

import { GlycemicRangeSchema } from '../schemas';

import { CreateGlycemicRangeDTO, GlycemicRangeDTO } from '@/@types/GlycemicRange';
import { getRealm } from '@/database/realm';

export const GlycemicRangeServices = {
  async create({
    description,
    glucose_max,
    glucose_min,
    glucose_normal,
    userId,
  }: CreateGlycemicRangeDTO): Promise<GlycemicRangeDTO> {
    try {
      if (typeof glucose_min !== 'number' || isNaN(glucose_min)) {
        throw new Error('glucose_min precisa ser um número válido!');
      }
      if (typeof glucose_max !== 'number' || isNaN(glucose_max)) {
        throw new Error('glucose_max precisa ser um número válido!');
      }
      if (typeof glucose_normal !== 'number' || isNaN(glucose_normal)) {
        throw new Error('glucose_normal precisa ser um número válido!');
      }
      const realm = await getRealm();

      let glycemicRange: GlycemicRangeDTO | undefined;

      realm.write(() => {
        const newGlycemicRange = realm.create('GlycemicRange', {
          id: uuidv4(),
          description,
          glucose_max,
          glucose_min,
          glucose_normal,
          userId,
        });
        glycemicRange = {
          id: newGlycemicRange.id,
          description: newGlycemicRange.description,
          glucose_max: newGlycemicRange.glucose_max,
          glucose_min: newGlycemicRange.glucose_min,
          glucose_normal: newGlycemicRange.glucose_normal,
          userId: newGlycemicRange.userId,
        };
      });
      if (!glycemicRange) {
        throw new Error('Erro ao criar condição de glicose');
      }
      return glycemicRange;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async get({ userId }: { userId: string }): Promise<GlycemicRangeDTO[]> {
    const realm = await getRealm();
    const response = realm
      .objects<GlycemicRangeSchema>('GlycemicRange')
      .filtered('userId == $0', userId);
    return response.map((item) => ({
      id: item.id,
      description: item.description,
      glucose_max: item.glucose_max,
      glucose_min: item.glucose_min,
      glucose_normal: item.glucose_normal,
      userId: item.userId,
    }));
  },
};

const defaultGlycemicRanges = [
  {
    description: 'Em jejum',
    glucose_min: 70,
    glucose_normal: 99,
    glucose_max: 130,
  },
  {
    description: 'Antes da refeição',
    glucose_min: 70,
    glucose_normal: 99,
    glucose_max: 130,
  },
  {
    description: 'Após a refeição (1h)',
    glucose_min: 70,
    glucose_normal: 99,
    glucose_max: 180,
  },
  {
    description: 'Após a refeição (2h)',
    glucose_min: 70,
    glucose_normal: 99,
    glucose_max: 160,
  },
  {
    description: 'Madrugada',
    glucose_min: 70,
    glucose_normal: 99,
    glucose_max: 130,
  },
];
export async function seedGlycemicRanges(userId: string) {
  try {
    for (const range of defaultGlycemicRanges) {
      await GlycemicRangeServices.create({
        userId,
        ...range,
      });
    }
  } catch (error) {
    console.error('Erro ao criar seed de faixas glicêmicas:', error);
  }
}
