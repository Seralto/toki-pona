import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";

import Translation from "./Translation";

const Dictionary = ({ pageTexts, dictionary, screenWidth, theme }) => {
  const titleFontSize = screenWidth < 400 ? 20 : 24;
  const th = theme ?? {};

  return (
    <View style={styles.dictionary}>
      <Text style={[styles.title, { fontSize: titleFontSize, color: th.textMuted }]}>
        {pageTexts.pages.dictionary}
      </Text>

      <ScrollView>
        {Object.keys(dictionary).map((key) => (
          <Translation
            word={key}
            text={dictionary[key]}
            key={key}
            screenWidth={screenWidth}
            theme={theme}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  dictionary: { alignItems: "center", paddingHorizontal: 20 },
  title: { marginVertical: 10 },
});

export default Dictionary;
