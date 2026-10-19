import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Modal, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SearchBar from "./SearchBar";

const FAV_KEY = "tokipona:favorites";

function findExamples(content, word) {
  const variants = word.toLowerCase().split("/").map((variant) => variant.trim());
  const phrases = Object.values(content ?? {}).flatMap((category) => category.phrases ?? []);

  return phrases
    .map((phrase) => {
      const [translation = "", toki = ""] = phrase.split("\n").filter(Boolean);
      const tokens = toki.toLowerCase().replace(/[.,!?]/g, "").split(/\s+/);
      return { translation, toki, matches: variants.some((variant) => tokens.includes(variant)) };
    })
    .filter((phrase) => phrase.matches)
    .slice(0, 4);
}

const Dictionary = ({ pageTexts, dictionary, screenWidth, fontSizeId, theme }) => {
  const th = theme ?? {};
  const fo = fontSizeId === "large" ? 4 : 0;
  const fontSize = (screenWidth < 400 ? 15 : 17) + fo;
  const labels = pageTexts.dictionary ?? {};
  const insets = useSafeAreaInsets();

  const [fontsLoaded] = useFonts({ "sitelen-pona": require("../assets/fonts/linja-pona.otf") });

  const [query, setQuery]       = useState("");
  const [favOnly, setFavOnly]   = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem(FAV_KEY).then((val) => {
      if (val) setFavorites(new Set(JSON.parse(val)));
    });
  }, []);

  const toggleFav = useCallback((word) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(word) ? next.delete(word) : next.add(word);
      AsyncStorage.setItem(FAV_KEY, JSON.stringify([...next]));
      return next;
    });
  }, []);

  const entries = Object.entries(dictionary).map(([word, definition]) => ({
    word,
    definition,
    glyph: word.split("/")[0],
  }));

  const q = query.trim().toLowerCase();
  const filtered = entries.filter((e) => {
    if (favOnly && !favorites.has(e.word)) return false;
    if (q && !e.word.toLowerCase().includes(q) && !e.definition.toLowerCase().includes(q)) return false;
    return true;
  });
  const examples = selectedEntry
    ? findExamples(pageTexts.sentences?.content, selectedEntry.word)
    : [];

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={[styles.title, { fontSize: 26 + fo, color: th.text }]}>{pageTexts.pages.dictionary}</Text>

      {/* Search bar */}
      <SearchBar
        value={query}
        onChangeText={setQuery}
        placeholder={labels.search ?? "Search words..."}
        fontSize={fontSize}
        th={th}
        style={styles.searchBarMargin}
      />

      {/* Word count + favorites toggle */}
      <View style={styles.controls}>
        <Text style={[styles.wordCount, { color: th.textMuted }]}>
          {filtered.length} {labels.wordCount ?? "words"}
        </Text>
        <TouchableOpacity
          onPress={() => setFavOnly((v) => !v)}
          style={[styles.favButton, favOnly && styles.favButtonActive]}
          activeOpacity={0.7}
        >
          <Ionicons
            name={favOnly ? "star" : "star-outline"}
            size={14}
            color={favOnly ? "#eab308" : th.textMuted}
          />
          <Text style={[styles.favButtonText, { color: favOnly ? "#eab308" : th.textMuted }]}>
            {favOnly ? (labels.showAll ?? "Show All") : (labels.showFavorites ?? "Favorites")}
          </Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {filtered.length === 0 ? (
          <Text style={[styles.empty, { fontSize, color: th.inactive }]}>{labels.noResults ?? "No results found."}</Text>
        ) : (
          <View style={[styles.listCard, { backgroundColor: th.surface, borderColor: th.surfaceBorder }]}>
            {filtered.map((entry, idx) => {
              const isFav = favorites.has(entry.word);
              return (
                <View
                  key={entry.word}
                  style={[styles.row, idx > 0 && { borderTopWidth: 1, borderTopColor: th.surfaceBorder }]}
                >
                  <TouchableOpacity
                    style={styles.entryContent}
                    onPress={() => setSelectedEntry(entry)}
                    accessibilityRole="button"
                    accessibilityLabel={`${entry.word}: ${entry.definition}`}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.glyph, { color: th.accent }]}>{entry.glyph}</Text>
                    <View style={styles.textBlock}>
                      <Text style={[styles.word, { fontSize, color: th.accent }]}>{entry.word}</Text>
                      <Text style={[styles.definition, { fontSize: fontSize - 2, color: th.textMuted }]} numberOfLines={2}>
                        {entry.definition}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => toggleFav(entry.word)}
                    style={styles.starBtn}
                    activeOpacity={0.7}
                    accessibilityRole="button"
                    accessibilityLabel={isFav ? `Remove ${entry.word} from favorites` : `Add ${entry.word} to favorites`}
                  >
                    <Ionicons name={isFav ? "star" : "star-outline"} size={20} color={isFav ? "#eab308" : th.textMuted} />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}
        <View style={{ height: 48 }} />
      </ScrollView>

      <Modal
        transparent
        visible={selectedEntry !== null}
        animationType="slide"
        onRequestClose={() => setSelectedEntry(null)}
      >
        <View style={styles.modalRoot}>
          <Pressable
            style={styles.modalBackdrop}
            onPress={() => setSelectedEntry(null)}
            accessibilityRole="button"
            accessibilityLabel={labels.close ?? "Close"}
          />
          {selectedEntry && (
            <View
              style={[
                styles.modalSheet,
                {
                  backgroundColor: th.background,
                  borderColor: th.surfaceBorder,
                  paddingBottom: Math.max(insets.bottom, 16) + 16,
                },
              ]}
              accessibilityViewIsModal
            >
              <View style={styles.modalTopBar}>
                <View style={styles.modalSideSpacer} />
                <View style={[styles.modalHandle, { backgroundColor: th.textDim }]} />
                <TouchableOpacity
                  onPress={() => setSelectedEntry(null)}
                  style={styles.closeButton}
                  accessibilityRole="button"
                  accessibilityLabel={labels.close ?? "Close"}
                >
                  <Ionicons name="close" size={22} color={th.textMuted} />
                </TouchableOpacity>
              </View>

              <ScrollView
                style={styles.modalScroll}
                contentContainerStyle={styles.modalContent}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.detailHeading}>
                  {fontsLoaded && (
                    <Text style={[styles.detailGlyph, { color: th.accent }]}>{selectedEntry.glyph}</Text>
                  )}
                  <Text style={[styles.detailWord, { color: th.text }]}>{selectedEntry.word}</Text>
                </View>

                <Text style={[styles.detailDefinition, { color: th.textMuted }]}>
                  {selectedEntry.definition}
                </Text>

                <View>
                  <Text style={[styles.examplesTitle, { color: th.textMuted }]}>
                    {labels.examples ?? "Usage examples"}
                  </Text>
                  {examples.length === 0 ? (
                    <Text style={[styles.noExamples, { color: th.textMuted }]}>
                      {labels.noExamples ?? "No examples available"}
                    </Text>
                  ) : (
                    <View style={styles.examplesList}>
                      {examples.map((example, index) => (
                        <View
                          key={`${example.toki}-${index}`}
                          style={[
                            styles.exampleCard,
                            { backgroundColor: th.surface, borderColor: th.surfaceBorder },
                          ]}
                        >
                          <Text style={[styles.exampleToki, { color: th.accent }]}>
                            {example.toki}
                          </Text>
                          <Text style={[styles.exampleTranslation, { color: th.textMuted }]}>
                            {example.translation}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              </ScrollView>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container:      { flex: 1, paddingHorizontal: 20 },
  title:          { fontSize: 26, fontWeight: "bold", marginBottom: 16, marginTop: 8 },

  /* Search */
  searchBarMargin:{ marginBottom: 8 },

  /* Controls row */
  controls:       { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12, paddingHorizontal: 2 },
  wordCount:      { fontSize: 13 },
  favButton:      { flexDirection: "row", alignItems: "center", gap: 5, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5 },
  favButtonActive:{ backgroundColor: "rgba(234,179,8,0.15)" },
  favButtonText:  { fontSize: 13, fontWeight: "600" },

  /* List */
  scroll:         { flex: 1 },
  listCard:       { borderRadius: 12, borderWidth: 1.5, overflow: "hidden" },
  row:            { flexDirection: "row", alignItems: "center", paddingHorizontal: 14, paddingVertical: 12, gap: 12 },
  glyph:          { fontFamily: "sitelen-pona", fontSize: 36, width: 44, textAlign: "center" },
  entryContent:   { flex: 1, flexDirection: "row", alignItems: "center", gap: 12 },
  textBlock:      { flex: 1 },
  word:           { fontWeight: "600", marginBottom: 2 },
  definition:     { lineHeight: 18 },
  starBtn:        { padding: 4 },
  empty:          { textAlign: "center", marginTop: 40 },
  modalRoot:      { flex: 1, justifyContent: "flex-end" },
  modalBackdrop:  { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.5)" },
  modalSheet:     { maxHeight: "75%", borderTopLeftRadius: 20, borderTopRightRadius: 20, borderTopWidth: 1, overflow: "hidden" },
  modalTopBar:    { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingTop: 12, paddingBottom: 4 },
  modalSideSpacer:{ width: 36 },
  modalHandle:    { width: 40, height: 4, borderRadius: 2, opacity: 0.5 },
  closeButton:    { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center" },
  modalScroll:    { flexShrink: 1 },
  modalContent:   { paddingHorizontal: 24, paddingTop: 12, paddingBottom: 24, gap: 20 },
  detailHeading:  { alignItems: "center", gap: 4, paddingTop: 8 },
  detailGlyph:    { fontFamily: "sitelen-pona", fontSize: 96, lineHeight: 108 },
  detailWord:     { fontSize: 24, fontWeight: "bold" },
  detailDefinition:{ fontSize: 16, lineHeight: 24, textAlign: "center" },
  examplesTitle:  { fontSize: 12, fontWeight: "600", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 12 },
  noExamples:     { fontSize: 14, fontStyle: "italic" },
  examplesList:   { gap: 8 },
  exampleCard:    { borderWidth: 1, borderRadius: 10, paddingHorizontal: 16, paddingVertical: 12 },
  exampleToki:    { fontSize: 16, fontWeight: "600", lineHeight: 22 },
  exampleTranslation:{ fontSize: 14, marginTop: 2 },
});

export default Dictionary;
