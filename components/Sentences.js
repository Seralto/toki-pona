import React, { useState } from "react";
import { View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Accordion, { accordionShared } from "./Accordion";

function parsePhrase(raw) {
  const lines = raw.split("\n").filter((l) => l.trim().length > 0);
  return { translation: lines[0] ?? "", tokiPona: lines[1] ?? "" };
}

const PhraseList = ({ phrases, fontSize, th }) => (
  <>
    {phrases.map((p, idx) => (
      <View key={idx}>
        <View style={[accordionShared.separator, { backgroundColor: th.surfaceBorder }]} />
        <View style={styles.phraseBlock}>
          <Text style={[styles.tokiPona, { fontSize, color: th.exampleToki }]}>{p.tokiPona}</Text>
          <Text style={[styles.translation, { fontSize: fontSize - 1, color: th.exampleTranslation }]}>{p.translation}</Text>
        </View>
      </View>
    ))}
  </>
);

const Sentences = ({ pageTexts, screenWidth, theme }) => {
  const content = pageTexts.content;
  const [query, setQuery] = useState("");

  const fontSize = screenWidth < 400 ? 15 : 17;
  const th = theme ?? {};
  const q = query.trim().toLowerCase();

  const groups = Object.keys(content).reduce((acc, key) => {
    const parsed = content[key].phrases.map(parsePhrase);
    const filtered = q
      ? parsed.filter(
          (p) =>
            p.tokiPona.toLowerCase().includes(q) ||
            p.translation.toLowerCase().includes(q)
        )
      : parsed;
    if (filtered.length > 0) {
      acc.push({ key, title: content[key].title, phrases: filtered });
    }
    return acc;
  }, []);

  return (
    <View style={styles.sentences}>
      <Text style={[styles.title, { color: th.text }]}>{pageTexts.title}</Text>

      {/* Search */}
      <View style={[styles.searchBox, { backgroundColor: th.inputBg, borderColor: q ? th.accentBorder : th.surfaceBorder }]}>
        <Ionicons name="search-outline" size={18} color={th.textMuted} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { fontSize, color: th.text }]}
          value={query}
          onChangeText={setQuery}
          placeholder={pageTexts.search ?? "Search phrases..."}
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

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {groups.length === 0 ? (
          <Text style={[styles.empty, { fontSize, color: th.inactive }]}>{pageTexts.noResults ?? "No results found."}</Text>
        ) : q ? (
          /* Search mode: flat list, no accordion */
          groups.map(({ key, title, phrases }) => (
            <View key={key} style={[styles.flatCard, { backgroundColor: th.surface, borderColor: th.surfaceBorder }]}>
              <Text style={[styles.flatTitle, { color: th.textMuted }]}>{title}</Text>
              <PhraseList phrases={phrases} fontSize={fontSize} th={th} />
            </View>
          ))
        ) : (
          /* Normal mode: accordion */
          groups.map(({ key, title, phrases }) => (
            <Accordion key={key} title={title} badge={`(${phrases.length})`} th={th}>
              <PhraseList phrases={phrases} fontSize={fontSize} th={th} />
            </Accordion>
          ))
        )}
        <View style={{ height: 48 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sentences:      { flex: 1, paddingHorizontal: 20 },
  title:          { fontSize: 26, fontWeight: "bold", marginBottom: 16, marginTop: 8 },

  /* Search */
  searchBox:      { flexDirection: "row", alignItems: "center", borderRadius: 12, borderWidth: 1, paddingHorizontal: 12, marginBottom: 12 },
  searchIcon:     { marginRight: 8 },
  searchInput:    { flex: 1, paddingVertical: 12 },

  scroll:         { flex: 1 },
  empty:          { textAlign: "center", marginTop: 40 },

  /* Flat search results */
  flatCard:       { borderRadius: 12, borderWidth: 1.5, marginBottom: 10, overflow: "hidden" },
  flatTitle:      { fontSize: 13, fontWeight: "600", paddingHorizontal: 16, paddingTop: 12, paddingBottom: 4 },

  /* Phrases */
  phraseBlock:    { paddingHorizontal: 16, paddingVertical: 14 },
  tokiPona:       { fontWeight: "bold", marginBottom: 4 },
  translation:    { },
});

export default Sentences;
