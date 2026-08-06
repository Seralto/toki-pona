import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FAV_KEY = "tokipona:favorites";

const Dictionary = ({ pageTexts, dictionary, screenWidth, fontSizeId, theme }) => {
  const th = theme ?? {};
  const fo = fontSizeId === "large" ? 4 : 0;
  const fontSize = (screenWidth < 400 ? 15 : 17) + fo;
  const labels = pageTexts.dictionary ?? {};

  const [fontsLoaded] = useFonts({ "sitelen-pona": require("../assets/fonts/linja-pona.otf") });

  const [query, setQuery]       = useState("");
  const [favOnly, setFavOnly]   = useState(false);
  const [favorites, setFavorites] = useState(new Set());

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

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={[styles.title, { fontSize: 26 + fo, color: th.text }]}>{pageTexts.pages.dictionary}</Text>

      {/* Search bar */}
      <View style={[styles.searchBox, { backgroundColor: th.inputBg, borderColor: q ? th.accentBorder : th.surfaceBorder }]}>
        <Ionicons name="search-outline" size={18} color={th.textMuted} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { fontSize, color: th.text }]}
          value={query}
          onChangeText={setQuery}
          placeholder={labels.search ?? "Search words..."}
          placeholderTextColor={th.inactive}
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="off"
          returnKeyType="search"
        />
        {q.length > 0 && (
          <TouchableOpacity onPress={() => setQuery("")}>
            <Ionicons name="close-circle" size={18} color={th.textMuted} />
          </TouchableOpacity>
        )}
      </View>

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
                  {/* Sitelen pona glyph */}
                  <Text style={[styles.glyph, { color: th.accent }]}>{entry.glyph}</Text>

                  {/* Word + definition */}
                  <View style={styles.textBlock}>
                    <Text style={[styles.word, { fontSize, color: th.accent }]}>{entry.word}</Text>
                    <Text style={[styles.definition, { fontSize: fontSize - 2, color: th.textMuted }]} numberOfLines={2}>
                      {entry.definition}
                    </Text>
                  </View>

                  {/* Favorite toggle */}
                  <TouchableOpacity onPress={() => toggleFav(entry.word)} style={styles.starBtn} activeOpacity={0.7}>
                    <Ionicons name={isFav ? "star" : "star-outline"} size={20} color={isFav ? "#eab308" : th.textMuted} />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}
        <View style={{ height: 48 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container:      { flex: 1, paddingHorizontal: 20 },
  title:          { fontSize: 26, fontWeight: "bold", marginBottom: 16, marginTop: 8 },

  /* Search */
  searchBox:      { flexDirection: "row", alignItems: "center", borderRadius: 12, borderWidth: 1, paddingHorizontal: 12, marginBottom: 8 },
  searchIcon:     { marginRight: 8 },
  searchInput:    { flex: 1, paddingVertical: 12 },

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
  textBlock:      { flex: 1 },
  word:           { fontWeight: "600", marginBottom: 2 },
  definition:     { lineHeight: 18 },
  starBtn:        { padding: 4 },
  empty:          { textAlign: "center", marginTop: 40 },
});

export default Dictionary;
