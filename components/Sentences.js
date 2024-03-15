import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";

const Sentences = ({ pageTexts, screenWidth }) => {
  const content = pageTexts.content;

  const titleFontSize = screenWidth < 400 ? 20 : 24;
  const subtitleFontSize = screenWidth < 400 ? 18 : 22;
  const fontSize = screenWidth < 400 ? 15 : 18;

  return (
    <View style={styles.sentences}>
      <Text style={[styles.title, { fontSize: titleFontSize }]}>
        {pageTexts.title}
      </Text>

      <ScrollView>
        {Object.keys(content).map((key) => {
          return (
            <View style={styles.sentencesBox} key={key}>
              <Text style={[styles.subtitle, { fontSize: subtitleFontSize }]}>
                {content[key].title}
              </Text>
              <Text style={[styles.content, { fontSize: fontSize }]}>
                {content[key].phrases}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sentences: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    color: "#c3c3c3",
    marginTop: 10,
    marginBottom: 10,
  },
  sentencesBox: {
    backgroundColor: "#323545",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  subtitle: {
    textAlign: "center",
    color: "#c3c3c3",
    marginBottom: 20,
  },
  content: {
    color: "#c3c3c3",
  },
});

export default Sentences;
