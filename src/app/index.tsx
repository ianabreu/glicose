import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';

import logo from '../../assets/icon.png';

import { colors } from '@/constants/colors';

export default function Index() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} resizeMode="contain" />
      <ActivityIndicator size={40} color="#FFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  image: {
    width: 100,
    height: 100,
  },
});
