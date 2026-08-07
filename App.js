import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import themes from "./themes";
import { SCREENSHOT_MODE, FIXED_SCORE } from "./automation/screenshotConfig";

import Home from "./components/Home";
import Translator from "./components/Translator";
import Dictionary from "./components/Dictionary";
import Grammar from "./components/Grammar";
import Sentences from "./components/Sentences";
import Quiz from "./components/Quiz";
import Settings from "./components/Settings";
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
const DEFAULT_THEME = "dark";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.textInput = React.createRef();

    this.state = {
      validEnteredWords: [],
      translations: [],
      dictionary: {},
      appTexts: "",
      enteredText: "",
      language: "",
      page: "",
      score: 0,
      isLoading: true,
      screenWidth: Dimensions.get("window").width,
      themeId: DEFAULT_THEME,
      fontSizeId: "normal",
    };
  }

  componentDidMount() {
    const init = () => {
      this.getDefaultLanguage();
      this.getDictionary();
      this.getScore();
      this.getTheme();
      this.getFontSizeId();
    };
    // Remove artificial delay in screenshot mode for faster, reliable captures.
    SCREENSHOT_MODE ? init() : setTimeout(init, 500);
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
    if (SCREENSHOT_MODE) {
      this.setState({ score: FIXED_SCORE, isLoading: false });
      return;
    }
    AsyncStorage.getItem("@TokiPona:score").then((totalScore) => {
      this.setState({ score: totalScore ? totalScore.toString() : "0", isLoading: false });
    });
  }

  getDictionary() {
    this.setState({ dictionary: this.loadDictionary(DEFAULT_LANGUAGE) });
  }

  setDefaultLanguage(language) {
    AsyncStorage.setItem("@TokiPona:defaultLanguage", language);
    this.changeLanguage(language);
  }

  translate(enteredText) {
    const dictKeys = Object.keys(this.state.dictionary);
    const validTokiPonaWords = this.sanitizeInput(enteredText)
      .split(" ")
      .filter((word) => dictKeys.includes(word) || word === "ale" || word === "ali");

    const normalizedWords = validTokiPonaWords.map((word) =>
      word === "ale" || word === "ali" ? "ale/ali" : word
    );

    this.setState({
      enteredText: enteredText.toLowerCase(),
      validEnteredWords: validTokiPonaWords,
      translations: normalizedWords.map((word) => this.state.dictionary[word]),
    });
  }

  changeLanguage(language) {
    if (this.isPage("translator")) {
      this.textInput.current.focus();
    }

    if (language === this.state.language) return;

    this.setState(
      { language, appTexts: this.loadText(language), dictionary: this.loadDictionary(language) },
      () => this.translate(this.state.enteredText)
    );
  }

  changePage(page) {
    this.setState({ page: page });
  }

  clearTranslation() {
    this.setState({ validEnteredWords: [], translations: [], enteredText: "" });
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

  getTheme() {
    AsyncStorage.getItem("@TokiPona:theme").then((themeId) => {
      if (themeId && themes[themeId]) {
        this.setState({ themeId });
      }
    });
  }

  changeTheme(themeId) {
    if (!themes[themeId]) return;
    this.setState({ themeId });
    AsyncStorage.setItem("@TokiPona:theme", themeId);
  }

  getFontSizeId() {
    AsyncStorage.getItem("@TokiPona:fontSizeId").then((id) => {
      if (id === "normal" || id === "large") this.setState({ fontSizeId: id });
    });
  }

  changeFontSize(id) {
    this.setState({ fontSizeId: id });
    AsyncStorage.setItem("@TokiPona:fontSizeId", id);
  }

  changeScore(points = 10) {
    const newScore = parseInt(this.state.score) + points;
    this.setState({ score: newScore });
    AsyncStorage.setItem("@TokiPona:score", newScore.toString());
  }

  resetScore() {
    this.setState({ score: 0 });
    AsyncStorage.setItem("@TokiPona:score", "0");
  }

  isPage(page) {
    return this.state.page === page;
  }

  isPageLoading() {
    return this.state.isLoading;
  }

  render() {
    const theme = themes[this.state.themeId] ?? themes.dark;
    return this.isPageLoading() ? (
      <View style={styles.splash}>
        <Image
          source={require("./assets/splash.png")}
          style={styles.splashImage}
        />
      </View>
    ) : (
      <SafeAreaView style={[styles.app, { backgroundColor: theme.background }]}>
        {/* Top header */}
        <View style={[styles.header, { backgroundColor: theme.header, borderBottomColor: theme.headerBorder }]}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Toki Pona</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity
              onPress={() => this.changePage("home")}
              accessibilityLabel="Home"
              testID="nav-home"
              style={styles.headerButton}
            >
              <Ionicons
                name={this.state.page === "home" ? "home" : "home-outline"}
                size={22}
                color={this.state.page === "home" ? theme.accent : theme.inactive}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.changePage("settings")}
              accessibilityLabel="Settings"
              testID="nav-settings"
              style={styles.headerButton}
            >
              <Ionicons
                name={this.state.page === "settings" ? "settings" : "settings-outline"}
                size={22}
                color={this.state.page === "settings" ? theme.accent : theme.inactive}
              />
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
              fontSizeId={this.state.fontSizeId}
              theme={theme}
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
              fontSizeId={this.state.fontSizeId}
              theme={theme}
              onEnterText={(enteredText) => this.translate(enteredText)}
              onClearTranslation={() => this.clearTranslation()}
            />
          )}

          {this.isPage("dictionary") && (
            <Dictionary
              pageTexts={this.state.appTexts}
              dictionary={this.state.dictionary}
              screenWidth={this.state.screenWidth}
              fontSizeId={this.state.fontSizeId}
              theme={theme}
            />
          )}

          {this.isPage("grammar") && (
            <Grammar
              pageTexts={this.state.appTexts.grammar}
              screenWidth={this.state.screenWidth}
              fontSizeId={this.state.fontSizeId}
              theme={theme}
            />
          )}

          {this.isPage("sentences") && (
            <Sentences
              pageTexts={this.state.appTexts.sentences}
              screenWidth={this.state.screenWidth}
              fontSizeId={this.state.fontSizeId}
              theme={theme}
            />
          )}

          {this.isPage("quiz") && (
            <Quiz
              pageTexts={this.state.appTexts.quiz}
              dictionary={this.state.dictionary}
              score={this.state.score}
              screenWidth={this.state.screenWidth}
              fontSizeId={this.state.fontSizeId}
              theme={theme}
              onChangeScore={(points) => this.changeScore(points)}
              language={this.state.language}
            />
          )}

          {this.isPage("settings") && (
            <Settings
              pageTexts={this.state.appTexts}
              currentLanguage={this.state.language}
              currentTheme={this.state.themeId}
              currentFontSize={this.state.fontSizeId}
              theme={theme}
              onChangeLanguage={(language) => this.setDefaultLanguage(language)}
              onChangeTheme={(themeId) => this.changeTheme(themeId)}
              onChangeFontSize={(id) => this.changeFontSize(id)}
              onResetScore={() => this.resetScore()}
            />
          )}
        </View>

        {this.state.appTexts && (
          <BottomMenu
            pageTexts={this.state.appTexts}
            currentPage={this.state.page}
            theme={theme}
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
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  headerTitle: {
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
