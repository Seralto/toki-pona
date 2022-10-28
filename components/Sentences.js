import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";

const Sentences = ({ pageTexts }) => {
  const content = pageTexts.content;
  console.log(pageTexts.content);

  return (
    <View style={styles.sentences}>
      <Text style={styles.title}>{pageTexts.title}</Text>

      <ScrollView>
        {Object.keys(content).map((key) => {
          return (
            <View style={styles.sentencesBox} key={key}>
              <Text style={styles.subtitle}>{content[key].title}</Text>
              <Text style={styles.content}>{content[key].phrases}</Text>
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
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: "#c3c3c3",
    marginTop: 40,
    marginBottom: 20,
  },
  sentencesBox: {
    backgroundColor: "#323545",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 24,
    color: "#c3c3c3",
    marginBottom: 20,
  },
  content: {
    fontSize: 18,
    color: "#c3c3c3",
  },
});

export default Sentences;
