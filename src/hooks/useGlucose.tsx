// import { useEffect, useState } from 'react';
// import { DateType } from 'react-native-ui-datepicker';

// import { CreateGlucoseDTO, GlucoseWithGlycemicRangeDTO } from '@/@types/Glucose';
// import { GlycemicRangeDTO } from '@/@types/GlycemicRange';
// import { GlycemicRangeServices } from '@/database/services';
// import { GlucoseServices } from '@/database/services/GlucoseServices';
// type Metrics = {
//   average: number;
//   total: number;
//   max: GlucoseWithGlycemicRangeDTO | null;
//   min: GlucoseWithGlycemicRangeDTO | null;
// };
// interface FiltersProps {
//   startDate: DateType;
//   endDate: DateType;
// }
// type Filter = FiltersProps | null;
// export function useGlucose(userId: string) {
//   const [loading, setLoading] = useState<boolean>(true);
//   const [glucoseRecords, setGlucoseRecords] = useState<GlucoseWithGlycemicRangeDTO[]>([]);
//   const [lastGlucoseRecord, setLastGlucoseRecord] = useState<GlucoseWithGlycemicRangeDTO | null>(
//     null
//   );
//   const [glycemicRanges, setGlycemicRanges] = useState<GlycemicRangeDTO[]>([]);

//   const [intervalDate, setIntervalDate] = useState<{
//     oldDate: DateType;
//     recentDate: DateType;
//   } | null>(null);

//   useEffect(() => {
//     getGlycemicRanges();
//     getGlucoseRecords();
//   }, [intervalDate]);

//   useEffect(() => {
//     getMetrics();
//   }, [glucoseRecords]);

//   function setFilters(filter: Filter) {
//     if (filter === null) {
//       setIntervalDate(null);
//     } else {
//       setIntervalDate((prev) => ({
//         ...prev,
//         oldDate: filter.startDate,
//         recentDate: filter.endDate,
//       }));
//     }
//     getGlucoseRecords();
//   }

//   function getMetrics(): Metrics {
//     if (glucoseRecords.length === 0) {
//       return { average: 0, total: 0, max: null, min: null };
//     }
//     const total = glucoseRecords.length;
//     const average = glucoseRecords.reduce((acc, item) => acc + item.valueInMgDl, 0) / total;

//     const { min, max } = glucoseRecords.reduce(
//       (acc, item) => {
//         if (item.valueInMgDl < acc.min.valueInMgDl) acc.min = item;
//         if (item.valueInMgDl > acc.max.valueInMgDl) acc.max = item;
//         return acc;
//       },
//       { min: glucoseRecords[0], max: glucoseRecords[0] } // Inicializa com o primeiro item
//     );
//     const data: Metrics = { average, max, min, total };

//     return data;
//   }
//   async function getGlucoseRecords() {
//     if (intervalDate !== null) {
//       const response = await GlucoseServices.getFilteredCustomRange({
//         userId,
//         startDate: intervalDate.oldDate,
//         endDate: intervalDate.recentDate,
//       });
//       setGlucoseRecords(response);
//     } else {
//       const response = await GlucoseServices.getLastWithLimit({ userId });
//       setGlucoseRecords(response);
//     }
//   }

//   async function getLastGlucoseRecord() {
//     setLoading(true);
//     try {
//       const record = await GlucoseServices.getLastGlucoseRecord(userId);
//       setLastGlucoseRecord(record);
//       setLoading(false);
//     } catch (error) {
//       setLastGlucoseRecord(null);
//       throw error;
//     }
//   }
//   async function addRecord({
//     valueInMgDl,
//     date,
//     notes,
//     glycemicRangeId,
//   }: Omit<CreateGlucoseDTO, 'userId'>) {
//     await GlucoseServices.create({ date, userId, valueInMgDl, notes, glycemicRangeId });
//   }
//   async function getGlycemicRanges() {
//     const response = await GlycemicRangeServices.get({ userId });
//     setGlycemicRanges(response);
//   }

//   return {
//     glucoseRecords,
//     addRecord,
//     glycemicRanges,
//     getLastGlucoseRecord,
//     lastGlucoseRecord,
//     getMetrics,
//     loading,
//     setLoading,
//     setFilters,
//     intervalDate,
//   };
// }
