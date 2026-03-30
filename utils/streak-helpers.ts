export function calculateNextStreak(lastEntryDate: string | null, today = new Date()) {
  if (!lastEntryDate) {
    return 1;
  }

  const previous = new Date(lastEntryDate);
  const diffInDays = Math.round((today.getTime() - previous.getTime()) / 86400000);

  if (diffInDays <= 0) {
    return 0;
  }

  if (diffInDays === 1) {
    return 1;
  }

  return 0;
}
