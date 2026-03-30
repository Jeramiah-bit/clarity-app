export type EntryMode = 'audio' | 'video';

export type ArchiveEntryRecord = {
  id: string;
  date: string;
  promptId: string;
  promptText: string;
  category: string;
  mode: EntryMode;
  filePath: string;
  thumbnailPath: string | null;
  duration: number;
};

export type UserStateRecord = {
  currentStreak: number;
  lastEntryDate: string | null;
  reminderEnabled: boolean;
  reminderTime: string;
  activeCategories: string[];
  onboardingComplete: boolean;
  totalEntries: number;
};

export const archiveStorageKey = 'clarityArchive';
export const userStateStorageKey = 'clarityUserState';

export const defaultUserState: UserStateRecord = {
  currentStreak: 0,
  lastEntryDate: null,
  reminderEnabled: false,
  reminderTime: '08:00',
  activeCategories: [
    'Desires & Wants',
    'Avoidance',
    'Values',
    'Identity',
    'Fear',
    'Clarity',
    'Gratitude & Loss',
    'Growth',
  ],
  onboardingComplete: false,
  totalEntries: 0,
};
