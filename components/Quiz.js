import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from "react-native";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

const NUM_OPTIONS = 4;
const LABELS = ["A", "B", "C", "D"];
const INTL_LOCALE = { english: "en-US", portuguese: "pt-BR", spanish: "es-ES" };
const MODES = ["random", "word", "def", "glyph-word", "word-glyph"];

const Quiz = ({ pageTexts, dictionary, score, language, onChangeScore, screenWidth, theme }) => {
  const [randomWord, setRandomWord] = useState("");
  const [options, setOptions]       = useState([]);
  const [revealed, setRevealed]     = useState(false);
  const [startNewGame, setStartNewGame] = useState(true);
  const [optionsDisabled, setOptionsDisabled] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [showNext, setShowNext]     = useState(false);
  const [reversed, setReversed]     = useState(false);
  const [muted, setMuted]           = useState(false);
  const [streak, setStreak]         = useState(0);
  const [mode, setMode]             = useState("random");
  const [showModeMenu, setShowModeMenu] = useState(false);
  const [glyphMode, setGlyphMode]   = useState(null); // null | "glyph-word" | "word-glyph"

  const [fontsLoaded] = useFonts({ "sitelen-pona": require("../assets/fonts/linja-pona.otf") });

  const fontSize = screenWidth < 400 ? 15 : 17;
  const th = theme ?? {};
  const intlLocale = INTL_LOCALE[language] ?? "en-US";

  /* ── Sound ─────────────────────────────────────────────────── */
  const playSound = async (result) => {
    if (muted) return;
    try {
      const sound = new Audio.Sound();
      sound.setOnPlaybackStatusUpdate((s) => { if (s.didJustFinish) sound.unloadAsync(); });
      await sound.loadAsync(result === "right"
        ? require("../assets/right-answer.wav")
        : require("../assets/wrong-answer.wav"));
      await sound.playAsync();
    } catch (_) {}
  };

  /* ── Game logic ─────────────────────────────────────────────── */
  const getRandomWord = () => {
    const keys = Object.keys(dictionary);
    return keys[Math.floor(Math.random() * keys.length)];
  };

  const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

  const newWordsSet = (currentMode = mode) => {
    const word = getRandomWord();
    setRandomWord(word);
    const opts = [word];
    while (opts.length < NUM_OPTIONS) {
      const w = getRandomWord();
      if (w !== word && !opts.includes(w)) opts.push(w);
    }
    setOptions(shuffle(opts));

    // Determine effective sub-mode
    const SUB_MODES = ["word", "def", "glyph-word", "word-glyph"];
    const effective = currentMode === "random"
      ? SUB_MODES[Math.floor(Math.random() * SUB_MODES.length)]
      : currentMode;

    setGlyphMode(effective === "glyph-word" ? "glyph-word"
               : effective === "word-glyph" ? "word-glyph"
               : null);
    setReversed(effective === "def");
  };

  const changeMode = (m) => {
    setMode(m);
    setShowModeMenu(false);
    setRevealed(false);
    setShowNext(false);
    setOptionsDisabled(false);
    newWordsSet(m);
  };

  const matchUserAnswer = (answer) => {
    if (optionsDisabled) return;
    setOptionsDisabled(true);
    setUserAnswer(answer);
    setRevealed(true);

    if (answer === randomWord) {
      playSound("right");
      const newStreak = streak + 1;
      const multiplier = Math.min(newStreak, 3);
      const points = 10 * multiplier;
      onChangeScore(points);
      setStreak(newStreak);
      setTimeout(() => {
        setRevealed(false);
        setStartNewGame(true);
        setOptionsDisabled(false);
      }, 1500);
    } else {
      playSound("wrong");
      setStreak(0);
      setShowNext(true);
    }
  };

  const nextQuestion = () => {
    setRevealed(false);
    setShowNext(false);
    setStartNewGame(true);
    setOptionsDisabled(false);
  };

  if (startNewGame) {
    setShowNext(false);
    setStartNewGame(false);
    newWordsSet();
  }

  /* ── Option colours ─────────────────────────────────────────── */
  const optionColors = (key) => {
    const isCorrect  = key === randomWord;
    const isSelected = key === userAnswer;
    if (revealed && isCorrect)
      return { bg: th.quizRightBg, border: th.quizRightBorder, text: th.quizOptionText,
               badge: { bg: "rgba(40,167,69,0.2)", text: "#28a745" } };
    if (revealed && isSelected)
      return { bg: th.quizWrongBg, border: th.quizWrongBorder, text: th.quizOptionText,
               badge: { bg: "rgba(220,53,69,0.2)", text: "#dc3545" } };
    if (revealed)
      return { bg: th.quizOptionBg, border: th.quizOptionBorder, text: th.quizOptionText,
               opacity: 0.4, badge: { bg: th.surfaceBorder, text: th.textDim } };
    return { bg: th.quizOptionBg, border: th.quizOptionBorder, text: th.quizOptionText,
             badge: { bg: th.surfaceBorder, text: th.textMuted } };
  };

  const prompt = glyphMode === "glyph-word" ? pageTexts.glyphPrompt
               : glyphMode === "word-glyph" ? pageTexts.wordGlyphPrompt
               : reversed                   ? pageTexts.translationPrompt
               : pageTexts.wordPrompt;

  const formattedScore = parseInt(score, 10).toLocaleString(intlLocale);

  const modeLabel = mode === "word"       ? pageTexts.modeWord
                  : mode === "def"        ? pageTexts.modeDef
                  : mode === "glyph-word" ? pageTexts.modeGlyphWord
                  : mode === "word-glyph" ? pageTexts.modeWordGlyph
                  : pageTexts.modeRandom;

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Title + mode picker row */}
      <View style={styles.titleRow}>
        <Text style={[styles.title, { color: th.text }]}>{pageTexts.title}</Text>

        <TouchableOpacity
          onPress={() => setShowModeMenu(true)}
          style={[styles.modePicker, { backgroundColor: th.surface, borderColor: th.accentBorder }]}
        >
          <Text style={[styles.modePickerText, { color: th.text }]}>{modeLabel}</Text>
          <Ionicons name="chevron-down" size={14} color={th.textMuted} />
        </TouchableOpacity>
      </View>

      {/* Mode dropdown modal */}
      <Modal transparent visible={showModeMenu} animationType="fade" onRequestClose={() => setShowModeMenu(false)}>
        <Pressable style={styles.modeOverlay} onPress={() => setShowModeMenu(false)}>
          <View style={[styles.modeMenu, { backgroundColor: th.surface, borderColor: th.surfaceBorder }]}>
            {MODES.map((m) => {
              const label = m === "word"       ? pageTexts.modeWord
                          : m === "def"        ? pageTexts.modeDef
                          : m === "glyph-word" ? pageTexts.modeGlyphWord
                          : m === "word-glyph" ? pageTexts.modeWordGlyph
                          : pageTexts.modeRandom;
              const isActive = m === mode;
              return (
                <TouchableOpacity
                  key={m}
                  onPress={() => changeMode(m)}
                  style={[styles.modeItem, isActive && { backgroundColor: th.accentBg }]}
                >
                  <Text style={[styles.modeItemText, { color: isActive ? th.accent : th.text }]}>{label}</Text>
                  {isActive && <Ionicons name="checkmark" size={16} color={th.accent} />}
                </TouchableOpacity>
              );
            })}
          </View>
        </Pressable>
      </Modal>

      {/* Score row */}
      <View style={styles.scoreRow}>
        <View style={styles.scoreLeft}>
          <Text style={[styles.scoreLabel, { color: th.textMuted }]}>
            {pageTexts.score ?? "Score"}
          </Text>
          <View style={[styles.scoreBadge, { backgroundColor: th.accentBg }]}>
            <Text style={[styles.scoreBadgeText, { color: th.accent }]}>{formattedScore}</Text>
          </View>
          {streak >= 2 && (
            <View style={[styles.streakBadge]}>
              <Text style={styles.streakText}>🔥 {streak}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity onPress={() => setMuted((m) => !m)} style={styles.muteBtn}>
          <Ionicons
            name={muted ? "volume-mute-outline" : "volume-medium-outline"}
            size={22}
            color={th.textMuted}
          />
        </TouchableOpacity>
      </View>

      {/* Question card */}
      <View style={[styles.questionCard, { backgroundColor: th.surface, borderColor: th.surfaceBorder }]}>
        <Text style={[styles.prompt, { color: th.textDim }]}>{prompt}</Text>

        {glyphMode === "glyph-word" ? (
          /* Show ONLY the glyph — user must name it */
          fontsLoaded && (
            <Text style={[styles.glyph, { color: th.accent, fontSize: 72, lineHeight: 80 }]}>{randomWord}</Text>
          )
        ) : glyphMode === "word-glyph" ? (
          /* Show only the word name — user must pick the glyph */
          <Text style={[styles.questionWord, { color: th.text }]}>{randomWord}</Text>
        ) : reversed ? (
          /* Show definition → ask for word */
          <>
            <Text style={[styles.questionText, { color: th.text, fontSize: fontSize + 2 }]}>
              {dictionary[randomWord]}
            </Text>
            {revealed && (
              <View style={[styles.revealRow, { borderTopColor: th.surfaceBorder }]}>
                {fontsLoaded && (
                  <Text style={[styles.revealGlyph, { color: th.accent }]}>{randomWord}</Text>
                )}
                <Text style={[styles.revealWord, { color: th.accent }]}>{randomWord}</Text>
              </View>
            )}
          </>
        ) : (
          /* Show word + glyph → ask for definition */
          <View style={styles.wordRow}>
            {fontsLoaded && (
              <Text style={[styles.glyph, { color: th.accent }]}>{randomWord}</Text>
            )}
            <Text style={[styles.questionWord, { color: th.text }]}>{randomWord}</Text>
          </View>
        )}
      </View>

      {/* Options */}
      <View style={styles.optionsList}>
        {options.map((key, idx) => {
          const c = optionColors(key);
          // word-glyph: options are glyphs; glyph-word: options are word names; others: translation or word
          const isGlyphOption = glyphMode === "word-glyph";
          const optText = isGlyphOption ? key : reversed ? key : dictionary[key];
          return (
            <TouchableOpacity
              key={key}
              onPress={() => matchUserAnswer(key)}
              disabled={optionsDisabled}
              activeOpacity={0.75}
              style={[styles.optionBtn, { backgroundColor: c.bg, borderColor: c.border, opacity: c.opacity ?? 1 }]}
            >
              {!isGlyphOption && (
                <View style={[styles.optionLabel, { backgroundColor: c.badge.bg }]}>
                  <Text style={[styles.optionLabelText, { color: c.badge.text }]}>{LABELS[idx]}</Text>
                </View>
              )}
              <Text
                style={[
                  styles.optionText,
                  { fontSize: isGlyphOption ? 36 : fontSize, color: c.text, textAlign: isGlyphOption ? "center" : "left" },
                  isGlyphOption && fontsLoaded && { fontFamily: "sitelen-pona", lineHeight: 42 },
                ]}
                numberOfLines={isGlyphOption ? 1 : 3}
              >
                {optText}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Next — only on wrong answer */}
      {showNext && (
        <TouchableOpacity onPress={nextQuestion} style={[styles.nextBtn, { backgroundColor: th.accent }]}>
          <Text style={styles.nextBtnText}>{pageTexts.next}</Text>
        </TouchableOpacity>
      )}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingBottom: 48, paddingTop: 8 },

  /* Title row */
  titleRow:       { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
  title:          { fontSize: 26, fontWeight: "bold" },
  modePicker:     { flexDirection: "row", alignItems: "center", gap: 6, borderRadius: 10, borderWidth: 1.5, paddingVertical: 8, paddingHorizontal: 14 },
  modePickerText: { fontSize: 14, fontWeight: "500" },

  /* Mode dropdown */
  modeOverlay:   { flex: 1, justifyContent: "flex-start", paddingTop: 120, paddingHorizontal: 20, backgroundColor: "rgba(0,0,0,0.4)" },
  modeMenu:      { borderRadius: 12, borderWidth: 1, overflow: "hidden", alignSelf: "flex-end", minWidth: 180 },
  modeItem:      { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 14, paddingHorizontal: 16 },
  modeItemText:  { fontSize: 15, fontWeight: "500" },

  /* Score row */
  scoreRow:      { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
  scoreLeft:     { flexDirection: "row", alignItems: "center", gap: 8 },
  scoreLabel:    { fontSize: 13 },
  scoreBadge:    { borderRadius: 20, paddingVertical: 4, paddingHorizontal: 12 },
  scoreBadgeText:{ fontSize: 13, fontWeight: "bold" },
  streakBadge:   { borderRadius: 20, paddingVertical: 4, paddingHorizontal: 10, backgroundColor: "rgba(249,115,22,0.12)" },
  streakText:    { fontSize: 12, fontWeight: "bold", color: "#f97316" },
  muteBtn:       { padding: 6, borderRadius: 8 },

  /* Question card */
  questionCard: {
    borderRadius: 14, borderWidth: 1, paddingHorizontal: 20, paddingVertical: 16,
    marginBottom: 12, alignItems: "center",
  },
  prompt:       { fontSize: 14, fontWeight: "600", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 },
  wordRow:      { flexDirection: "row", alignItems: "center", gap: 10, flexWrap: "wrap", justifyContent: "center" },
  glyph:        { fontFamily: "sitelen-pona", fontSize: 52, lineHeight: 58 },
  questionWord: { fontSize: 26, fontWeight: "bold" },
  questionText: { fontWeight: "600", textAlign: "center", lineHeight: 28 },
  revealRow:    { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 12, paddingTop: 12, borderTopWidth: 1 },
  revealGlyph:  { fontFamily: "sitelen-pona", fontSize: 28, lineHeight: 32 },
  revealWord:   { fontSize: 15, fontWeight: "bold" },

  /* Options */
  optionsList:    { gap: 8, marginBottom: 12 },
  optionBtn: {
    flexDirection: "row", alignItems: "center", gap: 12,
    borderRadius: 10, borderWidth: 1.5, paddingHorizontal: 14, paddingVertical: 12,
  },
  optionLabel:     { width: 28, height: 28, borderRadius: 6, alignItems: "center", justifyContent: "center" },
  optionLabelText: { fontSize: 12, fontWeight: "bold" },
  optionText:      { flex: 1, fontWeight: "500" },

  /* Next button */
  nextBtn:     { borderRadius: 10, paddingVertical: 14, alignItems: "center", marginTop: 4 },
  nextBtnText: { color: "#fff", fontWeight: "600", fontSize: 15 },
});

export default Quiz;
