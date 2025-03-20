// export const colors = {
//   white: '#FAFAFA',
//   title: '#333',
//   text: '#444',
//   gray: '#aaa',
//   background: '#efefef',

//   blue: {
//     '50': '#e6effb',
//     '100': '#b0ccf3',
//     '200': '#8ab4ee',
//     '300': '#5492e6',
//     '400': '#337de1',
//     '500': '#005cd9',
//     '600': '#0054c5',
//     '700': '#00419a',
//     '800': '#003377',
//     '900': '#00275b',
//   },
//   cyan: {
//     '50': '#e6f4fa',
//     '100': '#b1def0',
//     '200': '#8bcde8',
//     '300': '#56b7de',
//     '400': '#35a9d8',
//     '500': '#0393ce',
//     '600': '#0386bb',
//     '700': '#026892',
//     '800': '#025171',
//     '900': '#013e57',
//   },
//   red: {
//     '50': '#fae6ea',
//     '100': '#f0b1bd',
//     '200': '#e98b9d',
//     '300': '#df5570',
//     '400': '#d93555',
//     '500': '#cf022a',
//     '600': '#bc0226',
//     '700': '#93011e',
//     '800': '#720117',
//     '900': '#570112',
//   },
//   slate: {
//     '50': '#eff1f4',
//     '100': '#ced4dc',
//     '200': '#b7bfcb',
//     '300': '#96a2b3',
//     '400': '#8190a5',
//     '500': '#62748e',
//     '600': '#596a81',
//     '700': '#465265',
//     '800': '#36404e',
//     '900': '#29313c',
//   },
// };

export const defaultColors = {
  slate: {
    '50': '#EFF1F4',
    '100': '#CED4DC',
    '200': '#B7BFCB',
    '300': '#96A2B3',
    '400': '#8190A5',
    '500': '#62748E', // Tom base
    '600': '#596A81',
    '700': '#465265',
    '800': '#36404E', // Agora `onSurface`
    '900': '#29313C', // Agora `onBackground`
  },
  blue: {
    '50': '#E6EFFB',
    '100': '#B0CCF3',
    '200': '#8AB4EE',
    '300': '#5492E6',
    '400': '#337DE1',
    '500': '#005CD9',
    '600': '#0054C5',
    '700': '#00419A',
    '800': '#003377',
    '900': '#00275B',
  },

  cyan: {
    '50': '#E6F4FA',
    '100': '#B1DEF0',
    '200': '#8BCDE8',
    '300': '#56B7DE',
    '400': '#35A9D8',
    '500': '#0393CE',
    '600': '#0386BB',
    '700': '#026892',
    '800': '#025171',
    '900': '#013E57',
  },

  red: {
    '50': '#FAE6EA',
    '100': '#F0B1BD',
    '200': '#E98B9D',
    '300': '#DF5570',
    '400': '#D93555',
    '500': '#CF022A',
    '600': '#BC0226',
    '700': '#93011E',
    '800': '#720117',
    '900': '#570112',
  },

  green: {
    '50': '#edf7ee',
    '100': '#c8e6c9',
    '200': '#addaaf',
    '300': '#87c98a',
    '400': '#70bf73',
    '500': '#4caf50',
    '600': '#459f49',
    '700': '#367c39',
    '800': '#2a602c',
    '900': '#204a22',
  },
  yellow: {
    '50': '#fff5e6',
    '100': '#ffdfb0',
    '200': '#ffd08a',
    '300': '#ffba54',
    '400': '#ffad33',
    '500': '#ff9800',
    '600': '#e88a00',
    '700': '#b56c00',
    '800': '#8c5400',
    '900': '#6b4000',
  },
} as const;

export const colors = {
  // Fundo e Superfície
  background: '#F8F9FA', // Fundo geral
  surface: '#FFFFFF', // Superfícies elevadas (cards, modais)
  border: '#E0E0E0', // Bordas de inputs e cards
  placeholderOnPrimary: '#B0ccF3', // Bordas de inputs e cards
  placeholderOnSurface: '#A0A7B1', // Bordas de inputs e cards
  overlay: 'rgba(0,0,0,0.5)',

  //Texto
  onBackground: defaultColors.slate[800], // Texto sobre `background`
  onSurface: defaultColors.slate[700], // Texto sobre `surface`
  onPrimary: '#FFFFFF', // Texto sobre botões primários
  onSecondary: '#FFFFFF', // Texto sobre botões secundários
  //Estados
  primary: defaultColors.blue[500],
  secondary: defaultColors.cyan[500],
  success: defaultColors.green[500],
  warning: defaultColors.yellow[500],
  error: defaultColors.red[500],
  gradient: [defaultColors.blue[400], defaultColors.blue[600], defaultColors.blue[900]],
  level: {
    low: [defaultColors.cyan[500], defaultColors.cyan[600], defaultColors.cyan[700]],
    normal: [defaultColors.green[500], defaultColors.green[600], defaultColors.green[700]],
    preDiabetes: [defaultColors.yellow[500], defaultColors.yellow[600], defaultColors.yellow[700]],
    diabetes: [defaultColors.red[500], defaultColors.red[600], defaultColors.red[700]],
  },
};
