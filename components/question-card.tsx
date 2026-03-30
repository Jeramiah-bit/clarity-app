import { StyleSheet, Text, View } from 'react-native';

import { Colors, Spacing, Typography } from '@/constants/theme';
import type { PromptRecord } from '@/data/prompts';

type QuestionCardProps = {
  prompt: PromptRecord;
};

export function QuestionCard({ prompt }: QuestionCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.category}>{prompt.category}</Text>
      <Text style={styles.question}>{prompt.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.navy,
    borderRadius: 8,
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  category: {
    ...Typography.category,
    color: Colors.accent,
  },
  question: {
    ...Typography.question,
    color: Colors.white,
  },
});
