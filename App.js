import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Home from "./components/Home";
import Translator from "./components/Translator";
import Dictionary from "./components/Dictionary";
import Grammar from "./components/Grammar";
import Sentences from "./components/Sentences";
import Quiz from "./components/Quiz";
import TokiPona from "./components/TokiPona";
import About from "./components/About";
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
const DEFAULT_PAGE = "home";

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
      score: 0,
      isModalVisible: false,
      isLoading: true,
      screenWidth: Dimensions.get("window").width,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.getDefaultLanguage();
      this.getDictionary();
      this.getScore();
    }, 500);
  }

  getDefaultLanguage() {
    AsyncStorage.getItem("@TokiPona:defaultLanguage").then((language) => {
      const currentLanguage = language ? language : DEFAULT_LANGUAGE;
      this.changeLanguage(currentLanguage);
      const texts = this.loadText(currentLanguage);
      this.setState({ appTexts: texts });
      this.changePage(DEFAULT_PAGE);
    });
  }

  getScore() {
    AsyncStorage.getItem("@TokiPona:score").then((totalScore) => {
      const score = totalScore ? totalScore : 0;
      this.setState({ score: score.toString() });
      this.setState({ isLoading: false });
    });
  }

  getDictionary() {
    const dictionary = this.loadDictionary(DEFAULT_LANGUAGE);
    this.setState({ dictionary: dictionary });
    this.setState({ tokiPonaWords: Object.keys(dictionary) });
  }

  setDefaultLanguage(language) {
    AsyncStorage.setItem("@TokiPona:defaultLanguage", language);
    this.changeLanguage(language);
  }

  translate(enteredText) {
    const validTokiPonaWords = this.sanitizeInput(enteredText)
      .split(" ")
      .filter(
        (word) =>
          this.state.tokiPonaWords.includes(word) ||
          word === "ale" ||
          word === "ali"
      );

    let replacedValidTokiPonaWords = validTokiPonaWords.map((word) => {
      return word === "ale" || word === "ali" ? "ale/ali" : word;
    });

    const translations = replacedValidTokiPonaWords.map(
      (word) => this.state.dictionary[word]
    );

    this.setState({ enteredText: enteredText.toLowerCase() });
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
  }

  clearTranslation() {
    this.setState({ validEnteredWords: [] });
    this.setState({ translations: [] });
    this.setState({ enteredText: "" });
    this.textInput.current.clear();
    this.textInput.current.focus();
  }

  sanitizeInput(input) {
    return input.replace(/[^a-z\s]/g, "");
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

  changeScore() {
    const newScore = parseInt(this.state.score) + 10;
    this.setState({ score: newScore });
    AsyncStorage.setItem("@TokiPona:score", newScore.toString());
  }

  isPage(page) {
    return this.state.page === page;
  }

  isPageLoading() {
    return this.state.isLoading;
  }

  render() {
    return this.isPageLoading() ? (
      <View style={styles.splash}>
        <Image
          source={require("./assets/splash.png")}
          style={styles.splashImage}
        />
      </View>
    ) : (
      <SafeAreaView style={styles.app}>
        {/* Top header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Toki Pona</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity
              onPress={() => this.changePage("home")}
              accessibilityLabel="Home"
              style={styles.headerButton}
            >
              <Ionicons
                name={this.state.page === "home" ? "home" : "home-outline"}
                size={22}
                color={this.state.page === "home" ? "#7eb8d4" : "#9b9db8"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.showModal(true)}
              accessibilityLabel="Settings"
              style={styles.headerButton}
            >
              <Ionicons name="settings-outline" size={22} color="#9b9db8" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.pages}>
          {this.isPage("home") && (
            <Home
              dictionary={this.state.dictionary}
              language={this.state.language}
              pageTexts={this.state.appTexts}
              screenWidth={this.state.screenWidth}
              onGoToQuiz={() => this.changePage("quiz")}
            />
          )}

          {this.isPage("translator") && (
            <Translator
              pageTexts={this.state.appTexts}
              translations={this.state.translations}
              validEnteredWords={this.state.validEnteredWords}
              enteredText={this.state.enteredText}
              inputRef={this.textInput}
              screenWidth={this.state.screenWidth}
              onEnterText={(enteredText) => this.translate(enteredText)}
              onClearTranslation={() => this.clearTranslation()}
            />
          )}

          {this.isPage("dictionary") && (
            <Dictionary
              pageTexts={this.state.appTexts}
              dictionary={this.state.dictionary}
              screenWidth={this.state.screenWidth}
            />
          )}

          {this.isPage("grammar") && (
            <Grammar
              pageTexts={this.state.appTexts.grammar}
              screenWidth={this.state.screenWidth}
            />
          )}

          {this.isPage("sentences") && (
            <Sentences
              pageTexts={this.state.appTexts.sentences}
              screenWidth={this.state.screenWidth}
            />
          )}

          {this.isPage("quiz") && (
            <Quiz
              pageTexts={this.state.appTexts.quiz}
              dictionary={this.state.dictionary}
              score={this.state.score}
              screenWidth={this.state.screenWidth}
              onChangeScore={() => this.changeScore()}
              language={this.state.language}
            />
          )}


          {this.isPage("tokipona") && (
            <TokiPona
              pageTexts={this.state.appTexts.tokiPona}
              screenWidth={this.state.screenWidth}
            />
          )}

          {this.isPage("about") && (
            <About
              pageTexts={this.state.appTexts.aboutMe}
              screenWidth={this.state.screenWidth}
            />
          )}
        </View>

        {this.state.appTexts && (
          <OptionsModal
            pageTexts={this.state.appTexts}
            modalVisibility={this.state.isModalVisible}
            currentLanguage={this.state.language}
            onChangePage={(page) => this.changePage(page)}
            onChangeLanguage={(language) => this.changeLanguage(language)}
            onShowModal={(state) => this.showModal(state)}
          />
        )}

        {this.state.appTexts && (
          <BottomMenu
            pageTexts={this.state.appTexts}
            currentPage={this.state.page}
            onChangePage={(page) => this.changePage(page)}
          />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#0d0f1e",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#0d0f1e",
    borderBottomWidth: 1,
    borderBottomColor: "#1e1f30",
  },
  headerTitle: {
    color: "#e0e0f0",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  headerButton: {
    padding: 6,
    borderRadius: 8,
  },
  pages: {
    flex: 1,
  },
  splash: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#545771",
  },
  splashImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
