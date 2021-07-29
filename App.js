import React, {Component} from 'react';
import {View, Text, TextInput, FlatList} from 'react-native';

import styles from './styles/index';

const dic = require('./tokipona-portuguese.json');

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // translation: '',
      numWords: 1,
      words: [],
    };
  }

  onTextInputChange(text) {
    const wordsList = text.trim().split(' ');

    this.setState({
      words: wordsList
    });

    this.setState({
      numWords: wordsList.length
    });
  }

  translations() {
    const words = (word) => {
      const list = dic[word] || ''
      if (list === '') {
        return null
      }

      const arr = list.split(', ')
      return (
        <FlatList
          data={arr.map(w => ({key: w}))}
          renderItem={({item, index}) => <Text key={index}>{item.key}</Text>}
        />
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
          onChangeText={text => this.onTextInputChange(text)}
          value={this.state.input}
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
