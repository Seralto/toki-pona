import React from "react";
import { View, Modal, StyleSheet, TouchableOpacity, Text } from "react-native";

const OptionsModal = ({
  page,
  pageTexts,
  modalVisibility,
  onChangePage,
  onShowModal,
  onQuit,
}) => {
  return (
    <Modal visible={modalVisibility} animationType="slide">
      <View style={styles.optionsModal}>
        {page !== "translator" && (
          <TouchableOpacity onPress={() => onChangePage("translator")}>
            <Text style={styles.menuButton}>
              {pageTexts.pages.translator.toUpperCase()}
            </Text>
          </TouchableOpacity>
        )}

        {page !== "dictionary" && (
          <TouchableOpacity onPress={() => onChangePage("dictionary")}>
            <Text style={styles.menuButton}>
              {pageTexts.pages.dictionary.toUpperCase()}
            </Text>
          </TouchableOpacity>
        )}

        {page !== "grammar" && (
          <TouchableOpacity onPress={() => onChangePage("grammar")}>
            <Text style={styles.menuButton}>
              {pageTexts.pages.grammar.toUpperCase()}
            </Text>
          </TouchableOpacity>
        )}

        {page !== "sentences" && (
          <TouchableOpacity onPress={() => onChangePage("sentences")}>
            <Text style={styles.menuButton}>
              {pageTexts.pages.sentences.toUpperCase()}
            </Text>
          </TouchableOpacity>
        )}

        {page !== "quiz" && (
          <TouchableOpacity onPress={() => onChangePage("quiz")}>
            <Text style={styles.menuButton}>
              {pageTexts.pages.quiz.toUpperCase()}
            </Text>
          </TouchableOpacity>
        )}

        {page !== "settings" && (
          <TouchableOpacity onPress={() => onChangePage("settings")}>
            <Text style={styles.menuButton}>
              {pageTexts.pages.settings.toUpperCase()}
            </Text>
          </TouchableOpacity>
        )}

        {page !== "tokipona" && (
          <TouchableOpacity onPress={() => onChangePage("tokipona")}>
            <Text style={styles.menuButton}>
              {pageTexts.pages.tokiPona.toUpperCase()}
            </Text>
          </TouchableOpacity>
        )}

        {page !== "about" && (
          <TouchableOpacity onPress={() => onChangePage("about")}>
            <Text style={styles.menuButton}>
              {pageTexts.pages.aboutMe.toUpperCase()}
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => onShowModal(false)}>
          <Text style={styles.controllButton}>
            {pageTexts.back.toUpperCase()}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onQuit}>
          <Text style={styles.controllButton}>
            {pageTexts.quit.toUpperCase()}
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
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginVertical: 12,
    marginHorizontal: 50,
    borderRadius: 5,
  },
  controllButton: {
    backgroundColor: "#0f5389",
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginVertical: 12,
    marginHorizontal: 50,
    borderRadius: 5,
  },
});

export default OptionsModal;
