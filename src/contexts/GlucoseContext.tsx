import { subDays } from 'date-fns';
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { DateType } from 'react-native-ui-datepicker';

import { useAuth } from './AuthContext';

import { CreateGlucoseDTO, GlucoseWithGlycemicRangeDTO } from '@/@types/Glucose';
import { GlycemicRangeDTO } from '@/@types/GlycemicRange';
import { GlucoseServices, GlycemicRangeServices } from '@/database/services';

type GlucoseProviderProps = {
  children: ReactNode;
};

type Metrics = {
  average: number;
  total: number;
  max: GlucoseWithGlycemicRangeDTO | null;
  min: GlucoseWithGlycemicRangeDTO | null;
};

type GlucoseContextData = {
  loadingLastGlucoseRecord: boolean;
  glucoseRecords: GlucoseWithGlycemicRangeDTO[];
  glycemicRanges: GlycemicRangeDTO[];
  lastGlucoseRecord: GlucoseWithGlycemicRangeDTO | null;
  metrics: Metrics | null;
  addGlucoseRecord: (data: CreateGlucoseDTO) => Promise<void>;
  setFilters: (filter: FilterProps) => void;
  selectedPeriod?: PeriodProps;
  selectedGlycemicRange: string[];
  setSelectedPeriodType: Dispatch<SetStateAction<PeriodType | undefined>>;
  selectedPeriodType?: PeriodType;
  periodTypes: PeriodType[];
};

export type PeriodType =
  | 'Últimos 3 Dias'
  | 'Últimos 7 Dias'
  | 'Últimos 14 Dias'
  | 'Últimos 30 Dias'
  | 'Personalizado';
const periodTypes: PeriodType[] = [
  'Últimos 3 Dias',
  'Últimos 7 Dias',
  'Últimos 14 Dias',
  'Últimos 30 Dias',
  'Personalizado',
];

export interface PeriodProps {
  startDate: DateType;
  endDate: DateType;
}
interface FilterProps {
  selectedPeriod?: PeriodProps;
  glycemicRange?: string[];
  selectedPeriodType?: PeriodType;
}

const GlucoseContext = createContext({} as GlucoseContextData);

export function GlucoseProvider({ children }: GlucoseProviderProps) {
  const { user } = useAuth();
  const [glucoseRecords, setGlucoseRecords] = useState<GlucoseWithGlycemicRangeDTO[]>([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loadingLastGlucoseRecord, setLoadingLastGlucoseRecord] = useState<boolean>(true);
  const [lastGlucoseRecord, setLastGlucoseRecord] = useState<GlucoseWithGlycemicRangeDTO | null>(
    null
  );

  const [glycemicRanges, setGlycemicRanges] = useState<GlycemicRangeDTO[]>([]);

  const [selectedPeriod, setSelectedPeriod] = useState<PeriodProps>();
  const [selectedGlycemicRange, setSelectedGlycemicRange] = useState<string[]>([]);

  const [selectedPeriodType, setSelectedPeriodType] = useState<PeriodType | undefined>();

  useEffect(() => {
    async function getData() {
      await getLastGlucoseRecord();
      await getGlucoseRecords();
      await getGlycemicRanges();
    }
    if (user !== null) {
      getData();
    }
  }, [user]);

  useEffect(() => {
    async function getData() {
      getMetrics();
      await getLastGlucoseRecord();
    }
    if (user !== null) {
      getData();
    }
  }, [user, glucoseRecords]);

  useEffect(() => {
    getGlucoseRecords();
  }, [selectedPeriod, selectedGlycemicRange]);

  async function getGlucoseRecords() {
    if (!user) return;
    if (selectedPeriod) {
      const response = await GlucoseServices.getGlucoseRecordsByPeriodAndGlycemicRange({
        userId: user.uid,
        startDate: selectedPeriod.startDate,
        endDate: selectedPeriod.endDate,
        glycemicRangeId: selectedGlycemicRange,
      });
      setGlucoseRecords(response);
    } else {
      const response = await GlucoseServices.getLastGlucoseRecords({ userId: user.uid });
      setGlucoseRecords(response);
    }
  }
  function getMetrics() {
    if (glucoseRecords.length === 0) {
      setMetrics(null);
    }
    const total = glucoseRecords.length;
    const average = glucoseRecords.reduce((acc, item) => acc + item.valueInMgDl, 0) / total;

    const { min, max } = glucoseRecords.reduce(
      (acc, item) => {
        if (item.valueInMgDl < acc.min.valueInMgDl) acc.min = item;
        if (item.valueInMgDl > acc.max.valueInMgDl) acc.max = item;
        return acc;
      },
      { min: glucoseRecords[0], max: glucoseRecords[0] }
    );

    setMetrics({ average, max, min, total });
  }
  async function addGlucoseRecord(data: CreateGlucoseDTO) {
    if (!user) return;
    await GlucoseServices.create({
      date: data.date,
      userId: user.uid,
      valueInMgDl: data.valueInMgDl,
      notes: data.notes,
      glycemicRangeId: data.glycemicRangeId,
    });
  }
  async function getLastGlucoseRecord() {
    if (!user) return;
    setLoadingLastGlucoseRecord(true);
    try {
      const record = await GlucoseServices.getLastGlucoseRecord(user.uid);

      setLastGlucoseRecord(() => record);
      setLoadingLastGlucoseRecord(false);
    } catch (error) {
      console.error(error);
      setLastGlucoseRecord(() => null);
      setLoadingLastGlucoseRecord(false);
    }
  }
  async function getGlycemicRanges() {
    if (!user) return;
    const response = await GlycemicRangeServices.get({ userId: user.uid });
    setGlycemicRanges(response);
  }

  function setFilters({ selectedPeriod, selectedPeriodType, glycemicRange }: FilterProps) {
    setSelectedPeriod(selectedPeriod);
    setSelectedPeriodType(selectedPeriodType);
    if (!glycemicRange) {
      setSelectedGlycemicRange([]);
    } else {
      setSelectedGlycemicRange(glycemicRange);
    }
  }

  return (
    <GlucoseContext.Provider
      value={{
        loadingLastGlucoseRecord,
        glucoseRecords,
        glycemicRanges,
        lastGlucoseRecord,
        metrics,
        addGlucoseRecord,
        setFilters,
        selectedPeriod,
        selectedGlycemicRange,
        setSelectedPeriodType,
        periodTypes,
        selectedPeriodType,
      }}>
      {children}
    </GlucoseContext.Provider>
  );
}

export function useGlucose() {
  const context = useContext(GlucoseContext);
  if (!context) {
    throw new Error('Fora do contexto');
  }
  return context;
}
