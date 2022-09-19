import React from "react";
import { View, Button, StyleSheet } from "react-native";

const BottomMenu = (props) => {
  return (
    <View style={styles.menu}>
      <Button
        style={styles.languageButton}
        onPress={() => props.onChangeLanguage("portuguese")}
        title="Português"
        accessibilityLabel="Mude o idioma para português"
      />

      <Button
        style={styles.languageButton}
        onPress={() => props.onChangeLanguage("english")}
        title="English"
        accessibilityLabel="Change language to english"
      />

      <Button
        style={styles.languageButton}
        onPress={() => props.onChangeLanguage("spanish")}
        title="Español"
        accessibilityLabel="Cambiar el idioma a español"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#2f3245",
    paddingTop: 6,
    paddingBottom: 6,
  },
});

export default BottomMenu;
