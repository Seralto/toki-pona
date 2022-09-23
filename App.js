import React, { Component } from "react";
import { View, ScrollView, StyleSheet, Button, Modal } from "react-native";

import Translator from "./components/Translator";
import BottomMenu from "./components/BottomMenu";

const dictionaries = {
  portuguese: require("./data/tokipona-portuguese.json"),
  english: require("./data/tokipona-english.json"),
  spanish: require("./data/tokipona-spanish.json"),
};

const texts = {
  portuguese: require("./data/texts-portuguese.json"),
  english: require("./data/texts-english.json"),
  spanish: require("./data/texts-spanish.json"),
};

export default class App extends Component {
  constructor(props) {
    super(props);

    const defaultLanguage = "portuguese";

    this.state = {
      words: [],
      translations: [],
      mode: "translator",
      language: defaultLanguage,
      isModalVisible: false,
      dictionary: this.loadDictionary(defaultLanguage),
    };
  }

  translate(enteredText) {
    const list = [];
    const typedWords = this.sanitizeInput(enteredText)
      .split(" ")
      .filter((word) => word);

    typedWords.forEach((word) => {
      const translation = this.state.dictionary[word];
      if (translation === undefined) {
        return;
      }

      list.push(translation);
    });

    this.setState({
      words: typedWords,
    });

    this.setState({
      translations: list,
    });
  }

  sanitizeInput(input) {
    return input.toLowerCase().replace(/[^a-z\s]/g, "");
  }

  loadText(language) {
    return texts[language];
  }

  loadDictionary(language) {
    return dictionaries[language];
  }

  changeLanguage(language) {
    // this.textInput.focus();

    if (language === this.state.language) {
      return;
    }

    this.state.language = language;
    this.state.dictionary = this.loadDictionary(language);

    const text = this.state.words.join(" ");

    this.translate(text);
  }

  showModal(state) {
    this.setState({
      isModalVisible: state,
    });
  }

  render() {
    const text = this.loadText(this.state.language);

    return (
      <View style={styles.app}>
        <Modal visible={this.state.isModalVisible} animationType="slide">
          {this.state.mode == "dictionary" ? (
            <Button
              onPress={() => props.changePage("translator")}
              title={text.translator}
            />
          ) : (
            <Button
              onPress={() => props.changePage("dictionary")}
              title={text.dictionary}
            />
          )}

          <Button
            onPress={() => props.changePage("about")}
            title={text.aboutMe}
          />

          <Button
            onPress={() => props.changePage("tokipona")}
            title={text.tokiPona}
          />

          <Button onPress={() => this.showModal(false)} title={text.close} />
        </Modal>

        <ScrollView>
          <Translator
            text={text}
            onEnterText={(enteredText) => this.translate(enteredText)}
            translations={this.state.translations}
            words={this.state.words}
          />
        </ScrollView>

        <BottomMenu
          onChangeLanguage={(language) => this.changeLanguage(language)}
          onShowModal={() => this.showModal(true)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#42455a",
  },
  container: {
    alignItems: "center",
    padding: 30,
  },
  title: {
    fontSize: 30,
    color: "#c3c3c3",
    marginTop: 40,
    marginBottom: 20,
  },
});
