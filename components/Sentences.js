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

const Sentences = ({ pageTexts, screenWidth }) => {
  const content = pageTexts.content;
  const [query, setQuery] = useState("");

  const titleFontSize = screenWidth < 400 ? 20 : 24;
  const subtitleFontSize = screenWidth < 400 ? 16 : 18;
  const fontSize = screenWidth < 400 ? 15 : 17;

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
      <Text style={[styles.title, { fontSize: titleFontSize }]}>
        {pageTexts.title}
      </Text>

      {/* Search field */}
      <TextInput
        style={[styles.searchInput, { fontSize }]}
        value={query}
        onChangeText={setQuery}
        placeholder="Search..."
        placeholderTextColor="#6b6e8a"
        autoCorrect={false}
        autoCapitalize="none"
        autoComplete="off"
        returnKeyType="search"
      />

      <ScrollView style={styles.scroll}>
        {groups.length === 0 ? (
          <Text style={[styles.empty, { fontSize }]}>No results found.</Text>
        ) : (
          groups.map(({ key, title, phrases }) => (
            <View style={styles.sentencesBox} key={key}>
              <Text style={[styles.subtitle, { fontSize: subtitleFontSize }]}>
                {title}
              </Text>
              {phrases.map((p, idx) => (
                <View key={idx} style={styles.phraseBlock}>
                  <Text style={[styles.tokiPona, { fontSize }]}>{p.tokiPona}</Text>
                  <Text style={[styles.translation, { fontSize: fontSize - 1 }]}>
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
  sentences: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    color: "#c3c3c3",
    marginVertical: 10,
    textAlign: "center",
  },
  searchInput: {
    backgroundColor: "#323545",
    color: "#c3c3c3",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 12,
  },
  scroll: {
    flex: 1,
  },
  sentencesBox: {
    backgroundColor: "#323545",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  subtitle: {
    color: "#9b9db8",
    marginBottom: 12,
    fontWeight: "600",
  },
  phraseBlock: {
    marginBottom: 12,
  },
  tokiPona: {
    color: "#7eb8d4",
    fontWeight: "bold",
  },
  translation: {
    color: "#a0a0b8",
    marginTop: 2,
  },
  empty: {
    color: "#6b6e8a",
    textAlign: "center",
    marginTop: 40,
  },
});

export default Sentences;
