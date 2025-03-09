import { useEffect, useState } from 'react';

import { CreateGlucoseDTO, GlucoseDTO } from '@/@types/Glucose';
import { GlycemicRangeDTO } from '@/@types/GlycemicRange';
import { GlycemicRangeServices } from '@/database/services';
import { GlucoseServices } from '@/database/services/GlucoseServices';
import { subtractDate } from '@/utils/date';

export function useGlucose(userId: string) {
  const [glucoseRecords, setGlucoseRecords] = useState<GlucoseDTO[]>([]);
  const [lastGlucoseRecord, setLastGlucoseRecord] = useState<GlucoseDTO | null>(null);
  const [glycemicRanges, setGlycemicRanges] = useState<GlycemicRangeDTO[]>([]);

  useEffect(() => {
    loadRecords(subtractDate(new Date(), 7), new Date());
    getGlycemicRanges();
  }, []);

  async function loadRecords(startDate: Date, endDate: Date) {
    const records = await GlucoseServices.getAll({ userId, startDate, endDate });

    setGlucoseRecords(records);
  }
  async function getLastRecord() {
    const record = await GlucoseServices.getLast(userId);
    setLastGlucoseRecord(record);
  }

  async function addRecord({
    valueInMgDl,
    date,
    notes,
    glycemicRangeId,
  }: Omit<CreateGlucoseDTO, 'userId'>) {
    await GlucoseServices.create({ date, userId, valueInMgDl, notes, glycemicRangeId });
  }
  async function getGlycemicRanges() {
    const response = await GlycemicRangeServices.get({ userId });
    setGlycemicRanges(response);
  }
  //   async function removeRecord(id: string) {
  //     await GlucoseServices.delete(id);
  //     loadRecords();
  //   }

  return {
    glucoseRecords,
    addRecord,
    glycemicRanges,
    getLastRecord,
    lastGlucoseRecord,
    //removeRecord
  };
}
