import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

import Translation from './components/Translation'

const dic = require('./tokipona-portuguese.json');

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      translations: [],
    };
  }

  // TODO: Remove words on delete
  onTextInput(text) {
    const typedWords = text.trim().split(' ');

    const alreadyHasTranslation = (translation) => {
      return this.state.translations.indexOf(translation) !== -1;
    }

    typedWords.forEach(word => {
      const translation = dic[word];

      if (translation !== undefined && !alreadyHasTranslation(translation)) {
        this.setState({
          translations: [...this.state.translations, translation]
        });
      }
    })
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

        <View style={styles.translations}>
          {
            this.state.translations.map((translation, index) => {
              return (
                <Translation text={translation} key={index} />
              );
            })
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    backgroundColor: '#42455a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: '#c3c3c3',
    marginBottom: 20,
  },
  inputText: {
    backgroundColor: '#dae5ef',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 15,
    padding: 10,
    width: 300,
    borderRadius: 10,
  },
  translations: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    fontSize: 20,
    height: '60%',
    borderRadius: 10,
  },
});
