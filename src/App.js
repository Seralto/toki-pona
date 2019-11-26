import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Toki Pona</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    backgroundColor: '#00C14C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 60,
    color: 'orange',
    color: '#337ab7',
  },
});

export default App;
