import React from "react";
import { View, Modal, Button, StyleSheet } from "react-native";

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
          <View style={styles.button}>
            <Button
              onPress={() => onChangePage("translator")}
              title={text.pages.translator}
            />
          </View>
        )}

        {page !== "dictionary" && (
          <View style={styles.button}>
            <Button
              onPress={() => onChangePage("dictionary")}
              title={text.pages.dictionary}
            />
          </View>
        )}

        <View style={styles.button}>
          <Button
            onPress={() => onChangePage("about")}
            title={text.pages.aboutMe}
          />
        </View>

        <View style={styles.button}>
          <Button
            onPress={() => onChangePage("tokipona")}
            title={text.pages.tokiPona}
          />
        </View>

        <View style={styles.button}>
          <Button
            color="#0f5389"
            onPress={() => onShowModal(false)}
            title={text.close}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  optionsModal: {
    flex: 1,
    backgroundColor: "#2f3245",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "60%",
    marginVertical: 15,
  },
});

export default OptionsModal;
