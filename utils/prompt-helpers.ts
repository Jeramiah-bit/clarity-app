import { prompts } from '@/data/prompts';

export function getPromptOfTheDay(date = new Date()) {
  const daySeed = Math.floor(date.getTime() / 86400000);
  return prompts[daySeed % prompts.length];
}
