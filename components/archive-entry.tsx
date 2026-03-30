import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, Spacing, Typography } from '@/constants/theme';
import type { ArchiveEntryRecord } from '@/utils/storage';
import { formatShortDate } from '@/utils/date-helpers';

type ArchiveEntryProps = {
  entry: ArchiveEntryRecord;
  isLatest?: boolean;
};

export function ArchiveEntry({ entry, isLatest = false }: ArchiveEntryProps) {
  return (
    <View style={[styles.row, isLatest ? styles.latestRow : undefined]}>
      <Text style={styles.date}>{formatShortDate(entry.date)}</Text>
      <Ionicons
        name={entry.mode === 'video' ? 'videocam-outline' : 'mic-outline'}
        size={16}
        color={Colors.accent}
      />
      <Text style={styles.snippet} numberOfLines={1}>
        {entry.promptText}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(142, 142, 147, 0.2)',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
  },
  latestRow: {
    borderLeftWidth: 2,
    borderLeftColor: Colors.accent,
  },
  date: {
    ...Typography.body,
    color: Colors.stone,
    fontSize: 12,
    width: 44,
  },
  snippet: {
    ...Typography.body,
    color: Colors.navy,
    flex: 1,
  },
});
