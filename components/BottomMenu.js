import React from "react";
import { View, Button, StyleSheet } from "react-native";

const BottomMenu = (props) => {
  return (
    <View style={styles.menu}>
      <Button
        onPress={() => props.onChangeLanguage("portuguese")}
        title="Português"
        accessibilityLabel="Mude o idioma para português"
      />

      <Button
        onPress={() => props.onChangeLanguage("english")}
        title="English"
        accessibilityLabel="Change language to english"
      />

      <Button
        onPress={() => props.onChangeLanguage("spanish")}
        title="Español"
        accessibilityLabel="Cambiar el idioma a español"
      />

      <Button
        color="#0f5389"
        onPress={() => props.onShowModal()}
        title="Menu"
        accessibilityLabel="Options"
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
