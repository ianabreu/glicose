import { forwardRef } from 'react';
import { Text, TextInput, View } from 'react-native';

import { cn } from '../lib/utils';

export interface InputProps extends React.ComponentPropsWithoutRef<typeof TextInput> {
  label?: string;
  labelClasses?: string;
  inputClasses?: string;
  error?: string;
}
const Input = forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ className, label, labelClasses, inputClasses, error, ...props }, ref) => (
    <View className={cn('flex min-h-14 w-full flex-col gap-1.5', className)}>
      {label && <Text className={cn('text-base', labelClasses)}>{label}</Text>}
      <TextInput
        className={cn(
          inputClasses,
          'min-h-14 rounded-lg border border-input px-4 py-2.5',
          error && 'border-red-500 text-red-500'
        )}
        {...props}
      />
      {error && <Text className={cn('text-base text-red-500')}>{error}</Text>}
    </View>
  )
);

export { Input };
