import { Text, View, StyleSheet } from 'react-native';

// const badgeVariants = cva(
//   'flex flex-row items-center rounded-full px-2 py-1 text-xs font-semibold',
//   {
//     variants: {
//       variant: {
//         default: 'bg-primary',
//         secondary: 'bg-secondary',
//         destructive: 'bg-destructive',
//         success: 'bg-green-500 dark:bg-green-700',
//       },
//     },
//     defaultVariants: {
//       variant: 'default',
//     },
//   }
// );

// const badgeTextVariants = cva('font-medium text-center text-xs', {
//   variants: {
//     variant: {
//       default: 'text-primary-foreground',
//       secondary: 'text-secondary-foreground',
//       destructive: 'text-destructive-foreground',
//       success: 'text-green-100',
//     },
//   },
//   defaultVariants: {
//     variant: 'default',
//   },
// });

export interface BadgeProps {
  // extends React.ComponentPropsWithoutRef<typeof View>,
  // VariantProps<typeof badgeVariants> {
  label: string;
  labelClasses?: string;
}
function Badge({ label, labelClasses, ...props }: BadgeProps) {
  return (
    <View style={styles.badgeDefault} {...props}>
      <Text //className={cn(badgeTextVariants({ variant }), labelClasses)}
      >
        {label}
      </Text>
    </View>
  );
}

export { Badge };

const styles = StyleSheet.create({
  badgeDefault: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: '50%',
    fontSize: 12,
    fontWeight: '600',
  },
});
