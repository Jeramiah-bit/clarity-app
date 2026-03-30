import type { ArchiveEntryRecord } from '@/utils/storage';

export type PromptRecord = {
  id: string;
  text: string;
  category: string;
  tradition: string;
};

export const defaultCategories = [
  'Desires & Wants',
  'Avoidance',
  'Values',
  'Identity',
  'Fear',
  'Clarity',
  'Gratitude & Loss',
  'Growth',
] as const;

export const prompts: PromptRecord[] = [
  {
    id: '001',
    text: 'What are you pretending not to know right now?',
    category: 'Avoidance',
    tradition: 'Jungian shadow work',
  },
  {
    id: '002',
    text: "What do you keep wanting that you still haven't admitted you want?",
    category: 'Desires & Wants',
    tradition: 'Existential self-inquiry',
  },
  {
    id: '003',
    text: 'Did your actions today reflect what you say you care about?',
    category: 'Values',
    tradition: 'Stoicism',
  },
];

export const samplePrompt = prompts[0];

export const sampleArchiveEntries: ArchiveEntryRecord[] = [
  {
    id: 'entry-1',
    date: '2026-03-24',
    promptId: '001',
    promptText: 'What are you pretending not to know right now?',
    category: 'Avoidance',
    mode: 'audio',
    filePath: 'file:///recordings/entry-1.m4a',
    thumbnailPath: null,
    duration: 62,
  },
  {
    id: 'entry-2',
    date: '2026-03-23',
    promptId: '002',
    promptText: "What do you keep wanting that you still haven't admitted you want?",
    category: 'Desires & Wants',
    mode: 'video',
    filePath: 'file:///recordings/entry-2.mov',
    thumbnailPath: 'file:///recordings/entry-2.jpg',
    duration: 71,
  },
];
