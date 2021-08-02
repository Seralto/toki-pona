import React, {Component} from 'react';
import {View, ScrollView, Text, TextInput, StyleSheet} from 'react-native';

import Translation from './components/Translation'

const dic = require('./data/tokipona-portuguese.json');

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      words: [],
      translations: [],
    };
  }

  onTextInput(text) {
    const typedWords = this.sanitizeInput(text).split(' ');
    let list = [];

    typedWords.forEach(word => {
      const translation = dic[word];

      if (translation === undefined) {
        return;
      }

      this.setState({
        words: typedWords
      });

      list.push(translation);
    })

    this.setState({
      translations: list
    });
  }

  sanitizeInput(input) {
    return input.toLowerCase().replace(/[^a-z\s]/g, '');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>TokiPona - Português</Text>

        <TextInput
          onChangeText={text => this.onTextInput(text)}
          style={styles.inputText}
          placeholder="Digite..."
          autoFocus={true}
        />

        <ScrollView style={styles.translations}>
          {
            this.state.translations.map((translation, index) => {
              return (
                <Translation word={this.state.words[index]} text={translation} key={index} />
              );
            })
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#42455a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  title: {
    fontSize: 30,
    color: '#c3c3c3',
    marginTop: 40,
    marginBottom: 20,
  },
  inputText: {
    backgroundColor: '#d6e2ec',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 30,
    padding: 10,
    borderRadius: 10,
    width: '100%',
  },
  translations: {
    display: 'flex',
    fontSize: 20,
    height: '60%',
    borderRadius: 10,
    width: '100%',
  },
});
