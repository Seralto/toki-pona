import React from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
  fontSizeId,
  theme,
}) => {
  const fo = fontSizeId === "large" ? 4 : 0;
  const titleFontSize = (screenWidth < 400 ? 20 : 26) + fo;
  const fontSize = (screenWidth < 400 ? 15 : 18) + fo;
  const th = theme ?? {};

  return (
    <View style={styles.translator}>
      <Text style={[styles.title, { fontSize: titleFontSize, color: th.textMuted }]}>
        Toki Pona - {pageTexts.language}
      </Text>

      <ScrollView style={styles.translations}>
        <View style={styles.inputBox}>
          <TextInput
            onChangeText={onEnterText}
            style={[styles.inputText, { fontSize, backgroundColor: th.inputBg, color: th.inputText }]}
            placeholder={pageTexts.placeholder}
            placeholderTextColor={th.textDim}
            ref={inputRef}
            autoFocus={true}
            autoCapitalize="none"
            value={enteredText}
          />

          <TouchableOpacity onPress={onClearTranslation} style={styles.clearBtn}>
            <Ionicons name="close-circle" size={36} color={th.textDim} />
          </TouchableOpacity>
        </View>

        {translations.map((translation, index) => (
          <Translation
            word={validEnteredWords[index]}
            text={translation}
            key={index}
            screenWidth={screenWidth}
            fontSizeId={fontSizeId}
            theme={theme}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  translator: { alignItems: "center", paddingHorizontal: 20 },
  title: { marginVertical: 10 },
  inputBox: {
    alignItems: "center", flexDirection: "row",
    marginTop: 10, marginBottom: 30,
  },
  inputText: {
    flex: 1, borderRadius: 10, padding: 10, marginRight: 8,
  },
  clearBtn: { padding: 4 },
  translations: { width: "100%" },
});

export default Translator;
