import React, { useRef } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import Accordion, { accordionShared } from "./Accordion";

/** One example line: "toki pona phrase = Translation" */
function ExampleLine({ line, fontSize, th }) {
  const eqIdx = line.indexOf(" = ");
  const tp          = line.slice(0, eqIdx).trim();
  const translation = line.slice(eqIdx + 3).trim();
  return (
    <View style={styles.exampleRow}>
      <Text style={[styles.exampleToki, { fontSize, color: th.exampleToki }]}>{tp}</Text>
      <Text style={{ fontSize: fontSize - 1, color: th.exampleTranslation }}>{translation}</Text>
    </View>
  );
}

/** Mirrors PWA SectionContent: splits on \n\n, groups examples into cards */
function SectionContent({ text, fontSize, th }) {
  const paragraphs = text.split("\n\n").filter(Boolean);

  return (
    <View style={styles.sectionContent}>
      {paragraphs.map((paragraph, pi) => {
        const lines = paragraph.split("\n").filter((l) => l.trim().length > 0);
        if (lines.length === 0) return null;

        const allExamples = lines.every((l) => l.includes(" = "));
        const hasExample  = lines.some((l) => l.includes(" = "));

        // All lines are examples → grouped card
        if (allExamples) {
          return (
            <View key={pi} style={[styles.exampleCard, { backgroundColor: th.cardBg }]}>
              {lines.map((line, li) => (
                <ExampleLine key={li} line={line} fontSize={fontSize} th={th} />
              ))}
            </View>
          );
        }

        // Mixed paragraph (text + examples) → line by line
        if (hasExample) {
          return (
            <View key={pi} style={styles.mixedParagraph}>
              {lines.map((line, li) =>
                line.includes(" = ") ? (
                  <View key={li} style={[styles.exampleCard, { backgroundColor: th.cardBg }]}>
                    <ExampleLine line={line} fontSize={fontSize} th={th} />
                  </View>
                ) : (
                  <Text key={li} style={[styles.contentText, { fontSize, color: th.text }]}>{line}</Text>
                )
              )}
            </View>
          );
        }

        // Pure text paragraph — highlight (parenthesised) spans
        return (
          <Text key={pi} style={[styles.contentText, { fontSize, color: th.text }]}>
            {lines.join(" ").split(/(\([^)]+\))/).map((part, i) =>
              /^\([^)]+\)$/.test(part) ? (
                <Text key={i} style={[styles.highlight, { color: th.accent }]}>{part}</Text>
              ) : part
            )}
          </Text>
        );
      })}
    </View>
  );
}

const Grammar = ({ pageTexts, screenWidth, fontSizeId, theme }) => {
  const content = pageTexts.content;
  const th = theme ?? {};
  const fo = fontSizeId === "large" ? 4 : 0;
  const fontSize = (screenWidth < 400 ? 15 : 17) + fo;
  const scrollRef = useRef(null);

  return (
    <View style={styles.grammar}>
      <Text style={[styles.title, { fontSize: 26 + fo, color: th.text }]}>{pageTexts.title}</Text>

      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
        {Object.keys(content).map((key) => (
          <Accordion key={key} title={content[key].title} th={th} titleSize={15 + fo} scrollRef={scrollRef}>
            <View style={[accordionShared.separator, { backgroundColor: th.surfaceBorder }]} />
            <SectionContent text={content[key].content} fontSize={fontSize} th={th} />
          </Accordion>
        ))}
        <View style={{ height: 48 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  grammar:         { flex: 1, paddingHorizontal: 20 },
  title:           { fontSize: 26, fontWeight: "bold", marginBottom: 16, marginTop: 8 },
  sectionContent:  { paddingHorizontal: 16, paddingVertical: 14, gap: 10 },
  contentText:     { lineHeight: 22 },
  mixedParagraph:  { gap: 8 },
  exampleCard:     { borderRadius: 8, paddingHorizontal: 14, paddingVertical: 10, gap: 10 },
  exampleRow:      { gap: 2 },
  exampleToki:     { fontWeight: "bold", fontFamily: "monospace" },
  highlight:       { fontWeight: "600", fontFamily: "monospace" },
});

export default Grammar;
