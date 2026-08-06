import React, { useState, useRef } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import Accordion, { accordionShared } from "./Accordion";
import SearchBar from "./SearchBar";

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

const Sentences = ({ pageTexts, screenWidth, fontSizeId, theme }) => {
  const content = pageTexts.content;
  const [query, setQuery] = useState("");
  const scrollRef = useRef(null);

  const fo = fontSizeId === "large" ? 4 : 0;
  const fontSize = (screenWidth < 400 ? 15 : 17) + fo;
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
      <Text style={[styles.title, { fontSize: 26 + fo, color: th.text }]}>{pageTexts.title}</Text>

      {/* Search */}
      <SearchBar
        value={query}
        onChangeText={setQuery}
        placeholder={pageTexts.search ?? "Search phrases..."}
        fontSize={fontSize}
        th={th}
        style={styles.searchBarMargin}
      />

      <ScrollView ref={scrollRef} style={styles.scroll} showsVerticalScrollIndicator={false}>
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
            <Accordion key={key} title={title} badge={`(${phrases.length})`} th={th} titleSize={15 + fo} scrollRef={scrollRef}>
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
  searchBarMargin:{ marginBottom: 12 },

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
