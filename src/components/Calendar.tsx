// // import React, { useState } from 'react';
// // import { Pressable, View } from 'react-native';
// // import { Calendar, LocaleConfig, DateData } from 'react-native-calendars';
// // import { MarkedDates } from 'react-native-calendars/src/types';

import Constants from 'expo-constants';
import { useCalendars } from 'expo-localization';
import { useState } from 'react';

// // import { Button } from './Button';

// // import { colors } from '@/constants/colors';

// // const localeConfig = {
// //   'pt-br': {
// //     monthNames: [
// //       'Janeiro',
// //       'Fevereiro',
// //       'Março',
// //       'Abril',
// //       'Maio',
// //       'Junho',
// //       'Julho',
// //       'Agosto',
// //       'Setembro',
// //       'Outubro',
// //       'Novembro',
// //       'Dezembro',
// //     ],
// //     monthNamesShort: [
// //       'Jan.',
// //       'Fev.',
// //       'Mar',
// //       'Abr',
// //       'Mai',
// //       'Jun',
// //       'Jul',
// //       'Ago',
// //       'Set.',
// //       'Out',
// //       'Nov',
// //       'Dez',
// //     ],
// //     dayNames: [
// //       'Domingo',
// //       'Segunda-feira',
// //       'Terça-feira',
// //       'Quarta-feira',
// //       'Quinta-feira',
// //       'Sexta-feira',
// //       'Sábado',
// //     ],
// //     dayNamesShort: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB.'],
// //   },
// // };

// // interface CalendarProps {
// //   close: () => void;
// //   handleFilter: (date: string) => void;
// //   selectedDate?: string;
// // }

// // LocaleConfig.locales['pt-br'] = localeConfig['pt-br'];
// // LocaleConfig.defaultLocale = 'pt-br';

// // export function CalendarModal({
// //   close,
// //   handleFilter,
// //   selectedDate = new Date().toString(),
// // }: CalendarProps) {
// //   const [dateNow, setDateNow] = useState<string>(new Date().toString());
// //   const [markedDates, setMarkedDates] = useState<MarkedDates>({
// //     [selectedDate]: {
// //       selected: true,
// //       selectedColor: colors.primary,
// //       textColor: colors.onPrimary,
// //     },
// //   });
// //   function handleClose() {
// //     close();
// //   }
// //   function handleOnDayPress(date: DateData) {
// //     setDateNow(date.dateString);
// //     const markedDay: MarkedDates = {};
// //     markedDay[date.dateString] = {
// //       selected: true,
// //       selectedColor: colors.primary,
// //       textColor: colors.onPrimary,
// //     };
// //     setMarkedDates(markedDay);
// //   }
// //   function handleFilterDate() {
// //     handleFilter(dateNow);
// //     handleClose();
// //   }
// //   return (
// //     <View style={{ backgroundColor: 'rgba(34, 34, 34, 0.4)', flex: 1 }}>
// //       <Pressable onPress={handleClose} style={{ flex: 1 }} />
// //       <View
// //         style={{
// //           backgroundColor: colors.background,
// //           padding: 16,
// //           flex: 1,
// //           justifyContent: 'space-between',
// //         }}>
// //         <Calendar
// //           onDayPress={handleOnDayPress}
// //           markedDates={markedDates}
// //           enableSwipeMonths
// //           theme={{
// //             todayTextColor: colors.primary,
// //             selectedDayBackgroundColor: colors.secondary,
// //           }}
// //         />
// //         <Button label="Filtrar" onPress={handleFilterDate} />
// //       </View>
// //     </View>
// //   );
// // }
// import React, { useState } from 'react';
// import { Pressable, View } from 'react-native';
// import { Calendar, LocaleConfig, DateData } from 'react-native-calendars';
// import { MarkedDates } from 'react-native-calendars/src/types';

// import { Button } from './Button';

// import { colors } from '@/constants/colors';

// LocaleConfig.locales['pt-br'] = {
//   monthNames: [
//     'Janeiro',
//     'Fevereiro',
//     'Março',
//     'Abril',
//     'Maio',
//     'Junho',
//     'Julho',
//     'Agosto',
//     'Setembro',
//     'Outubro',
//     'Novembro',
//     'Dezembro',
//   ],
//   monthNamesShort: [
//     'Jan.',
//     'Fev.',
//     'Mar',
//     'Abr',
//     'Mai',
//     'Jun',
//     'Jul',
//     'Ago',
//     'Set.',
//     'Out',
//     'Nov',
//     'Dez',
//   ],
//   dayNames: [
//     'Domingo',
//     'Segunda-feira',
//     'Terça-feira',
//     'Quarta-feira',
//     'Quinta-feira',
//     'Sexta-feira',
//     'Sábado',
//   ],
//   dayNamesShort: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB.'],
// };
// LocaleConfig.defaultLocale = 'pt-br';

