import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, Spacing, Typography } from '@/constants/theme';

type StreakBadgeProps = {
  dayCount: number;
};

export function StreakBadge({ dayCount }: StreakBadgeProps) {
  return (
    <View style={styles.badge}>
      <Ionicons name="flame" size={12} color={Colors.white} />
      <Text style={styles.label}>Day {dayCount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 999,
    backgroundColor: Colors.gold,
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
  },
  label: {
    ...Typography.body,
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
});
