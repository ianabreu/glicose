import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { colors } from '@/constants/colors';

export function Empty() {
  return (
    <View style={styles.container}>
      <View style={styles.imageArea}>
        <Image source={require('../assets/empty.png')} style={styles.image} />
      </View>
      <Text style={styles.message}>Não Encontrado!</Text>
      <Text style={styles.text}>Nenhum registro realizado nesse período.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontFamily: 'Bold',
    fontSize: 18,
    color: colors.onBackground,
    marginBottom: 8,
    textAlign: 'center',
  },
  text: {
    fontFamily: 'Normal',
    fontSize: 14,
    color: colors.onBackground,
    opacity: 0.7,
    marginBottom: 16,
    textAlign: 'center',
  },
  imageArea: {
    width: '100%',
    maxHeight: 150,
    alignItems: 'center',
  },
  image: { width: '100%', height: '100%', objectFit: 'contain' },
});
