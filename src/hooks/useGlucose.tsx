import { useEffect, useState } from 'react';

import { CreateGlucoseDTO, GlucoseDTO } from '@/@types/Glucose';
import { GlycemicRangeDTO } from '@/@types/GlycemicRange';
import { GlycemicRangeServices } from '@/database/services';
import { GlucoseServices } from '@/database/services/GlucoseServices';

export function useGlucose(userId: string) {
  const [glucoseRecords, setGlucoseRecords] = useState<GlucoseDTO[]>([]);
  const [metrics, setMetrics] = useState<{
    avarage: number;
    total: number;
    max: GlucoseDTO;
    min: GlucoseDTO;
  }>();
  const [lastGlucoseRecord, setLastGlucoseRecord] = useState<GlucoseDTO | null>(null);
  const [glycemicRanges, setGlycemicRanges] = useState<GlycemicRangeDTO[]>([]);

  useEffect(() => {
    getGlycemicRanges();
  }, []);

  async function getInformations(oldDate: Date, recentDate: Date) {
    const { items, metrics } = await GlucoseServices.getAll({ userId, oldDate, recentDate });

    setGlucoseRecords(items);
    setMetrics(metrics);
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

  return {
    glucoseRecords,
    addRecord,
    glycemicRanges,
    getLastRecord,
    lastGlucoseRecord,
    metrics,
    getInformations,
  };
}
