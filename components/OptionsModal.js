import React from "react";
import {
  View,
  Modal,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";

const OptionsModal = ({
  page,
  text,
  modalVisibility,
  onChangePage,
  onShowModal,
}) => {
  return (
    <Modal visible={modalVisibility} animationType="slide">
      <View style={styles.optionsModal}>
        {page !== "translator" && (
          <TouchableOpacity onPress={() => onChangePage("translator")}>
            <Text style={styles.button}>
              {text.pages.translator.toUpperCase()}
            </Text>
          </TouchableOpacity>
        )}

        {page !== "dictionary" && (
          <TouchableOpacity onPress={() => onChangePage("dictionary")}>
            <Text style={styles.button}>
              {text.pages.dictionary.toUpperCase()}
            </Text>
          </TouchableOpacity>
        )}

        {/* {page !== "about" && ( */}
        <TouchableOpacity onPress={() => onChangePage("about")}>
          <Text style={styles.button}>{text.pages.aboutMe.toUpperCase()}</Text>
        </TouchableOpacity>
        {/* )} */}

        {page !== "tokipona" && (
          <TouchableOpacity onPress={() => onChangePage("tokipona")}>
            <Text style={styles.button}>
              {text.pages.tokiPona.toUpperCase()}
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => onShowModal(false)}>
          <Text style={styles.button}>{text.close.toUpperCase()}</Text>
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
  button: {
    backgroundColor: "#2196f3",
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginVertical: 15,
    marginHorizontal: 50,
    borderRadius: 5,
  },
});

export default OptionsModal;
