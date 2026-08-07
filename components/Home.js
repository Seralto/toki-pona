import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SCREENSHOT_MODE, FIXED_WORD, FIXED_SCORE, FIXED_STREAK } from "../automation/screenshotConfig";

const SCORE_KEY  = "@TokiPona:score";
const STREAK_KEY = "@TokiPona:streak";
const DAY_KEY    = "@TokiPona:lastPlayedDay";

const WORD_CLASS_KEYS = {
  a: "particle", e: "particle", en: "conjunction", la: "particle",
  li: "particle", o: "particle", pi: "preposition", anu: "conjunction",
  mi: "pronoun", sina: "pronoun", ona: "pronoun",
  wan: "number", tu: "number", ale: "number", ali: "number",
  mute: "number", luka: "number",
};

const INTL_LOCALE = { english: "en-US", portuguese: "pt-BR", spanish: "es-ES" };

function getWordOfTheDay(dictionary) {
  const words = Object.keys(dictionary).filter((w) => !w.includes("/")).sort();
  const day = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  return words[day % words.length];
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export default function Home({ dictionary, language, pageTexts, onGoToQuiz, screenWidth, fontSizeId, theme }) {
  const [score, setScore]   = useState(null);
  const [streak, setStreak] = useState(0);
  const [fontsLoaded] = useFonts({
    "sitelen-pona": require("../assets/fonts/linja-pona.otf"),
  });

  useEffect(() => {
    if (SCREENSHOT_MODE) {
      setScore(FIXED_SCORE);
      setStreak(FIXED_STREAK);
      return;
    }
    AsyncStorage.getItem(SCORE_KEY).then((v)  => setScore(v ? parseInt(v, 10) : 0));
    AsyncStorage.getItem(STREAK_KEY).then((v) => setStreak(v ? parseInt(v, 10) : 0));
  }, []);

  const fo = fontSizeId === "large" ? 4 : 0;
  const t = pageTexts?.home ?? {};
  const wordClasses = t.wordClasses ?? {};

  const word         = SCREENSHOT_MODE ? FIXED_WORD : (dictionary ? getWordOfTheDay(dictionary) : null);
  const definition   = word ? dictionary[word] : null;
  const wordClassKey = word ? (WORD_CLASS_KEYS[word] ?? "noun") : null;
  const wordClass    = wordClassKey ? (wordClasses[wordClassKey] ?? wordClassKey) : null;
  const intlLocale   = INTL_LOCALE[language] ?? "en-US";
  const formattedScore = score !== null ? score.toLocaleString(intlLocale) : "—";

  const th = theme ?? {};

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* App title */}
      <View style={styles.titleSection}>
        <Text style={[styles.appTitle, { fontSize: 32 + fo, color: th.text }]}>Toki Pona</Text>
        <Text style={[styles.appSubtitle, { fontSize: 15 + fo, color: th.textDim }]}>{pageTexts?.description}</Text>
      </View>

      {/* Word of the Day */}
      {word && (
        <View style={[styles.card, { backgroundColor: th.surface, borderColor: th.surfaceBorder }]}>
          <Text style={[styles.sectionLabel, { fontSize: 11 + fo, color: th.textDim }]}>{t.wordOfTheDay}</Text>
          <View style={styles.wotdRow}>
            <View style={styles.wotdLeft}>
              <Text style={[styles.wotdWord, { fontSize: 40 + fo, color: th.text }]}>{word}</Text>
              <Text style={[styles.wotdDef, { fontSize: 16 + fo, color: th.textMuted }]}>{definition}</Text>
              <View style={[styles.badge, { backgroundColor: th.surfaceBorder }]}>
                <Text style={[styles.badgeText, { fontSize: 12 + fo, color: th.textMuted }]}>{wordClass}</Text>
              </View>
            </View>
            {fontsLoaded && <Text style={[styles.glyph, { color: th.accentBg }]}>{word}</Text>}
          </View>
        </View>
      )}

      {/* Quiz Score */}
      <TouchableOpacity style={[styles.card, styles.scoreCard, { backgroundColor: th.surface, borderColor: th.surfaceBorder }]} onPress={onGoToQuiz} activeOpacity={0.75}>
        <View style={styles.scoreRow}>
          <View style={[styles.scoreIcon, { backgroundColor: th.accentBg }]}>
            <Ionicons name="trophy-outline" size={26 + fo} color={th.accent} />
          </View>
          <View style={styles.scoreInfo}>
            <Text style={[styles.scoreLabel, { fontSize: 14 + fo, color: th.textMuted }]}>{t.quizScore}</Text>
            {score === 0 ? (
              <Text style={[styles.scoreHint, { fontSize: 13 + fo, color: th.textDim }]}>{t.playQuiz}</Text>
            ) : (
              <Text style={[styles.scoreValue, { fontSize: 28 + fo, color: th.accent }]}>
                {formattedScore} {t.quizPoints}
              </Text>
            )}
          </View>
          {streak > 1 && (
            <View style={styles.streakBox}>
              <Text style={[styles.streakFire, { fontSize: 22 + fo }]}>🔥</Text>
              <Text style={[styles.streakCount, { fontSize: 18 + fo }]}>{streak}</Text>
              <Text style={[styles.streakDays, { fontSize: 11 + fo, color: th.textDim }]}>{t.days}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content:   { padding: 20, paddingBottom: 48 },

  titleSection: { marginBottom: 28, marginTop: 8 },
  appTitle: { fontSize: 32, fontWeight: "bold", letterSpacing: -0.5 },
  appSubtitle: { fontSize: 15, marginTop: 4 },

  card: {
    borderRadius: 16, padding: 20, marginBottom: 16, borderWidth: 1,
  },
  sectionLabel: {
    fontSize: 11, fontWeight: "600", letterSpacing: 1,
    marginBottom: 16, textTransform: "uppercase",
  },
  wotdRow:  { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" },
  wotdLeft: { flex: 1, marginRight: 12 },
  wotdWord: { fontWeight: "bold", fontSize: 40, marginBottom: 8, lineHeight: 46 },
  wotdDef:  { fontSize: 16, lineHeight: 24 },
  badge: {
    marginTop: 16, alignSelf: "flex-start",
    borderRadius: 8, paddingHorizontal: 12, paddingVertical: 5,
  },
  badgeText: { fontSize: 12, fontWeight: "600" },
  glyph: { fontFamily: "sitelen-pona", fontSize: 80, lineHeight: 90 },

  scoreCard: { paddingVertical: 32 },
  scoreRow:  { flexDirection: "row", alignItems: "center" },
  scoreIcon: {
    width: 48, height: 48, borderRadius: 24,
    alignItems: "center", justifyContent: "center", marginRight: 14,
  },
  scoreInfo:  { flex: 1 },
  scoreLabel: { fontSize: 14, fontWeight: "500" },
  scoreValue: { fontWeight: "bold", fontSize: 28, lineHeight: 34, marginTop: 2 },
  scoreHint:  { fontSize: 13, marginTop: 4 },
  streakBox:  { alignItems: "center" },
  streakFire: { fontSize: 22 },
  streakCount:{ color: "#f97316", fontWeight: "bold", fontSize: 18 },
  streakDays: { fontSize: 11 },
});
