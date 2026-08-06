import React, { useState } from "react";
import { View, ScrollView, Text, TextInput, StyleSheet } from "react-native";

/**
 * Parses a raw phrase string ("Translation\ntoki pona.\n\n") into
 * { translation, tokiPona } objects.
 */
function parsePhrase(raw) {
  const lines = raw.split("\n").filter((l) => l.trim().length > 0);
  return { translation: lines[0] ?? "", tokiPona: lines[1] ?? "" };
}

const Sentences = ({ pageTexts, screenWidth, theme }) => {
  const content = pageTexts.content;
  const [query, setQuery] = useState("");

  const titleFontSize = screenWidth < 400 ? 20 : 24;
  const subtitleFontSize = screenWidth < 400 ? 16 : 18;
  const fontSize = screenWidth < 400 ? 15 : 17;
  const th = theme ?? {};

  const q = query.trim().toLowerCase();

  // Build filtered groups
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
      <Text style={[styles.title, { fontSize: titleFontSize, color: th.textMuted }]}>
        {pageTexts.title}
      </Text>

      <TextInput
        style={[styles.searchInput, { fontSize, backgroundColor: th.cardBg, color: th.text }]}
        value={query}
        onChangeText={setQuery}
        placeholder="Search..."
        placeholderTextColor={th.inactive}
        autoCorrect={false}
        autoCapitalize="none"
        autoComplete="off"
        returnKeyType="search"
      />

      <ScrollView style={styles.scroll}>
        {groups.length === 0 ? (
          <Text style={[styles.empty, { fontSize, color: th.inactive }]}>No results found.</Text>
        ) : (
          groups.map(({ key, title, phrases }) => (
            <View style={[styles.sentencesBox, { backgroundColor: th.cardBg }]} key={key}>
              <Text style={[styles.subtitle, { fontSize: subtitleFontSize, color: th.textMuted }]}>
                {title}
              </Text>
              {phrases.map((p, idx) => (
                <View key={idx} style={styles.phraseBlock}>
                  <Text style={[styles.tokiPona, { fontSize, color: th.exampleToki }]}>{p.tokiPona}</Text>
                  <Text style={[styles.translation, { fontSize: fontSize - 1, color: th.exampleTranslation }]}>
                    {p.translation}
                  </Text>
                </View>
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sentences: { flex: 1, paddingHorizontal: 20 },
  title: { marginVertical: 10, textAlign: "center" },
  searchInput: { borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, marginBottom: 12 },
  scroll: { flex: 1 },
  sentencesBox: { padding: 16, borderRadius: 10, marginBottom: 16 },
  subtitle: { marginBottom: 12, fontWeight: "600" },
  phraseBlock: { marginBottom: 12 },
  tokiPona: { fontWeight: "bold" },
  translation: { marginTop: 2 },
  empty: { textAlign: "center", marginTop: 40 },
});

export default Sentences;
