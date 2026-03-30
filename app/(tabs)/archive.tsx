import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ArchiveEntry } from '@/components/archive-entry';
import { ClarityScreen } from '@/components/clarity-screen';
import { WeeklySynthesis } from '@/components/weekly-synthesis';
import { sampleArchiveEntries } from '@/data/prompts';
import { Colors, Spacing, Typography } from '@/constants/theme';

export default function ArchiveScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ClarityScreen contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>Your archive</Text>
          <Text style={styles.count}>{sampleArchiveEntries.length} entries</Text>
        </View>

        <View style={styles.list}>
          {sampleArchiveEntries.map((entry, index) => (
            <ArchiveEntry key={entry.id} entry={entry} isLatest={index === 0} />
          ))}
        </View>

        <WeeklySynthesis />
      </ClarityScreen>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.ivory,
  },
  container: {
    gap: Spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  heading: {
    ...Typography.display,
    color: Colors.navy,
    fontSize: 28,
  },
  count: {
    ...Typography.body,
    color: Colors.stone,
  },
  list: {
    backgroundColor: Colors.ivory,
  },
});
