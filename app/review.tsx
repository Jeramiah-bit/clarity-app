import { Link, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ClarityButton } from '@/components/clarity-button';
import { ClarityScreen } from '@/components/clarity-screen';
import { PlaybackView } from '@/components/playback-view';
import { Colors, Spacing, Typography } from '@/constants/theme';

export default function ReviewScreen() {
  const params = useLocalSearchParams<{ promptText?: string; mode?: string }>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ClarityScreen contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Link href="/record" asChild>
            <Pressable hitSlop={12}>
              <Text style={styles.backLabel}>Back</Text>
            </Pressable>
          </Link>
        </View>

        <View style={styles.content}>
          <Text style={styles.prompt}>
            {params.promptText ?? 'What are you pretending not to know right now?'}
          </Text>
          <PlaybackView mode={params.mode === 'video' ? 'video' : 'audio'} />
        </View>

        <View style={styles.actions}>
          <ClarityButton label="Save to archive" />
          <ClarityButton label="Try again" variant="outline" />
          <Pressable hitSlop={12}>
            <Text style={styles.discard}>Discard</Text>
          </Pressable>
        </View>
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
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'flex-start',
  },
  backLabel: {
    ...Typography.label,
    color: Colors.navy,
  },
  content: {
    gap: Spacing.lg,
    paddingVertical: Spacing.xl,
  },
  prompt: {
    ...Typography.title,
    color: Colors.navy,
    textAlign: 'center',
  },
  actions: {
    gap: Spacing.md,
  },
  discard: {
    ...Typography.body,
    color: Colors.stone,
    textAlign: 'center',
  },
});
