import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';

interface DialogProps {
  visible: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  cancelText?: string;
  confirmText?: string;
}

export function Dialog({ visible, title, message, onConfirm, onCancel }: DialogProps) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.confirmText}>confirmText</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    width: '80%',
    backgroundColor: colors.surface || '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Bold',
    fontSize: 18,
    color: colors.error || '#005CD9',
    marginBottom: 10,
  },
  message: {
    fontFamily: 'Normal',
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
  },
  cancelButton: {
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 8,
    marginRight: 10,
  },
  cancelText: {
    fontFamily: 'Bold',
    color: '#333',
  },
  confirmButton: {
    padding: 10,
    backgroundColor: colors.error || '#005CD9',
    borderRadius: 8,
  },
  confirmText: {
    fontFamily: 'Bold',
    color: colors.onPrimary || '#fff',
  },
});
