import React from "react";
import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";

import Translation from "./Translation";

const Translator = ({ text, onEnterText, translations, words }) => {
  return (
    <View style={styles.translator}>
      <Text style={styles.title}>Toki Pona - {text.language}</Text>

      <TextInput
        onChangeText={(enteredText) => onEnterText(enteredText)}
        style={styles.inputText}
        placeholder={text.placeholder}
        // ref={(input) => (this.textInput = input)}
        autoFocus={true}
      />

      <ScrollView style={styles.translations}>
        {translations.map((translation, index) => {
          return (
            <Translation word={words[index]} text={translation} key={index} />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  translator: {
    alignItems: "center",
    padding: 30,
  },
  title: {
    fontSize: 30,
    color: "#c3c3c3",
    marginTop: 40,
    marginBottom: 20,
  },
  inputText: {
    backgroundColor: "#d6e2ec",
    fontSize: 20,
    marginTop: 10,
    marginBottom: 30,
    padding: 10,
    borderRadius: 10,
    width: "100%",
  },
  translations: {
    width: "100%",
  },
});

export default Translator;
