import { useEffect, useRef } from 'react';
import { Animated, View as RnView, type View } from 'react-native';

import { cn } from '../lib/utils';

function Progress({
  className,
  ...props
}: { className?: string; value: number } & React.ComponentPropsWithoutRef<typeof View>) {
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: props.value,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [widthAnim, props.value]);

  return (
    <RnView className={cn('bg-secondary h-4 w-full overflow-hidden rounded-full', className)}>
      <Animated.View
        className={cn('h-full bg-primary')}
        style={{
          width: widthAnim.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%'],
          }),
        }}
      />
    </RnView>
  );
}

export { Progress };
