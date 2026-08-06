import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";

/**
 * Renders a grammar content block.
 * Lines containing " = " are treated as examples and split into two lines:
 *   - Toki Pona phrase (bold, primary color)
 *   - Translation (lighter color, below)
 * Other lines are rendered as plain text paragraphs.
 */
function GrammarContent({ text, fontSize }) {
  const lines = text.split("\n").filter((l) => l.trim().length > 0);

  return (
    <View>
      {lines.map((line, idx) => {
        const eqIdx = line.indexOf(" = ");
        if (eqIdx !== -1) {
          const tp = line.slice(0, eqIdx).trim();
          const translation = line.slice(eqIdx + 3).trim();
          return (
            <View key={idx} style={styles.exampleBlock}>
              <Text style={[styles.exampleToki, { fontSize }]}>{tp}</Text>
              <Text style={[styles.exampleTranslation, { fontSize: fontSize - 1 }]}>
                {translation}
              </Text>
            </View>
          );
        }
        return (
          <Text key={idx} style={[styles.contentText, { fontSize }]}>
            {line}
          </Text>
        );
      })}
    </View>
  );
}

const Grammar = ({ pageTexts, screenWidth }) => {
  const content = pageTexts.content;

  const titleFontSize = screenWidth < 400 ? 20 : 24;
  const subtitleFontSize = screenWidth < 400 ? 18 : 22;
  const fontSize = screenWidth < 400 ? 15 : 18;

  return (
    <View style={styles.grammar}>
      <Text style={[styles.title, { fontSize: titleFontSize }]}>
        {pageTexts.title}
      </Text>

      <ScrollView>
        {Object.keys(content).map((key) => {
          return (
            <View style={styles.grammarBox} key={key}>
              <Text style={[styles.subtitle, { fontSize: subtitleFontSize }]}>
                {content[key].title}
              </Text>
              <GrammarContent text={content[key].content} fontSize={fontSize} />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  grammar: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    color: "#c3c3c3",
    marginVertical: 10,
    textAlign: "center",
  },
  grammarBox: {
    backgroundColor: "#323545",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  subtitle: {
    color: "#c3c3c3",
    marginBottom: 10,
  },
  contentText: {
    color: "#c3c3c3",
    marginBottom: 4,
  },
  exampleBlock: {
    marginBottom: 10,
  },
  exampleToki: {
    color: "#7eb8d4",
    fontWeight: "bold",
    fontFamily: "monospace",
  },
  exampleTranslation: {
    color: "#a0a0b8",
  },
});

export default Grammar;
