import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";

const Grammar = ({ pageTexts }) => {
  const content = pageTexts.content;

  return (
    <View style={styles.grammar}>
      <Text style={styles.title}>{pageTexts.title}</Text>

      <ScrollView>
        {Object.keys(content).map((key) => {
          return (
            <View style={styles.grammarBox} key={key}>
              <Text style={styles.subtitle}>{content[key].title}</Text>
              <Text style={styles.content}>{content[key].content}</Text>
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
    padding: 20,
  },
  title: {
    fontSize: 26,
    color: "#c3c3c3",
    marginTop: 40,
    marginBottom: 20,
    textAlign: "center",
  },
  grammarBox: {
    backgroundColor: "#323545",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 22,
    color: "#c3c3c3",
    marginBottom: 20,
  },
  content: {
    fontSize: 18,
    color: "#c3c3c3",
  },
});

export default Grammar;
