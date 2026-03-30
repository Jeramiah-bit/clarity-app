import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, Spacing, Typography } from '@/constants/theme';

type PlaybackViewProps = {
  mode: 'audio' | 'video';
};

export function PlaybackView({ mode }: PlaybackViewProps) {
  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        <Ionicons
          name={mode === 'video' ? 'play-circle-outline' : 'volume-high-outline'}
          size={42}
          color={Colors.accent}
        />
      </View>
      <Text style={styles.label}>{mode === 'video' ? 'Video preview placeholder' : 'Audio waveform placeholder'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.md,
  },
  preview: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 220,
    borderRadius: 8,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: 'rgba(30, 45, 61, 0.12)',
  },
  label: {
    ...Typography.body,
    color: Colors.stone,
    textAlign: 'center',
  },
});
