import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Button } from './Button';
import { Title } from './Title';

import { colors } from '@/constants/colors';
export function Header() {
  return (
    <View style={styles.headerArea}>
      <Title variant="header">Página Inicial</Title>
      <View style={styles.buttonArea}>
        <Link style={styles.iconButton} href="/(auth)/exportToFile">
          <Button.Icon name="file-export-outline" color={colors.primary} size={30} />
        </Link>
        <Link style={styles.iconButton} href="/(auth)/profile">
          <Button.Icon name="account-circle" color={colors.primary} size={30} />
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
    padding: 6,
    borderRadius: 8,
    color: colors.primary,
  },
});
