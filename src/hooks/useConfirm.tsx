import React, { useState, useCallback } from 'react';

import { ConfirmDialog } from '../components/ConfirmDialog';
interface ConfigProps {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}
export const useConfirm = () => {
  const [visible, setVisible] = useState(false);
  const [config, setConfig] = useState<ConfigProps>({
    title: '',
    message: '',
    confirmText: '',
    cancelText: '',
  });
  const [resolver, setResolver] = useState<((value: boolean) => void) | null>(null);

  const confirm = useCallback(
    ({
      confirmText,
      cancelText,
      message,
      title,
    }: Pick<ConfigProps, 'confirmText' | 'cancelText' | 'message' | 'title'>): Promise<boolean> => {
      return new Promise((resolve) => {
        setConfig({ title, message, cancelText, confirmText });
        setVisible(true);
        setResolver(() => resolve);
      });
    },
    []
  );

  const handleConfirm = () => {
    setVisible(false);
    resolver?.(true);
  };

  const handleCancel = () => {
    setVisible(false);
    resolver?.(false);
  };

  const Confirm = (
    <ConfirmDialog
      visible={visible}
      title={config.title}
      message={config.message}
      cancelText={config.cancelText}
      confirmText={config.confirmText}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );

  return { confirm, Confirm };
};
