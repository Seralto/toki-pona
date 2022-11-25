import React, { Component } from "react";
import { View, ScrollView, StyleSheet, BackHandler } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Translator from "./components/Translator";
import Dictionary from "./components/Dictionary";
import Grammar from "./components/Grammar";
import Sentences from "./components/Sentences";
import Quiz from "./components/Quiz";
import Settings from "./components/Settings";
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

const DEFAULT_LANGUAGE = "english";
const DEFAULT_PAGE = "translator";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.textInput = React.createRef();

    this.state = {
      validEnteredWords: [],
      tokiPonaWords: [],
      translations: [],
      dictionary: {},
      appTexts: "",
      enteredText: "",
      language: "",
      page: "",
      isModalVisible: false,
    };
  }

  componentDidMount() {
    this.getLanguage();
    this.getStartPage();
    this.getDictionary();
  }

  getLanguage() {
    AsyncStorage.getItem("language").then((language) => {
      const currentLanguage = language ? language : DEFAULT_LANGUAGE;
      this.changeLanguage(currentLanguage);
      const texts = this.loadText(currentLanguage);
      this.setState({ appTexts: texts });
    });
  }

  getStartPage() {
    AsyncStorage.getItem("page").then((page) => {
      const currentPage = page ? page : DEFAULT_PAGE;
      this.changePage(currentPage);
      this.setState({ page: currentPage });
    });
  }

  getDictionary() {
    const dictionary = this.loadDictionary(DEFAULT_LANGUAGE);
    this.setState({ dictionary: dictionary });
    this.setState({ tokiPonaWords: Object.keys(dictionary) });
  }

  setDefaultLanguage(language) {
    AsyncStorage.setItem("language", language);
    this.changeLanguage(language);
  }

  setDefaultPage(page) {
    AsyncStorage.setItem("page", page);
  }

  translate(enteredText) {
    const validTokiPonaWords = this.sanitizeInput(enteredText)
      .split(" ")
      .filter((word) => this.state.tokiPonaWords.includes(word));

    const translations = validTokiPonaWords.map(
      (word) => this.state.dictionary[word]
    );

    this.setState({ enteredText: enteredText });
    this.setState({ validEnteredWords: validTokiPonaWords });
    this.setState({ translations: translations });
  }

  changeLanguage(language) {
    if (this.isPage("translator")) {
      this.textInput.current.focus();
    }

    if (language === this.state.language) {
      return;
    }

    this.setState({ language: language });
    this.setState({ appTexts: this.loadText(language) });
    this.setState({ dictionary: this.loadDictionary(language) }, () => {
      this.translate(this.state.enteredText);
    });
  }

  changePage(page) {
    this.setState({ page: page });
    this.showModal(false);
    this.mainContent.scrollTo({ y: 0, animated: false });
  }

  clearTranslation() {
    this.setState({ validEnteredWords: [] });
    this.setState({ translations: [] });
    this.setState({ enteredText: "" });
    this.textInput.current.clear();
    this.textInput.current.focus();
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

  showModal(state) {
    this.setState({ isModalVisible: state });
  }

  quitApp() {
    BackHandler.exitApp();
  }

  isPage(page) {
    return this.state.page === page;
  }

  render() {
    return (
      <View style={styles.app}>
        <ScrollView
          nestedScrollEnabled={true}
          ref={(ref) => (this.mainContent = ref)}
        >
          {this.isPage("dictionary") && (
            <Dictionary
              pageTexts={this.state.appTexts}
              dictionary={this.state.dictionary}
            />
          )}

          {this.isPage("grammar") && (
            <Grammar pageTexts={this.state.appTexts.grammar} />
          )}

          {this.isPage("quiz") && (
            <Quiz
              pageTexts={this.state.appTexts.quiz}
              dictionary={this.state.dictionary}
            />
          )}

          {this.isPage("settings") && (
            <Settings
              pageTexts={this.state.appTexts.settings}
              onSelectLanguage={(language) => this.setDefaultLanguage(language)}
              onSelectPage={(page) => this.setDefaultPage(page)}
              pagesOptions={this.state.appTexts.settings.pagesOptions}
              language={this.state.language}
              page={this.state.page}
            />
          )}

          {this.isPage("sentences") && (
            <Sentences pageTexts={this.state.appTexts.sentences} />
          )}

          {this.isPage("about") && (
            <About pageTexts={this.state.appTexts.aboutMe} />
          )}

          {this.isPage("tokipona") && (
            <TokiPona pageTexts={this.state.appTexts.tokiPona} />
          )}

          {this.isPage("translator") && (
            <Translator
              pageTexts={this.state.appTexts}
              translations={this.state.translations}
              validEnteredWords={this.state.validEnteredWords}
              enteredText={this.state.enteredText}
              inputRef={this.textInput}
              onEnterText={(enteredText) => this.translate(enteredText)}
              onClearTranslation={() => this.clearTranslation()}
            />
          )}
        </ScrollView>

        {this.state.appTexts && (
          <OptionsModal
            pageTexts={this.state.appTexts}
            page={this.state.page}
            modalVisibility={this.state.isModalVisible}
            onChangePage={(page) => this.changePage(page)}
            onShowModal={(state) => this.showModal(state)}
            onQuit={() => this.quitApp()}
          />
        )}

        {this.state.appTexts && (
          <BottomMenu
            pageTexts={this.state.appTexts}
            onChangeLanguage={(language) => this.changeLanguage(language)}
            onShowModal={() => this.showModal(true)}
          />
        )}
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
