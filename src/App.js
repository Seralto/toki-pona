import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    backgroundColor: '#00C14C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: '#337ab7',
  },
  subtitle: {
    marginTop: 20,
    fontSize: 20,
    color: '#337ab7',
  },
  inputText: {
    backgroundColor: '#fff',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    width: 300,
  },
  translation: {
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 10,
    width: 300,
    fontSize: 20,
  },
});
