import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import Translation from "./Translation";

const Translator = ({
  pageTexts,
  translations,
  validEnteredWords,
  enteredText,
  inputRef,
  onEnterText,
  onClearTranslation,
}) => {
  return (
    <View style={styles.translator}>
      <Text style={styles.title}>Toki Pona - {pageTexts.language}</Text>

      <View style={styles.inputBox}>
        <TextInput
          onChangeText={onEnterText}
          style={styles.inputText}
          placeholder={pageTexts.placeholder}
          ref={inputRef}
          autoFocus={true}
          autoCapitalize="none"
          value={enteredText}
        />
        <TouchableOpacity onPress={onClearTranslation}>
          <Image
            style={styles.clearImage}
            source={require("../assets/clear.png")}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.translations}>
        {translations.map((translation, index) => {
          return (
            <Translation
              word={validEnteredWords[index]}
              text={translation}
              key={index}
            />
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
  inputBox: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 30,
    width: "100%",
  },
  inputText: {
    flex: 1,
    backgroundColor: "#d6e2ec",
    fontSize: 20,
    borderRadius: 10,
    padding: 10,
    marginRight: 8,
  },
  clearImage: {
    width: 38,
    height: 48,
    alignSelf: "center",
  },
  translations: {
    width: "100%",
  },
});

export default Translator;
