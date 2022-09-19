import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Button,
} from "react-native";
import Translation from "./components/Translation";
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

    this.state = {
      words: [],
      translations: [],
      language: "portuguese",
    };
  }

  translate(text, dictionary) {
    const typedWords = this.sanitizeInput(text)
      .split(" ")
      .filter((word) => word);
    let list = [];

    typedWords.forEach((word) => {
      const translation = dictionary[word];

      if (translation === undefined) {
        return;
      }

      this.setState({
        words: typedWords,
      });

      list.push(translation);
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
    this.textInput.focus();

    if (language === this.state.language) {
      return;
    }

    this.state.language = language;

    const dictionary = this.loadDictionary(language);
    const text = this.state.words.join(" ");

    this.translate(text, dictionary);
  }

  render() {
    const text = this.loadText(this.state.language);
    const dictionary = this.loadDictionary(this.state.language);

    return (
      <View style={styles.app}>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.title}>Toki Pona - {text.language}</Text>

            <TextInput
              onChangeText={(text) => this.translate(text, dictionary)}
              style={styles.inputText}
              placeholder={text.placeholder}
              ref={(input) => (this.textInput = input)}
              autoFocus={true}
            />

            <ScrollView style={styles.translations}>
              {this.state.translations.map((translation, index) => {
                return (
                  <Translation
                    word={this.state.words[index]}
                    text={translation}
                    key={index}
                  />
                );
              })}
            </ScrollView>
          </View>
        </ScrollView>

        <BottomMenu
          onChangeLanguage={(language) => this.changeLanguage(language)}
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
  inputText: {
    backgroundColor: "#d6e2ec",
    fontSize: 20,
    marginTop: 10,
    marginBottom: 30,
    padding: 10,
    borderRadius: 10,
    width: "100%",
  },
  translations: {
    width: "100%",
  },
});
