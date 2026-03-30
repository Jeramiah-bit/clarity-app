import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ClarityButton } from '@/components/clarity-button';
import { ClarityScreen } from '@/components/clarity-screen';
import { QuestionCard } from '@/components/question-card';
import { StreakBadge } from '@/components/streak-badge';
import { samplePrompt } from '@/data/prompts';
import { Colors, Spacing, Typography } from '@/constants/theme';
import { formatLongDate } from '@/utils/date-helpers';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ClarityScreen contentContainerStyle={styles.container}>
        <View style={styles.topRow}>
          <Text style={styles.dateLabel}>{formatLongDate(new Date())}</Text>
          <StreakBadge dayCount={7} />
        </View>

        <QuestionCard prompt={samplePrompt} />

        <Text style={styles.caption}>Take your time.</Text>

        <Link
          href={{
            pathname: '/record',
            params: {
              promptText: samplePrompt.text,
              category: samplePrompt.category,
            },
          }}
          asChild>
          <ClarityButton label="Answer this question" />
        </Link>
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
    gap: Spacing.lg,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateLabel: {
    ...Typography.micro,
    color: Colors.stone,
  },
  caption: {
    ...Typography.italicCaption,
    color: Colors.stone,
    textAlign: 'center',
  },
});
