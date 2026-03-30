import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, Spacing, Typography } from '@/constants/theme';

export function ModeSelector() {
  return (
    <View style={styles.row}>
      <Pressable style={styles.card}>
        <Ionicons name="mic-outline" size={24} color={Colors.accent} />
        <Text style={styles.title}>Voice only</Text>
        <Text style={styles.subtitle}>No camera required</Text>
      </Pressable>

      <Pressable style={styles.card}>
        <Ionicons name="videocam-outline" size={24} color={Colors.accent} />
        <Text style={styles.title}>On camera</Text>
        <Text style={styles.subtitle}>Full presence</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  card: {
    flex: 1,
    gap: Spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(30, 45, 61, 0.15)',
    backgroundColor: Colors.white,
    padding: Spacing.lg,
  },
  title: {
    ...Typography.label,
    color: Colors.navy,
    fontSize: 16,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.stone,
  },
});
