export const Colors = {
  navy: '#1E2D3D',
  ivory: '#F5F0E8',
  accent: '#9AB1C0',
  gold: '#C4A35A',
  stone: '#8E8E93',
  white: '#FFFFFF',
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const Typography = {
  display: {
    fontFamily: 'serif',
    fontSize: 28,
    fontWeight: '400' as const,
    lineHeight: 38,
  },
  title: {
    fontFamily: 'serif',
    fontSize: 20,
    fontWeight: '400' as const,
    lineHeight: 28,
  },
  question: {
    fontFamily: 'serif',
    fontSize: 26,
    fontWeight: '400' as const,
    lineHeight: 36,
  },
  italicCaption: {
    fontFamily: 'serif',
    fontSize: 13,
    fontStyle: 'italic' as const,
    lineHeight: 18,
  },
  label: {
    fontFamily: 'System',
    fontSize: 15,
    fontWeight: '500' as const,
    lineHeight: 20,
  },
  body: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  micro: {
    fontFamily: 'System',
    fontSize: 11,
    fontWeight: '500' as const,
    lineHeight: 16,
    letterSpacing: 0.8,
    textTransform: 'uppercase' as const,
  },
  category: {
    fontFamily: 'System',
    fontSize: 10,
    fontWeight: '500' as const,
    lineHeight: 14,
    letterSpacing: 1,
    textTransform: 'uppercase' as const,
  },
} as const;
