import React from "react";
import { View, Text, StyleSheet } from "react-native";

const About = () => {
  return (
    <View style={styles.about}>
      <Text style={styles.title}>About</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  about: {
    // alignItems: "center",
    // padding: 30,
  },
});

export default About;
