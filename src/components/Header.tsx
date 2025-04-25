import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Title } from './Title';

import { colors } from '@/constants/colors';
export function Header() {
  return (
    <View style={styles.headerArea}>
      <Title variant="header">Página Inicial</Title>
      <View style={styles.buttonArea}>
        <Link style={styles.iconButton} href="/(auth)/exportToFile">
          <Feather name="upload" size={25} />
        </Link>
        <Link style={styles.iconButton} href="/(auth)/profile">
          <Feather name="user" size={25} />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 56,
    width: '100%',
    marginBottom: 8,
  },
  buttonArea: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    padding: 4,
    borderRadius: 8,
    color: colors.secondary,
  },
});
