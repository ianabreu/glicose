import { v4 as uuidv4 } from 'uuid';

import { GlucoseSchema } from '../schemas';

import { CreateGlucoseDTO, GlucoseDTO } from '@/@types/Glucose';
import { getRealm } from '@/database/realm';

export const GlucoseServices = {
  async create({
    date,
    valueInMgDl,
    userId,
    notes,
    glycemicRangeId,
  }: CreateGlucoseDTO): Promise<GlucoseDTO> {
    try {
      if (typeof valueInMgDl !== 'number' || isNaN(valueInMgDl)) {
        throw new Error('valueInMgDl precisa ser um número válido!');
      }
      const realm = await getRealm();
      let glucoseRecord: GlucoseDTO | undefined;
      realm.write(() => {
        const newGlucoseRecord = realm.create('Glucose', {
          id: uuidv4(),
          valueInMgDl: parseFloat(valueInMgDl.toFixed(2)),
          notes,
          userId,
          date,
          glycemicRangeId,
        });
        glucoseRecord = {
          id: newGlucoseRecord.id,
          date: newGlucoseRecord.date,
          valueInMgDl: newGlucoseRecord.valueInMgDl,
          userId: newGlucoseRecord.userId,
          notes: newGlucoseRecord.notes,
          glycemicRangeId: newGlucoseRecord.glycemicRangeId,
        };
      });
      if (!glucoseRecord) {
        throw new Error('Erro ao criar registro de glicose');
      }
      return glucoseRecord;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async getLast(userId: string): Promise<GlucoseDTO | null> {
    const realm = await getRealm();
    const response = realm
      .objects<GlucoseSchema>('Glucose')
      .filtered('userId == $0', userId)
      .sorted('date', true)[0];
    if (!response) {
      return null;
    }
    return {
      id: response.id,
      date: response.date,
      glycemicRangeId: response.glycemicRangeId,
      userId: response.userId,
      valueInMgDl: response.valueInMgDl,
      notes: response.notes,
    };
  },
  async getAll({
    userId,
    startDate,
    endDate,
  }: {
    userId: string;
    startDate: Date;
    endDate: Date;
  }): Promise<GlucoseDTO[]> {
    const realm = await getRealm();
    const response = realm
      .objects<GlucoseSchema>('Glucose')
      .filtered('userId == $0 AND date >= $1 AND date <= $2', userId, startDate, endDate)
      .sorted('date', true);
    return response.map((item) => ({
      id: item.id,
      userId: item.userId,
      valueInMgDl: item.valueInMgDl,
      date: item.date,
      notes: item.notes,
      glycemicRangeId: item.glycemicRangeId,
    }));
  },
};
