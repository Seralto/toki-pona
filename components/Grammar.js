import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";

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
              <Text style={[styles.content, { fontSize: fontSize }]}>
                {content[key].content}
              </Text>
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
  content: {
    color: "#c3c3c3",
  },
});

export default Grammar;