// interface CalendarProps {
//   close: () => void;
//   handleFilter: (startDate: string, endDate: string) => void;
// }

// export function CalendarModal({ close, handleFilter }: CalendarProps) {
//   const [startDate, setStartDate] = useState<string | null>(null);
//   const [endDate, setEndDate] = useState<string | null>(null);
//   const [markedDates, setMarkedDates] = useState<MarkedDates>({});

//   function handleOnDayPress(date: DateData) {
//     if (!startDate || (startDate && endDate)) {
//       setStartDate(date.dateString);
//       setEndDate(null);
//       setMarkedDates({
//         [date.dateString]: {
//           startingDay: true,
//           color: colors.primary,
//           textColor: colors.onPrimary,
//         },
//       });
//     } else {
//       const newEndDate = date.dateString;
//       if (newEndDate < startDate) {
//         setStartDate(newEndDate);
//         setEndDate(startDate);
//       } else {
//         setEndDate(newEndDate);
//       }

//       const range: MarkedDates = {
//         [startDate]: { startingDay: true, color: colors.primary, textColor: colors.onPrimary },
//         [newEndDate]: { endingDay: true, color: colors.primary, textColor: colors.onPrimary },
//       };
//       const currentDate = new Date(startDate);
//       while (currentDate < new Date(newEndDate)) {
//         currentDate.setDate(currentDate.getDate() + 1);
//         const dateString = currentDate.toISOString().split('T')[0];
//         range[dateString] = { color: colors.primary, textColor: colors.onPrimary };
//       }
//       setMarkedDates(range);
//     }
//   }

//   function handleFilterDate() {
//     if (startDate && endDate) {
//       handleFilter(startDate, endDate);
//       close();
//     }
//   }

//   return (
//     <View style={{ backgroundColor: 'rgba(34, 34, 34, 0.4)', flex: 1 }}>
//       <Pressable onPress={close} style={{ flex: 1 }} />
//       <View
//         style={{
//           backgroundColor: colors.background,
//           padding: 16,
//           flex: 1,
//           justifyContent: 'space-between',
//         }}>
//         <Calendar
//           onDayPress={handleOnDayPress}
//           markedDates={markedDates}
//           markingType="period"
//           enableSwipeMonths
//           theme={{
//             todayTextColor: colors.primary,
//             selectedDayBackgroundColor: colors.secondary,
//           }}
//         />
//         <Button label="Filtrar" onPress={handleFilterDate} disabled={!startDate || !endDate} />
//       </View>
//     </View>
//   );
// }

import { Alert } from 'react-native';
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';

import { Button } from './Button';

import { colors } from '@/constants/colors';
interface CalendarProps {
  handleCustomPeriod: (
    startDate: string | number | undefined,
    endDate: string | number | undefined
  ) => void;
  closeCalendar: () => void;
}
export function Calendar({ handleCustomPeriod, closeCalendar }: CalendarProps) {
  const defaultStyles = useDefaultStyles();
  const [calendar] = useCalendars();
  const today = new Date();
  const [startDate, setSelectedStartDate] = useState<DateType>();
  const [endDate, setSelectedEndDate] = useState<DateType>(today);

  function onFilter() {
    if (!endDate && !startDate) {
      Alert.alert('Período Inválido', 'Selecione um período válido');
      return;
    }
    handleCustomPeriod(startDate?.valueOf(), endDate?.valueOf());
    closeCalendar();
  }
  return (
    <>
      <DateTimePicker
        mode="range"
        startDate={startDate}
        endDate={endDate}
        maxDate={today}
        multiRangeMode={false}
        onChange={({ startDate, endDate }) => {
          setSelectedStartDate(startDate);
          setSelectedEndDate(endDate);
        }}
        locale="pt-br"
        weekdaysFormat="short"
        monthCaptionFormat="full"
        showOutsideDays
        style={{ backgroundColor: colors.background }}
        styles={{
          ...defaultStyles,
          selected: { backgroundColor: colors.primary },
          range_start: {
            backgroundColor: colors.secondary,
          },
          range_end: {
            backgroundColor: colors.error,
          },
          range_fill: {
            backgroundColor: colors.primary,
            marginVertical: 2,
            opacity: 0.5,
            borderWidth: 0,
          },
          day_label: {
            color: colors.onBackground,
            fontFamily: 'Medium',
          },
          today_label: { color: colors.primary },
          button_next: {
            backgroundColor: colors.secondary,
            borderRadius: 8,
            padding: 12,
          },
          button_prev: {
            backgroundColor: colors.secondary,
            borderRadius: 8,
            padding: 12,
          },
          button_next_image: { tintColor: colors.onSecondary },
          button_prev_image: { tintColor: colors.onSecondary },
        }}
        timeZone={calendar.timeZone || undefined}
      />
      <Button label="Salvar" onPress={onFilter} />
    </>
  );
}
