import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";

import Translation from "./Translation";

const Dictionary = ({ text, dictionary }) => {
  return (
    <View style={styles.dictionary}>
      <Text style={styles.title}>{text.pages.dictionary}</Text>

      <ScrollView>
        {Object.keys(dictionary).map((key) => {
          return <Translation word={key} text={dictionary[key]} key={key} />;
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  dictionary: {
    alignItems: "center",
    padding: 30,
  },
  title: {
    fontSize: 30,
    color: "#c3c3c3",
    marginTop: 40,
    marginBottom: 20,
  },
});

export default Dictionary;
