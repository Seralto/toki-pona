import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";

/**
 * Renders a grammar content block.
 * Lines containing " = " are treated as examples and split into two lines:
 *   - Toki Pona phrase (bold, primary color)
 *   - Translation (lighter color, below)
 * Other lines are rendered as plain text paragraphs.
 */
function GrammarContent({ text, fontSize, theme }) {
  const lines = text.split("\n").filter((l) => l.trim().length > 0);
  const th = theme ?? {};

  return (
    <View>
      {lines.map((line, idx) => {
        const eqIdx = line.indexOf(" = ");
        if (eqIdx !== -1) {
          const tp = line.slice(0, eqIdx).trim();
          const translation = line.slice(eqIdx + 3).trim();
          return (
            <View key={idx} style={styles.exampleBlock}>
              <Text style={[styles.exampleToki, { fontSize, color: th.exampleToki }]}>{tp}</Text>
              <Text style={{ fontSize: fontSize - 1, color: th.exampleTranslation }}>
                {translation}
              </Text>
            </View>
          );
        }
        return (
          <Text key={idx} style={[styles.contentText, { fontSize, color: th.textMuted }]}>
            {line}
          </Text>
        );
      })}
    </View>
  );
}

const Grammar = ({ pageTexts, screenWidth, theme }) => {
  const content = pageTexts.content;
  const th = theme ?? {};

  const titleFontSize = screenWidth < 400 ? 20 : 24;
  const subtitleFontSize = screenWidth < 400 ? 18 : 22;
  const fontSize = screenWidth < 400 ? 15 : 18;

  return (
    <View style={styles.grammar}>
      <Text style={[styles.title, { fontSize: titleFontSize, color: th.textMuted }]}>
        {pageTexts.title}
      </Text>

      <ScrollView>
        {Object.keys(content).map((key) => (
          <View style={[styles.grammarBox, { backgroundColor: th.cardBg }]} key={key}>
            <Text style={[styles.subtitle, { fontSize: subtitleFontSize, color: th.textMuted }]}>
              {content[key].title}
            </Text>
            <GrammarContent text={content[key].content} fontSize={fontSize} theme={th} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  grammar: { alignItems: "center", paddingHorizontal: 20 },
  title: { marginVertical: 10, textAlign: "center" },
  grammarBox: { padding: 20, borderRadius: 10, marginBottom: 15 },
  subtitle: { marginBottom: 10 },
  contentText: { marginBottom: 4 },
  exampleBlock: { marginBottom: 10 },
  exampleToki: { fontWeight: "bold", fontFamily: "monospace" },
});

export default Grammar;
