import { Link, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ClarityScreen } from '@/components/clarity-screen';
import { ModeSelector } from '@/components/mode-selector';
import { Colors, Spacing, Typography } from '@/constants/theme';

export default function RecordScreen() {
  const params = useLocalSearchParams<{ promptText?: string; category?: string }>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ClarityScreen contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Link href="/" asChild>
            <Pressable hitSlop={12}>
              <Text style={styles.backLabel}>Back</Text>
            </Pressable>
          </Link>
          <Text style={styles.brand}>Clarity</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.hero}>
          <Text style={styles.heading}>How would you like to answer?</Text>
          <Text style={styles.subtitle} numberOfLines={2}>
            {params.promptText ?? 'What are you pretending not to know right now?'}
          </Text>
        </View>

        <ModeSelector />

        <View style={styles.footer}>
          <Text style={styles.categoryLabel}>{params.category ?? 'Avoidance'}</Text>
          <Text style={styles.footerCopy}>Your answer is private. Nothing is shared.</Text>
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
    gap: Spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerSpacer: {
    width: 40,
  },
  backLabel: {
    ...Typography.label,
    color: Colors.navy,
  },
  brand: {
    ...Typography.italicCaption,
    color: Colors.navy,
    fontSize: 20,
  },
  hero: {
    gap: Spacing.md,
  },
  heading: {
    ...Typography.display,
    color: Colors.navy,
    fontSize: 34,
    textAlign: 'center',
  },
  subtitle: {
    ...Typography.body,
    color: Colors.stone,
    fontSize: 16,
    textAlign: 'center',
  },
  footer: {
    gap: Spacing.sm,
    alignItems: 'center',
  },
  categoryLabel: {
    ...Typography.category,
    color: Colors.accent,
  },
  footerCopy: {
    ...Typography.italicCaption,
    color: Colors.stone,
    textAlign: 'center',
  },
});
