import AsyncStorage from "@react-native-async-storage/async-storage";

export const STREAK_KEY = "@TokiPona:streak";
export const DAY_KEY = "@TokiPona:lastPlayedDay";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

// Days since epoch in the device's local timezone, so days roll over at local midnight.
export const localDayNumber = (date = new Date()) =>
  Math.floor((date.getTime() - date.getTimezoneOffset() * 60000) / MS_PER_DAY);

export async function recordPlayedToday() {
  const today = localDayNumber();
  const [lastDay, streak] = await Promise.all([
    AsyncStorage.getItem(DAY_KEY),
    AsyncStorage.getItem(STREAK_KEY),
  ]);
  const last = parseInt(lastDay, 10);
  if (last === today) return;

  const current = parseInt(streak, 10) || 0;
  const next = last === today - 1 ? current + 1 : 1;
  await AsyncStorage.multiSet([[DAY_KEY, String(today)], [STREAK_KEY, String(next)]]);
}
