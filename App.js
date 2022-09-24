import React, { Component } from "react";
import { View, ScrollView, StyleSheet } from "react-native";

import Translator from "./components/Translator";
import Dictionary from "./components/Dictionary";
import About from "./components/About";
import TokiPona from "./components/TokiPona";
import OptionsModal from "./components/OptionsModal";
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
      page: "translator",
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

    this.setState({ words: typedWords });
    this.setState({ translations: list });
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
    this.setState({ isModalVisible: state });
  }

  changePage(page) {
    this.setState({ page: page });
    this.showModal(false);
  }

  isPage(page) {
    return this.state.page === page;
  }

  render() {
    const text = this.loadText(this.state.language);

    return (
      <View style={styles.app}>
        <ScrollView>
          {this.isPage("dictionary") && (
            <Dictionary text={text} dictionary={this.state.dictionary} />
          )}

          {this.isPage("about") && <About text={text.aboutMe} />}

          {this.isPage("tokipona") && <TokiPona text={text.tokiPona} />}

          {this.isPage("translator") && (
            <Translator
              text={text}
              onEnterText={(enteredText) => this.translate(enteredText)}
              translations={this.state.translations}
              words={this.state.words}
            />
          )}
        </ScrollView>

        <OptionsModal
          text={text}
          page={this.state.page}
          modalVisibility={this.state.isModalVisible}
          onChangePage={(page) => this.changePage(page)}
          onShowModal={(state) => this.showModal(state)}
        />

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
});
