import React, { useState, useRef, useCallback } from "react";
import { View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function parsePhrase(raw) {
  const lines = raw.split("\n").filter((l) => l.trim().length > 0);
  return { translation: lines[0] ?? "", tokiPona: lines[1] ?? "" };
}

const AccordionGroup = ({ title, phrases, fontSize, th }) => {
  const [open, setOpen]       = useState(false);
  const [bodyHeight, setBodyHeight] = useState(0);
  const animHeight = useRef(new Animated.Value(0)).current;
  const animOpacity = useRef(new Animated.Value(0)).current;
  const measured = useRef(false);

  const onBodyLayout = useCallback((e) => {
    const h = e.nativeEvent.layout.height;
    if (!measured.current && h > 0) {
      measured.current = true;
      setBodyHeight(h);
    }
  }, []);

  const toggle = () => {
    const toValue = open ? 0 : bodyHeight;
    Animated.parallel([
      Animated.timing(animHeight, { toValue, duration: 300, useNativeDriver: false }),
      Animated.timing(animOpacity, { toValue: open ? 0 : 1, duration: 300, useNativeDriver: false }),
    ]).start();
    setOpen((v) => !v);
  };

  return (
    <View style={[styles.accordionCard, { backgroundColor: th.surface, borderColor: th.surfaceBorder }]}>
      {/* Header */}
      <TouchableOpacity onPress={toggle} style={styles.accordionHeader} activeOpacity={0.7}>
        <View style={styles.accordionTitleRow}>
          <Text style={[styles.accordionTitle, { color: th.text }]}>{title}</Text>
          <Text style={[styles.accordionCount, { color: th.textMuted }]}>({phrases.length})</Text>
        </View>
        <Ionicons name={open ? "chevron-up" : "chevron-down"} size={18} color={th.textMuted} />
      </TouchableOpacity>

      {/* Animated body */}
      <Animated.View style={{ height: animHeight, overflow: "hidden", opacity: animOpacity }}>
        {/* Hidden measure pass */}
        {!measured.current && (
          <View onLayout={onBodyLayout} style={styles.measureLayer}>
            {phrases.map((p, idx) => (
              <View key={idx}>
                <View style={[styles.separator, { backgroundColor: th.surfaceBorder }]} />
                <View style={styles.phraseBlock}>
                  <Text style={[styles.tokiPona, { fontSize, color: th.exampleToki }]}>{p.tokiPona}</Text>
                  <Text style={[styles.translation, { fontSize: fontSize - 1, color: th.exampleTranslation }]}>{p.translation}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
        {/* Visible content */}
        {measured.current && phrases.map((p, idx) => (
          <View key={idx}>
            <View style={[styles.separator, { backgroundColor: th.surfaceBorder }]} />
            <View style={styles.phraseBlock}>
              <Text style={[styles.tokiPona, { fontSize, color: th.exampleToki }]}>{p.tokiPona}</Text>
              <Text style={[styles.translation, { fontSize: fontSize - 1, color: th.exampleTranslation }]}>{p.translation}</Text>
            </View>
          </View>
        ))}
      </Animated.View>
    </View>
  );
};

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
      <View style={[styles.searchBox, { backgroundColor: th.inputBg, borderColor: th.surfaceBorder }]}>
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
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {groups.length === 0 ? (
          <Text style={[styles.empty, { fontSize, color: th.inactive }]}>{pageTexts.noResults ?? "No results found."}</Text>
        ) : (
          groups.map(({ key, title, phrases }, idx) => (
            <AccordionGroup
              key={key}
              title={title}
              phrases={phrases}
              fontSize={fontSize}
              th={th}
              openByDefault={false}
            />
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

  /* Accordion */
  accordionCard:  { borderRadius: 12, borderWidth: 1.5, marginBottom: 10, overflow: "hidden" },
  accordionHeader:{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 14 },
  accordionTitleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  accordionTitle: { fontSize: 15, fontWeight: "700" },
  accordionCount: { fontSize: 14 },

  /* Phrases */
  measureLayer:   { position: "absolute", opacity: 0, pointerEvents: "none" },
  separator:      { height: 1 },
  phraseBlock:    { paddingHorizontal: 16, paddingVertical: 14 },
  tokiPona:       { fontWeight: "bold", marginBottom: 4 },
  translation:    { },
});

export default Sentences;
