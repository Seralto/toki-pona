import React from "react";
import { View, Modal, StyleSheet, TouchableOpacity, Text } from "react-native";

const OptionsModal = ({
  page,
  pageTexts,
  modalVisibility,
  screenWidth,
  onChangePage,
  onShowModal,
}) => {
  const fontSize = screenWidth < 400 ? 15 : 18;
  const vertical = screenWidth < 400 ? 8 : 10;

  return (
    <Modal visible={modalVisibility} animationType="slide">
      <View style={styles.optionsModal}>
        <TouchableOpacity onPress={() => onChangePage("translator")}>
          <Text
            style={[
              styles.menuButton,
              {
                fontSize: fontSize,
                paddingVertical: vertical,
                marginVertical: vertical,
              },
            ]}
          >
            {pageTexts.pages.translator.toUpperCase()}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onChangePage("dictionary")}>
          <Text
            style={[
              styles.menuButton,
              {
                fontSize: fontSize,
                paddingVertical: vertical,
                marginVertical: vertical,
              },
            ]}
          >
            {pageTexts.pages.dictionary.toUpperCase()}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onChangePage("grammar")}>
          <Text
            style={[
              styles.menuButton,
              {
                fontSize: fontSize,
                paddingVertical: vertical,
                marginVertical: vertical,
              },
            ]}
          >
            {pageTexts.pages.grammar.toUpperCase()}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onChangePage("sentences")}>
          <Text
            style={[
              styles.menuButton,
              {
                fontSize: fontSize,
                paddingVertical: vertical,
                marginVertical: vertical,
              },
            ]}
          >
            {pageTexts.pages.sentences.toUpperCase()}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onChangePage("quiz")}>
          <Text
            style={[
              styles.menuButton,
              {
                fontSize: fontSize,
                paddingVertical: vertical,
                marginVertical: vertical,
              },
            ]}
          >
            {pageTexts.pages.quiz.toUpperCase()}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onChangePage("settings")}>
          <Text
            style={[
              styles.menuButton,
              {
                fontSize: fontSize,
                paddingVertical: vertical,
                marginVertical: vertical,
              },
            ]}
          >
            {pageTexts.pages.settings.toUpperCase()}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onChangePage("tokipona")}>
          <Text
            style={[
              styles.menuButton,
              {
                fontSize: fontSize,
                paddingVertical: vertical,
                marginVertical: vertical,
              },
            ]}
          >
            {pageTexts.pages.tokiPona.toUpperCase()}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onChangePage("about")}>
          <Text
            style={[
              styles.menuButton,
              {
                fontSize: fontSize,
                paddingVertical: vertical,
                marginVertical: vertical,
              },
            ]}
          >
            {pageTexts.pages.aboutMe.toUpperCase()}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onShowModal(false)}>
          <Text
            style={[
              styles.controllButton,
              {
                fontSize: fontSize,
                paddingVertical: vertical,
                marginVertical: vertical,
              },
            ]}
          >
            {pageTexts.back.toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  optionsModal: {
    flex: 1,
    backgroundColor: "#2f3245",
    justifyContent: "center",
  },
  menuButton: {
    backgroundColor: "#2196f3",
    textAlign: "center",
    color: "#fff",
    paddingHorizontal: 40,
    marginHorizontal: 50,
    borderRadius: 5,
  },
  controllButton: {
    backgroundColor: "#0f5389",
    textAlign: "center",
    color: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginVertical: 10,
    marginHorizontal: 50,
    borderRadius: 5,
  },
});

export default OptionsModal;
