import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ClarityButton } from '@/components/clarity-button';
import { ClarityScreen } from '@/components/clarity-screen';
import { defaultCategories } from '@/data/prompts';
import { Colors, Spacing, Typography } from '@/constants/theme';

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ClarityScreen contentContainerStyle={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Daily reminder</Text>
          <Text style={styles.time}>8:00 AM</Text>
          <Pressable hitSlop={12}>
            <Text style={styles.changeLink}>Change time</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Prompt categories</Text>
          {defaultCategories.map((category) => (
            <View style={styles.categoryRow} key={category}>
              <Text style={styles.categoryText}>{category}</Text>
              <Switch
                value
                trackColor={{ false: 'rgba(142, 142, 147, 0.3)', true: Colors.accent }}
                thumbColor={Colors.white}
              />
            </View>
          ))}
        </View>

        <View style={styles.proCard}>
          <Text style={styles.proTitle}>Clarity Pro</Text>
          <Text style={styles.proCopy}>Unlimited archival storage</Text>
          <Text style={styles.proCopy}>Advanced behavioral insights</Text>
          <Text style={styles.proCopy}>Guided seasonal reflection series</Text>
          <View style={styles.proButton}>
            <ClarityButton label="Upgrade" />
          </View>
        </View>

        <Text style={styles.version}>Version 1.0</Text>
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
  section: {
    gap: Spacing.sm,
  },
  sectionLabel: {
    ...Typography.micro,
    color: Colors.stone,
  },
  time: {
    ...Typography.display,
    color: Colors.navy,
    fontSize: 36,
  },
  changeLink: {
    ...Typography.body,
    color: Colors.accent,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
  },
  categoryText: {
    ...Typography.body,
    color: Colors.navy,
    fontSize: 15,
  },
  proCard: {
    gap: Spacing.sm,
    backgroundColor: Colors.navy,
    borderRadius: 8,
    padding: Spacing.lg,
  },
  proTitle: {
    ...Typography.label,
    color: Colors.white,
    fontSize: 18,
  },
  proCopy: {
    ...Typography.body,
    color: Colors.ivory,
  },
  proButton: {
    marginTop: Spacing.md,
  },
  version: {
    ...Typography.micro,
    color: Colors.stone,
    textAlign: 'center',
  },
});
