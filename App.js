import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const dic = require('./tokipona-portuguese.json');

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numWords: 1,
      words: [],
    };
  }

  onTextInputChange(text) {
    const typedWords = text.trim().split(' ');

    this.setState({
      words: typedWords
    });

    this.setState({
      numWords: typedWords.length
    });
  }

  translations() {
    const words = (word) => {
      const list = dic[word] || ''
      if (list === '') {
        return null
      }

      return (
        <Text>{list}</Text>
      )
    }

    return (
      this.state.words.map((word, index) => <Text key={index} style={styles.translation}>{words(word)}</Text>)
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>TokiPona - Português</Text>

        <TextInput
          onChangeText={(text) => this.onTextInputChange(text)}
          style={styles.inputText}
          placeholder="Digite..."
        />

        <View style={styles.translations}>
          { this.translations() }
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
  translation: {
    backgroundColor: '#dae5ef',
    alignSelf: 'center',
    padding: 10,
    margin: 10,
    fontSize: 20,
    height: '60%',
    borderRadius: 10,
    flexGrow: 1,
    flexBasis: 0,
    width: '100%',
  },
});
