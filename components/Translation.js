import React from 'react';
import {Text, StyleSheet} from 'react-native';

const Translation = (props) => {
  return (
    <Text style={styles.translation}>{props.text}</Text>
  );
}

const styles = StyleSheet.create({
  translation: {
    backgroundColor: '#dae5ef',
    alignSelf: 'center',
    padding: 10,
    margin: 10,
    fontSize: 20,
    borderRadius: 10,
    flexGrow: 1,
    width: '100%',
  },
});

export default Translation;