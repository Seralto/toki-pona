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
  const iconSize = screenWidth < 400 ? 35 : 40;

  return (
    <View style={styles.translator}>
      <Text style={[styles.title, { fontSize: titleFontSize }]}>
        Toki Pona - {pageTexts.language}
      </Text>

      <ScrollView style={styles.translations}>
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

          <View>
            <TouchableOpacity onPress={onClearTranslation}>
              <Image
                style={{ width: iconSize, height: iconSize }}
                source={require("../assets/clear.png")}
              />
            </TouchableOpacity>
          </View>
        </View>

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
    marginVertical: 10,
  },
  inputBox: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 30,
  },
  inputText: {
    flex: 1,
    backgroundColor: "#d6e2ec",
    borderRadius: 10,
    padding: 10,
    marginRight: 8,
  },
  translations: {
    width: "100%",
  },
});

export default Translator;
