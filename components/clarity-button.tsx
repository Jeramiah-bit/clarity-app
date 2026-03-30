import { Pressable, StyleSheet, Text } from 'react-native';

import { Colors, Spacing, Typography } from '@/constants/theme';

type ClarityButtonProps = {
  label: string;
  variant?: 'filled' | 'outline';
};

export function ClarityButton({ label, variant = 'filled' }: ClarityButtonProps) {
  return (
    <Pressable style={[styles.base, variant === 'outline' ? styles.outline : styles.filled]}>
      <Text style={[styles.label, variant === 'outline' ? styles.outlineLabel : styles.filledLabel]}>
        {variant === 'filled' ? `${label} →` : label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
  },
  filled: {
    backgroundColor: Colors.accent,
  },
  outline: {
    borderWidth: 1,
    borderColor: Colors.navy,
    backgroundColor: 'transparent',
  },
  label: {
    ...Typography.label,
  },
  filledLabel: {
    color: Colors.white,
  },
  outlineLabel: {
    color: Colors.navy,
  },
});
