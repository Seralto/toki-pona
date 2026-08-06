import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

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
  const [focused, setFocused] = useState(false);
  const [fontsLoaded] = useFonts({ "sitelen-pona": require("../assets/fonts/linja-pona.otf") });

  useEffect(() => {
    const t = setTimeout(() => inputRef?.current?.focus(), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={styles.translator}>
      <Text style={[styles.title, { fontSize: titleFontSize, color: th.textMuted }]}>
        Toki Pona - {pageTexts.language}
      </Text>

      <View style={[styles.inputBox, { backgroundColor: th.inputBg, borderColor: focused ? th.accentBorder : th.surfaceBorder }]}>
        <Ionicons name="create-outline" size={18} color={th.textMuted} style={styles.inputIcon} />
        <TextInput
          onChangeText={onEnterText}
          style={[styles.inputText, { fontSize, color: th.text }]}
          placeholder={pageTexts.placeholder}
          placeholderTextColor={th.textDim}
          ref={inputRef}
          autoCorrect={false}
          spellCheck={false}
          autoCapitalize="none"
          autoComplete="off"
          value={enteredText}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {enteredText?.length > 0 && (
          <TouchableOpacity onPress={onClearTranslation}>
            <Ionicons name="close-circle" size={18} color={th.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.translations}>
        {translations.map((translation, index) => (
          <Translation
            key={index}
            word={validEnteredWords[index]}
            text={translation}
            screenWidth={screenWidth}
            fontSizeId={fontSizeId}
            fontsLoaded={fontsLoaded}
            theme={theme}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  translator:  { flex: 1, paddingHorizontal: 20 },
  title:       { marginVertical: 10 },
  inputBox:    { flexDirection: "row", alignItems: "center", borderRadius: 12, borderWidth: 1, paddingHorizontal: 12, marginBottom: 16 },
  inputIcon:   { marginRight: 8 },
  inputText:   { flex: 1, paddingVertical: 12 },
  translations:{ flex: 1 },
});

export default Translator;
