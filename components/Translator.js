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
  screenWidth,
}) => {
  const titleFontSize = screenWidth < 400 ? 20 : 26;
  const fontSize = screenWidth < 400 ? 15 : 18;

  return (
    <View style={styles.translator}>
      <Text style={[styles.title, { fontSize: titleFontSize }]}>
        Toki Pona - {pageTexts.language}
      </Text>

      <View style={styles.inputBox}>
        <TextInput
          onChangeText={onEnterText}
          style={[styles.inputText, { fontSize: fontSize }]}
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
              screenWidth={screenWidth}
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
    paddingHorizontal: 20,
  },
  title: {
    color: "#c3c3c3",
    marginTop: 10,
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
