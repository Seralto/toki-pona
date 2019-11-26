import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';

import styles from './styles/index';

const dic = require('./tokipona-portuguese.json');

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      translation: '',
    };
  }

  onTextInputChangeText(text) {
    this.setState({
      translation: dic[text] || '',
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>TokiPona - Português:</Text>

        <Text style={styles.subtitle}>Digite:</Text>
        <TextInput
          onChangeText={text => this.onTextInputChangeText(text)}
          value={this.state.input}
          style={styles.inputText}
        />

        <Text style={styles.subtitle}>Tradução:</Text>
        <Text style={styles.translation}>{this.state.translation}</Text>
      </View>
    );
  }
}
