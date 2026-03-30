import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { ClarityButton } from '@/components/clarity-button';
import { Colors, Spacing, Typography } from '@/constants/theme';

export function WeeklySynthesis() {
  return (
    <View style={styles.card}>
      <Ionicons name="sparkles-outline" size={22} color={Colors.accent} />
      <Text style={styles.title}>Weekly Synthesis</Text>
      <Text style={styles.copy}>
        Your recent answers circle around avoidance, honesty, and the cost of staying half-committed.
      </Text>
      <ClarityButton label="Read synthesis" variant="outline" />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: Spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(30, 45, 61, 0.12)',
    backgroundColor: Colors.white,
    padding: Spacing.lg,
  },
  title: {
    ...Typography.italicCaption,
    color: Colors.navy,
    fontSize: 20,
  },
  copy: {
    ...Typography.body,
    color: Colors.stone,
  },
});
