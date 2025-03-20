import { v4 as uuidv4 } from 'uuid';

import { GlucoseSchema, GlycemicRangeSchema } from '../schemas';

import { CreateGlucoseDTO, GlucoseDTO, GlucoseWithGlycemicRangeDTO } from '@/@types/Glucose';
import { getRealm } from '@/database/realm';

export const GlucoseServices = {
  async create({
    date,
    valueInMgDl,
    userId,
    notes,
    glycemicRangeId,
  }: CreateGlucoseDTO): Promise<GlucoseDTO> {
    const realm = await getRealm();
    try {
      if (typeof valueInMgDl !== 'number' || isNaN(valueInMgDl)) {
        throw new Error('valueInMgDl precisa ser um número válido!');
      }
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
  async getLastGlucoseRecord(userId: string): Promise<GlucoseWithGlycemicRangeDTO> {
    const realm = await getRealm();
    try {
      const response = realm
        .objects<GlucoseSchema>('Glucose')
        .filtered('userId == $0', userId)
        .sorted('date', true)[0];
      if (!response) {
        throw new Error('Nenhum registro encontrado');
      }
      const glycemicRange = realm.objectForPrimaryKey<GlycemicRangeSchema>(
        'GlycemicRange',
        response.glycemicRangeId
      );
      if (!glycemicRange || !glycemicRange === null) {
        throw new Error('Níveis de referência não encontrados');
      }
      const data = {
        id: response.id,
        date: response.date,
        glycemicRangeId: response.glycemicRangeId,
        userId: response.userId,
        valueInMgDl: response.valueInMgDl,
        notes: response.notes,
        glycemicRange: {
          description: glycemicRange.description,
          glucose_max: glycemicRange.glucose_max,
          glucose_min: glycemicRange.glucose_min,
          glucose_normal: glycemicRange.glucose_normal,
          id: glycemicRange.id,
          userId: glycemicRange.userId,
        },
      };
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async getFiltredData({ userId, days }: { userId: string; days?: number }) {
    const today = new Date();
    let startDate: Date | null = null;
    if (days) {
      startDate = new Date();
      startDate.setDate(today.getDate() - days);
    }
    let query = `userId == $0`;
    const queryParams: any[] = [userId];

    if (startDate) {
      query += ' && date >= $1';
      queryParams.push(startDate);
    }

    const realm = await getRealm();
    try {
      const response = realm
        .objects<GlucoseDTO>('Glucose')
        .filtered(query, ...queryParams)
        .sorted('date', true);

      const data: GlucoseWithGlycemicRangeDTO[] = response.map((item) => {
        const glycemicRange = realm.objectForPrimaryKey<GlycemicRangeSchema>(
          'GlycemicRange',
          item.glycemicRangeId
        );
        if (!glycemicRange || glycemicRange === null) {
          throw new Error('Níveis de referência não encontrados');
        }
        return {
          id: item.id,
          userId: item.userId,
          valueInMgDl: item.valueInMgDl,
          date: item.date,
          glycemicRangeId: item.glycemicRangeId,
          notes: item.notes,
          glycemicRange: {
            description: glycemicRange.description,
            glucose_max: glycemicRange.glucose_max,
            glucose_min: glycemicRange.glucose_min,
            glucose_normal: glycemicRange.glucose_normal,
            id: glycemicRange.id,
            userId: glycemicRange.userId,
          },
        };
      });
      return data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  },
  async getFilteredCustomRange({
    userId,
    endDate,
    startDate,
  }: {
    userId: string;
    endDate: Date;
    startDate: Date;
  }) {
    const realm = await getRealm();
    const response = realm
      .objects<GlucoseDTO>('Glucose')
      .filtered('userId == $0 && date >= $1 && date <= $2', userId, startDate, endDate)
      .sorted('date', true);

    const data: GlucoseWithGlycemicRangeDTO[] = response.map((item) => {
      const glycemicRange = realm.objectForPrimaryKey<GlycemicRangeSchema>(
        'GlycemicRange',
        item.glycemicRangeId
      );
      if (!glycemicRange || glycemicRange === null) {
        throw new Error('Níveis de referência não encontrados');
      }
      return {
        id: item.id,
        userId: item.userId,
        valueInMgDl: item.valueInMgDl,
        date: item.date,
        glycemicRangeId: item.glycemicRangeId,
        notes: item.notes,
        glycemicRange: {
          description: glycemicRange.description,
          glucose_max: glycemicRange.glucose_max,
          glucose_min: glycemicRange.glucose_min,
          glucose_normal: glycemicRange.glucose_normal,
          id: glycemicRange.id,
          userId: glycemicRange.userId,
        },
      };
    });
    return data;
  },
  // async getAll({
  //   userId,
  //   oldDate,
  //   recentDate,
  // }: {
  //   userId: string;
  //   oldDate: Date;
  //   recentDate: Date;
  // }) {
  //   const realm = await getRealm();
  //   try {
  //     const response = realm
  //       .objects<GlucoseSchema>('Glucose')
  //       .filtered('userId == $0 AND date >= $1 AND date <= $2', userId, oldDate, recentDate);

  //     const maxItem = response.sorted('valueInMgDl', true)[0];
  //     const minItem = response.sorted('valueInMgDl', false)[0];

  //     const items: GlucoseWithGlycemicRangeDTO[] = response.sorted('date', true).map((item) => {
  //       const glycemicRange = realm.objectForPrimaryKey<GlycemicRangeSchema>(
  //         'GlycemicRange',
  //         item.glycemicRangeId
  //       );

  //       return {
  //         id: item.id,
  //         userId: item.userId,
  //         valueInMgDl: item.valueInMgDl,
  //         date: item.date,
  //         notes: item.notes,
  //         glycemicRangeId: item.glycemicRangeId,
  //         glycemicRange: glycemicRange
  //           ? {
  //               id: glycemicRange.id,
  //               description: glycemicRange.description,
  //               glucose_max: glycemicRange.glucose_max,
  //               glucose_min: glycemicRange.glucose_min,
  //               glucose_normal: glycemicRange.glucose_normal,
  //               userId: glycemicRange.userId,
  //             }
  //           : undefined,
  //       };
  //     });

  //     return {
  //       items,
  //       metrics: {
  //         avarage: response.avg('valueInMgDl') || 0,
  //         total: response.length,
  //         max: maxItem,
  //         min: minItem,
  //       },
  //     };
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // },
};
