import React from "react";
import { View, Button, StyleSheet } from "react-native";

const BottomMenu = ({ pageTexts, onChangeLanguage, onShowModal }) => {
  return (
    <View style={styles.bottomMenu}>
      <Button
        onPress={() => onChangeLanguage("english")}
        title="English"
        accessibilityLabel="Change language to english"
      />

      <Button
        onPress={() => onChangeLanguage("portuguese")}
        title="Português"
        accessibilityLabel="Mude o idioma para português"
      />

      <Button
        onPress={() => onChangeLanguage("spanish")}
        title="Español"
        accessibilityLabel="Cambiar el idioma a español"
      />

      <Button
        color="#0f5389"
        onPress={() => onShowModal()}
        title={pageTexts.menu}
        accessibilityLabel="Options"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomMenu: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#2f3245",
    paddingTop: 6,
    paddingBottom: 6,
  },
});

export default BottomMenu;
