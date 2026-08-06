import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SCORE_KEY  = "@TokiPona:score";
const STREAK_KEY = "@TokiPona:streak";
const DAY_KEY    = "@TokiPona:lastPlayedDay";

const WORD_CLASSES = {
  a: "particle", e: "particle", en: "conjunction", la: "particle",
  li: "particle", o: "particle", pi: "preposition", anu: "conjunction",
  mi: "pronoun", sina: "pronoun", ona: "pronoun",
  wan: "number", tu: "number", ale: "number", ali: "number",
  mute: "number", luka: "number",
};

const INTL_LOCALE = { english: "en-US", portuguese: "pt-BR", spanish: "es-ES" };

function getWordOfTheDay(dictionary) {
  const words = Object.keys(dictionary).filter((w) => !w.includes("/"));
  const day = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  return words[day % words.length];
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export default function Home({ dictionary, language, pageTexts, onGoToQuiz, screenWidth }) {
  const [score, setScore]   = useState(null);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    AsyncStorage.getItem(SCORE_KEY).then((v)  => setScore(v ? parseInt(v, 10) : 0));
    AsyncStorage.getItem(STREAK_KEY).then((v) => setStreak(v ? parseInt(v, 10) : 0));
  }, []);

  const titleFontSize = screenWidth < 400 ? 20 : 24;
  const fontSize      = screenWidth < 400 ? 14 : 16;

  const word       = dictionary ? getWordOfTheDay(dictionary) : null;
  const definition = word ? dictionary[word] : null;
  const wordClass  = word ? (WORD_CLASSES[word] ?? "noun") : null;
  const intlLocale = INTL_LOCALE[language] ?? "en-US";
  const formattedScore = score !== null ? score.toLocaleString(intlLocale) : "—";

  const tokiPona = pageTexts?.tokiPona ?? {};

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* Word of the Day */}
      {word && (
        <View style={styles.card}>
          <Text style={[styles.sectionLabel, { fontSize: 11 }]}>WORD OF THE DAY</Text>
          <View style={styles.wotdRow}>
            <View style={styles.wotdLeft}>
              <Text style={[styles.wotdWord, { fontSize: titleFontSize + 8 }]}>{word}</Text>
              <Text style={[styles.wotdDef,  { fontSize }]}>{definition}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{wordClass}</Text>
              </View>
            </View>
            <Text style={styles.glyph}>{word}</Text>
          </View>
        </View>
      )}

      {/* Quiz Score */}
      <TouchableOpacity style={styles.card} onPress={onGoToQuiz} activeOpacity={0.75}>
        <View style={styles.scoreRow}>
          <View style={styles.scoreIcon}>
            <MaterialCommunityIcons name="brain" size={22} color="#7eb8d4" />
          </View>
          <View style={styles.scoreInfo}>
            <Text style={[styles.scoreLabel, { fontSize: 13 }]}>Quiz Score</Text>
            {score === 0 ? (
              <Text style={[styles.scoreHint, { fontSize: fontSize - 1 }]}>
                Play the quiz to earn points
              </Text>
            ) : (
              <Text style={[styles.scoreValue, { fontSize: titleFontSize }]}>
                {formattedScore} pts
              </Text>
            )}
          </View>
          {streak > 1 && (
            <View style={styles.streakBox}>
              <Text style={styles.streakFire}>🔥</Text>
              <Text style={styles.streakCount}>{streak}</Text>
              <Text style={styles.streakDays}>days</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>

      {/* About Toki Pona */}
      {/* About Toki Pona */}
      <View style={styles.card}>
        <Text style={[styles.aboutTitle, { fontSize: fontSize + 2 }]}>{tokiPona.title}</Text>
        <Text style={[styles.aboutContent, { fontSize: fontSize - 1 }]}>{tokiPona.content}</Text>
        <TouchableOpacity onPress={() => Linking.openURL(tokiPona.siteUrl)}>
          <Text style={[styles.aboutLink, { fontSize: fontSize - 1 }]}>
            {tokiPona.official}{tokiPona.site}
          </Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content:   { padding: 16, paddingBottom: 32 },
  card: {
    backgroundColor: "#323545",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
  },
  sectionLabel: {
    color: "#6b6e8a",
    fontWeight: "600",
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  wotdRow:  { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" },
  wotdLeft: { flex: 1, marginRight: 8 },
  wotdWord: { color: "#e0e0f0", fontWeight: "bold", marginBottom: 4 },
  wotdDef:  { color: "#9b9db8", lineHeight: 22 },
  badge: {
    marginTop: 10,
    alignSelf: "flex-start",
    backgroundColor: "#3d4060",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: { color: "#9b9db8", fontSize: 11, fontWeight: "600" },
  glyph: {
    fontFamily: "sitelen-pona",
    fontSize: 64,
    color: "rgba(126,184,212,0.25)",
    lineHeight: 72,
  },
  scoreRow:  { flexDirection: "row", alignItems: "center" },
  scoreIcon: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: "rgba(126,184,212,0.15)",
    alignItems: "center", justifyContent: "center",
    marginRight: 12,
  },
  scoreInfo:  { flex: 1 },
  scoreLabel: { color: "#c3c3c3", fontWeight: "500" },
  scoreValue: { color: "#7eb8d4", fontWeight: "bold", lineHeight: 30 },
  scoreHint:  { color: "#6b6e8a", marginTop: 2 },
  streakBox:  { alignItems: "center" },
  streakFire: { fontSize: 20 },
  streakCount:{ color: "#f97316", fontWeight: "bold", fontSize: 16 },
  streakDays: { color: "#6b6e8a", fontSize: 10 },
  aboutTitle:   { color: "#c3c3c3", fontWeight: "bold", marginBottom: 10 },
  aboutContent: { color: "#9b9db8", lineHeight: 20, marginBottom: 10 },
  aboutLink:    { color: "#7eb8d4" },
});
